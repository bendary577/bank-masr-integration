import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatDialog } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { PosSalesService } from '../../services/posSales/pos-sales.service';
import { AddTenderComponent } from '../add-tender/add-tender.component';
import { AddMajorGroupComponent } from '../addMajorGroup/add-major-group.component';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { AddTaxComponent } from '../add-tax/add-tax.component';
import { Tax } from 'src/app/models/Tax';


@Component({
  selector: 'app-pos-sales-infor-configuration',
  templateUrl: './pos-sales-infor-configuration.component.html',
  styleUrls: ['./pos-sales-infor-configuration.component.scss']
})
export class PosSalesInforConfigurationComponent implements OnInit {
  userDefinedFlag = false;

  loading = true;
  save_loading = false;
  analysis = [];

  newMajorGroup ;
  majorGroups = []
  selectedMajorGroup = [];
  majorGroup_loading = true;

  newTender ;  
  tenders = [];

  newTax;
  taxes = [];

  selectedTender = [];
  tender_loading = false;

  syncJobType: AccountSyncType;

  constructor(private spinner: NgxSpinnerService, private salesService:PosSalesService,
    private sidNav: SidenavResponsive,
     private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSyncJobType();
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.POS_SALES_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.taxes = this.syncJobType.configuration["taxes"];
      this.tenders = this.syncJobType.configuration["tenders"];
      this.majorGroups = this.syncJobType.configuration["majorGroups"];
      this.analysis = this.syncJobType.configuration["analysis"];

      if (this.tenders.length == 0){
        this.tenders = [
          {"checked": false, "tender": "Cash", "account": ""},
          {"checked": false, "tender": "Visa", "account": ""},
          {"checked": false, "tender": "Master", "account": ""},
          {"checked": false, "tender": "Online Payment", "account": ""}
        ];
      }
      this.loading = false;
    }).catch(err => {
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

      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;

    this.syncJobType["configuration"]["taxes"] = this.taxes;
    this.syncJobType["configuration"]["tenders"] = this.tenders;
    this.syncJobType["configuration"]["majorGroups"] = this.majorGroups;

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

  openTenderDialog(){
    const dialogRef = this.dialog.open(AddTenderComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.loading = true;
        this.newTender = {};
        this.newTender.checked = false;
        this.newTender.tender = res.name;
        this.newTender.account = res.account;

        this.tenders.push(this.newTender);

        this.salesService.addTender(this.tenders, this.syncJobType.id).toPromise().then(result => {
          this.spinner.hide();
          this.loading = false;

          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'right',
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
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
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
            horizontalPosition: 'right',
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
            horizontalPosition: 'right',
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
        this.newMajorGroup = {};
        this.newMajorGroup.checked = false;
        this.newMajorGroup.majorGroup = res.name;
        this.newMajorGroup.account = res.account;

        this.majorGroups.push(this.newMajorGroup);

        this.salesService.addMajorGroup(this.majorGroups, this.syncJobType.id).toPromise().then(result => {
          this.snackBar.open(result["message"], null, {
            duration: 2000,
            horizontalPosition: 'right',
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
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
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
}
