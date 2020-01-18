import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';

@Component({
  selector: 'app-sync-job',
  templateUrl: './sync-job.component.html',
  styleUrls: ['./sync-job.component.scss']
})
export class SyncJobComponent implements OnInit {

  endPoint = Constants.END_POINT
  loading = true;
  dataSource = [];

  constructor(private spinner: NgxSpinnerService,
    private syncJobService: SyncJobService, public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.getSyncJob()
  }

  getSyncJob(){
    if (this.endPoint == "/getSuppliers"){
      this.spinner.show();
      this.syncJobService.getSuppliersSyncJob().toPromise().then((res: any) => {
        this.dataSource = res.items;

        this.spinner.hide();
        this.loading = false;
      }).catch(err => {
        this.spinner.hide();
        this.loading = false;
      });
      }
  }
}
