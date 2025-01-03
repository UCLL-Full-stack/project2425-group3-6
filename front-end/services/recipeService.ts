import { Recipe } from "@types";

const getAllRecipes = async (token : string) => {
    const response = await fetch(`http://localhost:3000/recipes`, {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
  
    if (!response.ok) {
        throw new Error(`Failed to fetch lecturer. Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  
  const getRecipeByUser = async (username :string, token : string) => {
    const response = await fetch(`http://localhost:3000/recipes/user/${username}`, {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
    if (!response.ok) {
        throw new Error('Failed to fetch lecturer');
    }
    return await response.json();
  };

  const getLikesByUser = async (userName : string, token : string) => {
    const response = await fetch(`http://localhost:3000/users/${userName}/favourites`, {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
    if (!response.ok) {
        throw new Error('Failed to fetch lecturer');
    }
    return await response.json();
  };
  
  const addRecipes = async (recipe : Recipe, token : string) => {
    return await fetch(`http://localhost:3000/recipes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(recipe),
    });
  };

  const addLike = async (recipeId : number, userName : string, token : string) => {
    return await fetch(`http://localhost:3000/users/${userName}/favourites`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ recipeId }),
    });
  };

  const getRecipeById = async (id: number, token : string) => {
    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
        throw new Error(`Failed to get recipe.`);
    }
    return await response.json();
};

  const deleteRecipeById = async (id: number, token : string) => {
    const response = await fetch(`http://localhost:3000/recipes/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
        throw new Error(`Failed to delete recipe.`);
    }
};

const deleteFavouriteRecipe = async (userName: string, recipeId: number, token : string) => {
  
  const response = await fetch(`http://localhost:3000/users/${userName}/favourites/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to remove favourite recipe');
  }
};


  
  const RecipeService = {
    getAllRecipes,
    getRecipeByUser,
    addRecipes,
    deleteRecipeById,
    addLike,
    getLikesByUser,
    deleteFavouriteRecipe,
    getRecipeById
  };
  
  export default RecipeService;