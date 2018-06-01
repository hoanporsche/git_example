USE `donutstore` ;

INSERT INTO `donutstore`.`category` VALUES 
(1,'Bánh rán', '2018-01-02', '2018-02-03', b'1'),
(2,'Bánh mì', '2018-01-02', '2018-02-03', b'1'),
(3,'Đồ uống', '2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`item` VALUES 
(1,'Bánh rán mặn', './assets/img/donut-store/BR7.jpg','1','2018-01-02', '2018-02-03','3000', b'1','Bánh rán với vỏ mỏng giòn; nhân bên trong có thịt, miến, mục nhĩ cùng các loại hương vị khác;bánh đi kèm nước sốt.'),
(2,'Bánh rán ngọt', './assets/img/donut-store/BR8.jpg','1','2018-01-02', '2018-02-03','3000', b'1','Bánh rán với nhân đỗ xanh quyện với đường cho vị ngọt thanh khi thưởng thức, vỏ bánh giòn mỏng.'),
(3,'Bánh mì pate trứng', './assets/img/donut-store/BM1.jpg','2','2018-01-02', '2018-02-03','12000', b'1','Bánh mì với nhân là pate, trứng chiên cùng các loại rau và sốt.'),
(4,'Bánh mì pate xúc xích', './assets/img/donut-store/BM2.jpg','2','2018-01-02', '2018-02-03','15000', b'1','Bánh mì với nhân là pate, xúc xích rán cùng các loại rau và sốt.'),
(5,'Bánh mì pate trứng xúc xích', './assets/img/donut-store/BM3.jpg','2','2018-01-02', '2018-02-03','18000', b'1','Bánh mì với nhân là pate, trứng chiên, xúc xích rán cùng các loại rau và sốt.'),
(6,'Trà đá', './assets/img/donut-store/TRADA.jpg','3','2018-01-02', '2018-02-03','3000', b'1','Trà xanh ướp lạnh.'),
(7,'Mirrinda', './assets/img/donut-store/MIRRINDA.jpg','3','2018-01-02', '2018-02-03','10000', b'1','Mirrinda ướp lạnh'),
(8,'Coca', './assets/img/donut-store/COCA.jpg','3','2018-01-02', '2018-02-03','10000', b'1','Coca ướp lạnh');

INSERT INTO `donutstore`.`supply` VALUES 
('1','Chị Lý','0988888888','C4 Giảng Võ', '2018-01-02', '2018-02-03', b'1'),
('2','Bác Lan','0988888888','Chợ Ngô Sỹ Liên', '2018-01-02', '2018-02-03', b'1'),
('3','Bác Hương','01675986890','Ngõ Gạch', '2018-01-02', '2018-02-03', b'1'),
('4','Út Thịt','01675986890','Chợ Hoa Sen', '2018-01-02', '2018-02-03', b'1'),
('5','Tạp hóa','01675986890','A3a Giảng Võ', '2018-01-02', '2018-02-03', b'1'),
('6','Hòa Miến','01675986890','Nhổn - Bắc Từ Liêm', '2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`material` VALUES 
('1','Gạo nếp', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','1', '2018-01-02', '2018-02-03','12000', b'1'),
('2','Gạo tẻ', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','1', '2018-01-02', '2018-02-03','12000', b'1'),
('3','Bột sắn', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','3', '2018-01-02', '2018-02-03','12000', b'1'),
('4','Bột mì', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','3', '2018-01-02', '2018-02-03','12000', b'1'),
('5','Mộc nhĩ', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','2', '2018-01-02', '2018-02-03','12000', b'1'),
('6','Đỗ xanh', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','2', '2018-01-02', '2018-02-03','12000', b'1'),
('7','Vani', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','2', '2018-01-02', '2018-02-03','12000', b'1'),
('8','Đường đỏ', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','5', '2018-01-02', '2018-02-03','12000', b'1'),
('9','Đường trắng', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','5', '2018-01-02', '2018-02-03','12000', b'1'),
('10','Miến', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','6', '2018-01-02', '2018-02-03','12000', b'1'),
('11','Thịt lợn', 'https://photos.google.com/photo/AF1QipMiTbl3BCZ4m2CqxSQ6rlAJ9Onj7xArYWxghg8','4', '2018-01-02', '2018-02-03','12000', b'1');

INSERT INTO `donutstore`.`item_material` VALUES 
('1','1'),
('1','2'),
('1','3'),
('1','4'),
('1','5'),
('1','10'),
('1','11'),
('2','1'),
('2','2'),
('2','3'),
('2','4'),
('2','5'),
('2','6'),
('2','7');

INSERT INTO `donutstore`.`order_status` VALUES 
('1','Assigning','Đang tìm',b'1'),
('2','Accepted','Đã nhận',b'1'),
('3','In process','Đang thực hiện',b'1'),
('4','Completed','Đã hoàn thành',b'1'),
('5','Cancel','Hủy',b'1');

INSERT INTO `donutstore`.`store` VALUES 
('1','Giảng Võ','','0943451794','D6 Giảng Võ','21.026846','105.821322','2018-01-02', '2018-02-03', b'1'),
('2','Núi Trúc','','0969550954','135 Núi Trúc','21.026846','105.881322','2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`orders` VALUES 
('ORN09EeE1G','2018-03-06','2018-03-06','3 Liếu giai','0914248833','1','4',b'1','Số 3 Liễu Giai','2.1',12000, 192000),
('YPD14fqOx0','2018-03-06','2018-03-06','68 Nguyễn Chí Thanh','0914248833','1','4',b'1','Số 68 Nguyễn Chí Thanh','1.8',12000, 162000),
('P0L8RthyVX','2018-03-06','2018-03-06','34 Láng Hạ','0914248833','1','4',b'1','Số 34 Láng Hạ','1.9',12000, 147000);

INSERT INTO `donutstore`.`quantity` VALUES 
('1','ORN09EeE1G','1','45'),
('2','ORN09EeE1G','2','15'),
('3','YPD14fqOx0','1','25'),
('4','YPD14fqOx0','2','25'),
('5','P0L8RthyVX','1','35'),
('6','P0L8RthyVX','2','10');

INSERT INTO `donutstore`.`role` VALUES 
('1','ROLE_ADMIN',b'1'),
('2','ROLE_STORE',b'1'),
('3','ROLE_STAFF',b'1');

INSERT INTO `donutstore`.`working_calender` VALUES 
('1','Weekday Morning','Buổi sáng ngày thường',b'1'),
('2','Every day Morning','Các buổi sáng',b'1'),
('3','Weekday Afternoon','Buổi chiều ngày thường',b'1'),
('4','Every day Afternoon','Các buổi chiều',b'1'),
('5','Full day Weekday','Cả ngày ngày thường',b'1'),
('6','Full day Every day','Cả ngày mọi ngày',b'1');

INSERT INTO `donutstore`.`staff` VALUES 
('1','Phùng Xuân Hoàng','','1','2018-03-06','2018-03-06','0974404620','Cầu Giấy','012345678','Ba Vì','320000',6,b'1'),
('2','Lê Cao Nguyên','','2','2018-03-06','2018-03-06','01638189359','Hà Đông','987654321','Mỹ Đức','320000',6,b'1');

INSERT INTO `donutstore`.`timekeeping_status` VALUES 
('1','Late Come','Đến muộn',b'1'),
('2','Leave Early','Về sớm',b'1'),
('3','Absent Morning','Vắng sáng',b'1'),
('4','Absent Afternoon','Vắng chiều',b'1'),
('5','Full Work','Đủ công',b'1');

INSERT INTO `donutstore`.`timekeeping` VALUES 
('1','1','2018-03-06','2018-03-06 08:20:00','2018-03-06 17:30:00', b'1');

INSERT INTO `donutstore`.`user` VALUES 
('1','admin@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6','2018-01-02','2018-02-03',b'1',b'0',b'0',b'0',1),
('2','giangvo@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6','2018-01-02','2018-02-03',b'1',b'0',b'0',b'0',1),
('3','staff@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6','2018-01-02','2018-02-03',b'1',b'0',b'0',b'0',2),
('4','nuitruc@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6','2018-01-02','2018-02-03',b'1',b'0',b'0',b'0',2);


INSERT INTO `donutstore`.`user_role` VALUES 
('1','1'),
('2','2'),
('3','3'),
('4','2');

INSERT INTO `donutstore`.`material_daily_report` VALUES 
('1','1','2018-02-07','1','10','11','enough'),
('2','1','2018-03-07','2','10','11','enough'),
('3','1','2018-03-07','3','10','11','enough'),
('4','1','2018-03-08','4','10','11','enough'),
('5','1','2018-03-09','5','10','11','enough'),
('6','1','2018-03-07','6','10','11','enough'),
('7','2','2018-03-07','1','10','11','enough'),
('8','2','2018-03-07','2','10','11','enough'),
('9','2','2018-03-07','3','10','11','enough'),
('10','2','2018-03-07','4','10','11','enough'),
('11','2','2018-03-07','5','10','11','enough'),
('12','2','2018-02-03','6','10','11','enough');

INSERT INTO `donutstore`.`room_db` VALUES 
('1', 'Customer1'),
('2', 'Customer2');

INSERT INTO `donutstore`.`sender_db` VALUES
('1','giangvo','0943451794','2018-05-22'),
('2','nuitruc','0969550954','2018-05-22'),
('3','Hoang ngu','0988888888','2018-05-22'),
('4','Phong ngu','0988888888','2018-05-22');

INSERT INTO `donutstore`.`sender_db` VALUES
('1','1'),
('2','1'),
('3','2'),
('4','2');

INSERT INTO `donutstore`.`message_db` VALUES 
('1','3','Hello','2018-05-22 13:04;00', '1'),
('2','1','Chao ban','2018-05-22 13:05;00', '1'),
('3','4','Minh muon mua banh ran','2018-05-22 13:09;00', '2'),
('4','2','Ban lay bao nhieu chiec a','2018-05-22 13:10;00', '2');


