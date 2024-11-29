import bcrypt from 'bcrypt';
import { Recipe } from './recipe';


export class User {
  private id?: number;
  private username: string;
  private firstName: string;
  private lastName: string;
  private password!: string;
  private email: string;
  private recipes: Recipe[];

  constructor(user: { id?: number; username: string; firstName: string; lastName: string; password: string; email: string }) {
    this.validate(user);
    this.id = user.id;
    this.username = user.username;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.setPassword(user.password);
    this.email = user.email;
    this.recipes = [];
  }

  getId(): number | undefined {
    return this.id;
  }
  
  getUserName(): string {
    return this.username;
  }

  getFirstName(): string {
    return this.firstName;
  }

  getLastName(): string {
    return this.lastName;
  }

  getPassword(): string {
    return this.password;
  }

  getEmail(): string {
    return this.email;
  }

  getRecipes(): Recipe[] {
    return this.recipes;
  }

  addRecipeToUser(newRecipe: Recipe): void {
    this.recipes.push(newRecipe);
  }

  async setPassword(plainPassword: string): Promise<void> {
    this.password = plainPassword;
  }

  async verifyPassword(plainPassword: string): Promise<boolean> {
    if (!this.password) {
      throw new Error('Password is not set for this user');
    }
    return await bcrypt.compare(plainPassword, this.password);
  }

  validate(user: {
    username: string;
    firstName: string;
    lastName: string;
    email: string;
}) {
    if (!user.username?.trim()) {
        throw new Error('Username is required');
    }
    if (!user.firstName?.trim()) {
        throw new Error('First name is required');
    }
    if (!user.lastName?.trim()) {
        throw new Error('Last name is required');
    }
    if (!user.email?.trim()) {
        throw new Error('Email is required');
    }
}

  equals(user: User): boolean {
    return (
      this.username === user.getUserName() &&
      this.firstName === user.getFirstName() &&
      this.lastName === user.getLastName() &&
      this.email === user.getEmail() &&
      this.password === user.getPassword()
    );
  }

  static from({ id, username, password, firstName, lastName, email}: any): User {
    return new User({
        id,
        username,
        password,
        firstName,
        lastName,
        email,
    });
  } 
}
