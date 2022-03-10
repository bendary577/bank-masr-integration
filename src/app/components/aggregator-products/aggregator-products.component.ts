import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog, MatSnackBar } from '@angular/material';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { ExcelService } from 'src/app/services/excel/excel.service';
import { CsvService } from 'src/app/services/csv/csv.service';
import { SideNaveComponent } from '../side-nave/side-nave.component';
import { AggregatorIntegratorService } from 'src/app/services/aggregator-integrator/aggregator-integrator.service';

@Component({
  selector: 'app-aggregator-products',
  templateUrl: './aggregator-products.component.html',
  styleUrls: ['./aggregator-products.component.scss']
})
export class AggregatorProductsComponent implements OnInit {


  loading = true;
  products = [];
  state = "";

  constructor(private spinner: NgxSpinnerService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private aggregatorService: AggregatorIntegratorService, public dialog: MatDialog
    ,private excelService: ExcelService, private sidNav: SideNaveComponent, private csvService: CsvService) { }

  ngOnInit() {
    this.getAggregatorsProducts();
  }

  getAggregatorsProducts() {
    this.spinner.show();
    this.aggregatorService.getAggregatorProducts().toPromise().then((res: any) => {
      this.spinner.hide();
      this.products = res["data"]["orders"];
      console.log(this.products)
      this.loading = false;
      if (res.status) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
    }).catch(err => {
      this.spinner.hide();
      this.loading = false;
      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

}
