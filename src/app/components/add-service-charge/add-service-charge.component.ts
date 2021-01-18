import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CostCenter } from 'src/app/models/CostCenter';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { RevenueCenter } from 'src/app/models/RevenueCenter';

@Component({
  selector: 'app-add-service-charge',
  templateUrl: './add-service-charge.component.html',
  styleUrls: ['./add-service-charge.component.scss']
})
export class AddServiceChargeComponent implements OnInit {
  public form: FormGroup;

  locations: CostCenter[] = [];
  revenueCenters: string[] = [];
  generalSettings: GeneralSettings;

  generalCostCenter: CostCenter = new CostCenter();
  generalRevenueCenter: RevenueCenter = new RevenueCenter();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddServiceChargeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      location: this.form.controls.location.value,
      revenueCenter: this.form.controls.revenueCenter.value,
      name: this.form.controls.name.value,
      account: this.form.controls.account.value
    });
  }

  ngOnInit() {
    this.generalCostCenter.locationName = "General";
    this.generalRevenueCenter.revenueCenter = "General";

    this.generalSettings = this.data["generalSettings"];
    if (this.generalSettings.locations){
      this.locations = this.generalSettings.locations;
    }
    if (this.generalSettings.revenueCenters){
      this.revenueCenters = this.generalSettings.revenueCenters;
    }

    this.form = this.formBuilder.group({
      location: ['', Validators.required],
      revenueCenter: ['', Validators.required],
      name: ['', Validators.required],
      account: ['', Validators.required]
    });
  }

}
