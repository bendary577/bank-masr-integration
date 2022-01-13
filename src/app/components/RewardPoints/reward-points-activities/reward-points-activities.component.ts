import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js'
import { Label } from 'ng2-charts'
import { NgxSpinnerService } from 'ngx-spinner'
import { Constants } from 'src/app/models/constants'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { ExcelService } from 'src/app/services/excel/excel.service'
import { LoyaltyService } from 'src/app/services/loyalty/loyalty.service'
import { SideNaveComponent } from '../../side-nave/side-nave.component'
import { saveAs } from 'file-saver'

@Component({
  selector: 'app-reward-points-activities',
  templateUrl: './reward-points-activities.component.html',
  styleUrls: ['./reward-points-activities.component.scss'],
})
export class RewardPointsActivitiesComponent implements OnInit {
  filterBy = 'Daily'
  imagePath = './src/assets/user.png'

  totalSpendLoading = true
  totalSpendM: any
  users = []
  groups = []
  topGroups = []
  topRevenueCenters = []
  guests = []
  fromDate = ''
  toDate = ''
  selectedGroupId = ''
  selectedRevenue = ''
  selectedGuestName = ''
  selectedCardNum = ''
  selectedCardStatues = ''
  guestAverage = 2
  selections = []
  props = { 'background-color': '#e07d93' }
  props2 = { 'background-color': '#ffb560' }
  noFilter = true
  rvcBarChartLabels: Label[]
  rvcBarChartType: ChartType
  rvcBarChartPlugins
  rvcBarChartLegend
  rvcBlue
  rvcBarChartData: ChartDataSets[]
  public barChartOptions: ChartOptions
  chartCreated = false
  dateRnageFlage = 'Total'

  transactionList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
    <div >
      <span style="font-size: 25px;text-align: center;">There are no reports yet.</span>
    </div>
  `,
    },
    selected: [],
    pageNumber: 1 as number,
    limit: 10 as number,
    transactionCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    transactionData: [],
    allTransactionDataBeforeFilter: [],
    firstTime: true,
  }

  constructor(
    public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent,
    private loyaltyService: LoyaltyService,
    private excelService: ExcelService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit() {
    this.getTopUsers()
    this.getTopGroups()
    this.totalSpend('Today')
    this.getTransactions()
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  hasFeature(reference) {
    return this.sidNav.hasFeature(reference)
  }

  onLimitChange(limit) {
    this.transactionList.limit = limit
    this.getTransactions()
  }

  changePage(pageInfo) {
    this.transactionList.pageNumber = pageInfo.page
    this.getTransactions()
  }

  createChart() {
    if (!this.chartCreated) {
      this.chartCreated = true
      this.barChartOptions = {
        responsive: true,
      }
      this.rvcBarChartType = 'bar'
      this.rvcBarChartLegend = true
      this.rvcBarChartPlugins = []
      this.rvcBlue = [
        'rgba(224, 108, 112, 1)',
        'rgba(224, 108, 112, 1)',
        'rgba(224, 108, 112, 1)',
      ]
    }
  }

  validateDateRange(dateRange) {
    if (this.dateRnageFlage == dateRange) {
      return true
    } else {
      return false
    }
  }

  totalSpend(date) {
    this.totalSpendLoading = true
    this.dateRnageFlage = date
    this.loyaltyService
      .getTotalSpend(date)
      .toPromise()
      .then((res: any) => {
        this.totalSpendLoading = false

        this.totalSpendM = res['totalSpend']
        this.topRevenueCenters = res['topRevenueCenters']
        if (
          res['revenues'] == null ||
          res['revenues'] == undefined ||
          res['revenues'] == []
        ) {
          this.rvcBarChartLabels = []
        } else {
          this.rvcBarChartLabels = res['revenues']
        }
        if (
          res['expenses'] == null ||
          res['expenses'] == undefined ||
          res['expenses'] == []
        ) {
          this.rvcBarChartData = [
            { data: [], label: 'Sales Per Revenue Center' },
          ]
        } else {
          this.rvcBarChartData = [
            { data: res['expenses'], label: 'Sales Per Revenue Center' },
          ]
        }
        this.createChart()
      })
      .catch((err) => {
        this.totalSpendLoading = false

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  getTransactionsCount() {
    this.loyaltyService
      .countTransactions(
        Constants.REDEEM_VOUCHER,
        this.fromDate,
        this.toDate,
        this.selectedGroupId,
      )
      .toPromise()
      .then((res: any) => {
        this.transactionList.transactionCount = res
      })
      .catch((err) => {
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  getTransactions() {
    this.getTransactionsCount()
    this.transactionList.showLoading = true
    this.loyaltyService
      .getTransactions(
        Constants.REDEEM_VOUCHER,
        this.fromDate,
        this.toDate,
        this.selectedGroupId,
        this.transactionList.pageNumber,
        this.transactionList.limit,
      )
      .toPromise()
      .then((res: any) => {
        this.transactionList.transactionData = res
        this.allTransactionDataBeforeFilter()
        this.transactionList.showLoading = false
      })
      .catch((err) => {
        this.transactionList.showLoading = false
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  getTopUsers() {
    this.loyaltyService
      .getTopUsers()
      .toPromise()
      .then((res: any) => {
        this.users = res
      })
      .catch((err) => {
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }

        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  getTopGroups() {
    this.loyaltyService
      .getTopGroups()
      .toPromise()
      .then((res: any) => {
        this.groups = res
        this.topGroups = this.groups.slice(0, 3)
      })
      .catch((err) => {
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        } else {
          message = ErrorMessages.FAILED_TO_SAVE_CONFIG
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  allTransactionDataBeforeFilter() {
    if (this.transactionList.firstTime) {
      this.transactionList.firstTime = false
      this.transactionList.allTransactionDataBeforeFilter = this.transactionList.transactionData
    }
  }

  restFilters() {
    this.fromDate = ''
    this.toDate = ''
    this.selectedGroupId = ''
  }

  getCurrency() {
    return JSON.parse(localStorage.getItem('account')).currency
  }

  extractExcelFile() {
    this.spinner.show()
    this.excelService
      .exportRPActivitiesExcel(this.transactionList.transactionData)
      .subscribe(
        (res) => {
          const blob = new Blob([res], { type: 'application/vnd.ms.excel' })
          const file = new File([blob], 'Transactions' + '.xlsx', {
            type: 'application/vnd.ms.excel',
          })
          saveAs(file)

          this.snackBar.open('Export Successfully', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          })
          this.spinner.hide()
        },
        (err) => {
          this.spinner.hide()
          console.error(err)
          this.snackBar.open('Fail to export, Please try agian', null, {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
        },
      )
  }


  resetFilter() {
    this.fromDate = ''
    this.toDate = ''
    this.selectedGroupId = ''
    this.transactionList.transactionData = this.transactionList.allTransactionDataBeforeFilter
    this.getTransactions()
  }
}
