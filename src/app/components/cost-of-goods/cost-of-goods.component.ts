import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { Constants } from 'src/app/models/constants';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJob } from 'src/app/models/SyncJob';
import { CsvService } from 'src/app/services/csv/csv.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { JournalService } from 'src/app/services/journal/journal.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-cost-of-goods',
  templateUrl: './cost-of-goods.component.html',
  styleUrls: ['./cost-of-goods.component.scss']
})
export class CostOfGoodsComponent implements OnInit {

  loading = true;
  static getJournalsLoding = false;
  success = null;
  jobs = [];
  journals = [];
  selectedJob :SyncJob = null;
  state = "";

  constructor(private spinner: NgxSpinnerService, private sidNav: SidenavResponsive,
    private journalService: JournalService, private syncJobService: SyncJobService,
    private excelService: ExcelService,
    public snackBar: MatSnackBar, private csvService: CsvService) { }

  ngOnInit() {
    this.getSyncJobs(Constants.COST_OF_GOODS_SYNC);
    this.state = localStorage.getItem('getJournalsLoding');

    if (this.state == "true") {
      CostOfGoodsComponent.getJournalsLoding = true;
    }
    else{
      CostOfGoodsComponent.getJournalsLoding = false;
    }
  }

  get staticgetJournalsLoding() {
    return CostOfGoodsComponent.getJournalsLoding ;
  }

  getJournalsJobSyncJob() {
    localStorage.setItem('getJournalsLoding', "true");
    CostOfGoodsComponent.getJournalsLoding = true;

    this.journalService.getJournals().toPromise().then((res: any) => {
      this.getSyncJobs(Constants.COST_OF_GOODS_SYNC);

      localStorage.setItem('getJournalsLoding', "false");
      CostOfGoodsComponent.getJournalsLoding = false;

      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        console.log(res.message)
        this.snackBar.open(res.message.message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      }
    }).catch(err => {
        console.log(err);
        localStorage.setItem('getJournalsLoding', "false");
        CostOfGoodsComponent.getJournalsLoding = false;
        
        let message = "";
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
  
        this.snackBar.open(message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });        
    });

  }

  getJournalsDB() {
    this.loading = true;
    this.syncJobService.getSyncJobData(Constants.COST_OF_GOODS_SYNC).toPromise().then((res: any) => {
      this.journals = res;

      this.loading = false;
    }).catch(err => {
      this.loading = false;
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
      this.journals = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
    });
  }

  exportToXLSX():void {
    this.excelService.exportConsumptionToExcel(this.selectedJob.id).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "Consumption" + '.xlsx', { type: 'application/vnd.ms.excel' });
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
    this.csvService.exportSalesToCSV(this.selectedJob.id, Constants.COST_OF_GOODS_SYNC).subscribe(
      res => {
        const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
        const file = new File([blob], "consumption" + '.ndf', { type: 'application/vnd.ms.txt' });
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

  generateSingleFile():void {
    this.csvService.generateSingleFile(Constants.COST_OF_GOODS_SYNC).subscribe(
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
