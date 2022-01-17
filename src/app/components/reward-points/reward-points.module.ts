import { NgModule } from '@angular/core';

import { RewardPointsRoutingModule } from './reward-points-routing.module';
import { RewardPointsComponent } from './reward-points.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ManageRewardPointsUsersComponent } from '../RewardPoints/manage-reward-points-users/manage-reward-points-users.component';
import { RewardPointsActivitiesComponent } from '../RewardPoints/reward-points-activities/reward-points-activities.component';
import { AddRewardPointsUserComponent } from '../RewardPoints/add-reward-points-user/add-reward-points-user.component';
import { RewardPointsSettingsComponent } from '../setting/reward-points-settings/reward-points-settings.component';
import { BasicModule } from 'src/app/shared/basic.module';
import { ApplicationModule } from 'src/app/shared/application.module';


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

    BasicModule,
    SharedModule,
    ApplicationModule,
    AngularMaterialModule,
  ],
  entryComponents:[
    AddRewardPointsUserComponent,
  ]
})
export class RewardPointsModule { }
