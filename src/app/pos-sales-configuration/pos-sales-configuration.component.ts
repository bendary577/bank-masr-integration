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
import { PosSalesService } from '../services/posSales/pos-sales.service';



@Component({
  selector: 'app-pos-sales-configuration',
  templateUrl: './pos-sales-configuration.component.html',
  styleUrls: ['./pos-sales-configuration.component.scss']
})
export class PosSalesConfigurationComponent implements OnInit {

  loading = true;
  save_loading = false;
  tender_loading = true;
  tenders = [];
  selectedTender = [];

  syncJobType: AccountSyncType;  

  constructor(private spinner: NgxSpinnerService, private salesService:PosSalesService,
     private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
    private router:Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSyncJobType();
    // this.getSyncJobType();
  }

  getSyncJobType(){
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.JOURNALS_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.tenders = this.syncJobType.configuration["tenders"];

      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  getTenders() {
    this.spinner.show();
    this.tender_loading = true;
    this.salesService.getTenders().toPromise().then((res: any) => {
      this.tenders = res.data;

      this.spinner.hide();
      this.tender_loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.tender_loading = false;
    });
  }

  
  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;

    let that = this;
    this.tenders.forEach(function (costCenter) {
      if (costCenter.checked){
        that.selectedTender.push(costCenter)
      }
    });

    if(this.selectedTender.length != 0){
      this.syncJobType.configuration["tenders"] = this.selectedTender;
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
