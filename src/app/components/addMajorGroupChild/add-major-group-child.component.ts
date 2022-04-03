import { Component, Inject, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material'
import { FamilyGroup } from 'src/app/models/FamilyGroup'
import { MajorGroup } from 'src/app/models/MajorGroup'
import { RevenueCenter } from 'src/app/models/RevenueCenter'

@Component({
  selector: 'app-add-major-group-child',
  templateUrl: './add-major-group-child.component.html',
  styleUrls: ['./add-major-group-child.component.scss'],
})
export class AddMajorGroupChildComponent implements OnInit {
  public form: FormGroup
  public rcForm: FormGroup
  public fgForm: FormGroup

  majorGroup: MajorGroup
  newRevenueCenter: RevenueCenter = new RevenueCenter()
  newFamilyGroup: FamilyGroup = new FamilyGroup()

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AddMajorGroupChildComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {}

  onNoClick(): void {
    this.dialogRef.close()
  }

  onSaveClick(): void {
    this.dialogRef.close({
      majorGroup: this.majorGroup,
    })
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
    })

    this.rcForm = this.formBuilder.group({
      rcName: ['', Validators.required],
      rcRef: ['', Validators.required],
      rcAccountCode: ['', Validators.required],
      rcDiscountAccount: ['', Validators.required],
    })

    this.fgForm = this.formBuilder.group({
      familyGroup: ['', Validators.required],
      departmentCode: ['', Validators.required],
    })

    this.majorGroup = this.data['majorGroup']
  }

  addChild() {
    if (!this.majorGroup.children || this.majorGroup.children == undefined) {
      this.majorGroup.children = []
    }

    if (this.form.controls.name.value != '') {
      this.majorGroup.children.push(this.form.controls.name.value)
    }
  }

  addRevenueCenter() {
    if (
      !this.majorGroup.revenueCenters ||
      this.majorGroup.revenueCenters == undefined
    ) {
      this.majorGroup.revenueCenters = []
    }
    this.newRevenueCenter = new RevenueCenter()
    this.newRevenueCenter.revenueCenter = this.rcForm.controls.rcName.value
    this.newRevenueCenter.revenueCenterReference = this.rcForm.controls.rcRef.value 
    this.newRevenueCenter.accountCode = this.rcForm.controls.rcAccountCode.value
    this.newRevenueCenter.discountAccount = this.rcForm.controls.rcDiscountAccount.value

    if (
      this.newRevenueCenter.revenueCenter != '' &&
      this.newRevenueCenter.accountCode != '' &&
      this.newRevenueCenter.discountAccount != ''
    ) {
      this.majorGroup.revenueCenters.push(this.newRevenueCenter)
    }
  }

  addFamilyGroup() {
    if (
      !this.majorGroup.familyGroups ||
      this.majorGroup.familyGroups == undefined
    ) {
      this.majorGroup.familyGroups = []
    }
    this.newFamilyGroup = new FamilyGroup()
    this.newFamilyGroup.familyGroup = this.fgForm.controls.familyGroup.value
    this.newFamilyGroup.departmentCode = this.fgForm.controls.departmentCode.value

    if (
      this.newFamilyGroup.familyGroup != '' &&
      this.newFamilyGroup.departmentCode != ''
    ) {
      this.majorGroup.familyGroups.push(this.newFamilyGroup)
    }
  }
}
