import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { WastageService } from 'src/app/services/wastage/wastage.service';
import { JournalService } from 'src/app/services/journal/journal.service';

@Component({
  selector: 'app-wastage-configuration',
  templateUrl: './wastage-configuration.component.html',
  styleUrls: ['./wastage-configuration.component.scss']
})
export class WastageConfigurationComponent implements OnInit {

  syncJobTypeloading = true;
  saveLoading = false;
  groupLoading = true;
  wasteLoading = true;
  selectedTender = [];
  overGroups = [];
  wasteGroups = [];
  selectedWasteGroups = [];
  selectedOverGroups = [];

  syncJobType: AccountSyncType;  

  constructor(private spinner: NgxSpinnerService, private wasteService:WastageService,
    private journalService:JournalService,
     private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSyncJobType();
    this.getWasteGroups();
    this.getOverGroups();
  }

  getSyncJobType(){
    this.syncJobTypeloading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.WASTARGE_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.syncJobTypeloading = false;
    }).catch(err => {
      console.error(err);
      this.syncJobTypeloading = false;
    });
  }

  
  getOverGroups() {
    this.groupLoading = true;
    this.journalService.getOverGroups(Constants.WASTARGE_SYNC).toPromise().then((res: any) => {
      this.overGroups = res.data;
      this.groupLoading = false;
    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.groupLoading = false;
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
      if (wasteGroup.checked){
        that.selectedWasteGroups.push(wasteGroup)
      }
    });

    this.overGroups.forEach(function (overGroup) {
      if (overGroup.checked){
        that.selectedOverGroups.push(overGroup)
      }
    });

    if (this.selectedWasteGroups.length != 0) {
      this.syncJobType.configuration["wasteGroups"] = this.selectedWasteGroups;
    }
    if(this.selectedOverGroups.length != 0){
      this.syncJobType.configuration["overGroups"] = this.selectedOverGroups;
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

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
