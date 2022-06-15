import { MediaMatcher } from '@angular/cdk/layout'
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core'
import { Location } from '@angular/common'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'
import { SyncJobType } from 'src/app/models/SyncJobType'
import { Application } from 'src/app/models/Application'
import { Constants } from 'src/app/models/constants'
import { User } from '../../models/user'
import { NavigationEnd, Router } from '@angular/router'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { MatSnackBar } from '@angular/material'
import { OperationTypesService } from 'src/app/services/OperationTypes/operation-types.service'
import { GeneralSettings } from 'src/app/models/GeneralSettings'
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service'
import { AuthService } from 'src/app/services/auth/auth.service'
import { AccountService } from 'src/app/services/account/account.service'
import { Account } from 'src/app/models/Account'

@Component({
  selector: 'app-side-nave',
  templateUrl: './side-nave.component.html',
  styleUrls: ['./side-nave.component.scss'],
})
export class SideNaveComponent implements OnDestroy, OnInit {
  public user: User
  shouldRun: boolean = false
  selectedTab = Constants.CURRENT_TAB
  mobileQuery: MediaQueryList
  syncJobTypes: SyncJobType[] = []
  operationTypes: SyncJobType[] = []
  applications: Application[] = []
  reports = []
  generalSettings: GeneralSettings
  public account: Account
  public accountFeatures: []
  public static userRoles = []
  public static userFeature = []
  simphonyLocations: []
  costCenterAccountMapping: []
  suppliers: []
  overGroups: []
  discountRates: []
  admin = false

  public uiBasicCollapsed = true
  public repBasicCollapsed = false
  public appBasicCollapsed = false
  public aggregatorCollapsed = false
  public opeBasicCollapsed = false
  public tipPagesCollapsed = true
  public setBasicCollapsed = false
  public uiAdvancedCollapsed = false
  public formsCollapsed = false
  public editorsCollapsed = false
  public chartsCollapsed = false
  public tablesCollapsed = false
  public iconsCollapsed = false
  public mapsCollapsed = false
  public userPagesCollapsed = false
  public errorCollapsed = false
  public generalPagesCollapsed = false
  public eCommerceCollapsed = false

  showSidebar: boolean = true
  showNavbar: boolean = true
  showFooter: boolean = true
  showSettings: boolean = true
  isLoading: boolean

  public tipOpend = false
  public tripDownOpend = false
  public tripDowncolspand = false
  public props = { height: 'auto' }

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

  goPayment(){
    this.router.navigate(['main/Payments']); 
  }

  ngOnInit() {
    if (
      localStorage.getItem('user') != undefined ||
      localStorage.getItem('user') != null
    ) {
      this.account = JSON.parse(localStorage.getItem('account'))
      SideNaveComponent.userFeature = JSON.parse(
        localStorage.getItem('features'),
      )
      this.user = JSON.parse(localStorage.getItem('user'))
      SideNaveComponent.userRoles = JSON.parse(localStorage.getItem('roles'))
    }

    this.mobileQuery.removeListener(this._mobileQueryListener)

    if (this.shouldRun == true) {
      this.getGeneralSettings()
      this.getApplication()
      // this.getSyncJobTypes()
      this.getOperationTypes()
    }

    const body = document.querySelector('body')

    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    document.querySelectorAll('.sidebar .nav-item').forEach(function (el) {
      el.addEventListener('mouseover', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open')
        }
      })
      el.addEventListener('mouseout', function () {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open')
        }
      })
    })
  }

  private _mobileQueryListener: () => void

  ngOnDestroy(): void {}

  backClicked() {
    this._location.back()
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

  // public set setshouldRun(shouldRun:boolean) {
  //     this.shouldRun=shouldRun;
  //   }
  public get getshouldRun() {
    return this.shouldRun
  }

  hasRole(reference): Boolean {
    if (SideNaveComponent.userRoles) {
      for (let i = 0; i < SideNaveComponent.userRoles.length; i++) {
        if (SideNaveComponent.userRoles[i]['reference'] == reference) {
          return true
        }
      }
      return false
    } else {
      return false
    }
  }

  hasFeature(reference): Boolean {
    if (SideNaveComponent.userFeature) {
      for (let i = 0; i < SideNaveComponent.userFeature.length; i++) {
        if (SideNaveComponent.userFeature[i]['reference'] == reference) {
          return true
        }
      }
      return false
    }
  }

  setshouldRun(shouldRun: boolean) {
    this.shouldRun = shouldRun
  }

  closeTip() {
    this.tipOpend = false
    this.tripDownOpend = false
  }

  colspandTip() {
    this.tripDowncolspand = !this.tripDowncolspand
    if (this.tripDowncolspand) {
      this.props = { height: '50px' }
    } else {
      this.props = { height: 'auto' }
    }
  }

  searchModules(search) {
    // this.syncJobTypes()
  }

  titleOpened(title) {
    if (title == 'uiBasicCollapsed') {
      this.uiBasicCollapsed = !this.uiBasicCollapsed
      this.repBasicCollapsed = false
      this.appBasicCollapsed = false
      this.opeBasicCollapsed = false
      this.aggregatorCollapsed = false
      this.userPagesCollapsed = false
      this.setBasicCollapsed = false
    } else if (title == 'repBasicCollapsed') {
      this.repBasicCollapsed = !this.repBasicCollapsed
      this.uiBasicCollapsed = false
      this.appBasicCollapsed = false
      this.opeBasicCollapsed = false
      this.aggregatorCollapsed = false
      this.userPagesCollapsed = false
      this.setBasicCollapsed = false
    } else if (title == 'appBasicCollapsed') {
      this.appBasicCollapsed = !this.appBasicCollapsed
      this.uiBasicCollapsed = false
      this.repBasicCollapsed = false
      this.opeBasicCollapsed = false
      this.aggregatorCollapsed = false
      this.userPagesCollapsed = false
      this.setBasicCollapsed = false
    } else if (title == 'opeBasicCollapsed') {
      this.opeBasicCollapsed = !this.opeBasicCollapsed
      this.uiBasicCollapsed = false
      this.repBasicCollapsed = false
      this.appBasicCollapsed = false
      this.aggregatorCollapsed = false
      this.userPagesCollapsed = false
      this.setBasicCollapsed = false
    } else if (title == 'userPagesCollapsed') {
      this.userPagesCollapsed = !this.userPagesCollapsed
      this.uiBasicCollapsed = false
      this.repBasicCollapsed = false
      this.appBasicCollapsed = false
      this.aggregatorCollapsed = false
      this.opeBasicCollapsed = false
      this.setBasicCollapsed = false
    } else if (title == 'setBasicCollapsed') {
      this.setBasicCollapsed = !this.setBasicCollapsed
      this.uiBasicCollapsed = false
      this.repBasicCollapsed = false
      this.appBasicCollapsed = false
      this.aggregatorCollapsed = false
      this.opeBasicCollapsed = false
      this.userPagesCollapsed = false
    } else if (title == 'aggregatorCollapsed') {
      this.aggregatorCollapsed = !this.aggregatorCollapsed
      this.setBasicCollapsed = false
      this.uiBasicCollapsed = false
      this.repBasicCollapsed = false
      this.appBasicCollapsed = false
      this.opeBasicCollapsed = false
      this.userPagesCollapsed = false
    }
  }
}
