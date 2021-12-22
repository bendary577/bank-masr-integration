import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { GeneralSettings } from 'src/app/models/GeneralSettings'
import { RevenueCenter } from 'src/app/models/RevenueCenter'
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service'

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.scss'],
})
export class EditWalletComponent implements OnInit {
  selectAll: boolean = false
  func = 'add'
  inCharge = false
  inDeduct = false
  showVoucher = false
  generalSettings: GeneralSettings
  amount
  form: FormGroup
  voucher

  revenueCenterList = {
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no revenue center.</span>
    </div>
  `,
    },
    selected: [],
    usersCount: 0 as number,
    showLoading: true,
    inputSearch: '' as string,
    revenueCenterData: [],
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    private generalSettingsService: GeneralSettingsService,
    public dialogRef: MatDialogRef<EditWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
    this.func = this.data['function']
    if (this.func == 'add') {
      this.inCharge = true
    } else if (this.func == 'deduct') {
      this.inDeduct = true
    }
    this.getRevenueCenters()
    this.form = this.formBuilder.group({
      amount: ['', [Validators.required, Validators.pattern('[- +()0-9]+')]],
      // revenuecenters: [[]],
    })
  }

  onSelect({ selected }) {
    this.revenueCenterList.selected.splice(
      0,
      this.revenueCenterList.selected.length,
    )
    this.revenueCenterList.selected.push(...selected)
  }

  getRevenueCenters() {
    this.revenueCenterList.showLoading = true;
    this.generalSettingsService
      .getGeneralSettings()
      .then((res: any) => {
        this.generalSettings = res as GeneralSettings
        console.log(res)
        if (this.generalSettings.revenueCenters) {
          this.revenueCenterList.revenueCenterData = this.generalSettings.revenueCenters
          this.revenueCenterList.showLoading = false;
        }
      })
      .catch((err) => {
        let message = ''
        if (err.message) {
          message = err.message
        } else if (err.error) {
          message = err.error
        } else {
          message = 'Failed to fetch locations'
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
        this.revenueCenterList.showLoading = false;
      })
  }
  
  getRandomString(length) {
    var randomChars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    var result = ''
    for (var i = 0; i < length; i++) {
      result += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length),
      )
    }
    return result
  }

  toggleEditable(event, revenue) {
    if (event.target.checked) {
      this.form.controls.revenuecenters.value.push(revenue)
    } else {
      for (let i = 0; i < this.form.controls.revenuecenters.value.length; i++) {
        if (
          this.form.controls.revenuecenters.value[i].revenueCenter ==
          revenue.revenueCenter
        ) {
          this.form.controls.revenuecenters.value.splice(i, 1)
        }
      }
    }
  }

  onCloseClick() {
    this.dialogRef.close()
  }

  onSaveClick(): void {
    console.log(this.revenueCenterList.selected)
    if (
      this.form.invalid ||
      (this.revenueCenterList.selected.length == 0 && !this.inDeduct)
    ) {
      this.snackBar.open('Please fill form values', null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    } else {
      this.dialogRef.close({
        amount: this.form.controls.amount.value,
        revenueCenters: this.revenueCenterList.selected,
      })
    }
  }

  totalSpend(date) {}
}
