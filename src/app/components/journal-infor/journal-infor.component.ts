import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from "@angular/material";
import { SyncJobService } from "src/app/services/sync-job/sync-job.service";
import { Constants } from "src/app/models/constants";
import { JournalService } from "src/app/services/journal/journal.service";
import { SyncJob } from "src/app/models/SyncJob";
import { ErrorMessages } from "src/app/models/ErrorMessages";
import { SidenavResponsive } from "../sidenav/sidenav-responsive";
import { ExcelService } from "src/app/services/excel/excel.service";
import { saveAs } from "file-saver";
import { CsvService } from "src/app/services/csv/csv.service";
import { FileInfo } from "src/app/models/fileInfo";
import { DriveService } from "src/app/services/drive/drive.service";
import { SideNaveComponent } from '../side-nave/side-nave.component'

@Component({
  selector: "app-journal-infor",
  templateUrl: "./journal-infor.component.html",
  styleUrls: ["./journal-infor.component.scss"],
})
export class JournalInforComponent implements OnInit {
  loading = true;
  static getJournalsLoding = false;
  success = null;
  jobs = [];
  journals = [];
  selectedJob: SyncJob = null;
  state = "";

  constructor(
    private spinner: NgxSpinnerService,
    private sidNav: SideNaveComponent,
    private journalService: JournalService,
    private syncJobService: SyncJobService,
    private excelService: ExcelService,
    public snackBar: MatSnackBar,
    private csvService: CsvService,
    private driveService: DriveService
  ) {}

  ngOnInit() {
    this.getSyncJobs(Constants.CONSUMPTION_SYNC);
    this.state = localStorage.getItem("getJournalsLoding");

    if (this.state == "true") {
      JournalInforComponent.getJournalsLoding = true;
    } else {
      JournalInforComponent.getJournalsLoding = false;
    }
  }

  hasRole(reference) {
    return this.sidNav.hasRole(reference)
  }

  get staticgetJournalsLoding() {
    return JournalInforComponent.getJournalsLoding;
  }

  getJournalsJobSyncJob() {
    localStorage.setItem("getJournalsLoding", "true");
    JournalInforComponent.getJournalsLoding = true;

    this.journalService
      .getJournals()
      .toPromise()
      .then((res: any) => {
        this.getSyncJobs(Constants.CONSUMPTION_SYNC);

        localStorage.setItem("getJournalsLoding", "false");
        JournalInforComponent.getJournalsLoding = false;

        if (res.success) {
          if (res.files) {
            if (this.driveService.isSignedIn === true)
              this.uploadFilesToDrive(res.files);
          }
          this.snackBar.open(res.message, null, {
            duration: 2000,
            horizontalPosition: "center",
            panelClass: "my-snack-bar-success",
          });
        } else {
          console.log(res.message);
          this.snackBar.open(res.message.message, null, {
            duration: 3000,
            horizontalPosition: "center",
            panelClass: "my-snack-bar-fail",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.setItem("getJournalsLoding", "false");
        JournalInforComponent.getJournalsLoding = false;

        let message = "";
        if (err.status === 401) {
          message = ErrorMessages.SESSION_EXPIRED;
          this.sidNav.Logout();
        } else if (err.error.message) {
          message = err.error.message;
        } else if (err.message) {
          message = err.message;
        } else {
          message = ErrorMessages.FAILED_TO_SYNC;
        }

        this.snackBar.open(err.error.message, null, {
          duration: 3000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-fail",
        });
      });
  }

  getJournalsDB() {
    this.loading = true;
    this.syncJobService
      .getSyncJobData(Constants.CONSUMPTION_SYNC)
      .toPromise()
      .then((res: any) => {
        this.journals = res;

        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
      });
  }

  getSyncJobs(syncJobTypeName: string) {
    this.spinner.show();
    this.syncJobService
      .getSyncJobs(syncJobTypeName)
      .toPromise()
      .then((res: any) => {
        this.jobs = res;
        this.selectedJob = this.jobs[0];
        if (this.jobs.length > 0) {
          this.getSyncJobData();
        }
        this.spinner.hide();
        this.loading = false;
      })
      .catch((err) => {
        this.spinner.hide();
        this.loading = false;
      });
  }

  getSyncJobData() {
    this.spinner.show();

    this.syncJobService
      .getSyncJobDataById(this.selectedJob["id"])
      .toPromise()
      .then((res: any) => {
        this.journals = res;

        this.spinner.hide();
        this.loading = false;
      })
      .catch((err) => {
        this.spinner.hide();
        this.loading = false;
      });
  }

  exportToXLSX(): void {
    this.excelService.exportConsumptionToExcel(this.selectedJob.id).subscribe(
      (res) => {
        const blob = new Blob([res], { type: "application/vnd.ms.excel" });
        const file = new File([blob], "Consumption" + ".xlsx", {
          type: "application/vnd.ms.excel",
        });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-success",
        });
      },
      (err) => {
        console.error(err);
        this.snackBar.open("Fail to export, Please try agian", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-fail",
        });
      }
    );
  }

  exportToCSV(): void {
    this.csvService
      .exportSalesToCSV(this.selectedJob.id, Constants.CONSUMPTION_SYNC)
      .subscribe(
        (res) => {
          const blob = new Blob([res.body], { type: "application/vnd.ms.txt" });
          const file = new File([blob], "consumption" + ".ndf", {
            type: "application/vnd.ms.txt",
          });
          saveAs(file);

          this.snackBar.open("Export Successfully", null, {
            duration: 2000,
            horizontalPosition: "center",
            panelClass: "my-snack-bar-success",
          });
        },
        (err) => {
          console.error(err);
          this.snackBar.open("Fail to export, Please try agian", null, {
            duration: 2000,
            horizontalPosition: "center",
            panelClass: "my-snack-bar-fail",
          });
        }
      );
  }

  generateSingleFile(): void {
    this.csvService.generateSingleFile(Constants.CONSUMPTION_SYNC).subscribe(
      (res) => {
        const blob = new Blob([res.body], { type: "application/vnd.ms.txt" });
        const file = new File([blob], "sales" + ".ndf", {
          type: "application/vnd.ms.txt",
        });
        saveAs(file);

        this.snackBar.open("Export Successfully", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-success",
        });
      },
      (err) => {
        console.error(err);
        this.snackBar.open("Fail to export, Please try agian", null, {
          duration: 2000,
          horizontalPosition: "center",
          panelClass: "my-snack-bar-fail",
        });
      }
    );
  }

  uploadFilesToDrive(files): void {
    for (let file of files) {
      console.log(file);
    }
    const file = new File(["foo"], "fooSym.txt", {
      type: "text/plain",
    });

    const testFile: FileInfo = new FileInfo();
    testFile.Name = file.name;
    testFile.Blob = file;

    console.log(testFile);
    testFile.Progress = 10;
    this.driveService.importFile(
      "root",
      testFile,
      (res) => console.log("error", res),
      (res) => console.log("completesd", res),
      (res) => console.log("progress", res)
    );
  }
}
