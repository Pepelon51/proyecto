/*
  Warnings:

  - You are about to drop the column `incidence` on the `reports` table. All the data in the column will be lost.
  - Added the required column `priority` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solveBy` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reports` DROP COLUMN `incidence`,
    ADD COLUMN `priority` TEXT NOT NULL,
    ADD COLUMN `solveBy` TEXT NOT NULL;
