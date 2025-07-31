/*
  Warnings:

  - You are about to drop the column `authorId` on the `Art` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Art` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Art" DROP CONSTRAINT "Art_authorId_fkey";

-- AlterTable
ALTER TABLE "Art" DROP COLUMN "authorId",
ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Art" ADD CONSTRAINT "Art_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
