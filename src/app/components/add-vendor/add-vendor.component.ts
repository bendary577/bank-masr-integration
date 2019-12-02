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
      id: this.form.controls.id.value
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      id: ['', Validators.required]
    });
  }

}
