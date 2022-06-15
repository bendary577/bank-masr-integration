import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { Constants } from "../models/constants";
import { MainComponent } from "./main.component";

import { SuppliersComponent } from "../components/suppliers/suppliers.component";
import { ConfigurationComponent } from "../components/setting/configuration/configuration.component";
import { AuthGuardService } from "../guards/AuthGuardService";
import { WelcomePageComponent } from "../components/welcome-page/welcome-page.component";
import { BookedTransferInforComponent } from "../components/booked-transfer-infor/booked-transfer-infor.component";
import { JournalInforComponent } from "../components/journal-infor/journal-infor.component";
import { CostCenterLocationMappingComponent } from "../components/setting/cost-center-location-mapping/cost-center-location-mapping.component";
import { ApprovedInvoicesInforComponent } from "../components/approved-invoices-infor/approved-invoices-infor.component";
import { WastageInforComponent } from "../components/wastage-infor/wastage-infor.component";
import { CreditNotesInforComponent } from "../components/credit-notes-infor/credit-notes-infor.component";
import { IncludedOverGroupsComponent } from "../components/setting/included-over-groups/included-over-groups.component";
import { CostCenterAccountMappingComponent } from "../components/setting/cost-center-account-mapping/cost-center-account-mapping.component";
import { PosSalesInforComponent } from "../components/pos-sales-infor/pos-sales-infor.component";
import { BookedProductionComponent } from "../components/BookedProduction/booked-production/booked-production.component";
import { MenuItemsComponent } from "../components/menu-items/menu-items.component";
import { MenuItemsConfigurationComponent } from "../components/menu-items-configuration/menu-items-configuration.component";
import { OperationTypesConfigurationComponent } from "../components/setting/operation-types-configuration/operation-types-configuration.component";
import { CreateOrderConfigComponent } from "../components/create-order-config/create-order-config.component";
import { SyncExportedFilesComponent } from "../components/sync-exported-files/sync-exported-files.component";
import { ZealPaymentComponent } from "../components/zeal-payment/zeal-payment.component";
import { ZealPaymentConfigComponent } from "../components/zeal-payment-config/zeal-payment-config.component";
import { ZealVoucherComponent } from "../components/zeal-voucher/zeal-voucher.component";
import { ZealVoucherConfigComponent } from "../components/zeal-voucher-config/zeal-voucher-config.component";
import { OperaPaymentConfigurationComponent } from "../components/opera-payment-configuration/opera-payment-configuration.component";
import { SupplierMappingComponent } from "../components/setting/supllier-mapping/supllier-mapping.component";
import { CreateOrderComponent } from "../components/create-order/create-order.component";
import { ManageGroupsComponent } from "../components/manage-groups/manage-groups.component";
import { WlsIntegrationComponent } from "../components/wls-integration/wls-integration.component";
import { WlsIntegrationConfigComponent } from "../components/wls-integration-config/wls-integration-config.component";
import { NewBookingReportComponent } from "../components/new-booking-report/new-booking-report.component";
import { CancelBookingReportComponent } from "../components/cancel-booking-report/cancel-booking-report.component";
import { OccupancyUpdateReportComponent } from "../components/occupancy-update-report/occupancy-update-report.component";
import { OperaReportMapTablesComponent } from "../components/setting/opera-report-map-tables/opera-report-map-tables.component";
import { OperaBookingDashBoardComponent } from "../components/opera-booking-dash-board/opera-booking-dash-board.component";
import { ExpensesDetailsReportComponent } from "../components/expenses-details-report/expenses-details-report.component";
import { SimphonyDiscountMapingComponent } from "../components/simphony-discount-maping/simphony-discount-maping.component";
import { CostOfGoodsComponent } from "../components/cost-of-goods/cost-of-goods.component";
import { HotelOpiComponent } from "../components/hotel-opi/hotel-opi.component";
import { OperaPaymentsComponent } from "../components/operations/opera-payments/opera-payments.component";
import { SupportComponent } from "../components/support/support.component";
import { PosMachineMappingComponent } from "../components/setting/pos-machine-mapping/pos-machine-mapping.component";
import { SimphonyCheckComponent } from "../components/simphony-check/simphony-check.component";
import { SimphonyPaymentComponent } from "../components/operations/simphony-payment/simphony-payment.component";
import { RevenueByAgentComponent } from "../components/Reports/revenue-by-agent/revenue-by-agent.component";
import { WebServiceInvokerConfigurationComponent } from "../components/configuration/web-service-invoker-configuration/web-service-invoker-configuration.component";
import { VoucherListComponent } from "../components/voucher-list/voucher-list.component";
import { RewardPointsComponent } from "../components/reward-points/reward-points.component";
import { VoucherTransactionsComponent } from "../components/voucher-transactions/voucher-transactions.component";
import { UniqueVoucherComponent } from "../components/unique-voucher/unique-voucher.component";
import { SalesApiDailyComponent } from "../components/sales-api-daily/sales-api-daily.component";
import { SalesApiMonthlyComponent } from "../components/sales-api-monthly/sales-api-monthly.component";
import { TalabatMappingComponent } from "../components/talabat-mapping/talabat-mapping.component";
import { ManageSubGroupComponent } from "../components/manage-sub-group/manage-sub-group.component";
import { AggregatorIntegratorComponent } from "../components/aggregator-integrator/aggregator-integrator.component";
import { AggregatorsEndPoints } from "../models/deliveryAggregator/aggregatorsEndPoints";
import { RewardPointsSettingsComponent } from "../components/setting/reward-points-settings/reward-points-settings.component";
import { AggregatorsConfigurationComponent } from "../components/aggregators-configuration/aggregators-configuration.component";
import { AggregatorMappingComponent } from "../components/aggregator-mapping/aggregator-mapping.component";
import { AggregatorBranchesMappingComponent } from "../components/aggregator-branches-mapping/aggregator-branches-mapping.component";
import { AggregatorFoodicsProductsComponent } from "../components/aggregator-foodics-products/aggregator-foodics-products.component";


