import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Router } from '@angular/router';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-booked-transfer',
  templateUrl: './booked-transfer.component.html',
  styleUrls: ['./booked-transfer.component.scss']
})
export class BookedTransferComponent implements OnInit {

  loading = true;
  success = null;
  bookedTransfer = [];
  jobs = [];
  syncJobId = -1;
  selectedJob :SyncJob = null;


  constructor(private spinner: NgxSpinnerService, private transferService: TransferService,
    public snackBar: MatSnackBar, private syncJobService:SyncJobService, private router:Router
    ) {

  }

  ngOnInit() {
    this.getBookedTransferDB();
    this.getSyncJobs("Booked Transfers");
  }

  getBookedTransferDB() {
    this.spinner.show();
    this.syncJobService.getSyncJobData("Booked Transfers").toPromise().then((res: any) => {
      this.bookedTransfer = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getBookedTransferSyncJob() {
    this.spinner.show();
    this.transferService.getBookedTransfer().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs("Booked Transfers");

      if (this.success){
        this.snackBar.open('Sync Booked Transfers Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.getSyncJobs("Booked Transfers");
      
      this.snackBar.open('Sync Booked Transfers Failed', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobs(syncJobTypeName:String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0];
      this.getSyncJobData();

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
      this.bookedTransfer = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  showDetails(transfer){
    this.router.navigate(['bookedTransfersDetails', transfer])
  }


}
