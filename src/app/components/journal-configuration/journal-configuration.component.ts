import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Data } from 'src/app/models/data';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-journal-configuration',
  templateUrl: './journal-configuration.component.html',
  styleUrls: ['./journal-configuration.component.scss']
})
export class JournalConfigurationComponent implements OnInit {
  save_loading = false;
  cost_loading = true;
  group_loading = true;
  item_loading = true;
  syncTypeLoading = true

  syncJobType = {};

  costCenters = [];
  overGroups = [];
  selectedCostCenters = [];
  selectedOverGroups = [];
  mappedItems = [];

  AccountSettingsForm: FormGroup;


  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private journalService:JournalService, private syncJobService:SyncJobService,
    private router:Router, public snackBar: MatSnackBar, private data: Data,
    private formBuilder: FormBuilder) {
      // this.mappedItems = data.storage["configuration"]["itemGroups"]

  }

  ngOnInit() {
    this.AccountSettingsForm = this.formBuilder.group({
      company: ["", Validators.required],
      departmentId: ["", Validators.required],
      accountId: [""],
      intercompany: [""],
      productId: [""],
      future2Id: [""]
    });

    this.getSyncJobType();
    this.getCostCenter();
    this.getOverGroups();
  }

  getCostCenter() {
    this.spinner.show();
    this.cost_loading = true;
    this.invoiceService.getCostCenter().toPromise().then((res: any) => {
      this.costCenters = res.data;

      this.spinner.hide();
      this.cost_loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.cost_loading = false;
    });
  }

  getOverGroups() {
    this.spinner.show();
    this.group_loading = true;
    this.journalService.getOverGroups().toPromise().then((res: any) => {

      this.overGroups = res.data;

      this.spinner.hide();
      this.group_loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
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
        panelClass: "my-snack-bar-success"
      });
    });
  }

  getSyncJobType(){
    this.item_loading = true;
    this.spinner.show();
    this.syncJobService.getSyncJobTypeDB("Journals").toPromise().then((res: any) => {
      this.syncJobType = res;
      this.mappedItems =   res.configuration.itemGroups;

      this.spinner.hide();
      this.item_loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.item_loading = false;
    });

  }

  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;

    let that = this;
    this.costCenters.forEach(function (costCenter) {
      if (costCenter.checked){
        that.selectedCostCenters.push(costCenter.cost_center)
      }
    });

    this.overGroups.forEach(function (overGroup) {
      if (overGroup.checked){
        that.selectedOverGroups.push(overGroup.over_group)
      }
    });


    this.data.storage["configuration"]["costCenters"] = this.selectedCostCenters;
    this.data.storage["configuration"]["overGroups"] = this.selectedOverGroups;

    this.syncJobService.updateSyncJobTypeConfig(this.data.storage).then(result => {
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
