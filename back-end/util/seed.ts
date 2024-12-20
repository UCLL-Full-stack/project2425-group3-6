import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
import bcrypt from 'bcrypt';

async function main() {
    const ingredients = [
        { name: "Sugar", calories: 387, fats: 0, carbohydrates: 100, amount: 100, unit: "g" },
        { name: "Flour", calories: 364, fats: 1, carbohydrates: 76, amount: 100, unit: "g" },
        { name: "Butter", calories: 717, fats: 81, carbohydrates: 0, amount: 100, unit: "g" },
        { name: "Eggs", calories: 155, fats: 11, carbohydrates: 1.1, amount: 100, unit: "g" },
        { name: "Milk", calories: 42, fats: 1, carbohydrates: 5, amount: 100, unit: "ml" },
        { name: "Salt", calories: 0, fats: 0, carbohydrates: 0, amount: 1, unit: "g" },
        { name: "Olive oil", calories: 884, fats: 100, carbohydrates: 0, amount: 100, unit: "ml" },
        { name: "Chicken breast", calories: 165, fats: 3.6, carbohydrates: 0, amount: 100, unit: "g" },
        { name: "Rice", calories: 130, fats: 0.3, carbohydrates: 28, amount: 100, unit: "g" },
        { name: "Potatoes", calories: 77, fats: 0.1, carbohydrates: 17, amount: 100, unit: "g" },
        { name: "Tomatoes", calories: 18, fats: 0.2, carbohydrates: 3.9, amount: 100, unit: "g" },
        { name: "Onions", calories: 40, fats: 0.1, carbohydrates: 9, amount: 100, unit: "g" },
        { name: "Garlic", calories: 149, fats: 0.5, carbohydrates: 33, amount: 100, unit: "g" },
        { name: "Carrots", calories: 41, fats: 0.2, carbohydrates: 10, amount: 100, unit: "g" },
        { name: "Bell peppers", calories: 20, fats: 0.2, carbohydrates: 4.6, amount: 100, unit: "g" },
        { name: "Cucumber", calories: 15, fats: 0.1, carbohydrates: 3.6, amount: 100, unit: "g" },
        { name: "Zucchini", calories: 17, fats: 0.3, carbohydrates: 3.1, amount: 100, unit: "g" },
        { name: "Spinach", calories: 23, fats: 0.4, carbohydrates: 3.6, amount: 100, unit: "g" },
        { name: "Lettuce", calories: 15, fats: 0.2, carbohydrates: 2.9, amount: 100, unit: "g" },
        { name: "Broccoli", calories: 34, fats: 0.4, carbohydrates: 7, amount: 100, unit: "g" },
        { name: "Cauliflower", calories: 25, fats: 0.3, carbohydrates: 5, amount: 100, unit: "g" },
        { name: "Mushrooms", calories: 22, fats: 0.3, carbohydrates: 3.3, amount: 100, unit: "g" },
        { name: "Green beans", calories: 31, fats: 0.1, carbohydrates: 7, amount: 100, unit: "g" },
        { name: "Sweet potatoes", calories: 86, fats: 0.1, carbohydrates: 20, amount: 100, unit: "g" },
        { name: "Avocado", calories: 160, fats: 15, carbohydrates: 9, amount: 100, unit: "g" },
        { name: "Bananas", calories: 89, fats: 0.3, carbohydrates: 23, amount: 100, unit: "g" },
        { name: "Apples", calories: 52, fats: 0.2, carbohydrates: 14, amount: 100, unit: "g" },
        { name: "Oranges", calories: 47, fats: 0.1, carbohydrates: 12, amount: 100, unit: "g" },
        { name: "Strawberries", calories: 32, fats: 0.3, carbohydrates: 7.7, amount: 100, unit: "g" },
        { name: "Blueberries", calories: 57, fats: 0.3, carbohydrates: 14, amount: 100, unit: "g" },
        { name: "Cheese", calories: 402, fats: 33, carbohydrates: 1.3, amount: 100, unit: "g" },
        { name: "Yogurt", calories: 59, fats: 0.4, carbohydrates: 3.6, amount: 100, unit: "g" },
        { name: "Beef", calories: 250, fats: 15, carbohydrates: 0, amount: 100, unit: "g" },
        { name: "Pork", calories: 242, fats: 14, carbohydrates: 0, amount: 100, unit: "g" },
        { name: "Salmon", calories: 208, fats: 13, carbohydrates: 0, amount: 100, unit: "g" },
        { name: "Shrimp", calories: 99, fats: 0.3, carbohydrates: 0.2, amount: 100, unit: "g" },
        { name: "Tuna", calories: 132, fats: 1, carbohydrates: 0, amount: 100, unit: "g" },
        { name: "Almonds", calories: 579, fats: 50, carbohydrates: 22, amount: 100, unit: "g" },
        { name: "Walnuts", calories: 654, fats: 65, carbohydrates: 14, amount: 100, unit: "g" },
        { name: "Peanuts", calories: 567, fats: 49, carbohydrates: 16, amount: 100, unit: "g" },
        { name: "Honey", calories: 304, fats: 0, carbohydrates: 82, amount: 100, unit: "g" },
        { name: "Soy sauce", calories: 53, fats: 0.1, carbohydrates: 4.9, amount: 100, unit: "ml" },
        { name: "Vinegar", calories: 21, fats: 0, carbohydrates: 0.9, amount: 100, unit: "ml" },
        { name: "Ketchup", calories: 112, fats: 0.1, carbohydrates: 25, amount: 100, unit: "g" },
        { name: "Mayonnaise", calories: 680, fats: 75, carbohydrates: 0.6, amount: 100, unit: "g" },
        { name: "Mustard", calories: 66, fats: 4, carbohydrates: 5, amount: 100, unit: "g" },
        { name: "Basil", calories: 22, fats: 0.6, carbohydrates: 2.7, amount: 100, unit: "g" },
        { name: "Parsley", calories: 36, fats: 0.8, carbohydrates: 6.3, amount: 100, unit: "g" },
        { name: "Cilantro", calories: 23, fats: 0.5, carbohydrates: 3.7, amount: 100, unit: "g" },
        { name: "Chili peppers", calories: 40, fats: 0.4, carbohydrates: 9, amount: 100, unit: "g" },
        { name: "Cinnamon", calories: 247, fats: 1.2, carbohydrates: 81, amount: 100, unit: "g" },
        { name: "Black pepper", calories: 251, fats: 3.3, carbohydrates: 64, amount: 100, unit: "g" },
        { name: "Oregano", calories: 265, fats: 4.3, carbohydrates: 69, amount: 100, unit: "g"}
        
    ];

    console.log("Seeding ingredients...");

    for (const ingredient of ingredients) {
        await prisma.ingredient.create({
            data: ingredient,
        });
    }

    console.log("Seeding complete!");

    console.log("Seeding user...");
    const user = await prisma.user.create({
      data: {
        username: "chefmaster",
        firstName: "John",
        lastName: "Doe",
        password: await bcrypt.hash('securepassword', 12),
        email: "chefmaster@example.com",
      },
    });
    console.log("User seeded:", user);

    const user1 = await prisma.user.create({
      data: {
        username: "frans",
        firstName: "Frans",
        lastName: "Smith",
        password: await bcrypt.hash('frans123', 12) ,
        email: "frans@example.com",
      },
    });
    console.log("User seeded:", user1);
    
    const user2 = await prisma.user.create({
      data: {
        username: "jan",
        firstName: "Jan",
        lastName: "Johnson",
        password: await bcrypt.hash('jan123', 12) ,
        email: "jan@example.com",
      },
    });
    console.log("User seeded:", user2);
    
    const user3 = await prisma.user.create({
      data: {
        username: "frits",
        firstName: "Frits",
        lastName: "Brown",
        password: await bcrypt.hash('frits123', 12),
        email: "frits@example.com",
      },
    });
    console.log("User seeded:", user3);
    
    const user4 = await prisma.user.create({
      data: {
        username: "admin",
        firstName: "Admin",
        lastName: "User",
        password: await bcrypt.hash('admin123', 12),
        email: "admin@example.com",
      },
    });
    console.log("User seeded:", user4);
    
    console.log("Seeding recipes...");
    const recipes = [
       {
      title: "Pancakes",
      description: "Fluffy and delicious pancakes.",
      instructions: "Mix all ingredients and fry in a pan.",
      portion_amount: 4,
      ownerUsername: user.username,
      ingredients: [
        { name: "Flour", amount: 200, unit: "g" },
        { name: "Eggs", amount: 2, unit: "piece" },
        { name: "Milk", amount: 250, unit: "ml" },
      ],
    },
    {
      title: "Scrambled Eggs",
      description: "Quick and easy scrambled eggs.",
      instructions: "Whisk eggs, cook in butter, and season with salt.",
      portion_amount: 2,
      ownerUsername: user.username,
      ingredients: [
        { name: "Eggs", amount: 3, unit: "piece" },
        { name: "Butter", amount: 20, unit: "g" },
      ],
    },
    {
      title: "Butter Cake",
      description: "Rich buttery cake for dessert.",
      instructions: "Mix butter, sugar, and flour, bake in the oven.",
      portion_amount: 6,
      ownerUsername: user.username,
      ingredients: [
        { name: "Butter", amount: 100, unit: "g" },
        { name: "Sugar", amount: 150, unit: "g" },
        { name: "Flour", amount: 200, unit: "g" },
      ],
    },
    {
      title: "French Toast",
      description: "Sweet and crispy French toast.",
      instructions: "Dip bread in egg mixture and fry in butter.",
      portion_amount: 3,
      ownerUsername: user.username,
      ingredients: [
        { name: "Eggs", amount: 2, unit: "piece" },
        { name: "Milk", amount: 100, unit: "ml" },
        { name: "Butter", amount: 10, unit: "g" },
      ],
    },
    ];
  
    for (const recipe of recipes) {
        const recipeRecord = await prisma.recipe.create({
          data: {
            title: recipe.title,
            description: recipe.description,
            instructions: recipe.instructions,
            portion_amount: recipe.portion_amount,
            ownerUsername: recipe.ownerUsername,
            ingredients: {
              create: recipe.ingredients.map((ingredient) => ({
                name: ingredient.name,
                amount: ingredient.amount,
                unit: ingredient.unit,
              })),
            },
          },
        });
        console.log(`Recipe seeded: ${recipeRecord.title}`);
    }
    console.log("Recipes seeded!");
  }
  
  (async () => {
    try {
      await main();
      await prisma.$disconnect();
    } catch (error) {
      console.error(error);
      await prisma.$disconnect();
      process.exit(1);
    }
  })();

