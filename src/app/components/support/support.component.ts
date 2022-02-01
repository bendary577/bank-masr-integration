import { Component, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialog } from '@angular/material'
import { MatSnackBar } from '@angular/material/snack-bar'
import {
  DaterangepickerDirective,
} from 'ngx-daterangepicker-material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { ExportRequest } from 'src/app/models/ExportRequest'
import { GeneralSettings } from 'src/app/models/GeneralSettings'
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'
import { MatOption, MatSelect } from '@angular/material'

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss'],
})
export class SupportComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: false })
  pickerDirective: DaterangepickerDirective
  public form: FormGroup
  generalSettings

  // selectedRange
  exportRequest = new ExportRequest()
  user

  locationData: []
  syncJobsTypesData: []

  dialogRef: any
  exportFlag = false

  allSelected = false
  @ViewChild('myModule') moduleSel: MatSelect

  allStoresSelected = false
  @ViewChild('myStores') storesSel: MatSelect

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public dateRangeDialog: MatDialog,
    private syncJobSerivce: SyncJobService,
    private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService,
  ) {
  }

  ngOnInit() {
    if (
      localStorage.getItem('user') != undefined ||
      localStorage.getItem('user') != null
    ) {
      this.user = JSON.parse(localStorage.getItem('user'))
    }
    this.getGeneralSetting()
    this.getSyncJobTypes()
    this.form = this.formBuilder.group({
      store: [[], Validators.required],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'),
        ],
      ],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      module: [[], [Validators.required]],
    })
  }

  getGeneralSetting() {
    this.generalSettingsService
      .getGeneralSettings()
      .then((res: any) => {
        this.generalSettings = res as GeneralSettings
        if (this.generalSettings.locations) {
          this.locationData = this.generalSettings.locations
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
      })
  }

  getSyncJobTypes() {
    this.syncJobSerivce
      .getSyncJobTypesDB()
      .toPromise()
      .then((res: any) => {
        this.syncJobsTypesData = res
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  onExportClick(): void {
    if (this.form.invalid) {
      this.snackBar.open('Please fill form values', null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    } else {
      if (this.form.controls.module.value[0] == 0) {
        this.form.controls.module.value.splice(0, 1)
      }

      if (this.form.controls.store.value[0] == 0) {
        this.form.controls.store.value.splice(0, 1)
      }
      this.exportRequest.costCenters = this.form.controls.store.value
      this.exportRequest.syncJobTypes = this.form.controls.module.value
      this.exportRequest.email = this.form.controls.email.value
      // this.exportRequest.dateRange = this.form.controls.dateRange.value
      this.exportRequest.startDate = this.form.controls.startDate.value
      this.exportRequest.endDate = this.form.controls.endDate.value
      console.log(this.exportRequest)
      this.spinner.show()
      this.syncJobSerivce
        .getExportedfiles(this.exportRequest)
        .toPromise()
        .then((res: any) => {
          this.spinner.hide()
          this.exportFlag = true
          this.snackBar.open(res['message'], null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          })
        })
        .catch((err) => {
          this.spinner.hide()
          let message = 'Error happend, Please try again.'
          if (err.status === 401) {
            message = ErrorMessages.SESSION_EXPIRED
          } else if (err.error.message) {
            message = err.error.message
          } else if (err.message) {
            message = err.message
          }
          this.exportFlag = true
          this.snackBar.open(message, null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
        })
    }
  }

  openDatepicker() {
    this.pickerDirective.open()
  }

  toggleAllSelection() {
    this.allSelected = !this.allSelected // to control select-unselect

    if (this.allSelected) {
      this.moduleSel.options.forEach((item: MatOption) => item.select())
    } else {
      this.moduleSel.options.forEach((item: MatOption) => {
        item.deselect()
      })
    }
    this.moduleSel.close()
  }

  toggleAllStoresSelection() {
    this.allStoresSelected = !this.allStoresSelected // to control select-unselect

    if (this.allStoresSelected) {
      this.storesSel.options.forEach((item: MatOption) => item.select())
    } else {
      this.storesSel.options.forEach((item: MatOption) => {
        item.deselect()
      })
    }
    this.storesSel.close()
  }
}
