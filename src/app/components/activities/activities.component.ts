import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {
  filterBy = "Daily";
  imagePath = './src/assets/user.png'
  reportsList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-align: center;">There are no reports yet.</span>
    </div>
  `
    },
    selected: [],
    reportssCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    reportsData: [] 
  };


  constructor() { }

  ngOnInit() {
    this.getReports();
  }

  getReports(){
    this.reportsList.showLoading = false;
    this.reportsList.reportsData = [
      {
        name: "Ahmed Mohamed",
        group: "Ovio",
        amount: 200,
        discountRate: 10,
        amountAD: 180,
        creationDate: "2021-02-23T07:59:38.363+0000"
      },
      {
        name: "Ahmed Mohamed",
        group: "Ovio",
        amount: 50,
        discountRate: 10,
        amountAD: 45,
        creationDate: "2021-02-23T07:59:38.363+0000"
      },
      {
        name: "Ahmed Mohamed",
        group: "Ovio",
        amount: 20,
        discountRate: 10,
        amountAD: 18,
        creationDate: "2021-02-23T07:59:38.363+0000"
      },
      {
        name: "Amr Mohamed",
        group: "Arab Aluminum",
        amount: 200,
        discountRate: 5,
        amountAD: 190,
        creationDate: "2021-02-23T07:59:38.363+0000"
      },
      {
        name: "Ahmed Mohamed",
        group: "Ovio",
        amount: 200,
        discountRate: 10,
        amountAD: 180,
        creationDate: "2021-02-23T07:59:38.363+0000"
      },
      {
        name: "Ali Mostafa",
        group: "Top Management",
        amount: 198.90,
        discountRate: 25,
        amountAD: 153.90,
        creationDate: "2021-02-23T05:00:38.363+0000"
      }
  ];
  }

}
