import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Constants } from 'src/app/models/constants';
import { MatSnackBar } from '@angular/material';

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

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService, public snackBar: MatSnackBar
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required,Validators.email],
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
    if (!this.isValid()) {
      this.snackBar.open('Wrong Credentials.', null, {
        duration: 2000,
        horizontalPosition: 'center',
      });
      return;
    }

    this.router.navigate([Constants.TABS_PAGE]);
  }


  isValid() {
    const username = this.loginForm.controls.username.value as string;
    const password = this.loginForm.controls.password.value as string;
    const domainName= username.split("@");
    if(domainName.length>0)
    if (username.trim() === 'Admin' && password.trim() === 'Entact123') {
      return true;
    } else {
       return false;
     }
  }
}
