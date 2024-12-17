import { Recipe } from "../model/recipe";
import { IngredientRecipe } from "../types";
import database from "../util/database";
import userDb from "./user.db";

const getAllRecipes = async (): Promise<Recipe[]> => {
  const recipeprisma = await database.recipe.findMany({
    include: {
      ingredients: true,
    },
  });
  return recipeprisma.map((recipeprisma: any) => Recipe.from(recipeprisma));
};


const getRecipeById = async ({ id }: { id: number }): Promise<Recipe | null> => {
  const recipeprisma = await database.recipe.findUnique({
    where: { id },
    include: {
      ingredients: true,
    },
  });

  return recipeprisma ? Recipe.from(recipeprisma) : null;
};


const deletRecipeById = async ({ id }: { id: number }): Promise<string | null> => {
  const recipeprisma = await database.recipe.findUnique({
    where: { id },
  });

  if (!recipeprisma) {
    return null;
  }

  await database.ingredientRecipeType.deleteMany({
    where: { recipeId: id },
  });

  await database.recipe.delete({
    where: { id },
  });

  return "Recipe deleted";
};


const getRecipeByUser = async ({ username }: { username: string }): Promise<Recipe[] | null> => {
  const recipeprisma = await database.recipe.findMany({
    where: { ownerUsername: username },
    include: {
      ingredients: true,
    },
  });

  if (recipeprisma.length > 0) {
    return recipeprisma.map((recipe: any) => Recipe.from(recipe));
  } else {
    return null;
  }
}

const createRecipe = async ({
  title,
  description,
  instructions,
  portion_amount,
  ownerUsername,
  ingredients,
}: {
  title: string;
  description: string;
  instructions: string;
  portion_amount: number;
  ownerUsername: string;
  ingredients: IngredientRecipe[];
}): Promise<Recipe> => {
  const owner = await userDb.getUserByUsername({ username: ownerUsername });

  if (!owner) {
    throw new Error('User not found');
  }

  const recipePrisma = await database.recipe.create({
    data: {
      title,
      description,
      instructions,
      portion_amount,
      ownerUsername,  
      ingredients: {
        create: ingredients.map((ingredientRecipe) => ({
          recipeId: ingredientRecipe.recipeId,
          name: ingredientRecipe.name,
          amount: ingredientRecipe.amount,
          unit: ingredientRecipe.unit,
        })),
      },
    },
  });

  return Recipe.from(recipePrisma);  
};


export default {
  getAllRecipes,
  getRecipeById,
  createRecipe,
  getRecipeByUser,
  deletRecipeById,
};
