import { OverGroup } from './OverGroup';
import { CostCenter } from './CostCenter';
import { Item } from './Item';
import { MajorGroup } from './MajorGroup';
import { SimphonyLocation } from './SimphonyLocation';
import { Supplier } from './supplier';
import { ItemGroup } from './ItemGroup';
import { PaymentType } from './operaReports/paymentTypes';
import { CancelReason } from './operaReports/CancelReason';

export class GeneralSettings {
  id: string;
  accountId: string;
  items: Array<Item>|any;
  itemGroups: Array<ItemGroup>|any;
  majorGroups: Array<MajorGroup>|any;
  overGroups: Array<OverGroup>|any;
  costCenterAccountMapping: Array<CostCenter>|any;
  revenueCenters: Array<string>|any;
  locations: Array<CostCenter>|any;
  simphonyLocations: Array<SimphonyLocation>|any;
  suppliers: Array<Supplier>|any;
  paymentTypes: Array<PaymentType>|any;
  cancelReasons: Array<CancelReason>|any;
  creationDate: Date;
  deleted: boolean;
}
