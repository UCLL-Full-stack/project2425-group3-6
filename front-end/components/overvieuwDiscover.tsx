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
    const [ingredients, setIngredients] = useState<IngredientRecipe[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');

    
    const filteredRecipes = searchTerm.trim() === '' 
    ? recepis 
    : recepis.filter(recipe => 
        recipe.ingredients?.some(ingredient =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? false
    );


    useEffect(() => {
        const token =  sessionStorage.getItem("token");
        if(token){
            console.log("jwt:", token)
            const fetchDataProjects = async () => {
                try {
                    const data = await RecipeService.getAllRecipes(token);
                    setRecepis(data);
                    console.log(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchDataProjects();
        }

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
                <div className=" mt-10 flex justify-center ">
                <input
                        type="text"
                        placeholder="Search by ingredient..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="outline-none  bg-white rounded-xl px-4 py-2 w-1/2 text-xl" // Toegevoegd focus effect
                        />
                </div>
                <div className="flex flex-wrap justify-start w-screen px-10 mt-2">
                {filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="bg-[#fccfda] w-[30%] rounded-md p-5 mx-[1.6%] mt-14 flex flex-col justify-between">
                            <div>
                                <div className="flex justify-between">
                                    <h2 className="text-3xl text-black capitalize mb-5">{recipe.title}</h2>
                                </div>
                                <p className="comic-neue-regular text-black text-xl mb-4">{recipe.description}</p>
                            </div>
                            <button className="mt-4 self-end">
                                <img src="./share.svg" alt="Share" height={30} width={30} />
                            </button>
                        </div>
                    ))}
                </div>


            </div>
        </>
    );
};

export default OvervieuwDiscover;
