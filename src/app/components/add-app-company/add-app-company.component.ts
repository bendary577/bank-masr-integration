import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-add-app-company',
  templateUrl: './add-app-company.component.html',
  styleUrls: ['./add-app-company.component.scss']
})
export class AddAppCompanyComponent implements OnInit {

  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppCompanyComponent>) { }

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
        name: this.form.controls.name.value,
        logoUrl: this.form.controls.logoUrl.value,
        description: this.form.controls.description.value,
        discountRate: this.form.controls.discountRate.value
      });
    }
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      logoUrl: [''],
      description: [''],
      discountRate: ['', Validators.required]
    });
  }
}
