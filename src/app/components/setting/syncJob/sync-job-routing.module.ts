import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/guards/AuthGuardService';
import { Constants } from 'src/app/models/constants';
import { ApprovedInvoiceInforConfigurationComponent } from '../../approved-invoice-infor-configuration/approved-invoice-infor-configuration.component';
import { BookedTransferInforConfigurationComponent } from '../../booked-transfer-infor-configuration/booked-transfer-infor-configuration.component';
import { BookedProductionConfigurationComponent } from '../../BookedProductionConfiguration/booked-production-configuration/booked-production-configuration.component';
import { CancelBookingReportConfigComponent } from '../../cancel-booking-report-config/cancel-booking-report-config.component';
import { CostOfGoodsConfigComponent } from '../../cost-of-goods-config/cost-of-goods-config.component';
import { CreditNotesInforConfigurationComponent } from '../../credit-notes-infor-configuration/credit-notes-infor-configuration.component';
import { ExpensesDetailsReportConfigComponent } from '../../expenses-details-report-config/expenses-details-report-config.component';
import { JournalsInforConfigurationsComponent } from '../../journals-infor-configurations/journals-infor-configurations.component';
import { NewBookingReportConfigComponent } from '../../new-booking-report-config/new-booking-report-config.component';
import { OccupancyUpdateReportConfigComponent } from '../../occupancy-update-report-config/occupancy-update-report-config.component';
import { PosSalesInforConfigurationComponent } from '../../pos-sales-infor-configuration/pos-sales-infor-configuration.component';
import { SalesApiDailyConfigComponent } from '../../sales-api-daily-config/sales-api-daily-config.component';
import { SalesApiMonthlyConfigComponent } from '../../sales-api-monthly-config/sales-api-monthly-config.component';
import { SuppliersInforConfigurationComponent } from '../../suppliers-infor-configuration/suppliers-infor-configuration.component';
import { WastageInforConfigurationComponent } from '../../wastage-infor-configuration/wastage-infor-configuration.component';
import { SyncJobsconfigComponent } from './syncJobsconfig.component';

const routes: Routes = [
  { path: '', component: SyncJobsconfigComponent, canActivate:[AuthGuardService] },
  { path: Constants.SUPPLIERS_SUN_CONFIG_PAGE, component: SuppliersInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.POS_SALES_INFOR_CONFIG_PAGE , component: PosSalesInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.CREDIT_NOTE_INFOR_CONFIG_PAGE , component: CreditNotesInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.APPROVED_INVOICES_SUN_CONFIG_PAGE, component: ApprovedInvoiceInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.BOOKED_TRANSFER_INFOR_CONFIG_PAGE, component: BookedTransferInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.WASTARGE_INFOR_CONFIG_PAGE , component: WastageInforConfigurationComponent ,canActivate:[AuthGuardService]},
  { path: Constants.BOOKED_PRODUCTION_INFOR_CONFIG_PAGE , component: BookedProductionConfigurationComponent ,canActivate:[AuthGuardService]},
  { path: Constants.CONSUMPTION_CONFIG_PAGE , component: JournalsInforConfigurationsComponent  , canActivate:[AuthGuardService]},
  { path: Constants.CONSUMPTION_SUN_CONFIG_PAGE , component: JournalsInforConfigurationsComponent  , canActivate:[AuthGuardService]},
  { path: Constants.COST_OF_GOODS_CONFIG_PAGE , component: CostOfGoodsConfigComponent  , canActivate:[AuthGuardService]},
  { path: Constants.POS_SALES_API_DAILY_CONFIG_PAGE , component: SalesApiDailyConfigComponent  , canActivate:[AuthGuardService]},
  { path: Constants.POS_SALES_API_MONTHLY_CONFIG_PAGE , component: SalesApiMonthlyConfigComponent  , canActivate:[AuthGuardService]},

  // Opera Reports Config
  { path: Constants.NEW_BOOKING_REPORT_CONFIG_PAGE , component: NewBookingReportConfigComponent ,canActivate:[AuthGuardService]},
  { path: Constants.CANCEL_BOOKING_REPORT_CONFIG_PAGE , component: CancelBookingReportConfigComponent ,canActivate:[AuthGuardService]},
  { path: Constants.OCCUPANCY_UPDATE_REPORT_CONFIG_PAGE , component: OccupancyUpdateReportConfigComponent ,canActivate:[AuthGuardService]},
  { path: Constants.EXPENSES_DETAILS_REPORT_CONFIG_PAGE , component: ExpensesDetailsReportConfigComponent ,canActivate:[AuthGuardService]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SyncJobRoutingModule { }
