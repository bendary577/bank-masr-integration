import { Component, OnInit, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { Response } from 'src/app/models/Response';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cost-center-location-mapping',
  templateUrl: './cost-center-location-mapping.component.html',
  styleUrls: ['./cost-center-location-mapping.component.scss']
})
export class CostCenterLocationMappingComponent implements OnInit {
  costCenterLoding = true;
  saveLoading = false;
  loading = false;

  costCenters = [];
  selectedCostCenters = [];

  generalSettings: GeneralSettings;

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    public snackBar: MatSnackBar, private route: ActivatedRoute,
    private generalSettingsService:GeneralSettingsService, private zone:NgZone) {
  }

  ngOnInit() {
    this.getCostCenter();
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res: Response) => {
      this.generalSettings = res.data as GeneralSettings;
    }).catch(err => {
      console.error(err);
    });
  }


  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;
    this.selectedCostCenters = [];

    let that = this;
    this.costCenters.forEach(function (costCenter) {
      if (costCenter.locationName) {
        costCenter.checked = true;
        that.selectedCostCenters.push(costCenter);
      }
    });

    if(this.selectedCostCenters.length != 0) {
      this.generalSettings.costCenterLocationMapping = this.selectedCostCenters;

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

    this.invoiceService.getCostCenter("", true).toPromise().then((res: any) => {
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
