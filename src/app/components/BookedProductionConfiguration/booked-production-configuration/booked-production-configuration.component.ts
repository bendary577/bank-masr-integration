import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { CostCenter } from 'src/app/models/CostCenter';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { JournalService } from 'src/app/services/journal/journal.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../../sidenav/sidenav-responsive';

@Component({
  selector: 'app-booked-production-configuration',
  templateUrl: './booked-production-configuration.component.html',
  styleUrls: ['./booked-production-configuration.component.scss']
})
export class BookedProductionConfigurationComponent implements OnInit {
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
  accountERD;
  analysisCodes = ["1","2","3","4","5","6","7","8","9","10"];

  constructor(private spinner: NgxSpinnerService, private syncJobService:SyncJobService,  private journalService:JournalService,
    private accSyncTypeService:AccSyncTypeService, private router:Router, public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive) {
      this.costCenters = [];
      this.overGroups = [];
  }

  ngOnInit() {
    this.getSyncJobType();
    this.accountERD = localStorage.getItem('accountERD');
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.BOOKED_PRODUCTION_SYNC).toPromise().then((res: any) => {
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
    this.journalService.getOverGroups(Constants.BOOKED_PRODUCTION_SYNC).toPromise().then((res: any) => {
      this.overGroups = res.data;
      this.groupLoading = false;
      this.spinner.hide();
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

      this.groupLoading = false;
      this.spinner.hide();
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;
    
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
}
