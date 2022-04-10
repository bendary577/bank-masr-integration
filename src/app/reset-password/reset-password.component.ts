import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { User } from '../models/user'
import { Account } from '../models/Account'
import { SideNaveComponent } from '../components/side-nave/side-nave.component'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  public user: User
  public resetPasswordForm: FormGroup
  loading = false
  submitted = false
  returnUrl: string
  side: SideNaveComponent
  account: Account
  failMessage: ''
  successMessage: ''

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    public snackBar: MatSnackBar,
    side: SideNaveComponent,
    private spinner: NgxSpinnerService,
  ) {
    this.side = side
    // redirect to home if already logged in
    this.side.shouldRun = false
  }

  ngOnInit() {
    this.resetPasswordForm = this.formBuilder.group({
      password: ['', Validators.required],
      password_confirmation: ['', Validators.required],
    })
    this.successMessage = ''
    this.failMessage = ''
  }

  onSubmit() {
    this.submitted = true
    const password = this.resetPasswordForm.controls.password.value as string
    const passwordConfirmation = this.resetPasswordForm.controls
      .password_confirmation.value as string
    if (password === passwordConfirmation) {
      this.resetPassword(password)
    } else {
      this.spinner.hide()
      this.loading = false
      let message = 'please make sure that passwords are equal'
      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    }
  }

  resetPassword(password) {
    let user_id = localStorage.getItem('user_id')
    if (user_id !== null && user_id !== '') {
      this.spinner.show()
      this.authenticationService
        .resetPassword(password, user_id)
        .toPromise()
        .then((res: any) => {
          localStorage.removeItem('user_id')
          this.successMessage = res.message
          this.spinner.hide()
          this.loading = false
          this.snackBar.open(this.successMessage, null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          })
        })
        .catch((err) => {
          console.log(err)
          if (err.error.message) {
            this.failMessage = err.error.message
          } else if (err.message) {
            this.failMessage = err.message
          }
          localStorage.removeItem('user_id')
          this.spinner.hide()
          this.loading = false
          this.snackBar.open(this.failMessage, null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
        })
    } else {
      this.spinner.hide()
      this.loading = false
      this.snackBar.open(
        'Unknown User, please send forget password request to be able to reset your password',
        null,
        {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        },
      )
    }
  }
}
