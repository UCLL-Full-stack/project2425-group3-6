

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
  id?: number|undefined;
  title : string;
  description : string;
  instructions: string;
  portion_amount : number;
}
