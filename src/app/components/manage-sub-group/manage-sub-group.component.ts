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
  selector: 'app-manage-sub-group',
  templateUrl: './manage-sub-group.component.html',
  styleUrls: ['./manage-sub-group.component.scss']
})
export class ManageSubGroupComponent implements OnInit {

  newGroup: Group = new Group();
  inParent: boolean = false;
  groupId: String = "";
  groupsList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no subgroups yet.</span>
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
      this.inParent = false;
      if(this.data != null && this.data.storage != undefined){
        localStorage.setItem('groupId', this.data.storage.id);
      }
      this.groupId = localStorage.getItem('groupId');
      this.getGroups(this.inParent, this.groupId);
  }

  
  backClicked() {
    this._location.back();
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
    this.groupsList.showLoading = true;
    this.loyaltyService.deleteAppGroups(flage, this.groupsList.selected).then((res: any) => {
      this.getGroups(this.inParent, this.groupId);
      this.groupsList.showLoading = false;
      this.groupsList.selected = [];
      this.snackBar.open("Groups deleted successfully.", null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.getGroups(this.inParent, this.groupId);
      this.groupsList.selected = [];
      this.groupsList.showLoading = false;
      this.snackBar.open("Can't delete Group.", null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    });
  }

  addSubGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
      width: '550px',
        data: { inParent: this.inParent,
                parentGroup: this.data.storage}
  });

  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      this.groupsList.showLoading = true;

      if(res.parentGroup == undefined)
      res.parentGroup = new Group();

      this.loyaltyService.addAppGroups(true, res.name, res.description, res.discountRate, res.discountId,
        res.parentGroup.id, res.image, "").then((result: any) => {
                      this.groupsList.showLoading = false;
        this.groupsList.selected = [];
        this.newGroup = new Group();
        this.getGroups(true, this.groupId);
        this.snackBar.open("Supgroup Added successfully.", null, {
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

  updateSubGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
      width: '550px',
      data: {group: this.groupsList.selected[0],
              inParent: this.inParent, parentGroup: this.groupsList.selected[0].parentGroup}
  });

  dialogRef.afterClosed().subscribe(res => {
    if (res) {
      this.groupsList.showLoading = true;

      if(res.parentGroup == undefined)
      res.parentGroup = new Group();

      this.loyaltyService.addAppGroups(false, res.name, res.description, res.discountRate, res.discountId,
        res.parentGroup.id, res.image, this.groupsList.selected[0].id).then((result: any) => {
                      this.groupsList.showLoading = false;
        this.groupsList.selected = [];
        this.newGroup = new Group();
        this.getGroups(true, this.groupId);
        this.snackBar.open("Supgroup updated successfully.", null, {
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
  //   const dialogRef = this.dialog.open(AddAppGroupComponent, {
  //     width: '550px',
  //     data: {group: this.groupsList.selected[0],
  //             inParent: this.inParent, parentGroup: this.groupId}
  //   });

  //   dialogRef.afterClosed().subscribe(res => {
  //     if (res) {
  //       this.groupsList.showLoading = true;
  //       this.loyaltyService.addAppGroups(this.newGroup, false).then((result: any) => {
  //         this.loyaltyService.addAppGroupsImage(false, res.name, res.description, res.discountRate, res.discountId,
  //            res.parentGroup, res.image, this.groupsList.selected[0].id).then((result: any) => {
  //           this.groupsList.showLoading = false;
  //           this.groupsList.selected = [];
  //           this.getGroups(this.inParent, this.groupId);
  //           this.newGroup = new Group();
  //           this.snackBar.open("Group updated successfully.", null, {
  //             duration: 2000,
  //             horizontalPosition: 'right',
  //             panelClass:"my-snack-bar-success"
  //           });
  
  //         }).catch(err => {
  //           this.groupsList.showLoading = false;
  //           this.groupsList.selected = [];
  //           this.newGroup = new Group();
  //           this.getGroups(this.inParent, this.groupId);
  //           let message = "";
  //           if(err.status === 401){
  //             message = ErrorMessages.SESSION_EXPIRED;
  //             this.sidNav.Logout();
  //           } else if (err.error.message){
  //             message = err.error.message;
  //           } else if (err.message){
  //             message = err.message;
  //           } else {
  //             message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
  //           }
  //           this.snackBar.open("Failed to upadte group." , null, {
  //             duration: 3000,
  //             horizontalPosition: 'right',
  //             panelClass:"my-snack-bar-fail"
  //           });
  //         });
  //       }).catch(err => {
  //         this.groupsList.showLoading = false;
  //         this.groupsList.selected = [];
  //         this.newGroup = new Group();
  //         this.getGroups(this.inParent, this.groupId);
  //         let message = "";
  //         if(err.status === 401){
  //           message = ErrorMessages.SESSION_EXPIRED;
  //           this.sidNav.Logout();
  //         } else if (err.error.message){
  //           message = err.error.message;
  //         } else if (err.message){
  //           message = err.message;
  //         } else {
  //           message = ErrorMessages.FAILED_TO_SAVE_CONFIG;
  //         }
  //         this.snackBar.open("Failed to upadte group."  , null, {
  //           duration: 3000,
  //           horizontalPosition: 'right',
  //           panelClass:"my-snack-bar-fail"
  //         });
  //       });
  //     }
  //   });

  }



}
