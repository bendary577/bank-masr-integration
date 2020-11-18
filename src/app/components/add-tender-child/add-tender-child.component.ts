import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tender } from 'src/app/models/Tender';

@Component({
  selector: 'app-add-tender-child',
  templateUrl: './add-tender-child.component.html',
  styleUrls: ['./add-tender-child.component.scss']
})
export class AddTenderChildComponent implements OnInit {
  submitted = false;
  tender:Tender;
  public form: FormGroup;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddTenderChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      tender: this.tender 
    });
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required]
    });

    this.tender = this.data["tender"];

    console.log({
      afterTender: this.tender
    })
  }

  addChild(){
    if(!this.tender.children || this.tender.children == undefined){
      this.tender.children = [];
    }
    this.tender.children.push(this.form.controls.name.value);
  }
}
