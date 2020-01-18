import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Data } from 'src/app/models/data';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-approved-invoice-configuration',
  templateUrl: './approved-invoice-configuration.component.html',
  styleUrls: ['./approved-invoice-configuration.component.scss']
})
export class ApprovedInvoiceConfigurationComponent implements OnInit {
  syncJobType: SyncJobType;
  submitted = false;
  loading = true;
  costCenterLoding = true;
  costCenters = [];
  businessUnits = [];
  selectedCostCenters = [];

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService,
    private data: Data) { 
  }

  ngOnInit() {
    this.getSyncJobType();
    this.getBusinessUnits()
    this.getCostCenter();
  }

  getSyncJobType(){
    this.loading = true;
    this.syncJobService.getSyncJobTypeDB(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();

    this.syncJobType.configuration["costCenters"]  = this.costCenters    
    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.spinner.hide();
      this.router.navigate([Constants.SYNC_JOBS]);
    }
    ).catch(err => {
      this.spinner.hide();
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'right',
      });
      this.router.navigate([Constants.SYNC_JOBS]);
    });
  }

  getBusinessUnits() {
    this.invoiceService.getBisinessUnits().toPromise().then((res: any) => {
      this.businessUnits = res.data.items;
    }).catch(err => {
      console.error(err);
    });
  }

  getCostCenter() {
    this.costCenterLoding = true;
    this.spinner.show();
    this.invoiceService.getCostCenter().toPromise().then((res: any) => {
      this.costCenters = res.data;

      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
