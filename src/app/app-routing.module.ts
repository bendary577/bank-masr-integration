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
  { path: Constants.LOGIN_PAGE, component: LoginComponent },
  { path: Constants.SIDE_NAV, component: SidenavResponsive },
  {
    path: Constants.SETTING, component: ConfigurationComponent,
    children: [



    ]
  },
  { path: Constants.USERS_CONFIGURATION, component: UsersComponent },
  { path: Constants.SYNC_JOBS, component: SyncJobsconfigComponent },

  { path: Constants.SUPPLIERS_PAGE, component: SuppliersComponent },
  { path: Constants.APPROVED_INVOICES_PAGE, component: ApprovedInvoiceComponent },
  { path: Constants.BOOKED_TRANSFER_PAGE, component: BookedTransferComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
