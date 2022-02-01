import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VoucherListRoutingModule } from './voucher-list-routing.module';
import { VoucherTransactionsComponent } from '../voucher-transactions/voucher-transactions.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { AddVoucherDialogComponent } from '../add-voucher-dialog/add-voucher-dialog.component';
import { VoucherListComponent } from './voucher-list.component';
import { BasicModule } from 'src/app/shared/basic.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [
    VoucherListComponent,
    AddVoucherDialogComponent,
    ConfirmationDialogComponent,
    VoucherTransactionsComponent,
  ],
  imports: [
    CommonModule,
    VoucherListRoutingModule,

    BasicModule,
    SharedModule,
    AngularMaterialModule,
  ]
})
export class VoucherModule { }
