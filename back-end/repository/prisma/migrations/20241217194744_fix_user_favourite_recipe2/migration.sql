/*
  Warnings:

  - The primary key for the `UserFavouriteRecipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `UserFavouriteRecipes` table. All the data in the column will be lost.
  - Added the required column `userName` to the `UserFavouriteRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "UserFavouriteRecipes" DROP CONSTRAINT "UserFavouriteRecipes_userId_fkey";

-- AlterTable
ALTER TABLE "UserFavouriteRecipes" DROP CONSTRAINT "UserFavouriteRecipes_pkey",
DROP COLUMN "userId",
ADD COLUMN     "userName" TEXT NOT NULL,
ADD CONSTRAINT "UserFavouriteRecipes_pkey" PRIMARY KEY ("userName", "recipeId");

-- AddForeignKey
ALTER TABLE "UserFavouriteRecipes" ADD CONSTRAINT "UserFavouriteRecipes_userName_fkey" FOREIGN KEY ("userName") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
