import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Company } from 'src/app/models/loyalty/Company';
import { Group } from 'src/app/models/loyalty/Group';

@Component({
  selector: 'app-add-app-user',
  templateUrl: './add-app-user.component.html',
  styleUrls: ['./add-app-user.component.scss']
})
export class AddAppUserComponent implements OnInit {
  public form: FormGroup;

  selectedCompany: Company;
  selectedGroup: Group;

  groups: Group[] = [];

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }
 
  ngOnInit() {
    this.groups = this.data["groups"];

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      group: ['', Validators.required]
    });
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
        email: this.form.controls.email.value,
        group: this.form.controls.group.value
      });
    }
  }

}
