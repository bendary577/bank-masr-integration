import { NgModule } from '@angular/core';

import { AdminsRoutingModule } from './admins-routing.module';
import { AdminsComponent } from './admins.component';
import { AddUserComponent } from '../../add-vendor/add-vendor.component';
import { ViewUserComponent } from '../../view-user/view-user.component';
import { BasicModule } from 'src/app/shared/basic.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';


@NgModule({
  declarations: [
    AdminsComponent,

    AddUserComponent,
    ViewUserComponent,
  ],
  imports: [
    BasicModule,
    SharedModule,
    AngularMaterialModule,

    AdminsRoutingModule
  ]
})
export class AdminsModule { }
