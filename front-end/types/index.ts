

export type User = {
  id?: number|undefined;
  userName: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  recipes?: Recipe[] | undefined;
};


export type Recipe = {
  id?: number|undefined;
  title : string;
  description : string;
  instructions: string;
  portion_amount : number;
  ownerUsername: string;
  ingredients: Ingredient[];
};

export type Ingredient = {
  id?: number|undefined;
  name : string;
  calories : number;
  fats: number;
  proteins : number;
  carbohydrates: number;
};
