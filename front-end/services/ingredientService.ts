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
  
  
  const IngredientService = {
    getAllIngredients,
    getIngredientByName,
  };
  
  export default IngredientService;