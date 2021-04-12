import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { Company } from 'src/app/models/loyalty/Company';
import { Group } from 'src/app/models/loyalty/Group';

@Component({
  selector: 'app-add-app-user',
  templateUrl: './add-app-user.component.html',
  styleUrls: ['./add-app-user.component.scss']
})
export class AddAppUserComponent implements OnInit {
  public form: FormGroup;
  newUser = new ApplicationUser();
  selectedCompany: Company;
  selectedGroup: Group;
  srcResult: any;
  imageUploded: boolean = false;

  groups: Group[] = [];

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppUserComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }
 
  ngOnInit() {
    if (this.data["user"] != null && this.data != undefined){
      this.newUser = this.data["user"];
      this.groups = this.data["groups"];

      this.form = this.formBuilder.group({
        name: [this.newUser.name, Validators.required],        
        email: [this.newUser.email],
        group: [this.newUser.group, Validators.required]
      });
    }else{
      this.groups = this.data["groups"];

      this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
      group: ['', Validators.required]
      });
    }
  }

  csvInputChange(fileInputEvent: any) {
    this.srcResult = fileInputEvent.target.files[0];
    if(this.srcResult){
      this.imageUploded = true;
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
        email: this.form.controls.email.value,
        group: this.form.controls.group.value,
        image: this.srcResult,
      });
    }
  }

}
