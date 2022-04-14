import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Constants } from 'src/app/models/constants'

@Component({
  selector: 'app-confirm-undo-wallet-action',
  templateUrl: './confirm-undo-wallet-action.component.html',
  styleUrls: ['./confirm-undo-wallet-action.component.scss']
})
export class ConfirmUndoWalletActionComponent implements OnInit {

  deduct = false;
  charge = false;
  entrance = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmUndoWalletActionComponent>,
    @Inject(MAT_DIALOG_DATA) public data
    ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      confirm: true
    });
  }

  ngOnInit() { 
    if(this.data.operation === Constants.CHARGE_WALLET_ACTION){
      this.charge = true
    }else if(this.data.operation === Constants.DEDUCT_WALLET_ACTION){
      this.deduct = true;
    }else if(this.data.operation === Constants.ENTRANCE_AMOUNT_ACTION){
      this.entrance = true
    }
  }

  getCurrency() {
    let currency = JSON.parse(localStorage.getItem('account')).currency
    if(currency !== null){
        return currency;
    }else{
        return "JOD"
    }
  }

}
