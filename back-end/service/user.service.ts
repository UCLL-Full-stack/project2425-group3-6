import { Recipe } from "../model/recipe";
import { User } from "../model/user";
import userDb from "../repository/user.db";

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



//TBD
const addRecipeToUser = (userId:number, recipe:Recipe) => {
    const user = userDb.addRecipeToUser(userId, recipe)
}




export default { getAllUsers, getUserById };
