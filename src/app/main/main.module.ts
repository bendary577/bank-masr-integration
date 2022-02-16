import { NgModule } from '@angular/core';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

import { SuppliersComponent } from '../components/suppliers/suppliers.component';
import { SupplierDetailsComponent } from '../components/supplier-details/supplier-details.component';
import { ConfigurationComponent } from '../components/setting/configuration/configuration.component';
import { UsersComponent } from '../components/setting/users/users.component';
import { AddUserComponent } from '../components/add-vendor/add-vendor.component';
import { SuppliersConfiguartionComponent } from '../components/suppliers-configuartion/suppliers-configuartion.component';
import { SchedulerConfigurationComponent } from '../components/scheduler-configuration/scheduler-configuration.component';
import { BookedTransferDetailsComponent } from '../components/booked-transfer-details/booked-transfer-details.component';
import { ErrorComponentComponent } from '../components/error-component/error-component.component';
import { PosSalesComponent } from '../components/pos-sales/pos-sales.component';
import { WelcomePageComponent } from '../components/welcome-page/welcome-page.component';
import { AddAccountComponent } from '../components/add-account/add-account.component';
import { BookedTransferInforComponent } from '../components/booked-transfer-infor/booked-transfer-infor.component';
import { JournalInforComponent } from '../components/journal-infor/journal-infor.component';
import { ApprovedInvoicesInforComponent } from '../components/approved-invoices-infor/approved-invoices-infor.component';
import { CreditNotesInforComponent } from '../components/credit-notes-infor/credit-notes-infor.component';
import { CostCenterLocationMappingComponent } from '../components/setting/cost-center-location-mapping/cost-center-location-mapping.component';
import { WastageInforComponent } from '../components/wastage-infor/wastage-infor.component';
import { BasicConfiguartionsComponent } from '../components/basic-configuartions/basic-configuartions.component';
import { IncludedOverGroupsComponent } from '../components/setting/included-over-groups/included-over-groups.component';
import { CostCenterAccountMappingComponent } from '../components/setting/cost-center-account-mapping/cost-center-account-mapping.component';
import { PosSalesInforComponent } from '../components/pos-sales-infor/pos-sales-infor.component';
import { AddMajorGroupComponent } from '../components/addMajorGroup/add-major-group.component';
import { ConsumptionMajorGroupChildComponent } from '../components/consumption-major-group-child/consumption-major-group-child.component';
import { BookedProductionComponent } from '../components/BookedProduction/booked-production/booked-production.component';
import { AddRevenueCenterComponent } from '../components/add-revenue-center/add-revenue-center.component';
import { AddServiceChargeComponent } from '../components/add-service-charge/add-service-charge.component';
import { AddTenderChildComponent } from '../components/add-tender-child/add-tender-child.component';
import { MenuItemsComponent } from '../components/menu-items/menu-items.component';
import { MenuItemsConfigurationComponent } from '../components/menu-items-configuration/menu-items-configuration.component';
import { AddSimphonyLocationComponent } from '../components/add-simphony-location/add-simphony-location.component';
import { SimphonyLocationConfigurationComponent } from '../components/configuration/simphony-location-configuration/simphony-location-configuration.component';
import { WebServiceInvokerConfigurationComponent } from '../components/configuration/web-service-invoker-configuration/web-service-invoker-configuration.component';
import { AddWebServiceInvokerComponent } from '../components/add-web-service-invoker/add-web-service-invoker.component';
import { AddLocationComponent } from '../components/add-location/add-location.component';
import { OperationTypesConfigurationComponent } from '../components/setting/operation-types-configuration/operation-types-configuration.component';
import { ConfirmationDialogComponent } from '../components/confirmation-dialog/confirmation-dialog.component';
import { ViewInvokerComponent } from '../components/view-invoker/view-invoker.component';
import { ExtendExpiryDateComponent } from '../components/extend-expiry-date/extend-expiry-date.component';
import { RevenueByAgentComponent } from '../components/Reports/revenue-by-agent/revenue-by-agent.component';
import { ViewUserComponent } from '../components/view-user/view-user.component';
import { SimphonyCheckConfigurationComponent } from '../components/simphony-check-configuration/simphony-check-configuration.component';
import { SimphonyCheckComponent } from '../components/simphony-check/simphony-check.component';
import { SimphonyPaymentComponent } from '../components/operations/simphony-payment/simphony-payment.component';
import { PosMachineMappingComponent } from '../components/setting/pos-machine-mapping/pos-machine-mapping.component';
import { SupportComponent } from '../components/support/support.component';
import { EditWalletComponent } from '../components/edit-wallet/edit-wallet.component';
import { UserProfileComponent } from '../components/user-profile/user-profile.component';
import { FilterComponent } from '../components/filter/filter.component';
import { OperaPaymentsComponent } from '../components/operations/opera-payments/opera-payments.component';
import { OpiTransactionsComponent } from '../components/opi-transactions/opi-transactions.component';
import { HotelOpiComponent } from '../components/hotel-opi/hotel-opi.component';
import { AddConsumptionLocationItemsComponent } from '../components/add-consumption-location-items/add-consumption-location-items.component';
import { AddConsumptionLocationComponent } from '../components/add-consumption-location/add-consumption-location.component';
import { CostOfGoodsComponent } from '../components/cost-of-goods/cost-of-goods.component';
import { SimphonyDiscountMapingComponent } from '../components/simphony-discount-maping/simphony-discount-maping.component';
import { ExpensesDetailsReportConfigComponent } from '../components/expenses-details-report-config/expenses-details-report-config.component';
import { ExpensesDetailsReportComponent } from '../components/expenses-details-report/expenses-details-report.component';
import { OperaBookingDashBoardComponent } from '../components/opera-booking-dash-board/opera-booking-dash-board.component';
import { OperaReportMapTablesComponent } from '../components/setting/opera-report-map-tables/opera-report-map-tables.component';
import { CreateOrderConfigComponent } from '../components/create-order-config/create-order-config.component';
import { CreateOrderComponent } from '../components/create-order/create-order.component';
import { AddMajorGroupChildComponent } from '../components/addMajorGroupChild/add-major-group-child.component';
import { SyncExportedFilesComponent } from '../components/sync-exported-files/sync-exported-files.component';
import { ZealPaymentComponent } from '../components/zeal-payment/zeal-payment.component';
import { ZealPaymentConfigComponent } from '../components/zeal-payment-config/zeal-payment-config.component';
import { ZealVoucherComponent } from '../components/zeal-voucher/zeal-voucher.component';
import { PaymentVoucherConfigComponent } from '../components/payment-voucher-config/payment-voucher-config.component';
import { OccupancyUpdateReportConfigComponent } from '../components/occupancy-update-report-config/occupancy-update-report-config.component';
import { CancelBookingReportConfigComponent } from '../components/cancel-booking-report-config/cancel-booking-report-config.component';
import { NewBookingReportConfigComponent } from '../components/new-booking-report-config/new-booking-report-config.component';
import { OccupancyUpdateReportComponent } from '../components/occupancy-update-report/occupancy-update-report.component';
import { CancelBookingReportComponent } from '../components/cancel-booking-report/cancel-booking-report.component';
import { NewBookingReportComponent } from '../components/new-booking-report/new-booking-report.component';
import { DialogComponent } from '../components/dialog/dialog.component';
import { WlsIntegrationComponent } from '../components/wls-integration/wls-integration.component';
import { ZealVoucherConfigComponent } from '../components/zeal-voucher-config/zeal-voucher-config.component';
import { OperaPaymentConfigurationComponent } from '../components/opera-payment-configuration/opera-payment-configuration.component';
import { AddSalesStatisticsComponent } from '../components/add-sales-statistics/add-sales-statistics.component';
import { SupplierMappingComponent } from '../components/setting/supllier-mapping/supllier-mapping.component';
import { AddSupplierComponent } from '../components/add-supplier/add-supplier.component';
import { WlsIntegrationConfigComponent } from '../components/wls-integration-config/wls-integration-config.component';
import { DeleteAppGroupComponent } from '../components/delete-app-group/delete-app-group.component';
import { AddAppUserComponent } from '../components/add-app-user/add-app-user.component';
import { AddAppGroupComponent } from '../components/add-app-group/add-app-group.component';
import { AddAppCompanyComponent } from '../components/add-app-company/add-app-company.component';
import { ManageSubGroupComponent } from '../components/manage-sub-group/manage-sub-group.component';

