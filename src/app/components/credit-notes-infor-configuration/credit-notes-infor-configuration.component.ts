import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-credit-notes-infor-configuration',
  templateUrl: './credit-notes-infor-configuration.component.html',
  styleUrls: ['./credit-notes-infor-configuration.component.scss']
})
export class CreditNotesInforConfigurationComponent implements OnInit {
  userDefinedFlag = false;
  syncJobType: SyncJobType;
  submitted = false;
  loading = true;
  costCenterLoding = true;
  costCenters = [];
  businessUnits = [];
  PaymentMethods = [];
  selectedCostCenters = [];
  timePeriods = ["All", "Current Year", "Current Month", "Last Month", "Last Year", "User-defined"];
  analysisCodes = [null,"1","2","3","4","5","6","7","8","9","10"];
  analysis = [];
  accountERD;

  constructor(private spinner: NgxSpinnerService, private sidNav: SideNaveComponent,
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService) {
  }

  ngOnInit() {
    this.getSyncJobType();
    this.accountERD = localStorage.getItem('accountERD');
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.CREDIT_NOTE_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.analysis = this.syncJobType.configuration["analysis"];
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();
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

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
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
