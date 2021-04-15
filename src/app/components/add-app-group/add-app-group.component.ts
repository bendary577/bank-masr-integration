import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { Group } from 'src/app/models/loyalty/Group';
import { SimphonyDiscount } from 'src/app/models/loyalty/SimphonyDiscount';
import { AuthService } from 'src/app/services/auth/auth.service';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-add-app-group',
  templateUrl: './add-app-group.component.html',
  styleUrls: ['./add-app-group.component.scss']
})
export class AddAppGroupComponent implements OnInit {
  public form: FormGroup;
  groups: Group[];
  group: Group = new Group();
  parentGroup: Group;
  srcResult: any;
  imageUploded: boolean = false;
  inUpdate = false;

  discountRates = [];

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private loyaltyService: LoyaltyService,
    public dialogRef: MatDialogRef<AddAppGroupComponent>,
    private generalSettingsService: GeneralSettingsService, private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data) { }

  ngOnInit() {
    if(this.authService.generalSettings != null){
      this.discountRates = this.authService.generalSettings.discountRates;
    }else{
      this.getGeneralSettings();
    }

    if(this.data["inParent"] == true){
      this.getGroups(true, "");
    }

    if (this.data != undefined && this.data["parentGroup"] != null){
      this.parentGroup = this.data["parentGroup"];
    }

    if (this.data["group"] != null && this.data != undefined){
      this.inUpdate = true;
      this.group = this.data["group"];

      this.form = this.formBuilder.group({
        name: [this.group.name, [Validators.maxLength, Validators.required]],
        description: [this.group.description],
        discountId: [new SimphonyDiscount(this.group.discountId, this.group.discountRate), [Validators.required]],
        parentGroup: [this.parentGroup],
        image: this.srcResult
      });
    }else{
      this.form = this.formBuilder.group({
        name: ['', [Validators.maxLength, Validators.required]],
        description: [''],
        parentGroup: [this.parentGroup],
        discountId: ['', [Validators.required]],
      });
    }
  }

  getGroups(isParent, group){
    this.loyaltyService.getAppGroups(isParent, group, 1).toPromise().then((res: any) => {
      this.groups= res;
    }).catch(err => {
    });
  }

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.authService.generalSettings = res as GeneralSettings;
      this.discountRates = this.authService.generalSettings.discountRates;
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_GET_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    });
  }

  csvInputChange(fileInputEvent: any) {
    this.srcResult = fileInputEvent.target.files[0];
    if(this.srcResult){
        this.imageUploded = true;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-fail"
      });
    }else{
      console.log({
        discount: this.form.controls.discountId.value
      })
      this.dialogRef.close({
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        discountId: this.form.controls.discountId.value.discountId,
        discountRate: this.form.controls.discountId.value.discountRate,
        parentGroup: this.form.controls.parentGroup.value,
        image: this.srcResult
      });
    }
  }
}
