import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { DilogServiceService } from '../dialog/dilog-service.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-opera-booking-dash-board',
  templateUrl: './opera-booking-dash-board.component.html',
  styleUrls: ['./opera-booking-dash-board.component.scss']
})
export class OperaBookingDashBoardComponent implements OnInit {
  success = false;
  searchInput = "";
  static getBookingLoding = false;
  
  bookingList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no booking data.</span>
        </div>
      `
    },
    selected: [],
    bookingCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    bookingData: [] 
  };

  cancelBookingList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no cancel booking data.</span>
        </div>
      `
    },
    selected: [],
    bookingCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: false,
    inputSearch: '' as string,
    bookingData: [] 
  };

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive, public dialogService: DilogServiceService,
    private syncJobService: SyncJobService) { }

  ngOnInit(): void {
    this.getBookingData("", "");
    this.getCancelBookingData("", "cancel");
  }

  filterBooking(event){
    this.getBookingData(this.searchInput, "");
    this.getCancelBookingData(this.searchInput, "cancel");
  }

  getBookingData(filter, status){
    this.bookingList.showLoading = true;
    this.bookingList.bookingData = [];
    
    this.syncJobService.getSyncJobDataByBookingNo(filter, status).toPromise().then((res: any) => {
      this.bookingList.bookingData = res;
      this.bookingList.showLoading = false;
    }).catch(err => {
      let message = "Error happend, Please try again.";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
         this.sidNav.Logout();

      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.bookingList.showLoading = false;
    });
  }

  getCancelBookingData(filter, status){
    this.cancelBookingList.showLoading = true;
    this.cancelBookingList.bookingData = [];

    this.syncJobService.getSyncJobDataByBookingNo(filter, status).toPromise().then((res: any) => {
      this.cancelBookingList.bookingData = res;
      this.cancelBookingList.showLoading = false;
    }).catch(err => {
      let message = "Error happend, Please try again.";
      if(err.status === 401){
         message = ErrorMessages.SESSION_EXPIRED;
         this.sidNav.Logout();

      } else if (err.error.message){
        message = err.error.message;
      } else if (err.message){
        message = err.message;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

      this.cancelBookingList.showLoading = false;
    });
  }

  onSelect({selected}) {
    this.bookingList.selected.splice(0, this.bookingList.selected.length);
    this.bookingList.selected.push(...selected);
  }

  get staticgetBookingLoading() {
    return OperaBookingDashBoardComponent.getBookingLoding ;
  }

  viewJSON(row){
    this.dialogService.newBookingModal(row);
  }

}
