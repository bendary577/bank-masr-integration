import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  usersList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span class="classname">No Groups found</span>
    </div>
  `
    },
    selected: [],
    locationsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    locationsData: [] 
  };

  constructor() { }

  ngOnInit() {
    this.getUsers();
  }

  onSelect({selected}) {
    this.usersList.selected.splice(0, this.usersList.selected.length);
    this.usersList.selected.push(...selected);
  }

  getUsers(){
    this.usersList.showLoading = false;
  }
}
