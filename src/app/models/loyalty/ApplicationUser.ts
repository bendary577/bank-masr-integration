import { Company } from "./Company";
import { Group } from "./Group";

export class ApplicationUser {
    public id: string;
    public name: string;
    public email: String;
    public group: Group;
    public creationDate: string;
    public lastUpdate: string;
    public deleted: boolean;

    public constructor() { }
}