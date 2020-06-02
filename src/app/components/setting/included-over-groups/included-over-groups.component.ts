import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { JournalService } from 'src/app/services/journal/journal.service';
import { Constants } from 'src/app/models/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { Response } from 'src/app/models/Response';

@Component({
  selector: 'app-included-over-groups',
  templateUrl: './included-over-groups.component.html',
  styleUrls: ['./included-over-groups.component.scss']
})
export class IncludedOverGroupsComponent implements OnInit {
  groupLoading = true;
  saveLoading = true;
  overGroups = [];
  selectedOverGroups = [];

  constructor(private journalService:JournalService, public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.getOverGroups();
  }

  getOverGroups() {
    this.groupLoading = true;
    this.spinner.show();
    this.journalService.getOverGroups("").toPromise().then((res: any) => {
      this.overGroups = res.data;
      this.groupLoading = false;
      this.spinner.hide();
    }).catch(err => {
      console.error(err);
      this.snackBar.open(err.error.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
      this.groupLoading = false;
      this.spinner.hide();
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;
    this.selectedOverGroups = [];

    let that = this;
    this.overGroups.forEach(function (overGroup) {
      if (overGroup.checked){
        that.selectedOverGroups.push(overGroup)
      }
    });


    if(this.selectedOverGroups.length != 0){
      this.generalSettingsService.updateOverGroups(this.selectedOverGroups).then(result => {
        const response = result as Response;
        if (response.success){
          this.snackBar.open('Save configuration successfully.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-success"
          });
        }else{
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass:"my-snack-bar-fail"
          });
        }
        this.spinner.hide();
        this.saveLoading = false;
      }
      ).catch(err => {
        this.snackBar.open('An error has occurred.', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
        this.spinner.hide();
        this.saveLoading = false;
      });
    }

  }

}
