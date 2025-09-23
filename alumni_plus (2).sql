-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 23, 2025 at 09:39 PM
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
  `Course` varchar(150) DEFAULT NULL,
  `Email_ID` varchar(255) DEFAULT NULL,
  `Batch` int(4) NOT NULL,
  `Password` varchar(255) NOT NULL DEFAULT 'Sgsits*123',
  `Bio` varchar(255) NOT NULL,
  `Image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`ID`, `Full_Name`, `Contact_no`, `Course`, `Email_ID`, `Batch`, `Password`, `Bio`, `Image`) VALUES
(1, 'Dhruv Patidar', '9399534994', NULL, 'dhruvpatidar35@gmail.com', 2025, 'Sgsits*123', '', ''),
(2, 'Kartik Baghel', '7828369594', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(3, 'Karina Rajawat', '6261429594', NULL, 'kareenarajavat2@gmail.com', 2025, 'Sgsits*123', '', ''),
(4, 'Yash Jain', '9893699149', NULL, 'jainrajesh0811@gmail.com', 2025, 'Sgsits*123', '', ''),
(5, 'Chahak Saklecha', '9826027611', NULL, 'pankajsaklecha.pks@gmail.com', 2025, 'Sgsits*123', '', ''),
(6, 'Himanshi Lad', '9993017384', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(7, 'Sujata More', '6261315950', NULL, 'sujatamore660@gmail.com', 2025, 'Sgsits*123', '', ''),
(8, 'Pratibha Soni', '8370008775', NULL, 'prabhatsoni2016@gmail.com', 2025, 'Sgsits*123', '', ''),
(9, 'Anishiddha', '7999879011', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(10, 'Ramkrishna Patidar', '9691605324', NULL, 'ramkrishnapatidar123@gmail.com', 2025, 'Sgsits*123', '', ''),
(11, 'Prashant Tripathi', '9131618018', NULL, 'sahil.tripathi03@gmail.com', 2025, 'Sgsits*123', '', ''),
(12, 'VINAYAK BADOLE', '7999844407', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(13, 'SARANSH JAIN', '7000773565', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(14, 'UTSAV  BANSAL', '8717906711', NULL, 'pushkarbansal14@gmail.com', 2025, 'Sgsits*123', '', ''),
(15, 'SNEHA MANDLOI', '8839935089', NULL, 'snehaamandloii@gmail.com', 2025, 'Sgsits*123', '', ''),
(16, 'Sanyam Jain', '7747949100', NULL, 'sanskarjain1997.19@gmail.com', 2025, 'Sgsits*123', '', ''),
(17, 'Akshat Davdekar', '9827206371', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(18, 'ARYAN KUMAR  VINAYAK', '9425680064', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(19, 'PRAKHAR  SINGH CHOUHAN', '9425312516', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(20, 'Shashank Pardesi', '7987493806', NULL, 'spardeshi375@gmail.com', 2025, 'Sgsits*123', '', ''),
(21, 'Ansul Khateek', '7998855167', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(22, 'Poorvi Sahu', '9425174858', NULL, 'hshankarsahu@gmail.com', 2025, 'Sgsits*123', '', ''),
(23, 'Tanmay Sharma', '9131508529', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(24, 'Churchill Aditya Jain', '6268764111', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(25, 'Shreyansh Patel', '9981051280', NULL, 'patelshreyansh376@gmail.com', 2025, 'Sgsits*123', '', ''),
(26, 'Arjun Maheshwari', '9977112999', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(27, 'Dhruv Agrawal', '7000387966', NULL, 'dhruvagrawal1080@gmail.com', 2025, 'Sgsits*123', '', ''),
(28, 'Vishesh Chouhan', '9993212388', NULL, 'visheshchouhan03@gmail.com', 2025, 'Sgsits*123', '', ''),
(29, 'Vibhum Pandey', '9826622850', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(30, 'Smita Dharwa', '9302184603', NULL, 'smitadharwa0307@gmail.com', 2025, 'Sgsits*123', '', ''),
(31, 'Adeesh Jain', '9424096347', NULL, 'adeeshapparels@gmail.com', 2025, 'Sgsits*123', '', ''),
(32, 'Srishti Khandelwar', '8827890600', NULL, 'srishti8827khandelwar@gmail.com', 2025, 'Sgsits*123', '', ''),
(33, 'Aditya Goyal', '8269164751', NULL, 'goyaladitya2212@gmail.com', 2025, 'Sgsits*123', '', ''),
(34, 'divyansh Muley', '7987283429', NULL, 'dvmuley10@gmail.com', 2025, 'Sgsits*123', '', ''),
(35, 'Rishi Gupta', '9977000744', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(36, 'RishiKesh  Evane', '9302453953', NULL, 'evanerishikesh02@gmail.com', 2025, 'Sgsits*123', '', ''),
(37, 'Shivansh Jain', '7898650580', NULL, 'shivanshjain3333@gmail.com', 2025, 'Sgsits*123', '', ''),
(38, 'Aryansh Patel', '9827637572', NULL, 'aryanshpatel12@gmail.com', 2025, 'Sgsits*123', '', ''),
(39, 'Toshika Verma', '9340326693', NULL, 'vermatoshika3@gmail.com', 2025, 'Sgsits*123', '', ''),
(40, 'Pranjal Shrivastava', '9399931346', NULL, 'shrivastavapranjal81@gmail.com', 2025, 'Sgsits*123', '', ''),
(41, 'Ayush Mishra', '9806807605', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(42, 'Ajay Kumar Shahani', '9844535341', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(43, 'Mitanshu Jain', '9755552702', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(44, 'Isha Singhai', '7489221071', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(45, 'Kamlesh Rawat', '9111971589', NULL, 'kamleshrawat676@gmail.com', 2025, 'Sgsits*123', '', ''),
(46, 'Imritanshul Sayalwar', '8602757635', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(47, 'Utkarsh Tiwari', '9300628522', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(48, 'Kshitiz Gupta', '7083355339', NULL, 'shriya.kastwar@gmail.com', 2025, 'Sgsits*123', '', ''),
(49, 'Ansh Jain', '9425065756', NULL, 'pancholimanish.mj@gmail.com', 2025, 'Sgsits*123', '', ''),
(50, 'Waris Naseer', '7006885992', NULL, 'mirwaris743@gmail.com', 2025, 'Sgsits*123', '', ''),
(51, 'Shailee Gavnekar', '7024439591', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(52, 'Aditi Solanki', '9685274267', NULL, 'hcsolanki121@gmail.com', 2025, 'Sgsits*123', '', ''),
(53, 'Deepak Agrawal', '9981088955', NULL, 'vijayaagrawal1957@gmail.com', 2025, 'Sgsits*123', '', ''),
(54, 'Pratik Parmar', '7000869905', NULL, 'pratikparmar2k3@gmail.com', 2025, 'Sgsits*123', '', ''),
(55, 'Aadityaraj baghel', '7879734648', NULL, 'xtrimix0017@gmail.com', 2025, 'Sgsits*123', '', ''),
(56, 'Tanay Bhutada', '8962404515', NULL, 'tanaybhutada03@gmail.com', 2025, 'Sgsits*123', '', ''),
(57, 'Shreya Jain', '9516110810', NULL, 'smileee0206@gmail.com', 2025, 'Sgsits*123', '', ''),
(58, 'Vedansh Shrivastava', '8319744137', NULL, 'vedanshshrivastava3@gmail.com', 2025, 'Sgsits*123', '', ''),
(59, 'Shrajan Gupta', '9893948661', NULL, 'arvindgupta2997@gmail.com', 2025, 'Sgsits*123', '', ''),
(60, 'Tushar Solanki', '9584645715', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(61, 'Akash Uikey', '7828969588', NULL, 'deepakuikey1210@gmail.com', 2025, 'Sgsits*123', '', ''),
(62, 'Ishaan Dasgupta', '9766495816', NULL, 'dasgupta.rajat@gmail.com', 2025, 'Sgsits*123', '', ''),
(63, 'Aniket Bandi', '9826018863', NULL, 'drkushbandi09@gmail.com', 2025, 'Sgsits*123', '', ''),
(64, 'Mohit Parmar', '6267040095', NULL, 'bunny242930@gmail.com', 2025, 'Sgsits*123', '', ''),
(65, 'Ananya Pathak', '9179163456', NULL, 'neelimaypathak@gmail.com', 2025, 'Sgsits*123', '', ''),
(66, 'Parmeet Kaur', '9926670505', NULL, 'pasrijaniti@gmail.com', 2025, 'Sgsits*123', '', ''),
(67, 'Akshat Singh', '9755596513', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(68, 'Sumit Gupta', '9340701423', NULL, 'guptasumit2034@gmail.com', 2025, 'Sgsits*123', '', ''),
(69, 'Shivnand Khatri', '6263668750', NULL, 'shivnand093@gmail.com', 2025, 'Sgsits*123', '', ''),
(70, 'Aman Agrawal', '8959010053', NULL, 'amanagrawal7089@gmail.com', 2025, 'Sgsits*123', '', ''),
(71, 'Somesh Pandey', '9691295166', NULL, 'someshpandey25072002@gmail.com', 2025, 'Sgsits*123', '', ''),
(72, 'Bahar Jain', '9399154677', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(73, 'Soumya Narvariya', '8269073883', NULL, 'soumyanarvariya@gmail.com', 2025, 'Sgsits*123', '', ''),
(74, 'Harsh Goel', '9109528077', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(75, 'Vivek Kushwaha', '7999466706', NULL, 'abhishek89237@gmail.com', 2025, 'Sgsits*123', '', ''),
(76, 'Piru Damor', '8815276446', NULL, 'pirudamar091@gmail.com', 2025, 'Sgsits*123', '', ''),
(77, 'Shreyansh Gupta', '9826360884', NULL, 'shreyanshgupta1814@gmail.com', 2025, 'Sgsits*123', '', ''),
(78, 'Ritika Dashore', '9109912843', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(79, 'Rahul Gond', '9165650048', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(80, 'Aditya Malviya', '9425019730', NULL, 'archanamalviya76@gmail.com', 2025, 'Sgsits*123', '', ''),
(81, 'Shreem Asati', '9826444618', NULL, 'asatishreem@gmail.com', 2025, 'Sgsits*123', '', ''),
(82, 'Nihal Shivhare', '7974729580', NULL, 'shouryashivhare2711@gmail.com', 2025, 'Sgsits*123', '', ''),
(83, 'Nikhil Kumar Kalme', '8827757980', NULL, 'nk552368@gmail.com', 2025, 'Sgsits*123', '', ''),
(84, 'Bhumika Gupta', '9691007310', NULL, 'santoshguptabob@gmail.com', 2025, 'Sgsits*123', '', ''),
(85, 'Anant Bahore', '9425905472', NULL, 'sysconmanish@gmail.com', 2025, 'Sgsits*123', '', ''),
(86, 'Ruchit Kochar', '9425346450', NULL, 'ruchitgarvit@gmail.com', 2025, 'Sgsits*123', '', ''),
(87, 'Jayesh Savaliya', '6268550392', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(88, 'Ayush Nema', '8989537053', NULL, 'preeti.nema28@gmail.com', 2025, 'Sgsits*123', '', ''),
(89, 'Ishtika Barode', '8839859073', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(90, 'Suhani Jain', '9425640190', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(91, 'Yashvardhan Singh Chauhan', '8340634217', NULL, 'rathoreavni54@gmail.com', 2025, 'Sgsits*123', '', ''),
(92, 'Sasha Ghosh', '9340050234', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(93, 'Pujan Parekh', '9926139100', NULL, 'parekhsejal1010@gmail.com', 2025, 'Sgsits*123', '', ''),
(94, 'Ashwin Alawe', '6261748932', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(95, 'Kunal Mali', '8349715745', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(96, 'Zainulabedin Rampurawala', '7746824451', NULL, 'abedinz427@gmail.com', 2025, 'Sgsits*123', '', ''),
(97, 'Mohammad Hoshangabadwala', '9669454554', NULL, 'hoshangabadwalamohammed@gmail.com', 2025, 'Sgsits*123', '', ''),
(98, 'Mantasha Bi', '9926609201', NULL, 'mantashabee26@gmail.com', 2025, 'Sgsits*123', '', ''),
(99, 'Manmay Maheshwari', '6264425063', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(100, 'Ashish Kharte', '9826963275', NULL, NULL, 2025, 'Sgsits*123', '', ''),
(101, 'Anirudh Singh Chouhan', '6263080739', NULL, 'seemaroopsingh75@gmail.com', 2025, 'Sgsits*123', '', ''),
(102, 'Chitransh Jawere', '9826048898', NULL, 'jawererajesh28@gmail.com', 2025, 'Sgsits*123', '', ''),
(103, 'Nikhil Achale', '7691912890', NULL, 'shutterbug1284@gmail.com', 2025, 'Sgsits*123', '', ''),
(104, 'Aniket Rana', '8989113350', NULL, 'abhirana0906@gmail.com', 2025, 'Sgsits*123', '', ''),
(105, 'Deepika Mandroniya', '9827210491', NULL, 'hariprasadmandroniya91@gmail.com', 2025, 'Sgsits*123', '', ''),
(106, 'Tarun Parmar', '9755146706', NULL, 'tarun@gmail.com', 2026, 'asd', 'hi i am tarun ', 0x75706c6f6164735c313735363837383737363930302e6a7067);

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `Employee_ID` varchar(255) NOT NULL,
  `Full_Name` varchar(255) NOT NULL,
  `Email_ID` varchar(150) NOT NULL,
  `Password` varchar(10) NOT NULL,
  `Linked_In` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`Employee_ID`, `Full_Name`, `Email_ID`, `Password`, `Linked_In`) VALUES
('5112', 'Teena Trivedi', 'csealumniplus1952@gmail.com', 'Sgsits*123', ''),
('0305215', 'Swati Mishra', 'mishraswati621@gmail.com', 'Sgsits*123', ''),
('0305241', 'Priya Jijnodiya', 'pjijnodiya07@gmail.com', 'Sgsits*123', ''),
('0305227', 'Chetali Neema', 'neemachetali99@gmail.com', 'Sgsits*123', ''),
('0305245', 'Ranjeet Vishwakarma', 'ranjeetvishwakarma7662@gmail.com', 'Sgsits*123', ''),
('0305228', 'Jyoti Chouhan', 'jyoti.chouhan15399@gmail.com', 'Sgsits*123', ''),
('0305225', 'Poornima Jeriya', 'pjeriya2912@gmail.com', 'Sgsits*123', ''),
('0305226', 'Ashwini Pahade', 'ashwini.pahade16@gmail.com', 'Sgsits*123', '');

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
-- Table structure for table `mentorship_requests`
--

CREATE TABLE `mentorship_requests` (
  `ID` int(11) NOT NULL,
  `Enrollment_No` varchar(20) NOT NULL,
  `Mentorship_Categories` text DEFAULT NULL,
  `Reason` text DEFAULT NULL,
  `Mode` enum('Online','In-person') DEFAULT 'Online',
  `consent` tinyint(1) DEFAULT 0,
  `submitted_on` datetime DEFAULT current_timestamp(),
  `status` enum('pending','approved') NOT NULL DEFAULT 'pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentorship_requests`
