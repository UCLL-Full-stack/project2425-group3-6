-- CreateTable
CREATE TABLE "_UserFavourites" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserFavourites_AB_unique" ON "_UserFavourites"("A", "B");

-- CreateIndex
CREATE INDEX "_UserFavourites_B_index" ON "_UserFavourites"("B");

-- AddForeignKey
ALTER TABLE "_UserFavourites" ADD CONSTRAINT "_UserFavourites_A_fkey" FOREIGN KEY ("A") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserFavourites" ADD CONSTRAINT "_UserFavourites_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
