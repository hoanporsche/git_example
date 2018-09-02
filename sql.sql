-- Schema donutstore
-- -----------------------------------------------------
drop database if exists `donutstore`;

CREATE SCHEMA IF NOT EXISTS `donutstore`;
USE `donutstore` ;

create table oauth_client_details (
  client_id VARCHAR(256) PRIMARY KEY,
  resource_ids VARCHAR(256),
  client_secret VARCHAR(256),
  scope VARCHAR(256),
  authorized_grant_types VARCHAR(256),
  web_server_redirect_uri VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(256)
);

create table oauth_client_token (
  token_id VARCHAR(256),
  token BLOB,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256)
);

create table oauth_access_token (
  token_id VARCHAR(256),
  token BLOB,
  authentication_id VARCHAR(256) PRIMARY KEY,
  user_name VARCHAR(256),
  client_id VARCHAR(256),
  authentication BLOB,
  refresh_token VARCHAR(256)
);

create table oauth_refresh_token (
  token_id VARCHAR(256),
  token BLOB,
  authentication BLOB
);

create table oauth_code (
  code VARCHAR(256), authentication BLOB
);

create table oauth_approvals (
	userId VARCHAR(256),
	clientId VARCHAR(256),
	scope VARCHAR(256),
	status VARCHAR(10),
	expiresAt TIMESTAMP,
	lstMdifedAt TIMESTAMP null
);


-- customized oauth_client_details table
create table ClientDetails (
  appId VARCHAR(256) PRIMARY KEY,
  resourceIds VARCHAR(256),
  appSecret VARCHAR(256),
  scope VARCHAR(256),
  grantTypes VARCHAR(256),
  redirectUrl VARCHAR(256),
  authorities VARCHAR(256),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additionalInformation VARCHAR(4096),
  autoApproveScopes VARCHAR(256)
);

INSERT INTO oauth_client_details
    (client_id, client_secret, scope, authorized_grant_types,
    web_server_redirect_uri, authorities, access_token_validity,
    refresh_token_validity, additional_information, autoapprove)
VALUES
    ("demo-clientid", "demo-secret", "read,write",
    "password,refresh_token", null, "ROLE_ADMIN,ROLE_STORE,ROLE_STAFF", 36000, 36000, null, true);
    
-- -----------------------------------------------------
-- Table `donutstore`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`category` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(10) NOT NULL,
  `name` VARCHAR(20) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `picture` VARCHAR(1000) NOT NULL,
  `enabled` BOOLEAN NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE, code_UNIQUE` (`name` ASC)
  )
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`item` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `code` VARCHAR(10) NOT NULL,
  `name` VARCHAR(40) NOT NULL,
  `picture` VARCHAR(1000),
  `category_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `single_value` DECIMAL(10,0) NOT NULL,
  `enabled` boolean not null,
  `description` VARCHAR(1000),
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE, code_UNIQUE` (`name` ASC),
  FOREIGN KEY (`category_id`)
  REFERENCES `donutstore`.`category`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`supply`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`supply` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(40) NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `address` VARCHAR(60) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `name` VARCHAR(20) NOT NULL,
  `picture` VARCHAR(255),
  `supply_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
