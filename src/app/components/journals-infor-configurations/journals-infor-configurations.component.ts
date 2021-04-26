import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { FormGroup } from '@angular/forms';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { AddMajorGroupComponent } from '../addMajorGroup/add-major-group.component';
import { ItemGroup } from 'src/app/models/ItemGroup';
import { AddMajorGroupChildComponent } from '../addMajorGroupChild/add-major-group-child.component';
import { PosSalesService } from '../../services/posSales/pos-sales.service';
import { AddConsumptionLocationComponent } from '../add-consumption-location/add-consumption-location.component';
import { ConsumptionLocation } from 'src/app/models/ConsumptionLocation';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { JournalService } from 'src/app/services/journal/journal.service';

@Component({
  selector: 'app-journals-infor-configurations',
  templateUrl: './journals-infor-configurations.component.html',
  styleUrls: ['./journals-infor-configurations.component.scss']
})
export class JournalsInforConfigurationsComponent implements OnInit {
  userDefinedFlag = false;
  loading = true;
  save_loading = false;
  syncTypeLoading = true

  syncJobType: AccountSyncType;
  analysis = [];

  AccountSettingsForm: FormGroup;
  accountERD;
  analysisCodes = [null, "1","2","3","4","5","6","7","8","9","10"];

  columns = []

  newConsumptionLocation = new ConsumptionLocation();
  consumptionLocations = []

  generalSettings = new GeneralSettings();

  constructor(private spinner: NgxSpinnerService, private sidNav: SidenavResponsive,
    public dialog: MatDialog, private syncJobService:SyncJobService, 
    private generalSettingsService: GeneralSettingsService, private salesService:PosSalesService,
    private consumptionService: JournalService,
    private accSyncTypeService:AccSyncTypeService, private router:Router,
    public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getSyncJobType();
    this.getGeneralSettings();
    this.accountERD = localStorage.getItem('accountERD');
  }

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
    }).catch(err => {
      this.snackBar.open("Failed to get general settings" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  getSyncJobType() {
    this.loading = true;
    this.spinner.show();
    this.accSyncTypeService.getAccSyncJobType(Constants.CONSUMPTION_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.analysis = this.syncJobType.configuration["analysis"];
      this.consumptionLocations = this.syncJobType.configuration["consumptionConfiguration"]["consumptionLocations"];

      this.loading = false;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);
      this.loading = false;
      this.spinner.hide();
    });
  }


  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;

    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.snackBar.open('Save configuration successfully.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
      this.spinner.hide();
      this.save_loading = false;
      this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
      let message = "";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
        this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SYNC;
      }

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      
      this.spinner.hide();
      this.save_loading = false;

    });


  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

  chooseTimePeriod(){
    if(this.syncJobType.configuration.timePeriod == "UserDefined"){
      this.userDefinedFlag = true;
    }else{
      this.userDefinedFlag = false;
    }
  }

  openLocationDialog(){
    const dialogRef = this.dialog.open(AddConsumptionLocationComponent, {
      width: '550px',
      data: {generalSettings: this.generalSettings}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newConsumptionLocation = new ConsumptionLocation();
        this.newConsumptionLocation.accountCode = res.account;
        this.newConsumptionLocation.costCenter = res.costCenter;

        console.log({
          location: res.costCenter
        })

        this.consumptionLocations.push(this.newConsumptionLocation);

        this.consumptionService.updateConsumptionLocations(this.consumptionLocations, this.syncJobType.id, true).toPromise().then(result => {
          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

          this.spinner.hide();
          this.loading = false;

        }).catch(err => {
          this.spinner.hide();
          this.loading = false;
          this.consumptionLocations.pop();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add consumption location now, please try again.';
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

  viewMajorGroupChildsDialog(itemGroup: ItemGroup){
    const dialogRef = this.dialog.open(AddMajorGroupChildComponent, {
      width: '550px',
      minHeight: '1000px',
      data: {itemGroup: itemGroup}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.salesService.addMajorGroup(this.consumptionLocations, this.syncJobType.id).toPromise().then(result => {
          this.loading = false;
          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = ErrorMessages.FAILED_TO_SYNC;
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

}
