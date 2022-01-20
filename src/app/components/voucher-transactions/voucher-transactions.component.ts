import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { DateAdapter } from '@angular/material/core';
import { Data } from 'src/app/models/data'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { Thread } from 'igniteui-angular-core';

@Component({
  selector: 'app-voucher-transactions',
  templateUrl: './voucher-transactions.component.html',
  styleUrls: ['./voucher-transactions.component.scss']
})
export class VoucherTransactionsComponent implements OnInit {

  // Transaction Stat
  totalSpend = 0;
  succeedTransactionCount = 0;
  failedTransactionCount = 0;

  transactionList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-align: center;">There are no reports yet.</span>
    </div> `,  },
    selected: [],
    pageNumber: 1 as number,
    limit: 10 as number,
    transactionCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    transactionData: [] = [],
    allTransactionDataBeforeFilter: [],
    firstTime: true,
  }

  constructor( private spinner: NgxSpinnerService, private dateAdapter: DateAdapter<Date>, public data: Data,
    private sidNav: SideNaveComponent, private loyaltyService: LoyaltyService, private snackBar: MatSnackBar) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    if(localStorage.getItem('currentVoucherCode') != null){
      var currentVoucherCode = localStorage.getItem('currentVoucherCode')
      var currentVoucherId = localStorage.getItem('currentVoucherId')
      this.getVoucherTransactions(currentVoucherId, currentVoucherCode)
      this.getVoucherStatic(currentVoucherId, currentVoucherCode)

    }  
  }

  getVoucherTransactions(currentVoucherId, currentVoucherCode) {
    this.spinner.show()
    this.loyaltyService.simphonyVoucherTrans(currentVoucherId, currentVoucherCode, this.transactionList.pageNumber, this.transactionList.limit).toPromise().then((res: any) => {
        if(res["transactions"] !=  undefined || res["transactions"] != null){
          this.spinner.hide()
          var transacionOld  = this.transactionList.transactionData;
          this.transactionList.transactionData = [];
          this.delay(1000, transacionOld, res);
        }

      }).catch((err) => {
        console.error(err)
        this.spinner.hide()

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        }
      })
  }

  async delay(ms: number, transactionOld, res: any) {
      await new Promise(resolve => setTimeout(()=> this.getTransacrion(transactionOld, res), ms)).then(()=>console.log("fired"));
  }

  getTransacrion(transactionOld, res: any) {
    var transactionNew = (res["transactions"]) as []; 
    transactionOld.push(...transactionNew);
    this.transactionList.transactionData = transactionOld;
    }

  getVoucherStatic(currentVoucherId, currentVoucherCode) {
    this.spinner.show()
    this.loyaltyService.getVoucherStatic(currentVoucherId, currentVoucherCode).toPromise().then((res: any) => {
      try{
          this.transactionList.transactionCount = res['totalTransactions'];
          this.totalSpend = res['totalSpend'];
          this.succeedTransactionCount = res['succeedTransactionCount'];
          this.failedTransactionCount = res['failedTransactionCount'];
        }catch(error){
          console.log(error)
        }

        this.spinner.hide()
      }).catch((err) => {
        console.error(err)
        this.spinner.hide()

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
     this.getVoucherTransactions(localStorage.getItem('currentVoucherId'), localStorage.getItem('currentVoucherCode'));
  }

  onLimitChange(limit) {
    this.transactionList.limit = limit
    this.getVoucherTransactions(localStorage.getItem('currentVoucherId'), localStorage.getItem('currentVoucherCode'));
  }
 
  hasRole(role){
    return true;
  }
}
