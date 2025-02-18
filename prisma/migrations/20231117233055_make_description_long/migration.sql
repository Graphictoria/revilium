-- AlterTable
ALTER TABLE `User` MODIFY `description` LONGTEXT NULL,
    MODIFY `pronouns` VARCHAR(191) NULL DEFAULT 'they/them';
