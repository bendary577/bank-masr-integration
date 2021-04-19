import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.scss']
})
export class AddUserComponent implements OnInit {
  public form: FormGroup;
  submitted = false;
  inUpdate = false;
  

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data, public snackBar: MatSnackBar) { }

  
  ngOnInit() {
    if(this.data != undefined && this.data["user"] != undefined && this.data["user"] != null){
      this.inUpdate = true;
      this.form = this.formBuilder.group({
        id:[this.data.user.id],
        name: [this.data.user.name, [Validators.maxLength, Validators.required, Validators.minLength]],
        username: [this.data.user.username, [Validators.maxLength, Validators.required, Validators.minLength]],
        password: [this.data.user.password, [Validators.required, Validators.minLength]]
          });
    }else{
    this.form = this.formBuilder.group({
      id:[''],
      name: ['', [Validators.maxLength, Validators.required, Validators.minLength]],
      username: ['', [Validators.maxLength, Validators.required, Validators.minLength]],
      password: ['', [Validators.required, Validators.minLength]]
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
      id: this.form.controls.id.value,
      name: this.form.controls.name.value,
      username: this.form.controls.username.value,
      password: this.form.controls.password.value,
    });
  }
  }

}
