
import { Component } from '@angular/core';
import {MatExpansionPanel, MatSnackBar} from "@angular/material";
import {animate, state, style, transition, trigger} from "@angular/animations";
import { NgxSpinnerService } from 'ngx-spinner';
import { SyncJobService } from 'src/app/services/sync-job/sync-job.service';
import { Account } from 'src/app/models/Account';
import { AccountService } from 'src/app/services/account/account.service';

/**
 * @title Basic expansion panel
 */
@Component({
  selector: 'setting-config',
  templateUrl: 'configuration.component.html',
  styleUrls: ['configuration.component.scss'],
})

export class ConfigurationComponent {
  loading = true;
  account: Account;
  newAccount: Account;

  constructor(private spinner: NgxSpinnerService, private syncJobService:SyncJobService,
    public snackBar: MatSnackBar, public accountService: AccountService) { }

  panelOpenState = true;

  getAccount() {
    this.spinner.show();
    this.accountService.getAccount().toPromise().then((res: any) => {
      this.account = res;
     
      this.spinner.hide();
      this.loading = false;
    }).catch(err => {
      console.error(err);
      this.spinner.hide();
      this.loading = false;
    });
  }

  addAccount() {
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

}
const EXPANSION_PANEL_ANIMATION_TIMING = '500ms cubic-bezier(0.4,0.0,0.2,1)';
MatExpansionPanel['decorators'][0].args[0].animations = [
  trigger('bodyExpansion', [
    state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
    state('expanded', style({ height: '*', visibility: 'visible' })),
    transition('expanded <=> collapsed, void => collapsed',
      animate(EXPANSION_PANEL_ANIMATION_TIMING)),
  ])];
