import { useEffect, useState } from "react";
import { Recipe } from "@types";
import Modal from 'react-modal';

const Overview: React.FC = () => {
    const [recepis, setRecepis] = useState<Recipe[]>([]);
    const [recipeTitle, setRecipeTitle] = useState("Spaghetti");
    const [recipeIngredients, setRecipeIngredients] = useState("pasta, tomatensaus, kaas");
    const [recipeInstructions, setRecipeInstructions] = useState("1. kook de pasta 2. voeg de saus aan de pasta toe 3. voeg kaas toe 4. eet smakelijk");
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchData = () => {
        const testRecipes: Recipe[] = [
            {
                id: 1,
                title: "Spaghetti Bolognese",
                description: "Een klassieke Italiaanse pasta met rijke tomatensaus en gehakt.",
                instructions: "Kook de pasta volgens de verpakking. Bereid de saus door gehakt aan te bakken, voeg tomatenpuree toe en laat sudderen. Serveer met pasta.",
                portion_amount: 4,
            },
            {
                id: 2,
                title: "Caesar Salad",
                description: "Frisse salade met romige Caesar dressing, croutons en Parmezaanse kaas.",
                instructions: "Meng sla met dressing, voeg croutons en Parmezaanse kaas toe. Garneer met kip of ansjovis naar wens.",
                portion_amount: 2,
            },
            {
                id: 3,
                title: "Chocolade Lava Cake",
                description: "Warme chocoladecake met vloeibare kern, perfect als dessert.",
                instructions: "Verwarm de oven. Meng ingrediënten en vul vormen. Bak tot de kern zacht is.",
                portion_amount: 2,
            },
        ];
        setRecepis(testRecipes);
    }

    useEffect(() => fetchData(), []);

    const handleModalClose = () => {
        setIsModalOpen(false); 
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
                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Recept Titel</label>
                            <input 
                                type="text" 
                                placeholder="Naam van het recept" 
                                className="w-full p-2 border rounded-md" 
                                required
                                value={recipeTitle}
                                onChange={(e) => setRecipeTitle(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Ingrediënten</label>
                            <textarea 
                                placeholder="Ingrediënten, gescheiden door een komma" 
                                className="w-full p-2 border rounded-md" 
                                required
                                value={recipeIngredients}
                                onChange={(e) => setRecipeIngredients(e.target.value)}
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-sm font-medium mb-1">Instructies</label>
                            <textarea 
                                placeholder="Beschrijving van de bereidingswijze" 
                                className="w-full p-2 border rounded-md" 
                                required
                                value={recipeInstructions}
                                onChange={(e) => setRecipeInstructions(e.target.value)}
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
