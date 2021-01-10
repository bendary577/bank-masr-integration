import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { MajorGroup } from 'src/app/models/MajorGroup';

@Component({
  selector: 'app-add-major-group-child',
  templateUrl: './add-major-group-child.component.html',
  styleUrls: ['./add-major-group-child.component.scss']
})
export class AddMajorGroupChildComponent implements OnInit {

  submitted = false;
  majorGroup:MajorGroup;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddMajorGroupChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      majorGroup: this.majorGroup 
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.majorGroup = this.data["majorGroup"];
  }

  addChild(){
    if(!this.majorGroup.children || this.majorGroup.children == undefined){
      this.majorGroup.children = [];
    }
    this.majorGroup.children.push(this.form.controls.name.value);
  }

}
