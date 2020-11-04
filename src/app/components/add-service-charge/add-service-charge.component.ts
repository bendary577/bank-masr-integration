import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-add-service-charge',
  templateUrl: './add-service-charge.component.html',
  styleUrls: ['./add-service-charge.component.scss']
})
export class AddServiceChargeComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  newAccount:Account;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddServiceChargeComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.form.controls.name.value,
      account: this.form.controls.account.value
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      account: ['', Validators.required]
    });
  }

}
