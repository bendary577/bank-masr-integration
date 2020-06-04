import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { CreditNoteService } from 'src/app/services/creditNote/credit-note.service';
import { SyncJob } from 'src/app/models/SyncJob';

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
    private syncJobService:SyncJobService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSyncJobs("Credit Notes");
    this.state = localStorage.getItem('getCreditNoteLoading');

    if (this.state == "true") {
      CreditNotesInforComponent.getCreditNoteLoading = true;
    }
    else{
      CreditNotesInforComponent.getCreditNoteLoading = false;
    }
  }

  getCreditNoteDB() {
    this.spinner.show();
    this.syncJobService.getSyncJobData("Credit Notes").toPromise().then((res: any) => {
      this.creditNote = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
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
      console.error(err);
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
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }
}
