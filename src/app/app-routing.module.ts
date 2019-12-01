import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from './models/constants';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './guards/AuthGuardService';


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full' },
  { path: Constants.HOME_PAGE, component: HomeComponent },
  { path: Constants.LOGIN_PAGE, component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
