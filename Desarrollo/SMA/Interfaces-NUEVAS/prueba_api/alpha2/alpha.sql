-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 01-04-2017 a las 20:14:15
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 7.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `alpha`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `dni` varchar(10) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `administrador`
--

INSERT INTO `administrador` (`idAdministrador`, `nombre`, `apellidos`, `user`, `password`, `email`, `telefono`, `dni`) VALUES
(1, 'Manuel', 'Romero Martínez', 'manrom', '1234', 'mrm92@alu.ua.es', 666666666, ''),
(2, 'Ricardo', 'Espinosa Soriano', 'richiesp', '1234', 'res15@alu.ua.es', 666666666, ''),
(3, 'Antonio', 'Martínez Galvañ', 'antonio', '1234', 'amg259@alu.ua.es', 666666666, ''),
(4, 'Jorge', 'Cabanes Pastor', 'georgedelajungla', '1234', 'jcp16@alu.ua.es', 666666666, ''),
(5, 'Nahiara', 'Latorre Gómez', 'nahis19', '1234', 'nlg22@alu.ua.es', 666666666, ''),
(6, 'Juan', 'Sánchez Almendro', 'juansan', '1234', 'juansan@alu.ua.es', 966666666, '56475647O'),
(7, 'Matusalén', 'Camarón Salazar', 'matuselah', '1234', 'matu@lol.co', 123456789, '77777777W');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno`
--

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
  `curso_idCurso` int(11) NOT NULL,
  `curso_centro_idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`idAlumno`, `InformeAlumno_numExpediente`, `nombre`, `apellidos`, `user`, `password`, `email`, `telefono`, `dni`, `curso_idCurso`, `curso_centro_idCentro`) VALUES
