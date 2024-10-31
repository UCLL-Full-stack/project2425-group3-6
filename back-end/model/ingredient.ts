import { Recipe } from "./recipe";

export class Ingredient{
    private id?: number|undefined;
    private name: string;
    private calories: number;
    private fats: number;
    private proteins: number;
    private carbohydrates: number;
    private recipes: Recipe[];
    
    constructor(ingredient:{id?:number|undefined, name: string; calories: number, fats:number,proteins:number,carbohydrates: number })
    {
        this.id = ingredient.id
        this.name = ingredient.name
        this.calories = ingredient.calories
        this.fats = ingredient.fats
        this.proteins = ingredient.proteins
        this.carbohydrates = ingredient.carbohydrates
        this.recipes = []

    }

    getId() : number|undefined {
        return this.id
    }
    getName(): string{
        return this.name
    }
    getCalories(): number{
        return this.calories
    }
    getFats():number{
        return this.fats
    }
    getProteins():number{
        return this.proteins
    }
    getCarbohydrates(): number{
        return this.carbohydrates
    }
    getRecipes() : Recipe[] {
        return this.recipes
    }
    addRecipeToingredient(recipe: Recipe) {
        if (!recipe) throw new Error('Recipe is required');
        if (this.recipes.includes(recipe))
            throw new Error('This ingredient was already added to the Recipe');
        this.recipes.push(recipe);
        
    }


}