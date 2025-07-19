-- CreateTable
CREATE TABLE "arts" (
    "art_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "arts_pkey" PRIMARY KEY ("art_id")
);
