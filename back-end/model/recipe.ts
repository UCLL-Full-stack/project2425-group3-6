import { IngredientRecipe } from "../types";
import { Ingredient } from "./ingredient";
import { User } from "./user";

export class Recipe {
    private id?: number;
    private title: string;
    private description: string;
    private instructions: string;
    private portion_amount: number;
    private ownerUsername: string;
    private owner: User;
    private ingredients: IngredientRecipe[];
    private favouritedBy: User[];

    constructor(recipe: {
        id?: number;
        title: string;
        description: string;
        instructions: string;
        portion_amount: number;
        owner: User;
        ownerUsername: string;
        ingredients: IngredientRecipe[];
        favouritedBy: User[]
    }) {
        this.id = recipe.id;
        this.title = recipe.title;
        this.description = recipe.description;
        this.instructions = recipe.instructions;
        this.portion_amount = recipe.portion_amount;
        this.owner = recipe.owner;
        this.ownerUsername = recipe.ownerUsername;
        this.ingredients = recipe.ingredients;
        this.favouritedBy = recipe.favouritedBy;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getDescription(): string {
        return this.description;
    }

    getInstructions(): string {
        return this.instructions;
    }

    getPortionAmount(): number {
        return this.portion_amount;
    }

    getOwnerUsername(): string {
        return this.ownerUsername;
    }

    getOwner(): User {
        return this.owner;
    }

    getfavouritedBy(): User[] {
        return this.favouritedBy;
    }

    getIngredients(): IngredientRecipe[] {
        return this.ingredients;
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



    static from({ 
        id, 
        title, 
        description, 
        instructions, 
        portion_amount, 
        owner, 
        ownerUsername, 
        ingredients = [], 
        favouritedBy = [] 
    }: any): Recipe {
        return new Recipe({
            id,
            title,
            description,
            instructions,
            portion_amount,
            owner,
            ownerUsername,
            favouritedBy,
            ingredients: ingredients.map((ingredient: any) => ({
                id: ingredient.id,
                name: ingredient.name,
                amount: ingredient.amount,
                unit: ingredient.unit,
            })),
        });
    }
         
}

