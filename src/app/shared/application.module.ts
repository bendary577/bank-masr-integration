import { NgModule } from '@angular/core';
import { MatMenuModule, MatTabsModule } from '@angular/material';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [],
  imports: [
  ],
  exports:[
    ChartsModule,
    MatTabsModule,
    MatMenuModule,
  ]
})
export class ApplicationModule { }
