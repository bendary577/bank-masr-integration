import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-journal-infor',
  templateUrl: './journal-infor.component.html',
  styleUrls: ['./journal-infor.component.scss']
})
export class JournalInforComponent implements OnInit {

  loading = true;
  static getJournalsLoding = false;
  success = null;
  jobs = [];
  journals = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService,
    private journalService: JournalService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSyncJobs(Constants.CONSUMPTION_SYNC);
    this.state = localStorage.getItem('getJournalsLoding');

    if (this.state == "true") {
      JournalInforComponent.getJournalsLoding = true;
    }
    else{
      JournalInforComponent.getJournalsLoding = false;
    }
  }

  get staticgetJournalsLoding() {
    return JournalInforComponent.getJournalsLoding ;
  }

  getJournalsJobSyncJob() {
    localStorage.setItem('getJournalsLoding', "true");
    JournalInforComponent.getJournalsLoding = true;

    this.journalService.getJournals().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.CONSUMPTION_SYNC);

      localStorage.setItem('getJournalsLoding', "false");
      JournalInforComponent.getJournalsLoding = false;

      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        console.log(res.message)
        this.snackBar.open(res.message.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
    }).catch(err => {
        console.log(err);
        localStorage.setItem('getJournalsLoding', "false");
        JournalInforComponent.getJournalsLoding = false;
        console.log(err.message)

        this.snackBar.open(err.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
    });

  }

  getJournalsDB() {
    this.loading = true;
    this.syncJobService.getSyncJobData(Constants.CONSUMPTION_SYNC).toPromise().then((res: any) => {
      this.journals = res;

      this.loading = false;
    }).catch(err => {
      this.loading = false;
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
