/*
  Warnings:

  - You are about to drop the column `userId` on the `Invite` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[usedById]` on the table `Invite` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdById` to the `Invite` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Invite` DROP FOREIGN KEY `Invite_userId_fkey`;

-- AlterTable
ALTER TABLE `Invite` DROP COLUMN `userId`,
    ADD COLUMN `createdById` INTEGER NOT NULL,
    ADD COLUMN `usedById` INTEGER NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Invite_usedById_key` ON `Invite`(`usedById`);

-- CreateIndex
CREATE UNIQUE INDEX `User_email_key` ON `User`(`email`);

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_createdById_fkey` FOREIGN KEY (`createdById`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Invite` ADD CONSTRAINT `Invite_usedById_fkey` FOREIGN KEY (`usedById`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
