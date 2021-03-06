import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { SyncJob } from 'src/app/models/SyncJob';
import { PosSalesService } from 'src/app/services/posSales/pos-sales.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { saveAs } from 'file-saver';
import { CsvService } from 'src/app/services/csv/csv.service';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-sales-api-daily',
  templateUrl: './sales-api-daily.component.html',
  styleUrls: ['./sales-api-daily.component.scss']
})
export class SalesApiDailyComponent implements OnInit {
  loading = true;
  static getPosSalesLoading = false;
  success = null;
  jobs = [];
  posSales = [];
  selectedJob :SyncJob = null;
  state = "";

  constructor(private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private posSalesService:PosSalesService, private excelService: ExcelService,
    private sidNav: SideNaveComponent,
    private csvService: CsvService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.POS_SALES_API_DAILY_SYNC);
    this.state = localStorage.getItem('getPosSalesLoading');
    if (this.state == "true") {
      SalesApiDailyComponent.getPosSalesLoading = true;
    }
    else{
      SalesApiDailyComponent.getPosSalesLoading = false;
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  get staticgetPosSalesLoading() {
    return SalesApiDailyComponent.getPosSalesLoading ;
  }

  getPOSSales() {
    this.spinner.show();
    this.syncJobService.getSyncJobData(Constants.POS_SALES_API_DAILY_SYNC).toPromise().then((res) => {
      this.posSales = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  getPOSSalesSyncJob() {
    localStorage.setItem('getPosSalesLoading', "true");
    SalesApiDailyComponent.getPosSalesLoading = true;
    this.posSalesService.getPOSSalesAPIDaily("Daily").toPromise().then((res: any) => {
      this.getSyncJobs(Constants.POS_SALES_API_DAILY_SYNC);

      localStorage.setItem('getPosSalesLoading', "false");
      SalesApiDailyComponent.getPosSalesLoading = false;

      if (res.status) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        console.log(res.message)
        this.snackBar.open(res.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }

    }).catch(err => {
      this.getSyncJobs(Constants.POS_SALES_API_DAILY_SYNC);

      localStorage.setItem('getPosSalesLoading', "false");

      SalesApiDailyComponent.getPosSalesLoading = false;

      let msg = "";
      if (err.error.message) {
        msg = err.error.message ;
      }
      else{
        msg = "Failed to sync POS sales completely!"
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
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
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


  getSyncJobData() {
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.posSales = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  exportToXLSX():void {
    this.excelService.exportSalesToExcel(this.selectedJob.id).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "Sales" + '.xlsx', { type: 'application/vnd.ms.excel' });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      },
      err => {
        console.error(err)
        this.snackBar.open("Fail to export, Please try agian" , null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
   );
  }

  exportToCSV():void {
  //   this.csvService.exportSalesToCSV(this.selectedJob.id, Constants.POS_SALES_API_DAILY_SYNC).subscribe(
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
  }

  generateSingleFile():void {
    this.csvService.generateSingleFile(Constants.POS_SALES_SYNC).subscribe(
      res => {
        const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
        const file = new File([blob], "sales" + '.ndf', { type: 'application/vnd.ms.txt' });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      },
      err => {
        console.error(err)
        this.snackBar.open("Fail to export, Please try agian" , null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
   );
  }
}

