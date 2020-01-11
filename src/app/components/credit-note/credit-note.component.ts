import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { CreditNoteService } from 'src/app/services/creditNote/credit-note.service';

@Component({
  selector: 'app-credit-note',
  templateUrl: './credit-note.component.html',
  styleUrls: ['./credit-note.component.scss']
})
export class CreditNoteComponent implements OnInit {

  loading = true;
  success = null;
  jobs = [];
  creditNote = [];
  syncJobId = -1;


  constructor(private spinner: NgxSpinnerService, private creditNoteService: CreditNoteService,
    private syncJobService:SyncJobService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getCreditNote();
    this.getSyncJobs("Credit Note");
  }

  getCreditNote() {
    this.spinner.show();
    this.syncJobService.getSyncJobData("Credit Note").toPromise().then((res: any) => {
      this.creditNote = res;
     
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getCreditNoteSyncJob() {
    this.spinner.show();
    this.creditNoteService.getCreditNote().toPromise().then((res: any) => {
      this.success = res.success;
      this.getCreditNote();
      this.getSyncJobs("Credit Note");
      
      if (this.success){
        this.snackBar.open('Sync Credit Note Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open('Sync Credit Note Failed' + res.message , null, {
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
    this.syncJobService.getSyncJobDataById(syncJobId).toPromise().then((res: any) => {
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
