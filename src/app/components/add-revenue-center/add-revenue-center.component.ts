import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-revenue-center',
  templateUrl: './add-revenue-center.component.html',
  styleUrls: ['./add-revenue-center.component.scss']
})
export class AddRevenueCenterComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, public dialogRef: MatDialogRef<AddRevenueCenterComponent>) { }

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
        name: this.form.controls.name.value,
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

}
