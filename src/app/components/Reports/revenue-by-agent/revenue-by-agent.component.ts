import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { User } from 'src/app/models/user'
import { Paginate } from 'src/app/models/Paginate'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ExcelService } from 'src/app/services/excel/excel.service'
import { UserService } from 'src/app/services/user/user.service'
import { saveAs } from 'file-saver'
import { SideNaveComponent } from '../../side-nave/side-nave.component'

@Component({
  selector: 'app-revenue-by-agent',
  templateUrl: './revenue-by-agent.component.html',
  styleUrls: ['./revenue-by-agent.component.scss'],
})
export class RevenueByAgentComponent implements OnInit {
  agents: User[] = []
  actionSummary = []
  actionTypes: string[] = [
    'Charge Wallet',
    'Deduct From Wallet',
    'Entrance Amount',
  ]

  paginate = {} as Paginate
  filter = {
    fromDate: '',
    toDate: '',
    selectedAgent: '',
    actionType: '',
  }

  actionList = {
    paginateData: true as boolean,
    offset: 0,
    messages: {
      emptyMessage: `
        <div >
          <span style="font-size: 25px;text-align: center;">There are no actions.</span>
        </div>
      `,
    },
    selected: [],
    size: 10 as number,
    pageNumber: 1 as number,
    limit: 10 as number,
    actionsCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    actionData: [],
  }

  constructor(
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent,
    private userService: UserService,
    private authService: AuthService,
    private excelService: ExcelService,
  ) {
    this.paginate.pageNumber = 0
    this.paginate.limit = 10
  }

  ngOnInit(): void {
    this.getAgents()
    this.getActionSummary()
    this.countAgentsActions()
    this.getAgentsActions()
  }

  onSelect({ selected }) {
    this.actionList.selected.splice(0, this.actionList.selected.length)
    this.actionList.selected.push(...selected)
  }

  resetPicker(type) {
    if (type == 'fromDate') {
      this.filter.fromDate = null
    }
    if (type == 'toDate') {
      this.filter.toDate = null
    }

    this.getAgentsActions()
  }

  onLimitChange(limit) {
    this.actionList.limit = limit
    this.getAgentsActions();
  }

  
  changePage(pageInfo) {
    this.actionList.pageNumber = pageInfo.page
    this.getAgentsActions();
  }

  getAgents() {
    this.authService
      .getUsers()
      .toPromise()
      .then((res: any) => {
        this.agents = res
      })
      .catch((err) => {
        console.error(err)

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  countAgentsActions() {
    this.userService
      .countUserAction(
        this.filter.selectedAgent,
        this.filter.actionType,
        this.filter.fromDate,
        this.filter.toDate,
      )
      .toPromise()
      .then((res: any) => {
        this.actionList.actionsCount = res
      })
      .catch((err) => {
        console.error(err)
        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  getAgentsActions() {
    this.actionList.showLoading = true

    this.userService
      .getUserAction(
        this.filter.selectedAgent,
        this.filter.actionType,
        this.filter.fromDate,
        this.filter.toDate,
        this.actionList.pageNumber,
        this.actionList.limit
      )
      .toPromise()
      .then((res: any) => {
        this.actionList.actionData = res
        this.actionList.showLoading = false
      })
      .catch((err) => {
        console.error(err)
        this.actionList.showLoading = false

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })

  }

  getActionSummary() {
    this.userService
      .getUserActionSummary()
      .toPromise()
      .then((res: any) => {
        this.actionSummary = res
      })
      .catch((err) => {
        console.error(err)

        let message = ''
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        }
        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      })
  }

  extractExcelFile() {
    this.spinner.show()
    let fromDate = ''
    let toDate = ''

    if (this.filter.fromDate != null && this.filter.toDate != null) {
      fromDate = this.filter.fromDate
      toDate = this.filter.toDate
    }

    this.excelService
      .exportAgentActionExcel(
        this.filter.selectedAgent,
        this.filter.actionType,
        fromDate,
        toDate
      )
      .subscribe(
        (res) => {
          const blob = new Blob([res], { type: 'application/vnd.ms.excel' })
          const file = new File([blob], 'Agent_Actions' + '.xlsx', {
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

  getCurrency() {
    return JSON.parse(localStorage.getItem('account')).currency
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }
}
