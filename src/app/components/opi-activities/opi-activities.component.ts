import { Component, OnInit } from '@angular/core';
import { Transactions } from '../opi-transactions/transactions';
import { TransactionsItems } from '../opi-transactions/transactions-items';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, Color } from 'ng2-charts';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { MatDialog } from '@angular/material';
import { AddAppUserComponent } from '../add-app-user/add-app-user.component';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-opi-activities',
  templateUrl: './opi-activities.component.html',
  styleUrls: ['./opi-activities.component.scss']
})
export class OpiActivitiesComponent implements OnInit {

  totalCheckIn = 60;
  totalcheckOut = 30;
  totalTransactions = 125;
  totalCurrentInHouse = 22;

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

  public pieChartData: SingleDataSet = [this.totalTransactions, this.totalCheckIn, this.totalcheckOut, this.totalCurrentInHouse];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartLabels: Label[] = ['Transactions', 'Check In', 'Check Out', 'In House'];

  public lineChartData: ChartDataSets[] = [
    { data: [33, 24, 67, 34, 98, 31, 27, 38], label: 'In House' },
    { data: [22, 57, 75, 57, 68, 47, 99, 33], label: 'Check In' },
    { data: [28, 19, 37, 64, 57, 34, 21, 77], label: 'Check Out' },
    { data: [65, 59, 82, 33, 79, 56, 55, 40], label: 'Transactions' },
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

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public barChartLabels: Label[] = ['2010', '2011', '2012'];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
  ];

  constructor(public dialog: MatDialog) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.totalSpend('today')
  }

  totalSpend(date) {
  }

  no() {
  }

  openFilter() {
    const dialogRef = this.dialog.open(FilterComponent, {
      width: '550px',
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    })
  }
}
