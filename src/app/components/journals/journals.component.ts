import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-journals',
  templateUrl: './journals.component.html',
  styleUrls: ['./journals.component.scss']
})
export class JournalsComponent implements OnInit {

  loading = true;
  success = null;
  jobs = [];
  journals = [];
  selectedJob :SyncJob = null;


  constructor(private spinner: NgxSpinnerService,
    private journalService: JournalService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
    this.getJournals();
    this.getSyncJobs(Constants.JOURNALS_SYNC);
  }

  getJournalsJobSyncJob() {
    let user = localStorage.getItem('user');
    this.spinner.show();
    this.journalService.getJournals(user).toPromise().then((res: any) => {
      this.getJournals();
      this.getSyncJobs(Constants.JOURNALS_SYNC);
      
      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

    }).catch(err => {
      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });

  }

  getJournals() {
    this.spinner.show();
    this.syncJobService.getSyncJobData(Constants.JOURNALS_SYNC).toPromise().then((res: any) => {
      this.journals = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobs(syncJobTypeName:String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0];

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
      this.journals = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

}
