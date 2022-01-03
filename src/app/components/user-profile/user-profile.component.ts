import { Component, OnInit } from '@angular/core'
import { Data } from 'src/app/models/data'
import { Transactions } from '../opi-transactions/transactions'
import { Location } from '@angular/common'
import { MatDialog, MatSnackBar } from '@angular/material'
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component'
import { SideNaveComponent } from '../side-nave/side-nave.component'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { NgxSpinnerService } from 'ngx-spinner'
import { VoucherHistory } from 'src/app/models/wallet/voucher-history'
import { RevenueCenter } from 'src/app/models/RevenueCenter'
import { AddAppUserAccompiedComponent } from '../add-app-user-accompied/add-app-user-accompied.component'
import { ExtendExpiryDateComponent } from '../extend-expiry-date/extend-expiry-date.component'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  voucherData = []
  voucherCode = 'No Vocher Code'
  openFilter = false
  fromDate: any
  toDate: any
  field: any
  fields = ['Revenue Center', 'Agent']
  fieldValues: any
  credit = 0
  voucherHistory = new VoucherHistory()
  simphonyDiscount
  group
  user
  revenueCenters: RevenueCenter[] = []

  walletHistoryList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no transactions yet.</span>
    </div>
  `,
    },
    selected: [],
    groupsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    walletHistoryData: [] as Transactions[],
  }

  constructor(
    public data: Data,
    private _location: Location,
    private sideNav: SideNaveComponent,
    private loyaltyService: LoyaltyService,
    private sppiner: NgxSpinnerService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    if (this.data != null && this.data.storage != undefined) {
      localStorage.setItem('currentGuestId', this.data.storage.id)
      this.user = this.data.storage
      this.calculateParams(this.user)
      this.group = this.user['group']
      this.simphonyDiscount = this.group['simphonyDiscount']
      this.walletHistoryList.walletHistoryData = this.user['wallet'][
        'walletHistory'
      ]
    } else {
      this.getApplicationUser()
    }
  }

  getApplicationUser() {
    this.walletHistoryList.showLoading = true
    this.loyaltyService
      .getAppUser(localStorage.getItem('currentGuestId'))
      .toPromise()
      .then((result: any) => {
        this.walletHistoryList.showLoading = false
        this.user = result
        this.calculateParams(this.user)
        this.group = this.user['group']
        this.simphonyDiscount = this.group['simphonyDiscount']
        this.walletHistoryList.walletHistoryData = this.user['wallet'][
          'walletHistory'
        ]
      })
      .catch((err) => {
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sideNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
      })
  }

  getCurrency() {
    return JSON.parse(localStorage.getItem('account')).currency
  }

  calculateParams(user) {
    this.credit = 0
    let balance = user.wallet.balance
    for (let i = 0; i < balance.length; i++) {
      this.credit = this.credit + balance[i]['amount']
      let revenueCenters = balance[i].revenueCenters
      for (let j = 0; j < revenueCenters.length; j++) {
        if (!this.checkExistance(revenueCenters[j])) {
          this.revenueCenters.push(revenueCenters[j])
        }
      }
    }
  }

  checkExistance(revenue): Boolean {
    for (let j = 0; j < this.revenueCenters.length; j++) {
      if (this.revenueCenters[j].revenueCenter == revenue.revenueCenter) {
        return true
      }
    }
    return false
  }


  lessThanOrEqualZero(expireHours): Boolean {
    if (expireHours > 0) {
      return false
    }
    return true
  }

  chargeWallet(func) {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '400px',
      data: { function: func },
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.walletHistoryList.showLoading = true
        this.sppiner.show()
        if (res) {
          console.log(res)
          this.loyaltyService
            .chargeWallet(func, this.user.id, res)
            .toPromise()
            .then((result: any) => {
              this.walletHistoryList.showLoading = false
              this.getApplicationUser()
              this.sppiner.hide()
              this.snackBar.open('Wallet Charged Successfully.', null, {
                duration: 2000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-success',
              })
            })
            .catch((err) => {
              this.walletHistoryList.showLoading = false

              let message = ''
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED
                this.sideNav.Logout()
              } else if (err.error.message) {
                message = err.error.message
              } else if (err.message) {
                message = ErrorMessages.FAILED_TO_SAVE_CONFIG
              }
              this.sppiner.hide()
              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-fail',
              })
            })
        }
      }
    })

    this.walletHistoryList.showLoading = false
  }

  deductWallet(func) {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '400px',
      data: { function: func },
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.walletHistoryList.showLoading = true
        this.sppiner.show()
        if (res) {
          console.log(res)
          this.loyaltyService
            .deductWallet(func, this.user.id, res.amount)
            .toPromise()
            .then((result: any) => {
              this.walletHistoryList.showLoading = false
              this.getApplicationUser()
              this.sppiner.hide()
            })
            .catch((err) => {
              this.walletHistoryList.showLoading = false
              this.sppiner.hide()

              let message = ''
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED
                this.sideNav.Logout()
              } else if (err.error.message) {
                message = err.error.message
              } else if (err.message) {
                message = ErrorMessages.FAILED_TO_SAVE_CONFIG
              }
              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-fail',
              })
            })
        }
      }
    })
    this.walletHistoryList.showLoading = false
  }

  addRevenueCenter() {
    const dialogRef = this.dialog.open(EditWalletComponent, {
      width: '200px',
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
      }
    })
  }

  send(process) {
    this.sppiner.show()
    this.loyaltyService
      .sendSmsOrEmail(this.user, process)
      .toPromise()
      .then((res) => {
        this.sppiner.hide()
        this.snackBar.open(process + ' sent successfully.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        this.sppiner.hide()
        let message = ''
        if (process == 'Email') {
          message = 'Invalid Email.'
        } else {
          message = 'Invalid Mobile Number.'
        }
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sideNav.Logout()
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  extendExpiryDate(guest) {
    this.dialog
      .open(ExtendExpiryDateComponent, {})
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.sppiner.show();
          this.loyaltyService
            .addApplicationUser(
              false,
              true,
              guest.name,
              guest.email,
              guest.group.id,
              guest.image,
              guest.id,
              guest.accompiendUsers,
              guest.cardCode,
              guest.mobile,
              guest.balance,
              +guest.expire + res.hours,
              false,
              false,
              guest.points,
            )
            .then((result: any) => {
              this.getApplicationUser()
              this.sppiner.hide()
              this.snackBar.open('User updated successfully.', null, {
                duration: 2000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-success',
              })
            })
            .catch((err) => {
              this.sppiner.hide();

              let message = ''
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED
                this.sideNav.Logout()
              } else if (err.error.message) {
                message = err.error.message
              } else if (err.message) {
                message = err.message
              } else {
                message = ErrorMessages.FAILED_TO_SAVE_CONFIG
              }

              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-fail',
              })
            })
        }
      })
  }

  updateUserDialog() {
    const dialogRef = this.dialog.open(AddAppUserAccompiedComponent, {
      width: '800px',
      data: {
        user: this.user,
      },
    })
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.sppiner.show()
        this.loyaltyService
          .addApplicationUser(
            false,
            true,
            res.name,
            res.email,
            res.group,
            res.image,
            this.user.id,
            res.accompiendUsers,
            res.cardCode,
            res.mobile,
            res.balance,
            res.expire,
            res.sendEmail,
            res.sendSMS,
            res.points,
          )
          .then((result: any) => {
            this.getApplicationUser()
            this.sppiner.hide()
            this.snackBar.open('User updated successfully.', null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            this.getApplicationUser()
            this.sppiner.hide()
            let message = ''
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED
            } else if (err.error.message) {
              message = err.error.message
            } else if (err.message) {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG
            }
            this.snackBar.open(message, null, {
              duration: 3000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-fail',
            })
          })
      }
    })
  }

  deleteUsers(flage) {
    this.sppiner.show()
    this.loyaltyService
      .deleteAppUsers(flage, [this.user])
      .then((res: any) => {
        this.getApplicationUser()
        this.sppiner.hide()
        let message = 'User deleted successfully.'
        if (flage == 'false') {
          message = 'User restored successfully.'
        }

        this.snackBar.open(message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        this.getApplicationUser()
        this.sppiner.hide()
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'right',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  backClicked() {
    this._location.back()
  }

  refresh() {
    location.reload()
  }

  openFilterView() {
    if (this.openFilter) {
      this.openFilter = false
    } else {
      this.openFilter = true
    }
  }

  onCancelClick(): void {
    this.openFilter = false
  }

  hasRole(reference): Boolean {
    return this.sideNav.hasRole(reference)
  }
}
