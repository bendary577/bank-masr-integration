import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { ActivatedRoute } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';

@Component({
  selector: 'app-suppliers-configuartion',
  templateUrl: './suppliers-configuartion.component.html',
  styleUrls: ['./suppliers-configuartion.component.scss']
})
export class SuppliersConfiguartionComponent implements OnInit {

  formSupplier: FormGroup;
  submitted = false;
  limit = null;
  category = null;

  constructor(private route:ActivatedRoute, private supplierService: SupplierService) { 
  }

  ngOnInit() {
    this.limit = this.route.snapshot.params["limit"];
    this.category = this.route.snapshot.params["limcategoryit"];
  }

  onSaveClick(){

  }


}