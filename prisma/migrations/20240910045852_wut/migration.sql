-- CreateTable
CREATE TABLE `EquippedAsset` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `avatarId` INTEGER NOT NULL,
    `assetId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Avatar` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `headColor` INTEGER NOT NULL DEFAULT 1,
    `torsoColor` INTEGER NOT NULL DEFAULT 1,
    `leftArmColor` INTEGER NOT NULL DEFAULT 1,
    `rightArmColor` INTEGER NOT NULL DEFAULT 1,
    `leftLegColor` INTEGER NOT NULL DEFAULT 1,
    `rightLegColor` INTEGER NOT NULL DEFAULT 1,

    UNIQUE INDEX `Avatar_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EquippedAsset` ADD CONSTRAINT `EquippedAsset_avatarId_fkey` FOREIGN KEY (`avatarId`) REFERENCES `Avatar`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EquippedAsset` ADD CONSTRAINT `EquippedAsset_assetId_fkey` FOREIGN KEY (`assetId`) REFERENCES `Asset`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Avatar` ADD CONSTRAINT `Avatar_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
