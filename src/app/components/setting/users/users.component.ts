
import {Component, OnInit} from '@angular/core';
import {MatExpansionPanel, MatSnackBar, MatDialog} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/user";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AddUserComponent } from '../../add-vendor/add-vendor.component';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ViewUserComponent } from '../../view-user/view-user.component';
import { SideNaveComponent } from '../../side-nave/side-nave.component';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'users-config',
  templateUrl: 'users.component.html',
  styleUrls: ['users.component.scss'],
})

export class UsersComponent implements OnInit {
  loading = true;
  success = null;
  usersList = {
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-alngign: center;">There are no users yet.</span>
    </div>
  `
    },
    selected: [],
    usersCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    usersData: [], 
  };
  panelOpenState = true;
  displayedColumns: string[] = ['firstName', 'username', 'lastName'];

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar, private authService:AuthService,
    public dialog: MatDialog, private sidNav: SideNaveComponent) { }

  ngOnInit() {
    this.getUsers();
  }

  
  onSelect({selected}) {
    this.usersList.selected.splice(0, this.usersList.selected.length);
    this.usersList.selected.push(...selected);
  }

  getUsers() {
    this.spinner.show();
    this.authService.getUsers().toPromise().then((res: any) => {
      this.usersList.usersData = res;
      this.spinner.hide();
      this.usersList.showLoading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.usersList.showLoading = false;
    });
  }

  deleteUsers(flage){
    if(this.usersList.selected.length > 0){
      this.usersList.showLoading = true;
      this.authService.deleteUsers(flage, this.usersList.selected[0]).then((res: any) => {
        
        this.getUsers();
        this.usersList.selected = [];
        this.usersList.showLoading = false;
  
        let message = "User deleted successfully.";
        if(flage == 'false'){        
          message = "User restored successfully.";
        }
  
        this.snackBar.open(message, null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-success"
        });
      }).catch(err => {
        this.usersList.showLoading = false;
        this.usersList.selected = [];
        this.getUsers();
        let message = "Can't delete user.";
        this.snackBar.open(message , null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass:"my-snack-bar-fail"
        });
      });
    }else{
      let message = "Please select at least one user!";
      this.snackBar.open(message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });
    }
  }


  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.authService.addUser(res, true).toPromise().then(result => {
          this.usersList.selected = [];
          this.getUsers();
          this.spinner.hide();
          this.snackBar.open("User Added successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.usersList.selected = [];
          this.spinner.hide();
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

  openUpdateDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '550px',
      data:{user: this.usersList.selected[0]}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.authService.addUser(res, false).toPromise().then(result => {
          this.getUsers();
          this.usersList.selected = [];
          this.spinner.hide();
          this.snackBar.open("User updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.usersList.selected = [];
          this.spinner.hide();
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

  openViewUserDialog(): void {
    const dialogRef = this.dialog.open(ViewUserComponent, {
      width: '550px',
      data:{user: this.usersList.selected[0]}
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();

        this.authService.addUser(res, false).toPromise().then(result => {
          this.getUsers();
          this.usersList.selected = [];
          this.spinner.hide();
          this.snackBar.open("User updated successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.usersList.selected = [];
          this.spinner.hide();
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

  validateViewUser(){
    if(this.usersList.selected.length == 1){
      return false;
    }else{
      return true;
    }
  }

  validateDeleteUsers(){
    if(this.usersList.selected.length != 1){
      return true;
    }

    // check if there any deleted user selected
    var i;
    for (i = 0; i < this.usersList.selected.length; i++) {
      let usersList = this.usersList.selected[i] as User;

      if (usersList.deleted) {
          return true;
      }
    }

    return false;
  }

  validateRestoreUsers(){
    if(this.usersList.selected.length != 1){
      return true;
    }

    // check if there any deleted user selected
    var i;
    for (i = 0; i < this.usersList.selected.length; i++) {
      let usersList = this.usersList.selected[i] as User;

      if (!usersList.deleted) {
          return true;
      }

    return false;
    }
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
const EXPANSION_PANEL_ANIMATION_TIMING = '500ms cubic-bezier(0.4,0.0,0.2,1)';
MatExpansionPanel['decorators'][0].args[0].animations = [
  trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ])];

const ELEMENT_DATA: User[] = [
/*
  {id:0,password:"",firstName:"Admin", username: 'Admin', lastName:'test',token:""},
*/

];
