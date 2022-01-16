import { Component, OnInit, ViewChild } from '@angular/core'
import { DateAdapter } from '@angular/material/core';
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
    private dateAdapter: DateAdapter<Date>,
    public data: Data
  ) {
    this.dateAdapter.setLocale('en-GB');
  }

  ngOnInit(): void {

    if(this.data != null && this.data.storage != undefined){
       localStorage.setItem('currentCheck', JSON.stringify(this.data.storage.transactionResponses));
       this.transactions = this.data.storage.transactionResponses;
    }else{
      this.transactions = JSON.parse(localStorage.getItem('currentCheck'));
    }
  }


}
