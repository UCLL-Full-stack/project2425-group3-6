import { Recipe } from "../../model/recipe";
import { User } from "../../model/user";
import recipeDb from "../../repository/recipe.db";
import userDb from "../../repository/user.db";
import recipeService from "../../service/recipe.service";
import { RecipeInput, UserInput } from "../../types";

const newTitle = "Titel"
const newDescription = "Cake"
const newInstruction = "instructions"
const newPortionAmount = 1

const userInput: UserInput = {
    id: 1 ,
    userName:"johndoe",
    firstName:"John",
    lastName:"Doe",
    password:"Johndoe123",
    email:"johndoe@outlook.com",
};
const existingUser = new User({
    ...userInput,
})


const recipeInput : RecipeInput = {
    id: 1,
    title: "Cheesecake",
    description: "A cake made with cheese",
    instructions: "Create the cake",
    portion_amount: 1,
    ownerUsername: "janedoe"
    ,ingredients: []
};

const existingRecipe = new Recipe({
    id: 1,
    title: "Cheesecake",
    description: "A cake made with cheese",
    instructions: "Create the cake",
    portion_amount: 1,
    ownerUsername: "janedoe"
    ,ingredients: []
})



let createRecipeMock: jest.Mock;
let mockRecipeDbgetRecipeByUser: jest.SpyInstance;
let mockRecipeDbGetRecipeById: jest.SpyInstance
let mockUserDbGetUserById: jest.SpyInstance
let mockRecipeDbCreateRecipe: jest.SpyInstance




beforeEach(() => {

    mockRecipeDbgetRecipeByUser = jest.spyOn(recipeDb, 'getRecipeByUser')
    mockRecipeDbGetRecipeById = jest.spyOn(recipeDb, 'getRecipeById')
    mockUserDbGetUserById = jest.spyOn(userDb, 'getUserById')
    mockRecipeDbCreateRecipe = jest.spyOn(recipeService, 'createRecipe')
});

afterEach(() => {
    jest.clearAllMocks();
});


test('given a valid recipe, when recipe is created, then a recipe is created with those values', () => {
    // Given
    mockRecipeDbGetRecipeById.mockReturnValue(recipeInput)
    mockUserDbGetUserById.mockReturnValue(userInput); 

    // When
    recipeService.createRecipe({title:newTitle,description:newDescription,instructions:newInstruction,portion_amount:newPortionAmount,ownerUsername:existingUser.getUserName(),ingredients:[] });

    // Then
    expect(mockRecipeDbCreateRecipe).toHaveBeenCalledTimes(1);
    expect(mockRecipeDbCreateRecipe).toHaveBeenCalledWith(
        new Recipe({title: newTitle,description: newDescription,
            instructions: newInstruction,
            portion_amount: newPortionAmount,
            ownerUsername: existingUser.getUserName(),
            ingredients: [] })
    );
});