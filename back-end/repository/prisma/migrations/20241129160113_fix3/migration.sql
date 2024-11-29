/*
  Warnings:

  - You are about to drop the `RecipeIngredient` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Ingredient` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "RecipeIngredient" DROP CONSTRAINT "RecipeIngredient_recipeId_fkey";

-- AlterTable
ALTER TABLE "Recipe" ADD COLUMN     "ingredients" TEXT[];

-- DropTable
DROP TABLE "RecipeIngredient";

-- CreateIndex
CREATE UNIQUE INDEX "Ingredient_name_key" ON "Ingredient"("name");
