import { Ingredient } from "../model/ingredient";
import { Recipe } from "../model/recipe";
import recipeDb from "../repository/recipe.db";
import userDb from "../repository/user.db";
import { IngredientInput, RecipeInput } from "../types";
import ingredientService from "./ingredient.service";


const getAllRecipes = (): Recipe[] => {
    return recipeDb.getAllRecipes() ;
};

const getRecipeById = (id:number): Recipe =>{
    const recipe = recipeDb.getRecipeById({id})
    if(recipe)
        return recipe
    else if(recipe == null){
        throw new Error(`Recipe with id ${id} does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};

const getRecipeByUser = (userName: string): Recipe[] =>{
    const recipe = recipeDb.getRecipeByUser({userName})
    if(recipe)
        return recipe
    else if(recipe == null){
        throw new Error(`Recipe with user does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};

const createRecipe = async ({
    title,
    description,
    instructions,
    portion_amount,
    ownerUsername,
    ingredients
}: RecipeInput): Promise<Recipe> => {
    const ingredientsRecipe: Ingredient[] = []; 

    const ingredientPromises = ingredients.map(async (ingredient) => {
        if (ingredient.id) { 
            const ingredientData = await ingredientService.getIngredientById(ingredient.id);
            if(ingredient.amount && ingredient.unit){
                ingredientData.setAmount(ingredient.amount)
                ingredientData.setUnit(ingredient.unit)
            }
            ingredientsRecipe.push(ingredientData);
        }
    });

    await Promise.all(ingredientPromises);

    return recipeDb.createRecipe({
        title,
        description,
        instructions,
        portion_amount,
        ownerUsername,
        ingredients: ingredientsRecipe // Gebruik de verzamelde ingrediënten
    });

};

export default { getAllRecipes, getRecipeById, createRecipe, getRecipeByUser};
