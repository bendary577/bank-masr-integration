import { OverGroup } from './OverGroup';
import { CostCenter } from './CostCenter';
import { Item } from './Item';
import { MajorGroup } from './MajorGroup';
import { SimphonyLocation } from './SimphonyLocation';

export class GeneralSettings {
  id: string;
  accountId: string;
  items: Array<Item>|any;
  majorGroups: Array<MajorGroup>|any;
  overGroups: Array<OverGroup>|any;
  costCenterAccountMapping: Array<CostCenter>|any;
  locations: Array<CostCenter>|any;
  simphonyLocations: Array<SimphonyLocation>|any;
  creationDate: Date;
  deleted: boolean;
}
