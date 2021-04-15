import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddUserComponent implements OnInit {
  public form: FormGroup;
  submitted = false;
  

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  
  ngOnInit() {
    if(this.data != undefined && this.data["user"] != undefined && this.data["user"] != null){
      this.form = this.formBuilder.group({
        id:[this.data.user.id],
        name: [this.data.user.name, Validators.required],
        username: [this.data.user.username, Validators.required],
        password: [this.data.user.password, Validators.required]
          });
    }else{
    this.form = this.formBuilder.group({
      id:[''],
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', Validators.required]
        });
      }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      id: this.form.controls.id.value,
      name: this.form.controls.name.value,
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    });
  }

}
