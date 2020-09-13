import { BrowserModule } from '@angular/platform-browser';
import {NgModule, ElementRef, ChangeDetectorRef} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
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
import { InvoiceService } from './services/invoice/invoice.service';
import {HttpModule} from "@angular/http";
import { AlertsService } from 'angular-alert-module';
import {SyncJobsconfigComponent} from "./components/setting/syncJob/syncJobsconfig.component";
import { SuppliersConfiguartionComponent } from './components/suppliers-configuartion/suppliers-configuartion.component';
import { SchedulerConfigurationComponent } from './components/scheduler-configuration/scheduler-configuration.component';
import { BookedTransferDetailsComponent } from './components/booked-transfer-details/booked-transfer-details.component';
import { ErrorComponentComponent } from './components/error-component/error-component.component';
import { SupplierDetailsComponent } from './components/supplier-details/supplier-details.component';
import {AuthGuardService} from "./guards/AuthGuardService";
import { PosSalesComponent } from './components/pos-sales/pos-sales.component';

import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AddAccountComponent } from './components/add-account/add-account.component';
import { WelcomePageComponent } from './components/welcome-page/welcome-page.component';
import { ApprovedInvoiceInforConfigurationComponent } from './components/approved-invoice-infor-configuration/approved-invoice-infor-configuration.component';
import { JournalsInforConfigurationsComponent } from './components/journals-infor-configurations/journals-infor-configurations.component';
import { SuppliersInforConfigurationComponent } from './components/suppliers-infor-configuration/suppliers-infor-configuration.component';
import { BookedTransferInforComponent } from './components/booked-transfer-infor/booked-transfer-infor.component';
import { BookedTransferInforConfigurationComponent } from './components/booked-transfer-infor-configuration/booked-transfer-infor-configuration.component';
import { JournalInforComponent } from './components/journal-infor/journal-infor.component';
import { ApprovedInvoicesInforComponent } from './components/approved-invoices-infor/approved-invoices-infor.component';
import { CreditNotesInforComponent } from './components/credit-notes-infor/credit-notes-infor.component';
import { CostCenterLocationMappingComponent } from './components/setting/cost-center-location-mapping/cost-center-location-mapping.component';
import { PosSalesConfigurationComponent } from './components/pos-sales-configuration/pos-sales-configuration.component';
import { WastageInforComponent } from './components/wastage-infor/wastage-infor.component';
import { WastageInforConfigurationComponent } from './components/wastage-infor-configuration/wastage-infor-configuration.component';
import { CreditNotesInforConfigurationComponent } from './components/credit-notes-infor-configuration/credit-notes-infor-configuration.component';
import { BasicConfiguartionsComponent } from './components/basic-configuartions/basic-configuartions.component';
import { IncludedOverGroupsComponent } from './components/setting/included-over-groups/included-over-groups.component';
import { CostCenterAccountMappingComponent } from './components/setting/cost-center-account-mapping/cost-center-account-mapping.component';
import { AddUserComponent } from './components/add-vendor/add-vendor.component';
import { Data } from './models/data';
import { PosSalesInforComponent } from './components/pos-sales-infor/pos-sales-infor.component';
import { PosSalesInforConfigurationComponent } from './components/pos-sales-infor-configuration/pos-sales-infor-configuration.component';
import { AddMajorGroupComponent } from './components/addMajorGroup/add-major-group.component';
import { AddTenderComponent } from './components/add-tender/add-tender.component';
import { BookedProductionComponent } from './components/BookedProduction/booked-production/booked-production.component';
import { BookedProductionConfigurationComponent } from './components/BookedProductionConfiguration/booked-production-configuration/booked-production-configuration.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SuppliersComponent,
    SidenavResponsive,
    ConfigurationComponent,
    UsersComponent,
    SyncJobsconfigComponent,
    AddUserComponent,
    SuppliersConfiguartionComponent,
    SchedulerConfigurationComponent,
    BookedTransferDetailsComponent,
    ErrorComponentComponent,
    SupplierDetailsComponent,
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
    JournalsInforConfigurationsComponent,
    ApprovedInvoicesInforComponent,
    CreditNotesInforComponent,
    AddAccountComponent,
    CostCenterLocationMappingComponent,
    WastageInforComponent,
    WastageInforConfigurationComponent,
    CreditNotesInforConfigurationComponent,
    BasicConfiguartionsComponent,
    IncludedOverGroupsComponent,
    CostCenterAccountMappingComponent,
    PosSalesInforComponent,
    PosSalesInforConfigurationComponent,
    AddMajorGroupComponent,
    AddTenderComponent,
    BookedProductionComponent,
    BookedProductionConfigurationComponent
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
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, CookieService, AuthService, InvoiceService, AlertsService,Data, AuthGuardService,SidenavResponsive],
  bootstrap: [AppComponent],
  entryComponents: [AddUserComponent, AddAccountComponent, AddMajorGroupComponent, AddTenderComponent,SuppliersConfiguartionComponent, SchedulerConfigurationComponent]
})
export class AppModule { }
