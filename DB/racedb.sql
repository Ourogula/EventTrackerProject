-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema racedb
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `racedb` ;

-- -----------------------------------------------------
-- Schema racedb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `racedb` DEFAULT CHARACTER SET utf8 ;
USE `racedb` ;

-- -----------------------------------------------------
-- Table `language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language` ;

CREATE TABLE IF NOT EXISTS `language` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `series`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `series` ;

CREATE TABLE IF NOT EXISTS `series` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `race`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `race` ;

CREATE TABLE IF NOT EXISTS `race` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL DEFAULT NULL,
  `lore` TEXT NULL DEFAULT NULL,
  `personality_traits` VARCHAR(1000) NULL DEFAULT NULL,
  `physical_traits` VARCHAR(1000) NULL DEFAULT NULL,
  `planet` VARCHAR(100) NULL DEFAULT NULL,
  `region` VARCHAR(200) NULL DEFAULT NULL,
  `image_url` VARCHAR(2048) NULL,
  `series_id` INT(11) NOT NULL,
  `language_id` INT(11) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_race_series_idx` (`series_id` ASC),
  INDEX `fk_race_language1_idx` (`language_id` ASC),
  CONSTRAINT `fk_race_language1`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_race_series`
    FOREIGN KEY (`series_id`)
    REFERENCES `series` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE = '';
DROP USER IF EXISTS admin@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'admin'@'localhost';
GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'admin'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `language`
-- -----------------------------------------------------
START TRANSACTION;
USE `racedb`;
INSERT INTO `language` (`id`, `name`) VALUES (1, 'Unknown');
INSERT INTO `language` (`id`, `name`) VALUES (2, 'Spanish');
INSERT INTO `language` (`id`, `name`) VALUES (3, 'Japanese');
INSERT INTO `language` (`id`, `name`) VALUES (4, 'English');

COMMIT;


-- -----------------------------------------------------
-- Data for table `series`
-- -----------------------------------------------------
START TRANSACTION;
USE `racedb`;
INSERT INTO `series` (`id`, `name`) VALUES (1, 'Unknown');
INSERT INTO `series` (`id`, `name`) VALUES (2, 'Non Fiction');
INSERT INTO `series` (`id`, `name`) VALUES (3, 'Mythology');
INSERT INTO `series` (`id`, `name`) VALUES (4, 'Mass Effect');
INSERT INTO `series` (`id`, `name`) VALUES (5, 'Star Wars');
INSERT INTO `series` (`id`, `name`) VALUES (6, 'Avatar');

COMMIT;


-- -----------------------------------------------------
-- Data for table `race`
-- -----------------------------------------------------
START TRANSACTION;
USE `racedb`;
INSERT INTO `race` (`id`, `name`, `description`, `lore`, `personality_traits`, `physical_traits`, `planet`, `region`, `image_url`, `series_id`, `language_id`) VALUES (1, 'Yuki Onna', 'Ice woman from Japanese folklore', 'A woman froze to death on a snowy mountain, only to come back as a vengeful youkai.', 'Cold,Vengeful', 'Ghostly,Female', 'Earth', 'Japan', NULL, 2, 1);

COMMIT;

