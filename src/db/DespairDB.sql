-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema DespairDB
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema DespairDB
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `DespairDB` DEFAULT CHARACTER SET utf8 ;
USE `DespairDB` ;

-- -----------------------------------------------------
-- Table `DespairDB`.`User`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Users` (
  `UserID` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(100) NULL,
  `UserNickName` VARCHAR(45) NULL,
  `UserEmail` VARCHAR(150) NULL,
  `UserPassword` VARCHAR(20) NULL,
  PRIMARY KEY (`UserID`),
  UNIQUE INDEX `UserEmail_UNIQUE` (`UserEmail` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Business`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Business` (
  `BusinessID` INT NOT NULL AUTO_INCREMENT,
  `BusinessName` VARCHAR(45) NULL,
  `BusinessCountry` VARCHAR(45) NULL,
  `BusinessLogo` LONGTEXT NULL,
  `UserID` INT NOT NULL,
  PRIMARY KEY (`BusinessID`),
  INDEX `fk_Business_Users1_idx` (`UserID` ASC),
  CONSTRAINT `fk_Business_Users1`
    FOREIGN KEY (`UserID`)
    REFERENCES `DespairDB`.`Users` (`UserID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Categories`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Categories` (
  `CategoryID` INT NOT NULL AUTO_INCREMENT,
  `CategoryDescription` VARCHAR(45) NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`CategoryID`),
  INDEX `fk_Categories_Business1_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_Categories_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`BranchOffice`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`BranchOffice` (
  `BranchOfficeID` INT NOT NULL AUTO_INCREMENT,
  `BranchOfficeName` VARCHAR(100) NULL,
  `BranchOfficeAddress` VARCHAR(100) NULL,
  `BranchOfficeTelephone` VARCHAR(20) NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`BranchOfficeID`),
  UNIQUE INDEX `BranchOfficeLogin_UNIQUE` (`BranchOfficeAddress` ASC),
  INDEX `fk_BranchOffice_Business_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_BranchOffice_Business`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Inventaries`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Inventaries` (
  `InventoryID` INT NOT NULL AUTO_INCREMENT,
  `InventoryDescription` VARCHAR(100) NULL,
  `Quantity` INT NULL,
  `Price` DOUBLE NULL,
  `Tax` DOUBLE NULL,
  `InventoryImage` LONGTEXT NULL,
  `CodeBar` VARCHAR(100) NULL,
  `BusinessID` INT NOT NULL,
  `CategoryID` INT NOT NULL,
  PRIMARY KEY (`InventoryID`),
  INDEX `fk_Inventaries_Business1_idx` (`BusinessID` ASC),
  INDEX `fk_Inventaries_Categories1_idx` (`CategoryID` ASC),
  CONSTRAINT `fk_Inventaries_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Inventaries_Categories1`
    FOREIGN KEY (`CategoryID`)
    REFERENCES `DespairDB`.`Categories` (`CategoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`BranchOfficesInventary`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`BranchOfficesInventary` (
  `BranchOfficesInventaryID` INT NOT NULL AUTO_INCREMENT,
  `Description` VARCHAR(100) NULL,
  `Quantity` INT NULL,
  `Price` DOUBLE NULL,
  `CodeBar` VARCHAR(100) NULL,
  `BusinessID` INT NOT NULL,
  `InventoryID` INT NOT NULL,
  `BranchOfficesID` INT NOT NULL,
  PRIMARY KEY (`BranchOfficesInventaryID`),
  INDEX `fk_BranchOfficesInventary_BranchOffice1_idx` (`BranchOfficesID` ASC),
  INDEX `fk_BranchOfficesInventary_Business1_idx` (`BusinessID` ASC),
  INDEX `fk_BranchOfficesInventary_Inventaries1_idx` (`InventoryID` ASC),
  CONSTRAINT `fk_BranchOfficesInventary_BranchOffice1`
    FOREIGN KEY (`BranchOfficesID`)
    REFERENCES `DespairDB`.`BranchOffice` (`BranchOfficeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BranchOfficesInventary_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_BranchOfficesInventary_Inventaries1`
    FOREIGN KEY (`InventoryID`)
    REFERENCES `DespairDB`.`Inventaries` (`InventoryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`InvoiceDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`InvoiceDetail` (
  `InvoiceDetailID` INT NOT NULL AUTO_INCREMENT,
  `Quantity` INT NULL,
  `Discount` DOUBLE NULL,
  `BranchOfficesInventaryID` INT NOT NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`InvoiceDetailID`),
  INDEX `fk_InvoiceDetail_BranchOfficesInventary1_idx` (`BranchOfficesInventaryID` ASC),
  INDEX `fk_InvoiceDetail_Business1_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_InvoiceDetail_BranchOfficesInventary1`
    FOREIGN KEY (`BranchOfficesInventaryID`)
    REFERENCES `DespairDB`.`BranchOfficesInventary` (`BranchOfficesInventaryID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_InvoiceDetail_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Invoices`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Invoices` (
  `InvoiceID` INT NOT NULL AUTO_INCREMENT,
  `InvoiceDate` DATE NULL,
  `ClientName` VARCHAR(100) NULL,
  `ClientLastName` VARCHAR(100) NULL,
  `ClientNIT` VARCHAR(45) NULL,
  `Total` DOUBLE NULL,
  `BusinessID` INT NOT NULL,
  `InvoiceDetailID` INT NOT NULL,
  PRIMARY KEY (`InvoiceID`),
  INDEX `fk_Invoices_Business1_idx` (`BusinessID` ASC),
  INDEX `fk_Invoices_InvoiceDetail1_idx` (`InvoiceDetailID` ASC),
  CONSTRAINT `fk_Invoices_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Invoices_InvoiceDetail1`
    FOREIGN KEY (`InvoiceDetailID`)
    REFERENCES `DespairDB`.`InvoiceDetail` (`InvoiceDetailID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Employees`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Employees` (
  `EmployeeID` INT NOT NULL AUTO_INCREMENT,
  `EmployeeName` VARCHAR(100) NULL,
  `EmployeePhone` VARCHAR(100) NULL,
  `EmployeeAddress` VARCHAR(100) NULL,
  `EmployeeEmail` VARCHAR(150) NULL,
  `EmployeeAge` INT NULL,
  `EmployeeSalary` DOUBLE NULL,
  `EmployeeContratation` DATE NULL,
  `EmployeeRol` VARCHAR(150) NULL,
  `EmployeeImage` LONGTEXT NULL,
  `EmployeeUser` VARCHAR(100) NULL,
  `EmployeePassword` VARCHAR(100) NULL,
  `BranchOfficeID` INT NOT NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`EmployeeID`),
  INDEX `fk_Employees_BranchOffice1_idx` (`BranchOfficeID` ASC),
  INDEX `fk_Employees_Business1_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_Employees_BranchOffice1`
    FOREIGN KEY (`BranchOfficeID`)
    REFERENCES `DespairDB`.`BranchOffice` (`BranchOfficeID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Employees_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Providers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Providers` (
  `ProviderID` INT NOT NULL AUTO_INCREMENT,
  `ProviderName` VARCHAR(100) NULL,
  `ProviderAddress` VARCHAR(100) NULL,
  `ProviderPhone` VARCHAR(45) NULL,
  `ProviderEmail` LONGTEXT NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`ProviderID`),
  INDEX `fk_Providers_Business1_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_Providers_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Purchases`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Purchases` (
  `PurchaseID` INT NOT NULL AUTO_INCREMENT,
  `Date` DATE NULL,
  `Total` DOUBLE NULL,
  `ProviderID` INT NOT NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`PurchaseID`),
  INDEX `fk_Purchases_Providers1_idx` (`ProviderID` ASC),
  INDEX `fk_Purchases_Business1_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_Purchases_Providers1`
    FOREIGN KEY (`ProviderID`)
    REFERENCES `DespairDB`.`Providers` (`ProviderID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Purchases_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`PurchasesDetail`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`PurchasesDetail` (
  `PurchaseDetailID` INT NOT NULL AUTO_INCREMENT,
  `BusinessID` INT NOT NULL,
  `PurchaseID` INT NOT NULL,
  `Description` VARCHAR(100) NULL,
  `Price` DOUBLE NULL,
  `Quantity` INT NULL,
  `Total` DOUBLE NULL,
  PRIMARY KEY (`PurchaseDetailID`),
  INDEX `fk_PurchasesDetail_Business1_idx` (`BusinessID` ASC),
  INDEX `fk_PurchasesDetail_Purchases1_idx` (`PurchaseID` ASC),
  CONSTRAINT `fk_PurchasesDetail_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_PurchasesDetail_Purchases1`
    FOREIGN KEY (`PurchaseID`)
    REFERENCES `DespairDB`.`Purchases` (`PurchaseID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `DespairDB`.`Moves`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `DespairDB`.`Moves` (
  `MoveID` INT NOT NULL AUTO_INCREMENT,
  `Description` LONGTEXT NULL,
  `Total` DOUBLE NULL,
  `Date` DATE NULL,
  `BusinessID` INT NOT NULL,
  PRIMARY KEY (`MoveID`),
  INDEX `fk_Moves_Business1_idx` (`BusinessID` ASC),
  CONSTRAINT `fk_Moves_Business1`
    FOREIGN KEY (`BusinessID`)
    REFERENCES `DespairDB`.`Business` (`BusinessID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
