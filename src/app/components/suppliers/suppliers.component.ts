import { Component, OnInit, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  loading = true;
  dataSource = [];
  constructor(private spinner: NgxSpinnerService, private supplierService: SupplierService,
    private vendorService: VendorService,
    public snackBar: MatSnackBar,
    private zone: NgZone) {

  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.spinner.show();
    this.supplierService.getSuppliers().toPromise().then((res: any) => {
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

  submit(row) {
    row.loading = true;
    const supplierName = row.Supplier;
    const supplierNumber = row.SupplierNumber;
    const body = {
      name: supplierName,
      vendorAccount: supplierNumber
    };
    this.vendorService.addVendor(body).then(result => {
      this.zone.run(_ => {
        row.exists = true;
        row.loading = false;
      });
    }).catch(err => {
      row.loading = false;
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'right',
      });
    });
  }

}
