/*
  Warnings:

  - Added the required column `repeat_type` to the `Daily_Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `daily_menu` ADD COLUMN `repeat_type` ENUM('Daily', 'Weekly', 'Monthly') NOT NULL;
