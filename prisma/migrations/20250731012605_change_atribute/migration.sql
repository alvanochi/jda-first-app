/*
  Warnings:

  - You are about to drop the `arts` table. If the table is not empty, all the data it contains will be lost.
  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "artCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "level" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "point" DOUBLE PRECISION NOT NULL DEFAULT 0,
ALTER COLUMN "role" SET NOT NULL;

-- DropTable
DROP TABLE "arts";

-- CreateTable
CREATE TABLE "Art" (
    "art_id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "Art_pkey" PRIMARY KEY ("art_id")
);

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
