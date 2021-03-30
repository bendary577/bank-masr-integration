import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FamilyGroup } from 'src/app/models/FamilyGroup';
import { MajorGroup } from 'src/app/models/MajorGroup';
import { RevenueCenter } from 'src/app/models/RevenueCenter';

@Component({
  selector: 'app-consumption-major-group-child',
  templateUrl: './consumption-major-group-child.component.html',
  styleUrls: ['./consumption-major-group-child.component.scss']
})
export class ConsumptionMajorGroupChildComponent implements OnInit {

  public rcForm: FormGroup;
  public fgForm: FormGroup;

  majorGroup:MajorGroup;

  newRevenueCenter: RevenueCenter = new RevenueCenter();
  newFamilyGroup: FamilyGroup = new FamilyGroup();

  constructor(private formBuilder: FormBuilder, public dialogRef: MatDialogRef<ConsumptionMajorGroupChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      majorGroup: this.majorGroup 
    });
  }

  ngOnInit() {
    this.rcForm = this.formBuilder.group({
      rcName: ['', Validators.required],
      rcAccountCode: ['', Validators.required],
    });

    this.fgForm = this.formBuilder.group({
      familyGroup: ['', Validators.required],
      departmentCode: ['', Validators.required]
    });

    this.majorGroup = this.data["majorGroup"];

  }

  addRevenueCenter(){
    if(!this.majorGroup.revenueCenters || this.majorGroup.revenueCenters == undefined){
      this.majorGroup.revenueCenters = [];
    }
    this.newRevenueCenter = new RevenueCenter();
    this.newRevenueCenter.revenueCenter = this.rcForm.controls.rcName.value;
    this.newRevenueCenter.accountCode = this.rcForm.controls.rcAccountCode.value;
    this.majorGroup.revenueCenters.push(this.newRevenueCenter);
    console.log(this.majorGroup)

  }

  addFamilyGroup(){
    if(!this.majorGroup.familyGroups || this.majorGroup.familyGroups == undefined){
      this.majorGroup.familyGroups = [];
    }
    this.newFamilyGroup = new FamilyGroup();
    this.newFamilyGroup.familyGroup = this.fgForm.controls.familyGroup.value;
    this.newFamilyGroup.departmentCode = this.fgForm.controls.departmentCode.value;

    this.majorGroup.familyGroups.push(this.newFamilyGroup);
  }

}
