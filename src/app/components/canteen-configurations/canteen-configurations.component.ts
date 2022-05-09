import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-canteen-configurations',
  templateUrl: './canteen-configurations.component.html',
  styleUrls: ['./canteen-configurations.component.scss']
})
export class CanteenConfigurationsComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  loading = false;

  hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(
    public dialogRef: MatDialogRef<CanteenConfigurationsComponent>,
    private spinner: NgxSpinnerService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      duration: this.data.group.canteenConfiguration.duration,
      day: this.data.group.canteenConfiguration.day,
      dayName: this.data.group.canteenConfiguration.dayName,
      hour: this.data.group.canteenConfiguration.hour,
      chargeAmount : this.data.group.canteenConfiguration.chargeAmount
    });
  }

  validate() : boolean {
    return true
  }

  ngOnInit() {}

  changeAccumulate(value){
    if(value === false){
      this.data.group.canteenConfiguration.accumulate = true
    }else{
      this.data.group.canteenConfiguration.accumulate = false
    }
  }

}
