import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';

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

  constructor(private spinner: NgxSpinnerService, private transferService: TransferService,
    public snackBar: MatSnackBar, private syncJobService:SyncJobService,
    ) {

  }

  ngOnInit() {
    this.getBookedTransferDB();
    this.getSyncJobs("Get Booked Transfers");
  }

  getBookedTransferDB() {
    this.spinner.show();
    this.transferService.getBookedTransferDB().toPromise().then((res: any) => {
      console.log(res.items);
      this.bookedTransfer = res.items;
      
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
      this.getBookedTransferDB();

      if (this.success){
        this.snackBar.open('Sync Booked Transfers Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open('Sync Booked Transfers Failed', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobs(syncJobTypeName:String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      console.log(res);
      this.jobs = res;
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobData(syncJobId:String) {
    console.log(syncJobId)
    this.spinner.show();
    this.syncJobService.getSyncJobData(syncJobId).toPromise().then((res: any) => {
      this.bookedTransfer = res.items;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }



}
