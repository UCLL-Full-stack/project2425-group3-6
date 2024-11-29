

export type User = {
  id?: number|undefined;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  recipes?: Recipe[] | undefined;
};


export type Recipe = {
  id: number;
  title : string;
  description : string;
  instructions: string;
  portion_amount : number;
  ownerUsername: string;
  ingredients: IngredientRecipe[];
};

export type Ingredient = {
  id?: number|undefined;
  name : string;
  calories : number;
  fats: number;
  proteins : number;
  carbohydrates: number;
  amount? : number|undefined;
  unit? : string|undefined;
};

export type IngredientRecipe = {
  name: string;
  amount: number;
  unit: string;
  ingredientId: number | undefined;
};
