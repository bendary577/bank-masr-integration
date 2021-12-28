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
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
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


@Component({
  selector: 'app-pos-sales-infor-configuration',
  templateUrl: './pos-sales-infor-configuration.component.html',
  styleUrls: ['./pos-sales-infor-configuration.component.scss']
})
export class PosSalesInforConfigurationComponent implements OnInit {
  loading = true;
  save_loading = false;
  analysis = [];
  analysisCodes = ["1","2","3","4","5","6","7","8","9","10"];
  statistics: SalesStatistics[] = [];
  newStatistics : SalesStatistics = new SalesStatistics();

  newMajorGroup: MajorGroup = new MajorGroup();
  majorGroups = []
  selectedMajorGroup = [];
  majorGroup_loading = true;

  tenders = [];

  newTax;
  taxes = [];

  newDiscount;
  discounts = [];

  newServiceCharge : ServiceCharge = new ServiceCharge();
  serviceCharges = [];

  selectedTender = [];
  tender_loading = false;

  syncJobType: AccountSyncType;

  accountERD;

  generalSettings: GeneralSettings;

  constructor(private spinner: NgxSpinnerService, private salesService:PosSalesService,
    private sidNav: SidenavResponsive, private generalSettingsService: GeneralSettingsService,
     private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSyncJobType();
    this.getGeneralSettings();
    this.accountERD = localStorage.getItem('accountERD');
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.POS_SALES_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.taxes = this.syncJobType.configuration.salesConfiguration["taxes"];
      this.tenders = this.syncJobType.configuration.salesConfiguration["tenders"];
      this.discounts = this.syncJobType.configuration.salesConfiguration["discounts"];
      this.majorGroups = this.syncJobType.configuration.salesConfiguration["majorGroups"];
      this.serviceCharges = this.syncJobType.configuration.salesConfiguration["serviceCharges"];
      this.analysis = this.syncJobType.configuration["analysis"];
      this.statistics = this.syncJobType.configuration.salesConfiguration["statistics"];

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

    this.syncJobType.configuration.salesConfiguration["taxes"] = this.taxes;
    this.syncJobType.configuration.salesConfiguration["tenders"] = this.tenders;
    this.syncJobType.configuration.salesConfiguration["discounts"] = this.discounts;
    this.syncJobType.configuration.salesConfiguration["majorGroups"] = this.majorGroups;
    this.syncJobType.configuration.salesConfiguration["serviceCharges"] = this.serviceCharges;

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

  openTaxDialog(){
    const dialogRef = this.dialog.open(AddTaxComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newTax = {};
        this.newTax.checked = false;
        this.newTax.tax = res.name;
        this.newTax.account = res.account;

        this.taxes.push(this.newTax);

        this.salesService.addTax(this.taxes, this.syncJobType.id).toPromise().then(result => {
          this.spinner.hide();
          this.loading = false;

          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.spinner.hide();
          this.loading = false;

          this.tenders.pop();

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

  openMajorGroupDialog(){
    const dialogRef = this.dialog.open(AddMajorGroupComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newMajorGroup = new MajorGroup();
        this.newMajorGroup.checked = true;
        this.newMajorGroup.majorGroup = res.name;
        this.newMajorGroup.account = res.account;

        this.majorGroups.push(this.newMajorGroup);

        this.salesService.addMajorGroup(this.majorGroups, this.syncJobType.id).toPromise().then(result => {
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
          this.majorGroups.pop();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add major group now, please try again.';
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

  viewMajorGroupChildsDialog(majorGroup: MajorGroup){
    const dialogRef = this.dialog.open(AddMajorGroupChildComponent, {
      width: '550px',
      // minHeight: '1000px',
      data: {majorGroup: majorGroup}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.salesService.addMajorGroup(this.majorGroups, this.syncJobType.id).toPromise().then(result => {
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

  openDiscountDialog(){
    const dialogRef = this.dialog.open(AddDiscountComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newDiscount = {};
        this.newDiscount.checked = true;
        this.newDiscount.discount = res.name;
        this.newDiscount.account = res.account;

        this.discounts.push(this.newDiscount);

        this.salesService.addDiscount(this.discounts, this.syncJobType.id).toPromise().then(result => {
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
          this.majorGroups.pop();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add discount now, please try again.';
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

  openServiceChargeDialog(){
    const dialogRef = this.dialog.open(AddServiceChargeComponent, {
      width: '550px',
      data: {generalSettings: this.generalSettings}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newServiceCharge.checked = true;
        this.newServiceCharge.serviceCharge = res.name;
        this.newServiceCharge.account = res.account;

        this.newServiceCharge.costCenter = res.location;
        this.newServiceCharge.revenueCenter = res.revenueCenter;

        this.serviceCharges.push(this.newServiceCharge);

        this.salesService.addServiceCharge(this.serviceCharges, this.syncJobType.id).toPromise().then(result => {
          this.newServiceCharge = new ServiceCharge()

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
          this.serviceCharges.pop();
          this.newServiceCharge = new ServiceCharge();

          let message = "";
          if(err.status === 401){
             message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = 'Can not add service charges now, please try again.';
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
        this.newStatistics.NoChecksAccount = res.NoChecksAccount;
        this.newStatistics.NoGuestAccount = res.NoGuestAccount;
        this.newStatistics.NoTablesAccount = res.NoTablesAccount;
        this.newStatistics.location = res.location;

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
