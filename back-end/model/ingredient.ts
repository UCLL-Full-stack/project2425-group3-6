
export class Ingredient{
    private id?: number|undefined;
    private name: string;
    private calories: number;
    private fats: number;
    private proteins: number;
    private carbohydrates: number;
    private amount?: number|undefined;
    private unit?: string|undefined;
    
    constructor(ingredient:{id?:number|undefined, name: string; calories: number, fats:number,proteins:number,carbohydrates: number , amount?: number|undefined, unit?: string})
    {
        this.id = ingredient.id
        this.name = ingredient.name
        this.calories = ingredient.calories
        this.fats = ingredient.fats
        this.proteins = ingredient.proteins
        this.carbohydrates = ingredient.carbohydrates
        this.amount = ingredient.amount
        this.unit = ingredient.unit

    }

    getId() : number|undefined {
        return this.id
    }
    getName(): string{
        return this.name
    }
    getCalories(): number{
        return this.calories
    }
    getFats():number{
        return this.fats
    }
    getProteins():number{
        return this.proteins
    }
    getCarbohydrates(): number{
        return this.carbohydrates
    }
    getAmount():number|undefined{
        return this.amount
    }
    getUnit(): string|undefined{
        return this.unit
    }

    setAmount(amount: number): void {
        this.amount = amount;
    }
    setUnit(unit: string): void {
        this.unit = unit;
    }

    static from({ id, name, calories, fats, proteins, carbohydrates, amount, unit}: any): Ingredient {
        return new Ingredient({
            id,
            name,
            calories,
            fats,
            proteins,
            carbohydrates,
            amount,
            unit,
        });
      }

}