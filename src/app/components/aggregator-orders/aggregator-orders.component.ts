import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { TalabatService } from 'src/app/services/talabat/talabat.service';
import { DialogComponent } from '../dialog/dialog.component';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { ErrorMessages } from 'src/app/models/ErrorMessages';

@Component({
  selector: 'app-aggregator-orders',
  templateUrl: './aggregator-orders.component.html',
  styleUrls: ['./aggregator-orders.component.scss']
})
export class AggregatorOrdersComponent implements OnInit {
  generalSettings: GeneralSettings;

  branches = [];

  loading = true;
  selectedBranch: any;
  staticGetTalabatOrdersLoading: any;
  success = null;
  jobs = [];
  orders = [];
  order;
  state = "";
  ordersList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div style="text-align: center;">
      <p class="user-name">No orders have been created yet</p>
    </div>
  `,
    },
    selected: [],
    pageNumber: 1 as number,
    limit: 10 as number,
    locationsCount: 0 as number,
    ordersCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    ordersData: [],
    allOrdersBeforeFilter: [],
  }

  constructor(private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar, private talabatService:TalabatService, public dialog: MatDialog
    , private sidNav: SideNaveComponent, private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.getGeneralSettings();
    this.getStoredOrders();
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  get staticgetPosSalesLoading() {
    return this.state;
  }

  onLimitChange(limit) {
    this.ordersList.limit = limit
    this.getStoredOrders();
  }

  changePage(pageInfo) {
    this.ordersList.pageNumber = pageInfo.page
    this.getStoredOrders();
  }


  getOrdersCount() {
    this.talabatService
      .countOrders()
      .toPromise()
      .then((res: any) => {
        this.ordersList.ordersCount = res
      })
      .catch((err) => {
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  getStoredOrders() {
    this.spinner.show();
    this.getOrdersCount();
    this.talabatService.getStoreOrders(        
      this.ordersList.pageNumber,
      this.ordersList.limit
      ).toPromise().then((res: any) => {
      this.spinner.hide();
      this.orders = res["data"];
      this.ordersList.ordersData = res["data"];
   
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  
  getTalabatOrders() {
    this.spinner.show();
    this.talabatService.getTalabatOrders().toPromise().then((res: any) => {
      this.spinner.hide();
      this.orders = res["data"]["orders"];
      console.log(this.orders)
      this.loading = false;
      if (res.status) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }


  sendTalabatOrders() {
    this.spinner.show();
    this.talabatService.sendTalabatOrders().toPromise().then((res: any) => {
      this.spinner.hide();

      this.getStoredOrders();
      
      this.loading = false;
      if (res.status) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  openOrderDetails(row){

    this.spinner.show();

    this.talabatService.getTalabatOrderDetails(row).toPromise().then((res: any) => {

      this.order = res["data"];

      const dialogConfig = new MatDialogConfig();
      this.spinner.hide();

      dialogConfig.autoFocus = true;
      dialogConfig.data = {
          title:  "Order Details",
          message: this.order
      };
      dialogConfig.minWidth = 500;
      const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
      dialogRef.afterClosed().subscribe(result => {});

    }).catch(err => {
      this.spinner.hide();

      this.loading = false;
    });

  }

  
  getSyncJobData() {

    this.spinner.show();
    this.orders = [];

    this.talabatService.getTalabatBranchOrders(this.selectedBranch).toPromise().then((res: any) => {
      this.delay(500, res);
      console.log(this.orders)
      this.spinner.hide();
      this.loading = false;

    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  async delay(ms: number, res: any) {
      await new Promise(resolve => setTimeout(()=> this.getTransacrion(res), ms)).then(()=>console.log("fired"));
  }

  getTransacrion(res) {
        this.orders = res["data"]["orders"];
  }

  getGeneralSettings(){
    this.generalSettingsService
    .getGeneralSettings()
    .then((res) => {
      this.generalSettings = res as GeneralSettings
      this.branches = this.generalSettings.talabatConfiguration.branchMappings;
    })
    .catch((err) => {
      let message = ''
      if (err.error) {
        message = err.error
      } else if (err.message) {
        message = err.message
      } else {
        message = ErrorMessages.FAILED_TO_GET_CONFIG
      }

      this.snackBar.open(message, null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    })
  }
}
