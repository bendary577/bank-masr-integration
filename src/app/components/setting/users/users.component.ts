
import {Component, OnInit, ViewChild} from '@angular/core';
import {MatExpansionPanel, MatPaginator, MatTableDataSource} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {User} from "../../../models/user";

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
  displayedColumns: string[] = ['firstName', 'username', 'lastName'];
 // dataSource = new MatTableDataSource<User>(ELEMENT_DATA);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
   // this.dataSource.paginator = this.paginator;
  }
  panelOpenState = true;
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
  {id:0,password:"",firstName:"ahmed", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"mostafa", username: 'test', lastName:'',token:""},
  {id:0,password:"",firstName:"laura", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"Sa", username: '', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'oxygen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
  {id:0,password:"",firstName:"", username: 'Hydrogen', lastName:'',token:""},
*/

];
