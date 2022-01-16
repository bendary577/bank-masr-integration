import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import {
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
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
} from '@angular/material'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    // Loading
    NgxSpinnerModule,
    
    // Data Tables
    NgxDatatableModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,

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
  ]
})
export class SharedModule { }
