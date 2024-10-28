export class Recipe{
    private id?: number|undefined;
    private title : string;
    private description : string;
    private instructions: string;
    private portion_amount : number;
    
    constructor(recipe:{id?:number|undefined,title:string, description:string, instructions:string,portion_amount:number})
    {
        this.id = recipe.id
        this.title = recipe.title;
        this.description = recipe.description;
        this.instructions = recipe.instructions;
        this.portion_amount = recipe.portion_amount;

    }

    getId() : number|undefined {
        return this.id
    }

    getTitle() : string {
        return this.title

    }
    getDescription() : string {
        return this.description
    }
    getInstructions() : string{
        return this.instructions
    }
    getPortionAmount(): number{
        return this.portion_amount
    }


}