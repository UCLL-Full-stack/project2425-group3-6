/*
  Warnings:

  - You are about to drop the column `ingredients` on the `Recipe` table. All the data in the column will be lost.
  - Changed the type of `amount` on the `Ingredient` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "amount",
ADD COLUMN     "amount" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "ingredients";

-- CreateTable
CREATE TABLE "IngredientRecipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "unit" TEXT NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "IngredientRecipe_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IngredientRecipe" ADD CONSTRAINT "IngredientRecipe_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
