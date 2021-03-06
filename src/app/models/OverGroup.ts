import {CostCenterAccountCodeMapping} from './CostCenterAccountCodeMapping'

export class OverGroup {
  id: string;
  checked: boolean;
  overGroup: string;
  wasteAccountCredit: string;
  wasteAccountDebit: string;
  inventoryAccount: string;
  expensesAccount: string;
  product: string;
  costCenterAccountCodeMappingList : Array<CostCenterAccountCodeMapping>
}
