import { Component, OnInit } from '@angular/core'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { AuthService } from 'src/app/services/auth/auth.service'
import { Constants } from 'src/app/models/constants'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { User } from '../models/user'
import { AccountService } from 'src/app/services/account/account.service'
import { Account } from '../models/Account'
import { SideNaveComponent } from '../components/side-nave/side-nave.component'

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent implements OnInit {
  public user: User
  public forgetPasswordForm: FormGroup
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
    this.forgetPasswordForm = this.formBuilder.group({
      email: ['', Validators.required],
    })
    this.successMessage = ''
    this.failMessage = ''
  }

  onSubmit() {
    this.submitted = true
    this.isValid()
  }

  isValid() {
    this.spinner.show()
    const email = this.forgetPasswordForm.controls.email.value as string

    this.authenticationService
      .forgetPassword(email)
      .toPromise()
      .then((res: any) => {
        console.log('%%%%%%%%%%%%%%% user id is ' + res.user_id)
        localStorage.setItem("user_id", res.user_id);
        this.spinner.hide()
        this.loading = false
        this.successMessage = res.message
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
        this.spinner.hide()
        this.loading = false
        this.snackBar.open(this.failMessage, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }
}
