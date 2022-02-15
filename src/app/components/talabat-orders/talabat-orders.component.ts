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
  selector: 'app-talabat-orders',
  templateUrl: './talabat-orders.component.html',
  styleUrls: ['./talabat-orders.component.scss']
})
export class TalabatOrdersComponent implements OnInit {

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
    this.getTalabatOrders();
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
  // getPOSSales() {
  //   this.spinner.show();
  //   this.syncJobService.getSyncJobData(Constants.POS_SALES_SYNC).toPromise().then((res) => {
  //     this.posSales = res;

  //     this.spinner.hide();
  //     this.loading = false;
  //   }).catch(err => {
  //     this.spinner.hide();
  //     this.loading = false;
  //   });
  // }

  // getPOSSalesSyncJob() {
  //   localStorage.setItem('getPosSalesLoading', "true");
  //   PosSalesInforComponent.getPosSalesLoading = true;
  //   this.posSalesService.getPOSSales().toPromise().then((res: any) => {
  //     this.getSyncJobs(Constants.POS_SALES_SYNC);

  //     localStorage.setItem('getPosSalesLoading', "false");
  //     PosSalesInforComponent.getPosSalesLoading = false;

  //     if (res.status) {
  //       this.snackBar.open(res.message, null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-success"
  //       });
  //     }
  //     else{
  //       console.log(res.message)
  //       this.snackBar.open(res.message , null, {
  //         duration: 3000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-fail"
  //       });
  //     }

  //   }).catch(err => {
  //     this.getSyncJobs(Constants.POS_SALES_SYNC);

  //     localStorage.setItem('getPosSalesLoading', "false");

  //     PosSalesInforComponent.getPosSalesLoading = false;

  //     let msg = "";
  //     if (err.error.message) {
  //       msg = err.error.message ;
  //     }
  //     else{
  //       msg = "Failed to sync POS sales completely!"
  //     }

  //     this.snackBar.open(msg , null, {
  //       duration: 3000,
  //       horizontalPosition: 'center',
  //       panelClass:"my-snack-bar-fail"
  //     });
  //   });

  // }

  // exportToXLSX():void {
  //   this.excelService.exportSalesToExcel(this.selectedJob.id).subscribe(
  //     res => {
  //       const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
  //       const file = new File([blob], "Sales" + '.xlsx', { type: 'application/vnd.ms.excel' });
  //       saveAs(file);

  //       this.snackBar.open("Export Successfully", null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-success"
  //       });
  //     },
  //     err => {
  //       console.error(err)
  //       this.snackBar.open("Fail to export, Please try agian" , null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-fail"
  //       });
  //     }
  //  );
  // }

  // exportToCSV():void {
  //   this.csvService.exportSalesToCSV(this.selectedJob.id, Constants.POS_SALES_SYNC).subscribe(
  //     res => {
  //       const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
  //       const file = new File([blob], "sales" + '.ndf', { type: 'application/vnd.ms.txt' });
  //       saveAs(file);

  //       this.snackBar.open("Export Successfully", null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-success"
  //       });
  //     },
  //     err => {
  //       console.error(err)
  //       this.snackBar.open("Fail to export, Please try agian" , null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-fail"
  //       });
  //     }
  //  );
  // }

  // generateSingleFile():void {
  //   this.csvService.generateSingleFile(Constants.POS_SALES_SYNC).subscribe(
  //     res => {
  //       const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
  //       const file = new File([blob], "sales" + '.ndf', { type: 'application/vnd.ms.txt' });
  //       saveAs(file);

  //       this.snackBar.open("Export Successfully", null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-success"
  //       });
  //     },
  //     err => {
  //       console.error(err)
  //       this.snackBar.open("Fail to export, Please try agian" , null, {
  //         duration: 2000,
  //         horizontalPosition: 'center',
  //         panelClass:"my-snack-bar-fail"
  //       });
  //     }
  //  );
  // }
}
