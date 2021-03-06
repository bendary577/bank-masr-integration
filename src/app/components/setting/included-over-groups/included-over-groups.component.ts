import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig, MatSnackBar } from '@angular/material'
import { JournalService } from 'src/app/services/journal/journal.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { GeneralSettingsService } from 'src/app/services/generalSettings/general-settings.service';
import { Response } from 'src/app/models/Response';
import { GeneralSettings } from 'src/app/models/GeneralSettings';
import { OverGroup } from 'src/app/models/OverGroup';
import { Item } from 'src/app/models/Item';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ItemGroup } from 'src/app/models/ItemGroup';
import { MapCostCenterAccountCodeComponent } from '../../map-cost-center-account-code/map-cost-center-account-code.component'

@Component({
  selector: 'app-included-over-groups',
  templateUrl: './included-over-groups.component.html',
  styleUrls: ['./included-over-groups.component.scss']
})
export class IncludedOverGroupsComponent implements OnInit {
  groupLoading = true;
  saveLoading = true;
  itemLoading = true;
  showLoading = false;

  generalSettings: GeneralSettings;
  overGroups: Array<OverGroup> = [];
  itemGroups: Array<ItemGroup> = [];
  selectedOverGroups: Array<OverGroup> = [];

  mappedItems: Array<Item> = [];

  constructor(private journalService:JournalService, public dialog: MatDialog, public snackBar: MatSnackBar, private spinner: NgxSpinnerService,
    private generalSettingsService: GeneralSettingsService) { }

  ngOnInit() {
    this.getGeneralSettings();
  }

  getGeneralSettings() {
    this.generalSettingsService.getGeneralSettings().then((res) => {
      this.generalSettings = res as GeneralSettings;
      
      this.overGroups = this.generalSettings.overGroups;
      this.itemGroups = this.generalSettings.itemGroups;
      this.mappedItems = this.generalSettings.items;

      if(this.overGroups.length == 0){
        this.getOverGroups();
      }
    }).catch(err => {
      let message = "";
      if (err.error){
        message = err.error;
      } else if (err.message){
        message = err.message;
      } else {
        message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
      }

      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
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

  mapItemGroups() {
    this.spinner.show();
    this.itemLoading = true;
    this.journalService.mapItemGroups().toPromise().then((res: any) => {
      this.mappedItems = res.data;
      this.generalSettings.items = this.mappedItems;
      
      this.spinner.hide();
      this.itemLoading = false;

      if (res.success) {
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-success"
        });
      }
      else{
        this.snackBar.open(res.message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: "my-snack-bar-fail"
        });
      }

    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.itemLoading = false;

      this.snackBar.open(err.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass: "my-snack-bar-fail"
      });
    });
  }

  onSaveClick(): void {
    this.spinner.show();
    this.saveLoading = true;
    this.selectedOverGroups = [];

    let that = this;
    this.overGroups.forEach(function (overGroup) {
      if (overGroup.checked) {
        that.selectedOverGroups.push(overGroup)
      }
    });


    if(this.selectedOverGroups.length != 0) {
      this.generalSettings.overGroups = this.selectedOverGroups;
      this.generalSettingsService.updateGeneralSettings(this.generalSettings).then(result => {
        const response = result as Response;
        if (response.success) {
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



  openCostCenterAccountCodeMapping(overGroup) {
    const dialogConfig = new MatDialogConfig()
    dialogConfig.width = '420px'
    dialogConfig.maxWidth = '420px'
    dialogConfig.autoFocus = true
    dialogConfig.data = {overGroup}

    let dialogRef = this.dialog.open(MapCostCenterAccountCodeComponent, dialogConfig)

    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.onSaveClick()
      }
    })
  }

}
