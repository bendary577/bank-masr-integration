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
import { SyncJobType } from 'src/app/models/SyncJobType';


@Component({
  selector: 'app-suppliers-configuartion',
  templateUrl: './suppliers-configuartion.component.html',
  styleUrls: ['./suppliers-configuartion.component.scss']
})
export class SuppliersConfiguartionComponent implements OnInit {
  syncJobType = {};
  supplierConfigForm: FormGroup;
  submitted = false;
  limit = null;
  category = null;
  loading = true;
  taxesLoading = false;
  groupsLoading = false;

  taxes = []
  groups = []

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,
    private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private syncJobService:SyncJobService, private data: Data,
    private router: Router,  private supplierService: SupplierService) { 

  }

  ngOnInit() {
    this.supplierConfigForm = this.formBuilder.group({
      limit: [this.data.storage["configuration"]["limit"], Validators.required],
      category: [this.data.storage["configuration"]["category"], Validators.required],
      // limit: [this.syncJobType.configuration.limit],
      // category: [""],   
      taxes: [""],
      groups: [""]
    });

    this.getTaxes();
    this.getGroups();
  }

  getSyncJobType(){
    this.spinner.show();
    this.syncJobService.getSyncJobTypeDB("Get Suppliers").toPromise().then((res: any) => {
      console.log(res);
      this.syncJobType = res;
      this.limit =   res.configuration.limit;
      this.category =   res.configuration.category;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });

  }

  getTaxes() {
    this.taxesLoading = true;
    this.supplierService.getSuppliersTaxes().toPromise().then((res: any) => {
      this.taxes = res.data;
      this.taxesLoading = false;

    }).catch(err => {
      console.error(err);
      this.taxesLoading = false;
    });
  }

  getGroups() {
    this.groupsLoading = true;
    this.supplierService.getSuppliersGroups().toPromise().then((res: any) => {
      this.groups = res.data;
      this.groupsLoading = false;
    }).catch(err => {
      console.error(err);
      this.groupsLoading = false;
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

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}