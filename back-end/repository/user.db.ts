import { User } from "../model/user";

const users = [
    new User({
        id: 1 ,
        userName:"johndoe",
        firstName:"John",
        lastName:"Doe",
        password:"Johndoe123",
        email:"johndoe@outlook.com"
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

export default {
    getAllUsers,
    getUserById
};