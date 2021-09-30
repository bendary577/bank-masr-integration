import { Component, OnInit, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { SyncJob } from 'src/app/models/SyncJob';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { ErrorMessages } from 'src/app/models/ErrorMessages';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  loading = true;
  static getSuppliersLoading = false;
  success = null;
  jobs = [];
  dataSource = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private supplierService: SupplierService,
    private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private router: Router, private data: Data, private sidNav: SidenavResponsive) {

  }

  ngOnInit() {
    this.getSyncJobs("Suppliers");
    this.state = localStorage.getItem('getSuppliersLoading');
    if (this.state == "true") {
      SuppliersComponent.getSuppliersLoading = true;
    }
    else{
      SuppliersComponent.getSuppliersLoading = false;
    }
  }


  get staticgetSuppliersLoading() {
    return SuppliersComponent.getSuppliersLoading ;
  }


  getSuppliersSyncJob() {
    localStorage.setItem('getSuppliersLoading', "true");
    SuppliersComponent.getSuppliersLoading = true
     this.supplierService.getSuppliers().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs("Suppliers");

      SuppliersComponent.getSuppliersLoading = false;
      localStorage.setItem('getSuppliersLoading', "false");

      if (this.success) {
        this.snackBar.open(res.message , null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message , null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }


    }).catch(err => {
      this.getSyncJobs("Suppliers");
      SuppliersComponent.getSuppliersLoading = false;
      localStorage.setItem('getSuppliersLoading', "false");
      console.log(err);
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

      this.snackBar.open(message , null, {
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
      this.selectedJob = this.jobs[0]
      if (this.jobs.length > 0) {
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;

      let message = "Error happend, Please try again.";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();

      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  getSyncJobData() {
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.dataSource = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      let message = "Error happend, Please try again.";
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
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
      this.loading = false;
    });
  }

  showDetails(syncJobData) {
    this.data.storage = syncJobData
    this.router.navigate([Constants.SUPPLIERS_DETAILS_PAGE]);
  }
}
