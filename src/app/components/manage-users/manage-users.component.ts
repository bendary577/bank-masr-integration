import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { AddAppUserComponent } from '../../components/add-app-user/add-app-user.component'  
import { Group } from 'src/app/models/loyalty/Group';
import {Location} from '@angular/common';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
 
  loading = false;
  newUser: ApplicationUser = new ApplicationUser();
  groups: Group[];

  usersList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div style="text-align: center;">
      <p class="user-name">No users have been created yet</p>
    </div>
  `
    },
    selected: [],
    locationsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    usersData: [] 
  };

  constructor(private loyaltyService: LoyaltyService, public dialog: MatDialog, private _location: Location,
     public snackBar: MatSnackBar, private sidNav: SidenavResponsive) { }

  ngOnInit() {
    this.getUsers();
    this.getGroups();
  }
  
  onSelect({selected}) {
    this.usersList.selected.splice(0, this.usersList.selected.length);
    this.usersList.selected.push(...selected);
  }

  getUsers(){
    this.usersList.showLoading = true;
    this.loyaltyService.getAppUsers().toPromise().then((res: any) => {
      this.usersList.usersData = res;
      this.usersList.showLoading = false;
    }).catch(err => {
      this.usersList.showLoading = false;
    });
  }

  deleteUsers(flage){
    this.usersList.showLoading = true;
    this.loyaltyService.deleteAppUsers(flage, this.usersList.selected).then((res: any) => {
      this.getUsers();
      this.usersList.selected = [];
      this.usersList.showLoading = false;

      let message = "User deleted successfully.";
      if(!flage){
        message = "User restored successfully.";
      }

      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    }).catch(err => {
      this.usersList.showLoading = false;
      this.usersList.selected = [];
      this.getUsers();

      let message = "Can't delete user, Please try agian.";
      if(!flage){
        message = "Can't restore user, Please try agian.";
      }

      this.snackBar.open(message, null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    });
  }

  getGroups(){
    this.loyaltyService.getAllAppGroups(1).toPromise().then((res: any) => {
      this.groups = res;
    }).catch(err => {
      this.snackBar.open("Can't fetch group, Please try agian.", null, {
        duration: 2000,
        horizontalPosition: 'right',
        panelClass:"my-snack-bar-success"
      });
    });
  }

  addUserDialog(){
    const dialogRef = this.dialog.open(AddAppUserComponent, {
        width: '550px',
        data: {
          groups: this.groups
        }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {

        this.usersList.showLoading = true;
        this.loyaltyService.addApplicationUser(true, res.name, res.email, res.group.id, res.image, "").then((result: any) => {
          this.loading = true;
          this.getUsers();
          this.newUser = new ApplicationUser();
          this.usersList.showLoading = false;
          this.usersList.selected = [];

          this.snackBar.open("User added successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',  
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.newUser = new ApplicationUser();
          this.usersList.showLoading = false;
          this.getUsers();
          this.usersList.selected = [];
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

  updateUserDialog(){
    const dialogRef = this.dialog.open(AddAppUserComponent, {
      
      width : '550px',
      data: {
        user : this.usersList.selected[0],
        groups: this.groups
      }
    });

    dialogRef.afterClosed().subscribe(res => {
      if(res) {
        this.loading = true;
        this.usersList.showLoading = true;
        if(res.group == undefined)
        res.group = new Group();
        this.loyaltyService.addApplicationUser(false, res.name, res.email, res.group.id, res.image,
                                               this.usersList.selected[0]).then((result: any) => {
            this.loading = false;
            this.usersList.showLoading = false;
            this.newUser = new ApplicationUser();
            this.usersList.selected = [];

            this.snackBar.open("User updated successfully.", null, {
              duration: 2000,
              horizontalPosition: 'right',
              panelClass : "my-snack-bar-success"
            });
          }).catch(err => {
            this.loading = false;
            this.usersList.showLoading = false;
            this.usersList.selected = [];

            this.newUser = new ApplicationUser();

            let message = "";
            if(err.status === 401){
              message = ErrorMessages.SESSION_EXPIRED;
              this.sidNav.Logout();
            }else if(err.error.message){
              message = err.error.message;
            }else if(err.message){
              message = ErrorMessages.FAILED_TO_SAVE_CONFIG
            }

            this.snackBar.open(message , null, {
              duration: 3000,
              horizontalPosition: 'right',
              panelClass:"my-snack-bar-fail"
            });
          })
      }
    })
  }

  validateUpdateUser(){
    if(this.usersList.selected.length != 1){
      return true;
    }

    if(this.usersList.selected.length == 1){
      let updatedUser = this.usersList.selected[0];
    
      if(updatedUser.deleted){
        return true;
      }
    }

    return false;
  }

}
