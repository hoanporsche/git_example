-- Schema donutstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `donutstore` DEFAULT CHARACTER SET utf8 ;
USE `donutstore` ;

-- -----------------------------------------------------
-- Table `donutstore`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` BIT NOT NULL,
  PRIMARY KEY (`id`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(255) NOT NULL,
  `picture` NVARCHAR(1000),
  `category_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `single_value` DECIMAL(10,0) NOT NULL,
  `enabled` boolean not null,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC),
  FOREIGN KEY (`category_id`)
  REFERENCES `donutstore`.`category`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`supply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`supply` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(255) NOT NULL,
  `phone` NVARCHAR(20) NOT NULL,
  `address` NVARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` BIT NOT NULL,
  PRIMARY KEY (`id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(255) NOT NULL,
  `picture` NVARCHAR(1000),
  `supply_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `single_value` DECIMAL(10,0) NOT NULL,
  `enabled` boolean not null,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`supply_id`)
  REFERENCES `donutstore`.`supply`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`order_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` NVARCHAR(255) NOT NULL,
    `description` NVARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`store` (
 `id` BIGINT NOT NULL AUTO_INCREMENT,
 `name` NVARCHAR(255) NOT NULL,
 `picture` NVARCHAR(1000),
 `phone` NVARCHAR(20) NOT NULL,
 `address` NVARCHAR(255) NOT NULL,
 `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `enabled` BIT NOT NULL,
 PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`orders` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_done` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name_created` NVARCHAR(255) NOT NULL,
  `phone` NVARCHAR(18) NULL DEFAULT NULL,
  `store_id` BIGINT NOT NULL,
  `status_id` BIGINT NOT NULL,
  `is_shipping` BIT NOT NULL,
  `address_shipping` NVARCHAR(255) NULL DEFAULT NULL,
  `shipping_price` DECIMAL(10,0) NULL DEFAULT NULL,
  `total_price` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`status_id`) REFERENCES `donutstore`.`order_status`(`id`),
  FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(255) NOT NULL,
  `enabled` boolean not null,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`working_calender`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`working_calender` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` NVARCHAR(255) NOT NULL,
    `description` NVARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`staff` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` NVARCHAR(1000) NOT NULL,
  `picture` NVARCHAR(255),
  `store_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` NVARCHAR(20) NOT NULL,
  `address` NVARCHAR(255) NOT NULL,
  `identity_card` NVARCHAR(12) NOT NULL,
  `home_town` NVARCHAR(45) NOT NULL,
  `salary` decimal(10,0) not null,
  `working_calender_id` BIGINT NOT NULL,
  `enabled` BIT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`store_id`)
  REFERENCES `donutstore`.`store` (`id`),
  FOREIGN KEY (`working_calender_id`) REFERENCES `donutstore`.`working_calender` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`timekeeping_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`timekeeping_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` NVARCHAR(255) NOT NULL,
    `description` NVARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

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
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `username` NVARCHAR(255) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` NVARCHAR(255) NOT NULL UNIQUE,
  `phone` VARCHAR(20) NULL DEFAULT NULL,
  `address` NVARCHAR(255) NULL DEFAULT NULL,
  `date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `last_order_time` TIMESTAMP NULL DEFAULT NULL,
  `enabled` BIT not null,
  `credentialsexpired` BIT not null,
  `expired` BIT not null,
  `locked` BIT not null,
  `store_id` BIGINT,
  PRIMARY KEY (`id`),
  FOREIGN KEY(`store_id`) references `donutstore`.`store`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


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
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`item_store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item_store` (
  `item_id` BIGINT NOT NULL,
  `store_id` BIGINT NOT NULL,
  PRIMARY KEY(`item_id`,`store_id`),
	FOREIGN KEY (`item_id`)
    REFERENCES `donutstore`.`item`(`id`),
    FOREIGN KEY (`store_id`)
    REFERENCES `donutstore`.`store`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`material_daily_report`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material_daily_report` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `material_id` BIGINT NOT NULL,
    `material_remain` INT NOT NULL,
    `material_import` INT NOT NULL,
    `description` NVARCHAR(1000) NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`id`),
    FOREIGN KEY (`material_id`) REFERENCES `donutstore`.`material`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

