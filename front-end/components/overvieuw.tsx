import { useEffect, useState } from "react";
import { Ingredient, IngredientRecipe, Recipe } from "@types";
import Modal from 'react-modal';
import RecipeService from "@services/recipeService";
import { useRouter } from "next/router";
import userService from "@services/userService";
import IngredientService from "@services/ingredientService";

interface RecipeOvervieuwProps {
    username: string; // Definieer de prop
  }

const Overview: React.FC<RecipeOvervieuwProps> = ({ username }) => {
    const [recepis, setRecepis] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [portionAmount, setPortionAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState<IngredientRecipe[]>([]);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [ingredientAmount, setIngredienAmount] = useState(0);
    const [ingredientType, setIngredienType] = useState("g");

    
    const filteredIngredients = ingredients
    .filter(ingredient => 
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        const fetchDataProjects = async () => {
            console.log(username)
            try {
                const data = await RecipeService.getRecipeByUser(username);
                setRecepis(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchDataIngredients = async () => {
            console.log(username)
            try {
                const data = await IngredientService.getAllIngredients();
                setIngredients(data);
                console.log(data)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataProjects();
        fetchDataIngredients();
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false); 
        setErrorMessage("")
        setSelectedIngredients([])
        setInstructions("")
        setSearchTerm("")
        setTitle("")
        setDescription("")
        setPortionAmount(0)
    };

    const handleCreateRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(''); 

    
        if (!title) {
          setErrorMessage('Title is required.');
          return;
        }
    
        if (!description) {
          setErrorMessage('Description is required.');
          return;
        }
    
        if (!instructions) {
          setErrorMessage('Instructions arerequired.');
          return;
        }
    
        if (!portionAmount) {
          setErrorMessage('Portion amount is required.');
          return;
        }

        if (selectedIngredients.length < 1) {
            setErrorMessage('Ingredients are required.');
            return;
          }
    
    
        try {
          const recipe = await RecipeService.addRecipes({
              id : 0,
              title,
              description,
              instructions,
              portion_amount: portionAmount,
              ownerUsername: username,
              ingredients: selectedIngredients
          });
          if(recipe){
            router.reload()
          }
        } catch (error: any) {
          setErrorMessage(error.message || 'An error occurred. Please try again.');
        }
      };

      const addIngredient = (name: string, ingredientId: number | undefined, amount: number, unit: string) => {
        const newIngredient: IngredientRecipe = {
            name,
            ingredientId, // Assuming the ingredientId is the same as the id
            amount,
            unit,
        };
        setSelectedIngredients((prevSelected) => {
            if (!prevSelected.find((i) => i.ingredientId === newIngredient.ingredientId)) {
                console.log([...prevSelected, newIngredient])
                return [...prevSelected, newIngredient];
            }
            return prevSelected;
        });
        setIngredienType("g");
        
        
    };

    const removeIngredient = (ingredientId: number | undefined) => {
        setSelectedIngredients((prevSelected) => 
            prevSelected.filter((i) => i.ingredientId !== ingredientId)
        );
    };

    const removeRecipe = async (id: number) => {
        await RecipeService.deleteRecipeById(id);
        router.reload()
    };
    

    return (
        <>
            <style suppressHydrationWarning>
                @import url("https://use.typekit.net/men5qpy.css");
            </style>
            <div className="z-10 absolute w-screen">
                <div className="flex flex-wrap justify-evenly w-screen px-10 mt-14">
                    {recepis.map((recipe) => (
                                    <div key={recipe.id} className="bg-[#fccfda] w-[30%] rounded-md p-5 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between">
                                                <h2 className="text-3xl text-black capitalize mb-5">{recipe.title}</h2>
                                                <button 
                                                onClick={() => removeRecipe(recipe.id)}
                                                className="bg-[#2b8f0a] p-2 rounded text-white">
                                                    Delete
                                                </button>
                                            </div>
                                            
                                            <p className="comic-neue-regular text-black text-xl mb-4">{recipe.description}</p>
                                        </div>
                                        <button className="mt-4 self-end">
                                            <img src="./share.svg" alt="Share" height={30} width={30} />
                                        </button>
                                        
                                    </div>
                                ))}
                </div>

                <button
                    className="fixed bottom-5 right-5 bg-[#fccfda] p-3 rounded-full shadow-lg flex justify-center items-center"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src="./plus.svg" alt="Add Recipe" height={50} width={50} />
                </button>

                <Modal 
                    isOpen={isModalOpen} 
                    onRequestClose={handleModalClose} 
                    contentLabel="Add New Recipe"
                    className="modal z-30 bg-[#fccfda] p-6 rounded-md shadow-lg w-[1200px] modal"
                    overlayClassName="fixed inset-0 bg-black h-screen w-screen bg-opacity-70 z-20"
                >
                    <h2 className="text-2xl mb-6 text-center">Add New Recipe</h2>
                    {errorMessage && (
                      <div className="mb-4 text-red-500 text-xl text-center">{errorMessage}</div>
                    )}
                    
                    <form>
                        <div className="flex gap-10">
                            <div className="w-1/2">
                                <div className="flex justify-between">
                                    <div className="mb-4">
                                        <label className="block font-medium  mb-1">Recept Titel</label>
                                        <input 
                                            type="text" 
                                            placeholder="Name of the recipe" 
                                            className="w-full p-2 border rounded-md" 
                                            required
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label className="block  font-medium mb-1 ml-2">Portion Amount</label>
                                        <input 
                                            type="number"
                                            placeholder="Number of Servings" 
                                            className="w-full p-2 border rounded-md ml-2" 
                                            required
                                            min="1"
                                            value={portionAmount}
                                            onChange={(e) => setPortionAmount(Number(e.target.value))}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block  font-medium mb-2">Ingredients</label>
                                    <input 
                                        type="text" 
                                        placeholder="Search ingredients..." 
                                        value={searchTerm} 
                                        onChange={(e) => setSearchTerm(e.target.value)} 
                                        className="mb-4 p-2 border rounded w-full"
                                    />
                                   <div className="max-h-80 overflow-y-auto">
                                        {filteredIngredients.map((ingredient) => (
                                            <div
                                            key={ingredient.id}
                                            className="bg-gray-100 px-4 py-2 rounded-md flex items-center justify-between mb-2"
                                            >
                                                <div>
                                                    <p className="text-black">{ingredient.name}</p>
                                                </div>
                                                <div>
                                                {selectedIngredients.some(i => i.name === ingredient.name) ? (
                                                    <div className="flex">
                                                        <div className="bg-[#2b8f0a] p-2 rounded text-white mr-2">
                                                            {ingredient.amount} {ingredient.unit}
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => removeIngredient(ingredient.id)}
                                                            className="p-2 rounded bg-[#2b8f0a] text-white"
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                   
                                                    ) : (
                                                        <div className="flex" >
                                                                <input 
                                                                    type="number"
                                                                    placeholder="Amount" 
                                                                    className="p-2 border rounded-md mr-2 w-14" 
                                                                    min="1"
                                                                    onChange={(e) => setIngredienAmount(Number(e.target.value))}
                                                                />
                                                                <select
                                                                    className="p-2 border rounded bg-white text-black mr-2"
                                                                    onChange={(e) => setIngredienType(e.target.value)}
                                                                >
                                                                    <option value="g">g</option>
                                                                    <option value="ml">ml</option>
                                                                    <option value="tl">tl</option>
                                                                    <option value="el">el</option>
                                                                    <option value="cup">cup</option>
                                                                </select>
                                                                <button 
                                                                    type="button"
                                                                    onClick={() => {
                                                                        if (ingredientAmount && ingredientType) {
                                                                            addIngredient( ingredient.name, ingredient.id,ingredientAmount, ingredientType);
                                                                        }
                                                                    }}
                                                                    className="p-2 rounded bg-[#ff5781] text-white"
                                                                >
                                                                    Add
                                                                </button>
                                                            </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div>
                                    <label className="block mt-2  font-medium mb-1">Selected Ingredients</label>
                                        <div className="flex flex-wrap gap-1">
                                            {selectedIngredients.map((ingredient) => (
                                                <div key={ingredient.ingredientId} className="bg-gray-100 rounded-md mb-2 p-2">
                                                    <div className="flex">
                                                        <p className="text-black">{ingredient.name}</p>
                                                        <button className="ml-4" 
                                                            onClick={() => removeIngredient(ingredient.ingredientId)}>
                                                            <img src="./cross.svg" alt="Add Recipe" height={10} width={10} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-1/2">
                                
                                <div className="mb-4">
                                    <label className="block  font-medium mb-1">Description</label>
                                    <textarea 
                                        placeholder="Description" 
                                        className="w-full h-36 p-2 border rounded-md" 
                                        required
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block  font-medium mb-1">Instructies</label>
                                    <textarea 
                                        placeholder="Preparation method" 
                                        className="w-full h-72 p-2 border rounded-md" 
                                        required
                                        value={instructions}
                                        onChange={(e) => setInstructions(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-2 mt-4">
                            <button 
                                type="button" 
                                onClick={handleModalClose} 
                                className="bg-[#ff5781] text-white p-2 rounded"
                            >
                                Annuleren
                            </button>
                            <button 
                                type="submit" 
                                className="bg-[#2b8f0a] text-white p-2 rounded"
                                onClick={handleCreateRecipe}
                            >
                                Recept Toevoegen
                            </button>
                        </div>
                        
                    </form>
                </Modal>
            </div>
        </>
    );
};

export default Overview;
