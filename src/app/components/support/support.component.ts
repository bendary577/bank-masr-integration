import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { DaterangepickerDirective, LocaleConfig } from 'ngx-daterangepicker-material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ExportRequest } from 'src/app/models/ExportRequest';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  @ViewChild(DaterangepickerDirective, { static: false }) pickerDirective: DaterangepickerDirective;
  public form: FormGroup;
  generalSettings;
  moment = moment;
  calendarLocale: LocaleConfig;
  ranges: any;
  calendarPlaceholder: string;
  selectedRange;
  minDate: Moment;
  maxDate: Moment;
  exportRequest= new ExportRequest();
  user;
  locationList = {
    pagantion: true,
    messages: {
      empityMessages:`
      <div >
          <span class="classname">No Locations found</span>
        </div>
      `    
    },
    selected: [],
    locationsCount: 0,
    pagesFilter: [10, 25 , 50 , 75 , 100 ],
    showLoading: false,
    locationData: []
  }

  syncJoobsTypesList = {
    pagantion: true,
    messages: {
      empityMessages:`
      <div >
          <span class="classname">No Locations found</span>
        </div>
      `    
    },
    selected: [],
    syncJoobsTypesCount: 0,
    pagesFilter: [10, 25 , 50 , 75 , 100 ],
    showLoading: false,
    syncJoobsTypesData: []
  }

  dialogRef: any;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar,public dateRangeDialog: MatDialog, private syncJobSerivce: SyncJobService,
     private loyaltyService: LoyaltyService, private spinner: NgxSpinnerService, private generalSettingsService: GeneralSettingsService) {
      this.calendarLocale = {
        customRangeLabel: 'Pick a date...',
        applyLabel: 'Apply',
        format: 'DD/MM/YYYY',
        daysOfWeek: ['su', 'mo', 'tu', 'we', 'th', 'fr', 'sa'],
        monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        firstDay: 1,
        direction: 'ltr',
      };
      this.ranges = {
        'Current day': [moment(), moment()],
        'Current week': [moment().startOf('isoWeek'), moment().endOf('isoWeek')],
        'Next 2 days': [moment().add(1, 'days'), moment().add(2, 'days')],
        'Next 3 days': [moment().add(1, 'days'), moment().add(3, 'days')],
        'Next weekend': [this.getNextSaturday(), this.getNextSunday()]
      };
      this.calendarPlaceholder = 'All';
      this.minDate = moment();
      this.maxDate = moment().clone().add(10, 'years');
      }
 
  ngOnInit() {
      if(localStorage.getItem("user") != undefined || localStorage.getItem("user") != null){
       this.user = JSON.parse(localStorage.getItem("user"))
      }
      this.getGeneralSetting();
      this.getSyncJobTypes();      
      this.form = this.formBuilder.group({
      store: [[], Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
      dateRange: ['', [Validators.required]],
      module:[[],[Validators.required]],
      });
  }
  
  getGeneralSetting(){
      this.generalSettingsService.getGeneralSettings().then((res: any) =>{
          this.generalSettings = res as GeneralSettings;
          if(this.generalSettings.locations){
            this.locationList.locationData = this.generalSettings.locations;
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
  
  getSyncJobTypes() {
    this.syncJobSerivce.getSyncJobTypesDB().toPromise().then((res: any) => {
      this.syncJoobsTypesList.syncJoobsTypesData = res;
    }).catch(err => {
      let message = "Error happend, Please try again.";
      if (err.status === 401) {
        message = ErrorMessages.SESSION_EXPIRED;
      } else if (err.error.message) {
        message = err.error.message;
      } else if (err.message) {
        message = err.message;
      }
      this.snackBar.open(message, null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    });
  }

  onExportClick(): void {
    console.log(this.form.controls.store.value)
    console.log(this.form.controls.module.value)
    if (this.form.invalid || this.selectedRange["endDate"] == undefined){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }else{
/*
JSON.stringify(this.selectedRange),
        this.form.controls.email.value, 
        this.form.controls.store.value,
        this.form.controls.module.value
*/
      this.exportRequest.costCenters = this.form.controls.store.value;
      this.exportRequest.syncJobTypes = this.form.controls.module.value;
      this.exportRequest.email = this.form.controls.email.value;
      this.exportRequest.dateRange = this.form.controls.dateRange.value;
      console.log(this.exportRequest)
      this.spinner.show();
      this.syncJobSerivce.
        getExportedfiles(this.exportRequest).toPromise().then((res: any) =>{
          this.spinner.hide();
          console.log(res);
          this.snackBar.open(res["message"], null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.spinner.hide();
          let message = "Error happend, Please try again.";
            if (err.status === 401) {
              message = ErrorMessages.SESSION_EXPIRED;
            } else if (err.error.message) {
                message = err.error.message;
            } else if (err.message) {
              message = err.message;
            }
              this.snackBar.open(message, null, {
                duration: 3000,
                horizontalPosition: 'center',
                panelClass: "my-snack-bar-fail"
            });
        });
    }
  }

  private getNextSaturday() {
    const dayINeed = 6; // for Saturday
    const today = moment().isoWeekday();
    if (today <= dayINeed) {
      return moment().isoWeekday(dayINeed);
    } else {
      return moment().add(1, 'weeks').isoWeekday(dayINeed);
    }
  }

  private getNextSunday() {
    const dayINeed = 7; // for Sunday
    const today = moment().isoWeekday();
    if (today <= dayINeed) {
      return moment().isoWeekday(dayINeed);
    } else {
      return moment().add(1, 'weeks').isoWeekday(dayINeed);
    }
  }

  openDatepicker() {
    this.pickerDirective.open();
  }

}
