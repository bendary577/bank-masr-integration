import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';
import { GenerateFoodicsAccessTokenComponent } from '../generate-foodics-access-token/generate-foodics-access-token.component';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material'
import { FoodicsAuthInstructionsComponent } from '../foodics-auth-instructions/foodics-auth-instructions.component';
import { TalabatService } from 'src/app/services/talabat/talabat.service';
import { GeneralSettings } from 'src/app/models/GeneralSettings';

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
  authorizationCode : string = ''
  validationMessage = ''
  clientIdMessage = ''
  clientSecretMessage = ''
  redirectURLMessage = ''
  authorizationCodeMessage = ''
  codeValidationMessage = ''
  foodicsAccessToken = ''
  foodicsTokenGenerated = false
  foodicsCodeExpired = false
  timeLeft: number = 600;
  interval;

  //talabat info
  talabatUsername = ''
  talabatPassword = ''
  talabatValidationMessage = ''

  //talabat info
  email = ''
  emailValidationMessage = ''
  generalSettings: GeneralSettings;

  showAuthenticatedPanel = false;


  constructor(public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private talabatService : TalabatService, private foodicsService : FoodicsServiceService) { }

  ngOnInit() {
    this.getGeneralSettings()
  }

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
    this.redirectURLMessage = 'Please enter redirect URL provided from your foodics account'
  }

  authorizationCodeInputClick() {
    this.authorizationCodeMessage = 'Please enter authorization code generated after foodics account authorization'
  }

  authorizationCodeInputChange(value){
    // this.foodicsTokenGenerated = true
    // this.startTimer()
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

  validateAuthCode(){
    let validation = { message : 'validated', valid : true }
    if(this.foodicsCodeExpired === true){
      validation.message = 'Sorry, the code is expired, you have to regenerate foodics authorization code'
      validation.valid = false
    }else if(!this.validURL(this.authorizationCode)){
      validation.message = 'please enter a valid URL'
      validation.valid = false
    }else if(this.clientId === '' || this.clientId === undefined || this.clientId === null){
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

  validateTalabatAuth(){
    let validation = { message : 'validated', valid : true }
    if(this.talabatUsername === ''){
      validation.message = 'Please enter your Talabat username'
      validation.valid = false
    }else if(this.talabatPassword === ''){
      validation.message = 'Please enter your Talabat password'
      validation.valid = false
    }
    return validation
  }

  validateEmail(){
    let validation = { message : 'validated', valid : true }
    if(this.email === ''){
      validation.message = 'Please enter a valid email'
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
      this.foodicsTokenGenerated = true
      // this.foodicsCodeExpired = true
      this.startTimer()
      //cut the code from the url string
      let url = new URL(this.authorizationCode);
      this.authorizationCode = url.searchParams.get("code");
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
        localStorage.setItem('foodics_token_generated', 'true');
        // this.snackBar.open("Foodics account access token was generated successfully" , null, {
        //   duration: 3000,
        //   horizontalPosition: 'center',
        //   panelClass:"my-snack-bar-success"
        // });
        this.loading = false;
        this.spinner.hide();
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

    dialogRef.afterClosed().subscribe((res) => {})
  }

  startTimer() {
    this.interval = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.timeLeft = 600;
        this.foodicsTokenGenerated = false
        this.foodicsCodeExpired = true
      }
    },1000)
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


  openInstructionsDialog(){
    const dialogConfig = new MatDialogConfig()
    // dialogConfig.width = '420px'
    // dialogConfig.maxWidth = '420px'
    dialogConfig.autoFocus = true
    // dialogConfig.data = {token : this.foodicsAccessToken}

    let dialogRef = this.dialog.open(FoodicsAuthInstructionsComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.clientId = res.clientId
        this.clientSecret = res.clientSecret
        this.redirect_url = res.redirect_url
      }
    })
  }

  authenticateTalabat(){
    this.validationMessage=""
    let validationResult = this.validateTalabatAuth();
    if(validationResult.valid === false){
      this.talabatValidationMessage = validationResult.message
    }else{
      this.loading = true;
      this.spinner.show();
      let body = {
        taabatUsername : this.talabatUsername,
        talabatPassword : this.talabatPassword,
      }
      this.talabatService.authenticateTalabat(body)
      .toPromise()
      .then((res) => {
        this.snackBar.open("Talabat account was authenticated successfully" , null, {
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

  saveEmail(){
    this.validationMessage=""
    let validationResult = this.validateEmail();
    if(validationResult.valid === false){
      this.emailValidationMessage = validationResult.message
    }else{
      this.loading = true;
      this.spinner.show();
      let body = {
        email : this.email,
      }
      this.foodicsService.saveUpdatesEmail(body)
      .toPromise()
      .then((res) => {
        this.snackBar.open("Your email was saved successfully" , null, {
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

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      if(this.generalSettings.aggregatorConfiguration.integrationStatus === true){
        this.showAuthenticatedPanel = true;
      }
    }).catch(err => {
      this.snackBar.open("Failed to get general settings" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
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
