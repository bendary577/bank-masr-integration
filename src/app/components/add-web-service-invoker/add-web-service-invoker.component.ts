import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-web-service-invoker',
  templateUrl: './add-web-service-invoker.component.html',
  styleUrls: ['./add-web-service-invoker.component.scss']
})
export class AddWebServiceInvokerComponent implements OnInit {

  public form: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddWebServiceInvokerComponent>,
    public snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values!" , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      this.dialogRef.close({
        username: this.form.controls.username.value,
        password: this.form.controls.password.value
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

}
