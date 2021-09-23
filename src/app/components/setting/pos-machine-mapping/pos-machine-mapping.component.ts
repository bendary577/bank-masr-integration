import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { SimphonyDiscount } from 'src/app/models/loyalty/SimphonyDiscount';
import { PosMachineMap } from 'src/app/models/operaPayment/posMachineMap';
import { Response } from 'src/app/models/Response';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';

@Component({
  selector: 'app-pos-machine-mapping',
  templateUrl: './pos-machine-mapping.component.html',
  styleUrls: ['./pos-machine-mapping.component.scss']
})
export class PosMachineMappingComponent implements OnInit {

  newMachineMap = new PosMachineMap();
  generalSettings: GeneralSettings = new GeneralSettings();

  posMachineList = {
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
    posMachinesData: [] as PosMachineMap[] 
  };

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();
    this.posMachineList.showLoading = true;
    this.posMachineList.posMachinesData = [];

    this.generalSettingsService.getGeneralSettings().then((res) => {
      console.log(this.generalSettings)

      this.generalSettings = res as GeneralSettings;
      this.posMachineList.posMachinesData = this.generalSettings.posMachineMaps;
      this.spinner.hide();
      this.posMachineList.showLoading = false;
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
      this.posMachineList.showLoading = false;
    });
  }

  onSelect({selected}) {
    this.posMachineList.selected.splice(0, this.posMachineList.selected.length);
    this.posMachineList.selected.push(...selected);
  }

  addRateCode(){
    if(this.newMachineMap.name  && this.newMachineMap.ip && this.newMachineMap.port && this.newMachineMap.flag){
      var i;
      for (i = 0; i < this.posMachineList.posMachinesData.length; i++) {
        let posMchine = this.posMachineList.posMachinesData[i] as PosMachineMap;
  
        if (posMchine.flag == this.newMachineMap.flag) {
          this.snackBar.open('This machine is duplicate with exist one.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
            return ;
        }
      }

      this.newMachineMap.deleted = false;

       this.posMachineList.posMachinesData.push(this.newMachineMap);
       this.newMachineMap = new PosMachineMap;
 
       this.posMachineList.posMachinesData = [...this.posMachineList.posMachinesData];
     } else {
       this.snackBar.open('Please fill all machine map fields.', null, {
         duration: 2000,
         horizontalPosition: 'center',
         panelClass:"my-snack-bar-fail"
       });
    }
    console.log(this.generalSettings)

  }

  onSaveClick(){
    this.spinner.show();

    try {
      if(this.posMachineList.posMachinesData.length != 0) {
        this.generalSettings.posMachineMaps = this.posMachineList.posMachinesData;
      }
      console.log(this.generalSettings)

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        console.log(this.generalSettings)

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
