import { Recipe } from "../model/recipe";
import { User } from "../model/user";
import userDb from "../repository/user.db";
import { UserInput } from "../types";

const getAllUsers = (): User[] => {
    return userDb.getAllUsers() ;
};

const getUserById = (id:number): User =>{
    const user = userDb.getUserById({id})
    if(user)
        return user
    else if(user == null){
        throw new Error(`User with id ${id} does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};

const checkUserExist = (username : string, password : string): User =>{
    const user = userDb.getUserByUsername({username})
    if(user && password == user.getPassword())
        return user
    else if(user == null){
        throw new Error(`User does not exist.`)
    }
    else if(password != user.getPassword()){
        throw new Error(`Wrong Password`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};



//TBD
const addRecipeToUser = (userId:number, recipe:Recipe) => {
    const user = userDb.addRecipeToUser(userId, recipe)
    if(user)
        return user
    else if(user == null){
        throw new Error(`User with id ${userId} does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
}

const createNewUser = ({userName, firstName, lastName, password, email}: UserInput): User => {

    const newUser = new User({
        userName,
        firstName,
        lastName,
        password,
        email
    });

    const createdUser = userDb.createUser({
        userName: newUser.getUserName(),
        firstName : newUser.getFirstName(),
        lastName: newUser.getLastName(),
        password : newUser.getPassword(),
        email: newUser.getEmail(),

    });


    return createdUser;
};




export default { getAllUsers, getUserById, addRecipeToUser, createNewUser, checkUserExist};
