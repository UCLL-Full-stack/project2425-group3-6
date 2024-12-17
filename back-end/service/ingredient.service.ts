import { Ingredient } from "../model/ingredient";
import ingredientDb from "../repository/ingredient.db";

const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredients = await ingredientDb.getAllIngredients(); 
        return ingredients;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch ingredients. See server log for details.');
    }
};

const getIngredientById = async (id: number): Promise<Ingredient> => {
    try {
        const ingredient = await ingredientDb.getIngredientById({ id }); 

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

const searchIngredients = async (query: string): Promise<Ingredient[]> => {
    try {
        const results = await ingredientDb.searchIngredients(query);
        return results;
    } catch (error) {
        console.error(error);
        throw new Error('Error searching for ingredients. See server log for details.');
    }
};

export default { getAllIngredients, getIngredientById, searchIngredients };
