import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CanteenRoutingModule } from './canteen-routing.module'
import { CanteenComponent } from './canteen.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { AngularMaterialModule } from 'src/app/angular-material.module'
import { BasicModule } from 'src/app/shared/basic.module'
import { AddAppCompanyComponent } from '../add-app-company/add-app-company.component'
import { AddAppGroupComponent } from '../add-app-group/add-app-group.component'
import { AddAppUserComponent } from '../add-app-user/add-app-user.component'
import { DialogComponent } from '../dialog/dialog.component'
import { DeleteAppGroupComponent } from '../delete-app-group/delete-app-group.component'
import { EditWalletComponent } from '../edit-wallet/edit-wallet.component'
import { ApplicationModule } from 'src/app/shared/application.module'
import { NgxPrintModule } from 'ngx-print'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { CanteenManageUsersComponentComponent } from '../canteen-manage-users-component/canteen-manage-users-component.component'
import { CanteenActivitiesComponentComponent } from '../canteen-activities-component/canteen-activities-component.component'
import { CanteenAddAppUserAccompiedComponentComponent } from '../canteen-add-app-user-accompied-component/canteen-add-app-user-accompied-component.component'
import { CanteenManageGroupsComponentComponent } from '../canteen-manage-groups-component/canteen-manage-groups-component.component'
import { CanteenUserProfileComponentComponent } from '../canteen-user-profile-component/canteen-user-profile-component.component'
import { CanteenConfigurationsComponentComponent } from '../canteen-configurations-component/canteen-configurations-component.component'
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    CanteenComponent,
    CanteenManageUsersComponentComponent,
    CanteenActivitiesComponentComponent,
    CanteenAddAppUserAccompiedComponentComponent,
    CanteenManageGroupsComponentComponent,
    CanteenUserProfileComponentComponent,
    CanteenConfigurationsComponentComponent,
  ],
  imports: [
    CanteenRoutingModule,
    BasicModule,
    SharedModule,
    ApplicationModule,
    AngularMaterialModule,
    MatProgressSpinnerModule,
    NgxPrintModule,
    MatCheckboxModule
  ],
  exports: [
    CanteenManageGroupsComponentComponent,
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
  ],
})
export class CanteenModule {}
