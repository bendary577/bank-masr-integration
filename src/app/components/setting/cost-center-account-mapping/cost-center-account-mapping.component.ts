import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/models/Response';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

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

  generalSettings: GeneralSettings;

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    public snackBar: MatSnackBar,private generalSettingsService:GeneralSettingsService) {
  }

  ngOnInit() {
    this.getCostCenter();
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
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
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    });
  }


  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;
    // this.selectedCostCenters = [];

    // let that = this;
    // this.costCenters.forEach(function (costCenter) {
    //   if (costCenter.accountCode && costCenter.costCenterReference) {
    //     costCenter.checked = true;
    //     that.selectedCostCenters.push(costCenter);
    //   }
    // });

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


  getCostCenter() {
    this.costCenterLoding = true;
    this.spinner.show();

    this.invoiceService.getCostCenter("", false).toPromise().then((res: any) => {
      this.costCenters = res.costCenters;

      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      this.costCenters = [];
      console.error(err);
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }
}
