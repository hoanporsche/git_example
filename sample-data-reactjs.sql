USE `donutstore` ;

INSERT INTO `donutstore`.`category` VALUES 
(1,'CATbr','Bánh rán', '2018-01-02', '2018-02-03','https://res.cloudinary.com/hitkeodog/image/upload/v1534254307/donut-store/banh-ran/br-category.jpg', b'1'),
(2,'CATbm','Bánh mì', '2018-01-02', '2018-02-03','https://res.cloudinary.com/hitkeodog/image/upload/v1534254448/donut-store/banh-ran/bm-category.jpg', b'1'),
(3,'CATdu','Đồ uống', '2018-01-02', '2018-02-03','https://res.cloudinary.com/hitkeodog/image/upload/v1534254449/donut-store/banh-ran/du-category.jpg', b'1'),
(4,'CATtx','Thịt xiên', '2018-01-02', '2018-02-03','https://res.cloudinary.com/hitkeodog/image/upload/v1534254449/donut-store/banh-ran/du-category.jpg', b'1');

INSERT INTO `donutstore`.`item` VALUES 
(1,'ITEbrm','Bánh rán mặn',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1533569786/donut-store/banh-ran/BR7.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534304957/donut-store/banh-ran/br-man-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305322/donut-store/banh-ran/br-man-3.jpg',
    'Bánh rán mặn','banh-ran-man',
    '1','2018-01-02', '2018-02-03','4000', b'1','Bánh rán với vỏ mỏng giòn; nhân bên trong có thịt, miến, mục nhĩ cùng các loại hương vị khác;bánh đi kèm nước sốt.'),
(2,'ITEbrn','Bánh rán ngọt',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1533569777/donut-store/banh-ran/BR8.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534304957/donut-store/banh-ran/br-ngot-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305324/donut-store/banh-ran/br-ngot-3.jpg',
    'Bánh rán ngọt','banh-ran-ngot',
    '1','2018-01-02', '2018-02-03','4000', b'1','Bánh rán với nhân đỗ xanh quyện với đường cho vị ngọt thanh khi thưởng thức, vỏ bánh giòn mỏng.'),
(3,'ITEbmpt','Bánh mì pate trứng',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1533569683/donut-store/banh-mi/BM1.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305552/donut-store/banh-mi/bm-pate-trung-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305552/donut-store/banh-mi/bm-pate-trung-3.jpg',
    'Bánh mì pate trứng','banh-mi-pate-trung',
    '2','2018-01-02', '2018-02-03','12000', b'1','Bánh mì với nhân là pate, trứng chiên cùng các loại rau và sốt.'),
(4,'ITEbmpxx','Bánh mì pate xúc xích',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1533569685/donut-store/banh-mi/BM2.png,https://res.cloudinary.com/hitkeodog/image/upload/v1534305550/donut-store/banh-mi/bm-pate-xx-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305550/donut-store/banh-mi/bm-pate-xx-3.jpg',
	'Bánh mì pate xúc xích','banh-mi-pate-xuc-xich',
    '2','2018-01-02', '2018-02-03','15000', b'1','Bánh mì với nhân là pate, xúc xích rán cùng các loại rau và sốt.'),
(5,'ITEbmptxx','Bánh mì pate trứng xúc xích',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1533569686/donut-store/banh-mi/BM3.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305639/donut-store/banh-mi/bm-pate-trung-xx-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305639/donut-store/banh-mi/bm-pate-trung-xx-3.jpg',
	'Bánh mì pate trứng xúc xích','banh-mi-pate-trung-xuc-xich',
    '2','2018-01-02', '2018-02-03','18000', b'1','Bánh mì với nhân là pate, trứng chiên, xúc xích rán cùng các loại rau và sốt.'),
(6,'ITEtd','Trà đá',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1534305855/donut-store/do-uong/tra-da-3.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305855/donut-store/do-uong/tra-da-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305855/donut-store/do-uong/tra-da-1.jpg',
    'Trà đa','tra-da',
    '3','2018-01-02', '2018-02-03','3000', b'1','Trà xanh ướp lạnh.'),
(7,'ITEscu','Sữa chua uống',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1534306210/donut-store/do-uong/sua-chua-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534306210/donut-store/do-uong/sua-chua-3.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534306210/donut-store/do-uong/sua-chua-1.jpg',
    'Sữa chua uống','sua-chua-uong',
    '3','2018-01-02', '2018-02-03','18000', b'1','Sữa chua uống ướp lạnh'),
(8,'ITEcul','Coca ướp lạnh',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1534305941/donut-store/do-uong/coca-1.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305941/donut-store/do-uong/coca-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305941/donut-store/do-uong/coca-3.jpg',
     'Coca ướp lạnh','coca-uop-lanh',
    '3','2018-01-02', '2018-02-03','10000', b'1','Coca ướp lạnh'),
