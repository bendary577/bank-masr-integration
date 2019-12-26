import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';


import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatListModule,
  MatButtonModule,
  MatPaginatorModule

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
import { BookedTransferComponent } from './components/booked-transfer/booked-transfer.component';
import { BookedWasteComponent } from './components/booked-waste/booked-waste.component';

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
    BookedTransferComponent,
    BookedWasteComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,

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
    MatPaginatorModule
  ],
  providers: [CookieService, AuthService, InvoiceService, AlertsService],
  bootstrap: [AppComponent],
  entryComponents: [AddVendorComponent]
})
export class AppModule { }
