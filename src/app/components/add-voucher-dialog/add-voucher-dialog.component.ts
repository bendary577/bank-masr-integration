import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { GeneralSettings } from 'src/app/models/GeneralSettings'
import { AuthService } from 'src/app/services/auth/auth.service'
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { SideNaveComponent } from '../side-nave/side-nave.component'
import * as moment from 'moment';

@Component({
  selector: 'app-add-voucher-dialog',
  templateUrl: './add-voucher-dialog.component.html',
  styleUrls: ['./add-voucher-dialog.component.scss']
})
export class AddVoucherDialogComponent implements OnInit {

  public form: FormGroup
  voucher: any 
  slectedDiscount: number
  discountRates = []
  groupsLoader = true
  inUpdate = false

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private loyaltyService: LoyaltyService,
    public dialogRef: MatDialogRef<AddVoucherDialogComponent>,
    private generalSettingsService: GeneralSettingsService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data,
    private sidNav: SideNaveComponent,
  ) {}

  ngOnInit() {
    this.getGeneralSettings()

    if (this.data['voucher'] != null && this.data != undefined) {
      this.voucher = this.data['voucher'];
      this.inUpdate = true;

      this.form = this.formBuilder.group({
        id: this.voucher.id,
        name: [this.voucher.name, [Validators.maxLength, Validators.required]],
        startDate: [moment(this.voucher.startDate ).format('YYYY-MM-DDT00:00'), [Validators.required]],
        endDate: [moment(this.voucher.endDate ).format('YYYY-MM-DDT00:00'), [Validators.required]],
        redeemQuota: [this.voucher.redeemQuota, [Validators.maxLength, Validators.required, Validators.pattern("^[0-9]*$")]],
        simphonyDiscountId: [this.voucher.simphonyDiscount.discountId, [Validators.required]],
      })
    } else {
      this.form = this.formBuilder.group({
        id: 0,
        name: ['', [Validators.maxLength, Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
        redeemQuota: ['', [Validators.maxLength, Validators.required, Validators.pattern("^[0-9]*$")]],
        simphonyDiscountId: ['', [Validators.required]],
      })
    }
  }

  getGeneralSettings() {
    this.generalSettingsService
      .getGeneralSettings()
      .then((res) => {
        this.authService.generalSettings = res as GeneralSettings
        this.discountRates = this.authService.generalSettings.discountRates
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
      })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSaveClick(): void {
    if ( this.form.invalid) {
      this.snackBar.open('Please fill form values', null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    } else {
        this.dialogRef.close({
          id: this.form.controls.id.value,
          name: this.form.controls.name.value,
          startDate: this.form.controls.startDate.value,
          endDate: this.form.controls.endDate.value,
          simphonyDiscountId: this.form.controls.simphonyDiscountId.value,
          redeemQuota: this.form.controls.redeemQuota.value,
        })
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  hasFeature(reference) {
    var isFeature =  this.sidNav.hasFeature(reference)
    return isFeature;
  }

}
