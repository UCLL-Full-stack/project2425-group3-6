/*
  Warnings:

  - You are about to drop the `_UserFavouriteRecipes` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFavouriteRecipes" DROP CONSTRAINT "_UserFavouriteRecipes_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavouriteRecipes" DROP CONSTRAINT "_UserFavouriteRecipes_B_fkey";

-- DropTable
DROP TABLE "_UserFavouriteRecipes";

-- CreateTable
CREATE TABLE "UserFavouriteRecipes" (
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,

    CONSTRAINT "UserFavouriteRecipes_pkey" PRIMARY KEY ("userId","recipeId")
);

-- AddForeignKey
ALTER TABLE "UserFavouriteRecipes" ADD CONSTRAINT "UserFavouriteRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserFavouriteRecipes" ADD CONSTRAINT "UserFavouriteRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
