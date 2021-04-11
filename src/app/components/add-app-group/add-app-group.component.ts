import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatSnackBar, MAT_DIALOG_DATA } from '@angular/material';
import { Group } from 'src/app/models/loyalty/Group';
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

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private loyaltyService: LoyaltyService,
    public dialogRef: MatDialogRef<AddAppGroupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }
    
  ngOnInit() {  
    if(this.data["inParent"] == true){
    this.getGroups(true, "");}

    if (this.data != undefined && this.data["parentGroup"] != null){
      this.parentGroup = this.data["parentGroup"]; }

    if (this.data["group"] != null && this.data != undefined){
      console.log(this.parentGroup)
      this.group = this.data["group"];
      this.form = this.formBuilder.group({
        name: [this.group.name, [Validators.maxLength, Validators.required]],        
        description: [this.group.description],
        discountId: [this.group.discountId , [Validators.required,Validators.min(0),Validators.pattern("^[0-9]*$")]],
        parentGroup: [this.parentGroup],
        image: this.srcResult,
        discountRate: [this.group.discountRate, [Validators.required, Validators.max(100), Validators.min(0), Validators.pattern("^[0-9]*$")]]
      });
    }else{
      this.form = this.formBuilder.group({
        name: ['', [Validators.maxLength, Validators.required]],
        description: [''],
        parentGroup: [this.parentGroup],
        discountRate: ['', [Validators.required, Validators.max(100), Validators.min(0), Validators.pattern("^[0-9]*$")]],
        discountId: ['', [Validators.required,Validators.min(0),Validators.pattern("^[0-9]*$")]],
      });
    }
  }

  getGroups(isParent, group){
    this.loyaltyService.getAppGroups(isParent, group).toPromise().then((res: any) => {
      this.groups= res;
    }).catch(err => {
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
      this.dialogRef.close({
        name: this.form.controls.name.value,
        description: this.form.controls.description.value,
        discountRate: this.form.controls.discountRate.value,
        discountId: this.form.controls.discountId.value,
        parentGroup: this.form.controls.parentGroup.value,
        image: this.srcResult
      });
    }
  }
}
