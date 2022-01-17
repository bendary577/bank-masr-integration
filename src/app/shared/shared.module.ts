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
    MatBadgeModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    MatCardModule,
    MatProgressBarModule,


    CommonModule,
    NgxJsonViewerModule,
    AngularDropdownModule,
  ],

})
export class SharedModule { }
