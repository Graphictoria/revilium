/*
  Warnings:

  - You are about to drop the column `renderId` on the `Asset` table. All the data in the column will be lost.
  - You are about to drop the column `renderId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[assetId]` on the table `Render` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Render` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_renderId_fkey`;

-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_renderId_fkey`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `renderId`;

-- AlterTable
ALTER TABLE `Render` ADD COLUMN `assetId` INTEGER NULL,
    ADD COLUMN `userId` INTEGER NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `renderId`;

-- CreateIndex
CREATE UNIQUE INDEX `Render_assetId_key` ON `Render`(`assetId`);

-- CreateIndex
CREATE UNIQUE INDEX `Render_userId_key` ON `Render`(`userId`);

-- AddForeignKey
ALTER TABLE `Render` ADD CONSTRAINT `Render_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Render` ADD CONSTRAINT `Render_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
