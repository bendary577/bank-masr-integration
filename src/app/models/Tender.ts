export class Tender {
  tender: string;
  account: string;
  communicationTender: string;
  communicationAccount: string;
  communicationRate: number;
  analysisCodeT5: string;

  childs: string[];
  checked: boolean;

  public constructor() { }
}
