/*
  Warnings:

  - You are about to drop the column `parent_plan_id` on the `subscription_food_menu` table. All the data in the column will be lost.
  - You are about to drop the column `tier_id` on the `subscription_food_menu` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `subscription_food_menu` DROP FOREIGN KEY `Subscription_Food_Menu_parent_plan_id_fkey`;

-- DropForeignKey
ALTER TABLE `subscription_food_menu` DROP FOREIGN KEY `Subscription_Food_Menu_tier_id_fkey`;

-- DropIndex
DROP INDEX `Subscription_Food_Menu_parent_plan_id_fkey` ON `subscription_food_menu`;

-- DropIndex
DROP INDEX `Subscription_Food_Menu_tier_id_fkey` ON `subscription_food_menu`;

-- AlterTable
ALTER TABLE `subscription_food_menu` DROP COLUMN `parent_plan_id`,
    DROP COLUMN `tier_id`;
