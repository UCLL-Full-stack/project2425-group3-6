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
    
    // Check if the returned recipes are null or empty, and handle accordingly
    if (!recipes) {
        throw new Error(`No recipes found for user ${username}.`);
    }
    
    return recipes; // If recipes exist, return them
};

const createRecipe = async ({
    title,
    description,
    instructions,
    portion_amount,
    ownerUsername,
    ingredients
}: RecipeInput): Promise<Recipe> => {
    // Fetch the owner to check if the user exists
    const owner = await userDb.getUserByUsername({ username: ownerUsername });
    if (!owner) {
        throw new Error(`User with username ${ownerUsername} does not exist.`);
    }


    // Create the recipe with the prepared ingredients
    const recipe = await recipeDb.createRecipe({
        title,
        description,
        instructions,
        portion_amount,
        ownerUsername,
        ingredients, // Use the populated ingredients
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
