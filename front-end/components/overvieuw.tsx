import { useEffect, useState } from "react";
import { Ingredient, Recipe } from "@types";
import Modal from 'react-modal';
import RecipeService from "@services/recipeService";
import { useRouter } from "next/router";
import userService from "@services/userService";
import IngredientService from "@services/ingredientService";

interface RecipeOvervieuwProps {
    userName: string; // Definieer de prop
  }

const Overview: React.FC<RecipeOvervieuwProps> = ({ userName }) => {
    const [recepis, setRecepis] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [instructions, setInstructions] = useState('');
    const [portionAmount, setPortionAmount] = useState(0);
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    const filteredIngredients = ingredients.filter(ingredient => 
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );


    useEffect(() => {
        const fetchDataProjects = async () => {
            console.log(userName)
            try {
                const data = await RecipeService.getRecipeByUser(userName);
                setRecepis(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        const fetchDataIngredients = async () => {
            console.log(userName)
            try {
                const data = await IngredientService.getAllIngredients();
                setIngredients(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataProjects();
        fetchDataIngredients();
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false); 
    };

    const handleCreateRecipe = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message at start

    
        // Check if fields are empty
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
              title,
              description,
              instructions,
              portion_amount: portionAmount,
              ownerUsername: userName,
              ingredients: selectedIngredients
          });
          if(recipe){
            router.reload()
          }
        } catch (error: any) {
          setErrorMessage(error.message || 'An error occurred. Please try again.');
        }
      };

      const toggleIngredientSelection = (ingredient: Ingredient) => {
        setSelectedIngredients((prevSelected) => {
            if (prevSelected.includes(ingredient)) {
                // If ingredient is already selected, remove it
                return prevSelected.filter((i) => i.id !== ingredient.id);
            } else {
                // If not, add it to the selection
                return [...prevSelected, ingredient];
            }
        });
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
                                            <h2 className="text-3xl text-black capitalize mb-5">{recipe.title}</h2>
                                            <p className="comic-neue-regular text-black text-xl mb-4">{recipe.description}</p>
                                        </div>
                                        <button className="mt-4 self-end">
                                            <img src="./share.svg" alt="Share" height={30} width={30} />
                                        </button>
                                    </div>
                                ))}
                </div>

                {/* Plus knop rechtsonder in het scherm */}
                <button
                    className="fixed bottom-5 right-5 bg-[#fccfda] p-3 rounded-full shadow-lg flex justify-center items-center"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src="./plus.svg" alt="Add Recipe" height={50} width={50} />
                </button>

                <Modal 
                    isOpen={isModalOpen} 
                    onRequestClose={handleModalClose} 
                    contentLabel="Voeg Recept Toe"
                    className="modal z-30 bg-[#fccfda] p-6 rounded-md shadow-lg w-[500px] modal"
                    overlayClassName="fixed inset-0 bg-black h-screen w-screen bg-opacity-70 z-20"
                >
                    <h2 className="text-2xl mb-4 text-center">Voeg Nieuw Recept Toe</h2>
                    
                    <form>
                        <div className="flex">
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Recept Titel</label>
                                <input 
                                    type="text" 
                                    placeholder="Naam van het recept" 
                                    className="w-full p-2 border rounded-md" 
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1 ml-2">Portion Amount</label>
                                <input 
                                    type="number"
                                    placeholder="Aantal Porties" 
                                    className="w-full p-2 border rounded-md ml-2" 
                                    required
                                    min="1"
                                    value={portionAmount}
                                    onChange={(e) => setPortionAmount(Number(e.target.value))} // Zet de waarde om naar een nummer
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Ingredients</label>
                            {/* Zoekbalk */}
                            <input 
                                type="text" 
                                placeholder="Zoek ingrediënten..." 
                                value={searchTerm} 
                                onChange={(e) => setSearchTerm(e.target.value)} 
                                className="mb-2 p-2 border rounded w-full"
                            />
                            <div className="max-h-64 overflow-y-auto">
                                {filteredIngredients.map((ingredient) => (
                                    <div key={ingredient.id} className="bg-gray-100 rounded-md flex items-center justify-between mb-2">
                                        <div>
                                            <p className="text-black">{ingredient.name}</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => toggleIngredientSelection(ingredient)}
                                            className={`mt-2 p-2 rounded ${selectedIngredients.includes(ingredient) ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                                        >
                                            {selectedIngredients.includes(ingredient) ? 'Remove' : 'Add'}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                        <label className="block text-sm font-medium mb-1">Selected Ingredients</label>
                            <div className="max-h-64 overflow-y-auto flex gap-1">
                                {selectedIngredients.map((ingredient) => (
                                    <div key={ingredient.id} className="bg-gray-100 rounded-md mb-2 p-2">
                                        <div>
                                            <p className="text-black">{ingredient.name}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea 
                                placeholder="Beschrijving" 
                                className="w-full p-2 border rounded-md" 
                                required
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Instructies</label>
                            <textarea 
                                placeholder="Beschrijving van de bereidingswijze" 
                                className="w-full p-2 border rounded-md" 
                                required
                                value={instructions}
                                onChange={(e) => setInstructions(e.target.value)}
                            />
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
