import { Recipe } from "../model/recipe";
import recipeDb from "../repository/recipe.db";
import userDb from "../repository/user.db";
import { RecipeInput } from "../types";

const getAllRecipes = (): Promise<Recipe[]> => {
    return recipeDb.getAllRecipes();
};

const getRecipeById = async (id: number): Promise<Recipe> => {
    const recipe = await recipeDb.getRecipeById({ id });
    if(!recipe){
        throw new Error(`recipe with id ${id} does not exist.`)
    }  
    return recipe
};

const deleteRecipeById = (id: number): string => {
    const recipe = recipeDb.deletRecipeById({ id });
    if (!recipe) {
        throw new Error(`Recipe with id ${id} does not exist.`);
    }
    return `Recipe with id ${id} has been deleted.`;
};

const getRecipeByUser = async (username: string): Promise<Recipe[]> => {
    const recipes = await recipeDb.getRecipeByUser({ username });
    
    if (!recipes) {
        throw new Error(`No recipes found for user ${username}.`);
    }
    
    return recipes; 
};

const createRecipe = async ({
    title,
    description,
    instructions,
    portion_amount,
    ownerUsername,
    ingredients
}: RecipeInput): Promise<Recipe> => {
    const owner = await userDb.getUserByUsername({ username: ownerUsername });
    if (!owner) {
        throw new Error(`User with username ${ownerUsername} does not exist.`);
    }


    const recipe = await recipeDb.createRecipe({
        title,
        description,
        instructions,
        portion_amount,
        ownerUsername,
        ingredients, 
    });

    return recipe;
};

export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    getRecipeByUser,
    deleteRecipeById
};
