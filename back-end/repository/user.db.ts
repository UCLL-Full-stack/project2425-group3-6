import { Recipe } from "../model/recipe";
import { User } from "../model/user";

const users = [
    new User({
        id: 1 ,
        userName:"johndoe",
        firstName:"John",
        lastName:"Doe",
        password:"Johndoe123",
        email:"johndoe@outlook.com",
        

    }),

    new User({
        id: 2 ,
        userName:"janedoe",
        firstName:"Jane",
        lastName:"Doe",
        password:"JaneDoe123",
        email:"janedoe@outlook.com"
    })
];



const getAllUsers = (): User[] => {
    return users;
};

const getUserById = ({ id }: { id: number }): User|null => {
    const user = users.find(user => user.getId() === id);
    if (user){
        return user
    }
    else return null
};

const getUserByUsername = ({username} : {username: string}): User | null => {
    return users.find(user => user.getUserName() === username) || null;
};


const addRecipeToUser = (userId: number, recipe: Recipe): User | null => {
    const user = getUserById({ id: userId });
    
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }
    try {
        user.addRecipeToUser(recipe);
    } catch (error) {
        console.error(`Error adding recipe to user`);
        return null;
    }
    return user;
};

const createUser = ({
    userName,
    firstName,
    lastName,
    password,
    email
}: {
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email:string;
}): User => {
    const newUser = new User({
        userName,
        firstName,
        lastName,
        password,
        email
    });

    users.push(newUser);
    return newUser;
}

export default {
    getUserByUsername,
    getAllUsers,
    getUserById,
    addRecipeToUser,
    createUser
};