import { User } from "../model/user";
import bcrypt from 'bcrypt';
import database from "../util/database";
import { Recipe } from "../model/recipe";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma: any) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


const getFavouriteRecipes = async (userName: string): Promise<Recipe[]> => {
    console.log("Reached this part of the code");

    const userFavourites = await database.userFavouriteRecipe.findMany({
        where: { userName },
        select: { recipeId: true },
    });

    if (!userFavourites?.length) {
        console.log(`No favourite recipes found for user ${userName}`);
        return [];
    }

    const recipeIds = userFavourites.map(fav => fav.recipeId);

    const rawRecipes = await database.recipe.findMany({
        where: { id: { in: recipeIds } },
    });

    console.log("Raw Recipe:", rawRecipes);

    const validRecipes: Recipe[] = [];

    for (const rawRecipe of rawRecipes) {
        if (!rawRecipe.title || !rawRecipe.description || !rawRecipe.instructions) {
            console.error(`[ERROR] Invalid recipe: ${JSON.stringify(rawRecipe)}`);
            continue; 
        }

        try {
            const recipe = Recipe.from(rawRecipe);
            validRecipes.push(recipe);
        } catch (error) {
            console.error(`[ERROR] Error processing recipe ID ${rawRecipe.id}:`, error);
        }
    }

    console.log("Valid Recipes:", validRecipes);

    return validRecipes;
};

const removeFavouriteRecipeFromUser = async (userName: string, recipeId: number): Promise<void> => {
    const deletedFavourite = await database.userFavouriteRecipe.deleteMany({
        where: {
            userName: userName,
            recipeId: recipeId,
        },
    });

    if (deletedFavourite.count === 0) {
        console.log(`Favorite recipe not found for user ${userName} and recipeId ${recipeId}`);
    }

    console.log(`Successfully removed recipe with id ${recipeId} from user ${userName}'s favorites`);
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    if (!username) {
        throw new Error('Username is required');
    }

    try {
        const userPrisma = await database.user.findFirst({ where: { username } });
        if (!userPrisma) {
            console.error(`User with username: ${username} not found.`);
            return null;
        }
        return User.from(userPrisma);
    } catch (error) {
        console.error(`Database error`);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({ username, password, firstName, lastName, email }: {
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
}): Promise<User> => {
    const existingUser = await getUserByUsername({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userPrisma = await database.user.create({
        data: {
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
        },
    });

    return User.from(userPrisma);
};

const addFavouriteRecipeToUser = async (userName: string, recipeId: number): Promise<void> => {
    const existingFavourite = await database.userFavouriteRecipe.findFirst({
        where: {
            userName: userName,
            recipeId: recipeId,
        },
    });

    if (!existingFavourite) {
        await database.userFavouriteRecipe.create({
            data: {
                userName: userName,
                recipeId: recipeId,
            },
        });
    }    
};






  

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    addFavouriteRecipeToUser,
    getFavouriteRecipes,
    removeFavouriteRecipeFromUser
};