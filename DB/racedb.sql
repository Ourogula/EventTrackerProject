-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

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
-- Table `series`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `series` ;

CREATE TABLE IF NOT EXISTS `series` (
  `id` INT NOT NULL,
  `name` VARCHAR(300) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `language`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `language` ;

CREATE TABLE IF NOT EXISTS `language` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `name_UNIQUE` (`name` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `race`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `race` ;

CREATE TABLE IF NOT EXISTS `race` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `description` TEXT NULL,
  `lore` TEXT NULL,
  `personality_traits` VARCHAR(1000) NULL,
  `physical_traits` VARCHAR(1000) NULL,
  `planet` VARCHAR(100) NULL,
  `region` VARCHAR(200) NULL,
  `series_id` INT NOT NULL,
  `language_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_race_series_idx` (`series_id` ASC),
  INDEX `fk_race_language1_idx` (`language_id` ASC),
  CONSTRAINT `fk_race_series`
    FOREIGN KEY (`series_id`)
    REFERENCES `series` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_race_language1`
    FOREIGN KEY (`language_id`)
    REFERENCES `language` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

SET SQL_MODE = '';
DROP USER IF EXISTS admin@localhost;
SET SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
CREATE USER 'admin'@'localhost' IDENTIFIED BY 'admin';

GRANT SELECT, INSERT, TRIGGER, UPDATE, DELETE ON TABLE * TO 'admin'@'localhost';

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

-- -----------------------------------------------------
-- Data for table `series`
-- -----------------------------------------------------
START TRANSACTION;
USE `racedb`;
INSERT INTO `series` (`id`, `name`) VALUES (1, 'Non Fiction');
INSERT INTO `series` (`id`, `name`) VALUES (2, 'Mythology');
INSERT INTO `series` (`id`, `name`) VALUES (3, 'Avatar');
INSERT INTO `series` (`id`, `name`) VALUES (4, 'Mass Effect');
INSERT INTO `series` (`id`, `name`) VALUES (5, 'Star Wars');

COMMIT;


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
-- Data for table `race`
-- -----------------------------------------------------
START TRANSACTION;
USE `racedb`;
INSERT INTO `race` (`id`, `name`, `description`, `lore`, `personality_traits`, `physical_traits`, `planet`, `region`, `series_id`, `language_id`) VALUES (1, 'Yuki Onna', 'Frost lady from Japanese folklore', 'A lonely woman froze to death on a snowy mountain, only to come back as a vengeful youkai.', 'Vengeful,Cold Hearted', 'Cold,Icy,Ghostly', 'Earth', 'Japan', 2, 1);

COMMIT;

