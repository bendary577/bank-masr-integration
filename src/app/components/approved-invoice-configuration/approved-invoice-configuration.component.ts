import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';

@Component({
  selector: 'app-approved-invoice-configuration',
  templateUrl: './approved-invoice-configuration.component.html',
  styleUrls: ['./approved-invoice-configuration.component.scss']
})
export class ApprovedInvoiceConfigurationComponent implements OnInit {

  formSupplier: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ApprovedInvoiceConfigurationComponent>) { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.formSupplier.controls.name.value,
    });
  }

  ngOnInit() {
    this.formSupplier = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

}
