import { Component, OnInit, ViewChild } from '@angular/core'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { OperaPaymentService } from 'src/app/services/operaPayment/opera-payment.service'
import { SidenavResponsive } from '../../sidenav/sidenav-responsive'

@Component({
  selector: 'app-opera-payments',
  templateUrl: './opera-payments.component.html',
  styleUrls: ['./opera-payments.component.scss'],
})
export class OperaPaymentsComponent implements OnInit {
  loading = false
  fromDate = ''
  toDate = ''
  transactions = []

  // Transaction Chart
  public data: any
  public selectedSliceLabel: string = 'No Transactions'
  public selectedSliceValue: string = '0%'

  // @ViewChild("chart", { static: true })
  // public chart: IgxDoughnutChartComponent;

  constructor(
    private spinner: NgxSpinnerService,
    private sidNav: SidenavResponsive,
    private operaPaymentService: OperaPaymentService,
  ) {}

  ngOnInit(): void {
    this.getOperationTypes()
    this.countOperationTypes()
  }

  getOperationTypes() {
    this.loading = true
    this.spinner.show()

    this.operaPaymentService
      .listOperaTransactions(this.fromDate, this.toDate)
      .toPromise()
      .then((res: any) => {
        this.transactions = res
        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
        console.error(err)
        this.spinner.hide()
        this.loading = false

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        }
      })
  }

  countOperationTypes() {
    this.loading = true
    this.spinner.show()

    this.operaPaymentService
      .countOperaTransactions(this.fromDate, this.toDate)
      .toPromise()
      .then((res: any) => {
        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
        console.error(err)
        this.spinner.hide()
        this.loading = false

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        }
      })
  }
}
