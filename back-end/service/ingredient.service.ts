import { Ingredient } from "../model/ingredient";
import ingredientDb from "../repository/ingredient.db";

const getAllIngredients = (): Ingredient[] => {
    return ingredientDb.getAllIngredients() ;
};

const getIngredientById = (id:number): Ingredient =>{
    const ingredient = ingredientDb.getIngredientById({id})
    if(ingredient)
        return ingredient
    else if(ingredient == null){
        throw new Error(`Ingredient with id ${id} does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};

const searchIngredients = (query: string): Ingredient[] => {
    const results = ingredientDb.searchIngredients(query);
    return results;
};

export default { getAllIngredients, getIngredientById , searchIngredients };
