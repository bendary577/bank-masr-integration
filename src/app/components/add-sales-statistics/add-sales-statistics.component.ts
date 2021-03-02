import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CostCenter } from 'src/app/models/CostCenter';
import { GeneralSettings } from 'src/app/models/GeneralSettings';

@Component({
  selector: 'app-add-sales-statistics',
  templateUrl: './add-sales-statistics.component.html',
  styleUrls: ['./add-sales-statistics.component.scss']
})
export class AddSalesStatisticsComponent implements OnInit {
  public form: FormGroup;

  locations: CostCenter[] = [];
  generalSettings: GeneralSettings;

  generalCostCenter: CostCenter = new CostCenter();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddSalesStatisticsComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      location: this.form.controls.location.value,
      NoGuestAccount: this.form.controls.NoGuestAccount.value,
      NoTablesAccount: this.form.controls.NoTablesAccount.value,
      NoChecksAccount: this.form.controls.NoChecksAccount.value
    });
  }

  ngOnInit() {
    this.generalCostCenter.locationName = "General";

    this.generalSettings = this.data["generalSettings"];
    if (this.generalSettings.locations){
      this.locations = this.generalSettings.locations;
    }

    this.form = this.formBuilder.group({
      location: ['', Validators.required],
      NoGuestAccount: ['', Validators.required],
      NoTablesAccount: ['', Validators.required],
      NoChecksAccount: ['', Validators.required]
    });
  }
}