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
  srcResult: any;
  imageUploded: boolean = false;
  newAccount:Account;
  ERD: string;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddAccountComponent>) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      domain: ['', Validators.required],
      erd: ['', Validators.required],
      microsVersion: ['', Validators.required],

      locationQuota: ['', Validators.required],
      usernameOHIM: ['', Validators.required],
      passwordOHIM: ['', Validators.required],
      companyOHIM: ['', Validators.required],

      usernameOHRA: ['', Validators.required],
      passwordOHRA: ['', Validators.required],
      companyOHRA: ['', Validators.required],

      usernameFusion: ['', Validators.required],
      passwordFusion: ['', Validators.required],

      usernameSun: ['', Validators.required],
      passwordSun: ['', Validators.required],
      hostSun: ['', Validators.required],
      portSun: ['', Validators.required],
    });
  }

  csvInputChange(fileInputEvent: any) {
    this.srcResult = fileInputEvent.target.files[0];
    if(this.srcResult){
        this.imageUploded = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.form.controls.name.value,
      image: this.srcResult,
      domain: this.form.controls.domain.value,
      erd: this.form.controls.erd.value,
      microsVersion: this.form.controls.microsVersion.value,
        
      locationQuota: this.form.controls.locationQuota.value,
      accountCredentials: [
         {"account": "HospitalityOHIM",
          "username": this.form.controls.usernameOHIM.value,
          "password": this.form.controls.passwordOHIM.value,
          "company": this.form.controls.companyOHIM.value
        },
        {
          "account": "HospitalityOHRA",
          "username": this.form.controls.usernameOHRA.value,
          "password": this.form.controls.passwordOHRA.value,
          "company": this.form.controls.companyOHRA.value
        },
        {
          "account": "Fusion",
          "username": this.form.controls.usernameFusion.value,
          "password": this.form.controls.passwordFusion.value
        },
        {
          "account": "Sun",
          "username": this.form.controls.usernameSun.value,
          "password": this.form.controls.passwordSun.value,
          "host": this.form.controls.hostSun.value,
          "port": this.form.controls.portSun.value
        },
      ]
    });
  }

  chooseERD(){
    this.ERD = this.form.controls.erd.value ;
  }
}
