/*
  Warnings:

  - A unique constraint covering the columns `[discord]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[twofactor]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `discord` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `twofactor` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `discord` VARCHAR(191) NOT NULL,
    ADD COLUMN `twofactor` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_discord_key` ON `User`(`discord`);

-- CreateIndex
CREATE UNIQUE INDEX `User_twofactor_key` ON `User`(`twofactor`);
