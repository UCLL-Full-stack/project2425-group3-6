import { Recipe } from "@types";

const getAllRecipes = async () => {
    const response = await fetch(`http://localhost:3000/recipes`, {
    });
  
    if (!response.ok) {
        throw new Error(`Failed to fetch lecturer. Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  
  const getRecipeByUser = async (userName :string) => {
    const response = await fetch(`http://localhost:3000/recipes/user/${userName}`);
    if (!response.ok) {
        throw new Error('Failed to fetch lecturer');
    }
    return await response.json();
  };
  
  const addRecipes = async (recipe : Recipe) => {
    return await fetch(`http://localhost:3000/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(recipe),
    });
  };
  
  const RecipeService = {
    getAllRecipes,
    getRecipeByUser,
    addRecipes,
  };
  
  export default RecipeService;