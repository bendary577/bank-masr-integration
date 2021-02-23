import { Company } from "./Company";

export class Group {
    public id: string;
    public name: string;
    public description: string;
    
    public company: string;
    public discountRate: string;

    public creationDate: string;
    public lastUpdate: string;
    public deleted: boolean;

    public constructor() { }
}
