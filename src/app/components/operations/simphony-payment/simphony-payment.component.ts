import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { OperaPaymentService } from 'src/app/services/operaPayment/opera-payment.service'
import { SidenavResponsive } from '../../sidenav/sidenav-responsive'
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';

@Component({
  selector: 'app-simphony-payment',
  templateUrl: './simphony-payment.component.html',
  styleUrls: ['./simphony-payment.component.scss']
})
export class SimphonyPaymentComponent implements OnInit {
  loading = false
  fromDate = '';
  toDate = '';
  cardNumber = '';
  transactions = []

  // Transaction Stat
  succeedTransactionCount = 0;
  failedTransactionCount = 0;
  totalTransactionAmount = 0;

  constructor(
    private spinner: NgxSpinnerService, private dateAdapter: DateAdapter<Date>,
    private sidNav: SidenavResponsive,
    private operaPaymentService: OperaPaymentService,
    private snackBar: MatSnackBar
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {
    this.getOperationTypes()
  }

  resetPicker(event) {
    if (event == 'fromDate') {
      this.fromDate = '';
      this.filterTransaction();
    } else if (event == 'toDate') {
      this.toDate = '';
      this.filterTransaction();
    }
  }

  getOperationTypes() {
    this.loading = true
    this.spinner.show()
    this.countOperationTypes()

    this.operaPaymentService
      .listOperaTransactions(this.fromDate, this.toDate, "")
      .toPromise()
      .then((res: any) => {
        console.log(res)
        this.transactions = res["transactions"]
        console.log(this.transactions)
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

  filterTransaction() {
    this.transactions = [];
    this.succeedTransactionCount = 0;
    this.failedTransactionCount = 0;
    this.totalTransactionAmount = 0;
    this.spinner.show();
    if ((this.fromDate == '' || this.toDate == '') && this.cardNumber == '') {
      this.snackBar.open("Configure start date, end date and group correctly.", null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
      this.spinner.hide();
    } else if (this.fromDate != undefined && this.toDate != undefined && (moment(this.toDate.toString()).diff(moment(this.fromDate.toString()), 'day') < 0)) {
      this.snackBar.open("Configure start date and end date correctly, \n start date can't be after end date.", null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
      this.spinner.hide();
    } else {
      this.operaPaymentService.listOperaTransactions(this.fromDate, this.toDate, this.cardNumber).toPromise().then((res: any) => {
        this.transactions = res["transactions"];
        this.succeedTransactionCount = res['succeedTransactionCount']
        this.failedTransactionCount = res['failedTransactionCount']
        this.totalTransactionAmount = res['totalTransactionAmount']
        this.spinner.hide();
        this.snackBar.open("Transactions filterd successfully.", null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-success"
        });
      }).catch(err => {
        this.spinner.hide();
        let message = "";
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED;
          this.sidNav.Logout();
        }else if (err.status === 500) {
          message = ErrorMessages.ENTERNAL_SERVER_ERROR;
          this.sidNav.Logout();
        } else if (err.error.message) {
          message = err.error.message;
        } else if (err.message) {
          message = err.message;
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-fail"
        });
      });
    }
  }
}
