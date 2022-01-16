import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyComponent } from './loyalty.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ChartsModule } from 'ng2-charts';
import { ActivitiesComponent } from '../activities/activities.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ManageGroupsComponent } from '../manage-groups/manage-groups.component';
import { MatTabsModule } from '@angular/material';
import { BasicModule } from 'src/app/shared/basic.module';


@NgModule({
  declarations: [
    LoyaltyComponent,
    ActivitiesComponent,
    ManageUsersComponent,
    ManageGroupsComponent
  ],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    MatTabsModule,
    ChartsModule,
    BasicModule,
    SharedModule,
    AngularMaterialModule,
  ]
})
export class LoyaltyModule { }
