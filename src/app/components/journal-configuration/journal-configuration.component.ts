import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { FormGroup } from '@angular/forms';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { AccountSyncType } from 'src/app/models/AccountSyncType';



@Component({
  selector: 'app-journal-configuration',
  templateUrl: './journal-configuration.component.html',
  styleUrls: ['./journal-configuration.component.scss']
})
export class JournalConfigurationComponent implements OnInit {
  loading = true;
  save_loading = false;
  cost_loading = true;
  group_loading = true;
  item_loading = true;
  syncTypeLoading = true

  syncJobType: AccountSyncType;

  costCenters = [];
  overGroups = [];
  selectedCostCenters = [];
  selectedOverGroups = [];
  mappedItems:[] = [];

  AccountSettingsForm: FormGroup;

  columns = []



  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private journalService:JournalService, private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar) {
      this.costCenters = [];
      this.overGroups = [];
      this.mappedItems = [];
    
  }

  ngOnInit() {
    this.getSyncJobType();
    this.getCostCenter();
    this.getOverGroups();

    this.columns = [
      {
        prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      { prop: 'name' },
      { prop: 'gender' },
      { prop: 'company' },
    ]

  }

  getCostCenter() {
    this.spinner.show();
    this.cost_loading = true;
    this.invoiceService.getCostCenter(Constants.JOURNALS_SYNC).toPromise().then((res: any) => {
      this.costCenters = res.data;
      this.spinner.hide();
      this.cost_loading = false;
    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.spinner.hide();
      this.cost_loading = false;
    });
  }

  getOverGroups() {
    this.group_loading = true;
    this.journalService.getOverGroups().toPromise().then((res: any) => {
      this.overGroups = res.data;
      this.group_loading = false;
    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.group_loading = false;
    });
  }

  mapItemGroups(){
    this.spinner.show();
    this.item_loading = true;
    this.journalService.mapItemGroups().toPromise().then((res: any) => {
      this.mappedItems = res.data;

      this.spinner.hide();
      this.item_loading = false;

      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-success"
      });
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.item_loading = false;

      this.snackBar.open(err.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    });
  }

  getSyncJobType(){
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.JOURNALS_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.costCenters = this.syncJobType.configuration["costCenters"];
      this.overGroups = this.syncJobType.configuration["overGroups"];
      this.mappedItems = res.configuration.items;

      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }


  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;

    let that = this;
    this.costCenters.forEach(function (costCenter) {
      if (costCenter.checked){
        that.selectedCostCenters.push(costCenter)
      }
    });

    this.overGroups.forEach(function (overGroup) {
      if (overGroup.checked){
        that.selectedOverGroups.push(overGroup)
      }
    });

    if (this.selectedCostCenters.length != 0) {
      this.syncJobType.configuration["costCenters"] = this.selectedCostCenters;
    }
    if(this.selectedOverGroups.length != 0){
      this.syncJobType.configuration["overGroups"] = this.selectedOverGroups;
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

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
