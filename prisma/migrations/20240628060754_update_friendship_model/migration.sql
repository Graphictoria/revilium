/*
  Warnings:

  - You are about to drop the column `receiverId` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `senderId` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[rightId,leftId]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `leftId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rightId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_receiverId_fkey`;

-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_senderId_fkey`;

-- DropIndex
DROP INDEX `Friendship_receiverId_senderId_key` ON `Friendship`;

-- DropIndex
DROP INDEX `Friendship_senderId_receiverId_key` ON `Friendship`;

-- AlterTable
ALTER TABLE `Friendship` DROP COLUMN `receiverId`,
    DROP COLUMN `senderId`,
    ADD COLUMN `leftId` INTEGER NOT NULL,
    ADD COLUMN `rightId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Friendship_rightId_leftId_key` ON `Friendship`(`rightId`, `leftId`);

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_leftId_fkey` FOREIGN KEY (`leftId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_rightId_fkey` FOREIGN KEY (`rightId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
