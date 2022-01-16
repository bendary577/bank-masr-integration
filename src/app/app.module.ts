import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LoginComponent } from './components/login/login.component'
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { CookieService } from 'ngx-cookie-service'
import { AngularMaterialModule } from './angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgxDatatableModule } from '@swimlane/ngx-datatable'
import { NgxSpinnerModule } from 'ngx-spinner'
import { SuppliersComponent } from './components/suppliers/suppliers.component'

import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatFormFieldModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatRippleModule,
  MatProgressBarModule,
  MatMenuModule,
  MatBadgeModule,
} from '@angular/material'
import { SidenavResponsive } from './components/sidenav/sidenav-responsive'
import { ConfigurationComponent } from './components/setting/configuration/configuration.component'
import { MatExpansionModule } from '@angular/material/expansion'
import { UsersComponent } from './components/setting/users/users.component'
import { AuthService } from './services/auth/auth.service'
import { InvoiceService } from './services/invoice/invoice.service'
import { HttpModule } from '@angular/http'
import { AlertsService } from 'angular-alert-module'
import { SyncJobsconfigComponent } from './components/setting/syncJob/syncJobsconfig.component'
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component'
import { SchedulerConfigurationComponent } from './components/scheduler-configuration/scheduler-configuration.component'
import { BookedTransferDetailsComponent } from './components/booked-transfer-details/booked-transfer-details.component'
import { ErrorComponentComponent } from './components/error-component/error-component.component'
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component'
import { AuthGuardService } from './guards/AuthGuardService'
import { PosSalesComponent } from './components/pos-sales/pos-sales.component'

