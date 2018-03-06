USE `donutstore` ;

INSERT INTO `donutstore`.`category` VALUES 
(1,'Bánh rán', '2018-01-02', '2018-02-03', b'1'),
(2,'Bánh mì', '2018-01-02', '2018-02-03', b'1'),
(3,'Đồ uống', '2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`item` VALUES 
(1,'Bánh rán mặn', 'https://photos.google.com/photo/AF1QipPVNjHJuYf8JJ0tDy1r0t2BrIt12K8PQdxNbno','1','2018-01-02', '2018-02-03','3000', b'1'),
(2,'Bánh rán ngọt', 'https://photos.google.com/photo/AF1QipN6C4PTn4ViZ2XtbY9ZqqXd3DDdHKcBndehrEo','1','2018-01-02', '2018-02-03','3000', b'1'),
(3,'Bánh mì pate trứng', 'https://photos.google.com/photo/AF1QipMn-51kzai-eV7_S79O3n1V96l8NJHpsuBrU6A','2','2018-01-02', '2018-02-03','12000', b'1'),
(4,'Bánh mì pate xúc xích', 'https://photos.google.com/photo/AF1QipMCZmlX4ifSz3BRnJ0qKVjf-iQAUfY_XW4txo8','2','2018-01-02', '2018-02-03','15000', b'1'),
(5,'Bánh mì pate trứng xúc xích', 'https://photos.google.com/photo/AF1QipMoO-fmt2wm-KP3kZMCXwFsXFRb989Bg0NeWlM','2','2018-01-02', '2018-02-03','18000', b'1'),
(6,'Trà đá', 'https://photos.google.com/photo/AF1QipPZpk1NjwKpGagINhLtGrw8XsBH5Qz9ffUYY68','3','2018-01-02', '2018-02-03','3000', b'1'),
(7,'Mirrinda', 'https://photos.google.com/photo/AF1QipNoMc3qsFE5eFC8-Q6KJm4GQkqleao5FU_NeUs','3','2018-01-02', '2018-02-03','10000', b'1'),
(8,'Coca', 'https://photos.google.com/photo/AF1QipMrIw9aPFxKDAh-oBH8fvYn2nekauBYMx6U5D0','3','2018-01-02', '2018-02-03','10000', b'1');

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
('1','Assigning','Đang tìm'),
('2','Accepted','Đã nhận'),
('3','In process','Đang thực hiện'),
('4','Completed','Đã hoàn thành'),
('5','Cancel','Hủy');

INSERT INTO `donutstore`.`store` VALUES 
('1','Giảng Võ','','0943451794','D6 Giảng Võ','2018-01-02', '2018-02-03', b'1'),
('2','Núi Trúc','','0969550954','135 Núi Trúc','2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`orders` VALUES 
('1','2018-03-06','2018-03-06','3 Liếu giai','0914248833','1','4',b'1','Số 3 Liễu Giai',12000, 192000),
('2','2018-03-06','2018-03-06','68 Nguyễn Chí Thanh','0914248833','1','4',b'1','Số 68 Nguyễn Chí Thanh',12000, 162000),
('3','2018-03-06','2018-03-06','34 Láng Hạ','0914248833','1','4',b'1','Số 34 Láng Hạ',12000, 147000);

INSERT INTO `donutstore`.`quantity` VALUES 
('1','1','1','45'),
('2','1','2','15'),
('3','2','1','25'),
('4','2','2','25'),
('5','3','1','35'),
('6','3','2','10');

INSERT INTO `donutstore`.`role` VALUES 
('1','ROLE_ADMIN'),
('2','ROLE_STORE'),
('3','ROLE_STAFF');

INSERT INTO `donutstore`.`staff` VALUES 
('1','Phùng Xuân Hoàng','','1','2018-03-06','2018-03-06','0974404620','Cầu Giấy','012345678','Ba Vì','320000',b'1'),
('2','Lê Cao Nguyên','','2','2018-03-06','2018-03-06','01638189359','Hà Đông','987654321','Mỹ Đức','320000',b'1');

INSERT INTO `donutstore`.`timekeeping` VALUES 
('1','1','2018-03-06','2018-03-06 08:20:00','2018-03-06 17:30:00', b'1');

INSERT INTO `donutstore`.`user` VALUES 
('1','Vũ Đình Hoàn','2352','admin@gmail.com','094 345 1794','304-a3b','2018-01-02','2018-02-03','2018-03-06',b'1',b'0',b'0',b'0',1),
('2','Vũ Đình Hoàn','2352','giangvo@gmail.com','094 345 1794','304-a3b','2018-01-02','2018-02-03','2018-03-06',b'1',b'0',b'0',b'0',1),
('3','Vũ Đình Hoàn','2352','nuitruc@gmail.com','094 345 1794','304-a3b','2018-01-02','2018-02-03','2018-03-06',b'1',b'0',b'0',b'0',1);

INSERT INTO `donutstore`.`user_role` VALUES 
('1','1'),('1','2'),('1','3'),
('2','2'),('2','3'),
('3','2'),('3','3');

INSERT INTO `donutstore`.`item_store` VALUES 
('1','1'),('2','1'),('3','1'),('4','1'),('5','1'),('6','1'),('7','1'),('8','1'),
('1','2'),('2','2'),('3','2'),('4','2'),('5','2'),('6','2'),('7','2'),('8','2');

INSERT INTO `donutstore`.`material_daily_report` VALUES 
('1','1','1','2','4'),
('2','1','2','2','4'),
('3','2','1','2','4'),
('4','2','2','2','4');