import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Data } from 'src/app/models/data';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';


@Component({
  selector: 'app-journal-configuration',
  templateUrl: './journal-configuration.component.html',
  styleUrls: ['./journal-configuration.component.scss']
})
export class JournalConfigurationComponent implements OnInit {
  submitted = false;
  loading = true;
  costCenters = [];
  overGroups = [];
  selectedCostCenters = [];
  selectedOverGroups = [];
  mappedItems = [];

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private journalService:JournalService, private syncJobService:SyncJobService,
    private router:Router, public snackBar: MatSnackBar, private data: Data) { 

  }

  ngOnInit() {
    this.getCostCenter();
    this.getOverGroups();
  }

  getCostCenter() {
    this.spinner.show();
    this.loading = true;
    this.invoiceService.getCostCenter().toPromise().then((res: any) => {
      this.costCenters = res.data;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getOverGroups() {
    this.spinner.show();
    this.loading = true;
    this.journalService.getOverGroups().toPromise().then((res: any) => {
      this.overGroups = res.data;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  mapItemGroups(){
    this.spinner.show();
    this.loading = true;
    this.journalService.mapItemGroups().toPromise().then((res: any) => {
      this.mappedItems = res.data;

      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-success"
      });
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(err.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-success"
      });
    });
  }

  onSaveClick(): void {
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
      console.log(result);
      this.spinner.hide();
      // this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
      this.spinner.hide();
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'right',
      });
      // this.router.navigate([Constants.SYNC_JOBS]);
    });
  }

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
