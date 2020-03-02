import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Constants } from './models/constants';
import { LoginComponent } from './components/login/login.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { SidenavResponsive } from './components/sidenav/sidenav-responsive';
import { ConfigurationComponent } from './components/setting/configuration/configuration.component';
import { UsersComponent } from './components/setting/users/users.component';
import { SyncJobsconfigComponent } from './components/setting/syncJob/syncJobsconfig.component';
import { ApprovedInvoiceComponent } from './components/approved-invoice/approved-invoice.component';
import { BookedTransferComponent } from './components/booked-transfer/booked-transfer.component';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { CreditNoteComponent } from './components/credit-note/credit-note.component';
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component';
import { ApprovedInvoiceConfigurationComponent } from './components/approved-invoice-configuration/approved-invoice-configuration.component';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import {AuthGuardService} from "./guards/AuthGuardService";
import { JournalConfigurationComponent } from './components/journal-configuration/journal-configuration.component';
import { JournalsComponent } from './components/journals/journals.component';
import { PosSalesComponent } from './components/pos-sales/pos-sales.component';
import { PosSalesConfigurationComponent } from './pos-sales-configuration/pos-sales-configuration.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ApprovedInvoiceInforConfigurationComponent } from './components/approved-invoice-infor-configuration/approved-invoice-infor-configuration.component';
import { JournalsInforConfigurationsComponent } from './components/journals-infor-configurations/journals-infor-configurations.component';
import { SuppliersInforConfigurationComponent } from './components/suppliers-infor-configuration/suppliers-infor-configuration.component';
import { BookedTransferInforComponent } from './components/booked-transfer-infor/booked-transfer-infor.component';
import { JournalInforComponent } from './components/journal-infor/journal-infor.component';
import { BookedTransferInforConfigurationComponent } from './components/booked-transfer-infor-configuration/booked-transfer-infor-configuration.component';
import { ApprovedInvoicesInforComponent } from './components/approved-invoices-infor/approved-invoices-infor.component';


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full'},
  { path: Constants.SIDE_NAV, component: SidenavResponsive  ,canActivate:[AuthGuardService]},
  {
    path: Constants.SETTING, component: ConfigurationComponent ,
    children: []
  },
  { path: Constants.USERS_CONFIGURATION, component: UsersComponent,canActivate:[AuthGuardService]},
  { path: Constants.SYNC_JOBS, component: SyncJobsconfigComponent  , canActivate:[AuthGuardService]},

  // Pages
  { path: Constants.LOGIN_PAGE, component: LoginComponent},
  { path: Constants.WELCOME_PAGE, component: WelcomePageComponent , canActivate:[AuthGuardService]},

  { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent , canActivate:[AuthGuardService]},
  { path: Constants.SUPPLIERS_CONFIG_PAGE, component: SuppliersConfiguartionComponent  , canActivate:[AuthGuardService]},
  { path: Constants.SUPPLIERS_SUN_CONFIG_PAGE, component: SuppliersInforConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.SUPPLIERS_DETAILS_PAGE, component: SupplierDetailsComponent  , canActivate:[AuthGuardService]},

  { path: Constants.APPROVED_INVOICES_PAGE, component: ApprovedInvoiceComponent , canActivate:[AuthGuardService]},
  { path: Constants.APPROVED_INVOICES_INFOR_PAGE, component:  ApprovedInvoicesInforComponent, canActivate:[AuthGuardService]},
  { path: Constants.APPROVED_INVOICES_CONFIG_PAGE, component: ApprovedInvoiceConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.APPROVED_INVOICES_SUN_CONFIG_PAGE, component: ApprovedInvoiceInforConfigurationComponent  , canActivate:[AuthGuardService]},

  { path: Constants.BOOKED_TRANSFER_PAGE, component: BookedTransferComponent  , canActivate:[AuthGuardService]},
  { path: Constants.BOOKED_TRANSFER_INFOR_PAGE, component: BookedTransferInforComponent  , canActivate:[AuthGuardService]},
  { path: Constants.BOOKED_TRANSFER_INFOR_CONFIG_PAGE, component: BookedTransferInforConfigurationComponent  , canActivate:[AuthGuardService]},


  { path: Constants.CREDIT_NOTE_PAGE , component: CreditNoteComponent  , canActivate:[AuthGuardService]},
  
  { path: Constants.JOURNALS_PAGE , component: JournalsComponent  , canActivate:[AuthGuardService]},
  { path: Constants.JOURNALS_INFOR_PAGE , component: JournalInforComponent  , canActivate:[AuthGuardService]},
  { path: Constants.JOURNALS_CONFIG_PAGE , component: JournalConfigurationComponent  , canActivate:[AuthGuardService]},
  { path: Constants.JOURNALS_SUN_CONFIG_PAGE , component: JournalsInforConfigurationsComponent  , canActivate:[AuthGuardService]},

  { path: Constants.POS_SALES_PAGE , component: PosSalesComponent  , canActivate:[AuthGuardService]},
  { path: Constants.POS_SALES_CONFIG_PAGE , component: PosSalesConfigurationComponent  , canActivate:[AuthGuardService]},

  // Error Page
  {path:'**', component: ErrorComponentComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
