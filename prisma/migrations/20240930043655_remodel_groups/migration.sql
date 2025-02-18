/*
  Warnings:

  - You are about to drop the column `groupMemberRoleId` on the `GroupMember` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Shout` table. All the data in the column will be lost.
  - You are about to drop the `GroupMemberRole` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `name` to the `Group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupRoleId` to the `GroupMember` table without a default value. This is not possible if the table is not empty.
  - Added the required column `content` to the `Shout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `groupMemberId` to the `Shout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `GroupMember` DROP FOREIGN KEY `GroupMember_groupMemberRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `GroupMemberRole` DROP FOREIGN KEY `GroupMemberRole_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `GroupMemberRole` DROP FOREIGN KEY `GroupMemberRole_groupRoleId_fkey`;

-- DropForeignKey
ALTER TABLE `Shout` DROP FOREIGN KEY `Shout_userId_fkey`;

-- AlterTable
ALTER TABLE `Group` ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `GroupMember` DROP COLUMN `groupMemberRoleId`,
    ADD COLUMN `groupRoleId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `GroupRole` MODIFY `description` VARCHAR(191) NOT NULL,
    ALTER COLUMN `power` DROP DEFAULT;

-- AlterTable
ALTER TABLE `Render` ADD COLUMN `type` ENUM('PRIMARY', 'SECONDARY') NOT NULL DEFAULT 'PRIMARY';

-- AlterTable
ALTER TABLE `Shout` DROP COLUMN `userId`,
    ADD COLUMN `content` VARCHAR(191) NOT NULL,
    ADD COLUMN `groupMemberId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `GroupMemberRole`;

-- AddForeignKey
ALTER TABLE `Shout` ADD CONSTRAINT `Shout_groupMemberId_fkey` FOREIGN KEY (`groupMemberId`) REFERENCES `GroupMember`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GroupMember` ADD CONSTRAINT `GroupMember_groupRoleId_fkey` FOREIGN KEY (`groupRoleId`) REFERENCES `GroupRole`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
