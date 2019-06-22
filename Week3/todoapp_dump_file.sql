-- MySQL Script generated by MySQL Workbench
-- Sun Jun 23 01:28:05 2019
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema todoApp
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `todoApp` ;

-- -----------------------------------------------------
-- Schema todoApp
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `todoApp` DEFAULT CHARACTER SET utf8 ;
USE `todoApp` ;

-- -----------------------------------------------------
-- Table `todoApp`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todoApp`.`user` ;

CREATE TABLE IF NOT EXISTS `todoApp`.`user` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`ID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todoApp`.`todolist`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todoApp`.`todolist` ;

CREATE TABLE IF NOT EXISTS `todoApp`.`todolist` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `userId` INT NOT NULL,
  `reminder` DATETIME NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_todo_list_User_idx` (`userId` ASC) VISIBLE,
  CONSTRAINT `fk_todo_list_User`
    FOREIGN KEY (`userId`)
    REFERENCES `todoApp`.`user` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todoApp`.`todoitem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todoApp`.`todoitem` ;

CREATE TABLE IF NOT EXISTS `todoApp`.`todoitem` (
  `ID` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `iscompleted` VARCHAR(45) NULL,
  `listId` INT NOT NULL,
  PRIMARY KEY (`ID`),
  INDEX `fk_todo_item_todo_list_idx` (`listId` ASC) VISIBLE,
  CONSTRAINT `fk_todo_item_todo_list`
    FOREIGN KEY (`listId`)
    REFERENCES `todoApp`.`todolist` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `todoApp`.`listanditem`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `todoApp`.`listanditem` ;

CREATE TABLE IF NOT EXISTS `todoApp`.`listanditem` (
  `todo_list_ID` INT NOT NULL,
  `todo_item_ID` INT NOT NULL,
  PRIMARY KEY (`todo_list_ID`, `todo_item_ID`),
  INDEX `fk_todo_list_has_todo_item_todo_item1_idx` (`todo_item_ID` ASC) VISIBLE,
  INDEX `fk_todo_list_has_todo_item_todo_list1_idx` (`todo_list_ID` ASC) VISIBLE,
  CONSTRAINT `fk_todo_list_has_todo_item_todo_list1`
    FOREIGN KEY (`todo_list_ID`)
    REFERENCES `todoApp`.`todolist` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_todo_list_has_todo_item_todo_item1`
    FOREIGN KEY (`todo_item_ID`)
    REFERENCES `todoApp`.`todoitem` (`ID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
