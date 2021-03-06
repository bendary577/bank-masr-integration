import { SimphonyDiscount } from "./SimphonyDiscount";

export class Group {
    public id: string = "";
    public name: string;
    public accountID: string;
    public description: string;
    public discountId: number;
    public discountRate: number;
    simphonyDiscount: SimphonyDiscount;
    public imageUrl: any;
    public parentGroup : Group;
    public creationDate: string;
    public deleted: boolean;

    public constructor() { }
}
