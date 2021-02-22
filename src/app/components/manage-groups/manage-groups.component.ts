import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Data } from 'src/app/models/data';
import { Company } from 'src/app/models/loyalty/Company';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-manage-groups',
  templateUrl: './manage-groups.component.html',
  styleUrls: ['./manage-groups.component.scss']
})
export class ManageGroupsComponent implements OnInit {
  company: Company = new Company();
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
    groupsData: [] 
  };

  constructor( private loyaltyService: LoyaltyService, private router: Router, private data: Data) { }

  ngOnInit() {
    this.company = this.data.storage;
    this.getGroups();
  }

  onSelect({selected}) {
    this.groupsList.selected.splice(0, this.groupsList.selected.length);
    this.groupsList.selected.push(...selected);
  }

  getGroups(){
    this.groupsList.showLoading = true;
    this.loyaltyService.getAppGroups(this.company.id).toPromise().then((res: any) => {
      this.groupsList.groupsData = res;
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    });
  }

  deleteCompanies(){
    this.groupsList.showLoading = true;
    this.loyaltyService.deleteAppGroups(this.groupsList.selected).then((res: any) => {
      this.getGroups();
      this.groupsList.showLoading = false;
    }).catch(err => {
      this.groupsList.showLoading = false;
    });
  }
}
