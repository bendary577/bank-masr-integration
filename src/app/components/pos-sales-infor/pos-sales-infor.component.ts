import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { PosSalesService } from 'src/app/services/posSales/pos-sales.service';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-pos-sales-infor',
  templateUrl: './pos-sales-infor.component.html',
  styleUrls: ['./pos-sales-infor.component.scss']
})
export class PosSalesInforComponent implements OnInit {

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
    if (this.state == "true") {
      PosSalesInforComponent.getPosSalesLoading = true;
    }
    else{
      PosSalesInforComponent.getPosSalesLoading = false;
    }
  }

  get staticgetPosSalesLoading() {
    return PosSalesInforComponent.getPosSalesLoading ;
  }

  getPOSSales() {
    this.spinner.show();
    this.syncJobService.getSyncJobData(Constants.POS_SALES_SYNC).toPromise().then((res) => {
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
    PosSalesInforComponent.getPosSalesLoading = true;
    this.posSalesService.getPOSSales().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.POS_SALES_SYNC);

      localStorage.setItem('getPosSalesLoading', "false");
      PosSalesInforComponent.getPosSalesLoading = false;

      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        console.log(res.message)
        this.snackBar.open(res.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }

    }).catch(err => {
      this.getSyncJobs(Constants.POS_SALES_SYNC);

      localStorage.setItem('getPosSalesLoading', "false");

      PosSalesInforComponent.getPosSalesLoading = false;

      let msg = "";
      if (err.error.message) {
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

  getSyncJobs(syncJobTypeName: string) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0];
      if (this.jobs.length > 0) {
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
