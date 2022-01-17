import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { CreditNoteService } from 'src/app/services/creditNote/credit-note.service';
import { SyncJob } from 'src/app/models/SyncJob';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { saveAs } from 'file-saver';
import { Constants } from 'src/app/models/constants';
import { CsvService } from 'src/app/services/csv/csv.service';
import { SideNaveComponent } from '../side-nave/side-nave.component'

@Component({
  selector: 'app-credit-notes-infor',
  templateUrl: './credit-notes-infor.component.html',
  styleUrls: ['./credit-notes-infor.component.scss']
})
export class CreditNotesInforComponent implements OnInit {

  loading = true;
  static getCreditNoteLoading = false;
  success = null;
  jobs = [];
  creditNote = [];
  selectedJob :SyncJob = null;
  syncJobId = -1;
  state = "";


  constructor(private spinner: NgxSpinnerService, private creditNoteService: CreditNoteService,
    private syncJobService:SyncJobService, private sidNav: SideNaveComponent, private excelService: ExcelService,
    public dialog: MatDialog, public snackBar: MatSnackBar, private csvService: CsvService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.CREDIT_NOTE_SYNC);
    this.state = localStorage.getItem('getCreditNoteLoading');

    if (this.state == "true") {
      CreditNotesInforComponent.getCreditNoteLoading = true;
    }
    else{
      CreditNotesInforComponent.getCreditNoteLoading = false;
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }
  
  exportToCSV(): void {
    this.csvService
      .exportSalesToCSV(this.selectedJob.id, Constants.CREDIT_NOTE_SYNC)
      .subscribe(
        (res) => {
          const blob = new Blob([res.body], { type: "application/vnd.ms.txt" });
          const file = new File([blob], "Cost_Of_gGoods" + ".ndf", {
            type: "application/vnd.ms.txt",
          });
          saveAs(file);

          this.snackBar.open("Export Successfully", null, {
            duration: 2000,
            horizontalPosition: "center",
            panelClass: "my-snack-bar-success",
          });
        },
        (err) => {
          console.error(err);
          this.snackBar.open("Fail to export, Please try agian", null, {
            duration: 2000,
            horizontalPosition: "center",
            panelClass: "my-snack-bar-fail",
          });
        }
      );
  }

  getCreditNoteDB() {
    this.spinner.show();
    this.syncJobService.getSyncJobData(Constants.CREDIT_NOTE_SYNC).toPromise().then((res: any) => {
      this.creditNote = res;

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

  get staticgetCreditNoteLoading() {
    return CreditNotesInforComponent.getCreditNoteLoading ;
  }

  getCreditNoteSyncJob() {
    localStorage.setItem('getCreditNoteLoading', "true");
    CreditNotesInforComponent.getCreditNoteLoading = true;

    this.creditNoteService.getCreditNote().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs("Credit Notes");

      if (this.success) {
        this.snackBar.open('Sync Credit Notes Successfully', null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }

      localStorage.setItem('getCreditNoteLoading', "false");
      CreditNotesInforComponent.getCreditNoteLoading = false;
    }).catch(err => {
      this.getSyncJobs("Credit Notes");

      localStorage.setItem('getCreditNoteLoading', "false");
      CreditNotesInforComponent.getCreditNoteLoading = false;

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

      localStorage.setItem('getCreditNoteLoading', "false");
      CreditNotesInforComponent.getCreditNoteLoading = false;
    });
  }

  getSyncJobs(syncJobTypeName: string) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0]
      if (this.jobs.length > 0) {
        this.getSyncJobData();
      }
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

  getSyncJobData() {
    this.spinner.show();
    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.creditNote = res;

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

  exportToXLSX():void {
    this.excelService.exportInvoicesToExcel(this.selectedJob.id).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "CreditNotes" + '.xlsx', { type: 'application/vnd.ms.excel' });
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
    this.csvService.generateSingleFile(Constants.CREDIT_NOTE_SYNC).subscribe(
      res => {
        const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
        const file = new File([blob], "sales" + '.ndf', { type: 'application/vnd.ms.txt' });
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
