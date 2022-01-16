import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyComponent } from './loyalty.component';

const routes: Routes = [{ path: '', component: LoyaltyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltyRoutingModule { }
