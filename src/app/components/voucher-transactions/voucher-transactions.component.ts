import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { DateAdapter } from '@angular/material/core';
import { Data } from 'src/app/models/data'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-voucher-transactions',
  templateUrl: './voucher-transactions.component.html',
  styleUrls: ['./voucher-transactions.component.scss']
})
export class VoucherTransactionsComponent implements OnInit {


  loading = false
  fromDate = '';
  toDate = '';
  cardNumber = '';
  inParent = true;

  // Transaction Stat
  succeedTransactionCount = 0;
  failedTransactionCount = 0;
  totalTransactionAmount = 0;

  transactionList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-align: center;">There are no reports yet.</span>
    </div>
  `,
    },
    selected: [],
    pageNumber: 1 as number,
    limit: 10 as number,
    transactionCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    transactionData: [],
    allTransactionDataBeforeFilter: [],
    firstTime: true,
  }

  constructor(
    private spinner: NgxSpinnerService, private dateAdapter: DateAdapter<Date>,
    private sidNav: SideNaveComponent,
    private loyaltyService: LoyaltyService,
    private snackBar: MatSnackBar,
    public data: Data,
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentVoucherId') != null){
      var currentVoucherId = localStorage.getItem('currentVoucherId')
      this.getVOucherTransactions(currentVoucherId, 1, 10)
    }  
  }

  getVOucherTransactions(currentVoucherId, page, size) {
    this.loading = true
    this.spinner.show()
    this.loyaltyService.simphonyVoucherTrans(currentVoucherId, page, size).toPromise().then((res: any) => {
        if(res["transactions"] !=  undefined || res["transactions"] != null){
          this.transactionList.transactionData = res["transactions"];
          this.succeedTransactionCount = res['succeedTransactionCount']
          this.failedTransactionCount = res['failedTransactionCount']
          this.totalTransactionAmount = res['totalSpend']
        }

        this.spinner.hide()
        this.loading = false
      }).catch((err) => {
        console.error(err)
        this.spinner.hide()
        this.loading = false

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        }
      })
  }

  getCurrency() {
    return JSON.parse(localStorage.getItem('account')).currency
  }

  changePage(pageInfo) {
    this.transactionList.pageNumber = pageInfo.page
    // this.getTransactions();
  }

  onLimitChange(limit) {
    this.transactionList.limit = limit
    // this.getTransactions();
  }
  deleteOneUsers(row, flag){
  }
  hasRole(role){
    return true;
  }
}
