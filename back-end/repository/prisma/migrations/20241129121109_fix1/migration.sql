/*
  Warnings:

  - You are about to drop the `MeMeasureunit` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "MeMeasureunit";

-- CreateTable
CREATE TABLE "Measureunit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "size" INTEGER NOT NULL,

    CONSTRAINT "Measureunit_pkey" PRIMARY KEY ("id")
);
