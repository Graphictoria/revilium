/*
  Warnings:

  - You are about to drop the column `badges` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Session` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Session` DROP FOREIGN KEY `Session_userId_fkey`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `badges`,
    ADD COLUMN `siteBadges` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `Session`;
