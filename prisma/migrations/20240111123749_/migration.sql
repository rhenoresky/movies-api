-- CreateTable
CREATE TABLE "LikeMovie" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,

    CONSTRAINT "LikeMovie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LikeMovie_userId_movieId_key" ON "LikeMovie"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "LikeMovie" ADD CONSTRAINT "LikeMovie_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikeMovie" ADD CONSTRAINT "LikeMovie_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE CASCADE ON UPDATE CASCADE;