import { HashLocationStrategy, LocationStrategy } from '@angular/common'
import { AddAccountComponent } from './components/add-account/add-account.component'
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component'
import { ApprovedInvoiceInforConfigurationComponent } from './components/approved-invoice-infor-configuration/approved-invoice-infor-configuration.component'
import { JournalsInforConfigurationsComponent } from './components/journals-infor-configurations/journals-infor-configurations.component'
import { SuppliersInforConfigurationComponent } from './components/suppliers-infor-configuration/suppliers-infor-configuration.component'
import { BookedTransferInforComponent } from './components/booked-transfer-infor/booked-transfer-infor.component'
import { BookedTransferInforConfigurationComponent } from './components/booked-transfer-infor-configuration/booked-transfer-infor-configuration.component'
import { JournalInforComponent } from './components/journal-infor/journal-infor.component'
import { ApprovedInvoicesInforComponent } from './components/approved-invoices-infor/approved-invoices-infor.component'
import { CreditNotesInforComponent } from './components/credit-notes-infor/credit-notes-infor.component'
import { CostCenterLocationMappingComponent } from './components/setting/cost-center-location-mapping/cost-center-location-mapping.component'
import { PosSalesConfigurationComponent } from './components/pos-sales-configuration/pos-sales-configuration.component'
import { WastageInforComponent } from './components/wastage-infor/wastage-infor.component'
import { WastageInforConfigurationComponent } from './components/wastage-infor-configuration/wastage-infor-configuration.component'
import { CreditNotesInforConfigurationComponent } from './components/credit-notes-infor-configuration/credit-notes-infor-configuration.component'
import { BasicConfiguartionsComponent } from './components/basic-configuartions/basic-configuartions.component'
import { IncludedOverGroupsComponent } from './components/setting/included-over-groups/included-over-groups.component'
import { CostCenterAccountMappingComponent } from './components/setting/cost-center-account-mapping/cost-center-account-mapping.component'
import { AddUserComponent } from './components/add-vendor/add-vendor.component'
import { Data } from './models/data'
import { PosSalesInforComponent } from './components/pos-sales-infor/pos-sales-infor.component'
import { PosSalesInforConfigurationComponent } from './components/pos-sales-infor-configuration/pos-sales-infor-configuration.component'
import { AddMajorGroupComponent } from './components/addMajorGroup/add-major-group.component'
import { AddTenderComponent } from './components/add-tender/add-tender.component'
import { BookedProductionComponent } from './components/BookedProduction/booked-production/booked-production.component'
import { BookedProductionConfigurationComponent } from './components/BookedProductionConfiguration/booked-production-configuration/booked-production-configuration.component'
import { AddTaxComponent } from './components/add-tax/add-tax.component'
import { ExcelService } from './services/excel/excel.service'
import { CsvService } from './services/csv/csv.service'
import { AddDiscountComponent } from './components/add-discount/add-discount.component'
import { AddRevenueCenterComponent } from './components/add-revenue-center/add-revenue-center.component'
import { AddServiceChargeComponent } from './components/add-service-charge/add-service-charge.component'
import { AnalysisConfigurationComponent } from './components/configuration/analysis-configuration/analysis-configuration.component'
import { InforSystemConfigurationComponent } from './components/configuration/infor-system-configuration/infor-system-configuration.component'
import { TenderConfigurationComponent } from './components/configuration/tender-configuration/tender-configuration.component'
import { AddTenderChildComponent } from './components/add-tender-child/add-tender-child.component'
import { MenuItemsComponent } from './components/menu-items/menu-items.component'
import { MenuItemsConfigurationComponent } from './components/menu-items-configuration/menu-items-configuration.component'
import { AddSimphonyLocationComponent } from './components/add-simphony-location/add-simphony-location.component'
import { SimphonyLocationConfigurationComponent } from './components/configuration/simphony-location-configuration/simphony-location-configuration.component'
import { WebServiceInvokerConfigurationComponent } from './components/configuration/web-service-invoker-configuration/web-service-invoker-configuration.component'
import { AddWebServiceInvokerComponent } from './components/add-web-service-invoker/add-web-service-invoker.component'
import { AddLocationComponent } from './components/add-location/add-location.component'
import { OperationTypesConfigurationComponent } from './components/setting/operation-types-configuration/operation-types-configuration.component'
import { CreateOrderConfigComponent } from './components/create-order-config/create-order-config.component'
import { AddMajorGroupChildComponent } from './components/addMajorGroupChild/add-major-group-child.component'
import { SyncExportedFilesComponent } from './components/sync-exported-files/sync-exported-files.component'
import { ZealPaymentComponent } from './components/zeal-payment/zeal-payment.component'
import { ZealPaymentConfigComponent } from './components/zeal-payment-config/zeal-payment-config.component'
import { ZealVoucherComponent } from './components/zeal-voucher/zeal-voucher.component'
import { PaymentVoucherConfigComponent } from './components/payment-voucher-config/payment-voucher-config.component'
import { ZealVoucherConfigComponent } from './components/zeal-voucher-config/zeal-voucher-config.component'
import { DriveService } from './services/drive/drive.service'
import { ZealPaymentService } from './services/zealPayment/zeal-payment.service'
import { OperationService } from './services/operation/operation.service'
import { OhraConfigurationComponent } from './components/configuration/ohra-configuration/ohra-configuration.component'
import { AddSalesStatisticsComponent } from './components/add-sales-statistics/add-sales-statistics.component'
import { OperaPaymentConfigurationComponent } from './components/opera-payment-configuration/opera-payment-configuration.component'
import { SupplierMappingComponent } from './components/setting/supllier-mapping/supllier-mapping.component'
import { AddSupplierComponent } from './components/add-supplier/add-supplier.component'
import { ExportedFileConfigurationComponent } from './components/configuration/exported-file-configuration/exported-file-configuration.component'
import { CreateOrderComponent } from './components/create-order/create-order.component'
import { ManageGroupsComponent } from './components/manage-groups/manage-groups.component'
import { ManageUsersComponent } from './components/manage-users/manage-users.component'
import { LoyaltyComponent } from './components/loyalty/loyalty.component'
import { AddAppCompanyComponent } from './components/add-app-company/add-app-company.component'
import { AddAppGroupComponent } from './components/add-app-group/add-app-group.component'
import { AddAppUserComponent } from './components/add-app-user/add-app-user.component'
import { ActivitiesComponent } from './components/activities/activities.component'
import { WlsIntegrationConfigComponent } from './components/wls-integration-config/wls-integration-config.component'
import { WlsIntegrationComponent } from './components/wls-integration/wls-integration.component'
import { DialogComponent } from './components/dialog/dialog.component'
import { NgxJsonViewerModule } from 'ngx-json-viewer'
import { NewBookingReportComponent } from './components/new-booking-report/new-booking-report.component'
import { CancelBookingReportComponent } from './components/cancel-booking-report/cancel-booking-report.component'
import { OccupancyUpdateReportComponent } from './components/occupancy-update-report/occupancy-update-report.component'
import { NewBookingReportConfigComponent } from './components/new-booking-report-config/new-booking-report-config.component'
import { CancelBookingReportConfigComponent } from './components/cancel-booking-report-config/cancel-booking-report-config.component'
import { OccupancyUpdateReportConfigComponent } from './components/occupancy-update-report-config/occupancy-update-report-config.component'
import { OperaReportMapTablesComponent } from './components/setting/opera-report-map-tables/opera-report-map-tables.component'
import { OperaBookingDashBoardComponent } from './components/opera-booking-dash-board/opera-booking-dash-board.component'
import { ExpensesDetailsReportComponent } from './components/expenses-details-report/expenses-details-report.component'
import { ExpensesDetailsReportConfigComponent } from './components/expenses-details-report-config/expenses-details-report-config.component'
import { ConsumptionMajorGroupChildComponent } from './components/consumption-major-group-child/consumption-major-group-child.component'
import { ManageSubGroupComponent } from './components/manage-sub-group/manage-sub-group.component'
import { SimphonyDiscountMapingComponent } from './components/simphony-discount-maping/simphony-discount-maping.component'
import { CostOfGoodsComponent } from './components/cost-of-goods/cost-of-goods.component'
import { CostOfGoodsConfigComponent } from './components/cost-of-goods-config/cost-of-goods-config.component'
import { DeleteAppGroupComponent } from './components/delete-app-group/delete-app-group.component'
import { AddConsumptionLocationComponent } from './components/add-consumption-location/add-consumption-location.component'
import { AddConsumptionLocationItemsComponent } from './components/add-consumption-location-items/add-consumption-location-items.component'
import { AmazonComponent } from './components/amazon/amazon.component'
import { HotelOpiComponent } from './components/hotel-opi/hotel-opi.component'
import { OpiActivitiesComponent } from './components/opi-activities/opi-activities.component'
import { OpiTransactionsComponent } from './components/opi-transactions/opi-transactions.component'
import { OperaPaymentsComponent } from './components/operations/opera-payments/opera-payments.component'
import { ChartsModule } from 'ng2-charts'
import { AngularDropdownModule } from 'angular-dropdown'
import { NgWormholeModule } from 'ng-wormhole'
import { FilterComponent } from './components/filter/filter.component'
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { EditWalletComponent } from './components/edit-wallet/edit-wallet.component'
import { ToastrModule } from 'ngx-toastr'
import { GestCardsComponent } from './components/gest-cards/gest-cards.component'
import { AddAppUserAccompiedComponent } from './components/add-app-user-accompied/add-app-user-accompied.component'
import { SideNaveComponent } from './components/side-nave/side-nave.component'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { SupportComponent } from './components/support/support.component'
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material'
import { PosMachineMappingComponent } from './components/setting/pos-machine-mapping/pos-machine-mapping.component'
import { TestPaginationComponent } from './components/test-pagination/test-pagination.component'
import { SimphonyPaymentComponent } from './components/operations/simphony-payment/simphony-payment.component'
import { RewardPointsSettingsComponent } from './components/setting/reward-points-settings/reward-points-settings.component'
import { SimphonyCheckComponent } from './components/simphony-check/simphony-check.component'
import { SimphonyCheckConfigurationComponent } from './components/simphony-check-configuration/simphony-check-configuration.component'
import { ViewUserComponent } from './components/view-user/view-user.component'
import { TaxAnalysisConfigrutionComponent } from './components/configuration/tax-analysis-configrution/tax-analysis-configrution.component'
import { RevenueByAgentComponent } from './components/Reports/revenue-by-agent/revenue-by-agent.component'
import { CostOfGoodsOhraConfigComponent } from './components/cost-of-goods-ohra-config/cost-of-goods-ohra-config.component'
import { ExtendExpiryDateComponent } from './components/extend-expiry-date/extend-expiry-date.component';
import { ViewInvokerComponent } from './components/view-invoker/view-invoker.component';
import { VoucherListComponent } from './components/voucher-list/voucher-list.component'
import { RewardPointsComponent } from './components/reward-points/reward-points.component';
import { ManageRewardPointsUsersComponent } from './components/RewardPoints/manage-reward-points-users/manage-reward-points-users.component';
import { AddRewardPointsUserComponent } from './components/RewardPoints/add-reward-points-user/add-reward-points-user.component';
import { RewardPointsActivitiesComponent } from './components/RewardPoints/reward-points-activities/reward-points-activities.component';
import { AddVoucherDialogComponent } from './components/add-voucher-dialog/add-voucher-dialog.component'
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component'
import { VoucherTransactionsComponent } from './components/voucher-transactions/voucher-transactions.component'

