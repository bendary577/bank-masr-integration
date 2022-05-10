import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/AuthGuardService';
import { Constants } from 'src/app/models/constants';
import { CanteenUserProfileComponentComponent } from '../canteen-user-profile-component/canteen-user-profile-component.component';
import { CanteenComponent } from './canteen.component';
import { CanteenConfigurationsComponent } from '../canteen-configurations/canteen-configurations.component';

const routes: Routes = [
  { path: '', component: CanteenComponent },
  { path: Constants.USER_PROFILE, component: CanteenUserProfileComponentComponent ,canActivate:[AuthGuardService]},
   { path: "/canteen-configurations", component: CanteenConfigurationsComponent ,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CanteenRoutingModule { }
