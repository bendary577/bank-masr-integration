import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { MenuItemsService } from 'src/app/services/menuItems/menu-items.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJob } from 'src/app/models/SyncJob';
import { DilogServiceService } from '../dialog/dilog-service.service';
@Component({
  selector: 'app-wls-integration',
  templateUrl: './wls-integration.component.html',
  styleUrls: ['./wls-integration.component.scss']
})
export class WlsIntegrationComponent implements OnInit {
  static getReservationLoding = false;
  loading = true;
  success = null;
  jobs = [];
  reservation = [];
  selectedJob :SyncJob = null;
  state = "";
  transaction: any;

  constructor(private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private menuItemService: MenuItemsService,
    public dialogService: DilogServiceService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.RESERVATION_SYNC);
    this.state = localStorage.getItem('getReservationLodign');
    if (this.state == "true") {
      WlsIntegrationComponent.getReservationLoding = true;
    } else {
      WlsIntegrationComponent.getReservationLoding = false;
    }
  }

  openModal() {
    this.callTransactionService();
  }
  
  get staticgetReservationLoading() {
    return WlsIntegrationComponent.getReservationLoding ;
  }

  callTransactionService(){
    this.menuItemService.getTransaction().toPromise().then((res: any) => {
      this.transaction = res;
      this.dialogService.openModal(this.transaction);
    });
  }

  getReservationSyncJob() {
    localStorage.setItem('getReservationLodign', "true");
    WlsIntegrationComponent.getReservationLoding = true;
    this.menuItemService.syncExcel().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.RESERVATION_SYNC);

      localStorage.setItem('getReservationLodign', "false");
      WlsIntegrationComponent.getReservationLoding = false;
      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.getSyncJobs(Constants.RESERVATION_SYNC);

      localStorage.setItem('getReservationLodign', "false");

      WlsIntegrationComponent.getReservationLoding = false;

      let msg = "";
      if (err.error.message) {
        msg = err.error.message ;
      }
      else{
        msg = "Failed to sync Menu Items completely!"
      }

      this.snackBar.open(msg , null, {
        duration: 3000,
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
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobData() {
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.reservation = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

}
