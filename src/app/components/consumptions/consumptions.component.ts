import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { SupplierService } from 'src/app/services/supplier/supplier.service';
import { VendorService } from 'src/app/services/vendor/vendor.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Constants } from 'src/app/models/constants';
import { Router } from '@angular/router';
import { ConsumptionsService } from 'src/app/services/consumptions/consumptions.service';

@Component({
  selector: 'app-consumptions',
  templateUrl: './consumptions.component.html',
  styleUrls: ['./consumptions.component.scss']
})
export class ConsumptionsComponent implements OnInit {
  loading = true;
  success = null;
  jobs = [];
  consumptions = [];

  constructor(private spinner: NgxSpinnerService,
    private consumptionsService: ConsumptionsService, private syncJobService: SyncJobService,
    public snackBar: MatSnackBar, private router: Router) { }

  ngOnInit() {
  }

  getConsumptionsJob() {
    this.spinner.show();
    this.consumptionsService.getConsumptions().toPromise().then((res: any) => {
      this.success = res.success;
      // this.getSuppliersDB();
      // this.getSyncJobs("Get Suppliers");

      if (this.success) {
        this.snackBar.open('Sync Consumptions Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-success"
        });
      }
      else {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-fail"
        });
      }
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }


}
