import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {

  constructor(    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    ) {}
    
  ngOnInit(): void {
  }

  public confirmMessage:string;

}
