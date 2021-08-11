import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { Moment } from 'moment';
import { LocaleConfig } from 'ngx-daterangepicker-material';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { FilterComponent } from '../filter/filter.component';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.scss']
})
export class SupportComponent implements OnInit {
  public form: FormGroup;
  dateRange  = '2019-20-35';
  selected: any;
  moment = moment;
  calendarLocale: LocaleConfig;
  ranges: any;
  calendarPlaceholder: string;
  selectedRange: null;
  minDate: Moment;
  maxDate: Moment;
  user;

  dialogRef: any;

  constructor(private formBuilder: FormBuilder, public snackBar: MatSnackBar,public dateRangeDialog: MatDialog,
     private loyaltyService: LoyaltyService) {
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

      this.form = this.formBuilder.group({
      store: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")]],
      group: ['', Validators.required],
      dateRange: this.dateRange,
      module:[''],
      selected:['']
      });
    }
  


  onExportClick(): void {
    if (this.form.invalid){
      this.snackBar.open("Please fill form values" , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }else{

      console.log(this.selectedRange)


      //In case Sen Data
      this.dialogRef.close({
        name: this.form.controls.name.value,
        email: this.form.controls.email.value,
        group: this.form.controls.group.value,
      });


    }
  }

  openCalenderDialog(){
    const dialogRef = this.dateRangeDialog.open(FilterComponent, {
      width: '1100px',
    });
    dialogRef.afterClosed().subscribe(res => {
      if (res) {
      }
    })
  }
  
  print(){
    console.log(this.selected)
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
}
