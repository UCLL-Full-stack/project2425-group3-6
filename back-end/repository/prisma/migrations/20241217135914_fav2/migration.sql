/*
  Warnings:

  - You are about to drop the `_UserFavourites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_UserFavourites" DROP CONSTRAINT "_UserFavourites_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserFavourites" DROP CONSTRAINT "_UserFavourites_B_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "favouriteRecipes" INTEGER[];

-- DropTable
DROP TABLE "_UserFavourites";
