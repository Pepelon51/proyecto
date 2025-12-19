/*
  Warnings:

  - You are about to drop the column `requesteName` on the `reports` table. All the data in the column will be lost.
  - You are about to drop the column `solveBy` on the `reports` table. All the data in the column will be lost.
  - Added the required column `requestName` to the `reports` table without a default value. This is not possible if the table is not empty.
  - Added the required column `solvedBy` to the `reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `reports` DROP COLUMN `requesteName`,
    DROP COLUMN `solveBy`,
    ADD COLUMN `requestName` TEXT NOT NULL,
    ADD COLUMN `solvedBy` TEXT NOT NULL;
