import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { LoginComponent } from './components/login/login.component';
import { ConfigurationComponent } from './components/setting/configuration/configuration.component';
import { Constants } from './models/constants';


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full'},
  {
    path: Constants.SETTING, component: ConfigurationComponent ,
  },
  { path: Constants.LOGIN_PAGE, component: LoginComponent },

  // ==> Modules
  // Loyalty Views
  { path: Constants.GET_LOYALTY_PAGE, loadChildren: () => import('./components/loyalty/loyalty.module').then(m => m.LoyaltyModule) },
  { path: Constants.GET_WALLET_PAGE, loadChildren: () => import('./components/loyalty/loyalty.module').then(m => m.LoyaltyModule) },
  { path: Constants.GET_VOUCHER_PAGE, loadChildren: () => import('./components/loyalty/loyalty.module').then(m => m.LoyaltyModule) },

  { path: 'rewardPoints', loadChildren: () => import('./components/reward-points/reward-points.module').then(m => m.RewardPointsModule) },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },

  // Error Page
  {path:'**', component: ErrorComponentComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