@NgModule({
  declarations: [
    GestCardsComponent,
    AppComponent,
    LoginComponent,
    SuppliersComponent,
    SidenavResponsive,
    ConfigurationComponent,
    UsersComponent,
    SyncJobsconfigComponent,
    AddUserComponent,
    SuppliersConfiguartionComponent,
    SchedulerConfigurationComponent,
    BookedTransferDetailsComponent,
    ErrorComponentComponent,
    SupplierDetailsComponent,
    PosSalesComponent,
    WelcomePageComponent,
    PosSalesConfigurationComponent,
    AddAccountComponent,
    ApprovedInvoiceInforConfigurationComponent,
    JournalsInforConfigurationsComponent,
    SuppliersInforConfigurationComponent,
    BookedTransferInforComponent,
    BookedTransferInforConfigurationComponent,
    JournalInforComponent,
    JournalsInforConfigurationsComponent,
    ApprovedInvoicesInforComponent,
    CreditNotesInforComponent,
    AddAccountComponent,
    CostCenterLocationMappingComponent,
    WastageInforComponent,
    WastageInforConfigurationComponent,
    CreditNotesInforConfigurationComponent,
    BasicConfiguartionsComponent,
    IncludedOverGroupsComponent,
    CostCenterAccountMappingComponent,
    PosSalesInforComponent,
    PosSalesInforConfigurationComponent,
    AddMajorGroupComponent,
    ConsumptionMajorGroupChildComponent,
    AddTenderComponent,
    BookedProductionComponent,
    BookedProductionConfigurationComponent,
    AddTaxComponent,
    AddDiscountComponent,
    AddRevenueCenterComponent,
    AddServiceChargeComponent,
    AnalysisConfigurationComponent,
    InforSystemConfigurationComponent,
    TaxAnalysisConfigrutionComponent,
    TenderConfigurationComponent,
    AddTenderChildComponent,
    MenuItemsComponent,
    MenuItemsConfigurationComponent,
    AddSimphonyLocationComponent,
    SimphonyLocationConfigurationComponent,
    WebServiceInvokerConfigurationComponent,
    AddWebServiceInvokerComponent,
    AddLocationComponent,
    OperationTypesConfigurationComponent,
    CreateOrderConfigComponent,
    CreateOrderComponent,
    AddMajorGroupChildComponent,
    SyncExportedFilesComponent,
    ZealPaymentComponent,
    ZealPaymentConfigComponent,
    ZealVoucherComponent,
    PaymentVoucherConfigComponent,
    ZealVoucherConfigComponent,
    OhraConfigurationComponent,
    CostOfGoodsOhraConfigComponent,
    AddSalesStatisticsComponent,
    OperaPaymentConfigurationComponent,
    SupplierMappingComponent,
    AddSupplierComponent,
    ExportedFileConfigurationComponent,
    ManageGroupsComponent,
    ManageUsersComponent,
    ManageSubGroupComponent,
    LoyaltyComponent,
    AddAppCompanyComponent,
    AddAppGroupComponent,
    AddAppUserComponent,
    AddAppUserAccompiedComponent,
    DeleteAppGroupComponent,
    ActivitiesComponent,
    TestPaginationComponent,
    WlsIntegrationConfigComponent,
    WlsIntegrationComponent,
    DialogComponent,
    NewBookingReportComponent,
    CancelBookingReportComponent,
    OccupancyUpdateReportComponent,
    NewBookingReportConfigComponent,
    CancelBookingReportConfigComponent,
    OccupancyUpdateReportConfigComponent,
    OperaReportMapTablesComponent,
    OperaBookingDashBoardComponent,
    ExpensesDetailsReportComponent,
    ExpensesDetailsReportConfigComponent,
    SimphonyDiscountMapingComponent,
    CostOfGoodsComponent,
    CostOfGoodsConfigComponent,
    AddConsumptionLocationComponent,
    AddConsumptionLocationItemsComponent,
    AmazonComponent,
    HotelOpiComponent,
    OpiActivitiesComponent,
    OpiTransactionsComponent,
    OperaPaymentsComponent,
    FilterComponent,
    UserProfileComponent,
    EditWalletComponent,
    SideNaveComponent,
    NavBarComponent,
    SupportComponent,
    PosMachineMappingComponent,
    SimphonyPaymentComponent,
    SimphonyCheckComponent,
    SimphonyCheckConfigurationComponent,
    RewardPointsSettingsComponent,
    ViewUserComponent,
    RevenueByAgentComponent,
    ExtendExpiryDateComponent,
    ViewInvokerComponent,
    VoucherListComponent,
    RewardPointsComponent,
    ManageRewardPointsUsersComponent,
    AddRewardPointsUserComponent,
    RewardPointsActivitiesComponent,
    AddVoucherDialogComponent,
    ConfirmationDialogComponent,
    VoucherTransactionsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    AngularMaterialModule,
    NgxDatatableModule,
    NgxSpinnerModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatRippleModule,
    BrowserModule,
    FormsModule,
    MatProgressBarModule,
    NgxJsonViewerModule,
    ChartsModule,
    AngularDropdownModule,
    NgWormholeModule,
    ToastrModule,
    NgbModule,
    FormsModule,
    NgxDaterangepickerMd.forRoot(),
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService,
    AuthService,
    InvoiceService,
    AlertsService,
    Data,
    AuthGuardService,
    SidenavResponsive,
    SideNaveComponent,
    NavBarComponent,
    ExcelService,
    CsvService,
    OperationService,
    DriveService,
    DriveService,
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
    
    // ==> Reward Points System
    AddRewardPointsUserComponent,
    ConfirmationDialogComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
