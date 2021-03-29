import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJob } from 'src/app/models/SyncJob';
import { NewBookingReportService } from 'src/app/services/newBookingReport/new-booking-report.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { DilogServiceService } from '../dialog/dilog-service.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-cancel-booking-report',
  templateUrl: './cancel-booking-report.component.html',
  styleUrls: ['./cancel-booking-report.component.scss']
})
export class CancelBookingReportComponent implements OnInit {

  success = false;
  loading = true;
  static getCancelBookingLoding = false;
  
  jobs = [];
  selectedJob :SyncJob = null;

  cancelBookingList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no cancel booking.</span>
        </div>
      `
    },
    selected: [],
    newBookingCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    cancelBookingData: [] 
  };


  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive, public dialogService: DilogServiceService,
    private syncJobService: SyncJobService,
    private newBookingService: NewBookingReportService) { }

  ngOnInit(): void {
    this.getSyncJobs(Constants.CANCEL_BOOKING_REPORT_SYNC);
  }

  onSelect({selected}) {
    this.cancelBookingList.selected.splice(0, this.cancelBookingList.selected.length);
    this.cancelBookingList.selected.push(...selected);
  }

  get staticgetCancelBookingLoading() {
    return CancelBookingReportComponent.getCancelBookingLoding ;
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
      this.cancelBookingList.cancelBookingData = res;
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  async syncCancelBooking(){
    this.cancelBookingList.showLoading = true;

    this.newBookingService.getCancelBooking().toPromise().then((res: any) => {
      this.success = res.success;

      if (this.success) {
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
          panelClass:"my-snack-bar-success"
        });
      }

      this.getSyncJobs(Constants.CANCEL_BOOKING_REPORT_SYNC);

      this.cancelBookingList.showLoading = false;
    }).catch(err => {
      this.getSyncJobs(Constants.CANCEL_BOOKING_REPORT_SYNC);

      let message = "Error happend, Please try again.";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
         this.sidNav.Logout();

      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.cancelBookingList.showLoading = false;
    });
  }

  viewJSON(row){
    this.dialogService.newBookingModal(row);
  }

}
