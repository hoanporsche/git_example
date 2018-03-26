-- Schema donutstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `donutstore` DEFAULT CHARACTER SET utf8 ;
USE `donutstore` ;

-- -----------------------------------------------------
-- Table `donutstore`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`category` (
  `category_id` BIGINT NOT NULL AUTO_INCREMENT,
  `category_name` NVARCHAR(255) NOT NULL,
  `category_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_enabled` BIT NOT NULL,
  PRIMARY KEY (`category_id`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item` (
  `item_id` BIGINT NOT NULL AUTO_INCREMENT,
  `item_name` NVARCHAR(255) NOT NULL,
  `item_picture` NVARCHAR(1000),
  `category_id` BIGINT NOT NULL,
  `item_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_single_value` DECIMAL(10,0) NOT NULL,
  `item_enabled` boolean not null,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `item_name_UNIQUE` (`item_name` ASC),
  FOREIGN KEY (`category_id`)
  REFERENCES `donutstore`.`category`(`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`supply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`supply` (
  `supply_id` BIGINT NOT NULL AUTO_INCREMENT,
  `supply_name` NVARCHAR(255) NOT NULL,
  `supply_phone` NVARCHAR(20) NOT NULL,
  `supply_address` NVARCHAR(255) NOT NULL,
  `supply_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supply_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supply_enabled` BIT NOT NULL,
  PRIMARY KEY (`supply_id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material` (
  `material_id` BIGINT NOT NULL AUTO_INCREMENT,
  `material_name` NVARCHAR(255) NOT NULL,
  `material_picture` NVARCHAR(1000),
  `supply_id` BIGINT NOT NULL,
  `material_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_single_value` DECIMAL(10,0) NOT NULL,
  `material_enabled` boolean not null,
  PRIMARY KEY (`material_id`),
  FOREIGN KEY(`supply_id`)
  REFERENCES `donutstore`.`supply`(`supply_id`))
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
    REFERENCES `donutstore`.`material` (`material_id`),
    FOREIGN KEY (`item_id`)
    REFERENCES `donutstore`.`item` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`order_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` NVARCHAR(255) NOT NULL,
    `description` NVARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`store` (
 `store_id` BIGINT NOT NULL AUTO_INCREMENT,
 `store_name` NVARCHAR(255) NOT NULL,
 `store_picture` NVARCHAR(1000),
 `store_phone_number` NVARCHAR(20) NOT NULL,
 `store_address` NVARCHAR(255) NOT NULL,
 `store_date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `store_date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `store_enabled` BIT NOT NULL,
 PRIMARY KEY (`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`orders` (
  `orders_id` BIGINT NOT NULL AUTO_INCREMENT,
  `order_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_date_done` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_name_created` NVARCHAR(255) NOT NULL,
  `order_phone_number` NVARCHAR(18) NULL DEFAULT NULL,
  `store_id` BIGINT NOT NULL,
  `order_status_id` BIGINT NOT NULL,
  `order_is_shipping` BIT NOT NULL,
  `order_address_shipping` NVARCHAR(255) NULL DEFAULT NULL,
  `order_shipping_price` DECIMAL(10,0) NULL DEFAULT NULL,
  `order_total_price` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`orders_id`),
  FOREIGN KEY (`order_status_id`) REFERENCES `donutstore`.`order_status`(`id`),
  FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`quantity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`quantity` (
  `quantity_id` BIGINT NOT NULL AUTO_INCREMENT,
  `orders_id` BIGINT NOT NULL,
  `item_id` BIGINT NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`quantity_id`),
  FOREIGN KEY (`orders_id`) REFERENCES `donutstore`.`orders`(`orders_id`),
  FOREIGN KEY (`item_id`) REFERENCES `donutstore`.`item`(`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`role` (
  `role_id` BIGINT NOT NULL AUTO_INCREMENT,
  `role_name` NVARCHAR(255) NOT NULL,
  `role_enabled` boolean not null,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`working_calender`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`working_calender` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` NVARCHAR(255) NOT NULL,
    `description` NVARCHAR(255) NOT NULL,
    `enabled` boolean not null,
    PRIMARY KEY(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`staff` (
  `staff_id` BIGINT NOT NULL AUTO_INCREMENT,
  `staff_name` NVARCHAR(1000) NOT NULL,
  `staff_picture` NVARCHAR(255),
  `staff_store` BIGINT NOT NULL,
  `staff_created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_phone_number` NVARCHAR(20) NOT NULL,
  `staff_address` NVARCHAR(255) NOT NULL,
  `staff_identity_card` NVARCHAR(12) NOT NULL,
  `staff_home_town` NVARCHAR(45) NOT NULL,
  `staff_salary` decimal(10,0) not null,
  `working_calender_id` BIGINT NOT NULL,
  `staff_enabled` BIT NOT NULL,
  PRIMARY KEY (`staff_id`),
  FOREIGN KEY (`staff_store`)
  REFERENCES `donutstore`.`store` (`store_id`),
  FOREIGN KEY (`working_calender_id`) REFERENCES `donutstore`.`working_calender` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`timekeeping_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`timekeeping_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` NVARCHAR(255) NOT NULL,
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
  `timekeeping_created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `timekeeping_in` TIMESTAMP NULL DEFAULT NULL,
  `timekeeping_out` TIMESTAMP NULL DEFAULT NULL,
  `timekeeping_status_id` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`staff_id`) REFERENCES `donutstore`.`staff`(`staff_id`),
  FOREIGN KEY (`timekeeping_status_id`) REFERENCES `donutstore`.`timekeeping_status`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user` (
  `user_id` BIGINT NOT NULL AUTO_INCREMENT,
  `user_name` NVARCHAR(255) NOT NULL,
  `user_password` VARCHAR(60) NOT NULL,
  `user_email` NVARCHAR(255) NOT NULL UNIQUE,
  `user_phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `user_address` NVARCHAR(255) NULL DEFAULT NULL,
  `user_date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_last_order_time` TIMESTAMP NULL DEFAULT NULL,
  `enabled` BIT not null,
  `credentialsexpired` BIT not null,
  `expired` BIT not null,
  `locked` BIT not null,
  `user_store` BIGINT,
  PRIMARY KEY (`user_id`),
  FOREIGN KEY(`user_store`) references `donutstore`.`store`(`store_id`))
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
    REFERENCES `donutstore`.`user` (`user_id`),
    FOREIGN KEY (`role_id`)
    REFERENCES `donutstore`.`role` (`role_id`))
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
    REFERENCES `donutstore`.`item`(`item_id`),
    FOREIGN KEY (`store_id`)
    REFERENCES `donutstore`.`store`(`store_id`))
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
    FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`store_id`),
    FOREIGN KEY (`material_id`) REFERENCES `donutstore`.`material`(`material_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

