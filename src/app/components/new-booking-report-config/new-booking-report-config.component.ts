import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { Router } from '@angular/router'
import { NgxSpinnerService } from 'ngx-spinner'
import { AccountSyncType } from 'src/app/models/AccountSyncType'
import { Constants } from 'src/app/models/constants'
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'

@Component({
  selector: 'app-new-booking-report-config',
  templateUrl: './new-booking-report-config.component.html',
  styleUrls: ['./new-booking-report-config.component.scss'],
})
export class NewBookingReportConfigComponent implements OnInit {
  loading = true
  syncJobType: AccountSyncType
  neglectedRoomTypes = []
  newRoomType: string = ''

  constructor(
    private spinner: NgxSpinnerService,
    private router: Router,
    public snackBar: MatSnackBar,
    private syncJobService: SyncJobService,
    private accSyncTypeService: AccSyncTypeService,
  ) {}

  ngOnInit() {
    this.getSyncJobType()
  }

  getSyncJobType() {
    this.loading = true
    this.accSyncTypeService
      .getAccSyncJobType(Constants.NEW_BOOKING_REPORT_SYNC)
      .toPromise()
      .then((res: any) => {
        this.syncJobType = res
        this.neglectedRoomTypes = this.syncJobType['configuration'][
          'bookingConfiguration'
        ]['neglectedRoomTypes']

        this.loading = false
      })
      .catch((err) => {
        console.error(err)
        this.loading = false
      })
  }

  addRoomType() {
    if (this.newRoomType != '') {
      this.neglectedRoomTypes.push(this.newRoomType)
      this.newRoomType = ''

      this.neglectedRoomTypes = [...this.neglectedRoomTypes]
    } else {
      this.snackBar.open('Please enter room type.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    }
  }

  onSaveClick(): void {
    this.spinner.show()
    this.syncJobType['configuration']['bookingConfiguration'][
      'neglectedRoomTypes'
    ] = this.neglectedRoomTypes
    this.syncJobService
      .updateSyncJobTypeConfig(this.syncJobType)
      .then((result) => {
        this.snackBar.open('Save configuration successfully.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
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

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS])
  }
}
