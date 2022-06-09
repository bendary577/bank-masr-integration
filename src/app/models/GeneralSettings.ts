import { OverGroup } from './OverGroup'
import { CostCenter } from './CostCenter'
import { Item } from './Item'
import { MajorGroup } from './MajorGroup'
import { SimphonyLocation } from './SimphonyLocation'
import { Supplier } from './supplier'
import { ItemGroup } from './ItemGroup'
import { BookingType } from './operaReports/paymentTypes'
import { RateCode } from './operaReports/RateCode'
import { SimphonyDiscount } from './loyalty/SimphonyDiscount'
import { PosMachineMap } from './operaPayment/posMachineMap'
import { BirthdayGift } from './loyalty/BirthdayGift'
import { TalabatConfiguration } from './deliveryAggregator/talabat-configuration'
import { AggregatorConfiguration } from './deliveryAggregator/aggregatorConfiguration'

export class GeneralSettings {
  id: string
  accountId: string
  items: Array<Item> | any
  itemGroups: Array<ItemGroup> | any
  majorGroups: Array<MajorGroup> | any
  overGroups: Array<OverGroup> | any
  costCenterAccountMapping: Array<CostCenter> | any
  revenueCenters: Array<string> | any
  orderTypes: any
  locations: Array<CostCenter> | any
  simphonyLocations: Array<SimphonyLocation> | any
  suppliers: Array<Supplier> | any
  posMachineMaps: PosMachineMap[]
  // ==> OPERA Variables
  cancelReasons: Array<BookingType> | any

  paymentTypes: Array<BookingType> | any
  roomTypes: Array<BookingType> | any
  nationalities: Array<BookingType> | any
  purposeOfVisit: Array<BookingType> | any
  genders: Array<BookingType> | any
  customerTypes: Array<BookingType> | any
  transactionTypes: Array<BookingType> | any
  expenseTypes: Array<BookingType> | any

  rateCodes: Array<RateCode> | any

  // ==> Simphony Variables
  discountRates: Array<SimphonyDiscount> | any
  discountAppliedAfterFess: boolean
  
  // ==> Delivery Aggregators
  aggregatorConfiguration: AggregatorConfiguration
  talabatConfiguration: TalabatConfiguration;
  
  // ==> Reward Points
  pointReward: number
  pointsRedemption: number
  birthdayGift: BirthdayGift

  creationDate: Date
  deleted: boolean

}
