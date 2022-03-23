import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { CsvService } from 'src/app/services/csv/csv.service';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { TalabatService } from 'src/app/services/talabat/talabat.service';
import { DilogServiceService } from '../dialog/dilog-service.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-aggregator-orders',
  templateUrl: './aggregator-orders.component.html',
  styleUrls: ['./aggregator-orders.component.scss']
})
export class AggregatorOrdersComponent implements OnInit {


  loading = true;
  selectedBranch: any;
  staticGetTalabatOrdersLoading: any;
  success = null;
  jobs = [];
  orders = [];
  order;
  state = "";

  constructor(private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private talabatService:TalabatService, public dialog: MatDialog
    ,private excelService: ExcelService, private sidNav: SideNaveComponent, private csvService: CsvService) { }

  ngOnInit() {
    this.getStoredOrders();
    // this.getTalabatOrders();
    // this.state = localStorage.getItem('staticGetTalabatOrdersLoading');
    // if (this.state == "true") {
    //   this.staticGetTalabatOrdersLoading = true;
    // }
    // else{
    //   this.staticGetTalabatOrdersLoading = false;
    // }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  get staticgetPosSalesLoading() {
    return this.state;
  }

  getStoredOrders() {
    this.spinner.show();
    this.talabatService.getStoreOrders().toPromise().then((res: any) => {
      this.spinner.hide();
      this.orders = res["data"];
   
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
      // this.orders = res["data"]["orders"];
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
}
