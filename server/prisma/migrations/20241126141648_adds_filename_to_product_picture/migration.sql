/*
  Warnings:

  - Added the required column `filename` to the `ProductPicture` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProductPicture" ADD COLUMN     "filename" TEXT NOT NULL;