const routes: Routes = [
  { path: "", component: MainComponent },
  {
    path: Constants.SETTING,
    component: ConfigurationComponent,
    children: [],
  },
  {
    path: Constants.COST_CENTER_LOCATION_MAPPING,
    component: CostCenterLocationMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.COST_CENTER_ACCOUNT_MAPPING,
    component: CostCenterAccountMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.INCLUDED_OVER_GROUPS,
    component: IncludedOverGroupsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.OPERATION_TYPES,
    component: OperationTypesConfigurationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.SUPPLIERS_MAPPING,
    component: SupplierMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.OPERA_REPORT_MAP_TABLES,
    component: OperaReportMapTablesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.SIMPHONY_DISCOUNT_MAP_TABLE,
    component: SimphonyDiscountMapingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.POS_MACHINE_MAP_TABLE,
    component: PosMachineMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.TALABAT_MAPPING_PAGE,
    component: TalabatMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.BRANCHES_MAPPING_PAGE,
    component: AggregatorBranchesMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.AGGREGATORS_MAPPING_PAGE,
    component: AggregatorMappingComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.AGGREGATORS_CONFIGURATIONS_PAGE,
    component: AggregatorsConfigurationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.REWORD_PORINTS_SETTINGS,
    component: RewardPointsSettingsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.WEB_INVOKERS_PAGE,
    component: WebServiceInvokerConfigurationComponent,
    canActivate: [AuthGuardService],
  },

  // OPERA Views
  {
    path: Constants.OPERA_BOOKING_DASHBOARD_PAGE,
    component: OperaBookingDashBoardComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.REDEEM_VOUCHER,
    component: VoucherListComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.VOUCHER_TRANSACTION,
    component: VoucherTransactionsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.UNIQUE_VOUCHER_TRANSACTION,
    component: UniqueVoucherComponent,
    canActivate: [AuthGuardService],
  },

  // Reward Points
  {
    path: Constants.REWARD_POINTS_PAGE,
    component: RewardPointsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.MANAGE_SUB_GROUPS,
    component: ManageSubGroupComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.MANAGE_GROUPS,
    component: ManageGroupsComponent,
    canActivate: [AuthGuardService],
  },

  // Entry System Views
  {
    path: Constants.REVENUE_BY_AGENT_PAGE,
    component: RevenueByAgentComponent,
    canActivate: [AuthGuardService],
  },

  // Hotel OPI Views
  {
    path: Constants.GET_HOTEL_OPI_PAGE,
    component: HotelOpiComponent,
    canActivate: [AuthGuardService],
  },

  // Pages
  {
    path: Constants.WELCOME_PAGE,
    component: WelcomePageComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.SUPPLIERS_PAGE,
    component: SuppliersComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.APPROVED_INVOICES_INFOR_PAGE,
    component: ApprovedInvoicesInforComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.BOOKED_TRANSFER_INFOR_PAGE,
    component: BookedTransferInforComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.CREDIT_NOTE_INFOR_PAGE,
    component: CreditNotesInforComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.CONSUMPTION_INFOR_PAGE,
    component: JournalInforComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.COST_OF_GOODS_PAGE,
    component: CostOfGoodsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.POS_SALES_INFOR_PAGE,
    component: PosSalesInforComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.POS_SALES_API_DAILY_PAGE,
    component: SalesApiDailyComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.POS_SALES_API_MONTHLY_PAGE,
    component: SalesApiMonthlyComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.WASTARGE_INFOR_PAGE,
    component: WastageInforComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.BOOKED_PRODUCTION_INFOR_PAGE,
    component: BookedProductionComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.MENU_ITEMS_PAGE,
    component: MenuItemsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.MENU_ITEMS_CONFIG_PAGE,
    component: MenuItemsConfigurationComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.RESERVATION_PAGE,
    component: WlsIntegrationComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.RESERVATION_CONFIG_PAGE,
    component: WlsIntegrationConfigComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.CREATE_ORDER_PAGE,
    component: CreateOrderComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.CREATE_ORDER_CONFIG_PAGE,
    component: CreateOrderConfigComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.ZEAL_PAYMENT_PAGE,
    component: ZealPaymentComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.ZEAL_PAYMENT_CONFIG_PAGE,
    component: ZealPaymentConfigComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.ZEAL_VOUCHER_PAGE,
    component: ZealVoucherComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.ZEAL_VOUCHER_CONFIG_PAGE,
    component: ZealVoucherConfigComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.ZEAL_POINTS_CONFIG_PAGE,
    component: ZealVoucherConfigComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.OPERA_PAYMENT_CONFIG_PAGE,
    component: OperaPaymentConfigurationComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.EXPORTED_FILES_PAGE,
    component: SyncExportedFilesComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.NEW_BOOKING_REPORT_PAGE,
    component: NewBookingReportComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.CANCEL_BOOKING_REPORT_PAGE,
    component: CancelBookingReportComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.OCCUPANCY_UPDATE_REPORT_PAGE,
    component: OccupancyUpdateReportComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.EXPENSES_DETAILS_REPORT_PAGE,
    component: ExpensesDetailsReportComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.OPERA_PAYMENT_PAGE,
    component: OperaPaymentsComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: Constants.SIMPHONY_CHECK_PAGE,
    component: SimphonyCheckComponent,
    canActivate: [AuthGuardService],
  },
  // {
  //   path: Constants.SIMPHONY_PAYMENT_PAGE,
  //   component: SimphonyPaymentComponent,
  //   canActivate: [AuthGuardService],
  // },

  { path : AggregatorsEndPoints.AGGREGATOR_INTEGRATOR , component: AggregatorIntegratorComponent, canActivate:[AuthGuardService]},

  {
    path: AggregatorsEndPoints.AGGREGATOR_INTEGRATOR,
    component: AggregatorIntegratorComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: AggregatorsEndPoints.AGGREGATOR_FOODICS_PRODUCTS,
    component: AggregatorFoodicsProductsComponent,
    canActivate: [AuthGuardService],
  },

  {
    path: Constants.SUPPORT,
    component: SupportComponent,
    canActivate: [AuthGuardService],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
