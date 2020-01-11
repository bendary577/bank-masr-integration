import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { InvoiceService } from 'src/app/services/invoice/invoice.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';

@Component({
  selector: 'app-credit-note-configuration',
  templateUrl: './credit-note-configuration.component.html',
  styleUrls: ['./credit-note-configuration.component.scss']
})
export class CreditNoteConfigurationComponent implements OnInit {
  formSupplier: FormGroup;
  submitted = false;
  loading = true;
  costCenters = [];

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
