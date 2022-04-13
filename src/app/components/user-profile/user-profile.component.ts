import { Component, OnInit } from "@angular/core";
import { Data } from "src/app/models/data";
import { Transactions } from "../opi-transactions/transactions";
import { Location } from "@angular/common";
import { MatDialog, MatDialogConfig, MatSnackBar } from "@angular/material";
import { EditWalletComponent } from "../edit-wallet/edit-wallet.component";
import { SideNaveComponent } from "../side-nave/side-nave.component";
import { LoyaltyService } from "src/app/services/loyalty/loyalty.service";
import { ErrorMessages } from "src/app/models/ErrorMessages";
import { NgxSpinnerService } from "ngx-spinner";
import { VoucherHistory } from "src/app/models/wallet/voucher-history";
import { RevenueCenter } from "src/app/models/RevenueCenter";
import { AddAppUserAccompiedComponent } from "../add-app-user-accompied/add-app-user-accompied.component";
import { ExtendExpiryDateComponent } from "../extend-expiry-date/extend-expiry-date.component";
import { ExcelService } from "src/app/services/excel/excel.service";
import { saveAs } from "file-saver";
import { ApplicationUser } from "src/app/models/loyalty/ApplicationUser";
import { ViewReceiptComponent } from "../view-receipt/view-receipt.component";
import { WalletHistory } from "src/app/models/wallet/wallet-history";

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.scss"],
})
export class UserProfileComponent implements OnInit {
  voucherData = [];
  voucherCode = "No Vocher Code";
  openFilter = false;
  fromDate: any;
  toDate: any;
  field: any;
  fields = ["Revenue Center", "Agent"];
  fieldValues: any;
  credit = 0;
  voucherHistory = new VoucherHistory();
  simphonyDiscount;
  group;
  user: ApplicationUser;
  revenueCenters: RevenueCenter[] = [];

  distance = 0;
  expiryDateCounter: string;

