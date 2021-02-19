import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { SyncJobType } from 'src/app/models/SyncJobType';
import { CsvService } from 'src/app/services/csv/csv.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';

@Component({
  selector: 'app-sync-exported-files',
  templateUrl: './sync-exported-files.component.html',
  styleUrls: ['./sync-exported-files.component.scss']
})
export class SyncExportedFilesComponent implements OnInit {
  @Input() syncJobType: SyncJobType;

  filesList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span class="classname">No Files found</span>
    </div>
  `
    },
    selected: [],
    usersCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    usersData: []
  };

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar,
     private csvService: CsvService,  private sidNav: SidenavResponsive) { }

  ngOnInit() {
    this.listSyncFiles();
  }

  onSelect({selected}) {
    this.filesList.selected.splice(0, this.filesList.selected.length);
    this.filesList.selected.push(...selected);
  }

  listSyncFiles() {
    this.spinner.show();
    this.csvService.listSalesSyncFiles().toPromise().then((res: any) => {
      this.filesList.usersData = res;

      this.spinner.hide();
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

      this.spinner.hide();
    });
  }

}
