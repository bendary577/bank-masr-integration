import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { InforTax } from 'src/app/models/InforTax';
import { SyncJobType } from 'src/app/models/SyncJobType';

@Component({
  selector: 'app-tax-analysis-configrution',
  templateUrl: './tax-analysis-configrution.component.html',
  styleUrls: ['./tax-analysis-configrution.component.scss']
})
export class TaxAnalysisConfigrutionComponent implements OnInit {
  @Input() syncJobType: SyncJobType;

  newTax = new InforTax();
  taxes = [];

  constructor(public snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.taxes = this.syncJobType.configuration.inforConfiguration.taxes;
    console.log({
      taxes: this.taxes
    })
  }


  addTaxCode(){
    if(this.newTax.taxCode  && this.newTax.taxPercentage){
       this.taxes.push(this.newTax);
       this.taxes = [...this.taxes];

       this.newTax = new InforTax();
     } else {
       this.snackBar.open('Please fill all tax fields.', null, {
         duration: 2000,
         horizontalPosition: 'center',
         panelClass:"my-snack-bar-fail"
       });
    }
  }

}
