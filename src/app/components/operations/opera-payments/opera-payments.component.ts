import { Component, OnInit, ViewChild } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { OperaPaymentService } from 'src/app/services/operaPayment/opera-payment.service'
import { SidenavResponsive } from '../../sidenav/sidenav-responsive'

@Component({
  selector: 'app-opera-payments',
  templateUrl: './opera-payments.component.html',
  styleUrls: ['./opera-payments.component.scss'],
})
export class OperaPaymentsComponent implements OnInit {
  loading = false
  fromDate = ''
  toDate = ''
  cardNumber = ''
  transactions = []

  // Transaction Stat
  succeedTransactionCount = ''
  failedTransactionCount = ''
  totalTransactionAmount = ''

  constructor(
    private spinner: NgxSpinnerService,
    private sidNav: SidenavResponsive,
    private operaPaymentService: OperaPaymentService,
  ) {}

  ngOnInit(): void {
    this.getOperationTypes()
  }

  getOperationTypes() {
    this.loading = true
    this.spinner.show()
    this.countOperationTypes()

    this.operaPaymentService
      .listOperaTransactions(this.fromDate, this.toDate)
      .toPromise()
      .then((res: any) => {
        this.transactions = res
        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
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

  countOperationTypes() {
    this.operaPaymentService
      .countOperaTransactions(this.fromDate, this.toDate)
      .toPromise()
      .then((res: any) => {
        this.succeedTransactionCount = res['succeedTransactionCount']
        this.failedTransactionCount = res['failedTransactionCount']
        this.totalTransactionAmount = res['totalTransactionAmount']

        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
        console.error(err)
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        }
      })
  }
}
