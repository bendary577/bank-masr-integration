import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { Router } from '@angular/router'
import { Constants } from 'src/app/models/constants'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service'
import { AccountSyncType } from 'src/app/models/AccountSyncType'
import { WastageService } from 'src/app/services/wastage/wastage.service'
import { JournalService } from 'src/app/services/journal/journal.service'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { SidenavResponsive } from '../sidenav/sidenav-responsive'

@Component({
  selector: 'app-wastage-infor-configuration',
  templateUrl: './wastage-infor-configuration.component.html',
  styleUrls: ['./wastage-infor-configuration.component.scss'],
})
export class WastageInforConfigurationComponent implements OnInit {
  userDefinedFlag = false

  syncJobTypeloading = true
  saveLoading = false
  groupLoading = true
  wasteLoading = true
  selectedTender = []
  wasteGroups = []
  overGroups = []

  analysis = []
  selectedWasteGroups = []
  selectedOverGroups = []

  uniqueOverGroupMapping = false

  syncJobType: AccountSyncType
  accountERD
  analysisCodes = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  constructor(
    private spinner: NgxSpinnerService,
    private wasteService: WastageService,
    private journalService: JournalService,
    private syncJobService: SyncJobService,
    private accSyncTypeService: AccSyncTypeService,
    private router: Router,
    public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive,
  ) {}

  ngOnInit() {
    this.getSyncJobType()
    this.accountERD = localStorage.getItem('accountERD')
  }

  getSyncJobType() {
    this.syncJobTypeloading = true
    this.accSyncTypeService
      .getAccSyncJobType(Constants.WASTARGE_SYNC)
      .toPromise()
      .then((res: any) => {
        this.syncJobType = res
        if (this.syncJobType.configuration.timePeriod == 'UserDefined') {
          this.userDefinedFlag = true
        }
        this.analysis = this.syncJobType.configuration['analysis']
        this.overGroups = this.syncJobType.configuration['overGroups']
        this.wasteGroups = this.syncJobType.configuration['wastageConfiguration']['wasteGroups']
        this.uniqueOverGroupMapping = this.syncJobType.configuration['uniqueOverGroupMapping']

        if (this.uniqueOverGroupMapping) {
          this.overGroups = this.syncJobType.configuration['overGroups']
          // this.getOverGroups()
        }

        this.syncJobTypeloading = false
      })
      .catch((err) => {
        console.error(err)
        this.syncJobTypeloading = false
      })
  }

  getOverGroups() {
    this.groupLoading = true
    this.spinner.show()
    this.journalService
      .getOverGroups(Constants.WASTARGE_SYNC)
      .toPromise()
      .then((res: any) => {
        this.overGroups = res.data
        this.groupLoading = false
        this.spinner.hide()
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
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

        this.groupLoading = false
        this.spinner.hide()
      })
  }

  getWasteGroups() {
    this.wasteLoading = true
    this.spinner.show()
    this.wasteService
      .getwasteGroups()
      .toPromise()
      .then((res: any) => {
        if(res.data.length > 0){
          this.wasteGroups = res.data
        }

        if (res.success) {
          this.snackBar.open(res.message, null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
        }else{
          this.snackBar.open(res.message, null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
        }
        this.wasteLoading = false
        this.spinner.hide()
      })
      .catch((err) => {
        console.error(err)
        this.snackBar.open(err.error.message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
        this.wasteLoading = false
        this.spinner.hide()
      })
  }

  onSaveClick(): void {
    this.spinner.show()
    this.saveLoading = true

    // Check if there is overgroup mapping
    this.selectedOverGroups = []
    if (this.overGroups.length != 0) {
      let that = this
      this.overGroups.forEach(function (overGroup) {
        if (overGroup.checked) {
          that.selectedOverGroups.push(overGroup)
        }
      })

      if (this.selectedOverGroups.length != 0) {
        this.syncJobType.configuration['overGroups'] = this.selectedOverGroups
      }
    }
    this.selectedOverGroups = []
    if (this.wasteGroups.length != 0) {
      let that = this
      this.wasteGroups.forEach(function (group) {
        if (group.checked) {
          that.selectedOverGroups.push(group)
        }
      })

      if (this.selectedOverGroups.length != 0) {
        this.syncJobType.configuration['wastageConfiguration'][
          'wasteGroups'
        ] = this.selectedOverGroups
      }
    }

    this.syncJobService
      .updateSyncJobTypeConfig(this.syncJobType)
      .then((result) => {
        this.snackBar.open('Save configuration successfully.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
        this.spinner.hide()
        this.saveLoading = false
        this.router.navigate([Constants.SYNC_JOBS])
      })
      .catch((err) => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
        this.spinner.hide()
        this.saveLoading = false
      })
  }

  onCancelClick() {
    this.router.navigate([Constants.SYNC_JOBS])
  }

  chooseTimePeriod() {
    if (this.syncJobType.configuration.timePeriod == 'UserDefined') {
      this.userDefinedFlag = true
    } else {
      this.userDefinedFlag = false
    }
  }
}
