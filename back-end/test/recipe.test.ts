import { Recipe } from "../model/recipe";

test('given: valid values for recept, when: recept is created, then: recept is created with those values', () =>{
    //given
    const newTitle = "Titel"
    const newDescription = "Cake"
    //when
    const newRecept = new Recipe({title:newTitle,description:newDescription})
    //then
    expect(newRecept.getTitle()).toEqual(newTitle)
    expect(newRecept.getDescription()).toEqual(newDescription)
    });