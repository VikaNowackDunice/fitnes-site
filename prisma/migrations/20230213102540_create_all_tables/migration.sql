-- CreateTable
CREATE TABLE `sports` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `sports_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `timetables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `week_day` INTEGER NULL,
    `time_start` TIME(6) NULL,
    `time_end` TIME(6) NULL,
    `sportId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user_timetables` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `timetableId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `first_name` VARCHAR(255) NOT NULL,
    `last_name` VARCHAR(255) NOT NULL,
    `login` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `phone` VARCHAR(255) NULL,
    `age` INTEGER NULL,

    UNIQUE INDEX `users_login_key`(`login`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `services` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NULL,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `services_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NULL,
    `name` VARCHAR(255) NULL,
    `quantity` INTEGER NULL,

    UNIQUE INDEX `product_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supply` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cost` INTEGER NULL,
    `date_Time` DATETIME NULL,

    UNIQUE INDEX `supply_date_Time_key`(`date_Time`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `suppliers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `address` VARCHAR(50) NULL,
    `number_phone` VARCHAR(20) NULL,
    `INN` VARCHAR(20) NULL,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `suppliers_number_phone_key`(`number_phone`),
    UNIQUE INDEX `suppliers_INN_key`(`INN`),
    UNIQUE INDEX `suppliers_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `position` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `position_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `responsibilities` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `responsibilities_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `hall` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `hall_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `employee` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Last_name` VARCHAR(25) NULL,
    `First_name` VARCHAR(25) NULL,
    `INN` VARCHAR(20) NULL,
    `number_phone` VARCHAR(20) NULL,
    `address` VARCHAR(50) NULL,
    `Date_of_birth` DATE NULL,

    UNIQUE INDEX `employee_Last_name_key`(`Last_name`),
    UNIQUE INDEX `employee_First_name_key`(`First_name`),
    UNIQUE INDEX `employee_INN_key`(`INN`),
    UNIQUE INDEX `employee_number_phone_key`(`number_phone`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sum` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `equipment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NULL,

    UNIQUE INDEX `equipment_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `workout_plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name_sport` VARCHAR(255) NULL,
    `Date_Time` DATETIME NULL,

    UNIQUE INDEX `workout_plan_name_sport_key`(`name_sport`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `subscription` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date_start` DATE NULL,
    `Date_end` DATE NULL,
    `validity` VARCHAR(30) NULL,

    UNIQUE INDEX `subscription_Date_start_key`(`Date_start`),
    UNIQUE INDEX `subscription_Date_end_key`(`Date_end`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `visit_accounting` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `number_subscription` INTEGER NULL,
    `number_visit` INTEGER NULL,
    `number_record` INTEGER NULL,

    UNIQUE INDEX `visit_accounting_number_subscription_key`(`number_subscription`),
    UNIQUE INDEX `visit_accounting_number_visit_key`(`number_visit`),
    UNIQUE INDEX `visit_accounting_number_record_key`(`number_record`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `timetables` ADD CONSTRAINT `timetables_sportId_fkey` FOREIGN KEY (`sportId`) REFERENCES `sports`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_timetables` ADD CONSTRAINT `user_timetables_timetableId_fkey` FOREIGN KEY (`timetableId`) REFERENCES `timetables`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `user_timetables` ADD CONSTRAINT `user_timetables_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
