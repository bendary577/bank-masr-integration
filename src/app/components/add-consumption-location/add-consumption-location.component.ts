import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CostCenter } from 'src/app/models/CostCenter';
import { GeneralSettings } from 'src/app/models/GeneralSettings';

@Component({
  selector: 'app-add-consumption-location',
  templateUrl: './add-consumption-location.component.html',
  styleUrls: ['./add-consumption-location.component.scss']
})
export class AddConsumptionLocationComponent implements OnInit {
  public form: FormGroup;
  submitted = false;
  newAccount:Account;

  locations: CostCenter[] = [];
  generalSettings: GeneralSettings;

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddConsumptionLocationComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      account: this.form.controls.account.value,
      costCenter: this.form.controls.location.value
    });
  }

  ngOnInit() {
    this.generalSettings = this.data["generalSettings"];
    if (this.generalSettings.locations){
      this.locations = this.generalSettings.locations;
    }

    this.form = this.formBuilder.group({
      account: ['', Validators.required],
      location: ['', Validators.required]
    });
  }
}
