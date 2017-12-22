-- Schema donutstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `donutstore` DEFAULT CHARACTER SET utf8 ;
USE `donutstore` ;

-- -----------------------------------------------------
-- Table `donutstore`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_code` NVARCHAR(10) NOT NULL UNIQUE, 
  `item_name` NVARCHAR(255) NOT NULL,
  `item_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_single_value` DECIMAL(10,0) NOT NULL,
	`item_status` boolean not null,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `item_name_UNIQUE` (`item_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material` (
  `material_id` INT(11) NOT NULL AUTO_INCREMENT,
  `material_code` NVARCHAR(10) NOT NULL UNIQUE,
  `material_name` NVARCHAR(255) NOT NULL,
  `material_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_single_value` DECIMAL(10,0) NOT NULL,
  `material_remain` NVARCHAR(45) NOT NULL,
  `material_supply_name` NVARCHAR(255) NULL DEFAULT NULL,
  `material_supply_phone` NVARCHAR(18) NULL DEFAULT NULL,
  `material_status` boolean not null,
  PRIMARY KEY (`material_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`item_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item_material` (
  `item_id` INT(11) NOT NULL,
  `material_id` INT(11) NOT NULL,
  PRIMARY KEY (`item_id`, `material_id`),
    FOREIGN KEY (`material_id`)
    REFERENCES `donutstore`.`material` (`material_id`),
    FOREIGN KEY (`item_id`)
    REFERENCES `donutstore`.`item` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`orders` (
  `orders_id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_date_done` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_name_created` NVARCHAR(255) NOT NULL,
  `order_phone_number` NVARCHAR(18) NULL DEFAULT NULL,
  `order_mod_name` NVARCHAR(255) NOT NULL,
  `order_status` INT(11) NOT NULL,
  `order_is_shipping` TINYINT(4) NOT NULL,
  `order_address_shipping` NVARCHAR(255) NULL DEFAULT NULL,
  `order_shipping_price` DECIMAL(10,0) NULL DEFAULT NULL,
  `order_total_price` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`orders_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`quantity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`quantity` (
  `quantity_id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity_item_quantity` INT(11) NOT NULL,
  `quantity_item_id` INT(11) NOT NULL,
  `orders_id` INT(11) NOT NULL,
  PRIMARY KEY (`quantity_id`),
KEY `orders_id` (`orders_id`),
  CONSTRAINT `items_ibfk_1` FOREIGN KEY (`orders_id`) REFERENCES `orders` (`orders_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_code` NVARCHAR(10) NOT NULL UNIQUE,
  `role_name` NVARCHAR(255) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`store` (
 `store_id` INT(11) NOT NULL AUTO_INCREMENT,
 `store_code` NVARCHAR(10) NOT NULL UNIQUE,
 `store_name` NVARCHAR(255) NOT NULL,
 `store_phone_number` NVARCHAR(20) NOT NULL,
 `store_address` NVARCHAR(255) NOT NULL,
 `store_date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `store_date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `store_status` BIT NOT NULL,
 PRIMARY KEY (`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`staff` (
  `staff_id` INT(11) NOT NULL AUTO_INCREMENT,
  `staff_name` VARCHAR(255) NOT NULL,
  `staff_store` int NOT NULL,
  `staff_created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_phone_number` NVARCHAR(18) NOT NULL,
  `staff_address` NVARCHAR(255) NOT NULL,
  `staff_identity_card` NVARCHAR(12) NOT NULL,
  `staff_home_town` NVARCHAR(45) NOT NULL,
  `staff_salary` decimal(10,0) not null,
  `staff_status` BIT NOT NULL,
  PRIMARY KEY (`staff_id`),
  FOREIGN KEY (`staff_store`)
  REFERENCES `donutstore`.`store` (`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`timekeeping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`timekeeping` (
  `timekeeping_id` INT(11) NOT NULL AUTO_INCREMENT,
  `staff_id` INT(11) NOT NULL,
  `timekeeping_created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `timekeeping_in` TIMESTAMP NULL DEFAULT NULL,
  `timekeeping_out` TIMESTAMP NULL DEFAULT NULL,
  `timekeeping_status` tinyint NOT NULL,
  `id` BIGINT(20) NOT NULL,
  PRIMARY KEY (`timekeeping_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` NVARCHAR(255) NOT NULL,
  `user_password` VARCHAR(60) NOT NULL,
  `user_email` NVARCHAR(45) NULL DEFAULT NULL,
  `user_phone_number` VARCHAR(18) NULL DEFAULT NULL,
  `user_address` NVARCHAR(255) NULL DEFAULT NULL,
  `user_date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_last_order_time` TIMESTAMP NULL DEFAULT NULL,
  `user_status` boolean not null,
  `user_store` int(11),
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_name` ASC),
  FOREIGN KEY(`user_store`) references `donutstore`.`store`(`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user_role` (
  `user_id` INT(11) NOT NULL,
  `role_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`)
    REFERENCES `donutstore`.`user` (`user_id`),
    FOREIGN KEY (`role_id`)
    REFERENCES `donutstore`.`role` (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
