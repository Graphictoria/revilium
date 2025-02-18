-- AlterTable
ALTER TABLE `User` MODIFY `role` ENUM('BANNED', 'USER', 'BC', 'TBC', 'OBC', 'CATALOG_MANAGER', 'ADMINISTRATOR', 'DEVELOPER', 'SYSTEM') NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE `_Friendships` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_Friendships_AB_unique`(`A`, `B`),
    INDEX `_Friendships_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_Friendships` ADD CONSTRAINT `_Friendships_A_fkey` FOREIGN KEY (`A`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_Friendships` ADD CONSTRAINT `_Friendships_B_fkey` FOREIGN KEY (`B`) REFERENCES `User`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