  walletHistoryList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no transactions yet.</span>
    </div>
  `,
    },
    selected: [],
    groupsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: "" as string,
    walletHistoryData: [] as WalletHistory[],
    showCashandEmployee: false as boolean,
  };

  constructor(
    public data: Data,
    private _location: Location,
    private sideNav: SideNaveComponent,
    private loyaltyService: LoyaltyService,
    private spinner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    private excelService: ExcelService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (this.data != null && this.data.storage != undefined) {
      localStorage.setItem("currentGuestId", this.data.storage.id);
      this.user = this.data.storage;
      this.calculateParams(this.user);
      this.group = this.user["group"];
      this.simphonyDiscount = this.group["simphonyDiscount"];
      if (this.user["wallet"] != null) {
        this.walletHistoryList.walletHistoryData =
          this.user["wallet"]["walletHistory"];
      }
    } else {
      this.getApplicationUser();
    }
  }

  x = setInterval(() => {
    if (this.distance < 0) {
      clearInterval(this.x);
    }
    if (this.user && this.user.expiryDate != null) {
      var now = new Date().getTime();
      this.distance = new Date(this.user.expiryDate).getTime() - now;
      if (this.distance < 0) {
        this.expiryDateCounter = "0d 0h 0m 0s";
      } else {
        var days = Math.floor(this.distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor(
          (this.distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        var minutes = Math.floor(
          (this.distance % (1000 * 60 * 60)) / (1000 * 60)
        );
        var seconds = Math.floor((this.distance % (1000 * 60)) / 1000);
        this.expiryDateCounter =
          days + "d " + hours + "h " + minutes + "m " + seconds + "s";
      }
    } else {
      this.expiryDateCounter = "0d 0h 0m 0s";
    }
  });

  getApplicationUser() {
    this.walletHistoryList.showLoading = true;
    this.loyaltyService
      .getAppUser(localStorage.getItem("currentGuestId"))
      .toPromise()
      .then((result: any) => {
        this.walletHistoryList.showLoading = false;
        this.user = result;
        this.calculateParams(this.user);
        this.group = this.user["group"];
        this.simphonyDiscount = this.group["simphonyDiscount"];
        if (this.user["wallet"] != null) {
          this.walletHistoryList.walletHistoryData =
            this.user["wallet"]["walletHistory"];
        }
      })
      .catch((err) => {
        let message = "";
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED;
          this.sideNav.Logout();
        } else if (err.error.message) {
          message = err.error.message;
        } else if (err.message) {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        }
      });
  }

  getCurrency() {
    return JSON.parse(localStorage.getItem("account")).currency;
  }

  calculateParams(user) {
    this.credit = 0;
    if (user.wallet != null) {
      let balance = user.wallet.balance;
      for (let i = 0; i < balance.length; i++) {
        this.credit = this.credit + balance[i]["amount"];
        let revenueCenters = balance[i].revenueCenters;
        for (let j = 0; j < revenueCenters.length; j++) {
          if (!this.checkExistance(revenueCenters[j])) {
            this.revenueCenters.push(revenueCenters[j]);
          }
        }
      }
    }
  }

  checkExistance(revenue): Boolean {
    for (let j = 0; j < this.revenueCenters.length; j++) {
      if (this.revenueCenters[j].revenueCenter == revenue.revenueCenter) {
        return true;
      }
    }
    return false;
  }

  lessThanOrEqualZero(): Boolean {
    if (this.distance > 0) {
      return false;
    }
    return true;
  }

  chargeWallet(func) {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: "400px",
      data: { function: func },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.walletHistoryList.showLoading = true;
        this.spinner.show();
        if (res) {
          console.log(res);
          this.loyaltyService
            .chargeWallet(func, this.user.id, res)
            .toPromise()
            .then((result: any) => {
              this.viewReceipt(result.data);

              this.walletHistoryList.showLoading = false;
              this.getApplicationUser();
              this.spinner.hide();
              this.snackBar.open("Wallet Charged Successfully.", null, {
                duration: 2000,
                horizontalPosition: "center",
                panelClass: "my-snack-bar-success",
              });
            })
            .catch((err) => {
              this.walletHistoryList.showLoading = false;

              let message = "";
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED;
                this.sideNav.Logout();
              } else if (err.error && err.error.message) {
                message = err.error.message;
              } else {
                message = ErrorMessages.WALLET_CHARGE_ERROR;
              }
              this.spinner.hide();
              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: "center",
                panelClass: "my-snack-bar-fail",
              });
            });
        }
      }
    });

    this.walletHistoryList.showLoading = false;
  }

  deductWallet(func) {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: "400px",
      data: { function: func },
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.walletHistoryList.showLoading = true;
        this.spinner.show();
        if (res) {
          console.log(res);
          this.loyaltyService
            .deductWallet(func, this.user.id, res.amount)
            .toPromise()
            .then((result: any) => {
              // Check config
              this.viewReceipt(result.data);

              this.walletHistoryList.showLoading = false;
              this.getApplicationUser();
              this.spinner.hide();
            })
            .catch((err) => {
              this.walletHistoryList.showLoading = false;
              this.spinner.hide();

              let message = "";
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED;
                this.sideNav.Logout();
              } else if (err.error.message) {
                message = err.error.message;
              } else if (err.message) {
                message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
              }
              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: "center",
                panelClass: "my-snack-bar-fail",
              });
            });
        }
      }
    });
    this.walletHistoryList.showLoading = false;
  }

  viewReceipt(guest) {
    if (
      JSON.parse(localStorage.getItem("account")).printReceiptConfig
        .previewReceipt
    ) {
      const dialogRef = this.dialog.open(ViewReceiptComponent, {
        width: "302.36px", // 80mm
        disableClose: true,
        data: {
          guest: guest,
        },
      });
    }
  }

  addRevenueCenter() {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: "200px",
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    });
  }

  send(process) {
    this.spinner.show();
    this.loyaltyService
      .sendSmsOrEmail(this.user, process)
      .toPromise()
      .then((res) => {
        this.spinner.hide();
        this.snackBar.open(process + " sent successfully.", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-success",
        });
      })
      .catch((err) => {
        this.spinner.hide();
        let message = "";
        if (process == "Email") {
          message = "Invalid Email.";
        } else {
          message = "Invalid Mobile Number.";
        }
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED;
          this.sideNav.Logout();
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-fail",
        });
      });
  }

  extendExpiryDate(guest) {
    this.dialog
      .open(ExtendExpiryDateComponent, {})
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.spinner.show();
          this.loyaltyService
            .addApplicationUser(
              false,
              true,
              guest.name,
              guest.email,
              guest.group.id,
              guest.image,
              guest.id,
              guest.accompiendUsers,
              guest.code,
              guest.mobile,
              guest.balance,
              res.expiryDate,
              false,
              false
            )
            .then((result: any) => {
              this.getApplicationUser();
              this.spinner.hide();
              this.snackBar.open("User updated successfully.", null, {
                duration: 2000,
                horizontalPosition: "center",
                panelClass: "my-snack-bar-success",
              });
            })
            .catch((err) => {
              this.spinner.hide();

              let message = "";
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED;
                this.sideNav.Logout();
              } else if (err.error.message) {
                message = err.error.message;
              } else if (err.message) {
                message = err.message;
              } else {
                message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
              }

              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: "center",
                panelClass: "my-snack-bar-fail",
              });
            });
        }
      });
  }

  updateUserDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      title: "Update Guest",
      user: this.user,
    };
    dialogConfig.width = "420px";
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(
      AddAppUserAccompiedComponent,
      dialogConfig
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.spinner.show();
        this.loyaltyService
          .addApplicationUser(
            false,
            true,
            res.name,
            res.email,
            res.group,
            res.image,
            this.user.id,
            res.accompiendUsers,
            res.cardCode,
            res.mobile,
            res.balance,
            res.expiryDate,
            res.sendEmail,
            res.sendSMS
          )
          .then((result: any) => {
            this.getApplicationUser();
            this.spinner.hide();
            this.snackBar.open("User updated successfully.", null, {
              duration: 2000,
              horizontalPosition: "center",
              panelClass: "my-snack-bar-success",
            });
          })
          .catch((err) => {
            this.getApplicationUser();
            this.spinner.hide();
            let message = "";
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED;
            } else if (err.error.message) {
              message = err.error.message;
            } else if (err.message) {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
            }
            this.snackBar.open(message, null, {
              duration: 3000,
              horizontalPosition: "center",
              panelClass: "my-snack-bar-fail",
            });
          });
      }
    });
  }

  deleteUsers(flage) {
    this.spinner.show();
    this.loyaltyService
      .deleteAppUsers(flage, [this.user.id])
      .then((res: any) => {
        this.getApplicationUser();
        this.spinner.hide();
        let message = "User deleted successfully.";
        if (flage == "false") {
          message = "User restored successfully.";
        }

        this.snackBar.open(message, null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-success",
        });
      })
      .catch((err) => {
        this.getApplicationUser();
        this.spinner.hide();
        let message = "";
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED;
        } else if (err.error.message) {
          message = err.error.message;
        } else if (err.message) {
          message = err.message;
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: "right",
          panelClass: "my-snack-bar-fail",
        });
      });
  }

  extractExcelFile() {
    this.spinner.show();
    this.excelService.exportWalletHistoryExcel(this.user.id).subscribe(
      (res) => {
        const blob = new Blob([res], { type: "application/vnd.ms.excel" });
        const file = new File([blob], "Wallet History" + ".xlsx", {
          type: "application/vnd.ms.excel",
        });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-success",
        });
        this.spinner.hide();
      },
      (err) => {
        this.spinner.hide();
        console.error(err);
        this.snackBar.open("Fail to export, Please try agian", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-fail",
        });
      }
    );
  }

  backClicked() {
    this._location.back();
  }

  refresh() {
    location.reload();
  }

  openFilterView() {
    if (this.openFilter) {
      this.openFilter = false;
    } else {
      this.openFilter = true;
    }
  }

  onCancelClick(): void {
    this.openFilter = false;
  }

  hasRole(reference): Boolean {
    return this.sideNav.hasRole(reference);
  }

  hasFeature(reference) {
    var isFeature = this.sideNav.hasFeature(reference);
    return isFeature;
  }

  undoWalletAction(row) {
   if(row.check !== null){
    this.loyaltyService
      .undoWalletAction(this.user.id, row.check)
      .toPromise()
      .then((result: any) => {
        // Check config
        this.viewReceipt(result.data);

        this.walletHistoryList.showLoading = false;
        this.getApplicationUser();
        this.spinner.hide();
      })
      .catch((err) => {
        this.walletHistoryList.showLoading = false;
        this.spinner.hide();

        let message = "";
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED;
          this.sideNav.Logout();
        } else if (err.error.message) {
          message = err.error.message;
        } else if (err.message) {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-fail",
        });
      });
   }else{
    this.spinner.hide();
    this.snackBar.open("Wa;;et action check id not found", null, {
      duration: 3000,
      horizontalPosition: "center",
      panelClass: "my-snack-bar-fail",
    });
   }

  }
}
