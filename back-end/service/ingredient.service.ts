import { Ingredient } from "../model/ingredient";
import ingredientDb from "../repository/ingredient.db";

// Async method for fetching all ingredients
const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredients = await ingredientDb.getAllIngredients(); // Await the async db call
        return ingredients;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch ingredients. See server log for details.');
    }
};

// Async method to fetch ingredient by ID
const getIngredientById = async (id: number): Promise<Ingredient> => {
    try {
        const ingredient = await ingredientDb.getIngredientById({ id }); // Await the async db call

        if (ingredient) {
            return ingredient;
        } else {
            throw new Error(`Ingredient with id ${id} does not exist.`);
        }
    } catch (error) {
        console.error(error);
        throw new Error(`Error fetching ingredient with id ${id}. See server log for details.`);
    }
};

// Async search method for ingredients
const searchIngredients = async (query: string): Promise<Ingredient[]> => {
    try {
        const results = await ingredientDb.searchIngredients(query); // Await the async db call
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching for ingredients. See server log for details.');
    }
};

export default { getAllIngredients, getIngredientById, searchIngredients };
