

export type User = {
  firstName?: string;
  lastName?: string;
  fullname?: string;
  email?: string;
  username?: string;
  password?: string;
  role?: string;
};

export type Recipe = {
  id?: number|undefined;
  title : string;
  description : string;
  instructions: string;
  portion_amount : number;
}