(9,'ITEtx','Thịt xiên',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1548127214/donut-store/thit-xien/49836862_1086308444874832_1954335902092230656_n.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1548127215/donut-store/thit-xien/th%E1%BB%8Bt-xi%C3%AAn1.png,https://res.cloudinary.com/hitkeodog/image/upload/v1534305941/donut-store/do-uong/coca-3.jpg',
     'Thịt xiên','thit-xien-nuong',
     '4','2018-01-02', '2018-02-03','7000', b'1','Thịt xiên nướng'),
(10,'ITEbmtx1x','Bánh mì thịt xiên ( 1 xiên )',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1548127215/donut-store/thit-xien/50586588_1090660344439642_1212958236802547712_n.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1548127214/donut-store/thit-xien/foody-mobile-foody-banh-mi-thit-x-346-636329506030758654.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1548127214/donut-store/thit-xien/foody-mobile-foody-banh-mi-thit-x-502-636344988314991614.jpg',
     'Bánh mì thịt xiên ( 1 xiên )','banh-mi-thit-xien-1-xien',
     '4','2018-01-02', '2018-02-03','10000', b'1','Bánh mì 1 xiên, có thêm rau dưa và sốt'),
(11,'ITEbmtx2x','Bánh mì thịt xiên ( 2 xiên )',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1548127215/donut-store/thit-xien/50586588_1090660344439642_1212958236802547712_n.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1548127214/donut-store/thit-xien/foody-mobile-foody-banh-mi-thit-x-346-636329506030758654.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1548127214/donut-store/thit-xien/foody-mobile-foody-banh-mi-thit-x-502-636344988314991614.jpg',
     'Bánh mì thịt xiên ( 2 xiên )','banh-mi-thit-xien-2-xien',
     '4','2018-01-02', '2018-02-03','17000', b'1','Bánh mì 2 xiên, có thêm rau dưa và sốt'),
(12,'ITEbrmgn','Bánh rán mặn gà nấm',
	'https://res.cloudinary.com/hitkeodog/image/upload/v1548129332/donut-store/banh-ran/49897568_1083110288527981_6622240306530091008_n.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305941/donut-store/do-uong/coca-2.jpg,https://res.cloudinary.com/hitkeodog/image/upload/v1534305941/donut-store/do-uong/coca-3.jpg',
     'Bánh rán mặn gà nấm','banh-ran-man-ga-nam',
     '1','2018-01-02', '2018-02-03','4000', b'1','Bánh rán nhân gà , nấm hương và miến');

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

INSERT INTO `donutstore`.`order_status` VALUES 
('1','verifying','Đang xác thực',b'1'),
('2','accepted','Đã nhận',b'1'),
('3','in-process','Đang giao hàng',b'1'),
('4','completed','Đã hoàn thành',b'1'),
('5','cancel','Hủy',b'1');

