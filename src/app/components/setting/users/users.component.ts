
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
  usersList = [];
  panelOpenState = true;
  displayedColumns: string[] = ['firstName', 'username', 'lastName'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(private spinner: NgxSpinnerService, public snackBar: MatSnackBar, private authService:AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.spinner.show();
    this.authService.getUsers().toPromise().then((res: any) => {
      this.usersList = res;

      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.authService.addUser(res).toPromise().then(result => {
          this.getUsers()
        }).catch(err => {
          this.spinner.hide();
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'center',
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
