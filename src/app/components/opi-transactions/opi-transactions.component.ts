import { Component, OnInit } from '@angular/core';
import { Transactions } from './transactions';
import { TransactionsItems } from './transactions-items';

@Component({
  selector: 'app-opi-transactions',
  templateUrl: './opi-transactions.component.html',
  styleUrls: ['./opi-transactions.component.scss']
})
export class OpiTransactionsComponent implements OnInit {

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
  }

  no(){
  }
}
