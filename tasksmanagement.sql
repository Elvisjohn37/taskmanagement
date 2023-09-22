-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 22, 2023 at 03:33 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasksmanagement`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `status_id` int(11) NOT NULL,
  `name` text NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `user_id`, `status_id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(65, 53, 0, 'Assessment', 'To be submit before 11am', '2023-09-21 17:23:32', '2023-09-21 17:23:32'),
(66, 53, 2, 'ffff', 'ffff', '2023-09-21 17:23:46', '2023-09-21 17:25:02'),
(67, 53, 1, 'ffff', 'ffff', '2023-09-21 17:24:33', '2023-09-21 17:25:19'),
(68, 53, 0, 'ffff', 'ffff', '2023-09-21 17:25:09', '2023-09-21 17:25:09'),
(69, 53, 0, 'test', 'test description', '2023-09-21 17:25:56', '2023-09-21 17:25:56');

-- --------------------------------------------------------

--
-- Table structure for table `taskstatus`
--

CREATE TABLE `taskstatus` (
  `id` int(11) NOT NULL,
  `status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `taskstatus`
--

INSERT INTO `taskstatus` (`id`, `status`) VALUES
(1, 'To Do'),
(2, 'In Progress'),
(3, 'Completed');

-- --------------------------------------------------------

--
-- Table structure for table `trashes`
--

CREATE TABLE `trashes` (
  `id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `trashes`
--

INSERT INTO `trashes` (`id`, `task_id`, `created_at`, `updated_at`) VALUES
(19, 65, '2023-09-21 17:24:24', '2023-09-21 17:24:24'),
(20, 67, '2023-09-21 17:24:44', '2023-09-21 17:24:44'),
(21, 66, '2023-09-21 17:25:26', '2023-09-21 17:25:26'),
(22, 68, '2023-09-21 17:25:35', '2023-09-21 17:25:35');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(50) NOT NULL,
  `email` text NOT NULL,
  `password` text NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `updated_at`, `created_at`) VALUES
(53, 'Elvis John', 'elvis@gg.com', '$2y$10$IE5Rgm8eRxzL4A.122HtfOVn80MndGJMBVDmhy4/LX5wZxBK8sI/W', '2023-09-21 17:22:28', '2023-09-21 17:22:28');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `taskstatus`
--
ALTER TABLE `taskstatus`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `trashes`
--
ALTER TABLE `trashes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=70;

--
-- AUTO_INCREMENT for table `taskstatus`
--
ALTER TABLE `taskstatus`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `trashes`
--
ALTER TABLE `trashes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
