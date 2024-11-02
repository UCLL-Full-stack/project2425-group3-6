type UserInput = {
    id?: number;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    email:string;
    recipes?:RecipeInput[]
};

type RecipeInput = {
    id?: number;
    title : string;
    description : string;
    instructions: string;
    portion_amount : number;
    ownerUsername: string;
    ingredients: IngredientInput[];
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


export {
    UserInput,
    RecipeInput,
    IngredientInput
};