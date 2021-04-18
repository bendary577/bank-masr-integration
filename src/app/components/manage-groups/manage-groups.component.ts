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
import { DeleteAppGroupComponent } from '../delete-app-group/delete-app-group.component';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  newGroup: Group = new Group();
  inParent: boolean = false;
  groupId: String = "";
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
      this.inParent = true;
      this.getGroups(this.inParent, this.groupId);
  }

  
  backClicked() {
    this._location.back();
  }
  
  openSupGroup(group: Group){
    if(this.inParent){
    this.data.storage = group;
    this.router.navigate([Constants.MANAGE_SUB_GROUPS]);
    }
  }

  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(...selected);
  }

  getGroups(isParent, group){
    this.groupsList.showLoading = true;
    this.loyaltyService.getAppGroups(isParent, group, 2).toPromise().then((res: any) => {
      this.groupsList.groupsData = res;
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    }); 
  }

  deleteGroups(flage){

    const dialogRef = this.dialog.open(DeleteAppGroupComponent, {
      width: '550px',
      data: { isDelete: flage}
  });
  
    dialogRef.afterClosed().subscribe(res => {
      
    this.groupsList.showLoading = true;
    
    if(res){

      if(res.parentGroup == undefined)
      res.parentGroup = new Group();

    this.loyaltyService.deleteAppGroups(flage, this.groupsList.selected, res.withUsers, res.parentGroup.id).then((res: any) => {
      this.getGroups(this.inParent, this.groupId);
      this.groupsList.showLoading = false;
      this.groupsList.selected = [];

      let message = "Groups deleted successfully.";
      if(flage == 'false'){
        message = "Groups restored successfully.";
      }

      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.getGroups(this.inParent, this.groupId);
      this.groupsList.selected = [];
      this.groupsList.showLoading = false;

      let message = "Can't delete Group.";
      if(flage == 'false'){
        message = "Can't restore Group.";
      }
      
      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    });
  }else{
    this.groupsList.showLoading = false;
  }
  });
  }

  addGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
        width: '550px',
        data: { inParent: this.inParent}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.groupsList.showLoading = true;

        if(res.parentGroup == undefined)
        res.parentGroup = new Group();

        this.loyaltyService.addAppGroups(true, res.name, res.description, res.discountId,
          res.parentGroup.id, res.image, "").then((result: any) => {
                        this.groupsList.showLoading = false;
          this.groupsList.selected = [];
          this.newGroup = new Group();
          this.getGroups(true, this.groupId);
          this.snackBar.open("Group Added successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.groupsList.showLoading = false;
          this.groupsList.selected = [];
          this.newGroup = new Group();
          this.getGroups(true, this.groupId);
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
          this.snackBar.open(message, null, {
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
      data: {inParent: this.inParent, group: this.groupsList.selected[0] }
    });

    dialogRef.afterClosed().subscribe(res => {
    if (res) {
      this.groupsList.showLoading = true;

      if(res.parentGroup == undefined)
      res.parentGroup = new Group();

      this.loyaltyService.addAppGroups(false, res.name, res.description, res.discountId,
        res.parentGroup.id, res.image, this.groupsList.selected[0].id).then((result: any) => {
                      this.groupsList.showLoading = false;
        this.groupsList.selected = [];
        this.newGroup = new Group();
        this.getGroups(true, this.groupId);
        this.snackBar.open("Group updated successfully.", null, {
          duration: 2000,
          horizontalPosition: 'right',
          panelClass:"my-snack-bar-success"
        });
      }).catch(err => {
        this.groupsList.showLoading = false;
        this.groupsList.selected = [];
        this.newGroup = new Group();
        this.getGroups(true, this.groupId);
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
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'right',
          panelClass:"my-snack-bar-fail"
        });
      });
    }
    });
  }

  validateUpdateGroup(){
    if(this.groupsList.selected.length != 1){
      return true;
    }

    if(this.groupsList.selected.length == 1){
      let updatedGroup = this.groupsList.selected[0] as Group;
    
      if(updatedGroup.deleted){
        return true;
      }
    }

    return false;
  }

  validateDeleteGroup(){
    if(this.groupsList.selected.length == 0){
      return true;
    }

    // check if there any deleted groups selected
    var i;
    for (i = 0; i < this.groupsList.selected.length; i++) {
      let selectedGroup = this.groupsList.selected[i] as Group;

      if (selectedGroup.deleted) {
          return true;
      }
    }

    return false;
  }

  validateRestoreGroup(){
    if(this.groupsList.selected.length == 0){
      return true;
    }

    // check if there any deleted groups selected
    var i;
    for (i = 0; i < this.groupsList.selected.length; i++) {
      let selectedGroup = this.groupsList.selected[i] as Group;

      if (!selectedGroup.deleted) {
          return true;
      }
    }

    return false;
  }

}
