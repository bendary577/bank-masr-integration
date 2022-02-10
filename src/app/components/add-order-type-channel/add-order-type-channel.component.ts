import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CostCenter } from 'src/app/models/CostCenter';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { OrderType } from 'src/app/models/OrderType';

@Component({
  selector: 'app-add-order-type-channel',
  templateUrl: './add-order-type-channel.component.html',
  styleUrls: ['./add-order-type-channel.component.scss']
})
export class AddOrderTypeChannelComponent implements OnInit {

  public form: FormGroup;

  orderTypes: OrderType;
  generalSettings: GeneralSettings;

  generalOrderTypes = {name:""} ;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddOrderTypeChannelComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      orderType: this.form.controls.orderType.value,
      channel: this.form.controls.channel.value,
    });
  }

  ngOnInit() {
    this.generalOrderTypes.name = "General";

    this.generalSettings = this.data["generalSettings"];
    if (this.generalSettings.orderTypes){
      this.orderTypes = this.generalSettings.orderTypes;
    }

    this.form = this.formBuilder.group({
      orderType: ['', Validators.required],
      channel: ['', Validators.required],
    });
  }
}