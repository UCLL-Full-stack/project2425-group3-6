import { Recipe } from "../model/recipe"

const recipes = [
    new Recipe({
        id: 1,
        title: "Cheesecake",
        description: "A cake made with cheese",
        instructions: "Create the cake",
        portion_amount: 1
    }),
    new Recipe({
        id: 2,
        title: "Tomato soup",
        description: "A soup made with tomato",
        instructions: "Create the soup",
        portion_amount: 6
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

export default {
    getAllRecipes,
    getRecipeById
};