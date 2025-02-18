-- DropForeignKey
ALTER TABLE `Invite` DROP FOREIGN KEY `Invite_createdById_fkey`;

-- AlterTable
ALTER TABLE `Invite` MODIFY `createdById` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
