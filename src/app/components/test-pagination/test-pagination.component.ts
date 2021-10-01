import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service';

@Component({
  selector: 'app-test-pagination',
  templateUrl: './test-pagination.component.html',
  styleUrls: ['./test-pagination.component.scss']
})
export class TestPaginationComponent implements OnInit {

  transactions;

  @ViewChild('paginator') paginator: MatPaginator;

  constructor(private loyaltyService: LoyaltyService) { }

  ngOnInit(): void {

    this.getTransactionPages();
  }

  getTransactionPages() {
    this.loyaltyService.getTransactionPages().then(res => {
      console.log(res);

      this.transactions = res["data"]["content"];
    })
  }

  ngAfterViewInit() {
    console.log(this.paginator);

    // this.dataSource = new MatTableDataSource(this.EmpData);
  }

  getValue(event){
    console.log(event);

  }

}
