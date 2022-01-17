import { BrowserModule } from '@angular/platform-browser'
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { HttpClientModule } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service'
import { AngularMaterialModule } from './angular-material.module'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AuthService } from './services/auth/auth.service'
import { HttpModule } from '@angular/http'
import { AlertsService } from 'angular-alert-module'
import { AuthGuardService } from './guards/AuthGuardService'

import { HashLocationStrategy, LocationStrategy } from '@angular/common'

import { Data } from './models/data'
import { SideNaveComponent } from './components/side-nave/side-nave.component'
import { NavBarComponent } from './components/nav-bar/nav-bar.component'
import { BasicModule } from './shared/basic.module'
import { LoginComponent } from './components/login/login.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SideNaveComponent,
    NavBarComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,

    BasicModule,
    AngularMaterialModule,
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    CookieService,
    AuthService,
    AlertsService,
    Data,
    AuthGuardService,
    SideNaveComponent,
    NavBarComponent,
  ],
  bootstrap: [AppComponent],
  entryComponents: [
  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
