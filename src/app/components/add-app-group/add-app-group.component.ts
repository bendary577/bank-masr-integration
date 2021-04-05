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


  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar, private loyaltyService: LoyaltyService,
    public dialogRef: MatDialogRef<AddAppGroupComponent>, 
    @Inject(MAT_DIALOG_DATA) public data) { }
    
  ngOnInit() {
    
    if(this.data["inParent"] == true){
    this.getGroups(false, new Group);
    }

    if (this.data["parentGroup"] != null && this.data != undefined){
      this.parentGroup = this.data["parentGroup"];
      console.log(this.parentGroup)
    }

    if (this.data["group"] != null && this.data != undefined){
      this.group = this.data["group"];
      this.form = this.formBuilder.group({
        name: [this.group.name, Validators.required],        
        logoUrl: [this.group.logoUrl],
        description: [this.group.description],
        discountId: [this.group.discountId],
        parentGroup: [this.group.parentGroup],
        discountRate: [this.group.discountRate, Validators.required]
      });
    }else{
      this.form = this.formBuilder.group({
        name: ['', [Validators.required]],
        logoUrl: [''],
        description: [''],
        parentGroup: this.parentGroup,
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
        logoUrl: this.form.controls.logoUrl.value,
        description: this.form.controls.description.value,
        discountRate: this.form.controls.discountRate.value,
        parentGroup: this.form.controls.parentGroup.value,
        image: this.srcResult,
        discountId: this.form.controls.discountId.value
      });
    }
  }
}
