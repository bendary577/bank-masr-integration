import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { FormGroup } from '@angular/forms';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { CostCenter } from 'src/app/models/CostCenter';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-booked-transfer-infor-configuration',
  templateUrl: './booked-transfer-infor-configuration.component.html',
  styleUrls: ['./booked-transfer-infor-configuration.component.scss']
})
export class BookedTransferInforConfigurationComponent implements OnInit {
  userDefinedFlag = false;

  loading = true;
  save_loading = false;
  syncTypeLoading = true
  groupLoading = true;

  uniqueOverGroupMapping = false;

  syncJobType: AccountSyncType;

  costCenters: CostCenter[] = [];
  overGroups = [];
  selectedCostCenters = [];
  selectedOverGroups = [];
  mappedItems:[] = [];
  analysis = [];

  AccountSettingsForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private syncJobService:SyncJobService, private journalService:JournalService,
    private accSyncTypeService:AccSyncTypeService, private router:Router, public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive) {
      this.costCenters = [];
      this.overGroups = [];
  }

  ngOnInit() {
    this.getSyncJobType();
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.BOOKED_TRANSFER_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.costCenters = this.syncJobType.configuration["costCenters"];
      this.overGroups = this.syncJobType.configuration["overGroups"];
      this.analysis = this.syncJobType.configuration["analysis"];
      this.mappedItems = res.configuration.items;
      this.uniqueOverGroupMapping = this.syncJobType.configuration["uniqueOverGroupMapping"];

      if (this.uniqueOverGroupMapping){
        this.getOverGroups();
      }

      this.loading = false;
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
        message = ErrorMessages.FAILED_TO_SYNC;
      }

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.loading = false;
    });
  }

  getOverGroups() {
    this.groupLoading = true;
    this.spinner.show();
    this.journalService.getOverGroups(Constants.BOOKED_TRANSFER_SYNC).toPromise().then((res: any) => {
      this.overGroups = res.data;
      this.groupLoading = false;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);

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

      this.snackBar.open(err.error.message , null, {
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
    this.save_loading = true;

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
      this.snackBar.open('Save configuration successfully.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
      this.spinner.hide();
      this.save_loading = false;

      this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
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
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
      this.save_loading = false;
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
