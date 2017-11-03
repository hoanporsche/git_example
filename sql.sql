-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema donutstore
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema donutstore
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `donutstore` DEFAULT CHARACTER SET utf8 ;
USE `donutstore` ;

-- -----------------------------------------------------
-- Table `donutstore`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item` (
  `item_id` INT(11) NOT NULL AUTO_INCREMENT,
  `item_name` VARCHAR(255) NOT NULL,
  `item_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `item_single_value` DECIMAL(10,0) NOT NULL,
  `iteam_date_updated` NVARCHAR(255) NOT NULL,
  PRIMARY KEY (`item_id`),
  UNIQUE INDEX `item_name_UNIQUE` (`item_name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`material` (
  `material_id` INT(11) NOT NULL AUTO_INCREMENT,
  `material_name` NVARCHAR(255) NOT NULL,
  `material_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `material_sangle_value` DECIMAL(10,0) NOT NULL,
  `material_remain` VARCHAR(45) NOT NULL,
  `material_supply_name` NVARCHAR(255) NULL DEFAULT NULL,
  `material_supply_phone` NVARCHAR(18) NULL DEFAULT NULL,
  `material_single_value` DOUBLE NOT NULL,
  PRIMARY KEY (`material_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`item_material`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item_material` (
  `item_id` INT(11) NOT NULL,
  `material_id` INT(11) NOT NULL,
  `items_item_id` INT(11) NOT NULL,
  `materials_material_id` INT(11) NOT NULL,
  PRIMARY KEY (`item_id`, `material_id`),
  INDEX `FKb0jb9yfq06acdpqq28uxadolk` (`materials_material_id` ASC),
  INDEX `FKjfmmh1hkkqm78qpree4ucnhhl` (`items_item_id` ASC),
  INDEX `FK1qp33uu8qd7q2trf483n7e081` (`material_id` ASC),
  CONSTRAINT `FK1qp33uu8qd7q2trf483n7e081`
    FOREIGN KEY (`material_id`)
    REFERENCES `donutstore`.`material` (`material_id`),
  CONSTRAINT `FKb0jb9yfq06acdpqq28uxadolk`
    FOREIGN KEY (`materials_material_id`)
    REFERENCES `donutstore`.`material` (`material_id`),
  CONSTRAINT `FKfr2jh7l7x0b7pny7jrpbyc9xv`
    FOREIGN KEY (`item_id`)
    REFERENCES `donutstore`.`item` (`item_id`),
  CONSTRAINT `FKjfmmh1hkkqm78qpree4ucnhhl`
    FOREIGN KEY (`items_item_id`)
    REFERENCES `donutstore`.`item` (`item_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`order` (
  `order_id` INT(11) NOT NULL AUTO_INCREMENT,
  `order_date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_date_done` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `order_name_created` NVARCHAR(255) NOT NULL,
  `order_phone_number` NVARCHAR(18) NULL DEFAULT NULL,
  `order_mod_name` NVARCHAR(255) NOT NULL,
  `order_status` INT(11) NOT NULL,
  `order_is_shipping` TINYINT(4) NOT NULL,
  `order_address_shipping` VARCHAR(255) NULL DEFAULT NULL,
  `order_shipping_price` DECIMAL(10,0) NULL DEFAULT NULL,
  `order_total_price` DECIMAL(10,0) NOT NULL,
  PRIMARY KEY (`order_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`quantity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`quantity` (
  `quantity_id` INT(11) NOT NULL AUTO_INCREMENT,
  `quantity_order_id` INT(11) NOT NULL,
  `quantity_item_quantity` INT(11) NOT NULL,
  `quantity_item_id` INT(11) NOT NULL,
  `order_id` INT(11) NOT NULL,
  PRIMARY KEY (`quantity_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`role` (
  `role_id` INT(11) NOT NULL AUTO_INCREMENT,
  `role_name` NVARCHAR(255) NOT NULL,
  PRIMARY KEY (`role_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`staff`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`staff` (
  `staff_id` INT(11) NOT NULL AUTO_INCREMENT,
  `staff_name` VARCHAR(255) NOT NULL,
  `staff_created_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_updated_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `staff_phone_number` NVARCHAR(18) NOT NULL,
  `staff_address` NVARCHAR(255) NOT NULL,
  `staff_identity_card` NVARCHAR(12) NOT NULL,
  `staff_home_town` NVARCHAR(45) NOT NULL,
  `staff_status` INT(11) NOT NULL,
  PRIMARY KEY (`staff_id`))
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
  `timekeeping_status` INT(11) NOT NULL,
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
  `user_created_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_updated_time` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `user_last_order_time` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE INDEX `user_name_UNIQUE` (`user_name` ASC))
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `donutstore`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`user_role` (
  `user_id` INT(11) NOT NULL,
  `role_id` INT(11) NOT NULL,
  PRIMARY KEY (`user_id`, `role_id`),
  INDEX `FKa68196081fvovjhkek5m97n3y` (`role_id` ASC),
  CONSTRAINT `FK859n2jvi8ivhui0rl0esws6o`
    FOREIGN KEY (`user_id`)
    REFERENCES `donutstore`.`user` (`user_id`),
  CONSTRAINT `FKa68196081fvovjhkek5m97n3y`
    FOREIGN KEY (`role_id`)
    REFERENCES `donutstore`.`role` (`role_id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
