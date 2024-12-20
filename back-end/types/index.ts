type Role = 'admin' | 'user' | 'guest';

type UserInput = {
    id?: number;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
    email:string;
    recipes?:RecipeInput[];
    favouriteRecipes?:RecipeInput[];
    role?: Role;
};

type RecipeInput = {
    id?: number;
    title : string;
    description : string;
    instructions: string;
    portion_amount : number;
    ownerUsername: string;
    ingredients: IngredientRecipe[];
    favouritedBy?: UserInput[]

};

type IngredientInput = {
    id?: number;
    name : string;
    calories : number;
    fats: number;
    proteins : number;
    carbohydrates: number;
    amount?: number|undefined;
    unit?: string|undefined;
};

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
};

type IngredientRecipe = {
    name: string;
    amount: number;
    unit: string;
    recipeId: number;
  };
  


export {
    UserInput,
    RecipeInput,
    IngredientInput,
    AuthenticationResponse,
    IngredientRecipe,
    Role
};