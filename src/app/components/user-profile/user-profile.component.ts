import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Transactions } from '../opi-transactions/transactions';
import {Location} from '@angular/common';
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
  
  transactionsData = HistoryItems; 
  voucherData = VoucherHistoryItems;
  openFilter = false;
  fromDate:any;
  toDate:any;
  field:any;
  fields=["Rvenue Center", "Agent"]
  fieldValues:any;
  credit = 50;
  voucherHistory = new VoucherHistory();

  revenuCenters = ["Take Away", "Rest", "Dine In", "Compelmentary","Take Away", "Rest", "Dine In", "Compelmentary","Take Away", "Rest", "Dine In", "Compelmentary","Take Away", "Rest", "Dine In", "Compelmentary"]

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
  
  constructor( public data: Data, private _location: Location,
               public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  getVoucherData(newRes){
    this.voucherData.push(
      {         voucherDate: "",
              totalAmount: Number(newRes.amount),
              voucher: newRes.voucher,
                  creator: "Kareem",})  
                  console.log(this.voucherData);
                  this.voucherData = this.voucherData;
  }

  chargeWallet(func){    
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '550px',
      data :{ function: func }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        if(func == 'add'){
        this.credit = Number(this.credit) + Number(res.amount);
        }else if(func == 'deduct'){
          this.credit = Number(this.credit) - Number(res.amount);
        }else{
          this.credit = Number(this.credit) + Number(res.amount);
          
          const dialogRef = this.dialog.open(EditWalletComponent, {
            width: '550px',
            data :{ function: "showVoucher" , amount: res.amount }
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

  addRevenueCenter(){    
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    })
  }

  userAction(){    
    const dialogRef = this.dialog.open(AddAppUserComponent, {
      width: '550px',

  });
  }

  backClicked() {
    this._location.back();
  }

  refresh() {
    location.reload();
  }

  openFilterView(){
    if(this.openFilter){
    this.openFilter = false;
    }else{
      this.openFilter = true;
    }
  }

  onFilterClick(): void {

    this.transactionsData = HistoryItems;

    console.log(this.fromDate)
    if(this.field == "Rvenue Center"){
    console.log(this.transactionsData.filter(xx => xx.revenueCenter === this.fieldValues))

    this.transactionsData = this.transactionsData.filter(xx => xx.revenueCenter === this.fieldValues) ;
    }else if (this.field == "Agent"){
      this.transactionsData = this.transactionsData.filter(xx => xx.creator === this.fieldValues) ;

    }else{
      this.transactionsData = this.transactionsData.filter(xx => xx.transactionDate === this.fromDate) ;
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



