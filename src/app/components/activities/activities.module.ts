import { NgModule } from '@angular/core';

import { ActivitiesRoutingModule } from './activities-routing.module';
import { ActivitiesComponent } from './activities.component';

@NgModule({
  declarations: [
    ActivitiesComponent
  ],
  imports: [
    ActivitiesRoutingModule,
  ]
})
export class ActivitiesModule { }
