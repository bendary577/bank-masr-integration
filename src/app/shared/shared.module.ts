import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatRippleModule,
  MatProgressBarModule,
  MatMenuModule,
  MatBadgeModule,
  MatExpansionModule,
  MatDialogModule,
  MatTableModule,
} from '@angular/material'
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from '../app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AngularDropdownModule } from 'angular-dropdown';
import { NgWormholeModule } from 'ng-wormhole';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxDaterangepickerMd } from 'ngx-daterangepicker-material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[    
    // Data Tables
    NgxDatatableModule,

    MatTableModule,
    MatDialogModule,
    MatMenuModule,
    MatBadgeModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatRippleModule,
    MatProgressBarModule,


    CommonModule,
    NgxJsonViewerModule,
    AngularDropdownModule,
    NgWormholeModule,
    ToastrModule,
    NgbModule,
    // NgxDaterangepickerMd.forRoot(),
  ]
})
export class SharedModule { }
