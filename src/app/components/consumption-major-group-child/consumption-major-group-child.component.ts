import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CostCenter } from 'src/app/models/CostCenter';
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
  public ccForm: FormGroup;
  public fgForm: FormGroup;

  majorGroup:MajorGroup;

  newRevenueCenter: RevenueCenter = new RevenueCenter();
  newFamilyGroup: FamilyGroup = new FamilyGroup();
  newCostCenter: CostCenter = new CostCenter();

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

    this.ccForm = this.formBuilder.group({
      ccName: ['', Validators.required],
      locationName: ['', Validators.required],
      ccAccountCode: ['', Validators.required]
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

  addCostCenter(){
    if(!this.majorGroup.costCenters || this.majorGroup.costCenters == undefined){
      this.majorGroup.costCenters = [];
    }

    this.newCostCenter = new CostCenter();
    this.newCostCenter.costCenter = this.ccForm.controls.ccName.value;
    this.newCostCenter.locationName = this.ccForm.controls.locationName.value;
    this.newCostCenter.accountCode = this.ccForm.controls.ccAccountCode.value;

    this.majorGroup.costCenters.push(this.newCostCenter);
  }

}
