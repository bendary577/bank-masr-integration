import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Router } from '@angular/router';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-booked-transfer-infor',
  templateUrl: './booked-transfer-infor.component.html',
  styleUrls: ['./booked-transfer-infor.component.scss']
})
export class BookedTransferInforComponent implements OnInit {


  loading = true;
  static getTransfersLoading = false;
  success = null;
  bookedTransfer = [];
  jobs = [];
  syncJobId = -1;
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private transferService: TransferService,
    public snackBar: MatSnackBar, private syncJobService:SyncJobService, private router:Router
    ) {

  }

  ngOnInit() {
    this.getSyncJobs("Booked Transfers");
    this.state = localStorage.getItem('getTransfersLoading');

    if (this.state == "true") {
      BookedTransferInforComponent.getTransfersLoading = true;
    }
    else{
      BookedTransferInforComponent.getTransfersLoading = false;
    }
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

  get staticgetTransfersLoading() {
    return BookedTransferInforComponent.getTransfersLoading ;
  }

  getBookedTransferSyncJob() {
    localStorage.setItem('getTransfersLoading', "true");
    BookedTransferInforComponent.getTransfersLoading = true;

    this.transferService.getBookedTransfer().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs("Booked Transfers");

      if (this.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }

      localStorage.setItem('getTransfersLoading', "false");
      BookedTransferInforComponent.getTransfersLoading = false;
    }).catch(err => {
      this.getSyncJobs("Booked Transfers");

      localStorage.setItem('getTransfersLoading', "false");
      BookedTransferInforComponent.getTransfersLoading = false;

      this.snackBar.open(err.error.message, null, {
        duration: 2000,
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

  showDetails(transfer) {
    this.router.navigate(['bookedTransfersDetails', transfer])
  }



}
