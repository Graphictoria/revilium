/*
  Warnings:

  - You are about to drop the column `iconId` on the `Group` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailId` on the `Universe` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[universeId]` on the table `Render` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[groupId]` on the table `Render` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `Group` DROP FOREIGN KEY `Group_iconId_fkey`;

-- DropForeignKey
ALTER TABLE `Universe` DROP FOREIGN KEY `Universe_thumbnailId_fkey`;

-- AlterTable
ALTER TABLE `Group` DROP COLUMN `iconId`;

-- AlterTable
ALTER TABLE `Render` ADD COLUMN `groupId` INTEGER NULL,
    ADD COLUMN `universeId` INTEGER NULL;

-- AlterTable
ALTER TABLE `Universe` DROP COLUMN `thumbnailId`;

-- CreateIndex
CREATE UNIQUE INDEX `Render_universeId_key` ON `Render`(`universeId`);

-- CreateIndex
CREATE UNIQUE INDEX `Render_groupId_key` ON `Render`(`groupId`);

-- AddForeignKey
ALTER TABLE `Render` ADD CONSTRAINT `Render_universeId_fkey` FOREIGN KEY (`universeId`) REFERENCES `Universe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Render` ADD CONSTRAINT `Render_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
