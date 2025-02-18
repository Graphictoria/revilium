/*
  Warnings:

  - You are about to drop the column `renderId` on the `Universe` table. All the data in the column will be lost.
  - Added the required column `iconId` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnailId` to the `Universe` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Universe` DROP FOREIGN KEY `Universe_renderId_fkey`;

-- AlterTable
ALTER TABLE `Group` ADD COLUMN `iconId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Universe` DROP COLUMN `renderId`,
    ADD COLUMN `thumbnailId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Group` ADD CONSTRAINT `Group_iconId_fkey` FOREIGN KEY (`iconId`) REFERENCES `Render`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Universe` ADD CONSTRAINT `Universe_thumbnailId_fkey` FOREIGN KEY (`thumbnailId`) REFERENCES `Render`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
