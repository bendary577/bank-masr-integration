import { Role } from "./Role";

export class Feature {
    id: string;
    name: string;
    reference: string;
    roles: Role[];

    public constructor() { }
}