-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-05-2017 a las 16:31:00
-- Versión del servidor: 10.1.19-MariaDB
-- Versión de PHP: 5.6.28

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
  `nombre` varchar(45) NOT NULL DEFAULT 'Alumno',
  `apellidos` varchar(45) DEFAULT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `dni` varchar(20) DEFAULT NULL,
  `idCurso` int(11) NOT NULL DEFAULT '1',
  `idCentro` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `alumno`
--

INSERT INTO `alumno` (`idAlumno`, `nombre`, `apellidos`, `user`, `password`, `email`, `telefono`, `dni`, `idCurso`, `idCentro`) VALUES
(1, 'Ruttinger', 'Summers', '101summers', '1234', 'summers101@alu.ua.es', 666666666, NULL, 1, 1),
(2, 'Zacarías', 'Piñedo Valderrama', '102zacary', '1234', 'zpv2@alu.ua.es', NULL, NULL, 1, 1),
(3, 'Isabel María', 'Botías Torres', '103isamari', '1234', 'imbt3@alu.ua.es', NULL, NULL, 1, 1),
(4, 'Priscila', 'Ríos de Luca', '104pris', '1234', 'prdl4@alu.ua.es', NULL, NULL, 1, 1),
(5, 'Gema', 'Sánchez Núñez', '105gsn', '1234', 'gmsn5@alu.ua.es', 0, '22222222M', 1, 1),
(6, 'Pacharán', 'Garmendia Salmorejo', 'pachirisu', '1234', 'pachirisu@jojo.com', 987654321, '88888888P', 1, 1),
(7, 'Patxi', 'Goicoetxea Zarratrústegui', 'aivalaostiapatxi', '1234', 'patxi@euskadi.com', 654654654, '65465465P', 1, 1),
(8, 'Mariquita', 'Pérez', 'deathmetal45', '1234', 'mariquita@metal.com', 222222222, '21212121O', 1, 1),
(9, 'Sanchopanza', 'Guano Machete', 'sanchoquijotequijotesancho', '1234', 'sancho@lol.co', 987654321, '55555555K', 1, 1),
(10, 'Maluma', 'Melanoma', 'melapela', '1234', 'melamalu@lol.co', 666666666, '66666666L', 2, 2),
(11, 'Alaska', 'Nebraska', 'alaskanebraska', '1234', 'nebra@lol.co', 666666666, '66666666T', 1, 1),
(12, 'Rocket', 'Man', 'roman', '1234', 'roman@lol.co', 666666666, '76214785P', 1, 2),
(13, 'Josep', 'Batman', 'yosoylanoche', '1234', 'noche@lol.co', 665555666, '66655555E', 2, 1),
(14, 'Tomás', 'Turbado', 'tommy', '1234', 'tommy@lol.co', 666655566, '66555666L', 1, 1),
(15, 'Donpi', 'Topocho', 'donpitopocho', '1234', 'pitopocho@lol.co', 633366666, '66333666L', 2, 2),
(16, 'Santiago', 'Villanueva Casals', 'villenev', '1234', 'villenev@pol.co', 666666666, '78945612G', 2, 1),
(17, 'Jose Ramón', 'San Juan Arnal', 'josephraymond', '1234', 'joseph@stal.in', 666666666, '66666666L', 2, 1),
(18, 'Aurora', 'Vaz Badia', 'auroren', '1234', 'auro@lol.co', 66666666, '78945612L', 2, 1),
(19, 'Mónica', 'David Paredes', 'monis13', '1234', 'moniq@lol.co', 123456789, '12345678Y', 2, 1),
(20, 'Sebastián', 'Capel Ayala', 'sebas3', '1234', 'sebast@lol.co', 123456789, '12345678T', 3, 1),
(21, 'María Rosa', 'Roque Dalmau', 'marie6', '1234', 'marieta@lol.co', 123456789, '12345678E', 3, 1),
(22, 'Colega', 'Sempere Mctetis', 'colegue', '1234', 'coleguev@pol.co', 666666666, '78945612P', 3, 1),
(23, 'Guajira', 'Juan Talamera', 'gjtxd4', '1234', 'robertguajira@stal.in', 666666666, '66666666A', 3, 1),
(24, 'Envidia', 'Pereza Lujuria', 'pecaden', '1234', 'pecoluegoexisto@lol.co', 66666666, '78945612S', 3, 1),
(25, 'Remedios', 'López', 'reme13', '1234', 'remeq@lol.co', 123456789, '12345678R', 3, 1),
(26, 'Camilo', 'Sexto-Séptimo Octavo de Noveno', 'camil3', '1234', 'camiliox@lol.co', 123456789, '12345678Z', 5, 1),
(27, 'Melanoma', 'Duato Dalmau', 'melan6', '1234', 'melan@lol.co', 123456789, '12345678W', 5, 1),
(28, 'Clotilde', 'Pérez Gutiérrez', 'semperfidelisclot', '1234', 'cloti@lol.co', 666666666, '78945612N', 1, 3),
(29, 'Cole', 'Pito Madre', 'cole23', '1234', 'cole@lol.co', 666666666, '78945612S', 1, 1),
(30, 'Romano', 'Tetriminio Lopera', 'lope23', '1234', 'lope@lol.co', 666666666, '78945612D', 1, 1),
(31, '', NULL, 'elchacheesgenial', '1234', NULL, NULL, NULL, 1, 1),
(45, 'Queque', 'Sópor', 'kkzopor', '1234', 'quemedices@sopor.com', 267267267, '33445566Q', 1, 1);

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
(1, 1, 2016, 2017),
(1, 14, 2015, 2016),
(1, 15, 2014, 2015),
(2, 1, 2016, 2017),
(3, 1, 2016, 2017),
(4, 1, 2016, 2017),
(5, 1, 2016, 2017),
(11, 1, 2016, 2017),
(12, 1, 2016, 2017),
(13, 1, 2016, 2017),
(14, 1, 2016, 2017),
(15, 2, 2016, 2017),
(16, 1, 2016, 2017),
(17, 1, 2016, 2017),
(18, 2, 2016, 2017),
(19, 1, 2007, 2008),
(19, 1, 2016, 2017),
(20, 1, 2007, 2008),
(20, 2, 2016, 2017),
(21, 2, 2016, 2017),
(22, 2, 2016, 2017),
(23, 2, 2016, 2017),
(24, 2, 2016, 2017),
(25, 3, 2016, 2017),
(26, 3, 2016, 2017),
(27, 3, 2016, 2017),
(28, 3, 2016, 2017),
(29, 3, 2016, 2017),
(30, 3, 2016, 2017),
(31, 5, 2016, 2017),
(45, 1, 2016, 2017);

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
(1, 2, 7),
(1, 3, NULL),
(1, 20, 7),
(1, 21, NULL),
(2, 20, 9),
(2, 21, NULL),
(3, 20, 6),
(3, 21, NULL),
(4, 20, NULL),
(4, 21, NULL),
(5, 20, NULL),
(5, 21, NULL);

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
(1, 4),
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
(22, 1, NULL, 0),
(22, 2, NULL, 0),
(22, 3, NULL, 0),
(22, 4, NULL, 0),
(22, 5, NULL, 0),
(23, 1, NULL, 0),
(24, 1, NULL, 0),
(25, 1, NULL, 0),
(25, 2, NULL, 0),
(25, 3, NULL, 0),
(25, 4, NULL, 0),
(25, 5, NULL, 0),
(26, 1, NULL, 0),
(26, 2, NULL, 0),
(26, 3, NULL, 0),
(27, 1, NULL, 0),
(27, 2, NULL, 0),
(27, 3, NULL, 0),
(27, 4, NULL, 0),
(27, 5, NULL, 0),
(28, 1, NULL, 0),
(28, 2, NULL, 0),
(28, 3, NULL, 0),
(28, 4, NULL, 0),
(28, 5, NULL, 0),
(29, 1, NULL, 0),
(29, 2, NULL, 0),
(29, 3, NULL, 0),
(29, 4, NULL, 0),
(29, 5, NULL, 0),
(29, 45, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `anuncio_gestor`
--

CREATE TABLE `anuncio_gestor` (
  `idGestor` int(11) NOT NULL,
  `idCentro` int(11) NOT NULL,
  `titulo` varchar(25) COLLATE utf8_spanish_ci DEFAULT NULL,
  `texto` text COLLATE utf8_spanish_ci NOT NULL,
  `fecha` date DEFAULT NULL,
  `idAnuncio` int(11) NOT NULL,
  `tipo` int(11) NOT NULL DEFAULT '1',
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `anuncio_gestor`
--

INSERT INTO `anuncio_gestor` (`idGestor`, `idCentro`, `titulo`, `texto`, `fecha`, `idAnuncio`, `tipo`, `creacion`) VALUES
(1, 1, 'Vacas Locas', 'Ha vuelto la fiebre de las vacas locas. Señoras, guarden a sus hijas.', '2017-05-10', 1, 1, '2017-05-09 19:24:28');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asignatura`
--

CREATE TABLE `asignatura` (
  `idAsignatura` int(11) NOT NULL,
  `nombre` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura`
--

INSERT INTO `asignatura` (`idAsignatura`, `nombre`) VALUES
(1, 'Conocimiento del medio'),
(2, 'Matemáticas'),
(3, 'Lengua'),
(5, 'Educación física'),
(6, 'Inglés'),
(7, 'Informática'),
(8, 'Tutoría'),
(9, 'Plástica'),
(10, 'Siesta'),
(16, 'Educación Sexual');

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
  `notaEvaluacion3` int(11) DEFAULT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asignatura_has_curso_has_alumno`
--

INSERT INTO `asignatura_has_curso_has_alumno` (`idAsignatura`, `idCurso`, `idAlumno`, `NotaFinal`, `idProfesor`, `notaEvaluacion1`, `notaEvaluacion2`, `notaEvaluacion3`, `idCentro`) VALUES
(1, 1, 1, 6, 1, 6, 6, 6, 1),
(1, 1, 2, 5, 1, 5, 5, 5, 1),
(1, 1, 3, 4, 1, 4, 4, 4, 1),
(1, 1, 4, 8, 1, 8, 8, 8, 1),
(1, 1, 5, 10, 1, 10, 10, 10, 1),
(1, 1, 45, NULL, 1, NULL, NULL, NULL, 1),
(2, 1, 1, 7, 0, 7, 7, 7, 1),
(2, 1, 2, 5, 3, 5, 5, 5, 1),
(2, 1, 3, 10, 2, 10, 10, 10, 1),
(2, 1, 45, NULL, 0, NULL, NULL, NULL, 1),
(3, 1, 1, 9, 1, 9, 9, 9, 1),
(3, 1, 2, 4, 0, 4, 4, 4, 1),
(3, 1, 3, 5, 3, 5, 5, 5, 1),
(3, 1, 4, 7, 2, 7, 7, 7, 1),
(3, 1, 5, 6, 3, 6, 6, 6, 1),
(3, 1, 45, NULL, 0, NULL, NULL, NULL, 1),
(4, 1, 45, NULL, 0, NULL, NULL, NULL, 1),
(5, 1, 45, NULL, 0, NULL, NULL, NULL, 1),
(9, 1, 1, 8, 9, 8, 8, 8, 1),
(10, 14, 1, 10, 2, 8, 9, 10, 1),
(10, 15, 1, 10, 13, 10, 10, 10, 1);

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
(1, 2, 1, 1, '11:16:00', 2),
(1, 3, 1, 1, '06:08:31', 3),
(2, 1, 2, 1, '00:00:00', 2),
(3, 1, 3, 1, '00:00:00', 3),
(3, 2, 3, 1, '00:00:00', 4),
(5, 1, 5, 1, '00:00:00', 5),
(6, 1, 6, 1, '00:00:00', 1),
(7, 1, 7, 1, '00:00:00', 2),
(8, 1, 1, 1, '00:00:00', 3),
(9, 1, 9, 1, '00:00:00', 4),
(10, 14, 12, 1, '06:12:13', 4),
(10, 15, 13, 1, '07:00:00', 2),
(16, 1, 8, 3, '00:00:00', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asistencia`
--

CREATE TABLE `asistencia` (
  `idAsistencia` int(11) NOT NULL,
  `justificada` tinyint(1) NOT NULL DEFAULT '0',
  `fecha` date NOT NULL,
  `descripcion` varchar(45) DEFAULT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `justificante` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `asistencia`
--

INSERT INTO `asistencia` (`idAsistencia`, `justificada`, `fecha`, `descripcion`, `idAsignatura`, `idCurso`, `idAlumno`, `idProfesor`, `justificante`) VALUES
(11, 1, '2017-04-24', NULL, 1, 1, 1, 1, 'Acho pijo cagontó'),
(12, 0, '2017-01-14', NULL, 1, 1, 1, 1, NULL),
(13, 1, '2010-10-10', NULL, 1, 1, 1, 1, 'Mi hijo tuvo paperas espontáneas, le duraron 6 horas. O eso dice él, yo no estaba. Total que no pudo venir, quítale la falta que luego le bajáis la nota y me dáis un disgusto.'),
(15, 1, '2017-04-12', NULL, 1, 1, 1, 1, NULL);

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
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comentarios_sobre_el_alumno`
--

INSERT INTO `comentarios_sobre_el_alumno` (`idComentarios_sobre_el_alumno`, `titulo`, `texto`, `idAsignatura`, `idCurso`, `idAlumno`) VALUES
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
  `fecha` date NOT NULL,
  `tipo` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `creacion` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `precio` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `comunicado`
--

INSERT INTO `comunicado` (`idComunicado`, `titulo`, `texto`, `idAsignatura`, `idCurso`, `fecha`, `tipo`, `idProfesor`, `creacion`, `precio`) VALUES
(1, 'Reunión', 'Se convoca a los padres de los alumnos de Primero A a una reunión en el salón de actos mañana', 1, 1, '0000-00-00', 1, 1, '2017-03-29 15:05:30', NULL),
(3, NULL, 'Nos vamos al mar de Bering', 1, 1, '2008-10-10', 1, 1, '2017-03-29 15:05:30', NULL),
(4, 'Autorización', 'Nos vamos al mar de Bering', 1, 1, '2008-10-10', 2, 1, '2017-03-29 15:05:30', NULL),
(5, 'Falta del jueves', 'Mi hijo tuvo paperas espontáneas, le duraron 6 horas. O eso dice él, yo no estaba. Total que no pudo venir, quítale la falta que luego le bajáis la nota y me dáis un disgusto.', 1, 1, '2017-04-12', 3, 1, '2017-04-22 12:55:50', NULL),
(11, '1', '1', 1, 1, '2017-05-25', 1, 1, '2017-05-02 14:56:52', NULL),
(12, '1', '1', 1, 1, '2017-05-25', 1, 1, '2017-05-02 15:01:16', NULL),
(13, '1', '1', 1, 1, '2017-05-25', 1, 1, '2017-05-02 15:01:55', NULL),
(14, '1', '1', 1, 1, '2017-05-25', 1, 1, '2017-05-02 15:02:25', NULL);

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
(1, 1, 1, 0, 1),
(1, 2, 1, 1, 1),
(2, 1, 1, 1, 1),
(3, 1, 0, 0, 1),
(14, 1, 0, 0, 1),
(14, 2, 0, 0, 0),
(14, 3, 0, 0, 0),
(14, 4, 0, 0, 0),
(14, 5, 0, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `idCurso` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `grupo` varchar(45) DEFAULT NULL,
  `Profesor_idProfesor` int(11) DEFAULT NULL,
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
(15, 'párvulos 4', 'A', 12, 1);

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
(1, 'L'),
(2, 'M'),
(3, 'X'),
(4, 'J'),
(5, 'V'),
(6, 'S'),
(7, 'D');

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
  `idProfesor` int(11) NOT NULL,
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `descripcion` text,
  `titulo` varchar(25) NOT NULL,
  `evaluacion` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `examen`
--

INSERT INTO `examen` (`idExamen`, `fecha`, `idProfesor`, `idAsignatura`, `idCurso`, `descripcion`, `titulo`, `evaluacion`) VALUES
(1, '2016-12-08', 1, 1, 2, 'El apartado 5.2 no entra', 'Ciclo del agua', 1),
(2, '2015-10-10', 1, 1, 3, 'Solo comen y duermen', 'Los animales', 2),
(3, '2017-06-30', 1, 1, 1, 'Sale todo del temario', 'Los climas', 2),
(20, '2017-06-10', 1, 1, 1, 'Temas 6 y 7, descripcion de los nutrientes y la pirámide alimenticia 3', 'Nutrición y alimentaciónn', 3),
(21, '2017-06-11', 1, 1, 1, 'Temas 8 y 9', 'Las plantas verdes', 3);

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
-- Estructura de tabla para la tabla `gestor`
--

CREATE TABLE `gestor` (
  `idGestor` int(11) NOT NULL,
  `nombre` varchar(45) COLLATE utf8_spanish_ci NOT NULL,
  `apellidos` varchar(60) COLLATE utf8_spanish_ci DEFAULT NULL,
  `usuario` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `password` varchar(25) COLLATE utf8_spanish_ci NOT NULL,
  `email` varchar(45) COLLATE utf8_spanish_ci DEFAULT NULL,
  `telefono` int(11) DEFAULT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `gestor`
--

INSERT INTO `gestor` (`idGestor`, `nombre`, `apellidos`, `usuario`, `password`, `email`, `telefono`, `idCentro`) VALUES
(1, 'Polonio', 'Sempere Mastuerta', 'polonio2016', '1234', 'polonio@lol.co', 666666666, 1),
(3, 'Paraguayo', 'Ukelele Terminator', '', '1234', 'pitaonopita@lol.co', 689689689, 0);

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
  `idAsignatura` int(11) NOT NULL,
  `idCurso` int(11) NOT NULL,
  `idAlumno` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mencion`
--

INSERT INTO `mencion` (`idMencion`, `titulo`, `descripcion`, `idAsignatura`, `idCurso`, `idAlumno`) VALUES
(1, 'Premio al mejor alumno regular', NULL, 1, 1, 1),
(2, 'Premio por excelecia', 'por su sobresaliente labor en el campo de la excelencia', 1, 1, 1),
(3, 'Premio al mejor alumno regular', NULL, 1, 1, 1),
(4, 'Premio al ecologista nato', 'Por tirar el papel en el contenedor de papel y el plástico en el contenedor de plástico. Tres hurras!', 1, 1, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_alumno`
--

CREATE TABLE `mensaje_alumno` (
  `idMensaje` int(11) NOT NULL,
  `asunto` varchar(70) DEFAULT NULL,
  `texto` text NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idAlumno` int(11) NOT NULL,
  `idProfesor` int(11) NOT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0',
  `idAsignatura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_alumno`
--

INSERT INTO `mensaje_alumno` (`idMensaje`, `asunto`, `texto`, `fecha`, `idAlumno`, `idProfesor`, `leido`, `idAsignatura`) VALUES
(1, 'Soy un alumno', 'has visto lalaland?', '2017-05-12 19:19:10', 1, 1, 1, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_padre`
--

CREATE TABLE `mensaje_padre` (
  `idMensaje` int(11) NOT NULL,
  `texto` longtext NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idPadre` int(11) DEFAULT NULL,
  `idProfesor` int(11) DEFAULT NULL,
  `idAsignatura` int(11) NOT NULL,
  `asunto` varchar(70) DEFAULT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_padre`
--

INSERT INTO `mensaje_padre` (`idMensaje`, `texto`, `fecha`, `idPadre`, `idProfesor`, `idAsignatura`, `asunto`, `leido`) VALUES
(1, 'pos vale', '2017-05-12 17:30:29', 4, 1, 1, NULL, 1),
(2, 'Mi hijo no puede ir al examen', '2017-05-12 18:34:48', 1, 1, 1, 'Examen', 1),
(3, 'Porque esta con la fiebre española', '2017-05-12 19:04:05', 1, 1, 1, NULL, 1),
(5, 'beeeeeeerrr', '2017-05-12 19:33:01', 4, 2, 2, 'numelo 8', 0),
(6, 'Y yo anarco comunista', '2017-05-12 21:17:40', 4, 1, 1, NULL, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mensaje_profesor`
--

CREATE TABLE `mensaje_profesor` (
  `idMensaje` int(11) NOT NULL,
  `asunto` varchar(70) DEFAULT NULL,
  `texto` longtext NOT NULL,
  `fecha` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `idPadre` int(11) DEFAULT NULL,
  `idProfesor` int(11) NOT NULL,
  `idAlumno` int(11) DEFAULT NULL,
  `leido` tinyint(1) NOT NULL DEFAULT '0',
  `idAsignatura` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `mensaje_profesor`
--

INSERT INTO `mensaje_profesor` (`idMensaje`, `asunto`, `texto`, `fecha`, `idPadre`, `idProfesor`, `idAlumno`, `leido`, `idAsignatura`) VALUES
(1, 'Agua bendita', 'Báñese gratis en agua bendita', '2017-05-11 22:45:47', 4, 1, NULL, 1, 1),
(3, NULL, 'Soy hippie', '2017-05-12 18:17:59', 4, 1, NULL, 0, 1),
(4, 'Wee', 'nsdadklJASDNK<AS', '2017-05-12 18:24:51', 2, 1, NULL, 1, 1),
(5, NULL, 'por que?', '2017-05-12 18:58:50', 1, 1, NULL, 1, 1),
(6, NULL, 'No estoy esperando para verla con mi señora', '2017-05-12 19:27:18', NULL, 1, 1, 1, 1);

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
(1, 'Clotilde', 'Pérez Gutiérrez', 'semperfidelisclotmadre', '78945612A', 'cloti2@lol.co', 666666666, '1234'),
(2, 'Auxiliadora', 'Valderrama Mendoza', 'gastroenteritis', '45645645R', 'lagastro@hotmail.com', 666666666, '1234'),
(3, 'Marieta', 'Sánchez', 'Gorgorito', '14714721F', 'asdfg@lol.co', 852852852, '1234'),
(4, 'Rodolfo', 'Summers', 'rudolf', '45824735H', 'rudolf@lol.co', 656565655, '4321'),
(6, 'Clotilde', 'Pérez Gutiérrez', 'semperfidelisclotprofe', '78945612A', 'cloti3@lol.co', 666666666, '1234');

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
  `password` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL,
  `idCentro` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `profesor`
--

INSERT INTO `profesor` (`idProfesor`, `nombre`, `apellidos`, `email`, `dni`, `telefono`, `user`, `password`, `idCentro`) VALUES
(1, 'Diego', 'Mendoza', 'dm1@alu.ua.es', '4545647P', 666666666, 'payo1', '4321', 1),
(2, 'Bernardo', 'Galipienso', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo2', '1234', 1),
(3, 'Luisa', 'Ramos', 'bg2@alu.ua.es', '85285285J', 666666666, 'paya3', '1234', 1),
(5, 'Angustias', 'López', 'bg2@alu.ua.es', '85285285J', 666666666, 'paya5', '1234', 1),
(6, 'Josefa', 'Saramago', 'bg2@alu.ua.es', '85285285J', 666666666, 'paya6', '1234', 1),
(7, 'Guillermo', 'Mata', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo7', '1234', 1),
(8, 'Carmen', 'San Diego', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo8', '1234', 1),
(9, 'Matilde', 'Salvador i Segarra', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo9', '1234', 1),
(10, 'Antonio', 'García Cayuelas', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo10', '1234', 1),
(11, 'Olegario', 'Do Marco Seller', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo11', '1234', 1),
(12, 'Margarita', 'Sastre', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo12', '1234', 1),
(13, 'Miguel', 'Serrano', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo13', '1234', 1),
(14, 'Santiago', 'Colomar', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo14', '1234', 1),
(15, 'Pep', 'Llorens', 'bg2@alu.ua.es', '85285285J', 666666666, 'payo15', '1234', 1),
(16, 'Calígula', 'Cantalejo Molina', 'calican@hoi.com', '88888888R', 966666666, 'elcali23', '1234', 1),
(17, 'Auxiliadora', 'Spencer', 'aux@aux.x', '12345678X', 123456789, 'aux34', '1234', 1),
(18, 'Muñón', 'Bombín Esperanza', 'munion@hope.com', '55555555K', 666666666, 'munion', '1234', 1),
(19, 'Clotilde', 'Pérez Gutiérrez', 'cloti3@lol.co', '78945612A', 666666666, 'semperfidelisclotprofe', '1234', 1),
(21, 'Rebujito', 'Almádena Miño', 'rebu@lol.co', '78945612Q', 666666666, 'rebu3', '1234', 2);

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
  `titulo` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tarea`
--

INSERT INTO `tarea` (`idTarea`, `descripcion`, `fecha_limite`, `fechaCreacion`, `idAsignatura`, `idProfesor`, `idCurso`, `titulo`) VALUES
(22, 'describir el ecosistema del gusano de seda', '2016-12-08', '2017-04-18 09:00:04', 1, 1, 1, 'Gusanos de seda'),
(23, 'No olvidéis la escopeta', '2018-10-10', '2017-04-18 09:02:14', 9, 9, 1, 'Matar a un ruiseñor'),
(24, 'Hacer la torre de Pisa con bastoncillos para los oídos', '2018-03-31', '2017-04-18 09:04:26', 9, 9, 1, 'Torre de Pisa'),
(25, 'Diseccionar un pollito', '2017-03-01', '2017-04-18 09:06:30', 1, 1, 1, 'Amor a la naturaleza'),
(26, 'La lannister se ha cargao a los tyrell y está muy emocionante xdd', '2017-03-09', '2017-04-18 09:10:01', 2, 2, 1, 'Ver juego de tronos'),
(27, 'Es tiempo ya', '2017-04-25', '2017-04-18 09:11:04', 1, 1, 1, 'Ir a por un zumo'),
(28, 'Y quien no vaya, que se prepare para julio', '2017-04-25', '2017-04-18 09:27:37', 1, 1, 1, 'Ir al Mad Pilots'),
(29, 'Hacer los ejercicios 3, 4 y 7', '2017-05-11', '2017-05-14 18:03:13', 1, 1, 1, 'Tabla del 2');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tipocentro`
--

CREATE TABLE `tipocentro` (
  `tipo` int(11) NOT NULL,
  `descripcion` varchar(25) CHARACTER SET utf8 COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `tipocentro`
--

INSERT INTO `tipocentro` (`tipo`, `descripcion`) VALUES
(1, 'Colegio privado'),
(2, 'Academia'),
(3, 'Academia militar'),
(4, 'Escuela episcopal');

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
(2, 'Autorización');

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
  ADD KEY `cursoycentro` (`idCurso`,`idCentro`);

--
-- Indices de la tabla `alumno_has_curso`
--
ALTER TABLE `alumno_has_curso`
  ADD PRIMARY KEY (`idAlumno`,`idCurso`,`anyo`,`anyo2`),
  ADD KEY `idAlumno` (`idAlumno`),
  ADD KEY `idcurso` (`idCurso`);

--
-- Indices de la tabla `alumno_has_examen`
--
ALTER TABLE `alumno_has_examen`
  ADD PRIMARY KEY (`alumno_idAlumno`,`examen_idExamen`);

--
-- Indices de la tabla `alumno_has_padre`
--
ALTER TABLE `alumno_has_padre`
  ADD PRIMARY KEY (`Alumno_idAlumno`,`Padre_idPadre`);

--
-- Indices de la tabla `alumno_has_tarea`
--
ALTER TABLE `alumno_has_tarea`
  ADD PRIMARY KEY (`idTarea`,`idAlumno`);

--
-- Indices de la tabla `anuncio_gestor`
--
ALTER TABLE `anuncio_gestor`
  ADD PRIMARY KEY (`idAnuncio`);

--
-- Indices de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  ADD PRIMARY KEY (`idAsignatura`);

--
-- Indices de la tabla `asignatura_has_curso_has_alumno`
--
ALTER TABLE `asignatura_has_curso_has_alumno`
  ADD PRIMARY KEY (`idAsignatura`,`idCurso`,`idAlumno`);

--
-- Indices de la tabla `asignatura_has_curso_has_centro`
--
ALTER TABLE `asignatura_has_curso_has_centro`
  ADD PRIMARY KEY (`Asignatura_idAsignatura`,`Curso_idCurso`,`centro_idCentro`);

--
-- Indices de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  ADD PRIMARY KEY (`idAsistencia`),
  ADD UNIQUE KEY `unicaasistencia` (`fecha`,`idAlumno`,`idAsignatura`,`idCurso`,`idProfesor`);

--
-- Indices de la tabla `centro`
--
ALTER TABLE `centro`
  ADD PRIMARY KEY (`idCentro`);

--
-- Indices de la tabla `centro_has_curso_has_tutor`
--
ALTER TABLE `centro_has_curso_has_tutor`
  ADD PRIMARY KEY (`idCentro`,`idCurso`);

--
-- Indices de la tabla `comentarios_sobre_el_alumno`
--
ALTER TABLE `comentarios_sobre_el_alumno`
  ADD PRIMARY KEY (`idComentarios_sobre_el_alumno`);

--
-- Indices de la tabla `comentario_alumno`
--
ALTER TABLE `comentario_alumno`
  ADD PRIMARY KEY (`idComentario`);

--
-- Indices de la tabla `comunicado`
--
ALTER TABLE `comunicado`
  ADD PRIMARY KEY (`idComunicado`);

--
-- Indices de la tabla `confirmacion_comunicado`
--
ALTER TABLE `confirmacion_comunicado`
  ADD PRIMARY KEY (`comunicado_idComunicado`,`alumno_idAlumno`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`idCurso`);

--
-- Indices de la tabla `dia_semana`
--
ALTER TABLE `dia_semana`
  ADD PRIMARY KEY (`idDia`);

--
-- Indices de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  ADD PRIMARY KEY (`idEvaluacion`);

--
-- Indices de la tabla `examen`
--
ALTER TABLE `examen`
  ADD PRIMARY KEY (`idExamen`);

--
-- Indices de la tabla `gestor`
--
ALTER TABLE `gestor`
  ADD PRIMARY KEY (`idGestor`),
  ADD KEY `usuario` (`usuario`),
  ADD KEY `idCentro` (`idCentro`);

--
-- Indices de la tabla `mencion`
--
ALTER TABLE `mencion`
  ADD PRIMARY KEY (`idMencion`);

--
-- Indices de la tabla `mensaje_alumno`
--
ALTER TABLE `mensaje_alumno`
  ADD PRIMARY KEY (`idMensaje`);

--
-- Indices de la tabla `mensaje_padre`
--
ALTER TABLE `mensaje_padre`
  ADD PRIMARY KEY (`idMensaje`);

--
-- Indices de la tabla `mensaje_profesor`
--
ALTER TABLE `mensaje_profesor`
  ADD PRIMARY KEY (`idMensaje`);

--
-- Indices de la tabla `padre`
--
ALTER TABLE `padre`
  ADD PRIMARY KEY (`idPadre`);

--
-- Indices de la tabla `profesor`
--
ALTER TABLE `profesor`
  ADD PRIMARY KEY (`idProfesor`);

--
-- Indices de la tabla `tarea`
--
ALTER TABLE `tarea`
  ADD PRIMARY KEY (`idTarea`);

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
-- AUTO_INCREMENT de la tabla `alumno`
--
ALTER TABLE `alumno`
  MODIFY `idAlumno` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
--
-- AUTO_INCREMENT de la tabla `anuncio_gestor`
--
ALTER TABLE `anuncio_gestor`
  MODIFY `idAnuncio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `asignatura`
--
ALTER TABLE `asignatura`
  MODIFY `idAsignatura` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
--
-- AUTO_INCREMENT de la tabla `asistencia`
--
ALTER TABLE `asistencia`
  MODIFY `idAsistencia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
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
-- AUTO_INCREMENT de la tabla `comunicado`
--
ALTER TABLE `comunicado`
  MODIFY `idComunicado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `idCurso` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;
--
-- AUTO_INCREMENT de la tabla `dia_semana`
--
ALTER TABLE `dia_semana`
  MODIFY `idDia` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT de la tabla `evaluacion`
--
ALTER TABLE `evaluacion`
  MODIFY `idEvaluacion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `examen`
--
ALTER TABLE `examen`
  MODIFY `idExamen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `gestor`
--
ALTER TABLE `gestor`
  MODIFY `idGestor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT de la tabla `mencion`
--
ALTER TABLE `mencion`
  MODIFY `idMencion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `mensaje_alumno`
--
ALTER TABLE `mensaje_alumno`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT de la tabla `mensaje_padre`
--
ALTER TABLE `mensaje_padre`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `mensaje_profesor`
--
ALTER TABLE `mensaje_profesor`
  MODIFY `idMensaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `padre`
--
ALTER TABLE `padre`
  MODIFY `idPadre` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- AUTO_INCREMENT de la tabla `profesor`
--
ALTER TABLE `profesor`
  MODIFY `idProfesor` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
--
-- AUTO_INCREMENT de la tabla `tarea`
--
ALTER TABLE `tarea`
  MODIFY `idTarea` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;
--
-- AUTO_INCREMENT de la tabla `tipocentro`
--
ALTER TABLE `tipocentro`
  MODIFY `tipo` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT de la tabla `tipocomunicado`
--
ALTER TABLE `tipocomunicado`
  MODIFY `idTipoComunicado` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
