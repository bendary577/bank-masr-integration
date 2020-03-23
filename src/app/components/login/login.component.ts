import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Constants } from 'src/app/models/constants';
import { MatSnackBar } from '@angular/material';
import { SidenavResponsive } from "../sidenav/sidenav-responsive";
import { NgxSpinnerService } from 'ngx-spinner';
import {User} from "../../models/user";
import { AccountService } from 'src/app/services/account/account.service';
import { Account } from 'src/app/models/Account';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  public user:User;
  public loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  side: SidenavResponsive;
  account:Account;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private accountService: AccountService,
    public snackBar: MatSnackBar, side: SidenavResponsive,
    private spinner: NgxSpinnerService
  ) {
    this.side = side;
    // redirect to home if already logged in
    this.side.shouldRun = false;

    if (localStorage.getItem('auth_token')) {
      this.router.navigate([Constants.WELCOME_PAGE]);
    }
  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }


  onSubmit() {
    this.submitted = true;
    this.isValid();
  }


  isValid() {
    this.spinner.show();
    const username = this.loginForm.controls.username.value as string;
    const password = this.loginForm.controls.password.value as string;
    const domainName = username.split("@");

    // if (domainName.length == 2) {
      this.user= new User();
      this.user.name="auth";
      this.user.username=username;
      this.user.password=password;

      this.authenticationService.login(this.user).toPromise().then((res: any) => {
        localStorage.setItem('auth_token',res.access_token);
        localStorage.setItem('refresh_token',res.refresh_token);
        localStorage.setItem('user',JSON.stringify(this.user));

        this.spinner.hide();
        this.loading = false;
        this.side.setshouldRun(true);
        this.side.shouldRun = true;
        this.side.getSyncJobTypes();
        this.router.navigate([Constants.WELCOME_PAGE]);
      }).catch(err => {
        localStorage.setItem('auth_token','');
        localStorage.setItem('user','');
        this.spinner.hide();
        this.loading = false;
        this.snackBar.open('Wrong Credentials.', null, {
          duration: 2000,
          horizontalPosition: 'center',
        });
        return;
      });
  }

}
