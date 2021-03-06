import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { SimphonyDiscount } from 'src/app/models/loyalty/SimphonyDiscount';
import { Response } from 'src/app/models/Response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';

@Component({
  selector: 'app-simphony-discount-maping',
  templateUrl: './simphony-discount-maping.component.html',
  styleUrls: ['./simphony-discount-maping.component.scss']
})
export class SimphonyDiscountMapingComponent implements OnInit {
  newRateCode = new SimphonyDiscount();
  generalSettings: GeneralSettings = new GeneralSettings();

  discountRatesList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `<div><span style="font-size: 25px;text-alngign: center;">There are no simphony discount yet.</span></div>`
    },
    selected: [],
    discountRatesCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    discountRatesData: [] as SimphonyDiscount[] 
  };

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGeneralSettings();

    var number = document.getElementById('discountRate');

    // Listen for input event on numInput.
    number.onkeydown = function(e) {
      if(!((e.keyCode > 95 && e.keyCode < 106)
        || (e.keyCode > 47 && e.keyCode < 58) 
        || e.keyCode == 8)) {
          return false;
      }
    }
  }

  getGeneralSettings() {
    this.spinner.show();
    this.discountRatesList.showLoading = true;
    this.discountRatesList.discountRatesData = [];

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      this.discountRatesList.discountRatesData = this.generalSettings.discountRates;

      this.spinner.hide();
      this.discountRatesList.showLoading = false;
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_GET_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.spinner.hide();
      this.discountRatesList.showLoading = false;
    });
  }

  onSelect({selected}) {
    this.discountRatesList.selected.splice(0, this.discountRatesList.selected.length);
    this.discountRatesList.selected.push(...selected);
  }

  addRateCode(){
    console.log({
      discount: this.newRateCode
    })

    if(this.newRateCode.discountId  && this.newRateCode.discountRate){

      var i;
      for (i = 0; i < this.discountRatesList.discountRatesData.length; i++) {
        let discountRatesData = this.discountRatesList.discountRatesData[i] as SimphonyDiscount;
  
        if (discountRatesData.discountId == this.newRateCode.discountId) {
          this.snackBar.open('This discount ID is duplicate with exist one.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
            return ;
        }
      }

      this.newRateCode.deleted = false;

       this.discountRatesList.discountRatesData.push(this.newRateCode);
       this.newRateCode = new SimphonyDiscount();
 
       this.discountRatesList.discountRatesData = [...this.discountRatesList.discountRatesData];
     } else {
       this.snackBar.open('Please fill all dicount rate code fields.', null, {
         duration: 2000,
         horizontalPosition: 'center',
         panelClass:"my-snack-bar-fail"
       });
    }
  }

  // deleteRateCode(addFlag){
  //   if(addFlag){
  //     var i;
  //     for (i = 0; i < this.discountRatesList.discountRatesData.length; i++) {
  //       if (this.discountRatesList.discountRatesData[i].discountId == this.discountRatesList.selected[0].discountId) {
  //         this.discountRatesList.discountRatesData[i].deleted = false;
  //       }
  //       this.discountRatesList.discountRatesData = [...this.discountRatesList.discountRatesData];
  //     }
  //   }else{
  //     var i;
  //     for (i = 0; i < this.discountRatesList.discountRatesData.length; i++) {
  //       if (this.discountRatesList.discountRatesData[i].discountId == this.discountRatesList.selected[0].discountId) {
  //         this.discountRatesList.discountRatesData[i].deleted = true;
  //       }
  //       this.discountRatesList.discountRatesData = [...this.discountRatesList.discountRatesData];
  //     }
  //   }
  // }

  onSaveClick(){
    this.spinner.show();

    try {
      if(this.discountRatesList.discountRatesData.length != 0) {
        this.generalSettings.discountRates = this.discountRatesList.discountRatesData;
      }

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        const response = result as Response;
        this.authService.generalSettings = this.generalSettings;
        if (response.success) {
          this.snackBar.open('Save simphony discount rates successfully.', null, {
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
      }
      ).catch(err => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.spinner.hide();
      });
    } catch (e) {
      this.snackBar.open('Failed to save simphony discount rates, Please try again.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
    }
  }

}
