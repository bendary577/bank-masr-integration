import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { WastageService } from 'src/app/services/wastage/wastage.service';

@Component({
  selector: 'app-wastage-infor-configuration',
  templateUrl: './wastage-infor-configuration.component.html',
  styleUrls: ['./wastage-infor-configuration.component.scss']
})
export class WastageInforConfigurationComponent implements OnInit {
  userDefinedFlag = false;

  syncJobTypeloading = true;
  saveLoading = false;
  groupLoading = true;
  wasteLoading = true;
  selectedTender = [];
  wasteGroups = [];
  analysis = [];
  selectedWasteGroups = [];

  syncJobType: AccountSyncType;

  constructor(private spinner: NgxSpinnerService, private wasteService: WastageService,
     private syncJobService:SyncJobService, private accSyncTypeService: AccSyncTypeService,
     private router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSyncJobType();
    this.getWasteGroups();
  }

  getSyncJobType() {
    this.syncJobTypeloading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.WASTARGE_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.analysis = this.syncJobType.configuration["analysis"];
      this.syncJobTypeloading = false;
    }).catch(err => {
      console.error(err);
      this.syncJobTypeloading = false;
    });
  }

  getWasteGroups() {
    this.wasteLoading = true;
    this.spinner.show();
    this.wasteService.getwasteGroups().toPromise().then((res: any) => {
      this.wasteGroups = res.data;

      this.wasteLoading = false;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.wasteLoading = false;
      this.spinner.hide();
    });
  }


  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;

    let that = this;
    this.wasteGroups.forEach(function (wasteGroup) {
      if (wasteGroup.checked) {
        that.selectedWasteGroups.push(wasteGroup)
      }
    });

    if (this.selectedWasteGroups.length != 0) {
      this.syncJobType.configuration["wasteGroups"] = this.selectedWasteGroups;
    }

    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.snackBar.open('Save configuration successfully.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
      this.spinner.hide();
      this.saveLoading = false;
    }
    ).catch(err => {
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.spinner.hide();
      this.saveLoading = false;
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
