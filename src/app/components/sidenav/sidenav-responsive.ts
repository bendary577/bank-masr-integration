import { MediaMatcher } from '@angular/cdk/layout'
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'
import { SyncJobType } from 'src/app/models/SyncJobType'
import { Application } from 'src/app/models/Application'
import { Constants } from 'src/app/models/constants'
import { NavigationEnd, Router } from '@angular/router'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { MatSnackBar } from '@angular/material'
import { OperationTypesService } from 'src/app/services/OperationTypes/operation-types.service'
import { GeneralSettings } from 'src/app/models/GeneralSettings'
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service'
import { AuthService } from 'src/app/services/auth/auth.service'
import { AccountService } from 'src/app/services/account/account.service'
import { Account } from 'src/app/models/Account'

/** @title Responsive sidenav */
@Component({
  selector: 'sidenav-responsive-example',
  templateUrl: 'sidenav-responsive.html',
  styleUrls: ['sidenav-responsive.css'],
})
export class SidenavResponsive implements OnDestroy, OnInit {
  shouldRun: boolean = false
  selectedTab = Constants.CURRENT_TAB
  mobileQuery: MediaQueryList
  syncJobTypes: SyncJobType[] = []
  operationTypes: SyncJobType[] = []
  applications: Application[] = []
  generalSettings: GeneralSettings
  account: Account
  accountCredentials: [] = []
  simphonyLocations: []
  costCenterAccountMapping: []
  suppliers: []
  overGroups: []
  discountRates: []

  private _mobileQueryListener: () => void

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    private router: Router,
    media: MediaMatcher,
    location: Location,
    private _location: Location,
    public snackBar: MatSnackBar,
    public accountService: AccountService,
    private syncJobService: SyncJobService,
    public operationTypeService: OperationTypesService,
    private generalSettingsService: GeneralSettingsService,
    private authService: AuthService,
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)')
    this._mobileQueryListener = () => changeDetectorRef.detectChanges()
    this.mobileQuery.addListener(this._mobileQueryListener)
    this.shouldRun = location.path() !== '/login' && location.path() !== '/'
    router.events.subscribe((val) => {
      // see also
      if (val instanceof NavigationEnd) {
        if (val.url == '/' || val.url == '/login') this.shouldRun = false
        else this.shouldRun = true
      }
    })
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener)
  }

  backClicked() {
    this._location.back()
  }

  ngOnInit(): void {
    if (this.shouldRun == true) {
      this.getGeneralSettings()
      this.getApplication()
      this.getSyncJobTypes()
      this.getOperationTypes()
      this.getAccount()
    }
  }

  changeCurrentTab(cuurentTab) {
    Constants.CURRENT_TAB = cuurentTab
    this.selectedTab = cuurentTab
  }

  Logout() {
    localStorage.removeItem('auth-token')
    localStorage.removeItem('user')
    localStorage.clear()
    this.router.navigate(['/'])
  }

  getSyncJobTypes() {
    this.syncJobService
      .getSyncJobTypesDB()
      .toPromise()
      .then((res: any) => {
        this.syncJobTypes = res
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.Logout()
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

  getAccount() {
    this.accountService
      .getAccount()
      .toPromise()
      .then((res: any) => {
        this.account = res
        this.accountCredentials = this.account['accountCredentials']
      })
      .catch((err) => {
        ''
        console.error(err)
      })
  }

  getGeneralSettings() {
    this.generalSettingsService
      .getGeneralSettings()
      .then((res) => {
        this.authService.generalSettings = res as GeneralSettings
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.Logout()
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

  getApplication() {
    this.syncJobService
      .getApplications()
      .toPromise()
      .then((res: any) => {
        this.applications = res
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.Logout()
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

  getOperationTypes(): SyncJobType[] {
    this.operationTypeService
      .getOperationTypes()
      .toPromise()
      .then((res: any) => {
        this.operationTypes = res
        return this.operationTypeService
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.Logout()
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
        return this.operationTypes
      })
    return this.operationTypes
  }

  /*  public set setshouldRun(shouldRun:boolean) {
    this.shouldRun=shouldRun;
  }*/
  public get getshouldRun() {
    return this.shouldRun
  }

  setshouldRun(shouldRun: boolean) {
    this.shouldRun = shouldRun
  }

  hasRole(reference: string): Boolean {
    if (this.account == null || this.account == undefined) {
      return false
    }

    if (this.account != null && this.account != undefined && localStorage.getItem('accountId') == '6059caf66973e968e46b29c4') {
      return false
    } else {
      return true
    }
  }
}
