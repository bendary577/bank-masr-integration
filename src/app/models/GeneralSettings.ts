import { OverGroup } from './OverGroup';
import { CostCenter } from './CostCenter';
import { Item } from './Item';
import { MajorGroup } from './MajorGroup';
import { SimphonyLocation } from './SimphonyLocation';
import { Supplier } from './supplier';
import { ItemGroup } from './ItemGroup';
import { BookingType } from './operaReports/paymentTypes';
import { RateCode } from './operaReports/RateCode';
import { SimphonyDiscount } from './loyalty/SimphonyDiscount';
import { PosMachineMap } from './operaPayment/posMachineMap';

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
  posMachineMaps: PosMachineMap[];
  // ==> OPERA Variables
  cancelReasons: Array<BookingType>|any;

  paymentTypes: Array<BookingType>|any;
  roomTypes : Array<BookingType>|any;
  nationalities: Array<BookingType>|any;
  purposeOfVisit: Array<BookingType>|any;
  genders: Array<BookingType>|any;
  customerTypes: Array<BookingType>|any;
  transactionTypes: Array<BookingType>|any;
  expenseTypes: Array<BookingType>|any;

  rateCodes: Array<RateCode>|any;
  // ==> END of OPERA Vribles

  // ==> Simphony Variables
  discountRates: Array<SimphonyDiscount>|any;
  // ==> END of Simphony Variables

  exchangeRate: number;
  pointsPerPurchases: number;
  
  creationDate: Date;
  deleted: boolean;
}
