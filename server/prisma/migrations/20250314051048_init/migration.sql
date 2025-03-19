-- CreateTable
CREATE TABLE `Users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `display_picture` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Users_customer_id_key`(`customer_id`),
    UNIQUE INDEX `Users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `position` VARCHAR(191) NOT NULL DEFAULT 'USER',
    `user_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Address` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `phone_number` VARCHAR(191) NOT NULL,
    `alternate_number` VARCHAR(191) NULL,
    `landmark` VARCHAR(191) NOT NULL,
    `street` VARCHAR(191) NOT NULL,
    `city` VARCHAR(191) NOT NULL,
    `pincode` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `status` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `validity_days` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_plan_id` INTEGER NOT NULL,
    `plan_description` VARCHAR(191) NOT NULL,
    `tier_id` INTEGER NOT NULL,
    `duration_id` INTEGER NOT NULL,
    `quantity_id` INTEGER NOT NULL,
    `meal_type_id` INTEGER NOT NULL,
    `price_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tier` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('Budget', 'Elite') NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Quantity` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `quantity` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Duration` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actual_days` INTEGER NOT NULL,
    `addon_days` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Parent_Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plan_name` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription_Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_method` VARCHAR(191) NOT NULL,
    `subscription_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription_Pricing` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `pricing_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pricing_Details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `price` DOUBLE NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Food_Items` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `item_name` VARCHAR(191) NOT NULL,
    `item_type` ENUM('Veg', 'Non_Veg') NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price_id` INTEGER NOT NULL,
    `image_url` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription_Food_Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `food_item_id` INTEGER NOT NULL,
    `parent_plan_id` INTEGER NOT NULL,
    `tier_id` INTEGER NOT NULL,
    `meal_type_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Subscription_Order` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `order_item_id` INTEGER NOT NULL,
    `user_subscription_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Meal_type` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `meal_type` ENUM('Breakfast', 'Lunch', 'Dinner', 'Combo') NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Orders` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(191) NOT NULL,
    `subscription_id` INTEGER NOT NULL,
    `status` VARCHAR(191) NOT NULL DEFAULT 'PENDING',
    `meal_type_id` INTEGER NOT NULL,
    `total_meal` INTEGER NOT NULL,
    `charges` INTEGER NOT NULL,
    `ordered_address_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Criteria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parent_plan_id` INTEGER NOT NULL,
    `meal_type_id` INTEGER NOT NULL,
    `order_time` VARCHAR(191) NOT NULL,
    `cutoff_time` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `customer_id` VARCHAR(191) NOT NULL,
    `user_sub_id` INTEGER NOT NULL,
    `food_item_id` INTEGER NOT NULL,
    `quantity` INTEGER NOT NULL,
    `price_id` INTEGER NOT NULL,
    `order_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cart` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `subscription_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `food_item_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Food_Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_subscription_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `breakfast_qty` INTEGER NOT NULL,
    `lunch_qty` INTEGER NOT NULL,
    `dinner_qty` INTEGER NOT NULL,
    `ordered_date` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Daily_Menu` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` INTEGER NOT NULL,
    `subscription_food_menu_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Additional_Itemss` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `food_item_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Periodical` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `period` VARCHAR(191) NOT NULL,
    `comments` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item_Payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `payment_method` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `user_subscription_id` INTEGER NOT NULL,
    `payment_status` VARCHAR(191) NOT NULL,
    `payment_info` JSON NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Order_Response` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `status` VARCHAR(191) NOT NULL,
    `address_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `customer_id` INTEGER NOT NULL,
    `delivery_user_id` INTEGER NOT NULL,
    `user_subscription_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Delivery` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `oredr_id` INTEGER NOT NULL,
    `user_position_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `delivery_status` VARCHAR(191) NOT NULL,
    `delivery_response` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Cancellation` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cancellation_criteria_id` INTEGER NOT NULL,
    `subscription_id` INTEGER NOT NULL,
    `user_subscription_id` INTEGER NOT NULL,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `cancellation_date` DATETIME(3) NOT NULL,
    `cancellation_reason` VARCHAR(191) NOT NULL,
    `refund_status` VARCHAR(191) NOT NULL,
    `cancellation_status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notication_Details` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `entity_type` VARCHAR(191) NOT NULL,
    `entity_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `admin_id` INTEGER NOT NULL,
    `notifier_type` VARCHAR(191) NOT NULL,
    `notofication_description` VARCHAR(191) NOT NULL,
    `notification_details_id` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_Type` (
    `notification_type_id` INTEGER NOT NULL AUTO_INCREMENT,
    `type_name` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`notification_type_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Notification_Response` (
    `notification_response_id` INTEGER NOT NULL AUTO_INCREMENT,
    `notification_id` INTEGER NOT NULL,
    `notification_status` ENUM('Pending', 'Sent', 'Failed') NOT NULL,
    `notification_type_id` INTEGER NOT NULL,
    `send_at` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`notification_response_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Wallet` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `refunded_amount` VARCHAR(191) NOT NULL,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updateAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User_Rating` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `rating` INTEGER NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User_Position` ADD CONSTRAINT `User_Position_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `Users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Address` ADD CONSTRAINT `User_Address_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Subscription` ADD CONSTRAINT `User_Subscription_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Subscription` ADD CONSTRAINT `User_Subscription_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_parent_plan_id_fkey` FOREIGN KEY (`parent_plan_id`) REFERENCES `Parent_Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_tier_id_fkey` FOREIGN KEY (`tier_id`) REFERENCES `Tier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_duration_id_fkey` FOREIGN KEY (`duration_id`) REFERENCES `Quantity`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_quantity_id_fkey` FOREIGN KEY (`quantity_id`) REFERENCES `Duration`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription` ADD CONSTRAINT `Subscription_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Payment` ADD CONSTRAINT `Subscription_Payment_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Payment` ADD CONSTRAINT `Subscription_Payment_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Pricing` ADD CONSTRAINT `Subscription_Pricing_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Pricing` ADD CONSTRAINT `Subscription_Pricing_pricing_id_fkey` FOREIGN KEY (`pricing_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Food_Items` ADD CONSTRAINT `Food_Items_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_parent_plan_id_fkey` FOREIGN KEY (`parent_plan_id`) REFERENCES `Parent_Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Food_Menu` ADD CONSTRAINT `Subscription_Food_Menu_tier_id_fkey` FOREIGN KEY (`tier_id`) REFERENCES `Tier`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Order` ADD CONSTRAINT `Subscription_Order_user_subscription_id_fkey` FOREIGN KEY (`user_subscription_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Subscription_Order` ADD CONSTRAINT `Subscription_Order_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_ordered_address_id_fkey` FOREIGN KEY (`ordered_address_id`) REFERENCES `User_Address`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Orders` ADD CONSTRAINT `Orders_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Criteria` ADD CONSTRAINT `Order_Criteria_parent_plan_id_fkey` FOREIGN KEY (`parent_plan_id`) REFERENCES `Parent_Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Criteria` ADD CONSTRAINT `Order_Criteria_meal_type_id_fkey` FOREIGN KEY (`meal_type_id`) REFERENCES `Meal_type`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_order_id_fkey` FOREIGN KEY (`order_id`) REFERENCES `Orders`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_user_sub_id_fkey` FOREIGN KEY (`user_sub_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_price_id_fkey` FOREIGN KEY (`price_id`) REFERENCES `Pricing_Details`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Order_Item` ADD CONSTRAINT `Order_Item_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_subscription_id_fkey` FOREIGN KEY (`subscription_id`) REFERENCES `Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Cart` ADD CONSTRAINT `Cart_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Food_Report` ADD CONSTRAINT `User_Food_Report_user_subscription_id_fkey` FOREIGN KEY (`user_subscription_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daily_Menu` ADD CONSTRAINT `Daily_Menu_subscription_food_menu_id_fkey` FOREIGN KEY (`subscription_food_menu_id`) REFERENCES `Subscription_Food_Menu`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Daily_Menu` ADD CONSTRAINT `Daily_Menu_period_fkey` FOREIGN KEY (`period`) REFERENCES `Periodical`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Additional_Itemss` ADD CONSTRAINT `Additional_Itemss_food_item_id_fkey` FOREIGN KEY (`food_item_id`) REFERENCES `Food_Items`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Payment` ADD CONSTRAINT `Item_Payment_user_subscription_id_fkey` FOREIGN KEY (`user_subscription_id`) REFERENCES `User_Subscription`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item_Payment` ADD CONSTRAINT `Item_Payment_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification_Response` ADD CONSTRAINT `Notification_Response_notification_id_fkey` FOREIGN KEY (`notification_id`) REFERENCES `Notification`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Notification_Response` ADD CONSTRAINT `Notification_Response_notification_type_id_fkey` FOREIGN KEY (`notification_type_id`) REFERENCES `Notification_Type`(`notification_type_id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `User_Rating` ADD CONSTRAINT `User_Rating_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `Users`(`customer_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
