import { OverGroup } from './OverGroup';
import { CostCenter } from './CostCenter';
import { Item } from './Item';
import { MajorGroup } from './MajorGroup';

export class GeneralSettings {
  id: string;
  accountId: string;
  items: Array<Item>|any;
  majorGroups: Array<MajorGroup>|any;
  overGroups: Array<OverGroup>|any;
  costCenterAccountMapping: Array<CostCenter>|any;
  costCenterLocationMapping: Array<CostCenter>|any;
  creationDate: Date;
  deleted: boolean;
}
