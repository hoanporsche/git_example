
/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`hrm_service` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `department_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `department_info` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `department_manager_id` int(11) NOT NULL COMMENT 'refer to users table',
  `status` tinyint(1) DEFAULT '0' COMMENT '0: Normal, \n1: Locked, \n2: Deleted',
  `created_id` int(11) DEFAULT NULL COMMENT 'Who created this record',
  `created_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is created',
  `updated_id` int(11) DEFAULT NULL COMMENT 'Who last updated this record',
  `updated_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is last updated',
  PRIMARY KEY (`id`),
  KEY `fk_departments_created_id` (`created_id`),
  KEY `fk_departments_department_manager_id` (`department_manager_id`),
  KEY `fk_departments_updated_id` (`updated_id`)
  )ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `permission` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `permission_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `permission_code` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL,
  `permission_description` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `parent_permission_id` int(11) DEFAULT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `idxuq_permissions_permission_code` (`permission_code`),
  UNIQUE KEY `UKpubb8bn5j1jwu50vnykvbap9w` (`permission_code`),
  KEY `fk_permissions_parent_permission_id` (`parent_permission_id`),
  KEY `fk_permissions_created_id` (`created_id`),
  KEY `fk_permissions_updated_id` (`updated_id`)
  )ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
  
  CREATE TABLE `project` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `project_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_id` int(11) DEFAULT NULL COMMENT 'Who created this record',
  `created_name` timestamp NULL DEFAULT NULL COMMENT 'When this record is created',
  `updated_id` int(11) DEFAULT NULL COMMENT 'Who last updated this record',
  `updated_name` timestamp NULL DEFAULT NULL COMMENT 'When this record is last updated',
  PRIMARY KEY (`id`),
  KEY `fk_projects_created_id` (`created_id`),
  KEY `fk_projects_updated_id` (`updated_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `role_info` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Normal, \n1: Locked, \n2: Deleted',
  `created_id` int(11) DEFAULT NULL COMMENT 'Who created this record',
  `created_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is created',
  `updated_id` int(11) DEFAULT NULL COMMENT 'Who last updated this record',
  `updated_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is last updated',
  PRIMARY KEY (`id`),
  KEY `fk_roles_created_id` (`created_id`),
  KEY `fk_roles_updated_id` (`updated_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `role_permission` (
  `role_id` int(11) NOT NULL,
  `permission_id` int(11) NOT NULL,
  `created_id` int(11) DEFAULT NULL,
  `created_time` timestamp NULL DEFAULT NULL,
  `updated_id` int(11) DEFAULT NULL,
  `updated_time` timestamp NULL DEFAULT NULL,
  KEY `fk_role_permission_role_id` (`role_id`),
  KEY `fk_role_permission_permission_id` (`permission_id`),
  KEY `fk_role_permission_created_id` (`created_id`),
  KEY `fk_role_permission_updated_id` (`updated_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `timesheet` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL COMMENT 'refer to users table',
  `user_reason` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `timesheet_type` tinyint(1) NOT NULL,
  `time_start` datetime NOT NULL,
  `time_end` datetime NOT NULL,
  `reject_reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'The last reject reason',
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Lưu tạm, \n1: Submit, \n2: Approve, 3: Reject, \n4: Cancel',
  `created_id` int(11) DEFAULT NULL COMMENT 'Who created this record',
  `created_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is created',
  `updated_id` int(11) DEFAULT NULL COMMENT 'Who last updated this record',
  `updated_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is last updated',
  PRIMARY KEY (`id`),
  KEY `fk_timesheets_user_id` (`user_id`),
  KEY `fk_timesheets_created_id` (`created_id`),
  KEY `fk_timesheets_updated_id` (`updated_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `timesheet_status` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `timesheet_id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `reject_reason` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1: Approve,0: Reject',
  `created_id` int(11) DEFAULT NULL COMMENT 'Who created this record',
  `created_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is created',
  `updated_id` int(11) DEFAULT NULL COMMENT 'Who last updated this record',
  `updated_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is last updated',
  PRIMARY KEY (`id`),
  KEY `fk_timesheet_status_timesheet_id` (`timesheet_id`),
  KEY `fk_timesheet_status_project_id` (`project_id`),
  KEY `fk_timesheet_status_created_id` (`created_id`),
  KEY `fk_timesheet_status_updated_id` (`updated_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_code` int(11) DEFAULT NULL,
  `user_name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `user_email` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_password` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `department_id` int(11) DEFAULT NULL,
  `role_id` int(11) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0' COMMENT '0: Normal\n, 1: Locked\n, 2: Deleted',
  `created_id` int(11) DEFAULT NULL COMMENT 'Who created this record',
  `created_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is created',
  `updated_id` int(11) DEFAULT NULL COMMENT 'Who last updated this record',
  `updated_time` timestamp NULL DEFAULT NULL COMMENT 'When this record is last updated',
  `department` tinyblob,
  PRIMARY KEY (`id`),
  KEY `fk_users_created_id` (`created_id`),
  KEY `fk_users_department_id` (`department_id`),
  KEY `fk_users_role_id` (`role_id`),
  KEY `fk_users_updated_id` (`updated_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

ALTER TABLE `department` 
  ADD CONSTRAINT `FK38aklxfu6u4bjlnlsuumgm5as` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKc9r3wymmtgv1lh11g1h6wi1y5` FOREIGN KEY (`department_manager_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKstms4hudat0fvoyh9gmgtxqhj` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_departments_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_departments_department_manager_id` FOREIGN KEY (`department_manager_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_departments_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
ALTER TABLE `permission` 
  ADD CONSTRAINT `FK4kygp631q8e6iytwqj6rsxbfn` FOREIGN KEY (`parent_permission_id`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `FK60cyoij9tgdfhfkmteeg4g8et` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKgh8c2xwilqpjbiur5kfe31bj2` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_permissions_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_permissions_parent_permission_id` FOREIGN KEY (`parent_permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_permissions_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;

ALTER TABLE `project`
  ADD CONSTRAINT `FKmwhtcd3nmckw2j1m5ftwvuyfi` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKo89ohae9lx083mf7o29n0gqju` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_projects_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_projects_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
ALTER TABLE `role`
  ADD CONSTRAINT `FK8lre1agkqowcdionc510jtukv` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKb0r25v8ai05o9pcfrluc6g6n` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_roles_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_roles_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
ALTER TABLE `role_permission`
  ADD CONSTRAINT `FKa6jx8n8xkesmjmv6jqug6bg68` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `FKescs3d5oujbrbrxvkm0cw45kv` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKf8yllw1ecvwqy3ehyxawqa1qp` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`),
  ADD CONSTRAINT `FKky3f25kjj93djib0r829yhkj0` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_role_permission_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role_permission_permission_id` FOREIGN KEY (`permission_id`) REFERENCES `permission` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role_permission_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_role_permission_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
ALTER TABLE `timesheet`
  ADD CONSTRAINT `FKdqhe1d688ka2i977boch1yjdf` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKgwv661dt587iligalbuhnglaa` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKm9k943y6g38ujtoa9na8bseak` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_timesheets_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_timesheets_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_timesheets_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
ALTER TABLE `timesheet_status`
  ADD CONSTRAINT `FK46nb9egsk8o93ldll10wn3qhi` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`),
  ADD CONSTRAINT `FKdkc64sygm12m0a5a0us0emsne` FOREIGN KEY (`timesheet_id`) REFERENCES `timesheet` (`id`),
  ADD CONSTRAINT `FKiqiqo1mwddyr4e8mx86samsxv` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKkhtrx6wc4wcabfrkivr92i2gb` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `fk_timesheet_status_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_timesheet_status_project_id` FOREIGN KEY (`project_id`) REFERENCES `project` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_timesheet_status_timesheet_id` FOREIGN KEY (`timesheet_id`) REFERENCES `timesheet` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_timesheet_status_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
ALTER TABLE `user`
  ADD CONSTRAINT `FK8hk7xk75079k6cgubh7uaghii` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKgkh2fko1e4ydv1y6vtrwdc6my` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  ADD CONSTRAINT `FKhglvdysqfyoixveor22o393i3` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`),
  ADD CONSTRAINT `FKn82ha3ccdebhokx3a8fgdqeyy` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`),
  ADD CONSTRAINT `fk_users_created_id` FOREIGN KEY (`created_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_department_id` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_role_id` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_users_updated_id` FOREIGN KEY (`updated_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE;
  
insert  into `department`(`id`,`department_name`,`department_info`,`department_manager_id`,`status`,`created_id`,`created_time`,`updated_id`,`updated_time`) values (1,'PRODUCT',NULL,1,0,NULL,NULL,NULL,NULL),(2,'WEB',NULL,4,0,NULL,NULL,NULL,NULL),(3,'ANDROID',NULL,5,0,NULL,NULL,NULL,NULL),(4,'HCNS',NULL,6,0,NULL,NULL,NULL,NULL);

insert  into `permission`(`id`,`permission_name`,`permission_code`,`permission_description`,`parent_permission_id`,`created_id`,`created_time`,`updated_id`,`updated_time`) values (1,'Quản lý timesheet','QLTS','Quản lý timesheet',NULL,NULL,NULL,NULL,NULL),(2,'Nhập timesheet','QLTS01','Nhập timesheet',1,NULL,NULL,NULL,NULL),(3,'Quản lý timesheet','QLTS02','Quản lý timesheet',1,NULL,NULL,NULL,NULL),(4,'Theo phòng','QLTS0201','Quản lý timesheet theo phòng',3,NULL,NULL,NULL,NULL),(5,'All','QLTS0202','Quản lý timesheet all',3,NULL,NULL,NULL,NULL),(6,'Quản lý nghỉ phép','QLNP','Quản lý nghỉ phép',NULL,NULL,NULL,NULL,NULL),(7,'Đăng ký nghỉ phép','QLNP01','Đăng ký nghỉ phép',6,NULL,NULL,NULL,NULL),(8,'Quản lý nghỉ phép','QLNP02','Quản lý nghỉ phép',6,NULL,NULL,NULL,NULL),(9,'Theo dự án','QLNP0201','Quản lý nghỉ phép theo dự án',8,NULL,NULL,NULL,NULL),(10,'Theo phòng','QLNP0202','Quản lý nghỉ phép theo phòng',8,NULL,NULL,NULL,NULL),(11,'All','QLNP0203','Quản lý nghỉ phép all',8,NULL,NULL,NULL,NULL),(12,'Quản lý OT','QLOT','Quản lý OT',NULL,NULL,NULL,NULL,NULL),(13,'Đăng ký OT','QLOT01','Đăng ký OT',12,NULL,NULL,NULL,NULL),(14,'Quản lý OT','QLOT02','Quản lý OT',12,NULL,NULL,NULL,NULL),(15,'Theo dự án','QLOT0201','Quản lý OT theo dự án',14,NULL,NULL,NULL,NULL),(16,'Theo phòng','QLOT0202','Quản lý OT theo phòng',14,NULL,NULL,NULL,NULL),(17,'All','QLOT0203','Quản lý OT all',14,NULL,NULL,NULL,NULL),(18,'Quản lý device','QLDV','Quản lý device',NULL,NULL,NULL,NULL,NULL),(19,'Đăng ký device','QLDV01','Đăng ký device',18,NULL,NULL,NULL,NULL),(20,'Danh sách request device','QLDV02','Danh sách request device',18,NULL,NULL,NULL,NULL),(21,'Danh sách quản lý device','QLDV03','Danh sách quản lý device',18,NULL,NULL,NULL,NULL),(22,'Theo phòng','QLDV0201','Danh sách request device theo phòng',20,NULL,NULL,NULL,NULL),(23,'All','QLDV0202','Danh sách request device all',20,NULL,NULL,NULL,NULL),(24,'Quản lý nhân sự','QLNS','Quản lý nhân sự',NULL,NULL,NULL,NULL,NULL),(25,'Thông tin nhân viên','QLNS01','Thông tin nhân viên',24,NULL,NULL,NULL,NULL),(26,'Danh sách nhân viên','QLNS02','Danh sách nhân viên',24,NULL,NULL,NULL,NULL),(27,'View + update all','QLNS0101','View + update all',25,NULL,NULL,NULL,NULL),(28,'View a part','QLNS0102','View a part',25,NULL,NULL,NULL,NULL),(29,'View + update a part','QLNS0103','View + update a part',25,NULL,NULL,NULL,NULL),(30,'Theo dự án','QLNS0201','Theo dự án',26,NULL,NULL,NULL,NULL),(31,'Theo phòng','QLNS0202','Theo phòng',26,NULL,NULL,NULL,NULL),(32,'All','QLNS0203','All',26,NULL,NULL,NULL,NULL),(33,'Quản lý dự án','QLDA','Quản lý dự án',NULL,NULL,NULL,NULL,NULL),(34,'Quản lý dự án','QLDA01','Quản lý dự án',33,NULL,NULL,NULL,NULL),(35,'Theo dự án','QLDA0101','Theo dự án',34,NULL,NULL,NULL,NULL),(36,'Theo phòng','QLDA0102','Theo phòng',34,NULL,NULL,NULL,NULL),(37,'All','QLDA0103','All',34,NULL,NULL,NULL,NULL),(38,'Setting','ST','Setting',NULL,NULL,NULL,NULL,NULL),(39,'Chức danh','ST01','Chức danh',38,NULL,NULL,NULL,NULL),(40,'Quyền','ST02','Quyền',38,NULL,NULL,NULL,NULL),(41,'Phòng ban','ST03','Phòng ban',38,NULL,NULL,NULL,NULL),(42,'Tài khoản','ST04','Tài khoản',38,NULL,NULL,NULL,NULL);

insert  into `role`(`id`,`role_name`,`role_info`,`status`,`created_id`,`created_time`,`updated_id`,`updated_time`) values (1,'User','User',0,NULL,'2017-07-20 18:55:55',NULL,'2017-07-20 18:55:57'),(2,'PM','PM',0,NULL,'2017-07-20 18:56:36',NULL,'2017-07-20 18:56:37'),(3,'Manager','Leader',0,NULL,'2017-07-20 18:56:46',NULL,'2017-07-20 18:56:48'),(4,'Admin','Admin',0,NULL,'2017-07-20 18:56:55',NULL,'2017-07-20 18:56:56');

insert  into `role_permission`(`role_id`,`permission_id`,`created_id`,`created_time`,`updated_id`,`updated_time`) values (1,2,NULL,'2017-07-21 12:21:22',NULL,'2017-07-21 12:21:24'),(1,7,NULL,'2017-07-21 12:38:15',NULL,'2017-07-21 12:38:17'),(1,13,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(1,19,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(1,29,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,2,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,7,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,9,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,13,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,15,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,19,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,28,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,30,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(2,35,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,2,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,4,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,7,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,10,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,13,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,16,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,19,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,22,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,28,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,31,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(3,36,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,2,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,5,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,13,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,17,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,19,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,23,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,21,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,27,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,32,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,37,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,39,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,40,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,41,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,42,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17'),(4,11,NULL,'2017-07-21 12:38:19',NULL,'2017-07-21 12:38:17');

insert  into `timesheet`(`id`,`user_id`,`user_reason`,`timesheet_type`,`time_start`,`time_end`,`reject_reason`,`status`,`created_id`,`created_time`,`updated_id`,`updated_time`) values (1,7,'Reason 01',0,'2017-08-21 14:40:00','2017-08-21 16:40:00',NULL,0,NULL,NULL,NULL,NULL),(2,7,'Reason 02',2,'2017-08-21 12:40:00','2017-08-21 13:40:00',NULL,0,NULL,NULL,NULL,NULL),(3,7,'Reason 02',2,'2017-08-26 12:40:00','2017-08-26 13:40:00',NULL,0,NULL,NULL,NULL,NULL),(4,9,'Reason 03',0,'2017-08-24 14:40:00','2017-08-24 16:40:00',NULL,0,NULL,NULL,NULL,NULL),(5,9,'Reason 04',2,'2017-08-22 12:40:00','2017-08-22 13:40:00',NULL,1,NULL,NULL,NULL,NULL),(6,9,'Reason 04',2,'2017-08-29 12:40:00','2017-08-29 13:40:00',NULL,1,NULL,NULL,NULL,NULL),(7,11,'Reason 05',1,'2017-08-23 12:40:00','2017-08-23 13:40:00',NULL,0,NULL,NULL,NULL,NULL),(8,11,'Reason 05',1,'2017-08-29 12:40:00','2017-08-29 13:40:00',NULL,0,NULL,NULL,NULL,NULL),(9,11,'Reason 06',0,'2017-08-24 14:40:00','2017-08-24 16:40:00',NULL,0,NULL,NULL,NULL,NULL),(10,11,'Reason 07',2,'2017-08-24 08:40:00','2017-08-24 10:40:00',NULL,0,NULL,NULL,NULL,NULL),(11,11,'Reason 07',2,'2017-08-30 08:40:00','2017-08-30 11:40:00',NULL,0,NULL,NULL,NULL,NULL),(12,11,'Reason 08',2,'2017-08-22 08:40:00','2017-08-22 10:40:00',NULL,1,NULL,NULL,NULL,NULL),(13,11,'Reason 08',2,'2017-08-30 08:40:00','2017-08-30 11:40:00',NULL,1,NULL,NULL,NULL,NULL),(14,12,'Reason 09',2,'2017-08-25 08:40:00','2017-08-25 10:40:00',NULL,4,NULL,NULL,NULL,NULL),(15,12,'Reason 23.1',2,'2017-08-25 08:00:00','2017-08-26 17:30:00',NULL,1,NULL,NULL,NULL,NULL),(16,12,'Reason 10',0,'2017-08-24 16:40:00','2017-08-24 18:40:00','Mình thích thì mình không cho thôi',2,NULL,NULL,NULL,NULL),(17,12,'Ly do 1',0,'2017-09-29 00:00:00','2017-10-01 00:00:00',NULL,0,NULL,NULL,NULL,NULL),(18,12,'fdcxzczx',0,'2017-09-22 00:00:00','2017-10-01 00:00:00',NULL,1,NULL,NULL,NULL,NULL),(19,12,'Ly do 2',0,'2017-09-26 08:00:00','2017-10-10 12:00:00',NULL,1,NULL,NULL,NULL,NULL),(20,12,'Bi tac duong',0,'2017-09-26 08:00:00','2017-09-26 08:30:00',NULL,1,NULL,NULL,NULL,NULL),(21,12,'Hong xe',0,'2017-09-27 08:00:00','2017-09-27 20:20:00',NULL,1,NULL,NULL,NULL,NULL),(22,12,'Ly do 3',0,'2017-09-27 08:00:00','2017-09-27 09:45:00',NULL,0,NULL,NULL,NULL,NULL);

insert  into `user`(`id`,`user_code`,`user_name`,`user_email`,`user_password`,`department_id`,`role_id`,`status`,`created_id`,`created_time`,`updated_id`,`updated_time`,`department`) values (1,11,'admin','admin@ominext.com','admin',1,4,0,NULL,NULL,NULL,NULL,NULL),(2,12,'Cao Bach','bachcx@ominext.com','aa97d66a1a0660fc4848bd0644d826442c1c0bda23884798d608a8c7d42a5d92571b0a3e42a480900558823bad627bbdef0e5aaf61141c1bcbc16af921872030',1,3,0,1,NULL,NULL,NULL,NULL),(3,13,'Hải Đăng 01','haidang@ominext.com','ac930e53f0a236c94eeec43a3659048f92e640ebb754a58da534db8130b798efcff0ca9722f51a641fd92a9708682f362f51f882fc8bdd7a5946fb11818ca4c6',1,1,0,1,NULL,NULL,NULL,NULL),(4,14,'Hải Đăng 02','haidang02@ominext.com','c79a7e562ed0ae72d0bd2a7f8e7073b99925c569a9cb75ffe29be1f771749b826dc3ec650fd04be54f25008ce9a123c0e84147f0cd7aff6863eedd5e2b26d905',2,3,0,1,NULL,NULL,NULL,NULL),(5,15,'Hải Đăng 03','haidang03@ominext.com','71c0099c16b49a5aa83a7d1fc52ae1013b030b62ab5df7b75edb0d845d77f1b0e7de7141dd640daaf7953f70daa5d3d6a49c5589c23935a8fe7f7149368bc7a6',3,3,0,1,NULL,NULL,NULL,NULL),(6,16,'Cao Minh','CaoMinh@ominext.com','802cbadee01845fe407860a37e60244505f8967aac6ca378bebe734b81bd1e62653fdbee2f71c92f99f52e6a777292a7da53c8d6b1ec1c4384cd9088ee91afac',4,3,0,1,NULL,NULL,NULL,NULL),(7,17,'Cao Minh 01','CaoMinh01@ominext.com','58a272beec09d2b1f607302446790ade548e11697e96a429af9941b83e4064ee9831f954f15075de7dbfad653f2ca266f4ca3c006ec65acbf0e643073f2a700c',3,1,0,1,NULL,NULL,NULL,NULL),(8,18,'Cao Minh 02','CaoMinh02@ominext.com','ae0425a496f63fa028f832c0c6a053b69930dd867832548c3c23f5e57dfc5b6bac16083fbbf6f832556224a2bc8de6d23ea58905a2f43ae2369a63b7460ab81c',4,1,0,1,NULL,NULL,NULL,NULL),(9,19,'Cao Minh 03','CaoMinh03@ominext.com','035115f4a65c2a0ec5957c25bc5013d07318fe7171df7da975057d835a80ff993e5e9b0bb6be07a5ea9068575642dbc8cd6fed279055438a935d366b8702f0a7',2,1,0,1,NULL,NULL,NULL,NULL),(10,20,'Cao Minh 04','CaoMinh04@ominext.com','2f73027fc41a98915518eb43ab699e241a63844da2da3601667839953dcda16c28be0ed5ff7a059d7e30c29768e9628e4c38383855a7b8dafcd28f1308c15acc',1,1,0,1,NULL,NULL,NULL,NULL),(11,21,'Hải Đặng 04','HaiDang04@ominext.com','04bd24cc6e2a4bc63109a83e978141c0c8fda6bb4dc027e6d3bd08b34e6c311c8550054517d5414f1e573d353cf6579c8a4b6bfddfc7dff269015a6990840485',1,1,0,1,NULL,NULL,NULL,NULL),(12,22,'Tung Tran','tungtt@gmail.com','tung',1,1,0,1,NULL,NULL,NULL,NULL);
