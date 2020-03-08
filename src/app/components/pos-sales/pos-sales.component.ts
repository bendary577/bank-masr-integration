import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { PosSalesService } from 'src/app/services/posSales/pos-sales.service';

@Component({
  selector: 'app-pos-sales',
  templateUrl: './pos-sales.component.html',
  styleUrls: ['./pos-sales.component.scss']
})
export class PosSalesComponent implements OnInit {

  loading = true;
  static getPosSalesLoading = false;
  success = null;
  jobs = [];
  posSales = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private posSalesService:PosSalesService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.POS_SALES_SYNC);
    this.state = localStorage.getItem('getPosSalesLoading');
    if (this.state == "true"){
      PosSalesComponent.getPosSalesLoading = true;
    }
    else{
      PosSalesComponent.getPosSalesLoading = false;
    }
  }

  get staticgetPosSalesLoading() {
    return PosSalesComponent.getPosSalesLoading ;
  }

  getPOSSales() {
    this.spinner.show();
    this.syncJobService.getSyncJobData(Constants.POS_SALES_SYNC).toPromise().then((res: any) => {
      this.posSales = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getPOSSalesSyncJob() {
    localStorage.setItem('getPosSalesLoading', "true");
    PosSalesComponent.getPosSalesLoading = true;
    this.posSalesService.getPOSSales().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.POS_SALES_SYNC);

      localStorage.setItem('getPosSalesLoading', "false");
      PosSalesComponent.getPosSalesLoading = false;
      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

    }).catch(err => {
      this.getSyncJobs(Constants.POS_SALES_SYNC);

      localStorage.setItem('getPosSalesLoading', "false");

      PosSalesComponent.getPosSalesLoading = false;

      let msg = "";
      if (err.error.message){
        msg = err.error.message ;
      }
      else{
        msg = "Failed to sync POS sales completely!"
      }

      this.snackBar.open(msg , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });

  }

  getSyncJobs(syncJobTypeName:String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0];
      if (this.jobs.length > 0){
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  
  getSyncJobData() {
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.posSales = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }
}
