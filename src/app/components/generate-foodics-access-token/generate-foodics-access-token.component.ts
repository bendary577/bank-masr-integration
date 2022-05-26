import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-generate-foodics-access-token',
  templateUrl: './generate-foodics-access-token.component.html',
  styleUrls: ['./generate-foodics-access-token.component.scss']
})
export class GenerateFoodicsAccessTokenComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenerateFoodicsAccessTokenComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }


  onOkClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({});
  }


}
