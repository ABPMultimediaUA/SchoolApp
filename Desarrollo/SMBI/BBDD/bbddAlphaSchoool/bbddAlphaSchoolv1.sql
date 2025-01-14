CREATE DATABASE  IF NOT EXISTS `alpha` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `alpha`;
-- MySQL dump 10.13  Distrib 5.7.12, for Win64 (x86_64)
--
-- Host: localhost    Database: alpha
-- ------------------------------------------------------
-- Server version	5.7.16-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`idAdministrador`),
  UNIQUE KEY `user_UNIQUE` (`user`),
  UNIQUE KEY `idAdministrador_UNIQUE` (`idAdministrador`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (1,'Manuel','Romero Martínez','manrom','1234','mrm92@alu.ua.es',666666666),(2,'Ricardo','Espinosa Soriano','richiesp','1234','res15@alu.ua.es',666666666),(3,'Antonio','Martínez Galvañ','antonio','1234','amg259@alu.ua.es',666666666),(4,'Jorge','Cabanes Pastor','georgedelajungla','1234','jcp16@alu.ua.es',666666666),(5,'Nahiara','Latorre Gómez','nahis19','1234','nlg22@alu.ua.es',666666666);
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alumno`
--

DROP TABLE IF EXISTS `alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `alumno` (
  `idAlumno` int(11) NOT NULL,
  `InformeAlumno_numExpediente` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  PRIMARY KEY (`idAlumno`),
  KEY `fk_Alumno_InformeAlumno1_idx` (`InformeAlumno_numExpediente`),
  CONSTRAINT `fk_Alumno_InformeAlumno1` FOREIGN KEY (`InformeAlumno_numExpediente`) REFERENCES `expediente` (`numExpediente`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alumno`
--

LOCK TABLES `alumno` WRITE;
/*!40000 ALTER TABLE `alumno` DISABLE KEYS */;
INSERT INTO `alumno` VALUES (1,1,'Ruttinger','Summers','101summers','1234','summers101@alu.ua.es',666666666,NULL),(2,2,'Zacarías','Piñedo Valderrama','102zacary','1234','zpv2@alu.ua.es',NULL,NULL),(3,3,'Isabel María','Botías Torres','103isamari','1234','imbt3@alu.ua.es',NULL,NULL),(4,4,'Priscila','Ríos de Luca','104pris','1234','prdl4@alu.ua.es',NULL,NULL),(5,5,'Gema','Sánchez Núñez','105gsn','1234','gmsn5@alu.ua.es',NULL,NULL),(6,6,'Brayan','Bolívar Guevara','106bbg','1234','bbg6@alu.ua.es',NULL,NULL),(7,7,'Jesús','Martínez Ramos','107jmr','1234','jmr@alu.ua.es',NULL,NULL),(8,8,'Manuel','García Quesada','108mgq','1234','mgq8@alu.ua.es',NULL,NULL),(9,9,'Héctor','Gallego Moreno','109hgm','1234','hgm9@alu.ua.es',NULL,NULL);
/*!40000 ALTER TABLE `alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura`
--

DROP TABLE IF EXISTS `asignatura`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignatura` (
  `idAsignatura` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `curso` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idAsignatura`),
  UNIQUE KEY `nombre_UNIQUE` (`nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura`
--

LOCK TABLES `asignatura` WRITE;
/*!40000 ALTER TABLE `asignatura` DISABLE KEYS */;
INSERT INTO `asignatura` VALUES (1,'Conocimiento del medio','Primero'),(2,'Matemáticas','Primero'),(3,'Lengua','Primero'),(4,'Plástica','Primero'),(5,'Educación física','Primero'),(6,'Inglés','Primero'),(7,'Informática','Primero'),(8,'Tutoría','primero');
/*!40000 ALTER TABLE `asignatura` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura_has_curso`
--

DROP TABLE IF EXISTS `asignatura_has_curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignatura_has_curso` (
  `Asignatura_idAsignatura` int(11) NOT NULL,
  `Curso_idCurso` int(11) NOT NULL,
  `Profesor_idProfesor` int(11) NOT NULL,
  PRIMARY KEY (`Asignatura_idAsignatura`,`Curso_idCurso`),
  KEY `fk_Asignatura_has_Curso_Curso1_idx` (`Curso_idCurso`),
  KEY `fk_Asignatura_has_Curso_Asignatura1_idx` (`Asignatura_idAsignatura`),
  KEY `fk_Asignatura_has_Curso_Profesor1_idx` (`Profesor_idProfesor`),
  CONSTRAINT `fk_Asignatura_has_Curso_Asignatura1` FOREIGN KEY (`Asignatura_idAsignatura`) REFERENCES `asignatura` (`idAsignatura`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asignatura_has_Curso_Curso1` FOREIGN KEY (`Curso_idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asignatura_has_Curso_Profesor1` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura_has_curso`
--

LOCK TABLES `asignatura_has_curso` WRITE;
/*!40000 ALTER TABLE `asignatura_has_curso` DISABLE KEYS */;
INSERT INTO `asignatura_has_curso` VALUES (1,1,1),(8,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6),(7,1,7);
/*!40000 ALTER TABLE `asignatura_has_curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asignatura_has_curso_has_alumno`
--

DROP TABLE IF EXISTS `asignatura_has_curso_has_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asignatura_has_curso_has_alumno` (
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idAsignatura`,`idCurso`,`idAlumno`),
  KEY `fk_Asignatura_has_Curso_has_Alumno_Alumno1_idx` (`idAlumno`),
  KEY `fk_Asignatura_has_Curso_has_Alumno_Asignatura_has_Curso1_idx` (`idAsignatura`,`idCurso`),
  CONSTRAINT `fk_Asignatura_has_Curso_has_Alumno_Alumno1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asignatura_has_Curso_has_Alumno_Asignatura_has_Curso1` FOREIGN KEY (`idAsignatura`, `idCurso`) REFERENCES `asignatura_has_curso` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asignatura_has_curso_has_alumno`
--

LOCK TABLES `asignatura_has_curso_has_alumno` WRITE;
/*!40000 ALTER TABLE `asignatura_has_curso_has_alumno` DISABLE KEYS */;
INSERT INTO `asignatura_has_curso_has_alumno` VALUES (1,1,1),(2,1,1),(3,1,1),(1,1,2),(2,1,2),(3,1,2),(1,1,3),(2,1,3),(3,1,3),(1,1,4),(1,1,5),(1,1,6),(1,1,7);
/*!40000 ALTER TABLE `asignatura_has_curso_has_alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `asistencia`
--

DROP TABLE IF EXISTS `asistencia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `asistencia` (
  `idAsistencia` int(11) NOT NULL,
  `falta` tinyint(1) DEFAULT NULL,
  `fecha` datetime NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idAsistencia`,`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  KEY `fk_Asistencia_Asignatura_has_Curso_has_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  CONSTRAINT `fk_Asistencia_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencia`
--

LOCK TABLES `asistencia` WRITE;
/*!40000 ALTER TABLE `asistencia` DISABLE KEYS */;
INSERT INTO `asistencia` VALUES (1,0,'2016-12-09 01:03:58','No ha faltado a clase :)',1,1,1);
/*!40000 ALTER TABLE `asistencia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `centro`
--

DROP TABLE IF EXISTS `centro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `centro` (
  `idCentro` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `TipoCentro_tipo` varchar(45) NOT NULL,
  `Administrador_idAdministrador` int(11) NOT NULL,
  PRIMARY KEY (`idCentro`),
  KEY `fk_Centro_TipoCentro_idx` (`TipoCentro_tipo`),
  KEY `fk_Centro_Administrador1_idx` (`Administrador_idAdministrador`),
  CONSTRAINT `fk_Centro_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Centro_TipoCentro` FOREIGN KEY (`TipoCentro_tipo`) REFERENCES `tipocentro` (`tipo`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `centro`
--

LOCK TABLES `centro` WRITE;
/*!40000 ALTER TABLE `centro` DISABLE KEYS */;
INSERT INTO `centro` VALUES (1,'Vasco Núñez de Balboa','Avenida de Galileo 13','1',1),(2,'Bautista Lledó','Calle Salazar Gallardo 45','1',2);
/*!40000 ALTER TABLE `centro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chat` (
  `Profesor_idProfesor` int(11) NOT NULL,
  `Padre_Alumno_idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`Profesor_idProfesor`,`Padre_Alumno_idAlumno`),
  KEY `fk_Padre_has_Profesor_Profesor1_idx` (`Profesor_idProfesor`),
  KEY `fk_Chat_Padre1_idx` (`Padre_Alumno_idAlumno`),
  CONSTRAINT `fk_Chat_Padre1` FOREIGN KEY (`Padre_Alumno_idAlumno`) REFERENCES `padre` (`Alumno_idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Padre_has_Profesor_Profesor1` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario_alumno`
--

DROP TABLE IF EXISTS `comentario_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentario_alumno` (
  `idComentario` int(11) NOT NULL AUTO_INCREMENT,
  `texto` varchar(45) NOT NULL,
  `Foro_idForo` int(11) NOT NULL,
  `Alumno_idAlumno` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idComentario`,`Foro_idForo`,`Alumno_idAlumno`),
  KEY `fk_Comentario_Foro1_idx` (`Foro_idForo`),
  KEY `fk_Comentario_alumno_Alumno1_idx` (`Alumno_idAlumno`),
  CONSTRAINT `fk_Comentario_Foro1` FOREIGN KEY (`Foro_idForo`) REFERENCES `foro` (`idForo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_alumno_Alumno1` FOREIGN KEY (`Alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario_alumno`
--

LOCK TABLES `comentario_alumno` WRITE;
/*!40000 ALTER TABLE `comentario_alumno` DISABLE KEYS */;
INSERT INTO `comentario_alumno` VALUES (1,'No me entero de este tema xD',1,1,'2016-12-08 19:07:00');
/*!40000 ALTER TABLE `comentario_alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario_profesor`
--

DROP TABLE IF EXISTS `comentario_profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentario_profesor` (
  `idComentario` int(11) NOT NULL AUTO_INCREMENT,
  `texto` varchar(45) NOT NULL,
  `Foro_idForo` int(11) NOT NULL,
  `Profesor_idProfesor` int(11) NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`idComentario`,`Foro_idForo`,`Profesor_idProfesor`),
  KEY `fk_Comentario_Foro1_idx` (`Foro_idForo`),
  KEY `fk_Comentario_profesor_Profesor1_idx` (`Profesor_idProfesor`),
  CONSTRAINT `fk_Comentario_Foro10` FOREIGN KEY (`Foro_idForo`) REFERENCES `foro` (`idForo`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comentario_profesor_Profesor1` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario_profesor`
--

LOCK TABLES `comentario_profesor` WRITE;
/*!40000 ALTER TABLE `comentario_profesor` DISABLE KEYS */;
INSERT INTO `comentario_profesor` VALUES (1,'Pues a estudiar se ha dicho :)',1,1,'2016-12-08 19:12:00');
/*!40000 ALTER TABLE `comentario_profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentarios_sobre_el_alumno`
--

DROP TABLE IF EXISTS `comentarios_sobre_el_alumno`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comentarios_sobre_el_alumno` (
  `idComentarios_sobre_el_alumno` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(45) DEFAULT NULL,
  `texto` mediumtext NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idComentarios_sobre_el_alumno`,`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  KEY `fk_Comentarios_sobre_el_alumno_Asignatura_has_Curso_has_Alu_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  CONSTRAINT `fk_Comentarios_sobre_el_alumno_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentarios_sobre_el_alumno`
--

LOCK TABLES `comentarios_sobre_el_alumno` WRITE;
/*!40000 ALTER TABLE `comentarios_sobre_el_alumno` DISABLE KEYS */;
INSERT INTO `comentarios_sobre_el_alumno` VALUES (1,'Comportamiento poco apropiado','Don Summers ha demostrado en los últimos días un desdén indeseable que perturba el clima de la asignatura',1,1,1);
/*!40000 ALTER TABLE `comentarios_sobre_el_alumno` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comunicado`
--

DROP TABLE IF EXISTS `comunicado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comunicado` (
  `idcomunicado` int(11) NOT NULL AUTO_INCREMENT,
  `tipo` varchar(45) DEFAULT NULL,
  `texto` longtext,
  `firmado` varchar(45) DEFAULT NULL,
  `Asignatura_has_Curso_Asignatura_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_Curso_idCurso` int(11) NOT NULL,
  `Alumno_idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idcomunicado`,`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`),
  KEY `fk_Comunicado_Asignatura_has_Curso1_idx` (`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`),
  KEY `fk_Comunicado_Alumno1_idx` (`Alumno_idAlumno`),
  CONSTRAINT `fk_Comunicado_Alumno1` FOREIGN KEY (`Alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_Comunicado_Asignatura_has_Curso1` FOREIGN KEY (`Asignatura_has_Curso_Asignatura_idAsignatura`, `Asignatura_has_Curso_Curso_idCurso`) REFERENCES `asignatura_has_curso` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comunicado`
--

LOCK TABLES `comunicado` WRITE;
/*!40000 ALTER TABLE `comunicado` DISABLE KEYS */;
INSERT INTO `comunicado` VALUES (1,'Reunión','Se convoca a los padres de los alumnos de Primero A a una reunión en el salón de actos mañana','false',1,1,1);
/*!40000 ALTER TABLE `comunicado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `curso`
--

DROP TABLE IF EXISTS `curso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(45) DEFAULT NULL,
  `grupo` varchar(45) DEFAULT NULL,
  `Profesor_idProfesor` int(11) NOT NULL,
  `centro_idCentro` int(11) NOT NULL,
  PRIMARY KEY (`idCurso`,`centro_idCentro`),
  KEY `fk_Curso_Profesor1_idx` (`Profesor_idProfesor`),
  KEY `fk_curso_centro1_idx` (`centro_idCentro`),
  CONSTRAINT `fk_Curso_Profesor1` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_curso_centro1` FOREIGN KEY (`centro_idCentro`) REFERENCES `centro` (`idCentro`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `curso`
--

LOCK TABLES `curso` WRITE;
/*!40000 ALTER TABLE `curso` DISABLE KEYS */;
INSERT INTO `curso` VALUES (1,'Primero','A',1,1),(2,'Primero','B',2,1),(3,'Segundo','A',3,1),(4,'Segundo','B',4,1),(5,'Tercero','A',5,1),(6,'Tercero','B',6,1),(7,'Cuarto','A',7,1),(8,'Cuarto','B',8,1),(9,'Quinto','A',9,1),(10,'Quinto','B',10,1),(11,'Sexto','A',11,1),(12,'Sexto','B',12,1);
/*!40000 ALTER TABLE `curso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `examen`
--

DROP TABLE IF EXISTS `examen`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `examen` (
  `idExamen` int(11) NOT NULL,
  `fecha` datetime DEFAULT NULL,
  `nota` decimal(2,0) DEFAULT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idExamen`,`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  KEY `fk_Examen_Asignatura_has_Curso_has_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  CONSTRAINT `fk_Examen_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `examen`
--

LOCK TABLES `examen` WRITE;
/*!40000 ALTER TABLE `examen` DISABLE KEYS */;
INSERT INTO `examen` VALUES (1,'2016-12-08 18:57:59',5,1,1,1);
/*!40000 ALTER TABLE `examen` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `expediente`
--

DROP TABLE IF EXISTS `expediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `expediente` (
  `numExpediente` int(11) NOT NULL,
  PRIMARY KEY (`numExpediente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `expediente`
--

LOCK TABLES `expediente` WRITE;
/*!40000 ALTER TABLE `expediente` DISABLE KEYS */;
INSERT INTO `expediente` VALUES (1),(2),(3),(4),(5),(6),(7),(8),(9),(10),(11),(12),(13),(14),(15);
/*!40000 ALTER TABLE `expediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `foro`
--

DROP TABLE IF EXISTS `foro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `foro` (
  `idForo` int(11) NOT NULL AUTO_INCREMENT,
  `tema` varchar(45) NOT NULL,
  `Asignatura_has_Curso_Asignatura_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_Curso_idCurso` int(11) NOT NULL,
  PRIMARY KEY (`idForo`,`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`),
  KEY `fk_Foro_Asignatura_has_Curso1_idx` (`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`),
  CONSTRAINT `fk_Foro_Asignatura_has_Curso1` FOREIGN KEY (`Asignatura_has_Curso_Asignatura_idAsignatura`, `Asignatura_has_Curso_Curso_idCurso`) REFERENCES `asignatura_has_curso` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `foro`
--

LOCK TABLES `foro` WRITE;
/*!40000 ALTER TABLE `foro` DISABLE KEYS */;
INSERT INTO `foro` VALUES (1,'Los ecosistemas',1,1);
/*!40000 ALTER TABLE `foro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `material`
--

DROP TABLE IF EXISTS `material`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `material` (
  `idmaterial` int(11) NOT NULL,
  `contenido` longblob NOT NULL,
  `asignatura_has_curso_Asignatura_idAsignatura` int(11) NOT NULL,
  `asignatura_has_curso_Curso_idCurso` int(11) NOT NULL,
  PRIMARY KEY (`idmaterial`,`asignatura_has_curso_Asignatura_idAsignatura`,`asignatura_has_curso_Curso_idCurso`),
  KEY `fk_material_asignatura_has_curso1_idx` (`asignatura_has_curso_Asignatura_idAsignatura`,`asignatura_has_curso_Curso_idCurso`),
  CONSTRAINT `fk_material_asignatura_has_curso1` FOREIGN KEY (`asignatura_has_curso_Asignatura_idAsignatura`, `asignatura_has_curso_Curso_idCurso`) REFERENCES `asignatura_has_curso` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `material`
--

LOCK TABLES `material` WRITE;
/*!40000 ALTER TABLE `material` DISABLE KEYS */;
/*!40000 ALTER TABLE `material` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mencion`
--

DROP TABLE IF EXISTS `mencion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mencion` (
  `idMenciones` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `descripcion` longtext,
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idMenciones`),
  KEY `fk_Mencion_Asignatura_has_Curso_has_Alumno1_idx` (`idAsignatura`,`idCurso`,`idAlumno`),
  CONSTRAINT `fk_Mencion_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`idAsignatura`, `idCurso`, `idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mencion`
--

LOCK TABLES `mencion` WRITE;
/*!40000 ALTER TABLE `mencion` DISABLE KEYS */;
INSERT INTO `mencion` VALUES (1,'Premio por excelecia','por su sobresaliente labor en el campo de la excelencia',1,1,1);
/*!40000 ALTER TABLE `mencion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mensaje`
--

DROP TABLE IF EXISTS `mensaje`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mensaje` (
  `idmensaje` int(11) NOT NULL,
  `texto` longtext NOT NULL,
  `fecha` datetime NOT NULL,
  `chat_Profesor_idProfesor` int(11) NOT NULL,
  `chat_Padre_Alumno_idAlumno` int(11) NOT NULL,
  `profesor` tinyint(1) NOT NULL,
  PRIMARY KEY (`idmensaje`,`chat_Profesor_idProfesor`,`chat_Padre_Alumno_idAlumno`),
  KEY `fk_mensaje_profesor_chat1_idx` (`chat_Profesor_idProfesor`,`chat_Padre_Alumno_idAlumno`),
  CONSTRAINT `fk_mensaje_profesor_chat1` FOREIGN KEY (`chat_Profesor_idProfesor`, `chat_Padre_Alumno_idAlumno`) REFERENCES `chat` (`Profesor_idProfesor`, `Padre_Alumno_idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mensaje`
--

LOCK TABLES `mensaje` WRITE;
/*!40000 ALTER TABLE `mensaje` DISABLE KEYS */;
/*!40000 ALTER TABLE `mensaje` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `padre`
--

DROP TABLE IF EXISTS `padre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `padre` (
  `idPadre` int(11) DEFAULT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `user` varchar(45) NOT NULL,
  `Alumno_idAlumno` int(11) NOT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`Alumno_idAlumno`),
  CONSTRAINT `fk_Padre_Alumno1` FOREIGN KEY (`Alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `padre`
--

LOCK TABLES `padre` WRITE;
/*!40000 ALTER TABLE `padre` DISABLE KEYS */;
INSERT INTO `padre` VALUES (1,'Rodolfo','Summers','1234','rudolf',1,'45825463T','lejia@neutrex.com',654654654);
/*!40000 ALTER TABLE `padre` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `profesor`
--

DROP TABLE IF EXISTS `profesor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `profesor` (
  `idProfesor` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dni` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  PRIMARY KEY (`idProfesor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `profesor`
--

LOCK TABLES `profesor` WRITE;
/*!40000 ALTER TABLE `profesor` DISABLE KEYS */;
INSERT INTO `profesor` VALUES (1,'Diego','Mendoza','dm1@alu.ua.es','4545647P',666666666),(2,'Bernardo','Galipienso','bg2@alu.ua.es','85285285J',666666666),(3,'Luisa','Ramos','bg2@alu.ua.es','85285285J',666666666),(4,'Juan','Salazar','bg2@alu.ua.es','85285285J',666666666),(5,'Angustias','López','bg2@alu.ua.es','85285285J',666666666),(6,'Josefa','Saramago','bg2@alu.ua.es','85285285J',666666666),(7,'Guillermo','Mata','bg2@alu.ua.es','85285285J',666666666),(8,'Carmen','San Diego','bg2@alu.ua.es','85285285J',666666666),(9,'Matilde','Salvador i Segarra','bg2@alu.ua.es','85285285J',666666666),(10,'Antonio','García Cayuelas','bg2@alu.ua.es','85285285J',666666666),(11,'Olegario','Do Marco Seller','bg2@alu.ua.es','85285285J',666666666),(12,'Margarita','Sastre','bg2@alu.ua.es','85285285J',666666666),(13,'Miguel','Serrano','bg2@alu.ua.es','85285285J',666666666),(14,'Santiago','Colomar','bg2@alu.ua.es','85285285J',666666666),(15,'Pep','Llorens','bg2@alu.ua.es','85285285J',666666666);
/*!40000 ALTER TABLE `profesor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tarea`
--

DROP TABLE IF EXISTS `tarea`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tarea` (
  `idTareas` int(11) NOT NULL,
  `descripcion` varchar(45) NOT NULL,
  `fecha_limite` datetime DEFAULT NULL,
  `completada` tinyint(1) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL,
  PRIMARY KEY (`idTareas`),
  KEY `fk_Tarea_Asignatura_Curso_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  CONSTRAINT `fk_Tarea_Asignatura_Curso_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tarea`
--

LOCK TABLES `tarea` WRITE;
/*!40000 ALTER TABLE `tarea` DISABLE KEYS */;
INSERT INTO `tarea` VALUES (1,'Describir el ecosistema del gusano de seda','2016-12-08 23:20:56',0,1,1,1);
/*!40000 ALTER TABLE `tarea` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipocentro`
--

DROP TABLE IF EXISTS `tipocentro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tipocentro` (
  `tipo` varchar(45) NOT NULL,
  PRIMARY KEY (`tipo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipocentro`
--

LOCK TABLES `tipocentro` WRITE;
/*!40000 ALTER TABLE `tipocentro` DISABLE KEYS */;
INSERT INTO `tipocentro` VALUES ('1'),('2');
/*!40000 ALTER TABLE `tipocentro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-12-09  1:35:40
