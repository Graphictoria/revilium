/*
  Warnings:

  - You are about to drop the column `user1Id` on the `Friendship` table. All the data in the column will be lost.
  - You are about to drop the column `user2Id` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[senderId,receiverId]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[receiverId,senderId]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `receiverId` to the `Friendship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_user1Id_fkey`;

-- DropForeignKey
ALTER TABLE `Friendship` DROP FOREIGN KEY `Friendship_user2Id_fkey`;

-- DropIndex
DROP INDEX `Friendship_user1Id_user2Id_key` ON `Friendship`;

-- DropIndex
DROP INDEX `Friendship_user2Id_user1Id_key` ON `Friendship`;

-- AlterTable
ALTER TABLE `Friendship` DROP COLUMN `user1Id`,
    DROP COLUMN `user2Id`,
    ADD COLUMN `receiverId` INTEGER NOT NULL,
    ADD COLUMN `senderId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Friendship_senderId_receiverId_key` ON `Friendship`(`senderId`, `receiverId`);

-- CreateIndex
CREATE UNIQUE INDEX `Friendship_receiverId_senderId_key` ON `Friendship`(`receiverId`, `senderId`);

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_senderId_fkey` FOREIGN KEY (`senderId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_receiverId_fkey` FOREIGN KEY (`receiverId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
