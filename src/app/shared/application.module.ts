import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ChartsModule,
    MatTabsModule,
  ]
})
export class ApplicationModule { }
