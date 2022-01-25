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
  selector: 'app-expenses-details-report',
  templateUrl: './expenses-details-report.component.html',
  styleUrls: ['./expenses-details-report.component.scss']
})
export class ExpensesDetailsReportComponent implements OnInit {
  success = false;
  loading = true;
  
  jobs = [];
  selectedJob :SyncJob = null;

  transactionList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no expenses details.</span>
        </div>
      `
    },
    selected: [],
    transactionCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    transactionData: [] 
  };


  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent, public dialog: MatDialog,
    private syncJobService: SyncJobService, private newBookingService: NewBookingReportService) { }

  ngOnInit(): void {
    this.getSyncJobs(Constants.EXPENSES_DETAILS_REPORT_SYNC);
  }

  onSelect({selected}) {
    this.transactionList.selected.splice(0, this.transactionList.selected.length);
    this.transactionList.selected.push(...selected);
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
      this.transactionList.transactionData = res;
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  async syncExpensesDetails(){
    this.transactionList.showLoading = true;
    this.transactionList.transactionData = [];

    this.newBookingService.getExpensesDetails().toPromise().then((res: any) => {
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

      this.getSyncJobs(Constants.EXPENSES_DETAILS_REPORT_SYNC);

      this.transactionList.showLoading = false;
    }).catch(err => {
      this.getSyncJobs(Constants.EXPENSES_DETAILS_REPORT_SYNC);

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

      this.transactionList.showLoading = false;
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
