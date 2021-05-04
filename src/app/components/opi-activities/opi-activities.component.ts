import { Component, OnInit } from '@angular/core';
import { Transactions } from '../opi-transactions/transactions';
import { TransactionsItems } from '../opi-transactions/transactions-items';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'app-opi-activities',
  templateUrl: './opi-activities.component.html',
  styleUrls: ['./opi-activities.component.scss']
})
export class OpiActivitiesComponent implements OnInit {

  totalCheckIn = 2;
  totalcheckOut = 3; 
  totalTransactions = 5;

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

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
    
  public pieChartData: SingleDataSet = [this.totalTransactions, this.totalCheckIn, this.totalcheckOut];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartLabels: Label[] = ['Transactions', 'Check In', 'Check Out'];

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 82, 33, 79, 56, 55, 40], label: 'Series A' },
  ];
  
  public lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  public lineChartOptions: (ChartOptions) = {
    responsive: true,
  };

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.totalSpend('today')
  }

  totalSpend(date){
    
  }

  no(){
    
  }
}
