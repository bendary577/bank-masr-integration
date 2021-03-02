import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ErrorMessages } from 'src/app/models/ErrorMessages';
import { ApplicationUser } from 'src/app/models/loyalty/ApplicationUser';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';
import { SidenavResponsive } from '../sidenav/sidenav-responsive';
import { AddAppUserComponent } from '../../components/add-app-user/add-app-user.component'  
import { Company } from 'src/app/models/loyalty/Company';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  newUser: ApplicationUser = new ApplicationUser();
  companies: Company[];

  usersList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span class="classname">No users found</span>
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

  constructor(private loyaltyService: LoyaltyService, public dialog: MatDialog, public snackBar: MatSnackBar
    , private sidNav: SidenavResponsive) { }

  ngOnInit() {
    this.getUsers();
    this.getCompanies();
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

  getCompanies(){
    this.loyaltyService.getAppCompanies().toPromise().then((res: any) => {
      this.companies = res;
    }).catch(err => {
    });
  }

  addUserDialog(){
    const dialogRef = this.dialog.open(AddAppUserComponent, {
        width: '550px',
        data: {
          companies: this.companies
        }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.newUser.name = res.name;
        this.newUser.group = res.group;
        this.newUser.company = res.company;
        this.newUser.deleted = false;

        this.usersList.showLoading = true;
        this.loyaltyService.addAppUsers(this.newUser, true).then(result => {
          this.getUsers();

          this.newUser = new ApplicationUser();
          this.usersList.showLoading = false;

          this.snackBar.open("Add sub-group successfully.", null, {
            duration: 2000,
            horizontalPosition: 'right',
            panelClass:"my-snack-bar-success"
          });
        }).catch(err => {
          this.newUser = new ApplicationUser();
          this.usersList.showLoading = false;

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
