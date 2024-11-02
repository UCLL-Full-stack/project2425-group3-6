import { Ingredient } from "../model/ingredient";
import { Recipe } from "../model/recipe"
import { User } from "../model/user";
import userDb from "./user.db";

const recipes = [
    new Recipe({
        id: 1,
        title: "Cheesecake",
        description: "A cake made with cheese",
        instructions: "Create the cake",
        portion_amount: 1,
        ownerUsername: "janedoe"
        ,ingredients: []
    }),
    new Recipe({
        id: 2,
        title: "Tomato soup",
        description: "A soup made with tomato",
        instructions: "Create the soup",
        portion_amount: 6,
        ownerUsername: "janedoe"
        ,ingredients:[]
    }),
]


const getAllRecipes = (): Recipe[] => {
    return recipes;
};

const getRecipeById = ({ id }: { id: number }): Recipe|null => {
    const recipe = recipes.find(recipe => recipe.getId() === id);
    if (recipe){
        return recipe
    }
    else return null
};

const deletRecipeById = ({ id }: { id: number }): Recipe|null => {
    const index = recipes.findIndex(recipe => recipe.getId() === id);

    if (index !== -1) {
        const [deletedRecipe] = recipes.splice(index, 1);
        return deletedRecipe;
    }
    else return null
};

const getRecipeByUser = ({ userName }: { userName: string }): Recipe[] | null => {

    const userRecipes = recipes.filter(recipe => recipe.getOwnerUsername() === userName);
    
    return userRecipes.length > 0 ? userRecipes : null;
};

const createRecipe = ({
    id,
    title,
    description,
    instructions,
    portion_amount,
    ownerUsername,
    ingredients
}: {
    id: number;
    title: string;
    description: string;
    instructions: string;
    portion_amount: number;
    ownerUsername: string;
    ingredients: Ingredient[]
}): Recipe => {
    const newRecipe = new Recipe({
        id,
        title,
        description,
        instructions,
        portion_amount,
        ownerUsername,
        ingredients
    });

    const owner = userDb.getUserByUsername({ username: ownerUsername });
    owner?.addRecipeToUser(newRecipe)
    recipes.push(newRecipe);
    return newRecipe;
}


export default {
    getAllRecipes,
    getRecipeById,
    createRecipe,
    getRecipeByUser,
    deletRecipeById
};