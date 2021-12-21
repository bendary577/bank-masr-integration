import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Constants } from 'src/app/models/constants';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from "../../models/user";
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from '../../models/Account';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SideNaveComponent } from '../side-nave/side-nave.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  side: SideNaveComponent;
  // sideNav : SideNaveComponent;
  account: Account;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private accountService: AccountService,
    public snackBar: MatSnackBar, side: SideNaveComponent,
    private spinner: NgxSpinnerService
  ) {
    this.side = side
    // redirect to home if already logged in
    this.side.shouldRun = false

    if (localStorage.getItem('auth_token')) {
      this.router.navigate([Constants.WELCOME_PAGE])
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/'
  }

  onSubmit() {
    this.submitted = true
    this.isValid()
  }

  isValid() {
    this.spinner.show()
    const username = this.loginForm.controls.username.value as string
    const password = this.loginForm.controls.password.value as string
    const domainName = username.split('@')

    // if (domainName.length == 2) {
    this.user = new User();
    this.user.name = "auth";
    this.user.username = username;
    this.user.password = password;

    this.authenticationService.login(this.user).toPromise().then((res: any) => {
      localStorage.setItem('auth_token', res.access_token);
      localStorage.setItem('refresh_token', res.refresh_token);
      this.saveAccountERD();
      // localStorage.setItem('user',JSON.stringify(this.user));
      // this.getFeatures();
      // this.side.refresh();
    }).catch(err => {
      localStorage.setItem('auth_token', '');
      localStorage.setItem('user', '');
      localStorage.setItem('accountERD', '');

      this.spinner.hide();
      this.loading = false;
      this.snackBar.open('Wrong Credentials.', null, {
        duration: 2000,
        horizontalPosition: 'center',
      });
      return;
    });
  }


  getRoles() {
    this.accountService.getRoles("asfas", true).then((res: any) => {
      if (res.data && res.data != null) {
        localStorage.setItem('user', JSON.stringify(res.data));
        if (res.data.roles && res.data.roles != null) {
          localStorage.setItem('roles', JSON.stringify(res.data.roles));
        }
      }
      this.loading = false;
      this.side.setshouldRun(true);
      this.side.shouldRun = true;
      this.side.getSyncJobTypes();
      this.side.getOperationTypes();
      this.side.getApplication();
      this.router.navigate([Constants.WELCOME_PAGE]);
      this.spinner.hide();
    }).catch(err => {
      console.log(err);
      this.loading = false;
      this.spinner.hide();
    })
  }

  saveAccountERD() {
    this.accountService.getAccount().toPromise().then((res: any) => {
      this.account = res;

      if (res) {
        localStorage.setItem('account', JSON.stringify(res));
        if (res.erd && res.erd != null) {
          localStorage.setItem('accountERD', res.erd);
        }
        if (res.features && res.features != null) {
          localStorage.setItem('features', JSON.stringify(res.features));
        }
      }
      this.getRoles();
    }).catch(err => {
      console.error(err);
    });
  }
}
