import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [],
  exports:[ 
    // Loading
    NgxSpinnerModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
  ]
})
export class BasicModule { }
