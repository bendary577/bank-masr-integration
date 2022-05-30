import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';

@Component({
  selector: 'app-foodics-auth-instructions',
  templateUrl: './foodics-auth-instructions.component.html',
  styleUrls: ['./foodics-auth-instructions.component.scss']
})
export class FoodicsAuthInstructionsComponent implements OnInit {


  isLinear = true;
  clientIDFormGroup: FormGroup;
  clientSecretFormGroup: FormGroup;
  redirectURLFormGroup: FormGroup;

  clientId : ''
  clientSecret : ''
  randomString : string = ""
  redirect_url : ''
  authorizationCode : string = ''
  validationMessage = ''
  clientIdMessage = ''
  clientSecretMessage = ''
  redirectURLMessage = ''
  authorizationCodeMessage = ''
  codeValidationMessage = ''

  constructor(public dialogRef: MatDialogRef<FoodicsAuthInstructionsComponent>,
    @Inject(MAT_DIALOG_DATA) public data, private _formBuilder: FormBuilder, public snackBar: MatSnackBar, private foodicsService : FoodicsServiceService) { }

    ngOnInit() {
      this.clientIDFormGroup = this._formBuilder.group({
        clientIDControl: ['', Validators.required],
      });
      this.clientSecretFormGroup = this._formBuilder.group({
        clientSecretControl: ['', Validators.required],
      });
      this.redirectURLFormGroup = this._formBuilder.group({
        redirectURLControl: ['', Validators.required],
      });
    }

  onOKClick(): void {
    this.dialogRef.close({
        save: false,
      }
    )
  }

  onNoClick(): void {
    this.dialogRef.close({
        save: false,
      }
    )
  }

  onSaveClick(): void {
    this.dialogRef.close({
      clientId : this.clientId,
      clientSecret : this.clientSecret,
      redirect_url : this.redirect_url
    })
  }

  authorizeFoodicsAccount(){
    this.validationMessage=""
    let validationResult = this.validate();
    if(validationResult.valid === false){
      this.validationMessage = validationResult.message
    }else{
      this.randomString = this.generateRandomString()
      this.foodicsService.authorizeFoodicsAccount(this.clientId, this.randomString)
    }
  }

  validate(){
    let validation = { message : 'validated', valid : true }
    if(this.clientId === '' || this.clientId === undefined || this.clientId === null){
      validation.message = 'Please provide a valid client ID'
      validation.valid = false
    }else if(this.clientSecret === '' || this.clientSecret === undefined || this.clientSecret === null){
      validation.message = 'Please provide a valid client secret'
      validation.valid = false
    }else if(this.redirect_url === '' || this.redirect_url === undefined || this.redirect_url === null){
      validation.message = 'Please provide a valid redirect URL'
      validation.valid = false
    }
    return validation
  }

  
  generateRandomString(){
    return Math.random().toString(36).slice(2, 7).toString();
  }

  validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

}
