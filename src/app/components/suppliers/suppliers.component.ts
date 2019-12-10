import { Component, OnInit, OnChanges } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss']
})
export class SuppliersComponent implements OnInit {
  loading = true;
  dataSource = [];
  constructor(private spinner: NgxSpinnerService, private supplierService: SupplierService,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
      this.getData();
  }

  getData() {
    this.spinner.show();
    this.supplierService.getSuppliers().toPromise().then((res: any) => {
      // console.log(res.items);
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
