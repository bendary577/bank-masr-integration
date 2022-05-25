import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { ErrorMessages } from 'src/app/models/ErrorMessages';

@Component({
  selector: 'app-generate-foodics-access-token',
  templateUrl: './generate-foodics-access-token.component.html',
  styleUrls: ['./generate-foodics-access-token.component.scss']
})
export class GenerateFoodicsAccessTokenComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  loading = false;
  generalSettings: GeneralSettings = new GeneralSettings();

  constructor(
    public snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<GenerateFoodicsAccessTokenComponent>,
    private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.spinner.show();
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      this.spinner.hide();
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_GET_CONFIG;
      }
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.spinner.hide();
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.updateGeneralSettings()
    this.dialogRef.close({});
  }

  updateGeneralSettings() {
      this.generalSettings.aggregatorConfiguration.foodicsAccountData.token = this.data.token;
      this.spinner.show()
      this.generalSettingsService
        .updateGeneralSettings(this.generalSettings)
        .then((result) => {
          this.snackBar.open(
            'general settings was updated successfully.',
            null,
            {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            },
          )
          this.spinner.hide()
        })
        .catch((err) => {
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
          this.spinner.hide()
        })
    }


}
