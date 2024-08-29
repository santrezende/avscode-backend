/*
  Warnings:

  - You are about to drop the column `cpfOrCnpj` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `rating` to the `services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cpf` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "services" ADD COLUMN     "rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "cpfOrCnpj",
ADD COLUMN     "cpf" TEXT NOT NULL;
