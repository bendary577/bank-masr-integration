import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Constants } from '../models/constants';


@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private router: Router) { }


  async requireLogin() {
    // return await new Promise(async (res, rej) => {
    // await this.angularfireAuth.authState.subscribe(user => {
    //   Logger.info({
    //     message:'require login function',
    //     params:user
    //   });

    //   if(!user || !user.uid){
    //     this.router.navigate(['']);
    //     return false;
    //   }
    //   res(true);
    // },error1 => {
    //   rej(false);
    // })
    // }) as boolean;
    this.router.navigate([Constants.LOGIN_PAGE]);
    return false;
  }

  async canActivate(route: ActivatedRouteSnapshot) {
    return await this.requireLogin();
  }

}
