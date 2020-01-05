import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { WasteService } from 'src/app/services/waste/waste.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';

@Component({
  selector: 'app-booked-waste',
  templateUrl: './booked-waste.component.html',
  styleUrls: ['./booked-waste.component.scss']
})
export class BookedWasteComponent implements OnInit {

  loading = true;
  success = null;
  bookedWaste = [];

  constructor(private spinner: NgxSpinnerService, private wasteService: WasteService,
    public snackBar: MatSnackBar, private syncJobService:SyncJobService) {

  }

  ngOnInit() {
    this.getBookedWasteDB()
  }

  getBookedWasteDB() {
    this.spinner.show();
    this.syncJobService.getSyncJobData("Get Booked Waste").toPromise().then((res: any) => {
      this.bookedWaste = res;
      
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getBookedWasteSyncJob() {
    this.spinner.show();
    this.wasteService.getBookedWaste().toPromise().then((res: any) => {
      this.success = res.success;
      this.getBookedWasteDB();

      if (this.success){
        this.snackBar.open('Sync Booked Waste Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open('Sync Booked Waste Failed', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail "
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
