import { Component, OnInit, ViewChild } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Transactions } from '../opi-transactions/transactions';
import {Location} from '@angular/common';
import { MatDialog } from '@angular/material';
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component';
import { HistoryItems } from './history-items';
import { AddAppUserComponent } from '../add-app-user/add-app-user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  transactionsData = HistoryItems; 

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
    console.log(this.revenuCenters)

    console.log(this.data.storage)
  }

  chargeWallet(func){    
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '550px',
      data :{ function: func }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
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

  // showSuccess() {
  //   this.toastr.success('Hello world!', 'Toastr fun!');
  //   this.toastr.error('everything is broken', 'Major Error', {
  //     timeOut: 3000,
  //   });
  // }

}



