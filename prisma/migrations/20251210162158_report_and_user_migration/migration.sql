-- CreateTable
CREATE TABLE `reports` (
    `idreport` INTEGER NOT NULL AUTO_INCREMENT,
    `requesteName` VARCHAR(150) NOT NULL,
    `proyect` VARCHAR(60) NOT NULL,
    `department` VARCHAR(100) NOT NULL,
    `incidence` VARCHAR(150) NOT NULL,
    `description` VARCHAR(500) NOT NULL,
    `status` ENUM('OPEN', 'IN_PROGRESS', 'CLOSED') NOT NULL DEFAULT 'OPEN',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`idreport`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `iduser` INTEGER NOT NULL AUTO_INCREMENT,
    `user` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `position` VARCHAR(255) NOT NULL,
    `name` VARCHAR(100) NOT NULL,
    `proyect` VARCHAR(60) NOT NULL,
    `role` VARCHAR(60) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`iduser`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
