import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { WastageService } from 'src/app/services/wastage/wastage.service';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-wastage-infor',
  templateUrl: './wastage-infor.component.html',
  styleUrls: ['./wastage-infor.component.scss']
})
export class WastageInforComponent implements OnInit {

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
      WastageInforComponent.getWastageLoading = true;
    }
    else{
      WastageInforComponent.getWastageLoading = false;
    }
  }

  get staticgetWastageLoading() {
    return WastageInforComponent.getWastageLoading ;
  }

  getWastageSyncJob() {
    localStorage.setItem('getWastageLoading', "true");
    WastageInforComponent.getWastageLoading = true;

    this.wastageService.getWastage().toPromise().then((res: any) => {
      this.success = res.success;
      if (this.success){
        this.snackBar.open(res.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
      
      this.getSyncJobs(Constants.WASTARGE_SYNC);
    
      localStorage.setItem('getWastageLoading', "false");
      WastageInforComponent.getWastageLoading = false;
    }).catch(err => {
      this.getSyncJobs(Constants.WASTARGE_SYNC);
      
      localStorage.setItem('getWastageLoading', "false");
      WastageInforComponent.getWastageLoading = false;
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
