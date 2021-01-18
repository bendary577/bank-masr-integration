import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { CostCenter } from 'src/app/models/CostCenter';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { RevenueCenter } from 'src/app/models/RevenueCenter';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';

@Component({
  selector: 'app-add-tender',
  templateUrl: './add-tender.component.html',
  styleUrls: ['./add-tender.component.scss']
})
export class AddTenderComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  newAccount:Account;
  locations: CostCenter[] = [];
  revenueCenters: string[] = [];
  generalSettings: GeneralSettings;

  generalCostCenter: CostCenter = new CostCenter();
  generalRevenueCenter: RevenueCenter = new RevenueCenter();

  constructor(public snackBar: MatSnackBar,
    private formBuilder: FormBuilder, public dialogRef: MatDialogRef<AddTenderComponent>,
    private generalSettingsService: GeneralSettingsService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      location: this.form.controls.location.value,
      revenueCenter: this.form.controls.revenueCenter.value,

      name: this.form.controls.name.value,
      account: this.form.controls.account.value,
      communicationTender: this.form.controls.communicationTender.value,
      communicationAccount: this.form.controls.communicationAccount.value,
      communicationRate: this.form.controls.communicationRate.value,
      analysisCodeT5: this.form.controls.analysisCodeT5.value
    });
  }

  ngOnInit() {
    this.generalCostCenter.locationName = "General";
    this.generalRevenueCenter.revenueCenter = "General";

    this.getGeneralSettings();

    this.form = this.formBuilder.group({
      location: ['', Validators.required],
      revenueCenter: ['', Validators.required],


      name: ['', Validators.required],
      account: ['', Validators.required],
      communicationTender: [''],
      communicationAccount: [''],
      communicationRate: [0],
      analysisCodeT5: [''],
    });
  }

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res) => {

      this.generalSettings = res as GeneralSettings;
      if (this.generalSettings.locations){
        this.locations = this.generalSettings.locations;
      }
      if (this.generalSettings.revenueCenters){
        this.revenueCenters = this.generalSettings.revenueCenters;
      }
    }).catch(err => {
      this.snackBar.open("Failed to get locations" , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

}
