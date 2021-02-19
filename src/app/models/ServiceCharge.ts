import { CostCenter } from "./CostCenter";
import { RevenueCenter } from "./RevenueCenter";

export class ServiceCharge {
    checked: boolean;
    serviceCharge: string;
    account: string;
    revenueCenter: RevenueCenter;
    costCenter: CostCenter;
  
    public constructor() { }
  }
  