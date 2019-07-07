CREATE DATABASE IF NOT EXISTS `miw`;

USE `miw`;

DROP TABLE IF EXISTS `books`;
CREATE TABLE `books` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL,
  `author` varchar(100) NOT NULL,
  `readThis` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `miw`.`books` (`title`, `author`, `readThis`) VALUES ('The Princess Bride', 'WIlliam Goldman', '0');
INSERT INTO `miw`.`books` (`title`, `author`, `readThis`) VALUES ('The Wonderful Wizard of Oz', 'L. Frank Baum', '0');
INSERT INTO `miw`.`books` (`title`, `author`, `readThis`) VALUES ('The Tommyknockers', 'Stephen King', '0');
