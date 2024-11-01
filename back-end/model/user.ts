import { Recipe } from "./recipe";

export class User{

    private id?: number|undefined;
    private userName: string;
    private firstName: string;
    private lastName: string;
    private password: string;
    private email:string;
    private recipes:Recipe[]

    constructor(user:{id?:number|undefined, userName:string, firstName:string, lastName: string, password: string, email: string})
    {
        this.id = user.id
        this.userName = user.userName
        this.firstName = user.firstName
        this.lastName = user.lastName
        this.password = user.password
        this.email = user.email
        this.recipes = []
    }

    getId():number|undefined {
        return this.id
    }
    getUserName() : string {
        return this.userName
    }
    getFirstName() : string {
        return this.firstName
    }
    getLastName() : string {
        return this.lastName

    }
    getPassword(): string {
        return this.password
    }
    getEmail() : string {
        return this.email
    }
    getRecipes() : Recipe[]{
        return this.recipes
    }

    addRecipeToUser(recipe: Recipe) {
        if (!recipe) throw new Error('Recipe is required');
        if (this.recipes.includes(recipe))
            throw new Error('Recipe is already added to this user');
        this.recipes.push(recipe);
        
    }

}