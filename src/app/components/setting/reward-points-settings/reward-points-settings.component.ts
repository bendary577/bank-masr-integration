import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { GeneralSettings } from 'src/app/models/GeneralSettings'
import { Response } from 'src/app/models/Response'
import { AuthService } from 'src/app/services/auth/auth.service'
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service'

@Component({
  selector: 'app-reward-points-settings',
  templateUrl: './reward-points-settings.component.html',
  styleUrls: ['./reward-points-settings.component.scss'],
})
export class RewardPointsSettingsComponent implements OnInit {
  generalSettings: GeneralSettings = new GeneralSettings()

  constructor(
    public snackBar: MatSnackBar,
    private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.getGeneralSettings()
  }

  getGeneralSettings() {
    this.spinner.show()
    this.generalSettingsService
      .getGeneralSettings()
      .then((res) => {
        this.generalSettings = res as GeneralSettings

        this.spinner.hide()
      })
      .catch((err) => {
        let message = ''
        if (err.error) {
          message = err.error
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_GET_CONFIG
        }

        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
        this.spinner.hide()
      })
  }

  onSaveClick() {
    try {
      this.spinner.show()

      this.generalSettingsService
        .updateGeneralSettings(this.generalSettings)
        .then((result) => {
          const response = result as Response
          this.authService.generalSettings = this.generalSettings
          if (response.success) {
            this.snackBar.open(
              'Save reward points settings successfully.',
              null,
              {
                duration: 2000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-success',
              },
            )
          } else {
            this.snackBar.open('An error has occurred.', null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-fail',
            })
          }
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
    } catch (e) {
      this.snackBar.open(
        'Failed to save reward points settings, Please try again.',
        null,
        {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        },
      )

      this.spinner.hide()
    }
  }
}
