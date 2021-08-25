import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { RevenueCenter } from 'src/app/models/RevenueCenter';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';

@Component({
  selector: 'app-edit-wallet',
  templateUrl: './edit-wallet.component.html',
  styleUrls: ['./edit-wallet.component.scss']
})
export class EditWalletComponent implements OnInit {

  func = 'add';
  inCharge = false;
  inDeduct = false;
  showVoucher = false;
  generalSettings: GeneralSettings;
  revenueCenters: RevenueCenter[];
  amount;
  form: FormGroup;
  voucher;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private generalSettingsService: GeneralSettingsService,
    public dialogRef: MatDialogRef<EditWalletComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit(): void {
    this.func = this.data["function"];
    if(this.func == 'add' ){
      this.inCharge = true;
    }else if(this.func == 'deduct'){
      this.inDeduct = true;
    }
    this.getRevenueCenters();

        // }else if(this.func == 'showVoucher'){
    //   this.showVoucher = true;
    //   this.amount = this.data["amount"];
    //   this.voucher = this.getRandomString(10);
    // }else{
    //   this.showVoucher = true;
    // }

      this.form = this.formBuilder.group({
      amount: ['', Validators.required],
      revenuecenters: [''],
     });
    
  }
  
  getRevenueCenters(){
    this.generalSettingsService.getGeneralSettings().then((res: any) =>{
        this.generalSettings = res as GeneralSettings;
        console.log(res)
        if(this.generalSettings.revenueCenters){
          this.revenueCenters = this.generalSettings.revenueCenters;
          console.log(this.revenueCenters)

        }
    }).catch(err => {
      let message = "";
      if(err.message){
        message = err.message;
      }else if(err.error){
        message = err.error;
      }else{
        message = "Failed to fetch locations";
      }
      this.snackBar.open(message, null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    });  
}
   getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  }

  totalSpend(date){
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onCloseClick(){
    this.dialogRef.close({
      amount: this.amount,
    });
  }

  onSaveClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      this.dialogRef.close({
        amount: this.form.controls.amount.value,
        revenuecenters: this.form.controls.revenuecenters.value
      });
    }
  }

}