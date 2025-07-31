/*
  Warnings:

  - You are about to drop the column `description` on the `Art` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Art` table. All the data in the column will be lost.
  - Added the required column `name` to the `Art` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Art` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Art" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "price" INTEGER NOT NULL;
