import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJob } from 'src/app/models/SyncJob';
import { WastageService } from 'src/app/services/wastage/wastage.service';
import { Constants } from 'src/app/models/constants';


@Component({
  selector: 'app-wastage',
  templateUrl: './wastage.component.html',
  styleUrls: ['./wastage.component.scss']
})
export class WastageComponent implements OnInit {

  loading = true;
  static getWastageLoading = false;
  success = null;
  jobs = [];
  wastage = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private syncJobService:SyncJobService, private wastageService:WastageService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.WASTARGE_SYNC);
    this.state = localStorage.getItem('getWastageLoading');

    if (this.state == "true"){
      WastageComponent.getWastageLoading = true;
    }
    else{
      WastageComponent.getWastageLoading = false;
    }
  }

  get staticgetWastageLoading() {
    return WastageComponent.getWastageLoading ;
  }

  getWastageSyncJob() {
    localStorage.setItem('getWastageLoading', "true");
    WastageComponent.getWastageLoading = true;

    this.wastageService.getWastage().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs(Constants.WASTARGE_SYNC);
      
      if (this.success){
        this.snackBar.open('Sync Wastage Successfully', null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }

      localStorage.setItem('getWastageLoading', "false");
      WastageComponent.getWastageLoading = false;
    }).catch(err => {
      this.getSyncJobs(Constants.WASTARGE_SYNC);

      localStorage.setItem('getWastageLoading', "false");
      WastageComponent.getWastageLoading = false;
      
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      localStorage.setItem('getWastageLoading', "false");
      WastageComponent.getWastageLoading = false;
    });
  }

  getSyncJobs(syncJobTypeName:String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0]
      if (this.jobs.length > 0){
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobData() {
    this.spinner.show();
    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.wastage = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

}
