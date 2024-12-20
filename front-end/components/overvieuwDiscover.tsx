import { useEffect, useState } from "react";
import { Ingredient, IngredientRecipe, Recipe } from "@types";
import Modal from 'react-modal';
import RecipeService from "@services/recipeService";
import { useRouter } from "next/router";
import userService from "@services/userService";
import IngredientService from "@services/ingredientService";
import Header from "./header";
import { useTranslation } from "react-i18next";


const OvervieuwDiscover: React.FC = () => {
    const [recepis, setRecepis] = useState<Recipe[]>([]);
    const [recepisLiked, setRecepisLiked] = useState<Recipe[]>([]);
    const [ingredients, setIngredients] = useState<IngredientRecipe[]>([]);
    const [recepiId, setrecepiId] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const { t } = useTranslation(); 

    
    const filteredRecipes = searchTerm.trim() === '' 
    ? recepis 
    : recepis.filter(recipe => 
        recipe.ingredients?.some(ingredient =>
            ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? false
    );


    const addLike = (recipeId : number) => {
        const token =  sessionStorage.getItem("token");
        const userId = sessionStorage.getItem("username");
        console.log("jwt:", token)
        console.log("id:", userId)
        if(token && userId){
            const fetchAddLike = async () => {
                console.log("fetching")
                await RecipeService.addLike(recipeId, userId, token);
                router.reload()
            };
            fetchAddLike();
        }
    }


    useEffect(() => {
        const token =  sessionStorage.getItem("token");
        const user =  sessionStorage.getItem("username");
        if(token && user){
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
            const fetchLiked = async () => {
                try {
                    const data = await RecipeService.getLikesByUser(user, token);
                    setRecepisLiked(data);
                    console.log(data)
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchDataProjects();
            fetchLiked();
        }

    }, []);

    const handleModalClose = () => {
        setIsModalOpen(false); 
        setErrorMessage("")
    };

    const handleModalOpen = () => {
        setIsModalOpen(true); 
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

    

    return (
        <>
            <style suppressHydrationWarning>
                @import url("https://use.typekit.net/men5qpy.css");
            </style>
            <div className="z-10 absolute w-screen">
                <div className=" mt-10 flex justify-center ">
                <input
                        type="text"
                        placeholder={t("discover.search_placeholder")}
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
                                        onClick={() => { recepisLiked.some((likedRecipe) => likedRecipe.id === recipe.id) ?
                                            deleteLike(recipe.id):addLike(recipe.id)
                                        }}
                                    >
                                        <img 
                                            src={recepisLiked.some((likedRecipe) => likedRecipe.id === recipe.id) ? "/hartjerood.svg" : "/hartje.svg"} 
                                            alt="Like" 
                                            height={30} 
                                            width={30} 
                                        />
                                    </button>
                                    <button  onClick={() => {handleModalOpen(); setrecepiId(recipe.id);}}>
                                        <img src="/share.svg" alt="Share" height={30} width={30} />
                                    </button>
                                    <button className="bg-[#ff5781] text-white p-2 rounded mt-4" onClick={() => {router.push(`/recipe/${recipe.id}`);}}>
                                    {t("discover.details_button")}
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
                    <a 
                        href={`http://localhost:8080/recipe/${recepiId}`} 
                        className="text-2xl text-center text-blue-500 underline block"
                    >
                        http://localhost:8080/recipe/{recepiId}
                    </a>                     
                    <div className="flex justify-evenly">
                   
                    <button  className="bg-[#ff5781] text-white p-2 rounded mt-4"  onClick={() => {handleModalClose();}}>
                    {t("discover.close_button")}
                    </button>
                    <button
                        className="bg-[#ff5781] text-white p-2 rounded mt-4"
                        onClick={() => {
                            navigator.clipboard
                                .writeText(
                                `http://localhost:8080/recipe/${recepiId}`
                                )
                                .then(() => {
                                alert(t("discover.link_copied"));
                                window.open(`http://localhost:8080/recipe/${recepiId}`, "_blank");
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
                        {t("discover.copy_button")}
                         </button>
                    </div>
                </Modal>
            </div>
        </>
    );
};

export default OvervieuwDiscover;
