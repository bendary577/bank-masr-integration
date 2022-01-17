import { NgModule } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [],
  exports:[ 
    // Loading
    NgxSpinnerModule,

    // Forms
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BasicModule { }
