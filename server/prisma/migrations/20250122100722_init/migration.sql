-- AddForeignKey
ALTER TABLE `Food_Items` ADD CONSTRAINT `Food_Items_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
