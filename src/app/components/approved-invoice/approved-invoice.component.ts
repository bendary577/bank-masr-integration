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
  approvedInvoices = [];

  constructor(private spinner: NgxSpinnerService, private invoiceService: InvoiceService,
    public dialog: MatDialog, public snackBar: MatSnackBar) { }

  ngOnInit() {
    console.log("invoices")
    this.getApprovedInvoices()
  }

  getApprovedInvoices() {
    this.spinner.show();
    this.invoiceService.getApprovedInvoices().toPromise().then((res: any) => {
      console.log(res.data);
      this.approvedInvoices = res.data;
     
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }


}
