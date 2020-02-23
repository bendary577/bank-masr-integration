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


const routes: Routes = [
  { path: '', redirectTo: Constants.LOGIN_PAGE, pathMatch: 'full'},
  { path: Constants.SIDE_NAV, component: SidenavResponsive  },
  {
    path: Constants.SETTING, component: ConfigurationComponent ,
    children: []
  },
  { path: Constants.USERS_CONFIGURATION, component: UsersComponent  },
  { path: Constants.SYNC_JOBS, component: SyncJobsconfigComponent  },

  // Pages
  { path: Constants.LOGIN_PAGE, component: LoginComponent},
  { path: Constants.WELCOME_PAGE, component: WelcomePageComponent },

  { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent },
  { path: Constants.SUPPLIERS_CONFIG_PAGE, component: SuppliersConfiguartionComponent  },
  { path: Constants.SUPPLIERS_DETAILS_PAGE, component: SupplierDetailsComponent  },

  { path: Constants.APPROVED_INVOICES_PAGE, component: ApprovedInvoiceComponent },
  { path: Constants.APPROVED_INVOICES_CONFIG_PAGE, component: ApprovedInvoiceConfigurationComponent  },
  { path: Constants.APPROVED_INVOICES_SUN_CONFIG_PAGE, component: ApprovedInvoiceInforConfigurationComponent  },

  { path: Constants.BOOKED_TRANSFER_PAGE, component: BookedTransferComponent  },

  { path: Constants.CREDIT_NOTE_PAGE , component: CreditNoteComponent  },
  
  { path: Constants.JOURNALS_PAGE , component: JournalsComponent  },
  { path: Constants.JOURNALS_CONFIG_PAGE , component: JournalConfigurationComponent  },
  { path: Constants.JOURNALS_SUN_CONFIG_PAGE , component: JournalsInforConfigurationsComponent  },

  { path: Constants.POS_SALES_PAGE , component: PosSalesComponent  },
  { path: Constants.POS_SALES_CONFIG_PAGE , component: PosSalesConfigurationComponent  },

  // Error Page
  {path:'**', component: ErrorComponentComponent }

];

@NgModule({

  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
