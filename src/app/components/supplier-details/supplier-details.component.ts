import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-supplier-details',
  templateUrl: './supplier-details.component.html',
  styleUrls: ['./supplier-details.component.scss']
})
export class SupplierDetailsComponent implements OnInit {

  supplier = [];


  constructor(private spinner: NgxSpinnerService,public snackBar: MatSnackBar,
    private router: Router, private data: Data) {

  }

  ngOnInit() {
    this.supplier = this.data.storage["data"]
    console.log(this.supplier)
  }

  back(){
    this.router.navigate([Constants.SUPPLIERS_PAGE]);
  }
}
