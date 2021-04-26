import { CostCenter } from "./CostCenter";
import { ItemGroup } from "./ItemGroup";

export class ConsumptionLocation {
    accountCode: string;
    costCenter: CostCenter;
    itemGroups: ItemGroup[] = [];
}