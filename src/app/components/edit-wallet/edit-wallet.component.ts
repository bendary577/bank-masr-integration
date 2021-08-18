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
  inCharge = false;
  inDeduct = false;
  generateVoucher = false;
  amount = 0;
  voucher='';
  showVoucher = false;
  form: FormGroup;
  revenuCenters = ["Restaurant 1" , "Restaurant 2" , "Restaurant 3" , "Restaurant 4"]

  private _fromDate: any;

  public get fromDate(): any {
    return this._fromDate;
  }

  public set fromDate(value: any) {
    this._fromDate = value;
  }
  toDate:any;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<EditWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {

    this.func = this.data["function"];

    if(this.func == 'add' ){
      this.inCharge = true;
    }else if(this.func == 'deduct'){
      this.inDeduct = true;
    }else if(this.func == 'showVoucher'){
      this.showVoucher = true;
      this.amount = this.data["amount"];
      this.voucher = this.getRandomString(10);
    }else{
      this.showVoucher = true;
    }

      this.form = this.formBuilder.group({
      amount: ['', Validators.required],
      revenuecenters: [''],
     });
  }
  
   getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  totalSpend(date){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseClick(){
    this.dialogRef.close({
      amount: this.amount,
      voucher : this.voucher
    });
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
        amount: this.form.controls.amount.value,
        revenuecenters: this.form.controls.revenuecenters.value
      });
    }
  }

}