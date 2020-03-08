import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Data } from 'src/app/models/data';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';

@Component({
  selector: 'app-cost-center-location-mapping',
  templateUrl: './cost-center-location-mapping.component.html',
  styleUrls: ['./cost-center-location-mapping.component.scss']
})
export class CostCenterLocationMappingComponent implements OnInit {
  costCenterLoding = true;
  save_loading = false;
  loading = false;
  costCenters = [];
  selectedCostCenters = [];
  syncJobType: AccountSyncType;

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService,
    private accSyncTypeService:AccSyncTypeService) { 
  }

  ngOnInit() {
    this.getCostCenter();
    this.getSyncJobType();
  }

  getSyncJobType(){
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.JOURNALS_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.costCenters = this.syncJobType.configuration["costCenterLocationMapping"];

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
      if (costCenter.locationName){
        that.selectedCostCenters.push(costCenter)
      }
    });

    if (this.selectedCostCenters.length != 0) {
      this.syncJobType.configuration["costCenterLocationMapping"] = this.selectedCostCenters;
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


  getCostCenter() {
    this.costCenterLoding = true;
    this.spinner.show();
    this.invoiceService.getCostCenter(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
      this.costCenters = res.data;

      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      this.costCenters = [];
      console.error(err);
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }
}
