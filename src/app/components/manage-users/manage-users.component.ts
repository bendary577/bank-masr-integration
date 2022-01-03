import { Component, OnInit, ViewChild } from '@angular/core'
import { MatDialog, MatSnackBar } from '@angular/material'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { AddAppUserComponent } from '../../components/add-app-user/add-app-user.component'
import { Group } from 'src/app/models/loyalty/Group'
import { Location } from '@angular/common'
import { Router } from '@angular/router'
import { Data } from 'src/app/models/data'
import { Constants } from 'src/app/models/constants'
import { AddAppUserAccompiedComponent } from '../add-app-user-accompied/add-app-user-accompied.component'
import { SideNaveComponent } from '../side-nave/side-nave.component'
import { ExtendExpiryDateComponent } from '../extend-expiry-date/extend-expiry-date.component'

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss'],
})
export class ManageUsersComponent implements OnInit {
  loading = false
  newUser: ApplicationUser = new ApplicationUser()
  updatedUser: ApplicationUser = new ApplicationUser()
  role = true

  styleProps = { 'background-color': '#e07d93' }
  styleProps2 = { 'background-color': '#ffb560' }

  noFilter = true
  selectedGuest = ''
  guestNames = []
  expiration = 0
  palance = 0
  cardNumber = 0
  accompanied = 2
  selectedGroupId = ''
  selectedRevenue = ''
  selectedGuestName = ''
  selectedCardNum = ''
  selectedCardStatues = ''
  statues = ['Active', 'Expired', 'Deleted']
  fromDate = ''
  toDate = ''
  isEntrySys = true

