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
import { Account } from '../../models/Account';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SideNaveComponent } from '../side-nave/side-nave.component';

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
  side: SideNaveComponent;
  // sideNav : SideNaveComponent;
  account:Account;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private accountService: AccountService,
    public snackBar: MatSnackBar, side: SideNaveComponent,
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
        // localStorage.setItem('user',JSON.stringify(this.user));

        this.spinner.hide();
        this.saveAccountERD();
        // this.getFeatures();
        this.getRoles();
        this.loading = false;
        this.side.setshouldRun(true);
        this.side.shouldRun = true;
        this.side.getSyncJobTypes();
        this.side.getOperationTypes();
        this.side.getApplication();

        this.router.navigate([Constants.WELCOME_PAGE]);
        // this.side.refresh();

      }).catch(err => {
        localStorage.setItem('auth_token','');
        localStorage.setItem('user','');
        localStorage.setItem('accountERD','');

        this.spinner.hide();
        this.loading = false;
        this.snackBar.open('Wrong Credentials.', null, {
          duration: 2000,
          horizontalPosition: 'center',
        });
        return;
      });
  }

  saveAccountERD() {
    this.accountService.getAccount().toPromise().then((res: any) => {
      this.account = res;
      localStorage.setItem('accountERD',res.erd);
      localStorage.setItem('account', JSON.stringify(res));
      localStorage.setItem('features', JSON.stringify(res["features"]));

    }).catch(err => {
      console.error(err);
    });
  }

  getRoles() {
    this.accountService.getRoles("asfas", true).toPromise().then((res: any) =>{
      localStorage.setItem('user', JSON.stringify(res["data"]));
      localStorage.setItem('roles', JSON.stringify(res["data"]["roles"]));
    }).catch(err => { 
      console.log(err );

    })
  }

  // getFeatures() {

  //   this.accountService.getAccountFeature(this.account.id).then((res: any) => {
  //     localStorage.setItem('features', res['data']);

  //     console.log(localStorage.getItem("features"));

  //   }).catch(err =>{

  //     let message = "Error happend, Please try again.";

  //     if(err.status === 401){
  //       message = ErrorMessages.SESSION_EXPIRED;
  //       this.side.Logout();
  //     }else if(err.message){
  //       message = err.message;
  //     }else if(err.error.message){
  //       message = err.error.message;
  //     }
  //      this.snackBar.open(message, null, {
  //        duration: 3000,
  //        horizontalPosition: 'center',
  //        panelClass:"my-snack-bar-fail"
  //      });

  //   });

  // }

  // getRoles() {

  //   this.accountService.getRoles("", true).toPromise().then((res: any) =>{
  //     localStorage.setItem("roles", res["data"]);

  //     console.log(localStorage.getItem("roles"));

  //   }).catch(err => {

  //     let message = "Error happend, Please try again.";

  //     if(err.status === 401){
  //       message = ErrorMessages.SESSION_EXPIRED;
  //       this.side.Logout();
  //     }else if(err.message){
  //       message = err.message;
  //     }else if(err.error.message){
  //       message = err.error.message;
  //     }
  //      this.snackBar.open(message, null, {
  //        duration: 3000,
  //        horizontalPosition: 'center',
  //        panelClass:"my-snack-bar-fail"
  //      });
       
  //   })
  // }


}
