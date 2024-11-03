import { User } from "../../model/user";

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
    const newUsername = "johndoe"
    const newfirstName = "John"
    const newlastName = "Doe"
    const newpassword = "Johndoe123"
    const newEmail = "johndoe@outlook.com"

    //when
    const newUser = new User({userName:newUsername,firstName:newfirstName,lastName:newlastName,password:newpassword,email:newEmail})
    //then
    expect(newUser.getUserName()).toEqual(newUsername)
    expect(newUser.getFirstName()).toEqual(newfirstName)
    expect(newUser.getLastName()).toEqual(newlastName)
    expect(newUser.getPassword()).toEqual(newpassword)
    expect(newUser.getEmail()).toEqual(newEmail)
    
});

test('given: invalid values for user, when: user is created, then: an error code is given', () =>{
    //given
    const newUsername = "johndoe"
    const newfirstName = "John"
    const newlastName = "Doe"
    const newpassword = "Johndoe123"
    const newEmail = "johndoe@outlook.com"

    //when
    const newUser = new User({userName:newUsername,firstName:newfirstName,lastName:newlastName,password:newpassword,email:newEmail})
    //then
    expect(newUser.getUserName()).toEqual(newUsername)
    expect(newUser.getFirstName()).toEqual(newfirstName)
    expect(newUser.getLastName()).toEqual(newlastName)
    expect(newUser.getPassword()).toEqual(newpassword)
    expect(newUser.getEmail()).toEqual(newEmail)
    
});