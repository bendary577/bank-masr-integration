import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { OperaPaymentService } from 'src/app/services/operaPayment/opera-payment.service'
import { SidenavResponsive } from '../../sidenav/sidenav-responsive'
import { DateAdapter } from '@angular/material/core';
import * as moment from 'moment';
import { Data } from 'src/app/models/data'

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
    private snackBar: MatSnackBar,
    public data: Data
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {

    if(this.data != null && this.data.storage != undefined){
      console.log(this.data);
       localStorage.setItem('currentCheck', JSON.stringify(this.data.storage.transactionResponses));
       this.transactions = this.data.storage.transactionResponses;
    }else{
      this.transactions = JSON.parse(localStorage.getItem('currentCheck'));
    }
  }


}
