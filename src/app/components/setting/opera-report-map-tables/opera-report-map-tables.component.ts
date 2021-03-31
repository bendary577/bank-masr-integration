import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { CancelReason } from 'src/app/models/operaReports/CancelReason';
import { PaymentType } from 'src/app/models/operaReports/paymentTypes';
import { Response } from 'src/app/models/Response';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';

@Component({
  selector: 'app-opera-report-map-tables',
  templateUrl: './opera-report-map-tables.component.html',
  styleUrls: ['./opera-report-map-tables.component.scss']
})
export class OperaReportMapTablesComponent implements OnInit {
  loading = true;
  saveLoading = true;

  generalSettings: GeneralSettings;
  newPaymentType = new PaymentType();
  newCancelReason = new CancelReason();

  purposeOfVisit = [];
  paymentTypes = [];
  genders = [];
  customerTypes = [];
  roomTypes = [];
  transactionTypes = [];
  nationalities = [];
  
  cancelReasons = [];
  
  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.loading = true;
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      
      this.paymentTypes = this.generalSettings.paymentTypes;
      this.loading = false;

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
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });

      this.loading = false;
    });
  }

  add(){
    if(this.newPaymentType.typeId && this.newPaymentType.paymentType && this.newPaymentType.paymentDescription){
      this.paymentTypes.push(this.newPaymentType);
      this.newPaymentType = new PaymentType();

      this.paymentTypes = [...this.paymentTypes];
    }else{
      this.snackBar.open('Please fill all payment type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  addCancelReason(){
    if(this.newCancelReason.reasonId &&  this.newCancelReason.reason && this.newCancelReason.reasonDescription){
      this.cancelReasons.push(this.newCancelReason);
      this.newCancelReason = new CancelReason();

      this.cancelReasons = [...this.cancelReasons];
    }else{
      this.snackBar.open('Please fill all cancel reaseon fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  onSaveClick(){
    this.spinner.show();
    this.saveLoading = true;

    try {
      if(this.paymentTypes.length != 0) {
        this.generalSettings.paymentTypes = this.paymentTypes;
      }

      if(this.cancelReasons.length != 0) {
        this.generalSettings.cancelReasons = this.cancelReasons;
      }

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        const response = result as Response;
        if (response.success) {
          this.snackBar.open('Save configuration successfully.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
        }else{
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
        }
        this.spinner.hide();
        this.saveLoading = false;
      }
      ).catch(err => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.spinner.hide();
        this.saveLoading = false;
      });
    } catch (e) {
      console.log({error: e});
      this.snackBar.open('Failed to save Opera map tables, Please try again.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
    }
  }
}
