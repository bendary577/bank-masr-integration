import { Component, OnInit } from '@angular/core'
import { MatSnackBar, MatDialog } from '@angular/material'
import { NgxSpinnerService } from 'ngx-spinner'
import { Constants } from 'src/app/models/constants'
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service'
import { WastageService } from 'src/app/services/wastage/wastage.service'
import { SyncJob } from 'src/app/models/SyncJob'
import { ErrorMessages } from 'src/app/models/ErrorMessages'
import { SidenavResponsive } from '../sidenav/sidenav-responsive'
import { ExcelService } from 'src/app/services/excel/excel.service'
import { saveAs } from 'file-saver'
import { CsvService } from 'src/app/services/csv/csv.service'
import { SideNaveComponent } from '../side-nave/side-nave.component'

@Component({
  selector: 'app-wastage-infor',
  templateUrl: './wastage-infor.component.html',
  styleUrls: ['./wastage-infor.component.scss'],
})
export class WastageInforComponent implements OnInit {
  loading = true
  static getWastageLoading = false
  success = null
  jobs = []
  wastage = []
  selectedJob: SyncJob = null
  state = ''

  constructor(
    private spinner: NgxSpinnerService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    private sidNav: SideNaveComponent,
    private syncJobService: SyncJobService,
    private wastageService: WastageService,
    private excelService: ExcelService,
    private csvService: CsvService,
  ) {}

  ngOnInit() {
    this.getSyncJobs(Constants.WASTARGE_SYNC)
    this.state = localStorage.getItem('getWastageLoading')

    if (this.state === 'true') {
      WastageInforComponent.getWastageLoading = true
    } else {
      WastageInforComponent.getWastageLoading = false
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  get staticgetWastageLoading() {
    return WastageInforComponent.getWastageLoading
  }

  getWastageSyncJob() {
    localStorage.setItem('getWastageLoading', 'true')
    WastageInforComponent.getWastageLoading = true

    this.wastageService
      .getWastage()
      .toPromise()
      .then((res: any) => {
        this.success = res.success
        if (this.success) {
          this.snackBar.open(res.message, null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          })
        } else {
          this.snackBar.open(res.message, null, {
            duration: 3000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-fail',
          })
        }

        this.getSyncJobs(Constants.WASTARGE_SYNC)

        localStorage.setItem('getWastageLoading', 'false')
        WastageInforComponent.getWastageLoading = false
      })
      .catch((err) => {
        this.getSyncJobs(Constants.WASTARGE_SYNC)

        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        }

        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })

        localStorage.setItem('getWastageLoading', 'false')
        WastageInforComponent.getWastageLoading = false
      })
  }

  getSyncJobs(syncJobTypeName: string) {
    this.spinner.show()
    this.syncJobService
      .getSyncJobs(syncJobTypeName)
      .toPromise()
      .then((res: any) => {
        this.jobs = res
        this.selectedJob = this.jobs[0]
        if (this.jobs.length > 0) {
          this.getSyncJobData()
        }
        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        }

        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })

        this.spinner.hide()
        this.loading = false
      })
  }

  getSyncJobData() {
    this.spinner.show()
    this.syncJobService
      .getSyncJobDataById(this.selectedJob['id'])
      .toPromise()
      .then((res: any) => {
        this.wastage = res

        this.spinner.hide()
        this.loading = false
      })
      .catch((err) => {
        let message = 'Error happend, Please try again.'
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED
          this.sidNav.Logout()
        } else if (err.error.message) {
          message = err.error.message
        } else if (err.message) {
          message = err.message
        }

        this.snackBar.open(message, null, {
          duration: 3000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })

        this.spinner.hide()
        this.loading = false
      })
  }

  exportToXLSX(): void {
    this.excelService.exportWastageToExcel(this.selectedJob.id).subscribe(
      (res) => {
        const blob = new Blob([res], { type: 'application/vnd.ms.excel' })
        const file = new File([blob], 'Wastage' + '.xlsx', {
          type: 'application/vnd.ms.excel',
        })
        saveAs(file)

        this.snackBar.open('Export Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      },
      (err) => {
        console.error(err)
        this.snackBar.open('Fail to export, Please try agian', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      },
    )
  }

  generateSingleFile(): void {
    this.csvService.generateSingleFile(Constants.WASTARGE_SYNC).subscribe(
      (res) => {
        const blob = new Blob([res.body], { type: 'application/vnd.ms.txt' })
        const file = new File([blob], Constants.WASTARGE_SYNC + '.ndf', {
          type: 'application/vnd.ms.txt',
        })
        saveAs(file)

        this.snackBar.open('Export Successfully', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-success',
        })
      },
      (err) => {
        console.error(err)
        this.snackBar.open('Fail to export, Please try agian', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      },
    )
  }

  exportToCSV() {}

  generateCustomReport() {
    this.excelService.generateWastageReport().subscribe(
      (res) => {
        const blob = new Blob([res], { type: 'application/vnd.ms.excel' })
        const file = new File([blob], 'WastageCustomReport' + '.xlsx', {
          type: 'application/vnd.ms.excel',
        })
        saveAs(file)

        this.snackBar.open(
          'Generate Wastage Custom Report Successfully',
          null,
          {
            duration: 2000,
            horizontalPosition: 'center',
            panelClass: 'my-snack-bar-success',
          },
        )
      },
      (err) => {
        console.error(err)
        this.snackBar.open('Fail to generate report, Please try agian', null, {
          duration: 2000,
          horizontalPosition: 'center',
          panelClass: 'my-snack-bar-fail',
        })
      },
    )
  }
}