-- Table `donutstore`.`order_status`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`order_status` (
	`id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
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
 `code` VARCHAR(10) NOT NULL,
 `name` VARCHAR(20) NOT NULL,
 `picture` VARCHAR(255),
 `phone` VARCHAR(20) NOT NULL,
 `address` VARCHAR(60) NOT NULL,
 `lat` VARCHAR(20),
 `lng` VARCHAR(20),
 `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
 `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 `enabled` BOOLEAN NOT NULL,
 PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE, code_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

-- -----------------------------------------------------
-- Table `donutstore`.`order`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`orders` (
  `code` VARCHAR(20) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name_created` VARCHAR(40) NOT NULL,
  `phone` VARCHAR(18) NULL DEFAULT NULL,
  `store_id` BIGINT NOT NULL,
  `status_id` BIGINT NOT NULL,
  `shipping` BOOLEAN NOT NULL,
  `address_shipping` VARCHAR(255) NULL DEFAULT NULL,
  `distance` VARCHAR(20),
  `shipping_price` BIGINT NULL DEFAULT NULL,
  `total_price` BIGINT NOT NULL,
  PRIMARY KEY (`code`),
  FOREIGN KEY (`status_id`) REFERENCES `donutstore`.`order_status`(`id`),
  FOREIGN KEY (`store_id`) REFERENCES `donutstore`.`store`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`quantity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`quantity` (
  `code` VARCHAR(22) NOT NULL,
  `order_code` VARCHAR(20) NOT NULL,
  `item_id` BIGINT NOT NULL,
  `quantity` INT(11) NOT NULL,
  PRIMARY KEY (`code`),
  FOREIGN KEY (`order_code`) REFERENCES `donutstore`.`orders`(`code`),
  FOREIGN KEY (`item_id`) REFERENCES `donutstore`.`item`(`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;


-- -----------------------------------------------------
-- Table `donutstore`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `donutstore`.`role` (
  `id` BIGINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(20) NOT NULL,
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
    `name` VARCHAR(20) NOT NULL,
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
  `name` VARCHAR(40) NOT NULL,
  `picture` VARCHAR(255),
  `store_id` BIGINT NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `phone` VARCHAR(20) NOT NULL,
  `address` VARCHAR(60) NOT NULL,
  `identity_card` VARCHAR(12) NOT NULL UNIQUE,
  `home_town` VARCHAR(20) NOT NULL,
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
    `name` VARCHAR(20) NOT NULL,
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
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
  `email` VARCHAR(100) NOT NULL UNIQUE,
  `password` VARCHAR(60) NOT NULL,
  `picture` VARCHAR(255) NOT NULL,
  `date_created` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_updated` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `enabled` BOOLEAN not null,
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

CREATE TABLE IF NOT EXISTS `donutstore`.`room_db` (
	`id` BIGINT NOT NULL auto_increment,
    `name` VARCHAR(40) NOT NULL,
    PRIMARY KEY (`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `donutstore`.`sender_db` (
	`id` BIGINT NOT NULL auto_increment,
    `name` VARCHAR(20) NOT NULL,
    `phone` VARCHAR(20) NULL,
    `last_connect` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `user_id` BIGINT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `donutstore`.`user`(`id`),
    UNIQUE INDEX `phone_UNIQUE` (`phone` ASC)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `donutstore`.`sender_room_db` (
    `room_db_id` BIGINT NOT NULL,
	`sender_db_id` BIGINT NOT NULL,
    PRIMARY KEY(`room_db_id`,`sender_db_id`),
    FOREIGN KEY(`room_db_id`) REFERENCES `donutstore`.`room_db`(`id`),
    FOREIGN KEY (`sender_db_id`) REFERENCES `donutstore`.`sender_db`(`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `donutstore`.`message_db` (
	`id` BIGINT NOT NULL auto_increment,
    `sender_db_id` BIGINT NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `time` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `room_db_id` BIGINT NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`sender_db_id`) REFERENCES `donutstore`.`sender_db`(`id`),
    FOREIGN KEY(`room_db_id`) REFERENCES `donutstore`.`room_db`(`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS`donutstore`.`notification_db` (
	`id` BIGINT NOT NULL auto_increment,
    `user_id` BIGINT NOT NULL,
    `text` VARCHAR(255) NOT NULL,
    `time` TIMESTAMP NOT NULL,
    `seen` BOOLEAN NOT NULL,
    PRIMARY KEY(`id`),
    FOREIGN KEY(`user_id`) REFERENCES `donutstore`.`user`(`id`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;

CREATE TABLE IF NOT EXISTS `donutstore`.`config_global` (
	`name` VARCHAR(60) NOT NULL,
    `value` VARCHAR(255) NOT NULL,
    PRIMARY KEY(`name`)
)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8 COLLATE utf8_unicode_ci;