import { AngularMaterialModule } from '../angular-material.module';
import { BasicModule } from '../shared/basic.module';
import { SharedModule } from '../shared/shared.module';
import { UniqueVoucherComponent } from '../components/unique-voucher/unique-voucher.component';
import { TalabatOrdersComponent } from '../components/talabat-orders/talabat-orders.component';
import { QuillModule } from 'ngx-quill';
import { SalesApiDailyComponent } from '../components/sales-api-daily/sales-api-daily.component';
import { SalesApiMonthlyComponent } from '../components/sales-api-monthly/sales-api-monthly.component';
import { AddOrderTypeComponent } from '../components/add-order-type/add-order-type.component';
import { AddOrderTypeChannelComponent } from '../components/add-order-type-channel/add-order-type-channel.component';
import { TalabatMappingComponent } from '../components/talabat-mapping/talabat-mapping.component';

@NgModule({
  declarations: [
    MainComponent,
    WelcomePageComponent,
    ErrorComponentComponent,

    AddUserComponent,
    UsersComponent,
    ViewUserComponent,
    AddAccountComponent,
    ConfigurationComponent,
    BasicConfiguartionsComponent,
    IncludedOverGroupsComponent,
    CostCenterLocationMappingComponent,
    CostCenterAccountMappingComponent,

    SchedulerConfigurationComponent,

    SuppliersComponent,
    SupplierDetailsComponent,
    SuppliersConfiguartionComponent,

    PosSalesComponent,
    CreditNotesInforComponent,
    ApprovedInvoicesInforComponent,


    BookedTransferInforComponent,
    BookedTransferDetailsComponent,

    JournalInforComponent,

    WastageInforComponent,

    PosSalesInforComponent,

    BookedProductionComponent,

    AddMajorGroupComponent,
    ConsumptionMajorGroupChildComponent,

    AddRevenueCenterComponent,
    AddServiceChargeComponent,

    AddTenderChildComponent,
    MenuItemsComponent,
    MenuItemsConfigurationComponent,
    AddSimphonyLocationComponent,
    SimphonyLocationConfigurationComponent,
    WebServiceInvokerConfigurationComponent,
    AddWebServiceInvokerComponent,
    AddLocationComponent,
    AddOrderTypeComponent,
    AddOrderTypeChannelComponent,
    OperationTypesConfigurationComponent,
    CreateOrderConfigComponent,
    CreateOrderComponent,
    AddMajorGroupChildComponent,
    SyncExportedFilesComponent,

    ZealPaymentComponent,
    ZealPaymentConfigComponent,
    ZealVoucherComponent,
    ZealVoucherConfigComponent,

    PaymentVoucherConfigComponent,

    AddSalesStatisticsComponent,
    OperaPaymentConfigurationComponent,
    SupplierMappingComponent,
    AddSupplierComponent,

    ManageSubGroupComponent,
    AddAppCompanyComponent,
    AddAppGroupComponent,
    AddAppUserComponent,
    DeleteAppGroupComponent,
    WlsIntegrationConfigComponent,
    WlsIntegrationComponent,
    DialogComponent,

    NewBookingReportComponent,
    CancelBookingReportComponent,
    OccupancyUpdateReportComponent,
    ExpensesDetailsReportComponent,

    NewBookingReportConfigComponent,
    CancelBookingReportConfigComponent,
    OccupancyUpdateReportConfigComponent,
    ExpensesDetailsReportConfigComponent,

    OperaReportMapTablesComponent,
    OperaBookingDashBoardComponent,

    SimphonyDiscountMapingComponent,
    CostOfGoodsComponent,
    AddConsumptionLocationComponent,
    AddConsumptionLocationItemsComponent,
    HotelOpiComponent,
    OpiTransactionsComponent,
    OperaPaymentsComponent,
    FilterComponent,
    UserProfileComponent,
    EditWalletComponent,
    SupportComponent,
    PosMachineMappingComponent,
    TalabatOrdersComponent,
    TalabatMappingComponent,
    SimphonyPaymentComponent,
    SimphonyCheckComponent,
    SimphonyCheckConfigurationComponent,
    RevenueByAgentComponent,
    ExtendExpiryDateComponent,
    ViewInvokerComponent,
    UniqueVoucherComponent,
    TalabatOrdersComponent,
    SalesApiDailyComponent,
    SalesApiMonthlyComponent
  ],
  imports: [
    MainRoutingModule,

    BasicModule,
    SharedModule,
    AngularMaterialModule,
    QuillModule.forRoot()
  ],
  entryComponents: [
    AddUserComponent,
    ViewUserComponent,
    AddAccountComponent,
    AddMajorGroupComponent,
    ConsumptionMajorGroupChildComponent,
    AddRevenueCenterComponent,
    AddServiceChargeComponent,
    SuppliersConfiguartionComponent,
    SchedulerConfigurationComponent,
    AddTenderChildComponent,
    AddSimphonyLocationComponent,
    AddWebServiceInvokerComponent,
    ViewInvokerComponent,
    AddLocationComponent,
    AddOrderTypeComponent,
    AddOrderTypeChannelComponent,
    AddMajorGroupChildComponent,
    AddSalesStatisticsComponent,
    AddSupplierComponent,

    // ==> Consumption Sync Job Type
    AddConsumptionLocationComponent,
    AddConsumptionLocationItemsComponent,

    ConfirmationDialogComponent,
    DialogComponent
  
  ],
})
export class MainModule { }