INSERT INTO `donutstore`.`store` VALUES 
('1','STOgv','Giảng Võ','','0943451794','113 D6 Giảng Võ','21.026846','105.821322','2018-01-02', '2018-02-03', b'1'),
('2','STOnt','Núi Trúc','','0969550954','135 Núi Trúc','21.026846','105.881322','2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`discount_type` VALUES 
('1','DCT01','Phần trăm̃','2018-01-02', '2018-02-03', b'1'),
('2','DCT02','Khoảng giá̃','2018-01-02', '2018-02-03', b'1'),
('3','DCT03','Giao hàng','2018-01-02', '2018-02-03', b'1');

INSERT INTO `donutstore`.`discount` VALUES 
('1','DCO01','Giảm 10%','2018-01-02', '2018-02-03', b'1',1,10),
('2','DCO02','Giảm 15%','2018-01-02', '2018-02-03', b'1',1,15),
('3','DCO03','Giảm 20%','2018-01-02', '2018-02-03', b'1',1,20),
('4','DCO04','Giảm 25%','2018-01-02', '2018-02-03', b'1',1,25),
('5','DCO05','Giảm 30%','2018-01-02', '2018-02-03', b'1',1,30),
('6','DCO06','Giảm 35%','2018-01-02', '2018-02-03', b'1',1,35),
('7','DCO07','Giảm 40%','2018-01-02', '2018-02-03', b'1',1,40),
('8','DCO08','Giảm 45%','2018-01-02', '2018-02-03', b'1',1,45),
('9','DCO09','Giảm 50%','2018-01-02', '2018-02-03', b'1',1,50),
('10','DCO10','Giảm 50k','2018-01-02', '2018-02-03', b'1',2,50000),
('11','DCO11','Freeship','2018-01-02', '2018-02-03', b'1',3,0);

INSERT INTO `donutstore`.`orders` VALUES 
('ORD20180306000000abc','2018-03-06','2018-03-06','3 Liếu giai','0914248833','1','4',b'1','Số 3 Liễu Giai','2,1 km',12000, 192000),
('ORD20180306000000def','2018-03-06','2018-03-06','68 Nguyễn Chí Thanh','0914248833','1','4',b'1','Số 68 Nguyễn Chí Thanh','1,8 km',12000, 162000),
('ORD20180306000000ghi','2018-03-06','2018-03-06','34 Láng Hạ','0914248833','1','4',b'1','Số 34 Láng Hạ','1,9km',12000, 147000);

INSERT INTO `donutstore`.`quantity` VALUES 
('ORD20180306000000abc01','ORD20180306000000abc','1','45'),
('ORD20180306000000abc02','ORD20180306000000abc','2','15'),
('ORD20180306000000def01','ORD20180306000000def','1','25'),
('ORD20180306000000def02','ORD20180306000000def','2','25'),
('ORD20180306000000ghi01','ORD20180306000000ghi','1','35'),
('ORD20180306000000ghi03','ORD20180306000000ghi','2','10');

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
('1','admin@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6',"",'2018-01-02','2018-02-03',b'1',1),
('2','giangvo@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6',"",'2018-01-02','2018-02-03',b'1',1),
('3','staff@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6',"",'2018-01-02','2018-02-03',b'1',2),
('4','nuitruc@gmail.com','$2a$10$rieSbYQ8pMADeHBugz4ni.xtPq3G7dIM673TVE3T1Srcl5w4ITQL6',"",'2018-01-02','2018-02-03',b'1',2);


INSERT INTO `donutstore`.`user_role` VALUES 
('1','1'),
('2','2'),
('3','3'),
('4','2');

INSERT INTO `donutstore`.`material_daily_report` VALUES 
('1','1','2018-02-07'),
('2','2','2018-03-07');

INSERT INTO `donutstore`.`material_report` VALUES 
('1','1','1','10','11','enough'),
('2','1','2','10','11','enough'),
('3','1','3','10','11','enough'),
('4','1','4','10','11','enough'),
('5','1','5','10','11','enough'),
('6','1','6','10','11','enough'),
('7','2','1','10','11','enough'),
('8','2','2','10','11','enough'),
('9','2','3','10','11','enough'),
('10','2','4','10','11','enough'),
('11','2','5','10','11','enough'),
('12','2','6','10','11','enough');

INSERT INTO `donutstore`.`room_db` VALUES 
('1', 'Customer1'),
('2', 'Customer2'),
('3', 'Nuitruc-giangvo');

INSERT INTO `donutstore`.`sender_db` VALUES
('1','giangvo','0943451794','2018-05-22','2'),
('2','nuitruc','0969550954','2018-05-22','4'),
('3','Hoang ngu','0988888808','2018-05-22', null),
('4','Phong ngu','0988888888','2018-05-22', null);

INSERT INTO `donutstore`.`sender_room_db` VALUES
('1','1'),
('1','3'),
('2','2'),
('2','4'),
('3','1'),
('3','2');

INSERT INTO `donutstore`.`message_db` VALUES 
('1','3','Hello','2018-05-22 13:04;00', '1'),
('2','1','Chao ban','2018-05-22 13:05;00', '1'),
('3','4','Minh muon mua banh ran','2018-05-22 13:09;00', '2'),
('4','2','Ban lay bao nhieu chiec a','2018-05-22 13:10;00', '2');

INSERT INTO `donutstore`.`notification_db` VALUES
('1','1','We have a new message at room DS-UG','2018-06-11 10:25:25',b'0'),
('2','2','We have a new message at room DS-UG','2018-06-11 10:25:25',b'0'),
('3','3','We have a new message at room DS-UG','2018-06-11 10:25:25',b'0'),
('4','4','We have a new message at room DS-UG','2018-06-11 10:25:25',b'0');

INSERT INTO `donutstore`.`config_global` VALUES
('logo','https://res.cloudinary.com/hitkeodog/image/upload/v1533569776/donut-store/banh-ran/BR6.jpg'),
('headquarter','113/D6 Giảng Võ'),
('hotLine','0943451794'),
('email','banhranhoan@gmail.com'),
('minTotalPrice','80000'),
('freeShipDistance','3'),
('minAhaDistance','4'),
('subsidyPrice','10000'),
('singleShippingPrice','5600'),
('minShippingPrice','12000'),
('privacy','Giao hàng tận nơi với đơn hàng từ 80.000₫/Miễn phí giao hàng 3km đầu tiên/Miễn phí giao hàng toàn bộ nội thành Hà Nội với đơn hàng từ 400.000₫'),
('shippingPrice','https://res.cloudinary.com/hitkeodog/image/upload/v1533796074/donut-store/shipping-price.png');