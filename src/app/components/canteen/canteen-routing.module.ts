import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/AuthGuardService';
import { Constants } from 'src/app/models/constants';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { CanteenComponent } from './canteen.component';
import { CanteenConfigurationsComponent } from '../canteen-configurations/canteen-configurations.component';

const routes: Routes = [
  { path: '', component: CanteenComponent },
  { path: Constants.USER_PROFILE, component: UserProfileComponent ,canActivate:[AuthGuardService]},
   { path: "/canteen-configurations", component: CanteenConfigurationsComponent ,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }
