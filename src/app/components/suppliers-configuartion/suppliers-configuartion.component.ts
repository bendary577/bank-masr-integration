import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Constants } from 'src/app/models/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import {Data} from "../../models/data";


@Component({
  selector: 'app-suppliers-configuartion',
  templateUrl: './suppliers-configuartion.component.html',
  styleUrls: ['./suppliers-configuartion.component.scss']
})
export class SuppliersConfiguartionComponent implements OnInit {

  supplierConfigForm: FormGroup;
  submitted = false;
  limit = null;
  category = null;
  loading = true;
  taxes = []
  groups = []

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,
    private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private syncJobService:SyncJobService, private data: Data,
    private router: Router,  private supplierService: SupplierService) { 

  }

  ngOnInit() {
    this.limit =   this.data.storage["configuration"]["limit"];
    this.category =   this.data.storage["configuration"]["category"];

    this.supplierConfigForm = this.formBuilder.group({
      limit: [this.limit , Validators.required],
      category: [this.category, Validators.required]
    });

    this.getTaxes()
    this.getGroups()
  }

  getTaxes() {
    this.spinner.show();
    this.loading = true;
    this.supplierService.getSuppliersTaxes().toPromise().then((res: any) => {
      this.taxes = res.data;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getGroups() {
    this.spinner.show();
    this.loading = true;
    this.supplierService.getSuppliersGroups().toPromise().then((res: any) => {
      this.groups = res.data;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  onSaveClick(){
    this.data.storage["configuration"]["limit"] = this.supplierConfigForm.controls.limit.value as string;
    this.data.storage["configuration"]["category"] = this.supplierConfigForm.controls.category.value as string;
    this.data.storage["configuration"]["taxes"] = this.supplierConfigForm.controls.taxes.value as string;
    this.data.storage["configuration"]["groups"] = this.supplierConfigForm.controls.groups.value as string;

    this.syncJobService.updateSyncJobTypeConfig(this.data.storage).then(result => {
      console.log(result);
      this.spinner.hide();
      this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
      this.spinner.hide();
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'right',
      });
      this.router.navigate([Constants.SYNC_JOBS]);
    });

  }

}