import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';

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
    transactionData: [] 
  };

  props = {  'background-color' : '#e07d93'  };
  props2 = {  'background-color' : '#3F51B5'  };
  noFilter = true;
  selectedGuest="";
  guestNames= [];


  public barChartOptions: ChartOptions = {
    responsive: true,
  };
  public rvcBarChartLabels: Label[] = ['Retaurant 1', 'Retaurant 2', 'Retaurant 3', 'Retaurant 4'];
  public rvcBarChartType: ChartType = 'bar';
  public rvcBarChartLegend = true;
  public rvcBarChartPlugins = [];
  public rvcBlue= ["rgba(224, 108, 112, 1)",
  "rgba(224, 108, 112, 1)",
  "rgba(224, 108, 112, 1)"]
  public rvcBarChartData: ChartDataSets[] = [
    { data: [ , 20], label: 'Sales Per Revenue Center' },
  ];
  
  public traBarChartLabels: Label[] = ['1', '2', '3', '4','5','6','7','8','9','10','11'];
  public traBarChartType: ChartType = 'bar';
  public traBarChartLegend = true;
  public traBarChartPlugins = [];
  // public traBlue= ['blue', 'blue', 'blue', 'blue']
  public traBarChartData: ChartDataSets[] = [
    { data: [ , , , 20], label: 'Transaction' },
  ];

  constructor(public snackBar: MatSnackBar, private router: Router, private _location: Location,
    private sidNav: SidenavResponsive,private loyaltyService: LoyaltyService, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTopUsers();
    this.getTopGroups();
    this.totalSpend("Total");
  }

  refresh() {
    location.reload();
  }
  
  totalSpend(date){
    this.spinner.show();
    this.loyaltyService.getTotalSpend(date).toPromise().then((res: any) => {
      this.getTransactions(date);
      this.spinner.hide();
      this.totalSpendM = res["totalSpend"];
    }).catch(err => {
      this.spinner.hide();
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });  
  }

  getTopUsers(){
    this.loyaltyService.getTopUsers().toPromise().then((res: any) => {
      this.users = res;
    }).catch(err => {
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });  
  }

  getTopGroups(){
    this.loyaltyService.getTopGroups().toPromise().then((res: any) => {
      this.groups = res;
    }).catch(err => {
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });  
  }

  getTransactions(time){

    this.transactionList.transactionData = [];
    this.transactionList.showLoading = true;
    this.loyaltyService.getTransactions( Constants.REDEEM_VOUCHER, time).toPromise().then((res: any) => {
      this.transactionList.transactionData = res;
      this.transactionList.showLoading = false;

    }).catch(err => {
      this.transactionList.showLoading = false;
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  closeCard(){

  }

  filterByGuestName(){
    // this.getUsers();
    // this.usersList.usersData = [this.usersList.usersData[0]]
    // console.log(this.usersList.usersData)
    // this.guestNames.push(this.selectedGuest);
  }

}
