import { Role } from 'src/app/models/Role'

export class User {
    id: number;
    name: string;
    username: string;
    password: string;
    domain: string;
    deleted: boolean;
    roles: Role[]
 
    public constructor() { }

}
