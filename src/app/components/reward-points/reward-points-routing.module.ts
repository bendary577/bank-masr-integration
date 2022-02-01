import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RewardPointsComponent } from './reward-points.component';

const routes: Routes = [{ path: '', component: RewardPointsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RewardPointsRoutingModule { }
