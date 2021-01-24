import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ZealPayment } from 'src/app/models/zeal-payment';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { MenuItemsService } from 'src/app/services/menuItems/menu-items.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { MenuItemsComponent } from '../menu-items/menu-items.component';
import { OperationService } from 'src/app/services/operation/operation.service';

@Component({ 
  selector: 'app-zeal-payment',
  templateUrl: './zeal-payment.component.html',
  styleUrls: ['./zeal-payment.component.scss']
})
export class ZealPaymentComponent implements OnInit {

  zealPayments: ZealPayment[];
  loading = true;
  static getMenuItemsLoading = false;
  success = null;
  jobs = [];
  operations = [];
  menuItems = [];
  selectedJob :SyncJob = null;
  state = "";

  constructor(private operationService: OperationService,
              private route: ActivatedRoute, private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
              public snackBar: MatSnackBar, private menuItemService: MenuItemsService) { }

  ngOnInit() {
      this.zealPaymentHistory();
      this.getSyncJobs(Constants.ZEAL_PAYMENT_OPERATION);
      this.getOperations(Constants.ZEAL_PAYMENT_OPERATION);
      this.state = localStorage.getItem('getMenuItemsLoading');
      if (this.state == "true") {
        MenuItemsComponent.getMenuItemsLoading = true;
      } else {
        MenuItemsComponent.getMenuItemsLoading = false;
      }
  }

  zealPaymentHistory() {
  //  this.zealPaymentService.zealPaymentHistory().subscribe(
   //   data => {
// this.zealPayments = data;
   //   }
   // );
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
    this.syncJobService.getOperation(syncJobTypeName).toPromise().then((res: any) => {
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
      // this.selectedJob = this.operations[0];
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
