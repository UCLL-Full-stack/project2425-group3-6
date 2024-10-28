export class User{

    private id?: number|undefined;
    private userName: string;
    private firstName: string;
    private lastName: string;
    private password: string;
    private email:string;

    constructor(user:{id?:number|undefined, userName:string, firstName:string, lastName: string, password: string, email: string})
    {
        this.id = user.id
        this.userName = user.userName
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
        this.email = user.email
    }

    getId():number|undefined {
        return this.id
    }
    getUserName() : string {
        return this.userName
    }
    getFirstName() : string {
        return this.firstName
    }
    getLastName() : string {
        return this.lastName

    }
    getPassword(): string {
        return this.password
    }
    getEmail() : string {
        return this.email
    }
    

}