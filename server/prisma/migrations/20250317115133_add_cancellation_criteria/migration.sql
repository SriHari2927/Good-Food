/*
  Warnings:

  - You are about to drop the `cancellationcriteria` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `cancellationcriteria`;

-- CreateTable
CREATE TABLE `Cancellation_Criteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `planDuration` VARCHAR(191) NOT NULL,
    `priorMeal` VARCHAR(191) NOT NULL,
    `priorTime` VARCHAR(191) NOT NULL,
    `refundPercentage` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
