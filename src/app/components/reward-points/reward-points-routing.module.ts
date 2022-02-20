import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/AuthGuardService';
import { Constants } from 'src/app/models/constants';
import { RewardPointsSettingsComponent } from '../setting/reward-points-settings/reward-points-settings.component';
import { RewardPointsComponent } from './reward-points.component';

const routes: Routes = [
  { path: '', component: RewardPointsComponent },
  { path: Constants.REWORD_PORINTS_SETTINGS, component: RewardPointsSettingsComponent ,canActivate:[AuthGuardService]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardPointsRoutingModule { }
