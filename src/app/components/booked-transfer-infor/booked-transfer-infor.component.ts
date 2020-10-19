import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { TransferService } from 'src/app/services/transfer/transfer.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Router } from '@angular/router';
import { SyncJob } from 'src/app/models/SyncJob';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-booked-transfer-infor',
  templateUrl: './booked-transfer-infor.component.html',
  styleUrls: ['./booked-transfer-infor.component.scss']
})
export class BookedTransferInforComponent implements OnInit {


  loading = true;
  static getTransfersLoading = false;
  bookedTransfer = [];
  jobs = [];
  syncJobId = -1;
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private transferService: TransferService,
    public snackBar: MatSnackBar, private syncJobService:SyncJobService, private router:Router,
    private sidNav: SidenavResponsive, private excelService: ExcelService
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

  get staticgetTransfersLoading() {
    return BookedTransferInforComponent.getTransfersLoading ;
  }

  getBookedTransferSyncJob() {
    localStorage.setItem('getTransfersLoading', "true");
    BookedTransferInforComponent.getTransfersLoading = true;

    this.transferService.getBookedTransfer().toPromise().then((res: any) => {
      this.getSyncJobs("Booked Transfers");

      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }

      localStorage.setItem('getTransfersLoading', "false");
      BookedTransferInforComponent.getTransfersLoading = false;
    }).catch(err => {
      localStorage.setItem('getTransfersLoading', "false");
      BookedTransferInforComponent.getTransfersLoading = false;

      let message = "";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SYNC;
      }

      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.getSyncJobs("Booked Transfers");
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

  exportToXLSX():void {
    this.excelService.exportTransfersToExcel(this.selectedJob.id).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "Transfers" + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      },
      err => {
        console.error(err)
        this.snackBar.open("Fail to export, Please try agian" , null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
   );
  }

}
