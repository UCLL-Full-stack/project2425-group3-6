const getAllIngredients = async () => {
    const response = await fetch(`http://localhost:3000/ingredients`, {
    });
  
    if (!response.ok) {
        throw new Error(`Failed to fetch lecturer. Status: ${response.status}`);
    }
  
    const data = await response.json();
    return data;
  };
  
  const getIngredientByName = async (userName :string) => {
    const response = await fetch(`http://localhost:3000/ingredients/search/${userName}`);
    if (!response.ok) {
        throw new Error('Failed to fetch lecturer');
    }
    return await response.json();
  };
  
  
  const IngredientService = {
    getAllIngredients,
    getIngredientByName,
  };
  
  export default IngredientService;