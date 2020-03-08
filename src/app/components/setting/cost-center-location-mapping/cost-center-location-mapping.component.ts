import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Data } from 'src/app/models/data';

@Component({
  selector: 'app-cost-center-location-mapping',
  templateUrl: './cost-center-location-mapping.component.html',
  styleUrls: ['./cost-center-location-mapping.component.scss']
})
export class CostCenterLocationMappingComponent implements OnInit {
  costCenterLoding = true;
  costCenters = [];
  selectedCostCenters = [];

  constructor(private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService,
    private data: Data) { 
  }

  ngOnInit() {
    this.getCostCenter();
  }

  onSaveClick(): void {
    this.spinner.show();
  }


  getCostCenter() {
    this.costCenterLoding = true;
    this.spinner.show();
    this.invoiceService.getCostCenter(Constants.APPROVED_INVOICES_SYNC).toPromise().then((res: any) => {
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
