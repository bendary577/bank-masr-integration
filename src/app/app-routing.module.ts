import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from './models/constants';
import { LoginComponent } from './components/login/login.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SidenavResponsive } from './components/sidenav/sidenav-responsive';
import { ConfigurationComponent } from './components/setting/configuration/configuration.component';
import { UsersComponent } from './components/setting/users/users.component';
import { SyncJobsconfigComponent } from './components/setting/syncJob/syncJobsconfig.component';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import {AuthGuardService} from "./guards/AuthGuardService";
import { PosSalesComponent } from './components/pos-sales/pos-sales.component';
import { PosSalesConfigurationComponent } from './components/pos-sales-configuration/pos-sales-configuration.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ApprovedInvoiceInforConfigurationComponent } from './components/approved-invoice-infor-configuration/approved-invoice-infor-configuration.component';
import { JournalsInforConfigurationsComponent } from './components/journals-infor-configurations/journals-infor-configurations.component';
import { SuppliersInforConfigurationComponent } from './components/suppliers-infor-configuration/suppliers-infor-configuration.component';
import { BookedTransferInforComponent } from './components/booked-transfer-infor/booked-transfer-infor.component';
import { JournalInforComponent } from './components/journal-infor/journal-infor.component';
import { CostCenterLocationMappingComponent } from './components/setting/cost-center-location-mapping/cost-center-location-mapping.component';
import { BookedTransferInforConfigurationComponent } from './components/booked-transfer-infor-configuration/booked-transfer-infor-configuration.component';
import { ApprovedInvoicesInforComponent } from './components/approved-invoices-infor/approved-invoices-infor.component';
import { WastageInforConfigurationComponent } from './components/wastage-infor-configuration/wastage-infor-configuration.component';
import { WastageInforComponent } from './components/wastage-infor/wastage-infor.component';
import { CreditNotesInforComponent } from './components/credit-notes-infor/credit-notes-infor.component';
import { CreditNotesInforConfigurationComponent } from './components/credit-notes-infor-configuration/credit-notes-infor-configuration.component';
import { IncludedOverGroupsComponent } from './components/setting/included-over-groups/included-over-groups.component';
import { CostCenterAccountMappingComponent } from './components/setting/cost-center-account-mapping/cost-center-account-mapping.component';
import { PosSalesInforConfigurationComponent } from './components/pos-sales-infor-configuration/pos-sales-infor-configuration.component';
import { PosSalesInforComponent } from './components/pos-sales-infor/pos-sales-infor.component';
import { BookedProductionComponent } from './components/BookedProduction/booked-production/booked-production.component';
import { BookedProductionConfigurationComponent } from './components/BookedProductionConfiguration/booked-production-configuration/booked-production-configuration.component';
import { MenuItemsComponent } from './components/menu-items/menu-items.component';
import { MenuItemsConfigurationComponent } from './components/menu-items-configuration/menu-items-configuration.component';


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full'},
  { path: Constants.SIDE_NAV, component: SidenavResponsive  ,canActivate:[AuthGuardService]},
  {
    path: Constants.SETTING, component: ConfigurationComponent ,
    children: []
  },
  { path: Constants.USERS_CONFIGURATION, component: UsersComponent,canActivate:[AuthGuardService] },
  { path: Constants.SYNC_JOBS, component: SyncJobsconfigComponent ,canActivate:[AuthGuardService]},
  { path: Constants.COST_CENTER_LOCATION_MAPPING, component: CostCenterLocationMappingComponent ,canActivate:[AuthGuardService]},
  { path: Constants.COST_CENTER_ACCOUNT_MAPPING, component: CostCenterAccountMappingComponent ,canActivate:[AuthGuardService]},
  { path: Constants.INCLUDED_OVER_GROUPS, component: IncludedOverGroupsComponent ,canActivate:[AuthGuardService]},

  // Pages
  { path: Constants.LOGIN_PAGE, component: LoginComponent},
  { path: Constants.WELCOME_PAGE, component: WelcomePageComponent , canActivate:[AuthGuardService]},

  { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent , canActivate:[AuthGuardService]},
  { path: Constants.SUPPLIERS_CONFIG_PAGE, component: SuppliersConfiguartionComponent  , canActivate:[AuthGuardService]},
  { path: Constants.SUPPLIERS_SUN_CONFIG_PAGE, component: SuppliersInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.SUPPLIERS_DETAILS_PAGE, component: SupplierDetailsComponent  , canActivate:[AuthGuardService]},

  { path: Constants.APPROVED_INVOICES_INFOR_PAGE, component:  ApprovedInvoicesInforComponent, canActivate:[AuthGuardService]},
  { path: Constants.APPROVED_INVOICES_SUN_CONFIG_PAGE, component: ApprovedInvoiceInforConfigurationComponent  , canActivate:[AuthGuardService]},

  { path: Constants.BOOKED_TRANSFER_INFOR_PAGE, component: BookedTransferInforComponent  , canActivate:[AuthGuardService]},
  { path: Constants.BOOKED_TRANSFER_INFOR_CONFIG_PAGE, component: BookedTransferInforConfigurationComponent  , canActivate:[AuthGuardService]},

  { path: Constants.CREDIT_NOTE_INFOR_PAGE , component: CreditNotesInforComponent  , canActivate:[AuthGuardService]},
  { path: Constants.CREDIT_NOTE_INFOR_CONFIG_PAGE , component: CreditNotesInforConfigurationComponent  , canActivate:[AuthGuardService]},

  { path: Constants.CONSUMPTION_INFOR_PAGE , component: JournalInforComponent  , canActivate:[AuthGuardService]},
  { path: Constants.CONSUMPTION_SUN_CONFIG_PAGE , component: JournalsInforConfigurationsComponent  , canActivate:[AuthGuardService]},

  { path: Constants.POS_SALES_INFOR_PAGE , component: PosSalesInforComponent  , canActivate:[AuthGuardService]},
  { path: Constants.POS_SALES_INFOR_CONFIG_PAGE , component: PosSalesInforConfigurationComponent  , canActivate:[AuthGuardService]},

  { path: Constants.WASTARGE_INFOR_PAGE , component: WastageInforComponent ,canActivate:[AuthGuardService]},
  { path: Constants.WASTARGE_INFOR_CONFIG_PAGE , component: WastageInforConfigurationComponent ,canActivate:[AuthGuardService]},

  { path: Constants.BOOKED_PRODUCTION_INFOR_PAGE , component: BookedProductionComponent ,canActivate:[AuthGuardService]},
  { path: Constants.BOOKED_PRODUCTION_INFOR_CONFIG_PAGE , component: BookedProductionConfigurationComponent ,canActivate:[AuthGuardService]},

  { path: Constants.MENU_ITEMS_PAGE , component: MenuItemsComponent ,canActivate:[AuthGuardService]},
  { path: Constants.MENU_ITEMS_CONFIG_PAGE , component: MenuItemsConfigurationComponent ,canActivate:[AuthGuardService]},

  // Error Page
  {path:'**', component: ErrorComponentComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
