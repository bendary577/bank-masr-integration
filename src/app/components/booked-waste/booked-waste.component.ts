import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { WasteService } from 'src/app/services/waste/waste.service';

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
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getBookedTransferDB()
  }

  getBookedTransferDB() {
    this.spinner.show();
    this.wasteService.getBookedWasteDB().toPromise().then((res: any) => {
      console.log(res.items);
      this.bookedWaste = res.items;
      
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  getBookedTransferSyncJob() {
    this.spinner.show();
    this.wasteService.getBookedWaste().toPromise().then((res: any) => {
      this.success = res.success;
      this.getBookedTransferDB();

      if (this.success){
        this.snackBar.open('Sync Booked Transfers Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open('Sync Booked Transfers Failed', null, {
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
