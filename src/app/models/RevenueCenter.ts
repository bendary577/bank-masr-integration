import { OrderType } from "./OrderType";

export class RevenueCenter {
    checked: boolean;
    revenueCenter: string;
    revenueCenterReference: string;
    accountCode: string;
    discountAccount: string;
    requireAnalysis: boolean;

    orderTypes: OrderType[];
}
  