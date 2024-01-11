/*
  Warnings:

  - A unique constraint covering the columns `[movieId,categoryId]` on the table `MovieCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MovieCategory_movieId_categoryId_key" ON "MovieCategory"("movieId", "categoryId");
