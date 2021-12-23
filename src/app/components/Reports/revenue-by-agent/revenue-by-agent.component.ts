import { Component, OnInit } from '@angular/core'
import { MatSnackBar } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { UserService } from 'src/app/services/user/user.service'
import { SidenavResponsive } from '../../sidenav/sidenav-responsive'

@Component({
  selector: 'app-revenue-by-agent',
  templateUrl: './revenue-by-agent.component.html',
  styleUrls: ['./revenue-by-agent.component.scss'],
})
export class RevenueByAgentComponent implements OnInit {
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
    showLoading: false,
    inputSearch: '' as string,
    actionData: [],
  }

  constructor(
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    private sidNav: SidenavResponsive,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getAgentsActions()
  }

  onSelect({ selected }) {
    this.actionList.selected.splice(0, this.actionList.selected.length)
    this.actionList.selected.push(...selected)
  }

  getAgentsActions() {
    this.spinner.show()

    this.userService
      .getUserAction('', '')
      .toPromise()
      .then((res: any) => {
        this.actionList.actionData = res

        this.spinner.hide()
        this.actionList.showLoading = false
      })
      .catch((err) => {
        console.error(err)

        this.spinner.hide()
        this.actionList.showLoading = false
      })
  }
}
