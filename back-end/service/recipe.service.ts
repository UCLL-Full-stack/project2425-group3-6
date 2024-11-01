import { Recipe } from "../model/recipe";
import recipeDb from "../repository/recipe.db";
import userDb from "../repository/user.db";
import { RecipeInput } from "../types";

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

const createRecipe = ({title,description,instructions,portion_amount,ownerUsername,ingredients }: RecipeInput): Recipe => {

    const newRecipe = new Recipe({
        title,
        description,
        instructions,
        portion_amount,
        ownerUsername,
        ingredients:[]
    });

    const createdRecipe = recipeDb.createRecipe({
        title: newRecipe.getTitle(),
        description : newRecipe.getDescription(),
        instructions: newRecipe.getInstructions(),
        portion_amount : newRecipe.getPortionAmount(),
        ownerUsername : newRecipe.getOwnerUsername(),
        ingredients: newRecipe.getIngredients()

    });


    return createdRecipe;
};
export default { getAllRecipes, getRecipeById, createRecipe, getRecipeByUser};
