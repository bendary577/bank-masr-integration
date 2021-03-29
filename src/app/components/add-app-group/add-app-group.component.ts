import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Company } from 'src/app/models/loyalty/Company';
import { Group } from 'src/app/models/loyalty/Group';
import { AddAppCompanyComponent } from '../add-app-company/add-app-company.component';

@Component({
  selector: 'app-add-app-group',
  templateUrl: './add-app-group.component.html',
  styleUrls: ['./add-app-group.component.scss']
})
export class AddAppGroupComponent implements OnInit {
  public form: FormGroup;
  groups: Group[] = [];
  group: Group = new Group();

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppGroupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }
    
  ngOnInit() {
    if (this.data["comapny"] != null && this.data != undefined){
      this.group = this.data["comapny"];
      this.groups = this.data["companies"];

      this.form = this.formBuilder.group({
        name: [this.group.name, Validators.required],
        logoUrl: [this.group.logoUrl],
        description: [this.group.description],
        discountRate: [this.group.discountRate, Validators.required]
      });
    }else{
      console.log(this.data)
      this.groups = this.data["companies"];
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
        logoUrl: [''],
        description: [''],
        company: [''],
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
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      this.dialogRef.close({
        name: this.form.controls.name.value,
        logoUrl: this.form.controls.logoUrl.value,
        description: this.form.controls.description.value,
        discountRate: this.form.controls.discountRate.value,
        company: this.form.controls.company.value
      });
    }
  }
}
