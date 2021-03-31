import { OverGroup } from './OverGroup';
import { CostCenter } from './CostCenter';
import { Item } from './Item';
import { MajorGroup } from './MajorGroup';
import { SimphonyLocation } from './SimphonyLocation';
import { Supplier } from './supplier';
import { ItemGroup } from './ItemGroup';
import { BookingType } from './operaReports/paymentTypes';

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

  // ==> OPERA Variables
  cancelReasons: Array<BookingType>|any;

  paymentTypes: Array<BookingType>|any;
  roomTypes : Array<BookingType>|any;
  nationalities: Array<BookingType>|any;

  purposeOfVisit: Array<BookingType>|any;
  genders: Array<BookingType>|any;
  customerTypes: Array<BookingType>|any;
  transactionTypes: Array<BookingType>|any;

  // ==> END of OPERA Vribles
  creationDate: Date;
  deleted: boolean;
}
