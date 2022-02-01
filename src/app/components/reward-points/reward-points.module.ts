import { NgModule } from '@angular/core';

import { RewardPointsRoutingModule } from './reward-points-routing.module';
import { RewardPointsComponent } from './reward-points.component';
import { ManageRewardPointsUsersComponent } from '../RewardPoints/manage-reward-points-users/manage-reward-points-users.component';
import { RewardPointsActivitiesComponent } from '../RewardPoints/reward-points-activities/reward-points-activities.component';
import { AddRewardPointsUserComponent } from '../RewardPoints/add-reward-points-user/add-reward-points-user.component';
import { RewardPointsSettingsComponent } from '../setting/reward-points-settings/reward-points-settings.component';
import { LoyaltyModule } from '../loyalty/loyalty.module';


@NgModule({
  declarations: [
    RewardPointsComponent,
    ManageRewardPointsUsersComponent,
    RewardPointsActivitiesComponent,

    AddRewardPointsUserComponent,

    RewardPointsSettingsComponent,
  ],
  imports: [
    RewardPointsRoutingModule,

    LoyaltyModule,
  ],
  entryComponents:[
    AddRewardPointsUserComponent,
  ]
})
export class RewardPointsModule { }
