import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJob } from 'src/app/models/SyncJob';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { saveAs } from 'file-saver';
import { Constants } from 'src/app/models/constants';
import { CsvService } from 'src/app/services/csv/csv.service';

@Component({
  selector: 'app-approved-invoices-infor',
  templateUrl: './approved-invoices-infor.component.html',
  styleUrls: ['./approved-invoices-infor.component.scss']
})
export class ApprovedInvoicesInforComponent implements OnInit {
  loading = true;
  static getInvoicesLoading = false;
  success = null;
  jobs = [];
  approvedInvoices = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private invoiceService: InvoiceService,
    private syncJobService:SyncJobService, private sidNav: SidenavResponsive, private excelService: ExcelService,
    public dialog: MatDialog, public snackBar: MatSnackBar, private csvService: CsvService) { }

  ngOnInit() {
    this.getSyncJobs("Approved Invoices");
    this.state = localStorage.getItem('getInvoicesLoading');

    if (this.state == "true") {
      ApprovedInvoicesInforComponent.getInvoicesLoading = true;
    }
    else{
      ApprovedInvoicesInforComponent.getInvoicesLoading = false;
    }
  }

  getApprovedInvoicesDB() {
    this.loading = true;
    this.spinner.show();

    this.syncJobService.getSyncJobData("Approved Invoices").toPromise().then((res: any) => {
      this.approvedInvoices = res;

      this.loading = false;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);
      this.loading = false;
      this.spinner.hide();
    });
  }

  get staticgetInvoicesLoading() {
    return ApprovedInvoicesInforComponent.getInvoicesLoading ;
  }

  getApprovedInvoicesSyncJob() {
    localStorage.setItem('getInvoicesLoading', "true");
    ApprovedInvoicesInforComponent.getInvoicesLoading = true
    this.invoiceService.getApprovedInvoices().toPromise().then((res: any) => {
      this.success = res.success;
      console.log(res);

      if (this.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }

      this.getSyncJobs("Approved Invoices");

      localStorage.setItem('getInvoicesLoading', "false");
      ApprovedInvoicesInforComponent.getInvoicesLoading = false;
    }).catch(err => {
      localStorage.setItem('getInvoicesLoading', "false");
      ApprovedInvoicesInforComponent.getInvoicesLoading = false;
      console.log(err);
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
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  getSyncJobs(syncJobTypeName: string) {
    this.loading = true;
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0]
      if (this.jobs.length > 0) {
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);

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
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
      this.loading = false;
    });
  }

  getSyncJobData() {
    this.loading = true;
    this.spinner.show();

    this.syncJobService.getSyncJobDataById(this.selectedJob["id"]).toPromise().then((res: any) => {
      this.approvedInvoices = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);

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
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.spinner.hide();
      this.loading = false;
    });
  }

  exportToXLSX():void {
    this.excelService.exportInvoicesToExcel(this.selectedJob.id).subscribe(
      res => {
        const blob = new Blob([res], { type : 'application/vnd.ms.excel' });
        const file = new File([blob], "ApprovedInvoices" + '.xlsx', { type: 'application/vnd.ms.excel' });
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
    this.csvService.exportSalesToCSV(this.selectedJob.id, Constants.APPROVED_INVOICES_SYNC).subscribe(
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

  generateSingleFile():void {
    this.csvService.generateSingleFile(Constants.APPROVED_INVOICES_SYNC).subscribe(
      res => {
        const blob = new Blob([res.body], { type : 'application/vnd.ms.txt' });
        const file = new File([blob], Constants.APPROVED_INVOICES_SYNC + '.ndf', { type: 'application/vnd.ms.txt' });
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
