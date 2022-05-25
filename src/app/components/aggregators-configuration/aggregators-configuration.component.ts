import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import { GenerateFoodicsAccessTokenComponent } from '../generate-foodics-access-token/generate-foodics-access-token.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material'

@Component({
  selector: 'app-aggregators-configuration',
  templateUrl: './aggregators-configuration.component.html',
  styleUrls: ['./aggregators-configuration.component.scss']
})
export class AggregatorsConfigurationComponent implements OnInit {

  loading = true;
  saveLoading = true;

  clientId : ''
  clientSecret : ''
  randomString : string = ""
  redirect_url : ''
  authorizationCode : ''
  validationMessage = ''
  clientIdMessage = ''
  clientSecretMessage = ''
  redirectURLMessage = ''
  authorizationCodeMessage = ''
  codeValidationMessage = ''
  foodicsAccessToken = ''

  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private foodicsService : FoodicsServiceService) { }

  ngOnInit() {}

  clientIdInputClick() {
    this.clientSecretMessage = ''
    this.redirectURLMessage = ''
    this.clientIdMessage = 'Please enter your client ID provided from your foodics account'
  }

  clientSecretInputClick() {
    this.clientIdMessage = ''
    this.redirectURLMessage = ''
    this.clientSecretMessage = 'Please enter your client Secret provided from your foodics account'
  }

  redirectURLInputClick() {
    this.clientIdMessage = ''
    this.clientSecretMessage = ''
    this.redirectURLMessage = 'Please enter redirect URL to return back after foodics account authorization'
  }

  authorizationCodeInputClick() {
    this.authorizationCodeMessage = 'Please enter authorization code generated after foodics account authorization'
  }

  authorizeFoodicsAccount(){
    this.validationMessage=""
    let validationResult = this.validate();
    if(validationResult.valid === false){
      this.validationMessage = validationResult.message
    }else{
      this.loading = true;
      this.spinner.show();
      this.randomString = this.generateRandomString()
      this.foodicsService.authorizeFoodicsAccount(this.clientId, this.randomString)
      .toPromise()
      .then((res) => {
        this.snackBar.open("Your account was authenticated successfully by Foodics" , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
        this.loading = false;
        this.spinner.hide();
      }).catch(err => {
        let message = "";
        if (err.error){
          message = err.error;
        } else if (err.message){
          message = err.message;
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        }
  
        this.snackBar.open(message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
  
        this.loading = false;
        this.spinner.hide();
  
      });
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

  validateAuthCode(){
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
    }else if(this.authorizationCode === '' || this.authorizationCode === undefined || this.authorizationCode === null){
      validation.message = 'Please enter authorization code'
      validation.valid = false
    }
    return validation
  }

  generateRandomString(){
    return Math.random().toString(36).slice(2, 7).toString();
  }

  generateFoodicsAccessToken(){
    this.validationMessage=""
    let validationResult = this.validateAuthCode();
    if(validationResult.valid === false){
      this.codeValidationMessage = validationResult.message
    }else{
      this.codeValidationMessage = ''
      this.loading = true;
      this.spinner.show();
      let body = {
        code : this.authorizationCode,
        clientId : this.clientId,
        clientSecret : this.clientSecret,
        redirect_url : this.redirect_url
      }
      this.foodicsService.requestFoodicsAccessToken(body)
      .toPromise()
      .then((res) => {
        this.foodicsAccessToken = res['data'].access_token
        // this.snackBar.open("Foodics account access token was generated successfully" , null, {
        //   duration: 3000,
        //   horizontalPosition: 'center',
        //   panelClass:"my-snack-bar-success"
        // });
        // this.loading = false;
        // this.spinner.hide();
        this.openTokenDialog()
      }).catch(err => {
        let message = "";
        if (err.error){
          message = err.error;
        } else if (err.message){
          message = err.message;
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
        }
        this.snackBar.open(message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.loading = false;
        this.spinner.hide();
      });
    }
  }


  openTokenDialog(){
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '420px'
    dialogConfig.maxWidth = '420px'
    dialogConfig.autoFocus = true
    dialogConfig.data = {token : this.foodicsAccessToken}

    let dialogRef = this.dialog.open(GenerateFoodicsAccessTokenComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    })
  }

  // onSaveClick(){
  //   this.spinner.show();
  //   this.saveLoading = true;

  //   try {

  //     this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
  //       const response = result as Response;
  //       if (response.success) {
  //         this.snackBar.open('Save configuration successfully.', null, {
  //           duration: 2000,
  //           horizontalPosition: 'center',
  //           panelClass:"my-snack-bar-success"
  //         });
  //       }else{
  //         this.snackBar.open('An error has occurred.', null, {
  //           duration: 2000,
  //           horizontalPosition: 'center',
  //           panelClass:"my-snack-bar-fail"
  //         });
  //       }
  //       this.spinner.hide();
  //       this.saveLoading = false;
  //     }
  //     ).catch(err => {
  //       this.snackBar.open('An error has occurred.', null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-fail"
  //       });
  //       this.spinner.hide();
  //       this.saveLoading = false;
  //     });
  //   } catch (e) {
  //     console.log({error: e});
  //     this.snackBar.open('Failed to save Opera map tables, Please try again.', null, {
  //       duration: 2000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });

  //     this.spinner.hide();
  //   }
  // }

}
