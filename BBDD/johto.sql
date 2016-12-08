-- MySQL Script generated by MySQL Workbench
-- 12/08/16 12:42:15
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema johto
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema johto
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `johto` DEFAULT CHARACTER SET utf8 ;
USE `johto` ;

-- -----------------------------------------------------
-- Table `johto`.`TipoCentro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`TipoCentro` (
  `tipo` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`tipo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Administrador`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Administrador` (
  `idAdministrador` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `telefono` INT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE INDEX `user_UNIQUE` (`user` ASC),
  UNIQUE INDEX `idAdministrador_UNIQUE` (`idAdministrador` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Centro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Centro` (
  `idCentro` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `direccion` VARCHAR(45) NOT NULL,
  `TipoCentro_tipo` VARCHAR(45) NOT NULL,
  `Administrador_idAdministrador` INT NOT NULL,
  PRIMARY KEY (`idCentro`),
  INDEX `fk_Centro_TipoCentro_idx` (`TipoCentro_tipo` ASC),
  INDEX `fk_Centro_Administrador1_idx` (`Administrador_idAdministrador` ASC),
  CONSTRAINT `fk_Centro_TipoCentro`
    FOREIGN KEY (`TipoCentro_tipo`)
    REFERENCES `johto`.`TipoCentro` (`tipo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Centro_Administrador1`
    FOREIGN KEY (`Administrador_idAdministrador`)
    REFERENCES `johto`.`Administrador` (`idAdministrador`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Profesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Profesor` (
  `idProfesor` INT NOT NULL,
  `tutorDe` INT NOT NULL,
  PRIMARY KEY (`idProfesor`),
  INDEX `fk_Profesor_Curso1_idx` (`tutorDe` ASC),
  CONSTRAINT `fk_Profesor_Curso1`
    FOREIGN KEY (`tutorDe`)
    REFERENCES `johto`.`Curso` (`idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Curso` (
  `idCurso` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NULL,
  `grupo` VARCHAR(45) NULL,
  `tutor` INT NOT NULL,
  PRIMARY KEY (`idCurso`),
  INDEX `fk_Curso_Profesor1_idx` (`tutor` ASC),
  CONSTRAINT `fk_Curso_Profesor1`
    FOREIGN KEY (`tutor`)
    REFERENCES `johto`.`Profesor` (`idProfesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Asignatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Asignatura` (
  `idAsignatura` INT NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  `curso` VARCHAR(45) NULL,
  PRIMARY KEY (`idAsignatura`),
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Asignatura_has_Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Asignatura_has_Curso` (
  `Asignatura_idAsignatura` INT NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  `Profesor_idProfesor` INT NOT NULL,
  PRIMARY KEY (`Asignatura_idAsignatura`, `Curso_idCurso`),
  INDEX `fk_Asignatura_has_Curso_Curso1_idx` (`Curso_idCurso` ASC),
  INDEX `fk_Asignatura_has_Curso_Asignatura1_idx` (`Asignatura_idAsignatura` ASC),
  INDEX `fk_Asignatura_has_Curso_Profesor1_idx` (`Profesor_idProfesor` ASC),
  CONSTRAINT `fk_Asignatura_has_Curso_Asignatura1`
    FOREIGN KEY (`Asignatura_idAsignatura`)
    REFERENCES `johto`.`Asignatura` (`idAsignatura`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asignatura_has_Curso_Curso1`
    FOREIGN KEY (`Curso_idCurso`)
    REFERENCES `johto`.`Curso` (`idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asignatura_has_Curso_Profesor1`
    FOREIGN KEY (`Profesor_idProfesor`)
    REFERENCES `johto`.`Profesor` (`idProfesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`InformeAlumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`InformeAlumno` (
  `numExpediente` INT NOT NULL,
  PRIMARY KEY (`numExpediente`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Padre`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Padre` (
  `idPadre` INT NOT NULL,
  `nombre` VARCHAR(45) NULL,
  `Alumno_idAlumno` INT NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idPadre`, `Alumno_idAlumno`),
  INDEX `fk_Padre_Alumno1_idx` (`Alumno_idAlumno` ASC),
  CONSTRAINT `fk_Padre_Alumno1`
    FOREIGN KEY (`Alumno_idAlumno`)
    REFERENCES `johto`.`Alumno` (`idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Alumno` (
  `idAlumno` INT NOT NULL,
  `InformeAlumno_numExpediente` INT NOT NULL,
  `nombre` VARCHAR(45) NOT NULL,
  `user` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL,
  `telefono` INT NULL,
  `Padre_idPadre` INT NOT NULL,
  PRIMARY KEY (`idAlumno`, `Padre_idPadre`),
  INDEX `fk_Alumno_InformeAlumno1_idx` (`InformeAlumno_numExpediente` ASC),
  INDEX `fk_Alumno_Padre1_idx` (`Padre_idPadre` ASC),
  CONSTRAINT `fk_Alumno_InformeAlumno1`
    FOREIGN KEY (`InformeAlumno_numExpediente`)
    REFERENCES `johto`.`InformeAlumno` (`numExpediente`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Alumno_Padre1`
    FOREIGN KEY (`Padre_idPadre`)
    REFERENCES `johto`.`Padre` (`idPadre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Asignatura_has_Curso_has_Alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Asignatura_has_Curso_has_Alumno` (
  `idAsignatura` INT NOT NULL,
  `idCurso` INT NOT NULL,
  `idAlumno` INT NOT NULL,
  PRIMARY KEY (`idAsignatura`, `idCurso`, `idAlumno`),
  INDEX `fk_Asignatura_has_Curso_has_Alumno_Alumno1_idx` (`idAlumno` ASC),
  INDEX `fk_Asignatura_has_Curso_has_Alumno_Asignatura_has_Curso1_idx` (`idAsignatura` ASC, `idCurso` ASC),
  CONSTRAINT `fk_Asignatura_has_Curso_has_Alumno_Asignatura_has_Curso1`
    FOREIGN KEY (`idAsignatura` , `idCurso`)
    REFERENCES `johto`.`Asignatura_has_Curso` (`Asignatura_idAsignatura` , `Curso_idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asignatura_has_Curso_has_Alumno_Alumno1`
    FOREIGN KEY (`idAlumno`)
    REFERENCES `johto`.`Alumno` (`idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Centro_has_Curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Centro_has_Curso` (
  `Centro_idCentro` INT NOT NULL,
  `Curso_idCurso` INT NOT NULL,
  PRIMARY KEY (`Centro_idCentro`, `Curso_idCurso`),
  INDEX `fk_Centro_has_Curso_Curso1_idx` (`Curso_idCurso` ASC),
  INDEX `fk_Centro_has_Curso_Centro1_idx` (`Centro_idCentro` ASC),
  CONSTRAINT `fk_Centro_has_Curso_Centro1`
    FOREIGN KEY (`Centro_idCentro`)
    REFERENCES `johto`.`Centro` (`idCentro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Centro_has_Curso_Curso1`
    FOREIGN KEY (`Curso_idCurso`)
    REFERENCES `johto`.`Curso` (`idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Chat`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Chat` (
  `Padre_idPadre` INT NOT NULL,
  `Profesor_idProfesor` INT NOT NULL,
  PRIMARY KEY (`Padre_idPadre`, `Profesor_idProfesor`),
  INDEX `fk_Padre_has_Profesor_Profesor1_idx` (`Profesor_idProfesor` ASC),
  INDEX `fk_Padre_has_Profesor_Padre1_idx` (`Padre_idPadre` ASC),
  CONSTRAINT `fk_Padre_has_Profesor_Padre1`
    FOREIGN KEY (`Padre_idPadre`)
    REFERENCES `johto`.`Padre` (`idPadre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Padre_has_Profesor_Profesor1`
    FOREIGN KEY (`Profesor_idProfesor`)
    REFERENCES `johto`.`Profesor` (`idProfesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Foro`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Foro` (
  `idForo` INT NOT NULL AUTO_INCREMENT,
  `tema` VARCHAR(45) NOT NULL,
  `Asignatura_has_Curso_Asignatura_idAsignatura` INT NOT NULL,
  `Asignatura_has_Curso_Curso_idCurso` INT NOT NULL,
  PRIMARY KEY (`idForo`, `Asignatura_has_Curso_Asignatura_idAsignatura`, `Asignatura_has_Curso_Curso_idCurso`),
  INDEX `fk_Foro_Asignatura_has_Curso1_idx` (`Asignatura_has_Curso_Asignatura_idAsignatura` ASC, `Asignatura_has_Curso_Curso_idCurso` ASC),
  CONSTRAINT `fk_Foro_Asignatura_has_Curso1`
    FOREIGN KEY (`Asignatura_has_Curso_Asignatura_idAsignatura` , `Asignatura_has_Curso_Curso_idCurso`)
    REFERENCES `johto`.`Asignatura_has_Curso` (`Asignatura_idAsignatura` , `Curso_idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Comentario_alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Comentario_alumno` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `texto` VARCHAR(45) NOT NULL,
  `Foro_idForo` INT NOT NULL,
  `Alumno_idAlumno` INT NOT NULL,
  `Alumno_Padre_idPadre` INT NOT NULL,
  PRIMARY KEY (`idComentario`, `Foro_idForo`, `Alumno_idAlumno`, `Alumno_Padre_idPadre`),
  INDEX `fk_Comentario_Foro1_idx` (`Foro_idForo` ASC),
  INDEX `fk_Comentario_alumno_Alumno1_idx` (`Alumno_idAlumno` ASC, `Alumno_Padre_idPadre` ASC),
  CONSTRAINT `fk_Comentario_Foro1`
    FOREIGN KEY (`Foro_idForo`)
    REFERENCES `johto`.`Foro` (`idForo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_alumno_Alumno1`
    FOREIGN KEY (`Alumno_idAlumno` , `Alumno_Padre_idPadre`)
    REFERENCES `johto`.`Alumno` (`idAlumno` , `Padre_idPadre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Comunicado`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Comunicado` (
  `idcomunicado` INT NOT NULL AUTO_INCREMENT,
  `tipo` VARCHAR(45) NULL,
  `texto` LONGTEXT NULL,
  `firmado` VARCHAR(45) BINARY NULL,
  `Asignatura_has_Curso_Asignatura_idAsignatura` INT NOT NULL,
  `Asignatura_has_Curso_Curso_idCurso` INT NOT NULL,
  `Alumno_idAlumno` INT NOT NULL,
  `Alumno_Padre_idPadre` INT NOT NULL,
  PRIMARY KEY (`idcomunicado`, `Asignatura_has_Curso_Asignatura_idAsignatura`, `Asignatura_has_Curso_Curso_idCurso`),
  INDEX `fk_Comunicado_Asignatura_has_Curso1_idx` (`Asignatura_has_Curso_Asignatura_idAsignatura` ASC, `Asignatura_has_Curso_Curso_idCurso` ASC),
  INDEX `fk_Comunicado_Alumno1_idx` (`Alumno_idAlumno` ASC, `Alumno_Padre_idPadre` ASC),
  CONSTRAINT `fk_Comunicado_Asignatura_has_Curso1`
    FOREIGN KEY (`Asignatura_has_Curso_Asignatura_idAsignatura` , `Asignatura_has_Curso_Curso_idCurso`)
    REFERENCES `johto`.`Asignatura_has_Curso` (`Asignatura_idAsignatura` , `Curso_idCurso`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comunicado_Alumno1`
    FOREIGN KEY (`Alumno_idAlumno` , `Alumno_Padre_idPadre`)
    REFERENCES `johto`.`Alumno` (`idAlumno` , `Padre_idPadre`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Comentarios_sobre_el_alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Comentarios_sobre_el_alumno` (
  `idComentarios_sobre_el_alumno` INT NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NULL,
  `texto` MEDIUMTEXT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` INT NOT NULL,
  PRIMARY KEY (`idComentarios_sobre_el_alumno`, `Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`),
  INDEX `fk_Comentarios_sobre_el_alumno_Asignatura_has_Curso_has_Alu_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura` ASC, `Asignatura_has_Curso_has_Alumno_idCurso` ASC, `Asignatura_has_Curso_has_Alumno_idAlumno` ASC),
  CONSTRAINT `fk_Comentarios_sobre_el_alumno_Asignatura_has_Curso_has_Alumno1`
    FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura` , `Asignatura_has_Curso_has_Alumno_idCurso` , `Asignatura_has_Curso_has_Alumno_idAlumno`)
    REFERENCES `johto`.`Asignatura_has_Curso_has_Alumno` (`idAsignatura` , `idCurso` , `idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Tarea`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Tarea` (
  `idTareas` INT NOT NULL,
  `descripcion` VARCHAR(45) NOT NULL,
  `fecha_limite` DATETIME NULL,
  `completada` VARCHAR(45) BINARY NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` INT NOT NULL,
  PRIMARY KEY (`idTareas`),
  INDEX `fk_Tarea_Asignatura_Curso_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura` ASC, `Asignatura_has_Curso_has_Alumno_idCurso` ASC, `Asignatura_has_Curso_has_Alumno_idAlumno` ASC),
  CONSTRAINT `fk_Tarea_Asignatura_Curso_Alumno1`
    FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura` , `Asignatura_has_Curso_has_Alumno_idCurso` , `Asignatura_has_Curso_has_Alumno_idAlumno`)
    REFERENCES `johto`.`Asignatura_has_Curso_has_Alumno` (`idAsignatura` , `idCurso` , `idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Asistencia`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Asistencia` (
  `idAsistencia` INT NOT NULL,
  `falta` VARCHAR(45) BINARY NOT NULL,
  `fecha` DATETIME NOT NULL,
  `descripcion` VARCHAR(45) NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` INT NOT NULL,
  PRIMARY KEY (`idAsistencia`, `Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`),
  INDEX `fk_Asistencia_Asignatura_has_Curso_has_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura` ASC, `Asignatura_has_Curso_has_Alumno_idCurso` ASC, `Asignatura_has_Curso_has_Alumno_idAlumno` ASC),
  CONSTRAINT `fk_Asistencia_Asignatura_has_Curso_has_Alumno1`
    FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura` , `Asignatura_has_Curso_has_Alumno_idCurso` , `Asignatura_has_Curso_has_Alumno_idAlumno`)
    REFERENCES `johto`.`Asignatura_has_Curso_has_Alumno` (`idAsignatura` , `idCurso` , `idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Mencion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Mencion` (
  `idMenciones` INT NOT NULL,
  `titulo` VARCHAR(45) NULL,
  `descripcion` VARCHAR(45) NULL,
  `idAsignatura` INT NOT NULL,
  `idCurso` INT NOT NULL,
  `idAlumno` INT NOT NULL,
  PRIMARY KEY (`idMenciones`),
  INDEX `fk_Mencion_Asignatura_has_Curso_has_Alumno1_idx` (`idAsignatura` ASC, `idCurso` ASC, `idAlumno` ASC),
  CONSTRAINT `fk_Mencion_Asignatura_has_Curso_has_Alumno1`
    FOREIGN KEY (`idAsignatura` , `idCurso` , `idAlumno`)
    REFERENCES `johto`.`Asignatura_has_Curso_has_Alumno` (`idAsignatura` , `idCurso` , `idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Comentario_profesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Comentario_profesor` (
  `idComentario` INT NOT NULL AUTO_INCREMENT,
  `texto` VARCHAR(45) NOT NULL,
  `Foro_idForo` INT NOT NULL,
  `Profesor_idProfesor` INT NOT NULL,
  PRIMARY KEY (`idComentario`, `Foro_idForo`, `Profesor_idProfesor`),
  INDEX `fk_Comentario_Foro1_idx` (`Foro_idForo` ASC),
  INDEX `fk_Comentario_profesor_Profesor1_idx` (`Profesor_idProfesor` ASC),
  CONSTRAINT `fk_Comentario_Foro10`
    FOREIGN KEY (`Foro_idForo`)
    REFERENCES `johto`.`Foro` (`idForo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_profesor_Profesor1`
    FOREIGN KEY (`Profesor_idProfesor`)
    REFERENCES `johto`.`Profesor` (`idProfesor`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `johto`.`Examen`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `johto`.`Examen` (
  `idExamen` INT NOT NULL,
  `fecha` DATETIME NULL,
  `nota` DECIMAL(2) NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` INT NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` INT NOT NULL,
  PRIMARY KEY (`idExamen`, `Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`),
  INDEX `fk_Examen_Asignatura_has_Curso_has_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura` ASC, `Asignatura_has_Curso_has_Alumno_idCurso` ASC, `Asignatura_has_Curso_has_Alumno_idAlumno` ASC),
  CONSTRAINT `fk_Examen_Asignatura_has_Curso_has_Alumno1`
    FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura` , `Asignatura_has_Curso_has_Alumno_idCurso` , `Asignatura_has_Curso_has_Alumno_idAlumno`)
    REFERENCES `johto`.`Asignatura_has_Curso_has_Alumno` (`idAsignatura` , `idCurso` , `idAlumno`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
