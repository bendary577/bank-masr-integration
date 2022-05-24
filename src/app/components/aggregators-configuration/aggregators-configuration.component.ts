import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { FoodicsServiceService } from 'src/app/services/foodics-service.service';

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
  randomString : ''
  redirect_url : ''
  validationMessage = ''


  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private foodicsService : FoodicsServiceService) { }

  ngOnInit() {}



  authorizeFoodicsAccount(){
    this.validationMessage=""
    let validationResult = this.validate();
    if(validationResult.valid === false){
      this.validationMessage = validationResult.message
    }else{
      this.loading = true;
      this.spinner.show();
      this.foodicsService.authorizeFoodicsAccount(this.clientId, this.clientSecret, this.randomString)
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
