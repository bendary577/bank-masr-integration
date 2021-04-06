import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { BookingType } from 'src/app/models/operaReports/paymentTypes';
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
  newPaymentType = new BookingType();
  newCancelReason = new BookingType();
  newRoomType = new BookingType();
  newNationalities = new BookingType();
  newPurposeOfVisit = new BookingType();
  newGender = new BookingType();
  newCustomerTypes = new BookingType();
  newTransactionTypes = new BookingType();
  newExpenseType = new BookingType();

  purposeOfVisit = [];
  paymentTypes = [];
  genders = [];
  customerTypes = [];
  roomTypes = [];
  transactionTypes = [];
  nationalities = [];
  cancelReasons = [];
  expenseTypes = [];

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.loading = true;
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;

      this.cancelReasons = this.generalSettings.cancelReasons;
      this.paymentTypes = this.generalSettings.paymentTypes;
      this.purposeOfVisit = this.generalSettings.purposeOfVisit;
      this.genders = this.generalSettings.genders;
      this.customerTypes = this.generalSettings.customerTypes;
      this.roomTypes = this.generalSettings.roomTypes;
      this.transactionTypes = this.generalSettings.transactionTypes;
      this.nationalities = this.generalSettings.nationalities;
      this.expenseTypes = this.generalSettings.expenseTypes;

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
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });

      this.loading = false;
      this.spinner.hide();

    });
  }

  add(){
    if(this.newPaymentType.typeId && this.newPaymentType.type && this.newPaymentType.typeDescription){
      this.paymentTypes.push(this.newPaymentType);
      this.newPaymentType = new BookingType();

      this.paymentTypes = [...this.paymentTypes];

    } else if(this.newCancelReason.type &&  this.newCancelReason.type && this.newCancelReason.typeDescription){
      this.cancelReasons.push(this.newCancelReason);
      this.newCancelReason = new BookingType();

      this.cancelReasons = [...this.cancelReasons];

    } else if(this.newRoomType.type &&  this.newRoomType.type && this.newRoomType.typeDescription){
      this.roomTypes.push(this.newRoomType);
      this.newRoomType = new BookingType();

      this.roomTypes = [...this.roomTypes];

    } else if(this.newCustomerTypes.type &&  this.newCustomerTypes.type && this.newCustomerTypes.typeDescription){
      this.customerTypes.push(this.newCustomerTypes);
      this.newCustomerTypes = new BookingType();

      this.customerTypes = [...this.customerTypes];

    } else if(this.newNationalities.type &&  this.newNationalities.type && this.newNationalities.typeDescription){
      this.nationalities.push(this.newNationalities);
      this.newNationalities = new BookingType();

      this.nationalities = [...this.nationalities];

    } else if(this.newPurposeOfVisit.type &&  this.newPurposeOfVisit.type && this.newPurposeOfVisit.typeDescription){
      this.purposeOfVisit.push(this.newPurposeOfVisit);
      this.newPurposeOfVisit = new BookingType();

      this.purposeOfVisit = [...this.purposeOfVisit];

    } else if(this.newGender.type &&  this.newGender.type && this.newGender.typeDescription){
      this.genders.push(this.newGender);
      this.newGender = new BookingType();

      this.genders = [...this.genders];

    } else if(this.newTransactionTypes.type &&  this.newTransactionTypes.type && this.newTransactionTypes.typeDescription){
      this.transactionTypes.push(this.newTransactionTypes);
      this.newTransactionTypes = new BookingType();

      this.transactionTypes = [...this.transactionTypes];

    } else if(this.newExpenseType.type &&  this.newExpenseType.type && this.newExpenseType.typeDescription){
      this.expenseTypes.push(this.newExpenseType);
      this.newExpenseType = new BookingType();

      this.expenseTypes = [...this.expenseTypes];

    } else {
      this.snackBar.open('Please fill all type fields.', null, {
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

      if(this.roomTypes.length != 0) {
        this.generalSettings.roomTypes = this.roomTypes;
      }

      if(this.nationalities.length != 0) {
        this.generalSettings.nationalities = this.nationalities;
      }

      if(this.purposeOfVisit.length != 0) {
        this.generalSettings.purposeOfVisit = this.purposeOfVisit;
      }

      if(this.genders.length != 0) {
        this.generalSettings.genders = this.genders;
      }

      if(this.customerTypes.length != 0) {
        this.generalSettings.customerTypes = this.customerTypes;
      }

      if(this.transactionTypes.length != 0) {
        this.generalSettings.transactionTypes = this.transactionTypes;
      }

      if(this.expenseTypes.length != 0) {
        this.generalSettings.expenseTypes = this.expenseTypes;
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
