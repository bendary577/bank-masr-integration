import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CostCenter } from 'src/app/models/CostCenter';
import { FamilyGroup } from 'src/app/models/FamilyGroup';
import { MajorGroup } from 'src/app/models/MajorGroup';
import { OrderType } from 'src/app/models/OrderType';
import { RevenueCenter } from 'src/app/models/RevenueCenter';
@Component({
  selector: 'app-consumption-order-type',
  templateUrl: './consumption-order-type.component.html',
  styleUrls: ['./consumption-order-type.component.scss']
})
export class ConsumptionOrderTypeComponent implements OnInit {

  public form: FormGroup;
  majorGrou: MajorGroup;
  revenueCenter: RevenueCenter;

  orderType : OrderType = new OrderType();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ConsumptionOrderTypeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      order: this.orderType 
    });
  }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      accountCode: ['', Validators.required],
    });

    this.revenueCenter = this.data["revenuCenter"];

  }

  addOrderType(){
    if(!this.orderType.orderType || this.orderType.orderType == undefined){
      this.revenueCenter.orderTypes = [];
    }
    this.orderType = new OrderType();
    this.orderType.orderType = this.form.controls.name.value;
    this.orderType.account = this.form.controls.name.value;
    this.revenueCenter.orderTypes.push(this.orderType);
    this.majorGrou.revenueCenters.push(this.revenueCenter)
  }

}
