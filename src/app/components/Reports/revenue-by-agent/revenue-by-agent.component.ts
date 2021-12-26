import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { User } from 'src/app/models/user'
import { AuthService } from 'src/app/services/auth/auth.service'
import { ExcelService } from 'src/app/services/excel/excel.service'
import { UserService } from 'src/app/services/user/user.service'
import { SidenavResponsive } from '../../sidenav/sidenav-responsive'
import { saveAs } from 'file-saver'

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

  filter = {
    fromDate: null,
    toDate: null,
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
    newBookingCount: 0 as number,
    pagesFilter: [10, 25, 50, 75, 100],
    showLoading: true,
    inputSearch: '' as string,
    actionData: [],
  }

  constructor(
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive,
    private userService: UserService,
    private authService: AuthService,
    private excelService: ExcelService,
  ) {}

  ngOnInit(): void {
    this.getAgents()
    this.getActionSummary()
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

  getAgentsActions() {
    if (
      (this.filter.fromDate == null && this.filter.toDate == null) ||
      (this.filter.fromDate != null && this.filter.toDate != null)
    ) {
      let fromDate = ''
      let toDate = ''

      if (this.filter.fromDate != null && this.filter.toDate != null) {
        fromDate = this.filter.fromDate
        toDate = this.filter.toDate
      }

      this.actionList.showLoading = true

      this.userService
        .getUserAction(
          this.filter.selectedAgent,
          this.filter.actionType,
          fromDate,
          toDate,
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
    } else {
      this.snackBar.open('Please enter date range.', null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass: 'my-snack-bar-fail',
      })
    }
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
        toDate,
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

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }
}
