/*
  Warnings:

  - You are about to drop the column `twofactor` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[otpSecret]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX `User_twofactor_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `twofactor`,
    ADD COLUMN `backupCodes` JSON NULL,
    ADD COLUMN `otpSecret` VARCHAR(191) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_otpSecret_key` ON `User`(`otpSecret`);
