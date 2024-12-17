/*
  Warnings:

  - You are about to drop the column `favouriteRecipes` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "favouriteRecipes";

-- CreateTable
CREATE TABLE "_UserFavouriteRecipes" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavouriteRecipes_AB_unique" ON "_UserFavouriteRecipes"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavouriteRecipes_B_index" ON "_UserFavouriteRecipes"("B");

-- AddForeignKey
ALTER TABLE "_UserFavouriteRecipes" ADD CONSTRAINT "_UserFavouriteRecipes_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavouriteRecipes" ADD CONSTRAINT "_UserFavouriteRecipes_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
