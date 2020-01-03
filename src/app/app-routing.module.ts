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


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full' },
  {
    path: Constants.TABS_PAGE, component: TabsComponent,
    children: [
      { path: '', redirectTo: Constants.HOME_PAGE, pathMatch: 'full' },
      { path: Constants.HOME_PAGE, component: HomeComponent },
      { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent }
    ]
  },
  { path: Constants.SIDE_NAV, component: SidenavResponsive },
  {
    path: Constants.SETTING, component: ConfigurationComponent,
    children: []
  },
  { path: Constants.USERS_CONFIGURATION, component: UsersComponent },
  { path: Constants.SYNC_JOBS, component: SyncJobsconfigComponent },

  // Pages
  { path: Constants.LOGIN_PAGE, component: LoginComponent },
  { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent },
  { path: Constants.SUPPLIERS_CONFIG_PAGE + "/:supplier", component: SuppliersConfiguartionComponent },

  { path: Constants.APPROVED_INVOICES_PAGE, component: ApprovedInvoiceComponent },
  { path: Constants.APPROVED_INVOICES_CONFIG_PAGE + "/:invoice", component: ApprovedInvoiceConfigurationComponent },

  { path: Constants.BOOKED_TRANSFER_PAGE, component: BookedTransferComponent },
  // { path: Constants.BOOKED_TRANSFER_CONFIG_PAGE, component: BookedTransferConfigurationComponent },
  { path: Constants.BOOKED_TRANSFER_DETAILS_PAGE + "/:transfer", component: BookedTransferDetailsComponent },

  { path: Constants.CREDIT_NOTE_PAGE , component: CreditNoteComponent },
  // { path: Constants.CREDIT_NOTE_CONFIG_PAGE + "/:creditNote", component: CreditNoteConfigurationComponent },

  // Error Page
  {path:'**', component: ErrorComponentComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
