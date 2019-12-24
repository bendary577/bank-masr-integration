import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { AngularMaterialModule } from './angular-material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AddVendorComponent } from './components/add-vendor/add-vendor.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { SuppliersComponent } from './components/suppliers/suppliers.component';
import { AuthService } from './services/auth/auth.service';
import { ApprovedInvoiceComponent } from './components/approved-invoice/approved-invoice.component';
import { InvoiceService } from './services/invoice/invoice.service';
import { SyncJobComponent } from './components/sync-job/sync-job.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AddVendorComponent,
    TabsComponent,
    SuppliersComponent,
    ApprovedInvoiceComponent,
    SyncJobComponent
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
    BrowserAnimationsModule
  ],
  providers: [CookieService, AuthService, InvoiceService],
  bootstrap: [AppComponent],
  entryComponents: [AddVendorComponent]
})
export class AppModule { }
