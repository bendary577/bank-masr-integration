import { NgModule } from '@angular/core';

import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyComponent } from './loyalty.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ActivitiesComponent } from '../activities/activities.component';
import { ManageUsersComponent } from '../manage-users/manage-users.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';
import { ManageGroupsComponent } from '../manage-groups/manage-groups.component';
import { BasicModule } from 'src/app/shared/basic.module';
import { AddAppCompanyComponent } from '../add-app-company/add-app-company.component';
import { AddAppGroupComponent } from '../add-app-group/add-app-group.component';
import { AddAppUserComponent } from '../add-app-user/add-app-user.component';
import { DialogComponent } from '../dialog/dialog.component';
import { DeleteAppGroupComponent } from '../delete-app-group/delete-app-group.component';
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component';
import { AddVoucherDialogComponent } from '../add-voucher-dialog/add-voucher-dialog.component';
import { ExtendExpiryDateComponent } from '../extend-expiry-date/extend-expiry-date.component';
import { ApplicationModule } from 'src/app/shared/application.module';
import { AddAppUserAccompiedComponent } from '../add-app-user-accompied/add-app-user-accompied.component';
import { UserProfileComponent } from '../user-profile/user-profile.component';
import { NgxPrintModule } from 'ngx-print';
import { ViewReceiptComponent } from '../view-receipt/view-receipt.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { CanteenConfigurationsComponent } from '../canteen-configurations/canteen-configurations.component';

@NgModule({
  declarations: [
    LoyaltyComponent,
    ActivitiesComponent,
    ManageUsersComponent,
    AddAppUserAccompiedComponent,
    ManageGroupsComponent,
    UserProfileComponent,
    ViewReceiptComponent,
    CanteenConfigurationsComponent,

  ],
  imports: [
    LoyaltyRoutingModule,
    BasicModule,
    SharedModule,
    ApplicationModule,
    AngularMaterialModule,
    MatProgressSpinnerModule,
    NgxPrintModule
  ],
  exports:[
    ManageGroupsComponent,
    BasicModule,
    SharedModule,
    ApplicationModule,
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
