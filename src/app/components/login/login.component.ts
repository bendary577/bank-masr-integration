import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Constants } from 'src/app/models/constants';
import { MatSnackBar } from '@angular/material';
import { SidenavResponsive } from "../sidenav/sidenav-responsive";
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

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
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
    this.side.shouldRun = false;
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
      this.authenticationService.login().toPromise().then((res: any) => {
        console.log(res.items);
        this.spinner.hide();
        this.loading = false;

        this.router.navigate([Constants.TABS_PAGE]);
        this.side.setshouldRun(true);


        console.log(this.side.getshouldRun);
        return true
      }).catch(err => {
        if (username.trim() === 'Admin@test.com' && password.trim() === 'Yazyad123') {
          this.spinner.hide();
          this.loading = false;

          this.router.navigate([Constants.SUPPLIERS_PAGE]);
          this.side.setshouldRun(true);

          return true;

        } else {
          this.spinner.hide();
          this.loading = false;

          this.snackBar.open('Wrong Credentials.', null, {
            duration: 2000,
            horizontalPosition: 'center',
          });
        }

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
