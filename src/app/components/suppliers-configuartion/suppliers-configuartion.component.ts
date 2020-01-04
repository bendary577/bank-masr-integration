import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Constants } from 'src/app/models/constants';

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

  constructor(private formBuilder: FormBuilder, private route:ActivatedRoute,
    private router: Router,  private supplierService: SupplierService) { 
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.limit = params["limit"];
      this.category = params["category"];
  });

    this.supplierConfigForm = this.formBuilder.group({
      limit: [this.limit , Validators.required],
      category: [this.category, Validators.required]
    });
  }

  onSaveClick(){
    this.limit = this.supplierConfigForm.controls.limit.value as string;
    this.category = this.supplierConfigForm.controls.category.value as string;

    this.router.navigate([Constants.SYNC_JOBS]);
  }

}