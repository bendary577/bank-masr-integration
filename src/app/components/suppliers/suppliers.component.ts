import { Component, OnInit, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { SyncJob } from 'src/app/models/SyncJob';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';



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
    private vendorService: VendorService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private router: Router, private data: Data, private sidenav: SidenavResponsive) {

  }

  ngOnInit() {
    this.getSyncJobs("Suppliers");
    this.state = localStorage.getItem('getSuppliersLoading');
    if (this.state == "true"){
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

      if (this.success){
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
      SuppliersComponent.getSuppliersLoading = false;
      localStorage.setItem('getSuppliersLoading', "false");

      this.snackBar.open(err.message , null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  getSyncJobs(syncJobTypeName: String) {
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0]
      if (this.jobs.length > 0){
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;

      if (err.status == 401){
        this.sidenav.Logout();
      }
    });
  }

  getSyncJobData() {
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.dataSource = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  showDetails(syncJobData){
    this.data.storage = syncJobData
    this.router.navigate([Constants.SUPPLIERS_DETAILS_PAGE])
  }



}
