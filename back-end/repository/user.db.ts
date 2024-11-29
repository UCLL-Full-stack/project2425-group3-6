import { User } from "../model/user";
import bcrypt from 'bcrypt';
import database from "../util/database";

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
    // Check if the user already exists
    const existingUser = await getUserByUsername({ username });
    if (existingUser) {
        throw new Error('User already exists');
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user
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



export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser
};