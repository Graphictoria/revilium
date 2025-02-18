/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[renderId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `renderId` INTEGER NULL;

-- CreateTable
CREATE TABLE `Asset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` INTEGER NOT NULL,
    `offsale` BOOLEAN NOT NULL DEFAULT false,
    `userId` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `type` ENUM('IMAGE', 'HAT', 'SHIRT', 'PANTS', 'TSHIRT', 'FACE', 'HEAD', 'GEAR', 'MODEL', 'DECAL', 'AUDIO', 'PLACE', 'MESH', 'PACKAGE') NOT NULL,
    `status` ENUM('DELETED', 'REVIEW', 'PRIVATE', 'PUBLIC') NOT NULL,
    `renderId` INTEGER NULL,

    UNIQUE INDEX `Asset_renderId_key`(`renderId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Render` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` ENUM('DELETED', 'REVIEW', 'PUBLIC') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Invite_userId_key` ON `Invite`(`userId`);

-- CreateIndex
CREATE UNIQUE INDEX `User_renderId_key` ON `User`(`renderId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_renderId_fkey` FOREIGN KEY (`renderId`) REFERENCES `Render`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_renderId_fkey` FOREIGN KEY (`renderId`) REFERENCES `Render`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
