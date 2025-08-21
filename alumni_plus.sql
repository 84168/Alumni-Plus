-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Aug 21, 2025 at 12:24 AM
-- Server version: 8.0.43
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `alumni plus`
--

-- --------------------------------------------------------

--
-- Table structure for table `job and internship`
--

CREATE TABLE `job and internship` (
  `ID` int NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Type` varchar(50) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Duration` varchar(50) NOT NULL,
  `Description` text NOT NULL,
  `Requirements` text NOT NULL,
  `Benefits` text NOT NULL,
  `Deadline` date NOT NULL,
  `Form_Link` text NOT NULL,
  `created_At` timestamp NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `job and internship`
--

INSERT INTO `job and internship` (`ID`, `Title`, `Type`, `Location`, `Duration`, `Description`, `Requirements`, `Benefits`, `Deadline`, `Form_Link`, `created_At`) VALUES
(26, 'Frontend Developer Intern', 'Internship', 'Mumbai', '6 months', 'Analyze datasets and generate insights', 'Excel, Python, SQL', 'Flexible hours, project experience', '2025-08-02', 'https://example.com/apply3', '2025-08-20 09:52:49'),
(27, 'Frontend Developer Intern', 'Internship', 'Mumbai', '6 months', 'Analyze datasets and generate insights', 'Excel, Python, SQL', 'Flexible hours, project experience', '2025-08-02', 'https://example.com/apply3', '2025-08-20 15:47:08'),
(28, 'Data Analyst Intern', 'Internship', '	Bengaluru, India', '6 months', 'Work on UI components using React.js', 'Excel, Python, SQL', 'Flexible hours, project experience', '2025-08-02', 'https://example.com/apply3', '2025-08-20 20:46:00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int NOT NULL,
  `Full Name` varchar(100) NOT NULL,
  `Email` varchar(100) NOT NULL,
  `Role` enum('student','alumni') NOT NULL,
  `Batch` int NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Terms` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Full Name`, `Email`, `Role`, `Batch`, `Password`, `Terms`) VALUES
(1, 'Shaloni', 'tarunparmar4e57@gmail.com', 'student', 1970, 'd', 1),
(3, 'Tarun Parmar', 'tarunparma@gmail.com', 'student', 1962, 'df', 1),
(4, 'Tarun Parmar', 'tarunparsma@gmail.com', 'student', 1989, 'gh', 1),
(5, 'Tarun Parmar', 'nparmar457@gmail.com', 'alumni', 1988, '456', 1),
(6, 'bahadur', 'bahadur@gmail.com', 'alumni', 2001, 'Baha2021', 1),
(7, 'bhim', 'bhaja@gmail.com', 'student', 1952, 'asd', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `job and internship`
--
ALTER TABLE `job and internship`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email` (`Email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `job and internship`
--
ALTER TABLE `job and internship`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
