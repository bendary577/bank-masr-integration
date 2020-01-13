import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Constants } from 'src/app/models/constants';
import { MatSnackBar } from '@angular/material';
import { SidenavResponsive } from "../sidenav/sidenav-responsive";
import { NgxSpinnerService } from 'ngx-spinner';
import {User} from "../../models/user";
import {Observable} from "rxjs";

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    public snackBar: MatSnackBar, side: SidenavResponsive,
    private spinner: NgxSpinnerService
  ) {
    this.side = side;
    // redirect to home if already logged in
    this.side.shouldRun = false;

    if (localStorage.getItem('auth_token')) {
      this.router.navigate([Constants.SUPPLIERS_PAGE]);
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

  // convenience getter for easy access to form fields
  // get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    this.isValid();





  }


  isValid() {
    this.spinner.show();
    const username = this.loginForm.controls.username.value as string;
    const password = this.loginForm.controls.password.value as string;
    const domainName = username.split("@");



    if (domainName.length == 2) {
      this.user= new User();
      this.user.name="auth";
      this.user.username=username;
      this.user.password=password;
      const creation_date = Date() as string;
      const deleted = false;
      const domain = domainName[domainName.length-1];
      this.user.domain=domain;
/*      this.authenticationService.login(this.user).subscribe(result => {
          // Handle result
          console.log(result)
          localStorage.setItem('currentUser', '');
        },
        error => {
          console.log(error)
        },
        () => {
          // 'onCompleted' callback.
          // No errors, route to new page here
        });*/
      this.authenticationService.login(this.user).toPromise().then((res: any) => {
        console.log(res.items);
        localStorage.setItem('auth_token',res.auth_token);
        localStorage.setItem('user',JSON.stringify(this.user));
        this.spinner.hide();
        this.loading = false;
        this.side.setshouldRun(true);
        this.side.shouldRun = true;
        this.router.navigate([Constants.SUPPLIERS_PAGE]);



        console.log(this.side.getshouldRun);
        return true
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



    } else {
      this.spinner.hide();
          this.loading = false;
      this.snackBar.open('Wrong Credentials.', null, {
        duration: 2000,
        horizontalPosition: 'center',
      });
    }
    /*  if (username.trim() === 'Admin@as' && password.trim() === 'Entact123') {
        return true;
      } else {
         return false;
       }*/
  }
}
