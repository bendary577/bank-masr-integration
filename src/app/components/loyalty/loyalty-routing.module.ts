import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/AuthGuardService';
import { Constants } from 'src/app/models/constants';
import { ActivitiesComponent } from '../activities/activities.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { LoyaltyComponent } from './loyalty.component';

const routes: Routes = [
  { path: '', component: LoyaltyComponent },
  { path: Constants.MANAGE_USERS, component: ManageUsersComponent ,canActivate:[AuthGuardService]},
  { path: Constants.USER_PROFILE, component: UserProfileComponent ,canActivate:[AuthGuardService]},
  { path: Constants.MANAGE_ACTIVITIES, component: ActivitiesComponent ,canActivate:[AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule { }
