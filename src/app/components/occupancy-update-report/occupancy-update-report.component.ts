import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJob } from 'src/app/models/SyncJob';
import { NewBookingReportService } from 'src/app/services/newBookingReport/new-booking-report.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { DialogComponent } from '../dialog/dialog.component';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-occupancy-update-report',
  templateUrl: './occupancy-update-report.component.html',
  styleUrls: ['./occupancy-update-report.component.scss']
})
export class OccupancyUpdateReportComponent implements OnInit {
  success = false;
  loading = true;
  
  jobs = [];
  selectedJob :SyncJob = null;

  occupancyUpdateList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no Occupancy Update</span>
        </div>
      `
    },
    selected: [],
    newBookingCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    occupancyUpdateData: [] 
  };


  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent, public dialog: MatDialog,
    private syncJobService: SyncJobService,
    private newBookingService: NewBookingReportService) { }

  ngOnInit(): void {
    this.getSyncJobs(Constants.OCCUPANCY_UPDATE_REPORT_SYNC);
  }

  onSelect({selected}) {
    this.occupancyUpdateList.selected.splice(0, this.occupancyUpdateList.selected.length);
    this.occupancyUpdateList.selected.push(...selected);
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
      this.occupancyUpdateList.occupancyUpdateData = res;
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  async syncOccupancyUpdate(){
    this.occupancyUpdateList.showLoading = true;
    this.occupancyUpdateList.occupancyUpdateData = [];

    this.newBookingService.getOccupancyUpdates().toPromise().then((res: any) => {
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

      this.getSyncJobs(Constants.OCCUPANCY_UPDATE_REPORT_SYNC);

      this.occupancyUpdateList.showLoading = false;
    }).catch(err => {
      this.getSyncJobs(Constants.OCCUPANCY_UPDATE_REPORT_SYNC);

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

      this.occupancyUpdateList.showLoading = false;
    });
  }

  viewJSON(row){
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title:  "Occupancy Updates",
        message: row
    };
    dialogConfig.minWidth = 400;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }

}
