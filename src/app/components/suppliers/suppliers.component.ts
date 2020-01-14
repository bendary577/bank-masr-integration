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



@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  loading = true;
  success = null;
  jobs = [];
  dataSource = [];
  selectedJob :SyncJob = null;


  constructor(private spinner: NgxSpinnerService, private supplierService: SupplierService,
    private vendorService: VendorService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private router: Router, private data: Data) {

  }

  ngOnInit() {
    this.getSuppliersDB();
    this.getSyncJobs("Suppliers");
  }

  getSuppliersDB() {
    this.spinner.show();
    this.syncJobService.getSyncJobData("Suppliers").toPromise().then((res: any) => {
      this.dataSource = res;
      for (const element of this.dataSource) {
        if (this.vendorService.vendorAccountIDS.indexOf(element.SupplierNumber) !== -1) {
          element.exists = true;
          element.loading = false;
        } else {
          element.exists = false;
          element.loading = false;
        }
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }


  getSuppliersSyncJob() {
    this.spinner.show();
    this.supplierService.getSuppliers().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSuppliersDB();
      this.getSyncJobs("Suppliers");

      if (this.success) {
        this.snackBar.open('Sync Suppliers Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-success"
        });
      }
      else {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-fail"
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

  getSyncJobs(syncJobTypeName: String) {
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

  getSyncJobData(syncJob: SyncJob) {
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
