-- Schema donutstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `donutstore` CHARACTER SET utf8 COLLATE utf8_unicode_ci ;
USE `donutstore` ;

-- -----------------------------------------------------
-- Table `donutstore`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `picture` VARCHAR(1000),
  `category_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `single_value` DECIMAL(10,0) NOT NULL,
  `enabled` boolean not null,
  `description` VARCHAR(1000),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  FOREIGN KEY (`category_id`)
  REFERENCES `donutstore`.`category`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`supply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`supply` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `picture` VARCHAR(1000),
  `supply_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `single_value` DECIMAL(10,0) NOT NULL,
  `enabled` boolean not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`supply_id`)
  REFERENCES `donutstore`.`supply`(`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`item_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item_material` (
  `item_id` BIGINT NOT NULL,
  `material_id` BIGINT NOT NULL,
  PRIMARY KEY (`item_id`, `material_id`),
    FOREIGN KEY (`material_id`)
    REFERENCES `donutstore`.`material` (`id`),
    FOREIGN KEY (`item_id`)
    REFERENCES `donutstore`.`item` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`order_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`store` (
 `id` BIGINT NOT NULL AUTO_INCREMENT,
 `name` VARCHAR(255) NOT NULL,
 `picture` VARCHAR(1000),
 `phone` VARCHAR(20) NOT NULL,
 `address` VARCHAR(255) NOT NULL,
 `lat` VARCHAR(20),
 `lng` VARCHAR(20),
 `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `enabled` BOOLEAN NOT NULL,
 PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`orders` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name_created` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(18) NULL DEFAULT NULL,
  `store_id` BIGINT NOT NULL,
  `status_id` BIGINT NOT NULL,
  `is_shipping` BOOLEAN NOT NULL,
  `address_shipping` VARCHAR(255) NULL DEFAULT NULL,
  `shipping_price` DECIMAL(10,0) NULL DEFAULT NULL,
  `total_price` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`status_id`) REFERENCES `donutstore`.`order_status`(`id`),
  FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`quantity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`quantity` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `order_id` BIGINT NOT NULL,
  `item_id` BIGINT NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`order_id`) REFERENCES `donutstore`.`orders`(`id`),
  FOREIGN KEY (`item_id`) REFERENCES `donutstore`.`item`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `enabled` boolean not null,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`working_calender`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`working_calender` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`staff` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `picture` VARCHAR(255),
  `store_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` VARCHAR(20) NOT NULL,
  `address` VARCHAR(255) NOT NULL,
  `identity_card` VARCHAR(12) NOT NULL UNIQUE,
  `home_town` VARCHAR(45) NOT NULL,
  `salary` decimal(10,0) not null,
  `working_calender_id` BIGINT NOT NULL,
  `enabled` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`)
  REFERENCES `donutstore`.`store` (`id`),
  FOREIGN KEY (`working_calender_id`) REFERENCES `donutstore`.`working_calender` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`timekeeping_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`timekeeping_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`timekeeping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`timekeeping` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `staff_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `time_in` TIMESTAMP NULL DEFAULT NULL,
  `time_out` TIMESTAMP NULL DEFAULT NULL,
  `status_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`staff_id`) REFERENCES `donutstore`.`staff`(`id`),
  FOREIGN KEY (`status_id`) REFERENCES `donutstore`.`timekeeping_status`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(60) NOT NULL,
  `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` BOOLEAN not null,
  `credentialsexpired` BOOLEAN not null,
  `expired` BOOLEAN not null,
  `locked` BOOLEAN not null,
  `store_id` BIGINT,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`store_id`) references `donutstore`.`store`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user_role` (
  `user_id` BIGINT NOT NULL,
  `role_id` BIGINT NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`)
    REFERENCES `donutstore`.`user` (`id`),
    FOREIGN KEY (`role_id`)
    REFERENCES `donutstore`.`role` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`material_daily_report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material_daily_report` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `date_created` TIMESTAMP NOT NULL,
    `material_id` BIGINT NOT NULL,
    `material_remain` INT NOT NULL,
    `material_import` INT NOT NULL,
    `description` VARCHAR(1000) ,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`id`),
    FOREIGN KEY (`material_id`) REFERENCES `donutstore`.`material`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;