--

INSERT INTO `mentorship_requests` (`ID`, `Enrollment_No`, `Mentorship_Categories`, `Reason`, `Mode`, `consent`, `submitted_on`, `status`) VALUES
(1, '0801CS221148', 'Academic Guidance,Career Planning', 'asdvs', 'Online', 1, '2025-09-21 22:41:36', 'pending'),
(5, '0801CS221148', NULL, NULL, NULL, 1, '2025-09-23 12:02:11', 'pending'),
(6, '0801CS221148', 'Academic Guidance,Entrepreneurship', 'this is atest req', 'Online', 1, '2025-09-23 12:09:52', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `Enrollment_No` varchar(255) NOT NULL,
  `Full_Name` varchar(255) NOT NULL,
  `Course` varchar(150) NOT NULL,
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

INSERT INTO `student` (`Enrollment_No`, `Full_Name`, `Course`, `Contact_no`, `Email_ID`, `Batch`, `Password`, `Bio`, `Image`) VALUES
('0801CS221148', 'Tarun Parmar', '', '9876543210', 'tarun@example.com', 2026, 'asd', '', ''),
('0801CS221150', 'Aarav Sharma', 'B.Tech', '9876543210', 'aarav.sharma@example.com', 2023, 'Tarun*123', '', ''),
('0801CS221152', 'Isha Verma', 'B.Tech', '9123456789', 'isha.verma@example.com', 2022, 'Tarun*123', '', ''),
('0801CS221153', 'Rohan Mehta', 'B.Tech', '9988776655', 'rohan.mehta@example.com', 2024, 'Tarun*123', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `support_requests`
--

CREATE TABLE `support_requests` (
  `ID` int(11) NOT NULL,
  `Enrollment_No` varchar(20) DEFAULT NULL,
  `Alumni_ID` int(11) DEFAULT NULL,
  `Request_Title` varchar(255) DEFAULT NULL,
  `Request_Description` text DEFAULT NULL,
  `ID_Proof` varchar(255) DEFAULT NULL,
  `Status` enum('Pending','Verified','Rejected','Fulfilled') DEFAULT 'Pending',
  `Submitted_on` datetime DEFAULT current_timestamp(),
  `No_of_Request` tinyint(1) NOT NULL DEFAULT 0,
  `Fulfilled_on` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_requests`
--

INSERT INTO `support_requests` (`ID`, `Enrollment_No`, `Alumni_ID`, `Request_Title`, `Request_Description`, `ID_Proof`, `Status`, `Submitted_on`, `No_of_Request`, `Fulfilled_on`) VALUES
(2, '0801CS221148', NULL, 'NPTEL', 'thes is a test request', 'uploads\\1758611688067.png', 'Rejected', '2025-09-23 12:44:48', 1, NULL),
(3, '0801CS221150', NULL, 'IIT ', 'thes is a test request', 'uploads\\1758611759871.jpg', 'Verified', '2025-09-23 12:45:59', 1, NULL),
(4, '0801CS221152', NULL, 'IIIT ', 'thes is a test request', 'uploads\\1758611815775.jpg', 'Verified', '2025-09-23 12:46:55', 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `ID` int(11) NOT NULL,
  `Full_Name` varchar(100) NOT NULL,
  `Enrollment_No` varchar(150) DEFAULT NULL,
  `Contact_No` varchar(15) NOT NULL,
  `Email_ID` varchar(100) NOT NULL,
  `Course` varchar(50) DEFAULT NULL,
  `Role` enum('Student','Alumni') NOT NULL,
  `Batch` year(4) DEFAULT NULL,
  `Password` varchar(255) NOT NULL,
  `User_ID` varchar(50) DEFAULT NULL,
  `Submitted_On` date DEFAULT curdate(),
  `Status` enum('Pending','Verified','Rejected') DEFAULT 'Pending'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`ID`, `Full_Name`, `Enrollment_No`, `Contact_No`, `Email_ID`, `Course`, `Role`, `Batch`, `Password`, `User_ID`, `Submitted_On`, `Status`) VALUES
(1, 'Varun Pamra', '0801CS22131', '993297301', 'tarunparsgsits@gmail.com', 'B.Tech', 'Student', '2026', 'add', 'uploads\\1758652317542.png', '2025-09-24', 'Pending'),
(2, 'Tarun Parmar', '', '7722840394', 'tarunparmar457@gmail.com', 'B.Tech', 'Alumni', '2026', 'asd', 'uploads\\1758652355497.jpg', '2025-09-24', 'Pending'),
(3, 'Tarun', '0801CS221150', '9755146706', 'parnsdin@gmail.com', 'B.Tech', 'Student', '2025', 'qw', 'uploads\\1758652420063.png', '2025-09-24', 'Pending');

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
-- Indexes for table `mentorship_requests`
--
ALTER TABLE `mentorship_requests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Enrollment_No` (`Enrollment_No`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Enrollment_No`);

--
-- Indexes for table `support_requests`
--
ALTER TABLE `support_requests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Enrollment_No` (`Enrollment_No`),
  ADD KEY `Alumni_ID` (`Alumni_ID`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `Email_ID` (`Email_ID`),
  ADD UNIQUE KEY `User_ID` (`User_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `alumni`
--
ALTER TABLE `alumni`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=108;

--
-- AUTO_INCREMENT for table `mentorship_requests`
--
ALTER TABLE `mentorship_requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `support_requests`
--
ALTER TABLE `support_requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `mentorship_requests`
--
ALTER TABLE `mentorship_requests`
  ADD CONSTRAINT `mentorship_requests_ibfk_1` FOREIGN KEY (`Enrollment_No`) REFERENCES `student` (`Enrollment_No`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `support_requests`
--
ALTER TABLE `support_requests`
  ADD CONSTRAINT `support_requests_ibfk_1` FOREIGN KEY (`Enrollment_No`) REFERENCES `student` (`Enrollment_No`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `support_requests_ibfk_2` FOREIGN KEY (`Alumni_ID`) REFERENCES `alumni` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
