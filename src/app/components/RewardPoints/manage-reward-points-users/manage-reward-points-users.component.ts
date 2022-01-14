import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { RewardPointsService } from 'src/app/services/RewardPoints/reward-points.service';
import { SideNaveComponent } from '../../side-nave/side-nave.component';
import { AddRewardPointsUserComponent } from '../add-reward-points-user/add-reward-points-user.component';

@Component({
  selector: 'app-manage-reward-points-users',
  templateUrl: './manage-reward-points-users.component.html',
  styleUrls: ['./manage-reward-points-users.component.scss']
})
export class ManageRewardPointsUsersComponent implements OnInit {
  loading = false
  newUser: ApplicationUser = new ApplicationUser()
  updatedUser: ApplicationUser = new ApplicationUser()

  styleProps = { 'background-color': '#e07d93' }
  styleProps2 = { 'background-color': '#ffb560' }

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
    private rewardPointsService: RewardPointsService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent,
  ) {}

  ngOnInit() {
    this.getUsers()
  }

  onSelect({ selected }) {
    this.usersList.selected.splice(0, this.usersList.selected.length)
    this.usersList.selected.push(...selected)
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

  suspendGuest(guestId, susFlag) {
    this.usersList.showLoading = true
    this,
      this.loyaltyService
        .suspendGuest(guestId, susFlag)
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

  addRewardPointsUser(){
    let dialogRef = this.dialog.open(AddRewardPointsUserComponent, {
      width: '420px'
    })

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.newUser.name = res.name
        this.newUser.email = res.email
        this.newUser.group = res.group
        this.newUser.points = res.points
        this.newUser.birthDate = res.birthDate

        this.usersList.showLoading = true
        this.rewardPointsService
          .addRewardPointsUser(
            res.image,
            this.newUser
          )
          .then((result: any) => {
            this.loading = true
            this.newUser = new ApplicationUser()
            this.usersList.showLoading = false
            this.usersList.selected = []

            if (result["success"]) { 
              this.getUsers()

              this.snackBar.open(result["message"], null, {
                duration: 2000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-success',
              })
            }else{
              this.snackBar.open(result["message"], null, {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-fail',
              })
            }
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

  updateUserDialog(){
    this.newUser = this.usersList.selected[0];

    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title:  "Update Guest",
        user: this.newUser
    };
    dialogConfig.maxWidth = '420px';

    let dialogRef = this.dialog.open(AddRewardPointsUserComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.newUser.name = res.name
        this.newUser.email = res.email
        this.newUser.group = res.group
        this.newUser.points = res.points
        this.newUser.birthDate = res.birthDate

        this.usersList.showLoading = true
        this.rewardPointsService
          .updateRewardPointsUser(
            res.image,
            this.newUser
          )
          .then((result: any) => {
            this.loading = true
            this.newUser = new ApplicationUser()
            this.usersList.showLoading = false
            this.usersList.selected = []

             if (result["success"]) { 
              this.getUsers()

              this.snackBar.open(result["message"], null, {
                duration: 2000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-success',
              })
            }else{
              this.snackBar.open(result["message"], null, {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: 'my-snack-bar-fail',
              })
            }

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
      return false
    }
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
}
