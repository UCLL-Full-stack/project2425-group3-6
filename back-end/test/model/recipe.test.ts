import { Ingredient } from "../../model/ingredient";
import { Recipe } from "../../model/recipe";
import { User } from "../../model/user";


const newTitle = "Titel"
const newDescription = "Cake"
const newInstruction = "instructions"
const newPortionAmount = 1

const existingUser =    
new User({
    id: 1,
    username: "johndoe",
    firstName: "John",
    lastName: "Doe",
    password: "Johndoe123",
    email: "johndoe@outlook.com",
});



const existingIngredient1 = new Ingredient({
    id: 1,
    name: "Tomato",
    calories: 18,
    fats: 0.2,
    proteins: 0.9,
    carbohydrates: 3.9,

});


const existingIngredient2 = new Ingredient({
    id: 2,
    name: "Celery",
    calories: 18,
    fats: 0.2,
    proteins: 0.9,
    carbohydrates: 3.9,
    amount: 1,
    unit: "piece",
});




test('given: valid values for recept, when: recept is created, then: recept is created with those values', () =>{
    //given

    //when
    const newRecept = new Recipe({title:newTitle,description:newDescription,instructions:newInstruction,portion_amount:newPortionAmount,ownerUsername:existingUser.getUserName(),ingredients:[existingIngredient1]})
    //then
    expect(newRecept.getTitle()).toEqual(newTitle)
    expect(newRecept.getDescription()).toEqual(newDescription)
    expect(newRecept.getInstructions()).toEqual(newInstruction)
    expect(newRecept.getPortionAmount()).toEqual(newPortionAmount)
    expect(newRecept.getOwnerUsername()).toEqual(existingUser.getUserName())
    expect(newRecept.getIngredients()).toContain(existingIngredient1)

});

test('given: negative portion value amount, when: recept is created, then: an error is given', () =>{
    //given
    const newPortionAmount = -1
    //when
    const newRecept = () => new Recipe({title:newTitle,description:newDescription,instructions:newInstruction,portion_amount:newPortionAmount,ownerUsername:existingUser.getUserName(),ingredients:[existingIngredient1]})
    //then
    expect(newRecept).toThrow('Portion amounts should be more then 0')

});

test('given: valid values for recept, when: Recipe owner is added, while an owner is already assigned, then: an error is given', () =>{
    //given
    const existingRecipe = new Recipe({title:newTitle,description:newDescription,instructions:newInstruction,portion_amount:newPortionAmount,ownerUsername:existingUser.getUserName(),ingredients:[existingIngredient1]})

    //when
    const addUsertoRecipe = () => existingRecipe.setOwnerUsername("newUser")
    
    //then
    expect(addUsertoRecipe).toThrow('This Recipe already has an owner');

});

