/*
  Warnings:

  - You are about to drop the column `isActive` on the `periodical` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `daily_menu` ADD COLUMN `isDaily` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `periodical` DROP COLUMN `isActive`;
