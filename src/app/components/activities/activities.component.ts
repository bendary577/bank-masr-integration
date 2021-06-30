import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import {Location} from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';
import { Group } from 'src/app/models/loyalty/Group';
import * as moment from 'moment';
import { saveAs } from 'file-saver';
import { ExcelService } from 'src/app/services/excel/excel.service';

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
  selectedGuest =  '';
  props= [""];
  guestNames= [];
  fromDate = '';
  toDate= '';
  selectedGroupId =  '';
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
    private sidNav: SidenavResponsive,private loyaltyService: LoyaltyService, private excelService: ExcelService , private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.getTopUsers();
    this.getTopGroups();
    this.totalSpend("Total");
  }

  refresh() {
    location.reload();
  }
  
  totalSpend(date){
    this.restFilters()
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
      this.topGroups = this.groups.slice(0, 3)
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

  getTransInRangAndGroup(){

    if((this.fromDate ==  '' || this.toDate == '') && this.selectedGroupId == ''){

      this.snackBar.open("Configure start date, end date and group correctly." , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      return null;
    }

    if( this.fromDate !=  undefined && this.toDate != undefined && (moment(this.toDate.toString()).diff(moment(this.fromDate.toString()), 'day') < 0 )){
      
      this.snackBar.open("Configure start date and end date correctly, \n start date can't be after end date." , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      return null;
    }

    this.transactionList.transactionData = [];
    this.transactionList.showLoading = true;


    this.loyaltyService.getTotalTransInRang(this.fromDate, this.toDate, this.selectedGroupId).toPromise().then((res: any) => {
      
      this.transactionList.transactionData = res["transactions"];
      this.totalSpendM = res["totalSpend"];

      this.transactionList.showLoading = false;
      this.snackBar.open("Transactions filterd successfully." , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

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

  validatefilter(){
    return false;
  }

  restFilters(){
    this.fromDate = '';
    this.toDate = '';
    this.selectedGroupId = '';
  }

  extractExcelFile(){

    this.spinner.show();
    this.excelService.exporttransactionExcel( this.transactionList.transactionData).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "Transactions" + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
        this.spinner.hide();

      },
      err => {
        this.spinner.hide();

        console.error(err)
        this.snackBar.open("Fail to export, Please try agian" , null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
   );
  }
}
