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
import { AddAppCompanyComponent } from '../add-app-company/add-app-company.component';
import { AddAppGroupComponent } from '../add-app-group/add-app-group.component';
import { AddAppUserComponent } from '../add-app-user/add-app-user.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DeleteAppGroupComponent } from '../delete-app-group/delete-app-group.component';
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component';
import { AddVoucherDialogComponent } from '../add-voucher-dialog/add-voucher-dialog.component';
import { ExtendExpiryDateComponent } from '../extend-expiry-date/extend-expiry-date.component';


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
  ],
  entryComponents: [
    // ==> Loyalty
    AddAppCompanyComponent,
    AddAppGroupComponent,
    AddAppUserComponent,
    DialogComponent,
    DeleteAppGroupComponent,
    EditWalletComponent,
    ExtendExpiryDateComponent,
    AddVoucherDialogComponent,
  ]

})
export class LoyaltyModule { }
