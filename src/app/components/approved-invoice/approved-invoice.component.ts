import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { SyncJob } from 'src/app/models/SyncJob';

@Component({
  selector: 'app-approved-invoice',
  templateUrl: './approved-invoice.component.html',
  styleUrls: ['./approved-invoice.component.scss']
})
export class ApprovedInvoiceComponent implements OnInit {
  loading = true;
  static getInvoicesLoading = false;
  success = null;
  jobs = [];
  approvedInvoices = [];
  selectedJob :SyncJob = null;
  state = "";


  constructor(private spinner: NgxSpinnerService, private invoiceService: InvoiceService,
    private syncJobService:SyncJobService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getSyncJobs("Approved Invoices");
    this.state = localStorage.getItem('getInvoicesLoading');

    if (this.state == "true"){
      ApprovedInvoiceComponent.getInvoicesLoading = true;
    }
    else{
      ApprovedInvoiceComponent.getInvoicesLoading = false;
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
    return ApprovedInvoiceComponent.getInvoicesLoading ;
  }

  getApprovedInvoicesSyncJob() {
    localStorage.setItem('getInvoicesLoading', "true");
    ApprovedInvoiceComponent.getInvoicesLoading = true
    this.invoiceService.getApprovedInvoices().toPromise().then((res: any) => {
      this.success = res.success;
      this.getSyncJobs("Approved Invoices");
  
      this.snackBar.open('Sync Approved Invoices Successfully', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

      localStorage.setItem('getInvoicesLoading', "false");
      ApprovedInvoiceComponent.getInvoicesLoading = false;
    }).catch(err => {
      this.getSyncJobs("Approved Invoices");
      
      localStorage.setItem('getInvoicesLoading', "false");
      ApprovedInvoiceComponent.getInvoicesLoading = false;

      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

    });
  }

  getSyncJobs(syncJobTypeName:String) {
    this.loading = true;
    this.spinner.show();
    this.syncJobService.getSyncJobs(syncJobTypeName).toPromise().then((res: any) => {
      this.jobs = res;
      this.selectedJob = this.jobs[0]
      if (this.jobs.length > 0){
        this.getSyncJobData();
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
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
      this.spinner.hide();
      this.loading = false;
    });
  }

}
