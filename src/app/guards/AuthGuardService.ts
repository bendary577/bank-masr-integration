import { Injectable } from "@angular/core";
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { AuthService } from "../services/auth/auth.service";
import { SideNaveComponent } from "../components/side-nave/side-nave.component";

@Injectable()
export class AuthGuardService implements CanActivate {
  auth_service: AuthService;
  routerd: Router;
  side: SideNaveComponent;
  constructor(private router: Router, auth_service: AuthService) {
    this.routerd = router;
    this.auth_service = auth_service;
  }

  async requireLogin() {
    /*    return await new Promise(async (res, rej) => {
    await this.angularfireAuth.authState.subscribe(user => {

      if(!user || !user.uid) {
        this.router.navigate(['']);
        return false;
      }
      res(true);
    },error1 => {sid
      rej(false);
    })
    }) as boolean;*/
    this.routerd.navigate(["/"]);
    return false;
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (localStorage.getItem("auth_token")) {
      return true;
      // return await  this.auth_service.checkToken().toPromise().then((res: any) => {
      //     let url =route.pathFromRoot
      //       .map(v => v.url.map(segment => segment.tostring()).join('/'))
      //       .join('/');

      //     return true;

      //   }).catch((error: any) => {
      //     localStorage.setItem('token', '');
      //     localStorage.setItem('user', '');
      //   this.routerd.navigate(["/"]);
      //     return true;
      //   });
    } else {
      this.routerd.navigate(["/"]);
      return false;
    }
  }
}
