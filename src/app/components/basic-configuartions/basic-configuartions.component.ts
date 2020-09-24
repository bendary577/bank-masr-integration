import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';

@Component({
  selector: 'app-basic-configuartions',
  templateUrl: './basic-configuartions.component.html',
  styleUrls: ['./basic-configuartions.component.scss']
})
export class BasicConfiguartionsComponent implements OnInit {

  syncJobType: SyncJobType;
  submitted = false;
  loading = true;
  costCenterLoding = true;
  costCenters = [];
  businessUnits = [];
  PaymentMethods = [];
  selectedCostCenters = [];
  timePeriods = ["All", "Current Year", "Current Month", "Last Month", "Last Year", "User-defined"];
  analysis = []
  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService,
     private accSyncTypeService:AccSyncTypeService) {
  }


  ngOnInit() {
    this.getCostCenter();
  }

  getCostCenter() {
    this.costCenterLoding = true;
    this.spinner.show();
    this.invoiceService.getCostCenter(Constants.APPROVED_INVOICES_SYNC, false).toPromise().then((res: any) => {
      this.costCenters = res.costCenters;

      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      console.error(err);
      
      let message = "";
      if(err.status === 401){
        message = ErrorMessages.SESSION_EXPIRED;
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SYNC;
      }

      this.snackBar.open(message , null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.costCenters = [];
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();

    let that = this;
    this.costCenters.forEach(function (costCenter) {
      if (costCenter.accountCode) {
        costCenter.checked = true;
        that.selectedCostCenters.push(costCenter)
      }
    });

    this.syncJobType.configuration["costCenters"]  = this.selectedCostCenters
    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.spinner.hide();
      this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
      this.spinner.hide();

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.router.navigate([Constants.SYNC_JOBS]);
    });
  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
