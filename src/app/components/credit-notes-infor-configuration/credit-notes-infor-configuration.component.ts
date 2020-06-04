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
  selector: 'app-credit-notes-infor-configuration',
  templateUrl: './credit-notes-infor-configuration.component.html',
  styleUrls: ['./credit-notes-infor-configuration.component.scss']
})
export class CreditNotesInforConfigurationComponent implements OnInit {

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
    private router:Router, public snackBar: MatSnackBar, private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService) {
  }

  ngOnInit() {
    this.getSyncJobType();
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.CREDIT_NOTE_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.analysis = this.syncJobType.configuration["analysis"];
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();
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
