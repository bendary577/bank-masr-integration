
import { Component, OnInit } from '@angular/core';
import {MatExpansionPanel, MatSnackBar, MatDialog} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { NgxSpinnerService } from 'ngx-spinner';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account/account.service';
import { AddAccountComponent } from '../../add-account/add-account.component';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'setting-config',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
})

export class ConfigurationComponent  implements OnInit{
  loading = true;
  account: Account;
  newAccount: Account;
  panelOpenState = true;
  addRole = false;

  constructor(private spinner: NgxSpinnerService, private syncJobService:SyncJobService,
    public snackBar: MatSnackBar, public accountService: AccountService, public dialog: MatDialog) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.loading = true;
    this.spinner.show();
    this.accountService.getAccount().toPromise().then((res: any) => {
      this.account = res;     
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {''
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  addAccountDialog(){
    const dialogRef = this.dialog.open(AddAccountComponent, {
      width: '550px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res) {
        this.spinner.show();
        this.accountService.addAccount(res).then(result => {
          this.spinner.hide();

        }).catch(err => {
          this.spinner.hide();
          this.snackBar.open('An error has occurred.', null, {
            duration: 2000,
            horizontalPosition: 'right',
          });
        });
      }
    });
  }

  addAccount() {
    this.loading = true;
    this.spinner.show();
    this.accountService.addAccount(this.newAccount).then((res: any) => {
      this.account = res;
     
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  updateAccount() {
    this.loading = true;
    this.spinner.show();
    this.accountService.updateAccount(this.account).then((res: any) => {     
      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(res.message, null, {
        duration: 2000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-success"
      });

    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;

      this.snackBar.open(err.message , null, {
        duration: 3000,
        horizontalPosition: 'center',
        panelClass:"my-snack-bar-fail"
      });

    });
  }

}
const EXPANSION_PANEL_ANIMATION_TIMING = '500ms cubic-bezier(0.4,0.0,0.2,1)';
MatExpansionPanel['decorators'][0].args[0].animations = [
  trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ])];
