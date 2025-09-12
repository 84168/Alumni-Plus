-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2025 at 09:22 AM
-- Server version: 10.4.32-MariaDB
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
-- Table structure for table `alumni`
--

CREATE TABLE `alumni` (
  `ID` int(255) NOT NULL,
  `Full_Name` varchar(255) NOT NULL,
  `Contact_no` varchar(15) NOT NULL,
  `Email_ID` varchar(255) DEFAULT NULL,
  `Batch` int(4) NOT NULL,
  `Password` varchar(255) NOT NULL DEFAULT 'Sgsits*123',
  `Bio` varchar(255) NOT NULL,
  `Image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`ID`, `Full_Name`, `Contact_no`, `Email_ID`, `Batch`, `Password`, `Bio`, `Image`) VALUES
(1, 'Dhruv Patidar', '9399534994', 'dhruvpatidar35@gmail.com', 2025, 'Sgsits*123', '', ''),
(2, 'Kartik Baghel', '7828369594', NULL, 2025, 'Sgsits*123', '', ''),
(3, 'Karina Rajawat', '6261429594', 'kareenarajavat2@gmail.com', 2025, 'Sgsits*123', '', ''),
(4, 'Yash Jain', '9893699149', 'jainrajesh0811@gmail.com', 2025, 'Sgsits*123', '', ''),
(5, 'Chahak Saklecha', '9826027611', 'pankajsaklecha.pks@gmail.com', 2025, 'Sgsits*123', '', ''),
(6, 'Himanshi Lad', '9993017384', NULL, 2025, 'Sgsits*123', '', ''),
(7, 'Sujata More', '6261315950', 'sujatamore660@gmail.com', 2025, 'Sgsits*123', '', ''),
(8, 'Pratibha Soni', '8370008775', 'prabhatsoni2016@gmail.com', 2025, 'Sgsits*123', '', ''),
(9, 'Anishiddha', '7999879011', NULL, 2025, 'Sgsits*123', '', ''),
(10, 'Ramkrishna Patidar', '9691605324', 'ramkrishnapatidar123@gmail.com', 2025, 'Sgsits*123', '', ''),
(11, 'Prashant Tripathi', '9131618018', 'sahil.tripathi03@gmail.com', 2025, 'Sgsits*123', '', ''),
(12, 'VINAYAK BADOLE', '7999844407', NULL, 2025, 'Sgsits*123', '', ''),
(13, 'SARANSH JAIN', '7000773565', NULL, 2025, 'Sgsits*123', '', ''),
(14, 'UTSAV  BANSAL', '8717906711', 'pushkarbansal14@gmail.com', 2025, 'Sgsits*123', '', ''),
(15, 'SNEHA MANDLOI', '8839935089', 'snehaamandloii@gmail.com', 2025, 'Sgsits*123', '', ''),
(16, 'Sanyam Jain', '7747949100', 'sanskarjain1997.19@gmail.com', 2025, 'Sgsits*123', '', ''),
(17, 'Akshat Davdekar', '9827206371', NULL, 2025, 'Sgsits*123', '', ''),
(18, 'ARYAN KUMAR  VINAYAK', '9425680064', NULL, 2025, 'Sgsits*123', '', ''),
(19, 'PRAKHAR  SINGH CHOUHAN', '9425312516', NULL, 2025, 'Sgsits*123', '', ''),
(20, 'Shashank Pardesi', '7987493806', 'spardeshi375@gmail.com', 2025, 'Sgsits*123', '', ''),
(21, 'Ansul Khateek', '7998855167', NULL, 2025, 'Sgsits*123', '', ''),
(22, 'Poorvi Sahu', '9425174858', 'hshankarsahu@gmail.com', 2025, 'Sgsits*123', '', ''),
(23, 'Tanmay Sharma', '9131508529', NULL, 2025, 'Sgsits*123', '', ''),
(24, 'Churchill Aditya Jain', '6268764111', NULL, 2025, 'Sgsits*123', '', ''),
(25, 'Shreyansh Patel', '9981051280', 'patelshreyansh376@gmail.com', 2025, 'Sgsits*123', '', ''),
(26, 'Arjun Maheshwari', '9977112999', NULL, 2025, 'Sgsits*123', '', ''),
(27, 'Dhruv Agrawal', '7000387966', 'dhruvagrawal1080@gmail.com', 2025, 'Sgsits*123', '', ''),
(28, 'Vishesh Chouhan', '9993212388', 'visheshchouhan03@gmail.com', 2025, 'Sgsits*123', '', ''),
(29, 'Vibhum Pandey', '9826622850', NULL, 2025, 'Sgsits*123', '', ''),
(30, 'Smita Dharwa', '9302184603', 'smitadharwa0307@gmail.com', 2025, 'Sgsits*123', '', ''),
(31, 'Adeesh Jain', '9424096347', 'adeeshapparels@gmail.com', 2025, 'Sgsits*123', '', ''),
(32, 'Srishti Khandelwar', '8827890600', 'srishti8827khandelwar@gmail.com', 2025, 'Sgsits*123', '', ''),
(33, 'Aditya Goyal', '8269164751', 'goyaladitya2212@gmail.com', 2025, 'Sgsits*123', '', ''),
(34, 'divyansh Muley', '7987283429', 'dvmuley10@gmail.com', 2025, 'Sgsits*123', '', ''),
(35, 'Rishi Gupta', '9977000744', NULL, 2025, 'Sgsits*123', '', ''),
(36, 'RishiKesh  Evane', '9302453953', 'evanerishikesh02@gmail.com', 2025, 'Sgsits*123', '', ''),
(37, 'Shivansh Jain', '7898650580', 'shivanshjain3333@gmail.com', 2025, 'Sgsits*123', '', ''),
(38, 'Aryansh Patel', '9827637572', 'aryanshpatel12@gmail.com', 2025, 'Sgsits*123', '', ''),
(39, 'Toshika Verma', '9340326693', 'vermatoshika3@gmail.com', 2025, 'Sgsits*123', '', ''),
(40, 'Pranjal Shrivastava', '9399931346', 'shrivastavapranjal81@gmail.com', 2025, 'Sgsits*123', '', ''),
(41, 'Ayush Mishra', '9806807605', NULL, 2025, 'Sgsits*123', '', ''),
(42, 'Ajay Kumar Shahani', '9844535341', NULL, 2025, 'Sgsits*123', '', ''),
(43, 'Mitanshu Jain', '9755552702', NULL, 2025, 'Sgsits*123', '', ''),
(44, 'Isha Singhai', '7489221071', NULL, 2025, 'Sgsits*123', '', ''),
(45, 'Kamlesh Rawat', '9111971589', 'kamleshrawat676@gmail.com', 2025, 'Sgsits*123', '', ''),
(46, 'Imritanshul Sayalwar', '8602757635', NULL, 2025, 'Sgsits*123', '', ''),
(47, 'Utkarsh Tiwari', '9300628522', NULL, 2025, 'Sgsits*123', '', ''),
(48, 'Kshitiz Gupta', '7083355339', 'shriya.kastwar@gmail.com', 2025, 'Sgsits*123', '', ''),
(49, 'Ansh Jain', '9425065756', 'pancholimanish.mj@gmail.com', 2025, 'Sgsits*123', '', ''),
(50, 'Waris Naseer', '7006885992', 'mirwaris743@gmail.com', 2025, 'Sgsits*123', '', ''),
(51, 'Shailee Gavnekar', '7024439591', NULL, 2025, 'Sgsits*123', '', ''),
(52, 'Aditi Solanki', '9685274267', 'hcsolanki121@gmail.com', 2025, 'Sgsits*123', '', ''),
(53, 'Deepak Agrawal', '9981088955', 'vijayaagrawal1957@gmail.com', 2025, 'Sgsits*123', '', ''),
(54, 'Pratik Parmar', '7000869905', 'pratikparmar2k3@gmail.com', 2025, 'Sgsits*123', '', ''),
(55, 'Aadityaraj baghel', '7879734648', 'xtrimix0017@gmail.com', 2025, 'Sgsits*123', '', ''),
(56, 'Tanay Bhutada', '8962404515', 'tanaybhutada03@gmail.com', 2025, 'Sgsits*123', '', ''),
(57, 'Shreya Jain', '9516110810', 'smileee0206@gmail.com', 2025, 'Sgsits*123', '', ''),
(58, 'Vedansh Shrivastava', '8319744137', 'vedanshshrivastava3@gmail.com', 2025, 'Sgsits*123', '', ''),
(59, 'Shrajan Gupta', '9893948661', 'arvindgupta2997@gmail.com', 2025, 'Sgsits*123', '', ''),
(60, 'Tushar Solanki', '9584645715', NULL, 2025, 'Sgsits*123', '', ''),
(61, 'Akash Uikey', '7828969588', 'deepakuikey1210@gmail.com', 2025, 'Sgsits*123', '', ''),
(62, 'Ishaan Dasgupta', '9766495816', 'dasgupta.rajat@gmail.com', 2025, 'Sgsits*123', '', ''),
(63, 'Aniket Bandi', '9826018863', 'drkushbandi09@gmail.com', 2025, 'Sgsits*123', '', ''),
(64, 'Mohit Parmar', '6267040095', 'bunny242930@gmail.com', 2025, 'Sgsits*123', '', ''),
(65, 'Ananya Pathak', '9179163456', 'neelimaypathak@gmail.com', 2025, 'Sgsits*123', '', ''),
(66, 'Parmeet Kaur', '9926670505', 'pasrijaniti@gmail.com', 2025, 'Sgsits*123', '', ''),
(67, 'Akshat Singh', '9755596513', NULL, 2025, 'Sgsits*123', '', ''),
(68, 'Sumit Gupta', '9340701423', 'guptasumit2034@gmail.com', 2025, 'Sgsits*123', '', ''),
(69, 'Shivnand Khatri', '6263668750', 'shivnand093@gmail.com', 2025, 'Sgsits*123', '', ''),
(70, 'Aman Agrawal', '8959010053', 'amanagrawal7089@gmail.com', 2025, 'Sgsits*123', '', ''),
(71, 'Somesh Pandey', '9691295166', 'someshpandey25072002@gmail.com', 2025, 'Sgsits*123', '', ''),
(72, 'Bahar Jain', '9399154677', NULL, 2025, 'Sgsits*123', '', ''),
(73, 'Soumya Narvariya', '8269073883', 'soumyanarvariya@gmail.com', 2025, 'Sgsits*123', '', ''),
(74, 'Harsh Goel', '9109528077', NULL, 2025, 'Sgsits*123', '', ''),
(75, 'Vivek Kushwaha', '7999466706', 'abhishek89237@gmail.com', 2025, 'Sgsits*123', '', ''),
(76, 'Piru Damor', '8815276446', 'pirudamar091@gmail.com', 2025, 'Sgsits*123', '', ''),
(77, 'Shreyansh Gupta', '9826360884', 'shreyanshgupta1814@gmail.com', 2025, 'Sgsits*123', '', ''),
(78, 'Ritika Dashore', '9109912843', NULL, 2025, 'Sgsits*123', '', ''),
(79, 'Rahul Gond', '9165650048', NULL, 2025, 'Sgsits*123', '', ''),
(80, 'Aditya Malviya', '9425019730', 'archanamalviya76@gmail.com', 2025, 'Sgsits*123', '', ''),
(81, 'Shreem Asati', '9826444618', 'asatishreem@gmail.com', 2025, 'Sgsits*123', '', ''),
(82, 'Nihal Shivhare', '7974729580', 'shouryashivhare2711@gmail.com', 2025, 'Sgsits*123', '', ''),
(83, 'Nikhil Kumar Kalme', '8827757980', 'nk552368@gmail.com', 2025, 'Sgsits*123', '', ''),
(84, 'Bhumika Gupta', '9691007310', 'santoshguptabob@gmail.com', 2025, 'Sgsits*123', '', ''),
(85, 'Anant Bahore', '9425905472', 'sysconmanish@gmail.com', 2025, 'Sgsits*123', '', ''),
(86, 'Ruchit Kochar', '9425346450', 'ruchitgarvit@gmail.com', 2025, 'Sgsits*123', '', ''),
(87, 'Jayesh Savaliya', '6268550392', NULL, 2025, 'Sgsits*123', '', ''),
(88, 'Ayush Nema', '8989537053', 'preeti.nema28@gmail.com', 2025, 'Sgsits*123', '', ''),
(89, 'Ishtika Barode', '8839859073', NULL, 2025, 'Sgsits*123', '', ''),
(90, 'Suhani Jain', '9425640190', NULL, 2025, 'Sgsits*123', '', ''),
(91, 'Yashvardhan Singh Chauhan', '8340634217', 'rathoreavni54@gmail.com', 2025, 'Sgsits*123', '', ''),
(92, 'Sasha Ghosh', '9340050234', NULL, 2025, 'Sgsits*123', '', ''),
(93, 'Pujan Parekh', '9926139100', 'parekhsejal1010@gmail.com', 2025, 'Sgsits*123', '', ''),
(94, 'Ashwin Alawe', '6261748932', NULL, 2025, 'Sgsits*123', '', ''),
(95, 'Kunal Mali', '8349715745', NULL, 2025, 'Sgsits*123', '', ''),
(96, 'Zainulabedin Rampurawala', '7746824451', 'abedinz427@gmail.com', 2025, 'Sgsits*123', '', ''),
(97, 'Mohammad Hoshangabadwala', '9669454554', 'hoshangabadwalamohammed@gmail.com', 2025, 'Sgsits*123', '', ''),
(98, 'Mantasha Bi', '9926609201', 'mantashabee26@gmail.com', 2025, 'Sgsits*123', '', ''),
(99, 'Manmay Maheshwari', '6264425063', NULL, 2025, 'Sgsits*123', '', ''),
(100, 'Ashish Kharte', '9826963275', NULL, 2025, 'Sgsits*123', '', ''),
(101, 'Anirudh Singh Chouhan', '6263080739', 'seemaroopsingh75@gmail.com', 2025, 'Sgsits*123', '', ''),
(102, 'Chitransh Jawere', '9826048898', 'jawererajesh28@gmail.com', 2025, 'Sgsits*123', '', ''),
(103, 'Nikhil Achale', '7691912890', 'shutterbug1284@gmail.com', 2025, 'Sgsits*123', '', ''),
(104, 'Aniket Rana', '8989113350', 'abhirana0906@gmail.com', 2025, 'Sgsits*123', '', ''),
(105, 'Deepika Mandroniya', '9827210491', 'hariprasadmandroniya91@gmail.com', 2025, 'Sgsits*123', '', ''),
(106, 'Tarun Parmar', '9755146706', 'tarun@gmail.com', 2026, 'asd', 'hi i am tarun ', 0x75706c6f6164735c313735363837383737363930302e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `job and internship`
--

CREATE TABLE `job and internship` (
  `Title` varchar(255) NOT NULL,
  `Type` varchar(150) NOT NULL,
  `Location` varchar(100) NOT NULL,
  `Duration` varchar(50) NOT NULL,
  `Description` varchar(355) NOT NULL,
  `Requirement` varchar(255) NOT NULL,
  `Benefits` varchar(150) NOT NULL,
  `Deadline` varchar(100) NOT NULL,
  `Form_Link` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `job and internship`
--

INSERT INTO `job and internship` (`Title`, `Type`, `Location`, `Duration`, `Description`, `Requirement`, `Benefits`, `Deadline`, `Form_Link`) VALUES
('Frontend Developer Intern', 'Internship', 'Mumbai', '6 months', 'Work on UI components using React.js', 'Basic knowledge of HTML, CSS, JS', 'Certificate, flexible schedule, opportunity to work on real campaigns.', '2025-09-11', 'https://example.com/apply3');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Enrollment_No` varchar(255) NOT NULL,
  `Full_Name` varchar(255) NOT NULL,
  `Contact_no` varchar(15) NOT NULL,
  `Email_ID` varchar(255) NOT NULL,
  `Batch` int(4) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `Bio` varchar(255) NOT NULL,
  `Image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Enrollment_No`, `Full_Name`, `Contact_no`, `Email_ID`, `Batch`, `Password`, `Bio`, `Image`) VALUES
('0801CS221148', 'Tarun Parmar', '9876543210', 'tarun@example.com', 2026, 'asd', '', ''),
('1', 'Tarun Parmar', '993397301', 'tarun@email.com', 2026, 'Tarun*123', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `alumni`
--
ALTER TABLE `alumni`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Contact_no` (`Contact_no`),
  ADD UNIQUE KEY `Email_ID` (`Email_ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Enrollment_No`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
