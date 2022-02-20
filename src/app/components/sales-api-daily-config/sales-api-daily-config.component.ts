import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { PosSalesService } from '../../services/posSales/pos-sales.service';
import { AddMajorGroupComponent } from '../addMajorGroup/add-major-group.component';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { AddTaxComponent } from '../add-tax/add-tax.component';
import { AddDiscountComponent } from '../add-discount/add-discount.component';
import { AddServiceChargeComponent } from '../add-service-charge/add-service-charge.component';
import { MajorGroup } from 'src/app/models/MajorGroup';
import { AddMajorGroupChildComponent } from '../addMajorGroupChild/add-major-group-child.component';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { ServiceCharge } from 'src/app/models/ServiceCharge';
import { SalesStatistics } from 'src/app/models/SalesStatistics';
import { AddSalesStatisticsComponent } from '../add-sales-statistics/add-sales-statistics.component';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { AddOrderTypeChannelComponent } from '../add-order-type-channel/add-order-type-channel.component';
import { OrderTypeChannel } from 'src/app/models/order-type-channel';

@Component({
  selector: 'app-sales-api-daily-config',
  templateUrl: './sales-api-daily-config.component.html',
  styleUrls: ['./sales-api-daily-config.component.scss']
})
export class SalesApiDailyConfigComponent implements OnInit {

  loading = true;
  save_loading = false;
  analysis = [];
  analysisCodes = ["1","2","3","4","5","6","7","8","9","10"];
  statistics: SalesStatistics[] = [];
  orderTypeChannels = [];
  newStatistics : SalesStatistics = new SalesStatistics();

  newOrderTypeChanel = new OrderTypeChannel;

  newServiceCharge : ServiceCharge = new ServiceCharge();
  apiKey;

  syncJobType: AccountSyncType;

  accountERD;

  generalSettings: GeneralSettings;

  constructor(private spinner: NgxSpinnerService, private salesService:PosSalesService,
    private sidNav: SideNaveComponent, private generalSettingsService: GeneralSettingsService,
     private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSyncJobType();
    this.getGeneralSettings();
    this.accountERD = localStorage.getItem('accountERD');
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.POS_SALES_API_DAILY_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.apiKey = this.syncJobType.configuration.salesAPIConfig["apiKey"];
      this.statistics = this.syncJobType.configuration.salesAPIConfig["statistics"];
      this.orderTypeChannels = this.syncJobType.configuration.salesAPIConfig["orderTypeChannels"]

      this.loading = false;
    }).catch(err => {
      console.log({
        salesSynError: err
      });
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

      this.loading = false;
    });
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

  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;

    this.syncJobType.configuration.salesConfiguration["apiKey"] = this.apiKey;

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

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
      this.save_loading = false;
    });
  }

  openOrderTypeDialog(){
    const dialogRef = this.dialog.open(AddOrderTypeChannelComponent, {
      width: '550px',
      data: {generalSettings: this.generalSettings}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;

        this.newOrderTypeChanel.checked = true;
        this.newOrderTypeChanel.orderType = res.orderType;
        this.newOrderTypeChanel.channel = res.channel;

        this.orderTypeChannels.push(this.newOrderTypeChanel);

        this.salesService.addOrderTypeChannel(this.orderTypeChannels, this.syncJobType.id).toPromise().then(result => {
          this.newOrderTypeChanel = new OrderTypeChannel()

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
          this.statistics.pop();
          this.newOrderTypeChanel = new OrderTypeChannel()

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add new statistic now, please try again.';
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

  openStatisticsDialog(){
    const dialogRef = this.dialog.open(AddSalesStatisticsComponent, {
      width: '550px',
      data: {generalSettings: this.generalSettings}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;

        this.newStatistics.checked = true;
        this.newStatistics.location = res.location;
        this.newStatistics.NoTablesAccount = res.registeredName;
        this.newStatistics.NoChecksAccount = res.leaseCode;
        this.newStatistics.NoGuestAccount = res.unitNo;
        this.newStatistics.NoTablesAccount = res.brand;

        this.statistics.push(this.newStatistics);

        this.salesService.addSalesStatistics(this.statistics, this.syncJobType.id).toPromise().then(result => {
          this.newStatistics = new SalesStatistics()

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
          this.statistics.pop();
          this.newStatistics = new SalesStatistics();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add new statistic now, please try again.';
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

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
