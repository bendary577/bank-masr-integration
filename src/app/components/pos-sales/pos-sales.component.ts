import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJob } from 'src/app/models/SyncJob';
import { PosSalesService } from 'src/app/services/posSales/pos-sales.service';

@Component({
  selector: 'app-pos-sales',
  templateUrl: './pos-sales.component.html',
  styleUrls: ['./pos-sales.component.scss']
})
export class PosSalesComponent implements OnInit {

  loading = true;
  getPosSalesLoading = false;
  success = null;
  jobs = [];
  posSales = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService,
    private journalService: JournalService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private posSalesService:PosSalesService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.POS_SALES_SYNC);
    if (this.state == "true"){
      this.getPosSalesLoading = true;
    }
    else{
      this.getPosSalesLoading = false;
    }
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
    this.getPosSalesLoading = true;
    this.posSalesService.getPOSSales().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.POS_SALES_SYNC);
      this.getPosSalesLoading = false;
      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

    }).catch(err => {
      this.getPosSalesLoading = false;

      let msg = "";
      if (err.error.message){
        msg = err.error.message ;
      }
      else{
        msg = "Failed to sync Approved Invoices completely!"
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
