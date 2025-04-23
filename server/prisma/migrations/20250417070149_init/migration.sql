-- CreateTable
CREATE TABLE `Todays_Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Todays_Menu` ADD CONSTRAINT `Todays_Menu_period_id_fkey` FOREIGN KEY (`period_id`) REFERENCES `Periodical`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
