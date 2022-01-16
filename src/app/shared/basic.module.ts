import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[ 
    // Loading
    NgxSpinnerModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BasicModule { }
