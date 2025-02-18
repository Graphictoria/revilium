/*
  Warnings:

  - The values [PLACE] on the enum `Asset_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `Asset` MODIFY `type` ENUM('IMAGE', 'HAT', 'SHIRT', 'PANTS', 'TSHIRT', 'FACE', 'HEAD', 'GEAR', 'MODEL', 'DECAL', 'AUDIO', 'MESH', 'PACKAGE') NOT NULL;

-- CreateTable
CREATE TABLE `Universe` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `desciption` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `visibility` ENUM('PUBLIC', 'FRIENDS_ONLY', 'PRIVATE') NOT NULL,
    `userId` INTEGER NULL,
    `groupId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Place` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `serverSize` INTEGER NOT NULL,
    `universeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Universe` ADD CONSTRAINT `Universe_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Universe` ADD CONSTRAINT `Universe_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `Group`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Place` ADD CONSTRAINT `Place_universeId_fkey` FOREIGN KEY (`universeId`) REFERENCES `Universe`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
