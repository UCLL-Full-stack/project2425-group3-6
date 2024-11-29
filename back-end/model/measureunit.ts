import { Ingredient } from "./ingredient";

export class Measureunit{
    private id?: number|undefined;
    private name:string;
    private size : number;
    
    constructor(measureunit:{id?:number|undefined, name: string, size : number})
    {
        this.id = measureunit.id
        this.name = measureunit.name
        this.size = measureunit.size
    }

    getId() : number|undefined {
        return this.id
    }
    getName(): string{
        return this.name
    }
    getSize(): number{
        return this.size
    }
}