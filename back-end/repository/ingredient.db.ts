import { Ingredient } from "../model/ingredient";

const ingredients = [
    new Ingredient({
        id: 1,
        name: "Tomato",
        calories: 100,
        fats:50,
        proteins:100,
        carbohydrates:100
    }),

    new Ingredient({
        id: 2,
        name: "Cheese",
        calories: 200,
        fats:60,
        proteins:20,
        carbohydrates:30
    }),
]

const getAllIngredients = (): Ingredient[] => {
    return ingredients;
};

const getIngredientById = ({ id }: { id: number }): Ingredient|null => {
    const ingredient = ingredients.find(ingredient => ingredient.getId() === id);
    if (ingredient){
        return ingredient
    }
    else return null
};

export default {
    getAllIngredients,
    getIngredientById
};