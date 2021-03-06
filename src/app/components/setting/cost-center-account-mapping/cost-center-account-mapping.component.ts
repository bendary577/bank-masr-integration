import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/Response';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { CostCenter } from 'src/app/models/CostCenter';

@Component({
  selector: 'app-cost-center-account-mapping',
  templateUrl: './cost-center-account-mapping.component.html',
  styleUrls: ['./cost-center-account-mapping.component.scss']
})
export class CostCenterAccountMappingComponent implements OnInit {

  costCenterLoding = true;
  saveLoading = false;
  loading = false;

  costCenters = [];
  selectedCostCenters = [];
  locations = [];
  
  generalSettings: GeneralSettings;

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    public snackBar: MatSnackBar,private generalSettingsService:GeneralSettingsService) {
  }

  ngOnInit() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.costCenterLoding = true;
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      this.locations = this.generalSettings.locations;
      this.costCenters = this.generalSettings.costCenterAccountMapping;
      if(this.costCenters.length == 0){
        this.getCostCenters();
      }
      
      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = "Failed to get general settings.";
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }

  getCostCenters(){
    this.costCenterLoding = true;
    this.spinner.show();
    this.invoiceService.getCostCenter("", false).toPromise().then((res: any) => {
      this.costCenters = res.costCenters;
      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;

    if(this.costCenters.length != 0) {
      this.generalSettings.costCenterAccountMapping = this.costCenters;

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
    }else{
      this.spinner.hide();
    }
  }


}
