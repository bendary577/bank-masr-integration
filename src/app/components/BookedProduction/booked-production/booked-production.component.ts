import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { BookedProductionService } from 'src/app/services/BookedProduction/booked-production.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJob } from 'src/app/models/SyncJob';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../../sidenav/sidenav-responsive';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { saveAs } from 'file-saver';
import { Constants } from 'src/app/models/constants';
import { CsvService } from 'src/app/services/csv/csv.service';

@Component({
  selector: 'app-booked-production',
  templateUrl: './booked-production.component.html',
  styleUrls: ['./booked-production.component.scss']
})
export class BookedProductionComponent implements OnInit {


  loading = true;
  static BookedProductionLoading = false;
  success = null;
  bookedProduction = [];
  jobs = [];
  syncJobId = -1;
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private bookedProductionService: BookedProductionService,
    public snackBar: MatSnackBar, private syncJobService:SyncJobService, private sidNav: SidenavResponsive,
    private excelService: ExcelService, private csvService: CsvService
    ) {

  }

  ngOnInit() {
    this.getSyncJobs("Booked Production");
    this.state = localStorage.getItem('BookedProductionLoading');

    if (this.state == "true") {
      BookedProductionComponent.BookedProductionLoading = true;
    }
    else{
      BookedProductionComponent.BookedProductionLoading = false;
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  getBookedProductionDB() {
    this.spinner.show();
    this.syncJobService.getSyncJobData("Booked Production").toPromise().then((res: any) => {
      this.bookedProduction = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
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

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
      this.loading = false;
    });
  }

  get getBookedProductionLoading() {
    return BookedProductionComponent.BookedProductionLoading ;
  }

  getBookedProductionSyncJob() {
    localStorage.setItem('BookedProductionLoading', "true");
    BookedProductionComponent.BookedProductionLoading = true;

    this.bookedProductionService.getBookedProduction().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs("Booked Production");

      if (this.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }

      localStorage.setItem('BookedProductionLoading', "false");
      BookedProductionComponent.BookedProductionLoading = false;
    }).catch(err => {
      this.getSyncJobs("Booked Production");

      localStorage.setItem('BookedProductionLoading', "false");
      BookedProductionComponent.BookedProductionLoading = false;

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
      this.bookedProduction = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  exportToXLSX():void {
    this.excelService.exportBookedProductionToExcel(this.selectedJob.id).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "BookedProduction" + '.xlsx', { type: 'application/vnd.ms.excel' });
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

  generateSingleFile():void {
    this.csvService.generateSingleFile(Constants.BOOKED_PRODUCTION_SYNC).subscribe(
      res => {
        const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
        const file = new File([blob], Constants.BOOKED_PRODUCTION_SYNC + '.ndf', { type: 'application/vnd.ms.txt' });
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
