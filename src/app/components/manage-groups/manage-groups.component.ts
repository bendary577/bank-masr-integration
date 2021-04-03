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

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  loading = false;
  newGroup: Group = new Group();

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
    private sidNav: SidenavResponsive, public dialog: MatDialog,
    private loyaltyService: LoyaltyService, private router: Router, private data: Data) { }

  ngOnInit() {
    this.getGroups();
  }

  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(selected);
  }

  openSupGroup(group: Group){
    this.data.storage = group;
    this.router.navigate([Constants.MANAGE_GROUPS]);
  }

  getGroups(){
    this.groupsList.showLoading = true;
    this.loyaltyService.getAppGroups().toPromise().then((res: any) => {
      this.groupsList.groupsData = res;
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    });
  }

  deleteGroups(){
    this.groupsList.showLoading = true;
    this.loyaltyService.deleteAppGroups(this.groupsList.selected[0][0]).then((res: any) => {
      console.log(this.groupsList.selected)
      this.getGroups();
      this.groupsList.showLoading = false;
    }).catch(err => {
      console.log(this.groupsList.selected)
      this.groupsList.showLoading = false;
    });
  }

  addGroupDialog(){
    const dialogRef = this.dialog.open(AddAppGroupComponent, {
        width: '550px',
        data: {
          groups: this.groupsList.groupsData
        }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.loading = true;

        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.parentGroup = res.parentGroup;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;
        this.loyaltyService.addAppGroups(this.newGroup, true).then(result => {
          this.loading = false;
          this.groupsList.showLoading = false;
          this.getGroups();
          this.newGroup = new Group();

          this.snackBar.open("Add comapny successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.groupsList.showLoading = false;

          this.newGroup = new Group();

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
      data: {group: this.groupsList.selected[0][0],
        groups: this.groupsList.groupsData
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newGroup = this.groupsList.selected[0][0];
        this.newGroup.name = res.name;
        this.newGroup.description = res.description;
        this.newGroup.discountRate = res.discountRate;
        this.newGroup.parentGroup = res.parentGroup;
        this.newGroup.deleted = false;

        this.groupsList.showLoading = true;
        this.loyaltyService.addAppGroups(this.newGroup, false).then(result => {
          this.loading = false;
          this.groupsList.showLoading = false;
          this.getGroups();
          this.newGroup = new Group();

          this.snackBar.open("Comapny updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });

        }).catch(err => {
          this.loading = false;
          this.groupsList.showLoading = false;

          this.newGroup = new Group();

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
