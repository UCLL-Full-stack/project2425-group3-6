import { Ingredient } from "../../model/ingredient";
import { Recipe } from "../../model/recipe";
import { User } from "../../model/user";

const newUsername = "johndoe"
const newfirstName = "John"
const newlastName = "Doe"
const newpassword = "Johndoe123"
const newEmail = "johndoe@outlook.com"

const existingUser = new User({
    id: 1 ,
    userName:"johndoe",
    firstName:"John",
    lastName:"Doe",
    password:"Johndoe123",
    email:"johndoe@outlook.com",
    

})



test('given: valid values for user, when: user is created, then: user is created with those values', () =>{
    //given

    //when
    const newUser = new User({userName:newUsername,firstName:newfirstName,lastName:newlastName,password:newpassword,email:newEmail})
    //then
    expect(newUser.getUserName()).toEqual(newUsername)
    expect(newUser.getFirstName()).toEqual(newfirstName)
    expect(newUser.getLastName()).toEqual(newlastName)
    expect(newUser.getPassword()).toEqual(newpassword)
    expect(newUser.getEmail()).toEqual(newEmail)
    
});

test('given: A valid recipe, when: recipe is added to user, then: a recipe is added with a preexisting recipe', () =>{
    //given
    const existingRecipe = new Recipe({
        id: 2,
        title: "Tomato soup",
        description: "A soup made with tomato",
        instructions: "Create the soup",
        portion_amount: 6,
        ownerUsername: "johndoe"
        ,ingredients:[]
    })
    //when
    existingUser.addRecipeToUser(existingRecipe)
    //then
    expect(existingUser.getRecipes()).toContain(existingRecipe)

});

test('given: A valid recipe, when: recipe is added to user and the same recipe is already in the list, then: an error code is given', () =>{
    //given
    const existingRecipe = new Recipe({
        id: 2,
        title: "Tomato soup",
        description: "A soup made with tomato",
        instructions: "Create the soup",
        portion_amount: 6,
        ownerUsername: "johndoe"
        ,ingredients:[]
    })
    existingUser.addRecipeToUser(existingRecipe)

    //when
    const addRecipeToUser = () => existingUser.addRecipeToUser(existingRecipe)
    //then
    expect(addRecipeToUser).toThrow('Recipe is already added to this user')

});