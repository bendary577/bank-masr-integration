import { Component, OnInit } from '@angular/core'
import { MatExpansionPanel, MatSnackBar, MatDialog } from '@angular/material'
import { animate, state, style, transition, trigger } from '@angular/animations'
import { NgxSpinnerService } from 'ngx-spinner'
import { DriveService } from 'src/app/services/drive/drive.service'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'
import { Account } from 'src/app/models/Account'
import { AccountService } from 'src/app/services/account/account.service'
import { AddAccountComponent } from '../../add-account/add-account.component'
import { SideNaveComponent } from '../../side-nave/side-nave.component'
import { AccountEmailConfig } from 'src/app/models/AccountEmailConfig'

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'setting-config',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
})
export class ConfigurationComponent implements OnInit {
  loading = true
  account: Account
  newAccount: Account
  accountCredentials = []
  emailConfig: AccountEmailConfig
  panelOpenState = true
  addRole = false
  hideAuthenticationBtn = false

  constructor(
    private spinner: NgxSpinnerService,
    private driveService: DriveService,
    public snackBar: MatSnackBar,
    public accountService: AccountService,
    public dialog: MatDialog,
    private sideNav: SideNaveComponent,
  ) {}

  ngOnInit() {
    this.getAccount()
  }

  getAccount() {
    this.loading = true
    this.spinner.show()
    this.accountService
      .getAccount()
      .toPromise()
      .then((res: any) => {
        this.account = res

        if (this.account.apiKey && this.account.clientId) {
          this.initializeDriveAccount(this.account)
        }

        this.accountCredentials = this.account.accountCredentials
        this.emailConfig = this.account.emailConfig
        if (this.emailConfig == null) {
          this.emailConfig = new AccountEmailConfig();
          this.account.emailConfig = this.emailConfig;
        }
        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
        console.error(err)
        this.spinner.hide()
        this.loading = false
      })
  }

  addAccountDialog() {
    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: '850px',
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.spinner.show()
        this.accountService
          .addAccount(res)
          .then((res: any) => {
            this.spinner.hide()
            this.snackBar.open(res.message, null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            console.error(err)
            this.spinner.hide()
            this.snackBar.open(err.message, null, {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-fail',
            })
          })
      }
    })
  }

  addAccount() {
    this.accountService
      .addAccount(this.newAccount)
      .then((res: any) => {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        console.error(err)
        this.snackBar.open(err.message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  updateAccount() {
    this.loading = true
    this.spinner.show()
    this.accountService
      .updateAccount(this.account)
      .then((res: any) => {
        this.spinner.hide()
        this.loading = false

        this.snackBar.open('Update account information successfully.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        console.error(err)
        this.spinner.hide()
        this.loading = false

        this.snackBar.open(err.message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  updateAccountSyncTypes() {
    this.loading = true
    this.spinner.show()
    this.accountService
      .updateAccountSyncTypes(this.account)
      .then((res: any) => {
        this.spinner.hide()
        this.loading = false

        this.snackBar.open('Update account information successfully.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        console.error(err)
        this.spinner.hide()
        this.loading = false

        this.snackBar.open(err.message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  initializeDriveAccount(account) {
    this.driveService.initClient(account.apiKey, account.clientId)
  }

  authenticateDrice() {
    this.driveService.signIn().then(() => {
      if (this.driveService.isSignedIn) {
        this.hideAuthenticationBtn = true
      }
    })
  }

  uploadFilesToDrive() {
    console.log('upload files to drive....')
  }

  hasRole(role): Boolean {
    return this.sideNav.hasRole(role)
  }
}
const EXPANSION_PANEL_ANIMATION_TIMING = '500ms cubic-bezier(0.4,0.0,0.2,1)'
MatExpansionPanel['decorators'][0].args[0].animations = [
  trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition(
      'expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING),
    ),
  ]),
]
