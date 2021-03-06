import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { Response } from 'src/app/models/Response';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { AddLocationComponent } from '../../add-location/add-location.component';
import { CostCenter } from 'src/app/models/CostCenter';
import { AddRevenueCenterComponent } from '../../add-revenue-center/add-revenue-center.component';
import { SideNaveComponent } from '../../side-nave/side-nave.component';
import { AddOrderTypeComponent } from '../../add-order-type/add-order-type.component';

@Component({
  selector: 'app-cost-center-location-mapping',
  templateUrl: './cost-center-location-mapping.component.html',
  styleUrls: ['./cost-center-location-mapping.component.scss']
})
export class CostCenterLocationMappingComponent implements OnInit {
  saveLoading = false;
  loading = false;

  newRevenueCenter;
  revenueCenters = [];
  orderTypes = [];
  newOrderType: any;
  newLocation  : CostCenter = new CostCenter();
  simphonyLocations = [];
  generalSettings: GeneralSettings;

  locationsList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span class="classname">No Locations found</span>
    </div>
  `
    },
    selected: [],
    locationsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    locationsData: [] 
  };

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar, private sideNav: SideNaveComponent,
    private generalSettingsService:GeneralSettingsService, private sidNav: SideNaveComponent,
    public dialog: MatDialog) {
  }

  ngOnInit() {
    this.getGeneralSettings();
  }

  onSelect({selected}) {
    this.locationsList.selected.splice(0, this.locationsList.selected.length);
    this.locationsList.selected.push(...selected);
  }

  getGeneralSettings() {
    this.loading = true;
    this.spinner.show();

    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.loading = false;
      this.spinner.hide();

      this.generalSettings = res as GeneralSettings;
      if (this.generalSettings.locations){
        this.locationsList.locationsData = this.generalSettings.locations;
        this.locationsList.showLoading = false;
      }
      if (this.generalSettings.simphonyLocations){
        this.simphonyLocations = this.generalSettings.simphonyLocations;
      }
      if(this.generalSettings.revenueCenters){
        this.revenueCenters = this.generalSettings.revenueCenters;
      }
      if(this.generalSettings.orderTypes){
        this.orderTypes = this.generalSettings.orderTypes;
      }
    }).catch(err => {
      this.loading = false;
      this.spinner.hide();
      
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
    });
  }

  openLocationDialog(){
    const dialogRef = this.dialog.open(AddLocationComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.newLocation.checked = true;
        this.newLocation.locationName = res.locationName;
        this.newLocation.accountCode = res.accountCode;
        this.newLocation.costCenterReference = res.costCenterReference;

        if(!this.generalSettings.locations){
          this.generalSettings.locations = []
        }
        this.generalSettings.locations.push(this.newLocation);

        this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
          this.newLocation = new CostCenter();  
          this.loading = false;

          this.snackBar.open("Add location successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.locationsList.locationsData.pop();
          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
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
        });
      }
    });
  }

  openRevenueCenterDialog(){
    const dialogRef = this.dialog.open(AddRevenueCenterComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newRevenueCenter = {};
        this.newRevenueCenter.checked = true;
        this.newRevenueCenter.revenueCenter = res.name;
        this.newRevenueCenter.revenueCenterId = res.id;

        if(!this.generalSettings.revenueCenters){
          this.generalSettings.revenueCenters = [];
        }
        this.generalSettings.revenueCenters.push(this.newRevenueCenter);

        this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
          this.newRevenueCenter = new CostCenter();  
          this.loading = false;

          this.snackBar.open("Add revenue center successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

          this.spinner.hide();
          this.loading = false;
          
        }).catch(err => {
          this.spinner.hide();
          this.loading = false;
          this.revenueCenters.pop();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add revenue center now, please try again.';
          }
    
          this.snackBar.open(message , null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });
  }

  openOrderTypeDialog(){
    const dialogRef = this.dialog.open(AddOrderTypeComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();

        if(!this.generalSettings.orderTypes){
          this.generalSettings.orderTypes = [];
        }
        this.generalSettings.orderTypes.push(res);

        this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
          this.newRevenueCenter = new CostCenter();  
          this.loading = false;

          this.snackBar.open("Add Order Type successfully.", null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

          this.spinner.hide();
          this.loading = false;
          
        }).catch(err => {
          this.spinner.hide();
          this.loading = false;
          this.revenueCenters.pop();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add Order Type now, please try again.';
          }
    
          this.snackBar.open(message , null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;
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
  }

  hasRole(role): Boolean{
    return this.sideNav.hasRole(role);
   }

}
