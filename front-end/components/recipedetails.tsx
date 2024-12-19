import { useEffect, useState } from "react";
import { IngredientRecipe, Recipe } from "@types";
import { useRouter } from "next/router";
import RecipeService from "@services/recipeService";
import IngredientService from "@services/ingredientService";

const RecipeDetails: React.FC = () => {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [portions, setPortions] = useState(1); 
  const router = useRouter();
  const { recipeId } = router.query;

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const token = sessionStorage.getItem("token");

      if (recipeId && token) {
        try {
          const recipeData = await RecipeService.getRecipeById(Number(recipeId), token);
          setRecipe(recipeData);
          setPortions(1); 
        } catch (error: any) {
          setErrorMessage(error.message || "Error fetching recipe details.");
        }
      }
    };

    fetchRecipeDetails();

  }, [recipeId]);

  const handlePortionChange = (newPortions: number) => {
    setPortions(newPortions);
  };

  const calculateIngredientAmount = (amount: number) => {
    if (!recipe) return amount;
    return (amount * portions); 
  };

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-screen flex justify-center">
      <div className="bg-[#fccfda] p-10 rounded-md shadow-lg w-[80%]">
        <h1 className="text-4xl mb-4 capitalize text-black">{recipe.title}</h1>
        <p className="text-lg text-gray-700 mb-6">{recipe.description}</p>

        <div className="mb-6">
          <label htmlFor="portions" className="text-lg text-gray-800 mr-4">
            Choose portions:
          </label>
          <select
            id="portions"
            value={portions}
            onChange={(e) => handlePortionChange(Number(e.target.value))}
            className="p-2 rounded border border-gray-300"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((portion) => (
              <option key={portion} value={portion}>
                {portion} portions
              </option>
            ))}
          </select>
        </div>

        <h2 className="text-2xl mb-4">Ingredients</h2>
        <ul className="list-disc list-inside mb-6">
          {recipe.ingredients.map((ingredient: IngredientRecipe) => (
            <li key={ingredient.ingredientId} className="text-gray-800">
              {calculateIngredientAmount(ingredient.amount)} {ingredient.unit} {ingredient.name}
            </li>
          ))}
        </ul>

        <h2 className="text-2xl mb-4">Instructions</h2>
        <p className="text-gray-800 whitespace-pre-line">{recipe.instructions}</p>

        <div className="mt-6">
          <button
            className="bg-[#2b8f0a] text-white p-3 rounded"
            onClick={() => router.push("/discover")}
          >
            Back to Overview
          </button>
        </div>

        {errorMessage && (
          <div className="text-red-500 text-center mt-4">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default RecipeDetails;
