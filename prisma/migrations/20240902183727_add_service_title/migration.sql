/*
  Warnings:

  - Added the required column `serviceTitle` to the `services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "serviceTitle" TEXT NOT NULL;
