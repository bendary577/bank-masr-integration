import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {

  groupsList = {
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
    this.getGroups();
  }

  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(...selected);
  }

  getGroups(){
    this.groupsList.showLoading = false;
  }
}
