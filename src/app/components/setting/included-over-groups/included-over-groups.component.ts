import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { JournalService } from 'src/app/services/journal/journal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { Response } from 'src/app/models/Response';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { OverGroup } from 'src/app/models/OverGroup';


@Component({
  selector: 'app-included-over-groups',
  templateUrl: './included-over-groups.component.html',
  styleUrls: ['./included-over-groups.component.scss']
})
export class IncludedOverGroupsComponent implements OnInit {
  groupLoading = true;
  saveLoading = true;

  generalSettings: GeneralSettings;
  overGroups = [];
  selectedOverGroups: Array<OverGroup> = [];

  constructor(private journalService:JournalService, public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.getGeneralSettings();
    this.getOverGroups();
  }

  getGeneralSettings(){
    this.generalSettingsService.getGeneralSettings().then((res: Response) => {
      this.generalSettings = res.data as GeneralSettings;
    }).catch(err => {
      console.error(err);
    });
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
      this.generalSettings.overGroups = this.selectedOverGroups;
      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
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
    }else{
      this.spinner.hide();
    }

  }

}
