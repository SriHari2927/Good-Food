/*
  Warnings:

  - You are about to drop the `todays_menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `todays_menu` DROP FOREIGN KEY `Todays_Menu_parent_plan_id_fkey`;

-- DropForeignKey
ALTER TABLE `todays_menu` DROP FOREIGN KEY `Todays_Menu_period_id_fkey`;

-- DropTable
DROP TABLE `todays_menu`;
