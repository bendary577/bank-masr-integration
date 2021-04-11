import { Group } from "./Group";

export class Company {
    public id: string;
    public name: string;
    public logoUrl: string;
    public accountID: string;
    public description: string;
    public discountRate: string;
    public parentGroupId : string;
    public groups: Group[];
    public creationDate: string;
    public deleted: boolean;

    public constructor() { }
}
