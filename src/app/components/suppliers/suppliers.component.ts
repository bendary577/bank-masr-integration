import { Component, OnInit, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';



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
  syncJobId = -1;
  
  constructor(private spinner: NgxSpinnerService, private supplierService: SupplierService,
    private vendorService: VendorService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getSuppliersDB();
    this.getSyncJobs("Get Suppliers");
  }

  getSuppliersDB() {
    this.spinner.show();
    this.supplierService.getSuppliersDB().toPromise().then((res: any) => {
      // console.log(res.items);
      this.dataSource = res.items;
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
      this.getSyncJobs("Get Suppliers");

      if (this.success){
        this.snackBar.open('Sync Suppliers Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message, null, {
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
      console.log(res);
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
    this.syncJobService.getSyncJobData(syncJobId).toPromise().then((res: any) => {
      console.log(res);
      this.dataSource = res.items;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }



}
