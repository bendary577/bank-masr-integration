export class Account {
    public id: string;
    public name: string;
    public domain: string;
    public erd: string;
    public microsVersion: string;
    public accountCredentials: any;
    public locationQuota: Number;
    public creationDate: string;
    public deleted: boolean;
    public features: [];

    public constructor() { }
}
