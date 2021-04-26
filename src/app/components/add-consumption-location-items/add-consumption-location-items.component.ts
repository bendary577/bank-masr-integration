import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConsumptionLocation } from 'src/app/models/ConsumptionLocation';
import { ItemGroup } from 'src/app/models/ItemGroup';

@Component({
  selector: 'app-add-consumption-location-items',
  templateUrl: './add-consumption-location-items.component.html',
  styleUrls: ['./add-consumption-location-items.component.scss']
})
export class AddConsumptionLocationItemsComponent implements OnInit {
  public form: FormGroup;
  newItemGroup: ItemGroup = new ItemGroup();
  location: ConsumptionLocation = new ConsumptionLocation();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddConsumptionLocationItemsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      location: this.location 
    });
  }

  ngOnInit() {
    this.location = this.data["counsumptionLocation"];

    this.form = this.formBuilder.group({
      itemGroup: ['', Validators.required],
      accountCode: ['', Validators.required]
    });
  }


  addItemGroup(){
    if(!this.location.itemGroups || this.location.itemGroups == undefined){
      this.location.itemGroups = [];
    }

    this.newItemGroup = new ItemGroup();
    this.newItemGroup.itemGroup = this.form.controls.itemGroup.value;
    this.newItemGroup.expensesAccount = this.form.controls.accountCode.value;

    this.location.itemGroups.push(this.newItemGroup);
  }

}
