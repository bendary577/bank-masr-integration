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


@Component({
  selector: 'app-pos-sales-infor-configuration',
  templateUrl: './pos-sales-infor-configuration.component.html',
  styleUrls: ['./pos-sales-infor-configuration.component.scss']
})
export class PosSalesInforConfigurationComponent implements OnInit {

  loading = true;
  save_loading = false;
  analysis = [];

  newMajorGroup ;
  majorGroups = []
  selectedMajorGroup = [];
  majorGroup_loading = true;

  newTender ;
  tenders = []
  selectedTender = [];
  tender_loading = false;

  syncJobType: AccountSyncType;

  constructor(private spinner: NgxSpinnerService, private salesService:PosSalesService,
     private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar, public dialog: MatDialog) { }

  ngOnInit() {
    this.getSyncJobType();
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.POS_SALES_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
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
      console.error(err);
      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;
    this.selectedTender = [];

    let that = this;
    this.tenders.forEach(function (tender) {
      if (tender.checked) {
        that.selectedTender.push(tender)
      }
    });

    if (this.selectedTender.length != 0) {
      this.syncJobType.configuration["tenders"] = this.selectedTender;
    }

    // Save Selected Major Groups
    this.majorGroups.forEach(function (majorGroup) {
      if (majorGroup.checked) {
        that.selectedMajorGroup.push(majorGroup)
      }
    });

    if (this.selectedTender.length != 0) {
      this.syncJobType.configuration["majorGroups"] = this.selectedMajorGroup;
    }

    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.snackBar.open('Save configuration successfully.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
      this.spinner.hide();
      this.save_loading = false;
    }
    ).catch(err => {
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
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
          this.snackBar.open('Can not add tender now, please try again.', null, {
            duration: 2000,
            horizontalPosition: 'right',
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
          this.snackBar.open('Can not add major group now, please try again.', null, {
            duration: 2000,
            horizontalPosition: 'right',
          });
        });
      }
    });
  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
