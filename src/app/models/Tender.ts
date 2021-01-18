import { CostCenter } from "./CostCenter";
import { RevenueCenter } from "./RevenueCenter";

export class Tender {
  tender: string;
  account: string;
  revenueCenter: RevenueCenter;
  costCenter: CostCenter;

  communicationTender: string;
  communicationAccount: string;
  communicationRate: number;
  analysisCodeT5: string;

  children: string[] = [];
  checked: boolean;

  public constructor() { }
}
