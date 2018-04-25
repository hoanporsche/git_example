-- Schema donutstore2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `donutstore2` DEFAULT CHARACTER SET utf8 ;
USE `donutstore2` ;

CREATE TABLE IF NOT EXISTS `donutstore2`.`category` (
  `category_id` INT(11) NOT NULL AUTO_INCREMENT,
  `category_code` NVARCHAR(10) NOT NULL,
  `category_name` NVARCHAR(255) NOT NULL,
  `category_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `category_status` BIT NOT NULL,
  PRIMARY KEY (`category_id`)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore2`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`item` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_code` NVARCHAR(10) NOT NULL UNIQUE, 
  `item_name` NVARCHAR(255) NOT NULL,
  `item_picture` NVARCHAR(255),
  `category_id` INT(11) NOT NULL,
  `item_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_single_value` DECIMAL(10,0) NOT NULL,
	`item_status` boolean not null,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `item_name_UNIQUE` (`item_name` ASC),
  FOREIGN KEY (`category_id`)
  REFERENCES `donutstore2`.`category`(`category_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `donutstore2`.`supply` (
  `supply_id` INT(11) NOT NULL AUTO_INCREMENT,
  `supply_code` NVARCHAR(10) NOT NULL,
  `supply_name` NVARCHAR(255) NOT NULL,
  `supply_phone` NVARCHAR(20) NOT NULL,
  `supply_address` NVARCHAR(255) NOT NULL,
  `supply_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supply_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `supply_status` BIT NOT NULL,
  PRIMARY KEY (`supply_id`)
)ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore2`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`material` (
  `material_id` INT(11) NOT NULL AUTO_INCREMENT,
  `material_code` NVARCHAR(10) NOT NULL UNIQUE,
  `material_name` NVARCHAR(255) NOT NULL,
  `material_picture` NVARCHAR(255),
  `supply_id` INT(11) NOT NULL,
  `material_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_single_value` DECIMAL(10,0) NOT NULL,
  `material_status` boolean not null,
  PRIMARY KEY (`material_id`),
  FOREIGN KEY(`supply_id`)
  REFERENCES `donutstore2`.`supply`(`supply_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore2`.`item_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`item_material` (
  `item_id` INT(11) NOT NULL,
  `material_id` INT(11) NOT NULL,
  PRIMARY KEY (`item_id`, `material_id`),
    FOREIGN KEY (`material_id`)
    REFERENCES `donutstore2`.`material` (`material_id`),
    FOREIGN KEY (`item_id`)
    REFERENCES `donutstore2`.`item` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore2`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`orders` (
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
-- Table `donutstore2`.`quantity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`quantity` (
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
-- Table `donutstore2`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_code` NVARCHAR(10) NOT NULL UNIQUE,
  `role_name` NVARCHAR(255) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore2`.`store`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`store` (
 `store_id` INT(11) NOT NULL AUTO_INCREMENT,
 `store_code` NVARCHAR(10) NOT NULL UNIQUE,
 `store_name` NVARCHAR(255) NOT NULL,
 `store_picture` NVARCHAR(255),
 `store_phone_number` NVARCHAR(20) NOT NULL,
 `store_address` NVARCHAR(255) NOT NULL,
 `store_date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `store_date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `store_status` BIT NOT NULL,
 PRIMARY KEY (`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `donutstore2`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`staff` (
  `staff_id` INT(11) NOT NULL AUTO_INCREMENT,
  `staff_code` NVARCHAR(10) NOT NULL UNIQUE,
  `staff_name` NVARCHAR(255) NOT NULL,
  `staff_picture` NVARCHAR(255),
  `staff_store` int NOT NULL,
  `staff_created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_phone_number` NVARCHAR(20) NOT NULL,
  `staff_address` NVARCHAR(255) NOT NULL,
  `staff_identity_card` NVARCHAR(12) NOT NULL,
  `staff_home_town` NVARCHAR(45) NOT NULL,
  `staff_salary` decimal(10,0) not null,
  `staff_status` BIT NOT NULL,
  PRIMARY KEY (`staff_id`),
  FOREIGN KEY (`staff_store`)
  REFERENCES `donutstore2`.`store` (`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore2`.`timekeeping`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`timekeeping` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT,
  `staff_id` INT(11) NOT NULL,
  `timekeeping_created_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `timekeeping_in` TIMESTAMP NULL DEFAULT NULL,
  `timekeeping_out` TIMESTAMP NULL DEFAULT NULL,
  `timekeeping_status` BIT NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`staff_id`) REFERENCES `donutstore2`.`staff`(`staff_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore2`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`user` (
  `user_id` INT(11) NOT NULL AUTO_INCREMENT,
  `user_name` NVARCHAR(255) NOT NULL,
  `user_password` VARCHAR(60) NOT NULL,
  `user_email` NVARCHAR(255) NOT NULL UNIQUE,
  `user_phone_number` VARCHAR(20) NULL DEFAULT NULL,
  `user_address` NVARCHAR(255) NULL DEFAULT NULL,
  `user_date_created` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_date_updated` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_last_order_time` TIMESTAMP NULL DEFAULT NULL,
  `user_status` boolean not null,
  `user_store` int(11),
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_email_UNIQUE` (`user_name` ASC),
  FOREIGN KEY(`user_store`) references `donutstore2`.`store`(`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore2`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore2`.`user_role` (
  `user_id` INT(11) NOT NULL,
  `role_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
    FOREIGN KEY (`user_id`)
    REFERENCES `donutstore2`.`user` (`user_id`),
    FOREIGN KEY (`role_id`)
    REFERENCES `donutstore2`.`role` (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

CREATE TABLE IF NOT EXISTS `donutstore2`.`item_store` (
  `item_id` INT(11) NOT NULL,
  `store_id` INT(11) NOT NULL,
  PRIMARY KEY(`item_id`,`store_id`),
	FOREIGN KEY (`item_id`)
    REFERENCES `donutstore2`.`item`(`item_id`),
    FOREIGN KEY (`store_id`)
    REFERENCES `donutstore2`.`store`(`store_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


