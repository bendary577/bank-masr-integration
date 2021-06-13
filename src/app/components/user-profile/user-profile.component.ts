import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Transactions } from '../opi-transactions/transactions';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component';
import { HistoryItems } from './history-items';
import { AddAppUserComponent } from '../add-app-user/add-app-user.component';
import { VoucherHistoryItems } from './voucher-history-items';
import { VoucherHistory } from './voucher-history';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  transactionsData = [];
  voucherData = [];
  voucherCode = "No Vocher Code";
  openFilter = false;
  fromDate: any;
  toDate: any;
  field: any;
  fields = ["Revenue Center", "Agent"]
  fieldValues: any;
  credit = 430;
  voucherHistory = new VoucherHistory();
  simphonyDiscount: { discountRate: 20, discountId: "10025" }
  group: any = { name: "Entrepreware IT", simphonyDiscount: "" };
  user: any = { name: "Bassel", email: "bassel@entrepreware.com", group: "" };
  revenuCenters = ["No Revenue Centers"];

  transactionsList = {
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
    transactionsData: [] as Transactions[]
  };

  constructor(public data: Data, private _location: Location,
    public dialog: MatDialog) { }

  ngOnInit(): void {

    console.log(this.data)

    if (this.data != null && this.data.storage != undefined) {
      localStorage.setItem('userId', this.data.storage.id);
      this.user = this.data.storage;
      this.group = this.user["group"];
      this.simphonyDiscount = this.group["simphonyDiscount"];
    }


    // let btn = document.querySelector('.mouse-cursor-gradient-tracking');
    // btn.addEventListener('mousemove', e => {
    //   let rect = e.target.getBoundingClientRect();
    //   let x = e.clientX - rect.left;
    //   let y = e.clientY - rect.top;
    //   btn.style.setProperty('--x', x + 'px');
    //   btn.style.setProperty('--y', y + 'px');
    // });

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
        if (func == 'add') {
          this.credit = Number(this.credit) + Number(res.amount);
          this.getVoucherData(res);
          this.revenuCenters = ["Restaurant 1" , "Restaurant 2" , "Restaurant 3" , "Restaurant 4"];        } else if (func == 'deduct') {
          this.credit = Number(this.credit) - Number(res.amount);
        } else {
          this.credit = Number(this.credit) + Number(res.amount);

          const dialogRef = this.dialog.open(EditWalletComponent, {
            width: '550px',
            data: { function: "showVoucher", amount: res.amount }
          });

          dialogRef.afterClosed().subscribe(newRes => {
            if (newRes) {
              this.getVoucherData(newRes);
            }
          });
        }
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
    this.credit = this.credit - 100;
    this.transactionsData = HistoryItems;
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

    this.transactionsData = HistoryItems;

    console.log(this.fromDate)
    if (this.field == "Revenue Center") {
      console.log(this.transactionsData.filter(xx => xx.revenueCenter === this.fieldValues))

      this.transactionsData = this.transactionsData.filter(xx => xx.revenueCenter === this.fieldValues);
    } else if (this.field == "Agent") {
      this.transactionsData = this.transactionsData.filter(xx => xx.modifier === this.fieldValues);

    } else {
      this.transactionsData = this.transactionsData.filter(xx => xx.transactionDate === this.fromDate);
    }
  }

  onCancelClick(): void {
    this.openFilter = false;
  }


  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  //   this.toastr.error('everything is broken', 'Major Error', {
  //     timeOut: 3000,
  //   });
  // }

}



