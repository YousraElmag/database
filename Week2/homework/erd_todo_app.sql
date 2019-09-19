-- MySQL Script generated by MySQL Workbench
-- Thu Sep 19 12:12:34 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema adham_erd_todo_app
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema adham_erd_todo_app
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `adham_erd_todo_app` DEFAULT CHARACTER SET utf8 ;
USE `adham_erd_todo_app` ;

-- -----------------------------------------------------
-- Table `adham_erd_todo_app`.`lists_menu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adham_erd_todo_app`.`lists_menu` (
  `list_id` INT NOT NULL,
  `list_name` VARCHAR(45) NOT NULL,
  `list_description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`list_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adham_erd_todo_app`.`list_01`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adham_erd_todo_app`.`list_01` (
  `task_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  `task_description` VARCHAR(45) NULL,
  `task_completed` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'I wanted to make the data type Boolean. after few reading I think: Boolean is the same as Tinyint(1)',
  `task_has_reminder` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'I wanted to make the data type Boolean. after few reading I think: Boolean is the same as Tinyint(1)',
  PRIMARY KEY (`task_id`),
  INDEX `list_id_idx` (`list_id` ASC) VISIBLE,
  CONSTRAINT `list_id`
    FOREIGN KEY (`list_id`)
    REFERENCES `adham_erd_todo_app`.`lists_menu` (`list_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adham_erd_todo_app`.`list_02`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adham_erd_todo_app`.`list_02` (
  `task_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  `task_description` VARCHAR(45) NULL,
  `task_completed` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'I wanted to make the data type Boolean. after few reading I think: Boolean is the same as Tinyint(1)',
  `task_has_reminder` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'I wanted to make the data type Boolean. after few reading I think: Boolean is the same as Tinyint(1)',
  PRIMARY KEY (`task_id`),
  INDEX `list_id_idx` (`list_id` ASC) VISIBLE,
  CONSTRAINT `list_id0`
    FOREIGN KEY (`list_id`)
    REFERENCES `adham_erd_todo_app`.`lists_menu` (`list_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `adham_erd_todo_app`.`reminders`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `adham_erd_todo_app`.`reminders` (
  `task_id` INT NOT NULL,
  `list_id` INT NOT NULL,
  `reminder_description` VARCHAR(45) NOT NULL,
  INDEX `reminder_to_list_02_idx` (`task_id` ASC, `list_id` ASC) VISIBLE,
  CONSTRAINT `reminder_to_list_01`
    FOREIGN KEY (`list_id` , `task_id`)
    REFERENCES `adham_erd_todo_app`.`list_01` (`list_id` , `task_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `reminder_to_list_02`
    FOREIGN KEY (`task_id` , `list_id`)
    REFERENCES `adham_erd_todo_app`.`list_02` (`task_id` , `list_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
