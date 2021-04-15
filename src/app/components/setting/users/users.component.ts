
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel, MatPaginator, MatTableDataSource, MatSnackBar, MatDialog} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/user";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/services/auth/auth.service';
import { AddUserComponent } from '../../add-vendor/add-vendor.component';

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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar, private authService:AuthService,
    public dialog: MatDialog) { }

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

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.authService.addUser(res, true).toPromise().then(result => {
          this.getUsers()
        }).catch(err => {
          this.spinner.hide();
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'right',
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
          this.getUsers()
        }).catch(err => {
          this.spinner.hide();
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'right',
          });
        });
      }
    });
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
