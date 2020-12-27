import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-simphony-location',
  templateUrl: './add-simphony-location.component.html',
  styleUrls: ['./add-simphony-location.component.scss']
})
export class AddSimphonyLocationComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  newAccount:Account;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddSimphonyLocationComponent>,
    public snackBar: MatSnackBar) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      this.dialogRef.close({
        revenueCenterID: this.form.controls.revenueCenterID.value,
        revenueCenterName: this.form.controls.revenueCenterName.value,
        employeeNumber: this.form.controls.employeeNumber.value,
        simphonyServer: this.form.controls.simphonyServer.value
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      revenueCenterID: ['', Validators.required],
      revenueCenterName: ['', Validators.required],
      employeeNumber: ['', Validators.required],
      simphonyServer: ['', Validators.required]
    });
  }
}
