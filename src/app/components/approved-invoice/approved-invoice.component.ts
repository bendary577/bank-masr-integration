import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';

@Component({
  selector: 'app-approved-invoice',
  templateUrl: './approved-invoice.component.html',
  styleUrls: ['./approved-invoice.component.scss']
})
export class ApprovedInvoiceComponent implements OnInit {
  loading = true;
  success = null;
  approvedInvoices = [];

  constructor(private spinner: NgxSpinnerService, private invoiceService: InvoiceService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getApprovedInvoices()
  }

  getApprovedInvoices() {
    this.spinner.show();
    this.invoiceService.getApprovedInvoicesDB().toPromise().then((res: any) => {
      console.log(res.items);
      this.approvedInvoices = res.items;
     
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getApprovedInvoicesSyncJob() {
    this.spinner.show();
    this.invoiceService.getApprovedInvoices().toPromise().then((res: any) => {
      this.success = res.success;
      console.log(res.message)
      this.getApprovedInvoices();
      if (this.success){
        this.snackBar.open('Sync Approved Invoices Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
        });
      }
      else{
        this.snackBar.open('Sync Approved Invoices Failed' + res.message , null, {
          duration: 2000,
          horizontalPosition: 'center',
        });
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }


}
