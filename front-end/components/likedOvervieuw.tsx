import { useEffect, useState } from "react";
import { Ingredient, IngredientRecipe, Recipe } from "@types";
import Modal from 'react-modal';
import RecipeService from "@services/recipeService";
import { useRouter } from "next/router";
import userService from "@services/userService";
import IngredientService from "@services/ingredientService";
import Header from "./header";


const OvervieuwLiked: React.FC = () => {
    const [recepis, setRecepis] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<IngredientRecipe[]>([]);
    const [recepiId, setrecepiId] = useState(0);
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
        const user =  sessionStorage.getItem("username");
        if(token && user){
            console.log("jwt:", token)
            const fetchDataProjects = async () => {
                try {
                    const data = await RecipeService.getLikesByUser(user, token);
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

    const deleteLike = (recipeId: number) => {
        const token =  sessionStorage.getItem("token");
        const user =  sessionStorage.getItem("username");
        if(token && user){
            RecipeService.deleteFavouriteRecipe(user, recipeId, token)
            router.reload()
        }
    };

    const handleModalOpen = () => {
        setIsModalOpen(true); 
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
                        className="outline-none  bg-white rounded-xl px-4 py-2 w-1/2 text-xl"
                        />
                </div>
                <div className="flex flex-wrap justify-start w-screen px-10 mt-2">
                {filteredRecipes.map((recipe) => (
                        <div key={recipe.id} className="bg-[#fccfda] w-[30%] rounded-md p-5 mx-[1.6%] mt-14">
                        <div className="flex justify-between items-center w-[100%]">
                            <h2 className="text-3xl text-black capitalize mb-5">{recipe.title}</h2>
                            <div className="flext justify-end mr-5">
                            <button 
                                    className="mr-3"
                                    onClick={() => {deleteLike(recipe.id);}}  
                                >
                                    <img 
                                        src= "./hartjerood.svg" 
                                        alt="Like" 
                                        height={30} 
                                        width={30} 
                                    />
                                </button>
                                <button  onClick={() => {handleModalOpen(); setrecepiId(recipe.id);}}>
                                    <img src="./share.svg" alt="Share" height={30} width={30} />
                                </button>
                            </div>
                        </div>
                        <p className="comic-neue-regular text-black text-xl mb-4">{recipe.description}</p>
                    </div>
                    ))}
                </div>
                <Modal 
                    isOpen={isModalOpen} 
                    onRequestClose={handleModalClose} 
                    contentLabel="Add New Recipe"
                    className="modal z-30 bg-[#fccfda] p-6 rounded-md shadow-lg min-w-[300px] modal"
                    overlayClassName="fixed inset-0 bg-black h-screen w-screen bg-opacity-70 z-20"
                >
                    <p className="text-2xl text-center">http://localhost:8080/recipe/{recepiId}</p> 
                    <div className="flex justify-evenly">
                   
                    <button  className="bg-[#ff5781] text-white p-2 rounded mt-4"  onClick={() => {handleModalClose();}}>
                        Close
                    </button>
                    <button
                        className="bg-[#ff5781] text-white p-2 rounded mt-4"
                        onClick={() => {
                            navigator.clipboard
                                .writeText(
                                `http://localhost:8080/recipe/${recepiId}`
                                )
                                .then(() => {
                                alert("Link gekopieerd!");
                                })
                                .catch((err) => {
                                console.error(
                                    "Fout bij het kopiëren naar het klembord: ",
                                    err
                                );
                                });
                            }
                        }
                        >
                        Kopieer
                    </button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default OvervieuwLiked;