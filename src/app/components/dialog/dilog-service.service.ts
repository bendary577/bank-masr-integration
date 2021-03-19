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

    // dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
        title:  "Transaction",
        message: transaction
    };
    dialogConfig.minWidth = 400;
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(result => {});
  }}
function DialogTemplateComponent(DialogTemplateComponent: any, dialogConfig: MatDialogConfig<any>) {
  throw new Error('Function not implemented.');
}