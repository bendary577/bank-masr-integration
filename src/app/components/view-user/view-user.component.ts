import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { Feature } from 'src/app/models/Feature'
import { Role } from 'src/app/models/Role'
import { AccountService } from 'src/app/services/account/account.service'

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss'],
})
export class ViewUserComponent implements OnInit {
  loading = true
  accountID = ''
  userID = ''
  roles: Role[] = []
  features: Feature[] = []
  selectAll = false

  constructor(
    public dialogRef: MatDialogRef<ViewUserComponent>,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    public accountService: AccountService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  ngOnInit(): void {
    this.userID = this.data.user.id
    this.getAccountFeatures()
    this.getUserRoles()
  }

  getUserRoles() {
    this.loading = true
    this.spinner.show()

    this.accountService
      .getRoles(this.userID, false)
      .then(async (res: any) => {
        if (res.data && res.data != null) {
          this.roles = res.data.roles
          await this.mapUserRoles()
        }

        this.loading = false
        this.spinner.hide()
      })
      .catch((err) => {
        console.log(err)
        this.snackBar.open(err.message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })

        this.loading = false
        this.spinner.hide()
      })
  }

  getAccountFeatures() {
    this.features = JSON.parse(localStorage.getItem('features'))
    if (this.features.length == 0) {
      this.fetchAccountFeatures()
    }
  }

  fetchAccountFeatures() {
    this.loading = false
    this.spinner.show()

    this.accountID = JSON.parse(localStorage.getItem('account')).id

    this.accountService
      .getAccountFeature(this.accountID)
      .then((res: any) => {
        if (res.data && res.data != null) {
          this.features = res.data
          this.mapUserRoles()
        }

        this.loading = false
        this.spinner.hide()
      })
      .catch((err) => {
        console.log(err)
        this.snackBar.open(err.message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })

        this.loading = false
        this.spinner.hide()
      })
  }

  selectAllRoles() {
    for (var i = 0; i < this.features.length; i++) {
      for (var j = 0; j < this.features[i].roles.length; j++) {
        this.features[i].roles[j].checked = !this.selectAll
      }
    }
  }

  mapUserRoles() {
    for (var i = 0; i < this.features.length; i++) {
      for (var j = 0; j < this.features[i].roles.length; j++) {
        if (this.roleExists(this.features[i].roles[j].id)) {
          this.features[i].roles[j].checked = true
        }
      }
    }
  }

  roleExists(roleId) {
    if (this.roles.length == 0) {
      return false
    } else {
      return this.roles.find(function (el) {
        return el.id === roleId
      })
    }
  }

  cancel() {
    this.dialogRef.close()
  }

  updateUser() {}
}
