import { Component, OnInit } from '@angular/core';
import { Data } from 'src/app/models/data';
import { Transactions } from '../opi-transactions/transactions';
import { TransactionsItems } from '../opi-transactions/transactions-items';
import {Location} from '@angular/common';
import { MatDialog } from '@angular/material';
import { FilterComponent } from '../filter/filter.component';
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  
  transactionsData = TransactionsItems; 

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
  
  constructor(public data: Data, private _location: Location, public dialog: MatDialog) { }

  ngOnInit(): void {
    console.log(this.data.storage)
  }

  chargeWallet(){    
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '550px',
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

  backClicked() {
    this._location.back();
  }
}

