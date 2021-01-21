import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZealVoucher } from 'src/app/models/zeal-voucher';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { MenuItemsService } from 'src/app/services/menuItems/menu-items.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { Operation } from 'src/app/models/operation';
import { OperationService } from 'src/app/services/operation/operation.service';

@Component({
  selector: 'app-zeal-voucher',
  templateUrl: './zeal-voucher.component.html',
  styleUrls: ['./zeal-voucher.component.scss']
})
export class ZealVoucherComponent implements OnInit {


  zealVoucher: ZealVoucher[];
  loading = true;
  static getMenuItemsLoading = false;
  success = null;
  jobs = [];
  menuItems = [];
  selectedJob: SyncJob = null;
  selectedOp: Operation = null;
  state = "";
  operations: [];

  constructor(private operationService: OperationService,
    private route: ActivatedRoute, private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private menuItemService: MenuItemsService) { }

  ngOnInit() {
      this.getSyncJobs(Constants.ZEAL_VOUCHER_OPERATION);
      this.getOperations(Constants.ZEAL_VOUCHER_OPERATION);
      this.state = localStorage.getItem('getMenuItemsLoading');
      if (this.state == "true") {
        MenuItemsComponent.getMenuItemsLoading = true;
      } else {
        MenuItemsComponent.getMenuItemsLoading = false;
      }

  }

  get staticgetMenuItemsLoading() {
    return MenuItemsComponent.getMenuItemsLoading ;
  }

  getMenuItems() {
    this.spinner.show();
    this.syncJobService.getSyncJobData(Constants.MENU_ITEMS_SYNC).toPromise().then((res: any) => {
      this.menuItems = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getMenuItemsSyncJob() {
    localStorage.setItem('getMenuItemsLoading', "true");
    MenuItemsComponent.getMenuItemsLoading = true;
    this.menuItemService.getMenuItems().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.MENU_ITEMS_SYNC);

      localStorage.setItem('getMenuItemsLoading', "false");
      MenuItemsComponent.getMenuItemsLoading = false;
      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

    }).catch(err => {
      this.getSyncJobs(Constants.MENU_ITEMS_SYNC);

      localStorage.setItem('getMenuItemsLoading', "false");

      MenuItemsComponent.getMenuItemsLoading = false;

      let msg = "";
      if (err.error.message) {
        msg = err.error.message ;
      }
      else{
        msg = "Failed to sync Menu Items completely!"
      }

      this.snackBar.open(msg , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });

  }

  getSyncJobs(syncJobTypeName: string) {
    this.spinner.show();
    this.syncJobService.getSyncJobs2(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0];
      if (this.jobs.length > 0) {
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getOperations(opeartionTypeName: string) {
    this.spinner.show();
    this.operationService.getOperation(opeartionTypeName).toPromise().then((res: any) => {
      this.operations = res;
  //    this.selectedOp = this.operations[0];
      if (this.operations.length > 0) {
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobData() {
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.menuItems = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

}
