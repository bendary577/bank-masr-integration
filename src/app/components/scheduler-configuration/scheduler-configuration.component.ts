import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { AddUserComponent } from '../add-vendor/add-vendor.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { SchedulerService } from 'src/app/services/scheduler/scheduler.service';
import { Constants } from 'src/app/models/constants';
import { AccSyncTypeService } from 'src/app/services/accSyncType/acc-sync-type.service';
import { SyncJobType } from 'src/app/models/SyncJobType';


@Component({
  selector: 'app-scheduler-configuration',
  templateUrl: './scheduler-configuration.component.html',
  styleUrls: ['./scheduler-configuration.component.scss']
})
export class SchedulerConfigurationComponent implements OnInit {

  public form: FormGroup;
  submitted = false;
  loading = true;
  syncJobType: SyncJobType;

  hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23]
  days = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
  daysName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  constructor(public dialogRef: MatDialogRef<SchedulerConfigurationComponent>, private spinner: NgxSpinnerService,
    public schedulerService: SchedulerService, private accSyncTypeService:AccSyncTypeService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close({
      duration: this.syncJobType.configuration.duration,
      day: this.syncJobType.configuration.day,
      dayName: this.syncJobType.configuration.dayName,
      hour: this.syncJobType.configuration.hour
    });
  }

  ngOnInit() {
    this.getSyncJobType()
  }

  getSyncJobType() {
    this.loading = true;
    this.accSyncTypeService.getAccSyncJobType(Constants.SYNC_TYPE_SCHEDULER).toPromise().then((res: any) => {
      this.syncJobType = res;
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.loading = false;
    });
  }

  getCurrentDays() {
    this.spinner.show();
      this.schedulerService.getCurrentDays().toPromise().then((res: any) => {
        this.days = res.data;
        this.spinner.hide();

      }).catch(err => {
        console.error(err);
        this.spinner.hide();
      });
  }
}
