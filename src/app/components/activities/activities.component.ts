import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

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

}
