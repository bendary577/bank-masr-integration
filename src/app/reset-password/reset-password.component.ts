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
  validationMessage : ""

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
    this.validationMessage = ''
  }

  onSubmit() {
    this.submitted = true
    const password = this.resetPasswordForm.controls.password.value as string
    const passwordConfirmation = this.resetPasswordForm.controls
      .password_confirmation.value as string
    let ValidationObject = this.validate(password, passwordConfirmation)
    if(ValidationObject.status === false){
      this.spinner.hide()
      this.loading = false
      this.snackBar.open(ValidationObject.message, null, {
        duration: 6000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    }else{
      this.resetPassword(password)
    }
  }

  validate(password, passwordConfirmation){
    let ValidationObject = {status : true, message : ""}
    if(password === '' || passwordConfirmation === ''){
      ValidationObject.message = "please make sure that you have entered your required password and confirmed it";
      ValidationObject.status = false;
    }
    if (password !== passwordConfirmation) {
      ValidationObject.message = "please make sure that the passwords you have entered are identical";
      ValidationObject.status = false;
    } 
    return ValidationObject;
  }

  resetPassword(password) {
    let user_id = localStorage.getItem('user_id')
    if (user_id !== null && user_id !== '') {
      this.spinner.show()
      this.authenticationService
        .resetPassword(password, user_id)
        .toPromise()
        .then((res: any) => {
          console.log("%%%%%%%%%%%%%%% res is" + res.message)
          if(res.status === 200){
            console.log("%%%%%%%%%%%%%%% in alert status")
            localStorage.removeItem('user_id')
          }
          this.successMessage = res.message
          this.spinner.hide()
          this.loading = false
          this.snackBar.open(this.successMessage, null, {
            duration: 6000,
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
            duration: 6000,
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
          duration: 6000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        },
      )
    }
  }
}
