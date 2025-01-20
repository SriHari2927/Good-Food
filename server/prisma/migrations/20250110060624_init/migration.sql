/*
  Warnings:

  - You are about to drop the `_subscriptiontouser_subscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_subscriptiontouser_subscription` DROP FOREIGN KEY `_SubscriptionToUser_Subscription_A_fkey`;

-- DropForeignKey
ALTER TABLE `_subscriptiontouser_subscription` DROP FOREIGN KEY `_SubscriptionToUser_Subscription_B_fkey`;

-- DropTable
DROP TABLE `_subscriptiontouser_subscription`;

-- AddForeignKey
ALTER TABLE `User_Subscription` ADD CONSTRAINT `User_Subscription_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
