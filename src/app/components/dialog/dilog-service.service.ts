import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DialogComponent } from './dialog.component';
@Injectable({
  providedIn: 'root'
})
export class DilogServiceService {

  constructor(public dialog: MatDialog) { }

  openModal(transaction: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title:  "Transaction",
        message: transaction
    };
    dialogConfig.minWidth = 400;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }

  newBookingModal(transaction: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title:  "New Booking",
        message: transaction
    };
    dialogConfig.minWidth = 400;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }
}
