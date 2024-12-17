import { Ingredient } from "../model/ingredient";
import database from "../util/database";


const getAllIngredients = async (): Promise<Ingredient[]> => {
    try {
        const ingredientPrisma = await database.ingredient.findMany();
        return ingredientPrisma.map((ingredientPrisma: any) => Ingredient.from(ingredientPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getIngredientById = async ({ id }: { id: number }): Promise<Ingredient | null> => {
    try {
        const ingredientPrisma = await database.user.findUnique({
            where: { id },
        });

        return ingredientPrisma ? Ingredient.from(ingredientPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const searchIngredients = async (query: string): Promise<Ingredient[]> => {
    try {
        const lowerCaseQuery = query.toLowerCase();

        const allIngredients = await database.ingredient.findMany();

        return allIngredients.filter((ingredient: any) =>
            ingredient.name.toLowerCase().includes(lowerCaseQuery)  
        ).map((ingredient: any) => Ingredient.from(ingredient));

    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllIngredients,
    getIngredientById,
    searchIngredients
};
