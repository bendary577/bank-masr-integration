import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-journals-infor',
  templateUrl: './journals-infor.component.html',
  styleUrls: ['./journals-infor.component.scss']
})
export class JournalsInforComponent implements OnInit {

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
    this.getSyncJobs(Constants.JOURNALS_SYNC);
    this.state = localStorage.getItem('getJournalsLoding');

    if (this.state == "true"){
      JournalsInforComponent.getJournalsLoding = true;
    }
    else{
      JournalsInforComponent.getJournalsLoding = false;
    }
  }

  get staticgetJournalsLoding() {
    return JournalsInforComponent.getJournalsLoding ;
  }

  getJournalsJobSyncJob() {
    localStorage.setItem('getJournalsLoding', "true");
    JournalsInforComponent.getJournalsLoding = true;

    this.journalService.getJournals().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.JOURNALS_SYNC);
      
      localStorage.setItem('getJournalsLoding', "false");
      JournalsInforComponent.getJournalsLoding = false;

      if (res.success){
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }

    }).catch(err => {

    });

  }

  getSyncJobs(syncJobTypeName:String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0];
      if (this.jobs.length > 0){
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
