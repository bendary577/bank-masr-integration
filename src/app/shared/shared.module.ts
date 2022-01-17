import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatCheckboxModule,
  MatCardModule,
  MatProgressBarModule,
  MatMenuModule,
  MatBadgeModule,
  MatExpansionModule,
  MatDialogModule,
  MatTableModule,
} from '@angular/material'
import { NgxJsonViewerModule } from 'ngx-json-viewer';
import { AngularDropdownModule } from 'angular-dropdown';

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
    // MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    // MatRippleModule,
    MatProgressBarModule,


    CommonModule,
    NgxJsonViewerModule,
    AngularDropdownModule,
    // NgWormholeModule,
    // ToastrModule,
    // NgxDaterangepickerMd.forRoot(),
  ],

})
export class SharedModule { }
