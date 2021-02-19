import { FamilyGroup } from "./FamilyGroup";
import { RevenueCenter } from "./RevenueCenter";

export class MajorGroup {
  id: string;
  checked: boolean;
  overGroup: string;
  majorGroup: string;
  account: string;
  discountAccount: string;

  children: string[] = [];
  familyGroups: FamilyGroup[] = [];
  revenueCenters: RevenueCenter[] = [];

  public constructor() { }
}
