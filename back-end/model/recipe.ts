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
        this.validate(recipe);

        this.id = recipe.id
        this.title = recipe.title;
        this.description = recipe.description;
        this.instructions = recipe.instructions;
        this.portion_amount = recipe.portion_amount;
        this.ownerUsername = recipe.ownerUsername;
        this.ingredients = recipe.ingredients;

    }


    validate(recipe:{id?:number|undefined,title:string, description:string, instructions:string,portion_amount:number, ownerUsername: string , ingredients:Ingredient[]}) {
        if (!recipe.title) {
            throw new Error('Title is required');
        }
        if (!recipe.description) {
            throw new Error('Description is required');
        }
        if (!recipe.instructions) {
            throw new Error('Instructions are required');
        }
        if (!recipe.portion_amount) {
            throw new Error('Portion amounts are required');
        }
        if (recipe.portion_amount < 1) {
            throw new Error('Portion amounts should be more then 0');
        }

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