import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from 'src/app/models/loyalty/Group';

@Component({
  selector: 'app-add-app-group',
  templateUrl: './add-app-group.component.html',
  styleUrls: ['./add-app-group.component.scss']
})
export class AddAppGroupComponent implements OnInit {
  public form: FormGroup;
  group: Group = new Group();

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, 
    public dialogRef: MatDialogRef<AddAppGroupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }

    
  ngOnInit() {
    if (this.data != null && this.data != undefined){
      this.group = this.data["group"];

      this.form = this.formBuilder.group({
        name: [this.group.name, Validators.required],
        description: [this.group.description],
        discountRate: [this.group.discountRate, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
        name: ['', Validators.required],
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
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      this.dialogRef.close({
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        discountRate: this.form.controls.discountRate.value
      });
    }
  }

}
