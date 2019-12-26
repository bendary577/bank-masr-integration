import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material';
import { TransferService } from 'src/app/services/transfer/transfer.service';

@Component({
  selector: 'app-booked-transfer',
  templateUrl: './booked-transfer.component.html',
  styleUrls: ['./booked-transfer.component.scss']
})
export class BookedTransferComponent implements OnInit {

  loading = true;
  success = null;
  bookedTransfer = [];

  constructor(private spinner: NgxSpinnerService, private transferService: TransferService,
    public snackBar: MatSnackBar) {

  }

  ngOnInit() {
    this.getBookedTransferDB()
  }

  getBookedTransferDB() {
    this.spinner.show();
    this.transferService.getBookedTransferDB().toPromise().then((res: any) => {
      console.log(res.items);
      this.bookedTransfer = res.items;
      
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
    this.transferService.getBookedTransfer().toPromise().then((res: any) => {
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
          panelClass:"my-snack-bar-fail"
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
