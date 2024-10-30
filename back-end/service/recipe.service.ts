import { Recipe } from "../model/recipe";
import recipeDb from "../repository/recipe.db";

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

export default { getAllRecipes, getRecipeById };
