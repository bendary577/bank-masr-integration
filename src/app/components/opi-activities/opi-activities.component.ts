import { Component, OnInit } from '@angular/core';
import { Transactions } from '../opi-transactions/transactions';
import { TransactionsItems } from '../opi-transactions/transactions-items';

@Component({
  selector: 'app-opi-activities',
  templateUrl: './opi-activities.component.html',
  styleUrls: ['./opi-activities.component.scss']
})
export class OpiActivitiesComponent implements OnInit {

  totalCheckIn = 1;
  totalcheckOut = 1; 
  totalTransactions = 1;

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

  constructor() { }

  ngOnInit(): void {
    this.totalSpend('today')
  }

  totalSpend(date){
    
  }

}
