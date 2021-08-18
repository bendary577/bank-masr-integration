export class Account {
  public id: string;
  public name: string;
  public domain: string;
  public erd: string;
  public microsVersion: string;
  public sendMethod: string;
  public accountCredentials: any;
  public locationQuota: Number;
  public creationDate: string;
  public apiKey?: string;
  public clientId?: string;
  public deleted: boolean;

  public constructor() {}
}
