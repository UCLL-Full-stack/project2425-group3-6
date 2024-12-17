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

    // Haal de favoriete recepten op
    const userFavourites = await database.userFavouriteRecipe.findMany({
        where: { userName },
        select: { recipeId: true },
    });

    if (!userFavourites?.length) {
        console.log(`No favourite recipes found for user ${userName}`);
        return [];
    }

    const recipeIds = userFavourites.map(fav => fav.recipeId);

    // Haal de recepten op
    const rawRecipes = await database.recipe.findMany({
        where: { id: { in: recipeIds } },
    });

    console.log("Raw Recipe:", rawRecipes);

    const validRecipes: Recipe[] = [];

    // Valideer en verwerk recepten
    for (const rawRecipe of rawRecipes) {
        if (!rawRecipe.title || !rawRecipe.description || !rawRecipe.instructions) {
            console.error(`[ERROR] Invalid recipe: ${JSON.stringify(rawRecipe)}`);
            continue; // Sla ongeldige recepten over
        }

        try {
            const recipe = Recipe.from(rawRecipe);
            validRecipes.push(recipe);
        } catch (error) {
            console.error(`[ERROR] Error processing recipe ID ${rawRecipe.id}:`, error);
        }
    }

    console.log("Valid Recipes:", validRecipes);

    return validRecipes; // Geen dubbele verwerking meer!
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
    getFavouriteRecipes
};