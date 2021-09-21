import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { Location } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  filterBy = "Daily";
  imagePath = './src/assets/user.png';
  totalSpendM: any;
  users = [];
  groups = [];
  topGroups = [];
  topRevenueCenters = [];
  revenues = ["Take Away", "", ""];
  expenses = [90];
  guests = [];
  fromDate = '';
  toDate = '';
  selectedGroupId = '';
  selectedRevenue = '';
  selectedGuestName = '';
  selectedCardNum = '';
  selectedCardStatues = '';
  guestAverage = 0;
  selections = [];
  statues = ['Active', 'Expired', 'Deleted']
  props = { 'background-color': '#e07d93' };
  props2 = { 'background-color': '#3F51B5' };
  noFilter = true;

  transactionList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-align: center;">There are no reports yet.</span>
    </div>
  `
    },
    selected: [],
    transactionCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    transactionData: [],
    allTransactionDataBeforeFilter: [],
    firstTime: true
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public rvcBarChartLabels: Label[] = this.revenues;
  public rvcBarChartType: ChartType = 'bar';
  public rvcBarChartLegend = true;
  public rvcBarChartPlugins = [];
  public rvcBlue = ["rgba(224, 108, 112, 1)", "rgba(224, 108, 112, 1)", "rgba(224, 108, 112, 1)"]
  public rvcBarChartData: ChartDataSets[] = [
    { data: this.expenses, label: 'Sales Per Revenue Center' },
  ];

  // public traBarChartLabels: Label[] = ['1', '2', '3', '4','5','6','7','8','9','10','11'];
  // public traBarChartType: ChartType = 'bar';
  // public traBarChartLegend = true;
  // public traBarChartPlugins = [];
  // // public traBlue= ['blue', 'blue', 'blue', 'blue']
  // public traBarChartData: ChartDataSets[] = [
  //   { data: [ , , , 20], label: 'Transaction' },
  // ];

  constructor(public snackBar: MatSnackBar, private router: Router, private _location: Location,
    private sidNav: SideNaveComponent, private loyaltyService: LoyaltyService, private excelService: ExcelService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTopUsers();
    this.getTopGroups();
    this.totalSpend("Total");

  }

  refresh() {
    location.reload();
  }

  totalSpend(date) {
    this.restFilters()
    this.spinner.show();
    this.loyaltyService.getTotalSpend(date).toPromise().then((res: any) => {
      this.getTransactions(date);
      this.spinner.hide();
      this.totalSpendM = res["totalSpend"];
      this.revenues = res["revenues"];
      this.expenses = res["expenses"];
      // this.topRevenueCenters = res["topRevenueCenters"]
      this.calculteChart();
      console.log(this.expenses)
      console.log(this.revenues)
    }).catch(err => {
      this.spinner.hide();
      let message = "";
      if (err.status === 401) {
        message = ErrorMessages.SESSION_EXPIRED;
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

  getTopUsers() {
    this.loyaltyService.getTopUsers().toPromise().then((res: any) => {
      this.users = res;
    }).catch(err => {
      let message = "";
      if (err.status === 401) {
        message = ErrorMessages.SESSION_EXPIRED;
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

  getTopGroups() {
    this.loyaltyService.getTopGroups().toPromise().then((res: any) => {
      this.groups = res;
      this.topGroups = this.groups.slice(0, 3)
    }).catch(err => {
      let message = "";
      if (err.status === 401) {
        message = ErrorMessages.SESSION_EXPIRED;
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

  getTransactions(time) {
    this.transactionList.transactionData = [];
    this.transactionList.showLoading = true;
    this.loyaltyService.getTransactions(Constants.REDEEM_VOUCHER, time).toPromise().then((res: any) => {
      this.transactionList.transactionData = res;
      this.allTransactionDataBeforeFilter();
      this.transactionList.showLoading = false;
      this.averageGuests();
      this.calculteChart();
    }).catch(err => {
      this.transactionList.showLoading = false;
      let message = "";
      if (err.status === 401) {
        message = ErrorMessages.SESSION_EXPIRED;
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

  calculteChart() {
    this.revenues = [];
    this.expenses = [];
    this.topRevenueCenters = [];
    let transactions = this.transactionList.transactionData;
    let revenue;
    for (let i = 0; i < transactions.length; i++) {
      revenue = transactions[i].revenueCentreName;
      let expenses = 0;
      if (this.notExistInRevenues(revenue)) {
        for (let j = 0; j < transactions.length; j++) {
          if (transactions[j].revenueCentreName == revenue && revenue != "") {
            expenses = expenses + transactions[j].afterDiscount;
          }
        }
        this.revenues.push(revenue);
        this.expenses.push(expenses);
      }
    }
    this.grtTopRevenues(this.revenues, this.expenses);
    if(this.revenues.length == 1 || this.revenues.length == 2){
      this.revenues.push(...['', '']);
    }
  }

  grtTopRevenues(tempRevenue, tempExpence ){ 
    let revenueLength = tempRevenue.length;
    if (revenueLength > 5) { revenueLength = 5 }
    tempRevenue = tempRevenue.slice(0, revenueLength)
    tempExpence = tempRevenue.slice(0, revenueLength)
    let length = tempRevenue.length;
    if (length > 0) {
      if (length > 3) { length = 3 }
      var topValues = tempExpence.sort((a, b) => b - a).slice(0, length);
      this.topRevenueCenters = [tempRevenue[tempExpence.indexOf(topValues[0])],
      tempRevenue[tempExpence.indexOf(topValues[1])], tempRevenue[tempExpence.indexOf(topValues[2])]]
      this.topRevenueCenters = this.topRevenueCenters.sort((a, b) => b - a).slice(0, length);
    }
  }


  notExistInRevenues(revenue): Boolean {
    for (let i = 0; i < this.revenues.length; i++) {
      if (this.revenues[i] == revenue) {
        return false;
      }
    }
    return true;
  }

  allTransactionDataBeforeFilter() {
    if (this.transactionList.firstTime) {
      this.transactionList.firstTime = false;
      this.transactionList.allTransactionDataBeforeFilter = this.transactionList.transactionData;
    }
  }

  getTransInRangAndGroup() {
    if ((this.fromDate == '' || this.toDate == '') && this.selectedGroupId == '') {
      this.snackBar.open("Configure start date, end date and group correctly.", null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
      return null;
    }
    if (this.fromDate != undefined && this.toDate != undefined && (moment(this.toDate.toString()).diff(moment(this.fromDate.toString()), 'day') < 0)) {
      this.snackBar.open("Configure start date and end date correctly, \n start date can't be after end date.", null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
      return null;
    }
    this.transactionList.transactionData = [];
    this.transactionList.showLoading = true;

    this.loyaltyService.getTotalTransInRang(this.fromDate, this.toDate, this.selectedGroupId).toPromise().then((res: any) => {

      this.transactionList.transactionData = res["transactions"];
      this.totalSpendM =res["totalSpend"];
      this.revenues = res["revenues"];
      this.expenses = res["expenses"];
      this.topRevenueCenters = res["topRevenueCenters"]

      this.transactionList.showLoading = false;
      this.snackBar.open("Transactions filterd successfully.", null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-success"
      });
    }).catch(err => {
      this.transactionList.showLoading = false;
      let message = "";
      if (err.status === 401) {
        message = ErrorMessages.SESSION_EXPIRED;
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

  restFilters() {
    this.fromDate = '';
    this.toDate = '';
    this.selectedGroupId = '';
  }

  extractExcelFile() {
    this.spinner.show();
    this.excelService.exporttransactionExcel(this.transactionList.transactionData).subscribe(
      res => {
        const blob = new Blob([res], { type: 'application/vnd.ms.excel' });
        const file = new File([blob], "Transactions" + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-success"
        });
        this.spinner.hide();

      },
      err => {
        this.spinner.hide();
        console.error(err)
        this.snackBar.open("Fail to export, Please try agian", null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-fail"
        });
      }
    );
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference);
  }


  averageGuests() {
    let guests = [];
    let transactions = this.transactionList.transactionData;
    for (let i = 0; i < transactions.length; i++) {
      if (guests.indexOf(transactions[i].code) <= -1) {
        this.guestAverage += 1;
        guests.push(transactions[i].code)
      }
    }
  }

  resetPicker(event) {
    if(event == 'fromDate'){
      this.fromDate =  undefined;
      this.filterTransactions(event);
    }else if(event == 'toDate'){
      this.toDate = undefined;
      this.filterTransactions(event);
    }
  }

  filterTransactions(event) {
    const transactions = this.transactionList.allTransactionDataBeforeFilter;
    if (this.fromDate != "" && this.fromDate != undefined && this.toDate != undefined &&this.toDate != "") {
      this.transactionList.transactionData = transactions.filter(item => {
        return (new Date(item.transactionDate).getTime() >= new Date(this.fromDate).getTime() &&
          new Date(item.transactionDate).getTime() <= new Date(this.toDate).getTime())
      });
    }

    if (this.selectedCardNum != "") {
      const result = transactions.filter(s => s.code.includes(this.selectedCardNum));
      this.transactionList.transactionData = result
    }

    if (this.selectedGuestName != "") {
      const result = transactions.filter(s => s.user.name.includes(this.selectedGuestName));
      this.transactionList.transactionData = result
    }

    if (this.selectedRevenue != "") {
      const result = transactions.filter(s => s.revenueCentreName.includes(this.selectedRevenue));
      this.transactionList.transactionData = result
    }

    if (this.selectedCardStatues != "") {
      if (this.selectedCardStatues == 'Deleted') {
        const result = transactions.filter(s => {
          return (s.user.deleted == (1));
        });
        this.transactionList.transactionData = result
      } else if (this.selectedCardStatues == 'Active') {
        const result = transactions.filter(s => {
          return (s.user.deleted == (0));
        });
        this.transactionList.transactionData = result;
      } else if (this.selectedCardStatues == 'Expired') {
        const result = transactions.filter(s => {
          return (s.user.expire == (0));
        });
        this.transactionList.transactionData = result;
      }
    }

    if((!this.fromDate || !this.toDate) && !this.selectedCardNum && !this.selectedGuestName && 
    !this.selectedCardStatues && !this.selectedRevenue){
      this.transactionList.transactionData = this.transactionList.transactionData;
    }

  }

  resetFilter() {
    this.selectedGroupId = '';
    this.selectedRevenue = '';
    this.selectedGuestName = '';
    this.selectedCardNum = '';
    this.selectedCardStatues = '';
    this.transactionList.transactionData = this.transactionList.allTransactionDataBeforeFilter;
  }

  public lessThanOrEqualZero(expired): Boolean {
    if (expired) {
      return true
    }
    return false;
  }
}
