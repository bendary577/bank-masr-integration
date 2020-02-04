import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.scss']
})
export class AddAccountComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  newAccount:Account;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddAccountComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.form.controls.name.value,
      domain: this.form.controls.domain.value,
      accountCredentials: {
        "HospitalityOHIM": {
          "username": this.form.controls.usernameOHIM.value,
          "password": this.form.controls.passwordOHIM.value,
          "company": this.form.controls.companyOHIM.value
        },
        "HospitalityOHRA": {
          "username": this.form.controls.usernameOHRA.value,
          "password": this.form.controls.passwordOHRA.value,
          "company": this.form.controls.companyOHRA.value
        },
        "Fusion": {
          "username": this.form.controls.usernameFusion.value,
          "password": this.form.controls.passwordFusion.value
        }
      }
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      usernameOHIM: ['', Validators.required],
      passwordOHIM: ['', Validators.required],
      companyOHIM: ['', Validators.required],
      usernameOHRA: ['', Validators.required],
      passwordOHRA: ['', Validators.required],
      companyOHRA: ['', Validators.required],
      usernameFusion: ['', Validators.required],
      passwordFusion: ['', Validators.required],
    });
  }

}
