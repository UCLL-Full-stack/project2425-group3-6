import { Ingredient } from "./ingredient";
import { User } from "./user";

export class Recipe{
    private id?: number|undefined;
    private title : string;
    private description : string;
    private instructions: string;
    private portion_amount : number;
    private ownerUsername: string;
    private ingredients: Ingredient[];
    
    constructor(recipe:{id?:number|undefined,title:string, description:string, instructions:string,portion_amount:number, ownerUsername: string , ingredients:Ingredient[]})
    {
        this.id = recipe.id
        this.title = recipe.title;
        this.description = recipe.description;
        this.instructions = recipe.instructions;
        this.portion_amount = recipe.portion_amount;
        this.ownerUsername = recipe.ownerUsername;
        this.ingredients = recipe.ingredients;

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
    getOwnerUsername(): string{
        return this.ownerUsername
    }
    getIngredients() : Ingredient[]{
        return this.ingredients
    }
    setOwnerUsername(username: string): void {
        if (this.ownerUsername) {
            throw new Error('This Recipe already has an owner');
        }
        this.ownerUsername = username;
    }
    setId(id: number): void {
        this.id = id;
    }


}