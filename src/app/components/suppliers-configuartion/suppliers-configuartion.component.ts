import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-suppliers-configuartion',
  templateUrl: './suppliers-configuartion.component.html',
  styleUrls: ['./suppliers-configuartion.component.scss']
})
export class SuppliersConfiguartionComponent implements OnInit {

  formSupplier: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<SuppliersConfiguartionComponent>,
    private route:ActivatedRoute) { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.formSupplier.controls.name.value,
      limit: this.formSupplier.controls.limit.value

    });
  }

  ngOnInit() {
    this.formSupplier = this.formBuilder.group({
      name: ['', Validators.required],
      limit: ['']
    });
  }
}