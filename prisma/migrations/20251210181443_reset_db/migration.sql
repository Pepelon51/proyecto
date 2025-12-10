/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `reports` MODIFY `requesteName` TEXT NOT NULL,
    MODIFY `proyect` TEXT NOT NULL,
    MODIFY `department` TEXT NOT NULL,
    MODIFY `incidence` TEXT NOT NULL,
    MODIFY `description` TEXT NOT NULL;

-- DropTable
DROP TABLE `user`;

-- CreateTable
CREATE TABLE `users` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    `password` VARCHAR(60) NOT NULL,
    `position` TEXT NOT NULL,
    `name` TEXT NOT NULL,
    `proyect` TEXT NOT NULL,
    `role` TEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
