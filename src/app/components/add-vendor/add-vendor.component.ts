import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddVendorComponent implements OnInit {
  public form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddVendorComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.form.controls.name.value,
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
        });
  }

}
