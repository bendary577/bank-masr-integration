import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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

    //
    NgbModule,

  ]
})
export class BasicModule { }
