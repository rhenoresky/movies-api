-- DropForeignKey
ALTER TABLE "MovieCategory" DROP CONSTRAINT "MovieCategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MovieCategory" DROP CONSTRAINT "MovieCategory_movieId_fkey";

-- AddForeignKey
ALTER TABLE "MovieCategory" ADD CONSTRAINT "MovieCategory_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MovieCategory" ADD CONSTRAINT "MovieCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
