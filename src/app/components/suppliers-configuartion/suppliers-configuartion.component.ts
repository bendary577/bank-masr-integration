import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { Constants } from 'src/app/models/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import {Data} from "../../models/data";
import { SyncJobType } from 'src/app/models/SyncJobType';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';


@Component({
  selector: 'app-suppliers-configuartion',
  templateUrl: './suppliers-configuartion.component.html',
  styleUrls: ['./suppliers-configuartion.component.scss']
})
export class SuppliersConfiguartionComponent implements OnInit {
  syncJobType;
  submitted = false;
  loading = true;

  getTaxsLoading = false;
  getGroupsLoading = false;

  taxes = []
  groups = []

  constructor(private formBuilder: FormBuilder, private sidNav: SidenavResponsive,
    private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private syncJobService:SyncJobService, private data: Data,
    private router: Router,  private supplierService: SupplierService, private accSyncTypeService:AccSyncTypeService) {

  }

  ngOnInit() {
    this.getSyncJobType();
    this.getTaxes();
    this.getGroups();
  }

  getSyncJobType() {
    this.loading = true;
    this.spinner.show();
    this.accSyncTypeService.getAccSyncJobType(Constants.SUPPLIERS_SYNC).toPromise().then((res: any) => {
      this.syncJobType = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      let message = "Error happend, Please try again.";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
 this.sidNav.Logout();
      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SYNC;
      }
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
      
      this.spinner.hide();
      this.loading = false;
    });
  }

  getTaxes() {
    this.getTaxsLoading = true;
    this.supplierService.getSuppliersTaxes().toPromise().then((res: any) => {
      this.taxes = res.data;
      this.getTaxsLoading = false;
      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }

    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.getTaxsLoading = false;
    });
  }

  getGroups() {
    this.getGroupsLoading = true;
    this.supplierService.getSuppliersGroups().toPromise().then((res: any) => {
      this.groups = res.data;
      this.getGroupsLoading = false;
      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }

    }).catch(err => {
      console.error(err);

      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.getGroupsLoading = false;
    });
  }

  onSaveClick() {
    this.spinner.show();

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
    });
  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
