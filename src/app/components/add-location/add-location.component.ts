import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddLocationComponent>) { }

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
        locationName: this.form.controls.locationName.value,
        accountCode: this.form.controls.accountCode.value,
        costCenterReference: this.form.controls.costCenterReference.value
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      locationName: ['', Validators.required],
      accountCode: ['', Validators.required],
      costCenterReference: ['', Validators.required]
    });
  }
}
