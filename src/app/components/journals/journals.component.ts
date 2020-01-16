import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { JournalService } from 'src/app/services/journal/journal.service';

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

  constructor(private spinner: NgxSpinnerService,
    private journalService: JournalService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  getJournalsJob() {
    this.spinner.show();
    this.journalService.getJournals().toPromise().then((res: any) => {
      this.journals = res.data;

      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }
}
