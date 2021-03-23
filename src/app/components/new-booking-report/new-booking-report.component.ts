import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJob } from 'src/app/models/SyncJob';
import { NewBookingReportService } from 'src/app/services/newBookingReport/new-booking-report.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-new-booking-report',
  templateUrl: './new-booking-report.component.html',
  styleUrls: ['./new-booking-report.component.scss']
})
export class NewBookingReportComponent implements OnInit {
  success = false;
  loading = true;
  static getNewBookingLoding = false;
  
  jobs = [];
  selectedJob :SyncJob = null;

  newBookingList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no new booking.</span>
        </div>
      `
    },
    selected: [],
    newBookingCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    newBookingData: [] 
  };


  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive, private syncJobService: SyncJobService,
    private newBookingService: NewBookingReportService) { }

  ngOnInit(): void {
    this.getSyncJobs(Constants.NEW_BOOKING_REPORT_SYNC);
  }

  onSelect({selected}) {
    this.newBookingList.selected.splice(0, this.newBookingList.selected.length);
    this.newBookingList.selected.push(...selected);
  }

  get staticgetNewBookingLoading() {
    return NewBookingReportComponent.getNewBookingLoding ;
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
      this.newBookingList.newBookingData = res;
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  syncNewBooking(){
    this.newBookingList.showLoading = true;

    this.newBookingService.getNewBooking().toPromise().then((res: any) => {
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

      this.getSyncJobs(Constants.NEW_BOOKING_REPORT_SYNC);

      this.newBookingList.showLoading = false;
    }).catch(err => {
      this.getSyncJobs(Constants.NEW_BOOKING_REPORT_SYNC);

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

      this.newBookingList.showLoading = false;
    });
  }

}
