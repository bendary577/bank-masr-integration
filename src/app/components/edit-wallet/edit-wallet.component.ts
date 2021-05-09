import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.scss']
})
export class EditWalletComponent implements OnInit {

  func = 'add';
  form: FormGroup;
  private _fromDate: any;
  public get fromDate(): any {
    return this._fromDate;
  }

  public set fromDate(value: any) {
    this._fromDate = value;
  }
  toDate:any;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<EditWalletComponent>,@Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    this.func = this.data["func"];

      this.form = this.formBuilder.group({
      amount: ['', Validators.required],
     });
  }
  
  totalSpend(date){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      this.dialogRef.close({
        amount: this.form.controls.name.value,
      });
    }
  }

}