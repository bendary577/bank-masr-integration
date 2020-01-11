import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';

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
  selectedCostCenters = [];

  constructor(private formBuilder: FormBuilder,private spinner: NgxSpinnerService, private invoiceService:InvoiceService,
    private router:Router) { 
  }

  onSaveClick(): void {
    this.router.navigate([Constants.SYNC_JOBS]);
  }

  ngOnInit() {
    this.getCostCenter();
    this.formSupplier = this.formBuilder.group({
      name: ['', Validators.required]
    });
  }

  addRow(row){
    this.selectedCostCenters.push(row)
    console.log(this.selectedCostCenters)
  }

  changeBusinessUnit(row){
    console.log(this.selectedCostCenters)
  }

  getCostCenter() {
    this.spinner.show();
    this.loading = true;
    this.invoiceService.getCostCenter().toPromise().then((res: any) => {
      this.costCenters = res.data;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  onCancelClick(){
    this.router.navigate([Constants.SYNC_JOBS]);
  }

}
