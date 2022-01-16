import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { AngularMaterialModule } from './angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthService } from './services/auth/auth.service'
import { InvoiceService } from './services/invoice/invoice.service'
import { HttpModule } from '@angular/http'
import { AlertsService } from 'angular-alert-module'
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component'
import { SchedulerConfigurationComponent } from './components/scheduler-configuration/scheduler-configuration.component'
import { AuthGuardService } from './guards/AuthGuardService'

import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AddAccountComponent } from './components/add-account/add-account.component'
import { AddUserComponent } from './components/add-vendor/add-vendor.component'
import { Data } from './models/data'
import { AddMajorGroupComponent } from './components/addMajorGroup/add-major-group.component'
import { AddTenderComponent } from './components/add-tender/add-tender.component'
import { AddTaxComponent } from './components/add-tax/add-tax.component'
import { ExcelService } from './services/excel/excel.service'
import { CsvService } from './services/csv/csv.service'
import { AddDiscountComponent } from './components/add-discount/add-discount.component'
import { AddRevenueCenterComponent } from './components/add-revenue-center/add-revenue-center.component'
import { AddServiceChargeComponent } from './components/add-service-charge/add-service-charge.component'
import { AddTenderChildComponent } from './components/add-tender-child/add-tender-child.component'
import { AddSimphonyLocationComponent } from './components/add-simphony-location/add-simphony-location.component'
import { AddWebServiceInvokerComponent } from './components/add-web-service-invoker/add-web-service-invoker.component'
import { AddLocationComponent } from './components/add-location/add-location.component'
import { AddMajorGroupChildComponent } from './components/addMajorGroupChild/add-major-group-child.component'
import { DriveService } from './services/drive/drive.service'
import { OperationService } from './services/operation/operation.service'
import { AddSalesStatisticsComponent } from './components/add-sales-statistics/add-sales-statistics.component'
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component'
import { AddAppCompanyComponent } from './components/add-app-company/add-app-company.component'
import { AddAppGroupComponent } from './components/add-app-group/add-app-group.component'
import { AddAppUserComponent } from './components/add-app-user/add-app-user.component'
import { DialogComponent } from './components/dialog/dialog.component'
import { NgxJsonViewerModule } from 'ngx-json-viewer'
import { ConsumptionMajorGroupChildComponent } from './components/consumption-major-group-child/consumption-major-group-child.component'
import { DeleteAppGroupComponent } from './components/delete-app-group/delete-app-group.component'
import { AddConsumptionLocationComponent } from './components/add-consumption-location/add-consumption-location.component'
import { AddConsumptionLocationItemsComponent } from './components/add-consumption-location-items/add-consumption-location-items.component'
import { AngularDropdownModule } from 'angular-dropdown'
import { NgWormholeModule } from 'ng-wormhole'
import { EditWalletComponent } from './components/edit-wallet/edit-wallet.component'
import { ToastrModule } from 'ngx-toastr'
import { SideNaveComponent } from './components/side-nave/side-nave.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material'
import { ViewUserComponent } from './components/view-user/view-user.component'
import { ExtendExpiryDateComponent } from './components/extend-expiry-date/extend-expiry-date.component';
import { ViewInvokerComponent } from './components/view-invoker/view-invoker.component';
import { AddVoucherDialogComponent } from './components/add-voucher-dialog/add-voucher-dialog.component'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { SharedModule } from './shared/shared.module';
import { BasicModule } from './shared/basic.module'

@NgModule({
  declarations: [
    AppComponent,
    SideNaveComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    BrowserAnimationsModule,

    BasicModule,
    SharedModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService,
    AuthService,
    InvoiceService,
    AlertsService,
    Data,
    AuthGuardService,
    SideNaveComponent,
    NavBarComponent,
    ExcelService,
    CsvService,
    OperationService,
    DriveService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddUserComponent,
    ViewUserComponent,
    AddAccountComponent,
    AddMajorGroupComponent,
    ConsumptionMajorGroupChildComponent,
    AddTenderComponent,
    AddTaxComponent,
    AddDiscountComponent,
    AddRevenueCenterComponent,
    AddServiceChargeComponent,
    SuppliersConfiguartionComponent,
    SchedulerConfigurationComponent,
    AddTenderChildComponent,
    AddSimphonyLocationComponent,
    AddWebServiceInvokerComponent,
    ViewInvokerComponent,
    AddLocationComponent,
    AddMajorGroupChildComponent,
    AddSalesStatisticsComponent,
    AddSupplierComponent,
    DriveService,

    // ==> Consumption Sync Job Type
    AddConsumptionLocationComponent,
    AddConsumptionLocationItemsComponent,

    // ==> Loyalty
    AddAppCompanyComponent,
    AddAppGroupComponent,
    AddAppUserComponent,
    DialogComponent,
    DeleteAppGroupComponent,
    EditWalletComponent,
    ExtendExpiryDateComponent,
    AddVoucherDialogComponent,
    ConfirmationDialogComponent
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
