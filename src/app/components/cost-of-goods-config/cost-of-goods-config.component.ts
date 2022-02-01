import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { MajorGroup } from 'src/app/models/MajorGroup';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { AddMajorGroupComponent } from '../addMajorGroup/add-major-group.component';
import { ConsumptionMajorGroupChildComponent } from '../consumption-major-group-child/consumption-major-group-child.component';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-cost-of-goods-config',
  templateUrl: './cost-of-goods-config.component.html',
  styleUrls: ['./cost-of-goods-config.component.scss']
})
export class CostOfGoodsConfigComponent implements OnInit {

  userDefinedFlag = false;
  loading = true;
  save_loading = false;
  syncTypeLoading = true

  syncJobType: AccountSyncType;
  analysis = [];

  AccountSettingsForm: FormGroup;
  accountERD;
  analysisCodes = [null, "1","2","3","4","5","6","7","8","9","10"];
  newMajorGroup: MajorGroup = new MajorGroup();
  majorGroups = []

  columns = []
  constructor(private spinner: NgxSpinnerService, private sidNav: SideNaveComponent,
    private journalService: JournalService,public dialog: MatDialog,
    private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getSyncJobType();
    this.accountERD = localStorage.getItem('accountERD');
  }

  getSyncJobType() {
    this.loading = true;
    this.spinner.show();
    this.accSyncTypeService.getAccSyncJobType(Constants.COST_OF_GOODS_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.majorGroups = this.syncJobType.configuration.consumptionConfiguration["majorGroups"];
      if(this.syncJobType.configuration.timePeriod == "UserDefined"){
        this.userDefinedFlag = true;
      }
      this.analysis = this.syncJobType.configuration["analysis"];

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

        this.journalService.addMajorGroup(this.majorGroups, this.syncJobType.id).toPromise().then(result => {
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
    const dialogRef = this.dialog.open(ConsumptionMajorGroupChildComponent, {
      width: '550px',
      minHeight: '400px',
      data: {majorGroup: majorGroup}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;
        this.journalService.addMajorGroup(this.majorGroups, this.syncJobType.id).toPromise().then(result => {
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
