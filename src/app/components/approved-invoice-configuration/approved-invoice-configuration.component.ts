import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-approved-invoice-configuration',
  templateUrl: './approved-invoice-configuration.component.html',
  styleUrls: ['./approved-invoice-configuration.component.scss']
})
export class ApprovedInvoiceConfigurationComponent implements OnInit {

  formSupplier: FormGroup;
  submitted = false;
  loading = true;
  costCenters = [];

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ApprovedInvoiceConfigurationComponent>,
    private spinner: NgxSpinnerService, private invoiceService:InvoiceService) { 
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      name: this.formSupplier.controls.name.value,
    });
  }

  ngOnInit() {
    this.getCostCenter();
    this.formSupplier = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  getCostCenter() {
    this.spinner.show();
    this.loading = true;
    this.invoiceService.getCostCenter().toPromise().then((res: any) => {
      // console.log(res);
      this.costCenters = res.data;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

}
