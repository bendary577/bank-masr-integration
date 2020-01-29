import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { AddVendorComponent } from '../add-vendor/add-vendor.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';

@Component({
  selector: 'app-scheduler-configuration',
  templateUrl: './scheduler-configuration.component.html',
  styleUrls: ['./scheduler-configuration.component.scss']
})
export class SchedulerConfigurationComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  duration = "Daily"
  hour = "1"
  day = "1"
  dayName = "Sunday"
  loading = true

  hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  days = []
  daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(public dialogRef: MatDialogRef<AddVendorComponent>, private spinner: NgxSpinnerService,
    public schedulerService: SchedulerService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      duration: this.duration,
      day: this.day,
      dayName: this.dayName,
      hour: this.hour
    });
  }

  ngOnInit() {
    this.getCurrentDays()
  }

  getCurrentDays(){
    this.loading = true;
    this.spinner.show();
      this.schedulerService.getCurrentDays().toPromise().then((res: any) => {
        this.days = res.data;
        this.loading = false;
        this.spinner.hide();
  
      }).catch(err => {
        console.error(err);
        this.loading = false;
        this.spinner.hide();
  
      });  
   
  }

}
