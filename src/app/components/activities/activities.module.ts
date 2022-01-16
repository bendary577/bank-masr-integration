import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    CommonModule,
    ActivitiesRoutingModule,
    ChartsModule,
    SharedModule,
  ]
})
export class ActivitiesModule { }
