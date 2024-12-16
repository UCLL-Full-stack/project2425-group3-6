import { useEffect, useState } from "react";
import { Ingredient, IngredientRecipe, Recipe } from "@types";
import Modal from 'react-modal';
import RecipeService from "@services/recipeService";
import { useRouter } from "next/router";
import userService from "@services/userService";
import IngredientService from "@services/ingredientService";
import Header from "./header";


const OvervieuwDiscover: React.FC = () => {
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
            try {
                const data = await RecipeService.getAllRecipes();
                setRecepis(data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchDataProjects();
    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false); 
        setErrorMessage("")
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
                                            </div>
                                            
                                            <p className="comic-neue-regular text-black text-xl mb-4">{recipe.description}</p>
                                            <p className="comic-neue-regular text-black text-xl mb-4">{recipe.portion_amount}</p>

                                        </div>
                                        <button className="mt-4 self-end">
                                            <img src="./share.svg" alt="Share" height={30} width={30} />
                                        </button>
                                        
                                    </div>
                                ))}
                </div>

                {/* <button
                    className="fixed bottom-5 right-5 bg-[#fccfda] p-3 rounded-full shadow-lg flex justify-center items-center"
                    onClick={() => setIsModalOpen(true)}
                >
                    <img src="./plus.svg" alt="Add Recipe" height={50} width={50} />
                </button> */}

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
                    
                    
                </Modal>
            </div>
        </>
    );
};

export default OvervieuwDiscover;
