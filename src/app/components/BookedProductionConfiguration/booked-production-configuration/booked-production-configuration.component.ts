import { Component, OnInit } from '@angular/core';
import { Constants } from 'src/app/models/constants';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { CostCenter } from 'src/app/models/CostCenter';
import { FormGroup } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';

@Component({
  selector: 'app-booked-production-configuration',
  templateUrl: './booked-production-configuration.component.html',
  styleUrls: ['./booked-production-configuration.component.scss']
})
export class BookedProductionConfigurationComponent implements OnInit {
  loading = true;
  save_loading = false;
  syncTypeLoading = true
  groupLoading = true;

  uniqueOverGroupMapping = false;

  syncJobType: AccountSyncType;

  costCenters: CostCenter[] = [];
  overGroups = [];
  selectedCostCenters = [];
  selectedOverGroups = [];
  mappedItems:[] = [];
  analysis = [];

  AccountSettingsForm: FormGroup;

  constructor(private spinner: NgxSpinnerService, private syncJobService:SyncJobService,
    private accSyncTypeService:AccSyncTypeService, private router:Router, public snackBar: MatSnackBar) {
      this.costCenters = [];
      this.overGroups = [];
  }

  ngOnInit() {
    this.getSyncJobType();
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.BOOKED_TRANSFER_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.costCenters = this.syncJobType.configuration["costCenters"];
      this.overGroups = this.syncJobType.configuration["overGroups"];
      this.analysis = this.syncJobType.configuration["analysis"];
      this.mappedItems = res.configuration.items;
      this.uniqueOverGroupMapping = this.syncJobType.configuration["uniqueOverGroupMapping"];
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.save_loading = true;
    
    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.snackBar.open('Save configuration successfully.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
      this.spinner.hide();
      this.save_loading = false;

      this.router.navigate([Constants.SYNC_JOBS]);
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

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }
}
