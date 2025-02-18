/*
  Warnings:

  - You are about to drop the column `userId` on the `Ad` table. All the data in the column will be lost.
  - The values [DENIED] on the enum `Ad_status` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `userId` on the `OwnedAsset` table. All the data in the column will be lost.
  - You are about to drop the `Place` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `creatorId` to the `Ad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `OwnedAsset` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serial` to the `OwnedAsset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Ad` DROP FOREIGN KEY `Ad_userId_fkey`;

-- DropForeignKey
ALTER TABLE `OwnedAsset` DROP FOREIGN KEY `OwnedAsset_userId_fkey`;

-- DropForeignKey
ALTER TABLE `Place` DROP FOREIGN KEY `Place_universeId_fkey`;

-- AlterTable
ALTER TABLE `Ad` DROP COLUMN `userId`,
    ADD COLUMN `creatorId` INTEGER NOT NULL,
    MODIFY `status` ENUM('PUBLIC', 'REVIEW', 'DELETED') NOT NULL;

-- AlterTable
ALTER TABLE `Asset` ADD COLUMN `limited` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `remaining` INTEGER NULL,
    ADD COLUMN `sales` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `universeId` INTEGER NULL,
    MODIFY `offsale` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `type` ENUM('IMAGE', 'TSHIRT', 'AUDIO', 'MESH', 'LUA', 'HAT', 'PLACE', 'MODEL', 'SHIRT', 'PANTS', 'DECAL', 'HEAD', 'FACE', 'GEAR', 'BADGE', 'ANIMATION', 'TORSO', 'RIGHTARM', 'LEFTARM', 'LEFTLEG', 'RIGHTLEG', 'PACKAGE', 'GAMEPASS', 'PLUGIN', 'MESHPART') NOT NULL;

-- AlterTable
ALTER TABLE `Friendship` MODIFY `status` ENUM('PENDING', 'FRIENDS', 'FOLLOWING', 'BLOCKED') NOT NULL;

-- AlterTable
ALTER TABLE `OwnedAsset` DROP COLUMN `userId`,
    ADD COLUMN `ownerId` INTEGER NOT NULL,
    ADD COLUMN `serial` INTEGER NOT NULL;

-- DropTable
DROP TABLE `Place`;

-- AddForeignKey
ALTER TABLE `Asset` ADD CONSTRAINT `Asset_universeId_fkey` FOREIGN KEY (`universeId`) REFERENCES `Universe`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `OwnedAsset` ADD CONSTRAINT `OwnedAsset_ownerId_fkey` FOREIGN KEY (`ownerId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Ad` ADD CONSTRAINT `Ad_creatorId_fkey` FOREIGN KEY (`creatorId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
