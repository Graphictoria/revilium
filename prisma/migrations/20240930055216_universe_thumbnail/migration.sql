/*
  Warnings:

  - Added the required column `renderId` to the `Universe` table without a default value. This is not possible if the table is not empty.
  - Made the column `description` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `pronouns` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Universe` ADD COLUMN `renderId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `pronouns` VARCHAR(191) NOT NULL DEFAULT 'they/them';

-- AddForeignKey
ALTER TABLE `Universe` ADD CONSTRAINT `Universe_renderId_fkey` FOREIGN KEY (`renderId`) REFERENCES `Render`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
