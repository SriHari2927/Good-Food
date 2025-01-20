-- DropForeignKey
ALTER TABLE `user_subscription` DROP FOREIGN KEY `User_Subscription_validity_days_fkey`;

-- DropIndex
DROP INDEX `User_Subscription_validity_days_fkey` ON `user_subscription`;
