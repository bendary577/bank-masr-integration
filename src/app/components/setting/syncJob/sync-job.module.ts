import { NgModule } from '@angular/core';

import { SyncJobRoutingModule } from './sync-job-routing.module';
import { SyncJobsconfigComponent } from './syncJobsconfig.component';
import { ExportedFileConfigurationComponent } from '../../configuration/exported-file-configuration/exported-file-configuration.component';
import { OhraConfigurationComponent } from '../../configuration/ohra-configuration/ohra-configuration.component';
import { BookedProductionConfigurationComponent } from '../../BookedProductionConfiguration/booked-production-configuration/booked-production-configuration.component';
import { WastageInforConfigurationComponent } from '../../wastage-infor-configuration/wastage-infor-configuration.component';
import { BookedTransferInforConfigurationComponent } from '../../booked-transfer-infor-configuration/booked-transfer-infor-configuration.component';
import { ApprovedInvoiceInforConfigurationComponent } from '../../approved-invoice-infor-configuration/approved-invoice-infor-configuration.component';
import { CreditNotesInforConfigurationComponent } from '../../credit-notes-infor-configuration/credit-notes-infor-configuration.component';
import { PosSalesInforConfigurationComponent } from '../../pos-sales-infor-configuration/pos-sales-infor-configuration.component';
import { PosSalesConfigurationComponent } from '../../pos-sales-configuration/pos-sales-configuration.component';
import { SuppliersInforConfigurationComponent } from '../../suppliers-infor-configuration/suppliers-infor-configuration.component';
import { BasicModule } from 'src/app/shared/basic.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AnalysisConfigurationComponent } from '../../configuration/analysis-configuration/analysis-configuration.component';
import { InforSystemConfigurationComponent } from '../../configuration/infor-system-configuration/infor-system-configuration.component';
import { AddTenderComponent } from '../../add-tender/add-tender.component';
import { AddTaxComponent } from '../../add-tax/add-tax.component';
import { AddDiscountComponent } from '../../add-discount/add-discount.component';
import { TenderConfigurationComponent } from '../../configuration/tender-configuration/tender-configuration.component';
import { TaxAnalysisConfigrutionComponent } from '../../configuration/tax-analysis-configrution/tax-analysis-configrution.component';
import { JournalsInforConfigurationsComponent } from '../../journals-infor-configurations/journals-infor-configurations.component';
import { CostOfGoodsConfigComponent } from '../../cost-of-goods-config/cost-of-goods-config.component';
import { CostOfGoodsOhraConfigComponent } from '../../cost-of-goods-ohra-config/cost-of-goods-ohra-config.component';
import { AngularMaterialModule } from 'src/app/angular-material.module';

@NgModule({
  declarations: [
    SyncJobsconfigComponent,

    SuppliersInforConfigurationComponent,
    PosSalesConfigurationComponent,
    PosSalesInforConfigurationComponent,
    CreditNotesInforConfigurationComponent,
    ApprovedInvoiceInforConfigurationComponent,
    BookedTransferInforConfigurationComponent,
    WastageInforConfigurationComponent,
    BookedProductionConfigurationComponent,
    JournalsInforConfigurationsComponent,
    CostOfGoodsConfigComponent,

    OhraConfigurationComponent,
    ExportedFileConfigurationComponent,
    AnalysisConfigurationComponent,
    InforSystemConfigurationComponent,

    // Cost of Goods
    CostOfGoodsOhraConfigComponent,

    // Sales Components
    AddTenderComponent,
    AddTaxComponent,
    AddDiscountComponent,
    
    TaxAnalysisConfigrutionComponent,
    TenderConfigurationComponent,
  ],
  imports: [
    SyncJobRoutingModule,
    BasicModule,
    SharedModule,
    AngularMaterialModule,
  ],
  entryComponents:[
    // Sales Components
    AddTenderComponent,
    AddTaxComponent,
    AddDiscountComponent,
  ]
})
export class SyncJobModule { }
