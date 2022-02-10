import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-order-type',
  templateUrl: './add-order-type.component.html',
  styleUrls: ['./add-order-type.component.scss']
})
export class AddOrderTypeComponent implements OnInit {
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddOrderTypeComponent>) { }

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
        checked: this.form.controls.checked.value,
        orderType: this.form.controls.orderType.value,
        account: this.form.controls.account.value,
        discountAccount: this.form.controls.discountAccount.value
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      checked:[true],
      orderType: ['', Validators.required],
      account: ['', Validators.required],
      discountAccount: ['', Validators.required]
    });
  }
}
