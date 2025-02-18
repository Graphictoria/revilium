/*
  Warnings:

  - You are about to drop the column `userId` on the `Asset` table. All the data in the column will be lost.
  - Added the required column `creatorId` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Asset` DROP FOREIGN KEY `Asset_userId_fkey`;

-- AlterTable
ALTER TABLE `Asset` DROP COLUMN `userId`,
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    MODIFY `description` LONGTEXT NOT NULL;

-- CreateTable
CREATE TABLE `Log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('GRANT_STIPEND', 'PURCHASE_ASSET', 'UPDATE_ASSET', 'JOIN_PLACE', 'SOLD_ASSET', 'UPLOAD_ASSET', 'USER_BAN', 'USER_WARNING', 'GRANT_CURRENCY', 'SITE_ALERT', 'USER_PASSWORD_CHANGE', 'USER_PASSWORD_RESET', 'ADMIN_PASSWORD_RESET', 'USER_EMAIL_CHANGE', 'ADMIN_EMAIL_CHANGE') NOT NULL,
    `message` VARCHAR(191) NULL,
    `actorId` INTEGER NULL,
    `targetUserId` INTEGER NULL,
    `targetAssetId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_targetUserId_fkey` FOREIGN KEY (`targetUserId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Log` ADD CONSTRAINT `Log_targetAssetId_fkey` FOREIGN KEY (`targetAssetId`) REFERENCES `Asset`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
