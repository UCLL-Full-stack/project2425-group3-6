const getToken = () => sessionStorage.getItem("token");

const getAllIngredients = async () => {
    const token = getToken();
    const response = await fetch(`http://localhost:3000/ingredients`, {
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
  
  const getIngredientByName = async (username :string) => {
    const token = getToken();
    const response = await fetch(`http://localhost:3000/ingredients/search/${username}`, {
      headers: {
          "Authorization": `Bearer ${token}`
      }
  });
    if (!response.ok) {
        throw new Error('Failed to fetch lecturer');
    }
    return await response.json();
  };
  
  
  const getIngredientById = async (id: number, token : string) => {
    const response = await fetch(`http://localhost:3000/ingredients/${id}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
      }
    });
    if (!response.ok) {
        throw new Error(`Failed to get Ingredient.`);
    }
    return await response.json();
};

  const IngredientService = {
    getAllIngredients,
    getIngredientByName,
    getIngredientById,
  };
  
  export default IngredientService;