import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ElementRef, ChangeDetectorRef} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { ShowHidePasswordModule } from 'ngx-show-hide-password';



import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatRippleModule,
  MatProgressBarModule
} from '@angular/material';
import {SidenavResponsive} from "./components/sidenav/sidenav-responsive";
import {ConfigurationComponent} from "./components/setting/configuration/configuration.component";
import {MatExpansionModule} from '@angular/material/expansion';
import {UsersComponent} from "./components/setting/users/users.component";
import { AuthService } from './services/auth/auth.service';
import { ApprovedInvoiceComponent } from './components/approved-invoice/approved-invoice.component';
import { InvoiceService } from './services/invoice/invoice.service';
import { SyncJobComponent } from './components/sync-job/sync-job.component';
import {HttpModule} from "@angular/http";
import { AlertsService } from 'angular-alert-module';
import {SyncJobsconfigComponent} from "./components/setting/syncJob/syncJobsconfig.component";
import { BookedTransferComponent } from './components/booked-transfer/booked-transfer.component';
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component';
import { SchedulerConfigurationComponent } from './components/scheduler-configuration/scheduler-configuration.component';
import { ApprovedInvoiceConfigurationComponent } from './components/approved-invoice-configuration/approved-invoice-configuration.component';
import { BookedTransferDetailsComponent } from './components/booked-transfer-details/booked-transfer-details.component';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { CreditNoteComponent } from './components/credit-note/credit-note.component';
import { Data } from './models/data';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import {AuthGuardService} from "./guards/AuthGuardService";
import { JournalConfigurationComponent } from './components/journal-configuration/journal-configuration.component';
import { JournalsComponent } from './components/journals/journals.component';
import { PosSalesComponent } from './components/pos-sales/pos-sales.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { PosSalesConfigurationComponent } from './pos-sales-configuration/pos-sales-configuration.component';
import { ApprovedInvoiceInforConfigurationComponent } from './components/approved-invoice-infor-configuration/approved-invoice-infor-configuration.component';
import { JournalsInforConfigurationsComponent } from './components/journals-infor-configurations/journals-infor-configurations.component';
import { SuppliersInforConfigurationComponent } from './components/suppliers-infor-configuration/suppliers-infor-configuration.component';
import { BookedTransferInforComponent } from './components/booked-transfer-infor/booked-transfer-infor.component';
import { BookedTransferInforConfigurationComponent } from './components/booked-transfer-infor-configuration/booked-transfer-infor-configuration.component';
import { JournalInforComponent } from './components/journal-infor/journal-infor.component';
import { JournalsInforComponent } from './components/journals-infor/journals-infor.component';
import { PosSalesConfigurationComponent } from './components/pos-sales-configuration/pos-sales-configuration.component';
import { WastageComponent } from './components/wastage/wastage.component';
import { WastageConfigurationComponent } from './components/wastage-configuration/wastage-configuration.component';
import { CostCenterLocationMappingComponent } from './components/setting/cost-center-location-mapping/cost-center-location-mapping.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddVendorComponent,
    TabsComponent,
    SuppliersComponent,
    SidenavResponsive,
    ConfigurationComponent,
    UsersComponent,
    SuppliersComponent,
    ApprovedInvoiceComponent,
    SyncJobComponent,
    SyncJobsconfigComponent,

    SyncJobComponent,
    BookedTransferComponent,
    SuppliersConfiguartionComponent,
    SchedulerConfigurationComponent,
    ApprovedInvoiceConfigurationComponent,
    BookedTransferDetailsComponent,
    ErrorComponentComponent,
    CreditNoteComponent,
    SupplierDetailsComponent,
    JournalConfigurationComponent,
    JournalsComponent,
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
    JournalsInforComponent
    AddAccountComponent,
    WastageComponent,
    WastageConfigurationComponent,
    CostCenterLocationMappingComponent
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
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatRippleModule,
    BrowserModule,
    FormsModule,
    MatProgressBarModule,
    ShowHidePasswordModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, CookieService, AuthService, InvoiceService, AlertsService, Data,AuthGuardService,SidenavResponsive],
  bootstrap: [AppComponent],
  entryComponents: [AddVendorComponent, AddAccountComponent, SuppliersConfiguartionComponent, SchedulerConfigurationComponent,
  ApprovedInvoiceConfigurationComponent]
})
export class AppModule { }
