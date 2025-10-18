-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 31-03-2024 a las 10:13:51
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `crud`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `articulos`
--

CREATE TABLE `articulos` (
  `id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `cuerpo` text DEFAULT NULL,
  `autor` varchar(255) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `articulos`
--

INSERT INTO `articulos` (`id`, `titulo`, `cuerpo`, `autor`, `created_at`, `updated_at`) VALUES
(1, 'Un titulo', 'Un cuerpo', 'Un autor', '2024-03-24 04:14:28', '2024-03-24 04:14:28'),
(3, 'Un titulo2', 'Un cuerpo2', 'Un autor2', '2024-03-24 04:52:51', '2024-03-24 04:52:51'),
(4, 'db1', 'db1', 'db1', '2024-03-30 04:44:32', '2024-03-30 04:44:32'),
(5, 'vacio', 'vacio', 'vacio', '2024-03-31 07:47:30', '2024-03-31 07:47:30'),
(6, 'vacio', 'vacio', 'vacio', '2024-03-31 07:50:09', '2024-03-31 07:50:09'),
(7, 'vacio', 'vacio', 'vacio', '2024-03-31 07:52:16', '2024-03-31 07:52:16'),
(8, 'fa', 'fasf', 'afsa', '2024-03-31 07:59:57', '2024-03-31 07:59:57'),
(9, 'fa', 'fasf', 'afsa', '2024-03-31 08:00:09', '2024-03-31 08:00:09'),
(10, 'Api', 'Api', 'Api', '2024-03-31 08:02:02', '2024-03-31 08:02:02');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `articulos`
--
ALTER TABLE `articulos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `articulos`
--
ALTER TABLE `articulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
