import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Response } from 'src/app/models/Response';
import { BranchMapping } from 'src/app/models/deliveryAggregator/branch-mapping';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { TalabatService } from 'src/app/services/talabat/talabat.service';

@Component({
  selector: 'app-aggregator-branches-mapping',
  templateUrl: './aggregator-branches-mapping.component.html',
  styleUrls: ['./aggregator-branches-mapping.component.scss']
})
export class AggregatorBranchesMappingComponent implements OnInit {

  newBranchMapping = new BranchMapping();

  branchMappingData   = []

  showLoading: boolean;
  message: 'No data yet';

  generalSettings: GeneralSettings = new GeneralSettings();

  constructor(public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService
    , private talabatService: TalabatService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      this.branchMappingData = this.generalSettings.talabatConfiguration.branchMappings;
 
      this.spinner.hide();
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
    });
  }

  addBranchMappingData(){
    if(this.newBranchMapping.name &&  this.newBranchMapping.foodIcsBranchId && this.newBranchMapping.talabatBranchId){
      this.branchMappingData.push(this.newBranchMapping);
      this.newBranchMapping = new BranchMapping();

      this.branchMappingData = [...this.branchMappingData];
    }else {
      this.snackBar.open('Please fill all type fields.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }

  onSaveClick(){
    this.spinner.show();

    try {

      this.generalSettings.talabatConfiguration.branchMappings = this.branchMappingData;

      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        const response = result as Response;
        this.authService.generalSettings = this.generalSettings;
        if (response.success) {
          this.snackBar.open('Integration data saved successfully.', null, {
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
