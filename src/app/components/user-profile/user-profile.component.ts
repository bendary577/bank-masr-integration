import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Transactions } from '../opi-transactions/transactions';
import { Location } from '@angular/common';
import { MatDialog, MatSnackBar } from '@angular/material';
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component';
import { AddAppUserComponent } from '../add-app-user/add-app-user.component';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { NgxSpinnerService } from 'ngx-spinner';
import { VoucherHistory } from 'src/app/models/wallet/voucher-history';
import { RevenueCenter } from 'src/app/models/RevenueCenter';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  voucherData = [];
  voucherCode = "No Vocher Code";
  openFilter = false;
  fromDate: any;
  toDate: any;
  field: any;
  fields = ["Revenue Center", "Agent"]
  fieldValues: any;
  credit = 0;
  voucherHistory = new VoucherHistory();
  simphonyDiscount;
  group;
  user;
  revenueCenters: RevenueCenter[] = [];

  walletHistoryList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no transactions yet.</span>
    </div>
  `
    },
    selected: [],
    groupsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    walletHistoryData: [] as Transactions[]
  };

  constructor(public data: Data, private _location: Location, private sideNav: SideNaveComponent, private loyaltyService: LoyaltyService,
    private sppiner: NgxSpinnerService, private snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit(): void {

    if (this.data != null && this.data.storage != undefined) {
      localStorage.setItem('currentGuest', JSON.stringify(this.data.storage));
    }
    this.user = JSON.parse(localStorage.getItem('currentGuest'));
    console.log(this.user)
    this.calculateParams(this.user);
    this.group = this.user["group"];
    this.simphonyDiscount = this.group["simphonyDiscount"];


  }

  calculateParams(user) {

    let balance = user.wallet.balance ;
    for (let i = 0; i < balance.length; i++) {
      this.credit = this.credit + balance[i]["amount"];

      let revenueCenters = balance.revenueCenters;
      for (let j = 0; j < revenueCenters.length; j++) {
          if(this.checkExistance(revenueCenters[i])){

          }
      }
    }
  }

  checkExistance(revenue): Boolean{

    for (let j = 0; j < this.revenueCenters.length; j++) {
          if(this.revenueCenters[j].revenueCenter == revenue.revenueCenter){
            return true;
          }
      }
   return true
  }

  getVoucherData(newRes) {
    this.voucherData.push(
      {
        voucherDate: "2021-10-06", totalAmount: Number(newRes.amount),
        voucher: "756787237523", creator: "Kareem",
      });
    this.voucherCode = "756787237523";
  }

  chargeWallet(func) {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '300px',
      data: { function: func }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        this.loyaltyService.chargeWallet(func, this.user.id, res.name).toPromise().then((result: any) => {
          this.walletHistoryList.showLoading = true;
          this.snackBar.open("User updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: "my-snack-bar-success"
          });
        }).catch(err => {

          let message = "";
          if (err.status === 401) {
            message = ErrorMessages.SESSION_EXPIRED;
            this.sideNav.Logout();
          } else if (err.error.message) {
            message = err.error.message;
          } else if (err.message) {
            message = ErrorMessages.FAILED_TO_SAVE_CONFIG
          }

          this.snackBar.open(message, null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass: "my-snack-bar-fail"
          });
        })
      }
    })

  }

  addRevenueCenter() {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '200px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    })
  }

  updateUserDialog() {
    const dialogRef = this.dialog.open(AddAppUserComponent, {
      width: '550px',
      data: {
        user: this.user
      }
    });

    // dialogRef.afterClosed().subscribe(res => {
    //   if(res) {
    //     this.sp
    //     if(res.group == undefined)
    //     res.group = new Group();
    //     this.loyaltyService.addApplicationUser(false, res.name, res.email, res.group, res.image,
    //                                            this.usersList.selected[0].id).then((result: any) => {
    //         this.loading = false;
    //         this.usersList.showLoading = false;
    //         this.newUser = new ApplicationUser();
    //         this.usersList.selected = [];
    //         this.getUsers();
    //         this.snackBar.open("User updated successfully.", null, {
    //           duration: 2000,
    //           horizontalPosition: 'center',
    //           panelClass : "my-snack-bar-success"
    //         });
    //       }).catch(err => {
    //         this.loading = false;
    //         this.usersList.showLoading = false;
    //         this.usersList.selected = [];

    //         this.newUser = new ApplicationUser();

    //         let message = "";
    //         if(err.status === 401){
    //           message = ErrorMessages.SESSION_EXPIRED;
    //           this.sidNav.Logout();
    //         }else if(err.error.message){
    //           message = err.error.message;
    //         }else if(err.message){
    //           message = ErrorMessages.FAILED_TO_SAVE_CONFIG
    //         }

    //         this.snackBar.open(message , null, {
    //           duration: 3000,
    //           horizontalPosition: 'center',
    //           panelClass:"my-snack-bar-fail"
    //         });
    //       })
    //   }
    // })
  }

  backClicked() {
    this._location.back();
  }

  refresh() {
    // this.credit = this.credit - 100;
    // this.transactionsData = HistoryItems;
    // location.reload();
  }

  openFilterView() {
    if (this.openFilter) {
      this.openFilter = false;
    } else {
      this.openFilter = true;
    }
  }

  onFilterClick(): void {

    // this.transactionsData = HistoryItems;

    console.log(this.fromDate)
    if (this.field == "Revenue Center") {
      // console.log(this.transactionsData.filter(xx => xx.revenueCenter === this.fieldValues))

      // this.transactionsData = this.transactionsData.filter(xx => xx.revenueCenter === this.fieldValues);
    } else if (this.field == "Agent") {
      // this.transactionsData = this.transactionsData.filter(xx => xx.modifier === this.fieldValues);

    } else {
      // this.transactionsData = this.transactionsData.filter(xx => xx.transactionDate === this.fromDate);
    }
  }

  onCancelClick(): void {
    this.openFilter = false;
  }

  hasRole(reference): Boolean {
    return this.sideNav.hasRole(reference);
  }

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  //   this.toastr.error('everything is broken', 'Major Error', {
  //     timeOut: 3000,
  //   });
  // }

}



