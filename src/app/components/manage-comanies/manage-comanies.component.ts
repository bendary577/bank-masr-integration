import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-manage-comanies',
  templateUrl: './manage-comanies.component.html',
  styleUrls: ['./manage-comanies.component.scss']
})
export class ManageComaniesComponent implements OnInit {

  comapaniesList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span class="classname">No Companies found</span>
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
    this.getCompanies();
  }

  onSelect({selected}) {
    this.comapaniesList.selected.splice(0, this.comapaniesList.selected.length);
    this.comapaniesList.selected.push(...selected);
  }

  getCompanies(){
    this.comapaniesList.showLoading = false;
  }

}
