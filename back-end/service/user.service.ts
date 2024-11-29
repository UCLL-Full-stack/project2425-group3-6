import { User } from "../model/user";
import userDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import { generateJwtToken } from "../util/jwt";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id:number): Promise<User> =>{
    const user = await userDb.getUserById({id})
    if(user)
        return user
    else if(user == null){
        throw new Error(`User with id ${id} does not exist.`)
    }
    else{throw new Error(`Error encountered in the backend.`)}
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

export const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUsername({ username: userInput.username });
  
    if (existingUser) {
        throw new Error('User already exists');
    }
  
    const newUser = {
        username: userInput.username,
        password: userInput.password,
        firstName: userInput.firstName,
        lastName: userInput.lastName,
        email: userInput.email,
    };
  
    // 4. Save the new user to the database
    return await userDb.createUser(newUser);
  };
  
  
  
  export const authenticate = async (username: string, password: string): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername({ username });
    console.log(user)
  
    if (!user) {
        throw new Error('Invalid credentials');
    }
  
    // 2. Verify the password
    const isPasswordCorrect = await user.verifyPassword(password); // Use verifyPassword method
  
    if (!isPasswordCorrect) {
        throw new Error('Invalid credentials');
    }
  
    // 3. Generate JWT token
    const token = generateJwtToken({ username: user.getUserName()});
  
    // 4. Return the user info and token
    return {
        username: user.getUserName(),
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        token,
    };
  };




export default { getAllUsers, getUserById, getUserByUsername, authenticate, createUser};
