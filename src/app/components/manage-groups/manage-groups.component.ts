import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Constants } from 'src/app/models/constants';
import { Data } from 'src/app/models/data';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { Group } from 'src/app/models/loyalty/Group';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { AddAppGroupComponent } from '../add-app-group/add-app-group.component';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import {Location} from '@angular/common';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  newGroup: Group = new Group();
  parentGroup: Group = new Group();
  groupsList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no groups yet.</span>
    </div>
  `
    },
    selected: [],
    groupsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    groupsData: [] as Group[] 
  };

  constructor(public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive, public dialog: MatDialog, private _location: Location,
    private loyaltyService: LoyaltyService, private router: Router, public data: Data) { }

  ngOnInit() {
    console.log(this.data.inParent)
    if (this.data.storage != null && this.data.storage != undefined){
      this.data.inParent = false;
      this.parentGroup = this.data.storage;
      this.getGroups(this.data.inParent, this.parentGroup);
    }else{
      this.data.inParent = true;
      this.getGroups(this.data.inParent, this.parentGroup);
    }
  }

  
  backClicked() {
    this._location.back();
  }
  
  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(...selected);
  }

  openSupGroup(group: Group){
    this.data.storage = group;
    this.router.navigate([Constants.MANAGE_GROUPS]);
  }

  getGroups(isParent, group){
    this.groupsList.showLoading = true;
    this.loyaltyService.getAppGroups(isParent, group).toPromise().then((res: any) => {
      this.groupsList.groupsData = res;
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    });
  }

  deleteGroups(flage){
    this.groupsList.showLoading = true;
    this.loyaltyService.deleteAppGroups(flage, this.groupsList.selected).then((res: any) => {
      if (this.data.inParent){
        this.getGroups(this.data.inParent, this.parentGroup);
      }else{
        this.parentGroup = this.data.storage
        this.getGroups(this.data.inParent, this.parentGroup);
      }
      this.groupsList.showLoading = false;
      this.groupsList.selected = [];
      this.snackBar.open("Groups deleted successfully.", null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.getGroups(this.data.inParent, this.parentGroup);
      this.groupsList.selected = [];
      this.groupsList.showLoading = false;
      this.snackBar.open("Can't delete Group.", null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    });
  }

  addGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
        width: '550px',
        data: { inParent: this.data.inParent,
                parentGroup: this.parentGroup}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.discountId = res.discountId;
        this.newGroup.parentGroup = res.parentGroup;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;

        this.loyaltyService.addAppGroups(this.newGroup, true).then((result: any) => {
          this.loyaltyService.addAppGroupsImage(res.image, result["id"]).then((result: any) =>{
            this.groupsList.showLoading = false;
            this.groupsList.selected = [];
            this.newGroup = new Group();
            this.getGroups(this.data.inParent, this.parentGroup);
            this.snackBar.open("Add group successfully.", null, {
              duration: 2000,
              horizontalPosition: 'right',
              panelClass:"my-snack-bar-success"
            });
          }).catch(err => {
            this.groupsList.showLoading = false;
            this.groupsList.selected = [];
            this.newGroup = new Group();
            this.getGroups(this.data.inParent, this.parentGroup);
            let message = "";
            if(err.status === 401){
              message = ErrorMessages.SESSION_EXPIRED;
              this.sidNav.Logout();
            } else if (err.error.message){
              message = err.error.message;
            } else if (err.message){
              message = err.message;
            } else {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
            }
            this.snackBar.open(message , null, {
              duration: 3000,
              horizontalPosition: 'right',
              panelClass:"my-snack-bar-fail"
            });
          });
        }).catch(err => {
          this.groupsList.showLoading = false;
          this.groupsList.selected = [];
          this.newGroup = new Group();
          this.getGroups(this.data.inParent, this.parentGroup);
          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
          }
          this.snackBar.open(message , null, {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });
  }

  updateGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
      width: '550px',
      data: {group: this.groupsList.selected[0],
              inParent: this.data.inParent, parentGroup: this.parentGroup}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newGroup = this.groupsList.selected[0];
        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.discountId = res.discountId;
        this.newGroup.parentGroup = res.parentGroup;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;
        this.loyaltyService.addAppGroups(this.newGroup, false).then((result: any) => {
          this.loyaltyService.addAppGroupsImage(res.image, result["id"]).then((result: any) => {
            this.groupsList.showLoading = false;
            this.groupsList.selected = [];
            this.getGroups(this.data.inParent, this.parentGroup);
            this.newGroup = new Group();
            this.snackBar.open("Group updated successfully.", null, {
              duration: 2000,
              horizontalPosition: 'right',
              panelClass:"my-snack-bar-success"
            });
  
          }).catch(err => {
            this.groupsList.showLoading = false;
            this.groupsList.selected = [];
            this.newGroup = new Group();
            this.getGroups(this.data.inParent, this.parentGroup);
            let message = "";
            if(err.status === 401){
              message = ErrorMessages.SESSION_EXPIRED;
              this.sidNav.Logout();
            } else if (err.error.message){
              message = err.error.message;
            } else if (err.message){
              message = err.message;
            } else {
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
            }
            this.snackBar.open(message , null, {
              duration: 3000,
              horizontalPosition: 'right',
              panelClass:"my-snack-bar-fail"
            });
          });
        }).catch(err => {
          this.groupsList.showLoading = false;
          this.groupsList.selected = [];
          this.newGroup = new Group();
          this.getGroups(this.data.inParent, this.parentGroup);
          let message = "";
          if(err.status === 401){
            message = ErrorMessages.SESSION_EXPIRED;
            this.sidNav.Logout();
          } else if (err.error.message){
            message = err.error.message;
          } else if (err.message){
            message = err.message;
          } else {
            message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
          }
          this.snackBar.open(message , null, {
            duration: 3000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-fail"
          });
        });
      }
    });

  }

}
