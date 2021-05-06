import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.scss']
})
export class EditWalletComponent implements OnInit {

  fromDate:any;
  toDate:any;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<EditWalletComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
  }

  onSaveClick(){
    this.dialogRef.close();

  }

  onNoClick(){
    this.dialogRef.close();

  }

  totalSpend(date){

  }
}