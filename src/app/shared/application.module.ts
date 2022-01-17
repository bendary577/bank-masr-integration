import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatTabsModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports:[
    ChartsModule,
    MatTabsModule,
    MatMenuModule,
  ]
})
export class ApplicationModule { }
