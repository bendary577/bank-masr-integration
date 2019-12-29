import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';

@Component({
  selector: 'app-scheduler-configuration',
  templateUrl: './scheduler-configuration.component.html',
  styleUrls: ['./scheduler-configuration.component.scss']
})
export class SchedulerConfigurationComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVendorComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      duration: this.form.controls.duration.value
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      duration: ['', Validators.required],
    });
  }
}
