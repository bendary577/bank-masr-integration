

export class AccompiendGuest {
    public id: string;
    public name: string;
    public email: String;
    public moblie:String;
    public deleted: boolean;

    public wallet;
    public accompanied: [];

    constructor(name: string, email: String) {
        this.name = name;
        this.email = email;
    };

}