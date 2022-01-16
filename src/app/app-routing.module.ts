import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { ConfigurationComponent } from './components/setting/configuration/configuration.component';
import { Constants } from './models/constants';


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full'},
  {
    path: Constants.SETTING, component: ConfigurationComponent ,
    children: []
  },
  
  // ==> Modules
  // Loyalty Views
  { path: Constants.GET_LOYALTY_PAGE, loadChildren: () => import('./components/loyalty/loyalty.module').then(m => m.LoyaltyModule) },
  { path: Constants.GET_WALLET_PAGE, loadChildren: () => import('./components/loyalty/loyalty.module').then(m => m.LoyaltyModule) },
  { path: Constants.GET_VOUCHER_PAGE, loadChildren: () => import('./components/loyalty/loyalty.module').then(m => m.LoyaltyModule) },

  { path: 'rewardPoints', loadChildren: () => import('./components/reward-points/reward-points.module').then(m => m.RewardPointsModule) },
  { path: Constants.LOGIN_PAGE, loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule) },
  { path: 'main', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },

  // Error Page
  {path:'**', component: ErrorComponentComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
