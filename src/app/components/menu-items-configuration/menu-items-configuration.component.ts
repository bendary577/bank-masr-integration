import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AccountSyncType } from 'src/app/models/AccountSyncType';
import { Constants } from 'src/app/models/constants';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';

@Component({
  selector: 'app-menu-items-configuration',
  templateUrl: './menu-items-configuration.component.html',
  styleUrls: ['./menu-items-configuration.component.scss']
})
export class MenuItemsConfigurationComponent implements OnInit {
  loading = true;
  syncJobType: AccountSyncType;


  constructor(private spinner: NgxSpinnerService, 
    private syncJobService:SyncJobService, private accSyncTypeService:AccSyncTypeService,
   private router:Router, public snackBar: MatSnackBar) { }

 ngOnInit() {
   this.getSyncJobType();
 }

 getSyncJobType() {
   this.loading = true;
   this.accSyncTypeService.getAccSyncJobType(Constants.MENU_ITEMS_SYNC).toPromise().then((res: any) => {
     this.syncJobType = res;
     this.loading = false;
   }).catch(err => {
     console.error(err);
     this.loading = false;
   });
 }

  onSaveClick(): void {
    this.spinner.show();
    this.syncJobService.updateSyncJobTypeConfig(this.syncJobType).then(result => {
      this.snackBar.open('Save configuration successfully.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });
      this.spinner.hide();
    }
    ).catch(err => {
      this.snackBar.open('An error has occurred.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.spinner.hide();
    });
  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
