-- CreateTable
CREATE TABLE `_SubscriptionToUser_Subscription` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_SubscriptionToUser_Subscription_AB_unique`(`A`, `B`),
    INDEX `_SubscriptionToUser_Subscription_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_SubscriptionToUser_Subscription` ADD CONSTRAINT `_SubscriptionToUser_Subscription_A_fkey` FOREIGN KEY (`A`) REFERENCES `Subscription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_SubscriptionToUser_Subscription` ADD CONSTRAINT `_SubscriptionToUser_Subscription_B_fkey` FOREIGN KEY (`B`) REFERENCES `User_Subscription`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
