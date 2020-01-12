import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from './models/constants';
import { LoginComponent } from './components/login/login.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { HomeComponent } from './components/home/home.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SidenavResponsive } from './components/sidenav/sidenav-responsive';
import { ConfigurationComponent } from './components/setting/configuration/configuration.component';
import { UsersComponent } from './components/setting/users/users.component';
import { SyncJobsconfigComponent } from './components/setting/syncJob/syncJobsconfig.component';
import { ApprovedInvoiceComponent } from './components/approved-invoice/approved-invoice.component';
import { BookedTransferComponent } from './components/booked-transfer/booked-transfer.component';
import { BookedTransferDetailsComponent } from './components/booked-transfer-details/booked-transfer-details.component';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { CreditNoteComponent } from './components/credit-note/credit-note.component';
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component';
import { ApprovedInvoiceConfigurationComponent } from './components/approved-invoice-configuration/approved-invoice-configuration.component';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import { ConsumptionsComponent } from './components/consumptions/consumptions.component';
import { CreditNoteConfigurationComponent } from './components/credit-note-configuration/credit-note-configuration.component';
import {AuthGuardService} from "./guards/AuthGuardService";


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full'},
  {
    path: Constants.TABS_PAGE, component: TabsComponent,canActivate:[AuthGuardService],
    children: [
      { path: '', redirectTo: Constants.HOME_PAGE, pathMatch: 'full' ,canActivate:[AuthGuardService]},
      { path: Constants.HOME_PAGE, component: HomeComponent,canActivate:[AuthGuardService] },
      { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent ,canActivate:[AuthGuardService]}
    ]
  },
  { path: Constants.SIDE_NAV, component: SidenavResponsive,canActivate:[AuthGuardService] },
  {
    path: Constants.SETTING, component: ConfigurationComponent,canActivate:[AuthGuardService],
    children: []
  },
  { path: Constants.USERS_CONFIGURATION, component: UsersComponent,canActivate:[AuthGuardService] },
  { path: Constants.SYNC_JOBS, component: SyncJobsconfigComponent ,canActivate:[AuthGuardService]},

  // Pages
  { path: Constants.LOGIN_PAGE, component: LoginComponent},
  { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent,canActivate:[AuthGuardService] },
  { path: Constants.SUPPLIERS_CONFIG_PAGE, component: SuppliersConfiguartionComponent,canActivate:[AuthGuardService] },
  { path: Constants.SUPPLIERS_DETAILS_PAGE, component: SupplierDetailsComponent,canActivate:[AuthGuardService] },

  { path: Constants.APPROVED_INVOICES_PAGE, component: ApprovedInvoiceComponent ,canActivate:[AuthGuardService]},
  { path: Constants.APPROVED_INVOICES_CONFIG_PAGE, component: ApprovedInvoiceConfigurationComponent ,canActivate:[AuthGuardService]},

  { path: Constants.BOOKED_TRANSFER_PAGE, component: BookedTransferComponent,canActivate:[AuthGuardService] },
  // { path: Constants.BOOKED_TRANSFER_CONFIG_PAGE, component: BookedTransferConfigurationComponent },
  { path: Constants.BOOKED_TRANSFER_DETAILS_PAGE + "/:transfer", component: BookedTransferDetailsComponent,canActivate:[AuthGuardService] },

  { path: Constants.CREDIT_NOTE_PAGE , component: CreditNoteComponent ,canActivate:[AuthGuardService]},
  { path: Constants.CREDIT_NOTE_CONFIG_PAGE, component: CreditNoteConfigurationComponent ,canActivate:[AuthGuardService]},

  { path: Constants.CONSUMPTION_PAGE , component: ConsumptionsComponent ,canActivate:[AuthGuardService]},

  // Error Page
  {path:'**', component: ErrorComponentComponent}

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
