/*
  Warnings:

  - Added the required column `parent_plan_id` to the `Todays_Menu` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `todays_menu` ADD COLUMN `parent_plan_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Todays_Menu` ADD CONSTRAINT `Todays_Menu_parent_plan_id_fkey` FOREIGN KEY (`parent_plan_id`) REFERENCES `Parent_Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