  usersList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div style="text-align: center;">
      <p class="user-name">No users have been created yet</p>
    </div>
  `,
    },
    selected: [],
    locationsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    usersData: [],
    allGuestsBeforeFilter: [],
  }

  constructor(
    private loyaltyService: LoyaltyService,
    public dialog: MatDialog,
    private _location: Location,
    public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent,
    private router: Router,
    public data: Data,
  ) {}

  ngOnInit() {
    this.getUsers()
  }

  onSelect({ selected }) {
    this.usersList.selected.splice(0, this.usersList.selected.length)
    this.usersList.selected.push(...selected)
  }

  totalSpend(date) {}

  refresh() {
    location.reload()
  }

  openUserProfile(user: ApplicationUser) {
    this.data.storage = user
    this.router.navigate([Constants.USER_PROFILE])
  }

  getUsers() {
    this.usersList.showLoading = true
    this.loyaltyService
      .getAppUsers()
      .toPromise()
      .then((res: any) => {
        this.usersList.usersData = res
        this.usersList.allGuestsBeforeFilter = res
        this.usersList.showLoading = false
      })
      .catch((err) => {
        this.usersList.showLoading = false
      })
  }

  deleteUsers(flage) {
    this.usersList.showLoading = true
    let deletedId = []

    for(var i = 0 ; i < this.usersList.selected.length; i++){
      deletedId.push(this.usersList.selected[i].id)
    }

    this.loyaltyService
      .deleteAppUsers(flage, deletedId)
      .then((res: any) => {
        this.getUsers()
        this.usersList.selected = []
        this.usersList.showLoading = false

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
        this.usersList.showLoading = false
        this.usersList.selected = []
        this.getUsers()
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
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

  extendExpiryDate(guest) {
    this.dialog
      .open(ExtendExpiryDateComponent, {})
      .afterClosed()
      .subscribe((res) => {
        if (res) {
          this.usersList.showLoading = true
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
              this.loading = false
              this.usersList.showLoading = false
              this.newUser = new ApplicationUser()
              this.usersList.selected = []
              this.getUsers()
              this.snackBar.open('Guest updated successfully.', null, {
                duration: 2000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-success',
              })
            })
            .catch((err) => {
              this.loading = false
              let message = ''
              if (err.status === 401) {
                message = ErrorMessages.SESSION_EXPIRED
                this.sidNav.Logout()
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

  deleteOneUsers(guest, flage) {
    this.usersList.showLoading = true
    this.loyaltyService
      .deleteAppUsers(flage, [guest.id])
      .then((res: any) => {
        this.getUsers()
        this.usersList.selected = []
        this.usersList.showLoading = false

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
        this.usersList.showLoading = false
        this.usersList.selected = []
        this.getUsers()
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
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

  suspendGuest(guest, susFlag) {
    this.usersList.showLoading = true
    this,
      this.loyaltyService
        .suspendGuest(guest, susFlag)
        .then((res: any) => {
          this.usersList.selected = []
          this.getUsers()
          this.usersList.showLoading = false
          let message = 'Guest suspended successfully.'
          if (!susFlag) {
            message = 'Guest actived successfully.'
          }
          this.snackBar.open(message, null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          })
        })
        .catch((err) => {
          this.usersList.selected = []
          this.getUsers()
          this.usersList.showLoading = false
          let message = ''
          if (err.status === 401) {
            message = ErrorMessages.SESSION_EXPIRED
            this.sidNav.Logout()
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

  addUserDialog(type, genericGroup) {
    let dialogRef
    let isGeneric = false

    if (type) {
      isGeneric = true
      dialogRef = this.dialog.open(AddAppUserAccompiedComponent, {
        width: '420px',
        data: {
          generic: genericGroup
        },
      })
    } else {
      dialogRef = this.dialog.open(AddAppUserComponent, {
        width: '420px'
      })
    }

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.usersList.showLoading = true
        this.loyaltyService
          .addApplicationUser(
            true,
            isGeneric,
            res.name,
            res.email,
            res.group,
            res.image,
            '',
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
            this.loading = true
            this.getUsers()
            this.newUser = new ApplicationUser()
            this.usersList.showLoading = false
            this.usersList.selected = []

            this.snackBar.open('User added successfully.', null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            this.newUser = new ApplicationUser()
            this.usersList.showLoading = false

            this.usersList.selected = []
            let message = ''
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED
              this.sidNav.Logout()
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
    let dialogRef
    let isGeneric = this.usersList.selected[0].generic
    if (isGeneric) {
      dialogRef = this.dialog.open(AddAppUserAccompiedComponent, {
        width: '710px',
        data: {
          user: this.usersList.selected[0],
        },
      })
    } else {
      dialogRef = this.dialog.open(AddAppUserComponent, {
        width: '420px',
        data: {
          user: this.usersList.selected[0],
        },
      })
    }

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.loading = true
        this.usersList.showLoading = true
        if (res.group == undefined) res.group = new Group()
        this.loyaltyService
          .addApplicationUser(
            false,
            isGeneric,
            res.name,
            res.email,
            res.group,
            res.image,
            this.usersList.selected[0].id,
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
            this.loading = false
            this.usersList.showLoading = false
            this.newUser = new ApplicationUser()
            this.usersList.selected = []
            this.getUsers()
            this.snackBar.open('User updated successfully.', null, {
              duration: 2000,
              horizontalPosition: 'center',
              panelClass: 'my-snack-bar-success',
            })
          })
          .catch((err) => {
            this.loading = false
            this.usersList.showLoading = false
            this.usersList.selected = []

            this.newUser = new ApplicationUser()

            let message = ''
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED
              this.sidNav.Logout()
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

  send(process) {
    this.loyaltyService
      .sendSmsOrEmail(this.usersList.selected[0], process)
      .toPromise()
      .then((res) => {
        // this.sppiner.hide()
        this.snackBar.open(process + ' sent successfully.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        // this.sppiner.hide()
        let message = "Can't send " + process + '.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          // this.sideNav.Logout();
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

  resendQRCode() {
    this.usersList.showLoading = true
    this.loyaltyService
      .resendQRCode(this.usersList.selected[0].id)
      .then((result: any) => {
        this.loading = true
        this.getUsers()
        this.newUser = new ApplicationUser()
        this.usersList.showLoading = false
        this.usersList.selected = []

        this.snackBar.open('QR Code send successfully.', null, {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass: 'my-snack-bar-success',
        })
      })
      .catch((err) => {
        this.newUser = new ApplicationUser()
        this.usersList.showLoading = false
        this.usersList.showLoading = false

        this.usersList.selected = []
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
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

  validateUpdateUser() {
    if (this.usersList.selected.length != 1) {
      return true
    }

    if (this.usersList.selected.length == 1) {
      let updatedUser = this.usersList.selected[0]

      if (updatedUser.deleted) {
        return true
      }
    }

    return false
  }

  validateDeleteUsers() {
    if (this.usersList.selected.length == 0) {
      return true
    }

    // check if there any deleted user selected
    var i
    for (i = 0; i < this.usersList.selected.length; i++) {
      let usersList = this.usersList.selected[i] as ApplicationUser

      if (usersList.deleted) {
        return true
      }
    }

    return false
  }

  validateRestoreUsers() {
    if (this.usersList.selected.length == 0) {
      return true
    }
    // check if there any deleted user selected
    var i
    for (i = 0; i < this.usersList.selected.length; i++) {
      let usersList = this.usersList.selected[i] as ApplicationUser

      if (!usersList.deleted) {
        return true
      }
      // if(usersList.group.deleted){
      //   return true;
      // }
      return false
    }
  }

  filterByGuestName() {
    this.guestNames.push(this.selectedGuest)
  }

  filterUsers(selectedGuest) {
    const strs = this.usersList.usersData
    const result = strs.filter((s) => s.code.includes(selectedGuest))
    console.log(selectedGuest)
    console.log(strs)
    console.log(result)
    this.usersList.usersData = result
  }

  calculateParams(user): Number {
    let credit = 0
    let balance = user.wallet.balance
    for (let i = 0; i < balance.length; i++) {
      credit = credit + balance[i]['amount']
    }
    return credit
  }

  lessThanOrEqualZero(expireHours): Boolean {
    if (expireHours > 0) {
      return false
    }
    return true
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  hasFeature(reference) {
    return this.sidNav.hasFeature(reference)
  }

  getCurrency() {
    return JSON.parse(localStorage.getItem('account')).currency
  }

  resetPicker(event) {
    // if (event == 'fromDate') {
    this.fromDate = undefined
    // this.filterGuests(event)
    // } else if (event == 'toDate') {
    this.toDate = undefined
    this.filterGuests(event)
    // }
  }

  filterGuests(event) {
    const guests = this.usersList.allGuestsBeforeFilter

    if (
      this.fromDate != '' &&
      this.fromDate != undefined &&
      (this.toDate == undefined || this.toDate == '')
    ) {
      this.snackBar.open('Please Configure End Date Time.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: ['redNoMatch'],
      })
    }

    if (
      this.toDate != '' &&
      this.toDate != undefined &&
      (this.fromDate == undefined || this.fromDate == '')
    ) {
      this.snackBar.open('Please Configure Start Date Time.', null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: ['redNoMatch'],
      })
    }

    if (
      this.fromDate != '' &&
      this.fromDate != undefined &&
      this.toDate != undefined &&
      this.toDate != ''
    ) {
      this.usersList.usersData = guests.filter((item) => {
        return (
          new Date(item.creationDate).getTime() >=
            new Date(this.fromDate).getTime() &&
          new Date(item.creationDate).getTime() <=
            new Date(this.toDate).getTime()
        )
      })
    }

    if (this.selectedCardNum != '') {
      const result = guests.filter((s) => s.code.includes(this.selectedCardNum))
      this.usersList.usersData = result
    }

    if (this.selectedGuestName != '') {
      const result = guests.filter((s) =>
        s.name.includes(this.selectedGuestName),
      )
      this.usersList.usersData = result
    }

    if (this.selectedCardStatues != '') {
      if (this.selectedCardStatues == 'Deleted') {
        const result = guests.filter((s) => {
          return s.deleted == 1
        })
        this.usersList.usersData = result
      } else if (this.selectedCardStatues == 'Active') {
        const result = guests.filter((s) => {
          return s.deleted == 0
        })
        this.usersList.usersData = result
      } else if (this.selectedCardStatues == 'Expired') {
        const result = guests.filter((s) => {
          return s.expire == 0
        })
        this.usersList.usersData = result
      }
    }
    if (
      (!this.fromDate || !this.toDate) &&
      !this.selectedCardNum &&
      !this.selectedGuestName &&
      !this.selectedCardStatues
    ) {
      this.usersList.usersData = this.usersList.allGuestsBeforeFilter
    }
  }

  resetFilter() {
    this.selectedGroupId = ''
    this.selectedRevenue = ''
    this.selectedGuestName = ''
    this.selectedCardNum = ''
    this.selectedCardStatues = ''
    this.usersList.usersData = this.usersList.allGuestsBeforeFilter
  }

  getTransInRangAndGroup() {}

  validatefilter() {}

  restFilters() {}

  extractExcelFile() {}
}
