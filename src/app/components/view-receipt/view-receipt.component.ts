import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Account } from 'src/app/models/Account';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { WalletHistory } from 'src/app/models/wallet/wallet-history';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.scss']
})
export class ViewReceiptComponent implements OnInit {
  public account: string;
  public accountLogo: string;
  public guest: ApplicationUser
  public walletHistory: WalletHistory

  constructor(public dialogRef: MatDialogRef<ViewReceiptComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.account = JSON.parse(localStorage.getItem('account')).name;
    this.accountLogo = JSON.parse(localStorage.getItem('account')).imageUrl;

    if (this.data['guest'] != null || this.data['guest'] != undefined) {
      this.guest = this.data['guest'];
  
      if(this.guest.wallet.walletHistory.length > 0){
        this.walletHistory = this.guest.wallet.walletHistory[this.guest.wallet.walletHistory.length - 1]
      }

      // if (this.data['autoPrint'] != null || this.data['autoPrint'] != undefined) {
      //   if(this.data['autoPrint'] == true){
      //     this.print();
      //     // this.onNoClick();
      //   }
      // }
    }
  }

  getCurrency() {
    return JSON.parse(localStorage.getItem('account')).currency
  }

  print(){
    const printContent = document.getElementById("invoice-POS");
    window.document.write(printContent.innerHTML);
    window.focus();
    window.print();
    window.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
