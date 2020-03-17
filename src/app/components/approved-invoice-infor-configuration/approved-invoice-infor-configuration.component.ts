import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Data } from 'src/app/models/data';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';

@Component({
  selector: 'app-approved-invoice-infor-configuration',
  templateUrl: './approved-invoice-infor-configuration.component.html',
  styleUrls: ['./approved-invoice-infor-configuration.component.scss']
})
export class ApprovedInvoiceInforConfigurationComponent implements OnInit {

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
    private data: Data, private accSyncTypeService:AccSyncTypeService) { 
  }

  ngOnInit() {
    this.getSyncJobType();
    this.getCostCenter();
  }

  getSyncJobType(){
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.costCenters = this.syncJobType.configuration["costCenters"];
      this.analysis = this.syncJobType.configuration["analysis"];

      // if (this.analysis.length == 0){
      //   this.analysis = [{"checked":false,"number":"1","codeElement":"","refrence":"Tax"},
      //   {"checked":true,"number":"2","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"3","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"4","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"5","codeElement":"","refrence":"Tax"},
      //   {"checked":true,"number":"6","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"7","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"8","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"9","codeElement":"","refrence":"Tax"},
      //   {"checked":false,"number":"10","codeElement":"","refrence":"Tax"}]
      // }
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();

    let that = this;
    this.costCenters.forEach(function (costCenter) {
      if (costCenter.accountCode){
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
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'right',
      });
      this.router.navigate([Constants.SYNC_JOBS]);
    });
  }
  getCostCenter() {
    this.costCenterLoding = true;
    this.spinner.show();
    this.invoiceService.getCostCenter(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
      this.costCenters = res.costCenters;

      this.spinner.hide();
      this.costCenterLoding = false;
    }).catch(err => {
      console.error(err);
      this.costCenters = [];
      this.spinner.hide();
      this.costCenterLoding = false;
    });
  }

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }


}
