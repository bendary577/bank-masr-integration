import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { JournalService } from 'src/app/services/journal/journal.service';

@Component({
  selector: 'app-approved-invoice-infor-configuration',
  templateUrl: './approved-invoice-infor-configuration.component.html',
  styleUrls: ['./approved-invoice-infor-configuration.component.scss']
})
export class ApprovedInvoiceInforConfigurationComponent implements OnInit {
  userDefinedFlag = false;

  syncJobType: SyncJobType;
  submitted = false;
  loading = true;
  groupLoading = true;

  businessUnits = [];
  PaymentMethods = [];
  timePeriods = ["All", "Current Year", "Current Month", "Last Month", "Last Year", "User-defined"];
  analysis = [];
  overGroups = [];
  selectedOverGroups = [];
  uniqueOverGroupMapping = false;

  constructor(private spinner: NgxSpinnerService, private journalService:JournalService,
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService,
     private accSyncTypeService:AccSyncTypeService, private sidNav: SidenavResponsive) {
  }

  ngOnInit() {
    this.getSyncJobType();
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.analysis = this.syncJobType.configuration["analysis"];
      this.overGroups = this.syncJobType.configuration["overGroups"];
      this.uniqueOverGroupMapping = this.syncJobType.configuration["uniqueOverGroupMapping"];

      if (this.uniqueOverGroupMapping){
        this.getOverGroups();
      }
      this.loading = false;
    }).catch(err => {
      console.error(err);

      let message = "";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.message){
        message = err.message;
      } else if (err.error.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SYNC;
      }

      this.snackBar.open(message , null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.loading = false;
    });
  }

  getOverGroups() {
    this.groupLoading = true;
    this.spinner.show();
    this.journalService.getOverGroups(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
      this.overGroups = res.data;
      this.groupLoading = false;
      this.spinner.hide();
    }).catch(err => {
      let message = "Error happend, Please try again.";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
          this.sidNav.Logout();

      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.groupLoading = false;
      this.spinner.hide();
    });
  }

  onSaveClick(): void {
    this.spinner.show();

    this.selectedOverGroups = [];
    let that = this;
    // Check if there is overgroup mapping
    if (this.overGroups.length != 0){
      let that = this;
      this.overGroups.forEach(function (overGroup) {
        if (overGroup.checked) {
          that.selectedOverGroups.push(overGroup)
        }
      });

      if (this.selectedOverGroups.length != 0){
        this.syncJobType.configuration["overGroups"] = this.selectedOverGroups;
      }
    }

    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.spinner.hide();
      this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
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
        message = ErrorMessages.FAILED_TO_SYNC;
      }

      this.snackBar.open(message , null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.router.navigate([Constants.SYNC_JOBS]);
    });
  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

  chooseTimePeriod(){
    if(this.syncJobType.configuration.timePeriod == "UserDefined"){
      this.userDefinedFlag = true;
    }else{
      this.userDefinedFlag = false;
    }
  }
}
