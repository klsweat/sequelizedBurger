USE JawsDB;
ALTER TABLE `burgers` MODIFY COLUMN `createdAt` DATETIME NOT NULL DEFAULT NOW();
ALTER TABLE `burgers` MODIFY COLUMN `updatedAt` DATETIME NOT NULL DEFAULT NOW() ON UPDATE NOW();

INSERT INTO burgers (`burger_name`, devoured)
VALUES ("Blue Burger", true);

INSERT INTO burgers (`burger_name`, devoured)
VALUES ("American Burger", true);

INSERT INTO burgers (`burger_name`, devoured)
VALUES ("Heart Attack Burger", false);

INSERT INTO burgers (`burger_name`, devoured)
VALUES ("Big Daddy Mac", true);