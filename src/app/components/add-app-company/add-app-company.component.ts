import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Company } from 'src/app/models/loyalty/Company';

@Component({
  selector: 'app-add-app-company',
  templateUrl: './add-app-company.component.html',
  styleUrls: ['./add-app-company.component.scss']
})
export class AddAppCompanyComponent implements OnInit {

  public form: FormGroup;
  company: Company = new Company();

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppCompanyComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }

    
  ngOnInit() {
    if (this.data != null && this.data != undefined){
      this.company = this.data["comapny"];

      this.form = this.formBuilder.group({
        name: [this.company.name, Validators.required],
        logoUrl: [this.company.logoUrl],
        description: [this.company.description],
        discountRate: [this.company.discountRate, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        logoUrl: [''],
        description: [''],
        discountRate: ['', Validators.required]
      });
    }
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
        name: this.form.controls.name.value,
        logoUrl: this.form.controls.logoUrl.value,
        description: this.form.controls.description.value,
        discountRate: this.form.controls.discountRate.value
      });
    }
  }
}
