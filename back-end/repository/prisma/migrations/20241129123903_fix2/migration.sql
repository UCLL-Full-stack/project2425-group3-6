/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Recipe` table. All the data in the column will be lost.
  - Added the required column `ownerUsername` to the `Recipe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_ownerId_fkey";

-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "ownerId",
ADD COLUMN     "ownerUsername" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_ownerUsername_fkey" FOREIGN KEY ("ownerUsername") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
