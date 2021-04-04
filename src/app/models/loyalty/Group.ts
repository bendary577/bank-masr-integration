export class Group {
    public id: string;
    public name: string;
    public logoUrl: string;
    public accountID: string;
    public description: string;
    public discountId: number;
    public discountRate: string;
    public parentGroup : Group;
    public creationDate: string;
    public deleted: boolean;

    public constructor() { }
}
