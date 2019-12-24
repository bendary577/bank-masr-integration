import { Component, OnInit, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { AlertsService } from 'angular-alert-module';


@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  loading = true;
  success = null;
  dataSource = [];
  constructor(private spinner: NgxSpinnerService, private supplierService: SupplierService,
    private vendorService: VendorService, private alerts: AlertsService,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getSuppliersDB();
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
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }



}
