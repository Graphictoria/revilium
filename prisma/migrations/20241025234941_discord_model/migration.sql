/*
  Warnings:

  - You are about to drop the column `discord` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_discord_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `discord`;

-- CreateTable
CREATE TABLE `Discord` (
    `id` INTEGER NOT NULL,
    `accessToken` VARCHAR(191) NOT NULL,
    `refreshToken` VARCHAR(191) NOT NULL,
    `expiresAt` DATETIME(3) NOT NULL,
    `scope` VARCHAR(191) NOT NULL,
    `userId` INTEGER NOT NULL,

    UNIQUE INDEX `Discord_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Discord` ADD CONSTRAINT `Discord_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