(1, 1, 'Ruttinger', 'Summers', '101summers', '1234', 'summers101@alu.ua.es', 666666666, NULL, 1, 1),
(2, 2, 'Zacarías', 'Piñedo Valderrama', '102zacary', '1234', 'zpv2@alu.ua.es', NULL, NULL, 1, 1),
(3, 3, 'Isabel María', 'Botías Torres', '103isamari', '1234', 'imbt3@alu.ua.es', NULL, NULL, 1, 1),
(4, 4, 'Priscila', 'Ríos de Luca', '104pris', '1234', 'prdl4@alu.ua.es', NULL, NULL, 1, 1),
(5, 5, 'Gema', 'Sánchez Núñez', '105gsn', '1234', 'gmsn5@alu.ua.es', 0, '22222222M', 1, 1),
(11, 11, 'Pacharán', 'Garmendia Salmorejo', 'pachirisu', '1234', 'pachirisu@jojo.com', 987654321, '88888888P', 1, 1),
(12, 12, 'Patxi', 'Goicoetxea Zarratrústegui', 'aivalaostiapatxi', '1234', 'patxi@euskadi.com', 654654654, '65465465P', 1, 1),
(13, 13, 'Mariquita', 'Pérez', 'deathmetal45', '1234', 'mariquita@metal.com', 222222222, '21212121O', 1, 1),
(14, 14, 'Sanchopanza', 'Guano Machete', 'sanchoquijotequijotesancho', '1234', 'sancho@lol.co', 987654321, '55555555K', 1, 1),
(15, 15, 'Maluma', 'Melanoma', 'melapela', '1234', 'melamalu@lol.co', 666666666, '66666666L', 2, 2),
(16, 16, 'Alaska', 'Nebraska', 'alaskanebraska', '1234', 'nebra@lol.co', 666666666, '66666666T', 1, 1),
(17, 17, 'Rocket', 'Man', 'roman', '1234', 'roman@lol.co', 666666666, '76214785P', 1, 2),
(18, 18, 'Josep', 'Batman', 'yosoylanoche', '1234', 'noche@lol.co', 665555666, '66655555E', 2, 1),
(19, 19, 'Tomás', 'Turbado', 'tommy', '1234', 'tommy@lol.co', 666655566, '66555666L', 1, 1),
(20, 20, 'Donpi', 'Topocho', 'donpitopocho', '1234', 'pitopocho@lol.co', 633366666, '66333666L', 2, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_has_curso`
--

CREATE TABLE `alumno_has_curso` (
  `idAlumno` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `anyo` year(4) NOT NULL,
  `anyo2` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumno_has_curso`
--

INSERT INTO `alumno_has_curso` (`idAlumno`, `idCurso`, `anyo`, `anyo2`) VALUES
(1, 15, 2014, 2015),
(1, 14, 2015, 2016),
(1, 1, 2016, 2017),
(19, 1, 2007, 2008),
(20, 1, 2007, 2008);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_has_examen`
--

CREATE TABLE `alumno_has_examen` (
  `alumno_idAlumno` int(11) NOT NULL,
  `examen_idExamen` int(11) NOT NULL,
  `nota` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumno_has_examen`
--

INSERT INTO `alumno_has_examen` (`alumno_idAlumno`, `examen_idExamen`, `nota`) VALUES
(1, 1, 2),
(1, 2, 0.2),
(1, 3, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_has_padre`
--

CREATE TABLE `alumno_has_padre` (
  `Alumno_idAlumno` int(11) NOT NULL,
  `Padre_idPadre` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumno_has_padre`
--

INSERT INTO `alumno_has_padre` (`Alumno_idAlumno`, `Padre_idPadre`) VALUES
(1, 1),
(2, 2),
(3, 2),
(4, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumno_has_tarea`
--

CREATE TABLE `alumno_has_tarea` (
  `idTarea` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `nota` float DEFAULT NULL,
  `completada` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `alumno_has_tarea`
--

INSERT INTO `alumno_has_tarea` (`idTarea`, `idAlumno`, `nota`, `completada`) VALUES
(1, 1, 7, 1),
(1, 2, NULL, 0),
(3, 1, NULL, 0),
(4, 1, NULL, 0),
(6, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `idAsignatura` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `curso` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`idAsignatura`, `nombre`, `curso`) VALUES
(1, 'Conocimiento del medio', 'Primero'),
(2, 'Matemáticas', 'Primero'),
(3, 'Lengua', 'Primero'),
(5, 'Educación física', 'Primero'),
(6, 'Inglés', 'Primero'),
(7, 'Informática', 'Primero'),
(8, 'Tutoría', 'primero'),
(9, 'Plástica', NULL),
(10, 'Siesta', 'párvulos');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura_has_curso_has_alumno`
--

CREATE TABLE `asignatura_has_curso_has_alumno` (
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `NotaFinal` float DEFAULT NULL,
  `idProfesor` int(11) NOT NULL,
  `notaEvaluacion1` int(11) DEFAULT NULL,
  `notaEvaluacion2` int(11) DEFAULT NULL,
  `notaEvaluacion3` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura_has_curso_has_alumno`
--

INSERT INTO `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`, `NotaFinal`, `idProfesor`, `notaEvaluacion1`, `notaEvaluacion2`, `notaEvaluacion3`) VALUES
(1, 1, 1, NULL, 1, NULL, NULL, NULL),
(1, 1, 2, NULL, 4, NULL, NULL, NULL),
(1, 1, 3, NULL, 3, NULL, NULL, NULL),
(1, 1, 4, NULL, 2, NULL, NULL, NULL),
(1, 1, 5, NULL, 1, NULL, NULL, NULL),
(2, 1, 1, NULL, 4, NULL, NULL, NULL),
(2, 1, 2, NULL, 3, NULL, NULL, NULL),
(2, 1, 3, NULL, 2, NULL, NULL, NULL),
(3, 1, 1, NULL, 1, NULL, NULL, NULL),
(3, 1, 2, NULL, 4, NULL, NULL, NULL),
(3, 1, 3, NULL, 3, NULL, NULL, NULL),
(3, 1, 4, NULL, 2, NULL, NULL, NULL),
(3, 1, 5, NULL, 3, NULL, NULL, NULL),
(9, 1, 1, NULL, 9, NULL, NULL, NULL),
(10, 14, 1, 10, 2, 8, 9, 10),
(10, 15, 1, NULL, 13, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura_has_curso_has_centro`
--

CREATE TABLE `asignatura_has_curso_has_centro` (
  `Asignatura_idAsignatura` int(11) NOT NULL,
  `Curso_idCurso` int(11) NOT NULL,
  `Profesor_idProfesor` int(11) NOT NULL,
  `centro_idCentro` int(11) NOT NULL,
  `hora` time NOT NULL,
  `diaSemana` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura_has_curso_has_centro`
--

INSERT INTO `asignatura_has_curso_has_centro` (`Asignatura_idAsignatura`, `Curso_idCurso`, `Profesor_idProfesor`, `centro_idCentro`, `hora`, `diaSemana`) VALUES
(1, 1, 1, 1, '00:00:00', 1),
(2, 1, 2, 1, '00:00:00', 2),
(3, 1, 3, 1, '00:00:00', 3),
(3, 2, 3, 1, '00:00:00', 4),
(5, 1, 5, 1, '00:00:00', 5),
(6, 1, 6, 1, '00:00:00', 1),
(7, 1, 7, 1, '00:00:00', 2),
(8, 1, 1, 1, '00:00:00', 3),
(9, 1, 9, 1, '00:00:00', 4),
(10, 14, 12, 1, '06:12:13', 4),
(10, 15, 13, 1, '07:00:00', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `idAsistencia` int(11) NOT NULL,
  `justificada` tinyint(1) NOT NULL DEFAULT '0',
  `fecha` date NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`idAsistencia`, `justificada`, `fecha`, `descripcion`, `Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`, `idProfesor`) VALUES
(1, 0, '2008-10-10', 'No vino al examen, está suspendido', 1, 1, 1, 1),
(2, 0, '2016-12-09', 'No ha faltado a clase :)', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro`
--

CREATE TABLE `centro` (
  `idCentro` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `direccion` varchar(45) NOT NULL,
  `TipoCentro_tipo` varchar(45) NOT NULL,
  `Administrador_idAdministrador` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `centro`
--

INSERT INTO `centro` (`idCentro`, `nombre`, `direccion`, `TipoCentro_tipo`, `Administrador_idAdministrador`) VALUES
(1, 'Vasco Núñez de Balboa', 'Avenida de Galileo 13', '1', 1),
(2, 'Bautista Lledó', 'Calle Salazar Gallardo 45', '1', 2),
(3, 'Eugenio Cantalejo', 'Avenida de las migas 10', '4', 1),
(4, 'General José Sanjurjo', 'Avenida del Generalísimo 8', '3', 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `centro_has_curso_has_tutor`
--

CREATE TABLE `centro_has_curso_has_tutor` (
  `idCentro` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idTutor` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `centro_has_curso_has_tutor`
--

INSERT INTO `centro_has_curso_has_tutor` (`idCentro`, `idCurso`, `idTutor`) VALUES
(1, 1, 1),
(1, 2, 2),
(1, 3, 3),
(1, 5, 5),
(1, 6, 6),
(1, 7, 7),
(1, 8, 8),
(1, 14, 10),
(1, 15, 13),
(2, 1, 12);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios_sobre_el_alumno`
--

CREATE TABLE `comentarios_sobre_el_alumno` (
  `idComentarios_sobre_el_alumno` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `texto` mediumtext NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentarios_sobre_el_alumno`
--

INSERT INTO `comentarios_sobre_el_alumno` (`idComentarios_sobre_el_alumno`, `titulo`, `texto`, `Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`) VALUES
(1, 'Comportamiento poco apropiado', 'Don Summers ha demostrado en los últimos días un desdén indeseable que perturba el clima de la asignatura', 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_alumno`
--

CREATE TABLE `comentario_alumno` (
  `idComentario` int(11) NOT NULL,
  `texto` varchar(45) NOT NULL,
  `Foro_idForo` int(11) NOT NULL,
  `Alumno_idAlumno` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario_alumno`
--

INSERT INTO `comentario_alumno` (`idComentario`, `texto`, `Foro_idForo`, `Alumno_idAlumno`, `fecha`) VALUES
(1, 'No me entero de este tema xD', 1, 1, '2016-12-08 19:07:00'),
(2, 'Esta asignatura me cuesta mucho', 1, 2, '0000-00-00 00:00:00'),
(3, 'Esta asignatura me cuesta mucho', 1, 2, '0000-00-00 00:00:00'),
(4, 'Esta asignatura me cuesta mucho', 1, 2, '0000-00-00 00:00:00'),
(5, 'Esta asignatura me cuesta mucho', 1, 2, '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentario_profesor`
--

CREATE TABLE `comentario_profesor` (
  `idComentario` int(11) NOT NULL,
  `texto` varchar(45) NOT NULL,
  `Foro_idForo` int(11) NOT NULL,
  `Profesor_idProfesor` int(11) NOT NULL,
  `fecha` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentario_profesor`
--

INSERT INTO `comentario_profesor` (`idComentario`, `texto`, `Foro_idForo`, `Profesor_idProfesor`, `fecha`) VALUES
(1, 'Pues a estudiar se ha dicho :)', 1, 1, '2016-12-08 19:12:00'),
(2, 'Tenéis que estudiar más', 1, 1, '2008-10-10 00:00:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comunicado`
--

CREATE TABLE `comunicado` (
  `idComunicado` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `texto` longtext,
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `fecha` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `tipo` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comunicado`
--

INSERT INTO `comunicado` (`idComunicado`, `titulo`, `texto`, `idAsignatura`, `idCurso`, `fecha`, `tipo`, `idProfesor`, `creacion`) VALUES
(1, 'Reunión', 'Se convoca a los padres de los alumnos de Primero A a una reunión en el salón de actos mañana', 1, 1, '0000-00-00 00:00:00', 1, 1, '2017-03-29 15:05:30'),
(2, NULL, 'aaaaaa', 1, 1, '2008-10-09 22:00:00', 2, 1, '2017-03-29 15:05:30'),
(3, NULL, 'Nos vamos al mar de Bering', 1, 1, '2008-10-09 22:00:00', 1, 1, '2017-03-29 15:05:30'),
(4, 'Autorización', 'Nos vamos al mar de Bering', 1, 1, '2008-10-09 22:00:00', 2, 1, '2017-03-29 15:05:30');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `confirmacion_comunicado`
--

CREATE TABLE `confirmacion_comunicado` (
  `comunicado_idComunicado` int(11) NOT NULL,
  `alumno_idAlumno` int(11) NOT NULL,
  `firmado` tinyint(1) NOT NULL DEFAULT '0',
  `leidoAlumno` tinyint(1) NOT NULL DEFAULT '0',
  `leidoPadre` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `confirmacion_comunicado`
--

INSERT INTO `confirmacion_comunicado` (`comunicado_idComunicado`, `alumno_idAlumno`, `firmado`, `leidoAlumno`, `leidoPadre`) VALUES
(1, 1, 0, 0, 0),
(1, 2, 1, 1, 1),
(2, 1, 1, 1, 1),
(3, 1, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `grupo` varchar(45) DEFAULT NULL,
  `Profesor_idProfesor` int(11) NOT NULL,
  `centro_idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`idCurso`, `nombre`, `grupo`, `Profesor_idProfesor`, `centro_idCentro`) VALUES
(1, 'Primero', 'A', 1, 1),
(2, 'Primero', 'B', 2, 1),
(3, 'Segundo', 'A', 3, 1),
(5, 'Tercero', 'A', 5, 1),
(6, 'Tercero', 'B', 6, 1),
(7, 'Cuarto', 'A', 7, 1),
(8, 'Cuarto', 'B', 8, 1),
(9, 'Quinto', 'A', 9, 1),
(10, 'Quinto', 'B', 10, 1),
(11, 'Sexto', 'A', 11, 1),
(12, 'Sexto', 'B', 12, 1),
(13, 'Primero', 'A', 5, 2),
(14, 'párvulos 5', 'C', 1, 1),
(15, 'párvulos 4', 'A', 13, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dia_semana`
--

CREATE TABLE `dia_semana` (
  `idDia` int(11) NOT NULL,
  `letra` varchar(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `dia_semana`
--

INSERT INTO `dia_semana` (`idDia`, `letra`) VALUES
(7, 'D'),
(4, 'J'),
(1, 'L'),
(2, 'M'),
(6, 'S'),
(5, 'V'),
(3, 'X');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `evaluacion`
--

CREATE TABLE `evaluacion` (
  `idEvaluacion` int(11) NOT NULL,
  `nombre` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `evaluacion`
--

INSERT INTO `evaluacion` (`idEvaluacion`, `nombre`) VALUES
(1, 'Primera'),
(2, 'Segunda'),
(3, 'Tercera');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `examen`
--

CREATE TABLE `examen` (
  `idExamen` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `descripcion` text,
  `titulo` varchar(25) NOT NULL,
  `evaluacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`idExamen`, `fecha`, `idAsignatura`, `idCurso`, `descripcion`, `titulo`, `evaluacion`) VALUES
(1, '2016-12-08', 1, 1, '', '', 1),
(2, '2008-10-10', 1, 1, '', '', 2),
(3, '2017-06-30', 1, 1, 'Sale todo', 'Los climas', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `expediente`
--

CREATE TABLE `expediente` (
  `numExpediente` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `expediente`
--

INSERT INTO `expediente` (`numExpediente`) VALUES
(1),
(2),
(3),
(4),
(5),
(6),
(7),
(8),
(9),
(10),
(11),
(12),
(13),
(14),
(15),
(16),
(17),
(18),
(19),
(20),
(21),
(22),
(23),
(24),
(25),
(26),
(27),
(28),
(29),
(30),
(31),
(32),
(33),
(34),
(35),
(36),
(37),
(38),
(39),
(40),
(41),
(42),
(43),
(44),
(45),
(46),
(47),
(48),
(49),
(50),
(51),
(52),
(53),
(54),
(55),
(56);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `foro`
--

CREATE TABLE `foro` (
  `idForo` int(11) NOT NULL,
  `tema` varchar(45) NOT NULL,
  `Asignatura_has_Curso_Asignatura_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_Curso_idCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `foro`
--

INSERT INTO `foro` (`idForo`, `tema`, `Asignatura_has_Curso_Asignatura_idAsignatura`, `Asignatura_has_Curso_Curso_idCurso`) VALUES
(1, 'Los ecosistemas', 1, 1),
(5, 'Comportamiento', 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `material`
--

CREATE TABLE `material` (
  `idMaterial` int(11) NOT NULL,
  `contenido` longblob NOT NULL,
  `asignatura_has_curso_Asignatura_idAsignatura` int(11) NOT NULL,
  `asignatura_has_curso_Curso_idCurso` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mencion`
--

CREATE TABLE `mencion` (
  `idMencion` int(11) NOT NULL,
  `titulo` varchar(45) DEFAULT NULL,
  `descripcion` longtext,
  `Asignatura_has_Curso_has_Alumno_idAsignatura` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idCurso` int(11) NOT NULL,
  `Asignatura_has_Curso_has_Alumno_idAlumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mencion`
--

INSERT INTO `mencion` (`idMencion`, `titulo`, `descripcion`, `Asignatura_has_Curso_has_Alumno_idAsignatura`, `Asignatura_has_Curso_has_Alumno_idCurso`, `Asignatura_has_Curso_has_Alumno_idAlumno`) VALUES
(1, 'Premio al mejor alumno regular', NULL, 1, 1, 1),
(2, 'Premio por excelecia', 'por su sobresaliente labor en el campo de la excelencia', 1, 1, 1),
(3, 'Premio al mejor alumno regular', NULL, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_alumno`
--

CREATE TABLE `mensaje_alumno` (
  `idMensaje` int(11) NOT NULL,
  `texto` text NOT NULL,
  `fecha` datetime NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `asunto` varchar(70) DEFAULT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_alumno`
--

INSERT INTO `mensaje_alumno` (`idMensaje`, `texto`, `fecha`, `idAlumno`, `idProfesor`, `asunto`, `leido`) VALUES
(1, 'No puedo ir a clase, tengo reúma.', '2017-03-08 04:10:13', 1, 1, NULL, 0),
(2, 'Aléjate de ella', '2017-03-31 11:26:24', 1, 7, NULL, 0),
(3, 'Siempre quise decirte que tus clases me parecen aburridas pero instructivas, de todas formas serás el típico profesor que cae en el olvido, sin frases memorables ni grandes hazañas.', '0000-00-00 00:00:00', 1, 2, 'La felicidad no se mide en palabras', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_padre`
--

CREATE TABLE `mensaje_padre` (
  `idMensaje` int(11) NOT NULL,
  `texto` longtext NOT NULL,
  `fecha` datetime NOT NULL,
  `idPadre` int(11) DEFAULT NULL,
  `idProfesor` int(11) DEFAULT NULL,
  `asunto` varchar(70) DEFAULT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_padre`
--

INSERT INTO `mensaje_padre` (`idMensaje`, `texto`, `fecha`, `idPadre`, `idProfesor`, `asunto`, `leido`) VALUES
(1, 'Mi hijo entrega los deberes?', '2017-03-13 07:25:26', 1, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_profesor`
--

CREATE TABLE `mensaje_profesor` (
  `idMensaje` int(11) NOT NULL,
  `texto` longtext NOT NULL,
  `fecha` datetime NOT NULL,
  `idPadre` int(11) DEFAULT NULL,
  `idProfesor` int(11) NOT NULL,
  `idAlumno` int(11) DEFAULT NULL,
  `asunto` varchar(70) DEFAULT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_profesor`
--

INSERT INTO `mensaje_profesor` (`idMensaje`, `texto`, `fecha`, `idPadre`, `idProfesor`, `idAlumno`, `asunto`, `leido`) VALUES
(1, 'Ya hablaremos tú y yo', '2017-03-08 13:14:11', NULL, 1, 1, '', 0),
(2, 'No, dice que se los come el perro.', '2017-03-13 13:16:29', 1, 1, NULL, '', 0),
(3, 'Vas a suspender con esa actitud', '2017-04-11 10:26:23', NULL, 1, 1, '', 0),
(4, 'Habrá que ponerse en serio', '2017-03-20 10:26:22', NULL, 1, 1, '', 0),
(5, 'Tu madre está soltera?', '2017-02-21 06:17:20', NULL, 7, 1, '', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `padre`
--

CREATE TABLE `padre` (
  `idPadre` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `user` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `dni` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` int(45) NOT NULL,
  `password` varchar(45) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `padre`
--

INSERT INTO `padre` (`idPadre`, `nombre`, `apellidos`, `user`, `dni`, `email`, `telefono`, `password`) VALUES
(1, 'Rodolfo', 'Summers', 'rudolf', '45824735H', 'rudolf@lol.co', 656565655, '1234'),
(2, 'Auxiliadora', 'Valderrama Mendoza', 'gastroenteritis', '45645645R', 'lagastro@hotmail.com', 666666666, '1234'),
(3, 'Marieta', 'Sánchez', 'Gorgorito', '14714721F', 'asdfg@lol.co', 852852852, '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `profesor`
--

CREATE TABLE `profesor` (
  `idProfesor` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `apellidos` varchar(45) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `dni` varchar(45) NOT NULL,
  `telefono` int(11) DEFAULT NULL,
  `user` varchar(45) CHARACTER SET utf8 COLLATE utf8_spanish2_ci NOT NULL,
  `password` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`idProfesor`, `nombre`, `apellidos`, `email`, `dni`, `telefono`, `user`, `password`) VALUES
(1, 'Diego', 'Mendoza', 'dm1@alu.ua.es', '4545647P', 666666666, 'payo1', '1234'),
(2, 'Bernardo', 'Galipienso', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo2', '1234'),
(3, 'Luisa', 'Ramos', 'bg2@alu.ua.es', '85285285J', 666666666, 'paya3', '1234'),
(5, 'Angustias', 'López', 'bg2@alu.ua.es', '85285285J', 666666666, 'paya5', '1234'),
(6, 'Josefa', 'Saramago', 'bg2@alu.ua.es', '85285285J', 666666666, 'paya6', '1234'),
(7, 'Guillermo', 'Mata', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo7', '1234'),
(8, 'Carmen', 'San Diego', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo8', '1234'),
(9, 'Matilde', 'Salvador i Segarra', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo9', '1234'),
(10, 'Antonio', 'García Cayuelas', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo10', '1234'),
(11, 'Olegario', 'Do Marco Seller', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo11', '1234'),
(12, 'Margarita', 'Sastre', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo12', '1234'),
(13, 'Miguel', 'Serrano', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo13', '1234'),
(14, 'Santiago', 'Colomar', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo14', '1234'),
(15, 'Pep', 'Llorens', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo15', '1234'),
(16, 'Calígula', 'Cantalejo Molina', 'calican@hoi.com', '88888888R', 966666666, 'elcali23', '1234'),
(17, 'Auxiliadora', 'Spencer', 'aux@aux.x', '12345678X', 123456789, 'aux34', '1234'),
(18, 'Muñón', 'Bombín Esperanza', 'munion@hope.com', '55555555K', 666666666, 'munion', '1234');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tarea`
--

CREATE TABLE `tarea` (
  `idTarea` int(11) NOT NULL,
  `descripcion` varchar(120) NOT NULL,
  `fecha_limite` date DEFAULT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idAsignatura` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `descripcion`, `fecha_limite`, `fechaCreacion`, `idAsignatura`, `idProfesor`, `idCurso`, `idCentro`) VALUES
(1, 'Describir el ecosistema del gusano de seda', '2016-12-08', '2017-03-27 21:22:51', 1, 1, 1, 1),
(2, 'Matar a un ruiseñor', '2018-10-10', '2017-03-27 21:22:51', 1, 1, 1, 1),
(3, 'Hacer la torre de Pisa con bastoncillos para los oídos', '2018-03-31', '2017-03-27 21:22:51', 9, 9, 1, 1),
(4, 'Diseccionar un pollito', '2017-03-01', '2017-03-27 21:22:51', 1, 1, 1, 1),
(6, 'Ver Juego de tronos', '2017-03-09', '2017-03-27 21:22:51', 2, 2, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocentro`
--

CREATE TABLE `tipocentro` (
  `tipo` varchar(45) NOT NULL,
  `descripcion` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipocentro`
--

INSERT INTO `tipocentro` (`tipo`, `descripcion`) VALUES
('1', 'Colegio privado'),
('2', 'Academia'),
('3', 'Academia militar'),
('4', 'Escuela episcopal');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocomunicado`
--

CREATE TABLE `tipocomunicado` (
  `idTipoComunicado` int(11) NOT NULL,
  `nombre` varchar(25) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `tipocomunicado`
--

INSERT INTO `tipocomunicado` (`idTipoComunicado`, `nombre`) VALUES
(1, 'Anuncio'),
(2, 'Autorización'),
(3, 'Justificante');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`),
  ADD UNIQUE KEY `user_UNIQUE` (`user`),
  ADD UNIQUE KEY `idAdministrador_UNIQUE` (`idAdministrador`);

--
-- Indices de la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD PRIMARY KEY (`idAlumno`),
  ADD KEY `fk_Alumno_InformeAlumno1_idx` (`InformeAlumno_numExpediente`);

--
-- Indices de la tabla `alumno_has_curso`
--
ALTER TABLE `alumno_has_curso`
  ADD PRIMARY KEY (`idAlumno`,`anyo`,`idCurso`),
  ADD KEY `fk_curso_anyoacademico1` (`idCurso`);

--
-- Indices de la tabla `alumno_has_examen`
--
ALTER TABLE `alumno_has_examen`
  ADD UNIQUE KEY `alumno+examen1` (`alumno_idAlumno`,`examen_idExamen`),
  ADD KEY `fk_examen_examens1` (`examen_idExamen`);

--
-- Indices de la tabla `alumno_has_padre`
--
ALTER TABLE `alumno_has_padre`
  ADD KEY `fk_alumno_has_padres_alumno_alumnoid1_idx` (`Alumno_idAlumno`),
  ADD KEY `fk_alumno_has_padre_padre_padreid1_idx` (`Padre_idPadre`);

--
-- Indices de la tabla `alumno_has_tarea`
--
ALTER TABLE `alumno_has_tarea`
  ADD KEY `fk_alumno_has_tarea_asignatura_has_curso_has_alumno1_idx` (`idAlumno`),
  ADD KEY `fk_alumno_has_tarea_tarea_idx` (`idTarea`),
  ADD KEY `donetarea1` (`completada`);

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`idAsignatura`),
  ADD UNIQUE KEY `nombre_UNIQUE` (`nombre`);

--
-- Indices de la tabla `asignatura_has_curso_has_alumno`
--
ALTER TABLE `asignatura_has_curso_has_alumno`
  ADD PRIMARY KEY (`idAsignatura`,`idCurso`,`idAlumno`),
  ADD KEY `fk_Asignatura_has_Curso_has_Alumno_Alumno1_idx` (`idAlumno`),
  ADD KEY `fk_Asignatura_has_Curso_has_Alumno_Asignatura_has_Curso1_idx` (`idAsignatura`,`idCurso`),
  ADD KEY `asignaturahaspolashasprofesorid` (`idProfesor`);

--
-- Indices de la tabla `asignatura_has_curso_has_centro`
--
ALTER TABLE `asignatura_has_curso_has_centro`
  ADD PRIMARY KEY (`Asignatura_idAsignatura`,`Curso_idCurso`),
  ADD KEY `fk_Asignatura_has_Curso_Asignatura1_idx` (`Asignatura_idAsignatura`),
  ADD KEY `fk_Asignatura_has_Curso_Profesor1_idx` (`Profesor_idProfesor`),
  ADD KEY `asignatura_centro_curso_idprofesor` (`Profesor_idProfesor`),
  ADD KEY `fk_centro_idCentro` (`centro_idCentro`,`Curso_idCurso`) USING BTREE,
  ADD KEY `diaSemana1` (`diaSemana`) USING BTREE;

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`idAsistencia`,`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  ADD KEY `fk_Asistencia_Asignatura_has_Curso_has_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  ADD KEY `idprofesorasistencia` (`idProfesor`);

--
-- Indices de la tabla `centro`
--
ALTER TABLE `centro`
  ADD PRIMARY KEY (`idCentro`),
  ADD KEY `fk_Centro_TipoCentro_idx` (`TipoCentro_tipo`),
  ADD KEY `fk_Centro_Administrador1_idx` (`Administrador_idAdministrador`);

--
-- Indices de la tabla `centro_has_curso_has_tutor`
--
ALTER TABLE `centro_has_curso_has_tutor`
  ADD PRIMARY KEY (`idCentro`,`idCurso`,`idTutor`),
  ADD KEY `fk_curso_centrohascursohastutor` (`idCurso`),
  ADD KEY `fk_tutor_centrohascursohastutor` (`idTutor`);

--
-- Indices de la tabla `comentarios_sobre_el_alumno`
--
ALTER TABLE `comentarios_sobre_el_alumno`
  ADD PRIMARY KEY (`idComentarios_sobre_el_alumno`,`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`),
  ADD KEY `fk_Comentarios_sobre_el_alumno_Asignatura_has_Curso_has_Alu_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`);

--
-- Indices de la tabla `comentario_alumno`
--
ALTER TABLE `comentario_alumno`
  ADD PRIMARY KEY (`idComentario`,`Foro_idForo`,`Alumno_idAlumno`),
  ADD KEY `fk_Comentario_Foro1_idx` (`Foro_idForo`),
  ADD KEY `fk_Comentario_alumno_Alumno1_idx` (`Alumno_idAlumno`);

--
-- Indices de la tabla `comentario_profesor`
--
ALTER TABLE `comentario_profesor`
  ADD PRIMARY KEY (`idComentario`,`Foro_idForo`,`Profesor_idProfesor`),
  ADD KEY `fk_Comentario_Foro1_idx` (`Foro_idForo`),
  ADD KEY `fk_Comentario_profesor_Profesor1_idx` (`Profesor_idProfesor`);

--
-- Indices de la tabla `comunicado`
--
ALTER TABLE `comunicado`
  ADD PRIMARY KEY (`idComunicado`,`idAsignatura`,`idCurso`),
  ADD KEY `tipo` (`tipo`),
  ADD KEY `fk_Comunicado_Asignatura_has_Curso1_idx` (`idAsignatura`,`idCurso`,`idProfesor`) USING BTREE;

--
-- Indices de la tabla `confirmacion_comunicado`
--
ALTER TABLE `confirmacion_comunicado`
  ADD PRIMARY KEY (`comunicado_idComunicado`,`alumno_idAlumno`),
  ADD KEY `confirmacioncomunicado` (`comunicado_idComunicado`,`alumno_idAlumno`),
  ADD KEY `fk_alumnoidalumno_comunicadoconfiridalumno` (`alumno_idAlumno`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`,`centro_idCentro`),
  ADD KEY `fk_Curso_Profesor1_idx` (`Profesor_idProfesor`),
  ADD KEY `fk_curso_centro1_idx` (`centro_idCentro`);

--
-- Indices de la tabla `dia_semana`
--
ALTER TABLE `dia_semana`
  ADD PRIMARY KEY (`idDia`),
  ADD UNIQUE KEY `dia` (`letra`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`idEvaluacion`),
  ADD KEY `idevaluacionexamen1` (`idEvaluacion`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`idExamen`),
  ADD KEY `fk_examen_asignatura_curso1_idx` (`idAsignatura`,`idCurso`),
  ADD KEY `tituloexamen1` (`titulo`),
  ADD KEY `evaluacionexamen1` (`evaluacion`) USING BTREE;

--
-- Indices de la tabla `expediente`
--
ALTER TABLE `expediente`
  ADD PRIMARY KEY (`numExpediente`);

--
-- Indices de la tabla `foro`
--
ALTER TABLE `foro`
  ADD PRIMARY KEY (`idForo`,`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`),
  ADD KEY `fk_Foro_Asignatura_has_Curso1_idx` (`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`);

--
-- Indices de la tabla `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`idMaterial`,`asignatura_has_curso_Asignatura_idAsignatura`,`asignatura_has_curso_Curso_idCurso`),
  ADD KEY `fk_material_asignatura_has_curso1_idx` (`asignatura_has_curso_Asignatura_idAsignatura`,`asignatura_has_curso_Curso_idCurso`);

--
-- Indices de la tabla `mencion`
--
ALTER TABLE `mencion`
  ADD PRIMARY KEY (`idMencion`),
  ADD KEY `fk_Mencion_Asignatura_has_Curso_has_Alumno1_idx` (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`);

--
-- Indices de la tabla `mensaje_alumno`
--
ALTER TABLE `mensaje_alumno`
  ADD PRIMARY KEY (`idMensaje`),
  ADD KEY `claveforaneaprofesoralumno1` (`idAlumno`,`idProfesor`),
  ADD KEY `fk_mensajealumno_profesorid1` (`idProfesor`);

--
-- Indices de la tabla `mensaje_padre`
--
ALTER TABLE `mensaje_padre`
  ADD PRIMARY KEY (`idMensaje`),
  ADD KEY `fk_mensaje_padre_padre_idpadre_idx` (`idPadre`),
  ADD KEY `fk_mensaje_padre_profesor_profesor_idprofesor1_idx` (`idProfesor`);

--
-- Indices de la tabla `mensaje_profesor`
--
ALTER TABLE `mensaje_profesor`
  ADD PRIMARY KEY (`idMensaje`),
  ADD KEY `fk_mensaje_padre_padre_idpadre_idx` (`idPadre`),
  ADD KEY `fk_mensaje_padre_profesor_profesor_idprofesor1_idx` (`idProfesor`),
  ADD KEY `mensajeprofetoalumno` (`idAlumno`);

--
-- Indices de la tabla `padre`
--
ALTER TABLE `padre`
  ADD PRIMARY KEY (`idPadre`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`idProfesor`),
  ADD UNIQUE KEY `nombreyapellidosprofesor1` (`idProfesor`,`nombre`,`apellidos`) USING BTREE;

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`),
  ADD KEY `idAsignatura` (`idAsignatura`),
  ADD KEY `idprofecursocentro_tarea` (`idProfesor`,`idCurso`,`idCentro`),
  ADD KEY `fk_tarea_profe_asig_curso_centro1` (`idAsignatura`,`idCurso`);

--
-- Indices de la tabla `tipocentro`
--
ALTER TABLE `tipocentro`
  ADD PRIMARY KEY (`tipo`);

--
-- Indices de la tabla `tipocomunicado`
--
ALTER TABLE `tipocomunicado`
  ADD PRIMARY KEY (`idTipoComunicado`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  MODIFY `idAsignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `idAsistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `centro`
--
ALTER TABLE `centro`
  MODIFY `idCentro` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `comentarios_sobre_el_alumno`
--
ALTER TABLE `comentarios_sobre_el_alumno`
  MODIFY `idComentarios_sobre_el_alumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `comentario_alumno`
--
ALTER TABLE `comentario_alumno`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `comentario_profesor`
--
ALTER TABLE `comentario_profesor`
  MODIFY `idComentario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT de la tabla `comunicado`
--
ALTER TABLE `comunicado`
  MODIFY `idComunicado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `idEvaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `foro`
--
ALTER TABLE `foro`
  MODIFY `idForo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `mencion`
--
ALTER TABLE `mencion`
  MODIFY `idMencion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `mensaje_alumno`
--
ALTER TABLE `mensaje_alumno`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `mensaje_padre`
--
ALTER TABLE `mensaje_padre`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `mensaje_profesor`
--
ALTER TABLE `mensaje_profesor`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT de la tabla `padre`
--
ALTER TABLE `padre`
  MODIFY `idPadre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `tipocomunicado`
--
ALTER TABLE `tipocomunicado`
  MODIFY `idTipoComunicado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `alumno`
--
ALTER TABLE `alumno`
  ADD CONSTRAINT `fk_Alumno_InformeAlumno1` FOREIGN KEY (`InformeAlumno_numExpediente`) REFERENCES `expediente` (`numExpediente`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_has_curso`
--
ALTER TABLE `alumno_has_curso`
  ADD CONSTRAINT `fk_alumno_anyoacademico1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_curso_anyoacademico1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_has_examen`
--
ALTER TABLE `alumno_has_examen`
  ADD CONSTRAINT `fk_examen_alumnos1` FOREIGN KEY (`alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_examen_examens1` FOREIGN KEY (`examen_idExamen`) REFERENCES `examen` (`idExamen`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_has_padre`
--
ALTER TABLE `alumno_has_padre`
  ADD CONSTRAINT `fk_alumno_has_padre_padre_padreid1` FOREIGN KEY (`Padre_idPadre`) REFERENCES `padre` (`idPadre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumno_has_padres_alumno_alumnoid1` FOREIGN KEY (`Alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `alumno_has_tarea`
--
ALTER TABLE `alumno_has_tarea`
  ADD CONSTRAINT `fk_alumno_has_tarea_asignatura_has_curso_has_alumno1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_alumno_has_tarea_tarea` FOREIGN KEY (`idTarea`) REFERENCES `tarea` (`idTarea`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asignatura_has_curso_has_alumno`
--
ALTER TABLE `asignatura_has_curso_has_alumno`
  ADD CONSTRAINT `fk_Asignatura_has_Curso_has_Alumno_Alumno1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Asignatura_has_Curso_has_Alumno_Asignatura_has_Curso1` FOREIGN KEY (`idAsignatura`,`idCurso`) REFERENCES `asignatura_has_curso_has_centro` (`Asignatura_idAsignatura`, `Curso_idCurso`);

--
-- Filtros para la tabla `asignatura_has_curso_has_centro`
--
ALTER TABLE `asignatura_has_curso_has_centro`
  ADD CONSTRAINT `fk_Asignatura_has_Curso_Asignatura1` FOREIGN KEY (`Asignatura_idAsignatura`) REFERENCES `asignatura` (`idAsignatura`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Asignatura_has_Curso_Centro1` FOREIGN KEY (`centro_idCentro`,`Curso_idCurso`) REFERENCES `centro_has_curso_has_tutor` (`idCentro`, `idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_diasemana_asigcurso` FOREIGN KEY (`diaSemana`) REFERENCES `dia_semana` (`idDia`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_profesorhascentroyasignatura` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD CONSTRAINT `fk_Asistencia_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_profesorasistencia` FOREIGN KEY (`idProfesor`) REFERENCES `asignatura_has_curso_has_alumno` (`idProfesor`);

--
-- Filtros para la tabla `centro`
--
ALTER TABLE `centro`
  ADD CONSTRAINT `fk_Centro_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Centro_TipoCentro` FOREIGN KEY (`TipoCentro_tipo`) REFERENCES `tipocentro` (`tipo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `centro_has_curso_has_tutor`
--
ALTER TABLE `centro_has_curso_has_tutor`
  ADD CONSTRAINT `fk_centro_has_curso_centro_centroid` FOREIGN KEY (`idCentro`) REFERENCES `centro` (`idCentro`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_centro_has_curso_curso_idcurso1` FOREIGN KEY (`idCurso`) REFERENCES `curso` (`idCurso`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_centro_has_curso_has_tutor_profesor` FOREIGN KEY (`idTutor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentarios_sobre_el_alumno`
--
ALTER TABLE `comentarios_sobre_el_alumno`
  ADD CONSTRAINT `fk_Comentarios_sobre_el_alumno_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentario_alumno`
--
ALTER TABLE `comentario_alumno`
  ADD CONSTRAINT `fk_Comentario_Foro1` FOREIGN KEY (`Foro_idForo`) REFERENCES `foro` (`idForo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Comentario_alumno_Alumno1` FOREIGN KEY (`Alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comentario_profesor`
--
ALTER TABLE `comentario_profesor`
  ADD CONSTRAINT `fk_Comentario_Foro10` FOREIGN KEY (`Foro_idForo`) REFERENCES `foro` (`idForo`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_Comentario_profesor_Profesor1` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `comunicado`
--
ALTER TABLE `comunicado`
  ADD CONSTRAINT `fk_Comunicado_Asignatura_has_Cursotipo1` FOREIGN KEY (`tipo`) REFERENCES `tipocomunicado` (`idTipoComunicado`),
  ADD CONSTRAINT `fk_comunicado_asignatura_has_curso_has_centro1` FOREIGN KEY (`idAsignatura`,`idCurso`) REFERENCES `asignatura_has_curso_has_centro` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `confirmacion_comunicado`
--
ALTER TABLE `confirmacion_comunicado`
  ADD CONSTRAINT `fk_alumnoidalumno_comunicadoconfiridalumno` FOREIGN KEY (`alumno_idAlumno`) REFERENCES `alumno` (`idAlumno`),
  ADD CONSTRAINT `fk_comunicadoidcomunicado_confirmacioncomunicadoidcomunicado` FOREIGN KEY (`comunicado_idComunicado`) REFERENCES `comunicado` (`idComunicado`);

--
-- Filtros para la tabla `curso`
--
ALTER TABLE `curso`
  ADD CONSTRAINT `fk_Curso_Profesor1` FOREIGN KEY (`Profesor_idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `examen`
--
ALTER TABLE `examen`
  ADD CONSTRAINT `fk_evaluacionexamen1` FOREIGN KEY (`evaluacion`) REFERENCES `evaluacion` (`idEvaluacion`),
  ADD CONSTRAINT `fk_examen_asignatura_curso1` FOREIGN KEY (`idAsignatura`,`idCurso`) REFERENCES `asignatura_has_curso_has_centro` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `foro`
--
ALTER TABLE `foro`
  ADD CONSTRAINT `fk_Foro_Asignatura_has_Curso1` FOREIGN KEY (`Asignatura_has_Curso_Asignatura_idAsignatura`,`Asignatura_has_Curso_Curso_idCurso`) REFERENCES `asignatura_has_curso_has_centro` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `material`
--
ALTER TABLE `material`
  ADD CONSTRAINT `fk_material_asignatura_has_curso1` FOREIGN KEY (`asignatura_has_curso_Asignatura_idAsignatura`,`asignatura_has_curso_Curso_idCurso`) REFERENCES `asignatura_has_curso_has_centro` (`Asignatura_idAsignatura`, `Curso_idCurso`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mencion`
--
ALTER TABLE `mencion`
  ADD CONSTRAINT `fk_Mencion_Asignatura_has_Curso_has_Alumno1` FOREIGN KEY (`Asignatura_has_Curso_has_Alumno_idAsignatura`,`Asignatura_has_Curso_has_Alumno_idCurso`,`Asignatura_has_Curso_has_Alumno_idAlumno`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje_alumno`
--
ALTER TABLE `mensaje_alumno`
  ADD CONSTRAINT `fk_mensajealumno_alumnoid` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mensajealumno_profesorid1` FOREIGN KEY (`idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje_padre`
--
ALTER TABLE `mensaje_padre`
  ADD CONSTRAINT `fk_mensaje_padre_padre_idpadre` FOREIGN KEY (`idPadre`) REFERENCES `padre` (`idPadre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mensaje_padre_profesor_profesor_idprofesor1` FOREIGN KEY (`idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `mensaje_profesor`
--
ALTER TABLE `mensaje_profesor`
  ADD CONSTRAINT `fk_mensaje_padre_padre_idpadre0` FOREIGN KEY (`idPadre`) REFERENCES `padre` (`idPadre`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mensaje_profe_alumno_alumnoid1` FOREIGN KEY (`idAlumno`) REFERENCES `alumno` (`idAlumno`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_mensaje_profesorcosas1` FOREIGN KEY (`idProfesor`) REFERENCES `profesor` (`idProfesor`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD CONSTRAINT `fk_tarea_profe_asig_curso_centro1` FOREIGN KEY (`idAsignatura`,`idCurso`) REFERENCES `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`),
  ADD CONSTRAINT `fk_tarea_profe_asig_curso_centro12` FOREIGN KEY (`idProfesor`) REFERENCES `asignatura_has_curso_has_centro` (`Profesor_idProfesor`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
