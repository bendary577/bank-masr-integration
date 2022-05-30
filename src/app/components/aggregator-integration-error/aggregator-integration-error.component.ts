import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-aggregator-integration-error',
  templateUrl: './aggregator-integration-error.component.html',
  styleUrls: ['./aggregator-integration-error.component.scss']
})
export class AggregatorIntegrationErrorComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<AggregatorIntegrationErrorComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any, private router: Router) { }

  ngOnInit() {
  }


  onOkClick(): void {
    this.dialogRef.close();
  }

  redirectToFoodicsIntegration(): void {
    this.router.navigate(['/main/aggregatorsConfigurations'])
    this.dialogRef.close();
  }


}
