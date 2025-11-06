-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 06, 2025 at 11:53 PM
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
  `Mentorship` int(1) DEFAULT 0,
  `needs_supported` int(1) NOT NULL DEFAULT 0,
  `Password` varchar(255) NOT NULL DEFAULT 'Sgsits*123',
  `Bio` varchar(255) NOT NULL,
  `Image` blob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `alumni`
--

INSERT INTO `alumni` (`ID`, `Full_Name`, `Contact_no`, `Course`, `Email_ID`, `Batch`, `Mentorship`, `needs_supported`, `Password`, `Bio`, `Image`) VALUES
(1, 'Dhruv Patidar', '9399534994', NULL, 'dhruvpatidar35@gmail.com', 2025, 1, 1, 'Sgsits*123', '', ''),
(2, 'Kartik Baghel', '7828369594', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(3, 'Karina Rajawat', '6261429594', NULL, 'kareenarajavat2@gmail.com', 2025, 0, 1, 'Sgsits*123', '', ''),
(4, 'Yash Jain', '9893699149', NULL, 'jainrajesh0811@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(5, 'Chahak Saklecha', '9826027611', NULL, 'pankajsaklecha.pks@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(6, 'Himanshi Lad', '9993017384', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(7, 'Sujata More', '6261315950', NULL, 'sujatamore660@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(8, 'Pratibha Soni', '8370008775', NULL, 'prabhatsoni2016@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(9, 'Anishiddha', '7999879011', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(10, 'Ramkrishna Patidar', '9691605324', NULL, 'ramkrishnapatidar123@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(11, 'Prashant Tripathi', '9131618018', NULL, 'sahil.tripathi03@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(12, 'VINAYAK BADOLE', '7999844407', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(13, 'SARANSH JAIN', '7000773565', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(14, 'UTSAV  BANSAL', '8717906711', NULL, 'pushkarbansal14@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(15, 'SNEHA MANDLOI', '8839935089', NULL, 'snehaamandloii@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(16, 'Sanyam Jain', '7747949100', NULL, 'sanskarjain1997.19@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(17, 'Akshat Davdekar', '9827206371', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(18, 'ARYAN KUMAR  VINAYAK', '9425680064', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(19, 'PRAKHAR  SINGH CHOUHAN', '9425312516', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(20, 'Shashank Pardesi', '7987493806', NULL, 'spardeshi375@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(21, 'Ansul Khateek', '7998855167', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(22, 'Poorvi Sahu', '9425174858', NULL, 'hshankarsahu@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(23, 'Tanmay Sharma', '9131508529', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(24, 'Churchill Aditya Jain', '6268764111', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(25, 'Shreyansh Patel', '9981051280', NULL, 'patelshreyansh376@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(26, 'Arjun Maheshwari', '9977112999', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(27, 'Dhruv Agrawal', '7000387966', NULL, 'dhruvagrawal1080@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(28, 'Vishesh Chouhan', '9993212388', NULL, 'visheshchouhan03@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(29, 'Vibhum Pandey', '9826622850', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(30, 'Smita Dharwa', '9302184603', NULL, 'smitadharwa0307@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(31, 'Adeesh Jain', '9424096347', NULL, 'adeeshapparels@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(32, 'Srishti Khandelwar', '8827890600', NULL, 'srishti8827khandelwar@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(33, 'Aditya Goyal', '8269164751', NULL, 'goyaladitya2212@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(34, 'divyansh Muley', '7987283429', NULL, 'dvmuley10@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(35, 'Rishi Gupta', '9977000744', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(36, 'RishiKesh  Evane', '9302453953', NULL, 'evanerishikesh02@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(37, 'Shivansh Jain', '7898650580', NULL, 'shivanshjain3333@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(38, 'Aryansh Patel', '9827637572', NULL, 'aryanshpatel12@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(39, 'Toshika Verma', '9340326693', NULL, 'vermatoshika3@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(40, 'Pranjal Shrivastava', '9399931346', NULL, 'shrivastavapranjal81@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(41, 'Ayush Mishra', '9806807605', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(42, 'Ajay Kumar Shahani', '9844535341', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(43, 'Mitanshu Jain', '9755552702', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(44, 'Isha Singhai', '7489221071', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(45, 'Kamlesh Rawat', '9111971589', NULL, 'kamleshrawat676@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(46, 'Imritanshul Sayalwar', '8602757635', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(47, 'Utkarsh Tiwari', '9300628522', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(48, 'Kshitiz Gupta', '7083355339', NULL, 'shriya.kastwar@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(49, 'Ansh Jain', '9425065756', NULL, 'pancholimanish.mj@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(50, 'Waris Naseer', '7006885992', NULL, 'mirwaris743@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(51, 'Shailee Gavnekar', '7024439591', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(52, 'Aditi Solanki', '9685274267', NULL, 'hcsolanki121@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(53, 'Deepak Agrawal', '9981088955', NULL, 'vijayaagrawal1957@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(54, 'Pratik Parmar', '7000869905', NULL, 'pratikparmar2k3@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(55, 'Aadityaraj baghel', '7879734648', NULL, 'xtrimix0017@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(56, 'Tanay Bhutada', '8962404515', NULL, 'tanaybhutada03@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(57, 'Shreya Jain', '9516110810', NULL, 'smileee0206@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(58, 'Vedansh Shrivastava', '8319744137', NULL, 'vedanshshrivastava3@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(59, 'Shrajan Gupta', '9893948661', NULL, 'arvindgupta2997@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(60, 'Tushar Solanki', '9584645715', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(61, 'Akash Uikey', '7828969588', NULL, 'deepakuikey1210@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(62, 'Ishaan Dasgupta', '9766495816', NULL, 'dasgupta.rajat@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(63, 'Aniket Bandi', '9826018863', NULL, 'drkushbandi09@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(64, 'Mohit Parmar', '6267040095', NULL, 'bunny242930@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(65, 'Ananya Pathak', '9179163456', NULL, 'neelimaypathak@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(66, 'Parmeet Kaur', '9926670505', NULL, 'pasrijaniti@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(67, 'Akshat Singh', '9755596513', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(68, 'Sumit Gupta', '9340701423', NULL, 'guptasumit2034@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(69, 'Shivnand Khatri', '6263668750', NULL, 'shivnand093@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(70, 'Aman Agrawal', '8959010053', NULL, 'amanagrawal7089@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(71, 'Somesh Pandey', '9691295166', NULL, 'someshpandey25072002@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(72, 'Bahar Jain', '9399154677', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(73, 'Soumya Narvariya', '8269073883', NULL, 'soumyanarvariya@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(74, 'Harsh Goel', '9109528077', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(75, 'Vivek Kushwaha', '7999466706', NULL, 'abhishek89237@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(76, 'Piru Damor', '8815276446', NULL, 'pirudamar091@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(77, 'Shreyansh Gupta', '9826360884', NULL, 'shreyanshgupta1814@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(78, 'Ritika Dashore', '9109912843', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(79, 'Rahul Gond', '9165650048', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(80, 'Aditya Malviya', '9425019730', NULL, 'archanamalviya76@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(81, 'Shreem Asati', '9826444618', NULL, 'asatishreem@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(82, 'Nihal Shivhare', '7974729580', NULL, 'shouryashivhare2711@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(83, 'Nikhil Kumar Kalme', '8827757980', NULL, 'nk552368@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(84, 'Bhumika Gupta', '9691007310', NULL, 'santoshguptabob@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(85, 'Anant Bahore', '9425905472', NULL, 'sysconmanish@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(86, 'Ruchit Kochar', '9425346450', NULL, 'ruchitgarvit@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(87, 'Jayesh Savaliya', '6268550392', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(88, 'Ayush Nema', '8989537053', NULL, 'preeti.nema28@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(89, 'Ishtika Barode', '8839859073', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(90, 'Suhani Jain', '9425640190', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(91, 'Yashvardhan Singh Chauhan', '8340634217', NULL, 'rathoreavni54@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(92, 'Sasha Ghosh', '9340050234', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(93, 'Pujan Parekh', '9926139100', NULL, 'parekhsejal1010@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(94, 'Ashwin Alawe', '6261748932', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(95, 'Kunal Mali', '8349715745', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(96, 'Zainulabedin Rampurawala', '7746824451', NULL, 'abedinz427@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(97, 'Mohammad Hoshangabadwala', '9669454554', NULL, 'hoshangabadwalamohammed@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(98, 'Mantasha Bi', '9926609201', NULL, 'mantashabee26@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(99, 'Manmay Maheshwari', '6264425063', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(100, 'Ashish Kharte', '9826963275', NULL, NULL, 2025, 0, 0, 'Sgsits*123', '', ''),
(101, 'Anirudh Singh Chouhan', '6263080739', NULL, 'seemaroopsingh75@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(102, 'Chitransh Jawere', '9826048898', NULL, 'jawererajesh28@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(103, 'Nikhil Achale', '7691912890', NULL, 'shutterbug1284@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(104, 'Aniket Rana', '8989113350', NULL, 'abhirana0906@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(105, 'Deepika Mandroniya', '9827210491', NULL, 'hariprasadmandroniya91@gmail.com', 2025, 0, 0, 'Sgsits*123', '', ''),
(106, 'Tarun Parmar', '9755146706', NULL, 'tarun@gmail.com', 2026, 0, 0, 'asd', 'hi i am tarun ', 0x75706c6f6164735c313735363837383737363930302e6a7067),
(108, 'Tarun Parmar', '7722840394', 'B.Tech', 'tarunparmar457@gmail.com', 2026, 1, 1, 'asd', '', ''),
(111, 'hassan shekh', '7845850394', 'B.Tech', 'tarun221148@gmail.com', 1998, 0, 0, 'asd', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `announcement`
--

CREATE TABLE `announcement` (
  `ID` int(11) NOT NULL,
  `Title` varchar(255) NOT NULL,
  `Description` text DEFAULT NULL,
  `Important_Links` text DEFAULT NULL,
  `Posted_On` varchar(150) NOT NULL,
  `Attachment_Url` varchar(500) DEFAULT NULL,
  `Visibility` enum('All Users','Alumni','Student','Faculty') DEFAULT 'All Users'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `announcement`
--

INSERT INTO `announcement` (`ID`, `Title`, `Description`, `Important_Links`, `Posted_On`, `Attachment_Url`, `Visibility`) VALUES
(4, 'Post Metric Scholarship', 'sory now required', 'http://localhost:8080/login_check', '2025-09-26', 'uploads\\1758903846648.png', 'Student'),
(5, 'Gate 2026', 'THis is a fake announcement', 'http://localhost:8080/login_check', '2025-10-01', 'uploads\\1758996582889.png', 'Student'),
(6, 'Ai Pro and Bro', 'Artificial Intelligence (AI) is the simulation of human intelligence by machines. It enables systems to learn, reason, and solve problems, often outperforming humans in speed and accuracy. AI powers technologies like voice assistants, recommendation engines, and autonomous vehicles. It’s revolutionizing industries—from healthcare to finance—by enhancing efficiency and decision-making. As AI evolves, ethical considerations around privacy, bias, and job displacement grow increasingly important. Ultimately, AI holds immense potential to reshape our world, offering both opportunities and challenges for the future.', 'http://localhost:8080/login_check', '2025-09-26', 'uploads\\1759022069237.pdf', 'Student'),
(7, 'Alumni Meetiup', 'this is a fake meet up and writte by taarun', 'http://localhost:8080/login_check', '2025-10-04', 'uploads\\1759598264226.png', 'Alumni'),
(8, 'faculy announcement', 'this is a fake ann from faculty', 'http://localhost:8080/login_check', '2025-10-25', 'uploads\\1759830145062.png', 'Alumni');

-- --------------------------------------------------------

--
-- Table structure for table `conversation`
--

CREATE TABLE `conversation` (
  `id` int(11) NOT NULL,
  `support_id` int(11) NOT NULL,
  `sender_id` varchar(50) NOT NULL,
  `sender_role` enum('alumni','faculty') NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `conversation`
--

INSERT INTO `conversation` (`id`, `support_id`, `sender_id`, `sender_role`, `message`, `created_at`) VALUES
(1, 5, '0801CS241148', '', 'heelo sir', '2025-11-06 22:42:02'),
(2, 5, '108', 'alumni', 'helo tanish how you doing', '2025-11-06 22:42:23'),
(3, 5, '108', 'alumni', 'hmm', '2025-11-06 22:42:51');

-- --------------------------------------------------------

--
-- Table structure for table `discussion_forum`
--

CREATE TABLE `discussion_forum` (
  `id` int(11) NOT NULL,
  `student_id` varchar(50) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `category` varchar(100) DEFAULT 'General',
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `attachment_url` varchar(500) DEFAULT NULL,
  `views_count` int(11) DEFAULT 0,
  `replies_count` int(11) DEFAULT 0,
  `is_resolved` tinyint(1) DEFAULT 0,
  `status` enum('active','closed','archived') DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exit_form`
--

CREATE TABLE `exit_form` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `university_rollno` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `date_of_birth` date NOT NULL,
  `gender` enum('Male','Female','Other') NOT NULL,
  `permanent_address` text NOT NULL,
  `current_address` text DEFAULT NULL,
  `branch` varchar(100) NOT NULL,
  `year_of_education` year(4) NOT NULL,
  `cgpa` decimal(4,2) NOT NULL,
  `backlog` int(11) DEFAULT 0,
  `honors_minor_specialization` text DEFAULT NULL,
  `project_thesis_title` text DEFAULT NULL,
  `internship_completed` text DEFAULT NULL,
  `company_name` varchar(100) DEFAULT NULL,
  `job_role` varchar(100) DEFAULT NULL,
  `ctc_offered` decimal(10,2) DEFAULT NULL,
  `joining_date` date DEFAULT NULL,
  `location_of_posting` varchar(100) DEFAULT NULL,
  `offer_letter_upload` varchar(255) DEFAULT NULL,
  `future_course_name` varchar(100) DEFAULT NULL,
  `future_university_name` varchar(100) DEFAULT NULL,
  `future_country` varchar(100) DEFAULT NULL,
  `admission_status` enum('Confirmed','Awaiting') DEFAULT NULL,
  `entrepreneurship_plans` text DEFAULT NULL,
  `govt_exam_prep` text DEFAULT NULL,
  `other_plans` text DEFAULT NULL,
  `rate_institution` int(6) DEFAULT NULL,
  `experience` text DEFAULT NULL,
  `suggestions` text DEFAULT NULL,
  `alumni_network` tinyint(1) DEFAULT 0,
  `alumni_consent` tinyint(1) DEFAULT 0,
  `data_consent` tinyint(1) DEFAULT 0,
  `digital_signature` varchar(100) NOT NULL,
  `date_of_submission` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `exit_form`
--

INSERT INTO `exit_form` (`id`, `full_name`, `university_rollno`, `email`, `phone`, `date_of_birth`, `gender`, `permanent_address`, `current_address`, `branch`, `year_of_education`, `cgpa`, `backlog`, `honors_minor_specialization`, `project_thesis_title`, `internship_completed`, `company_name`, `job_role`, `ctc_offered`, `joining_date`, `location_of_posting`, `offer_letter_upload`, `future_course_name`, `future_university_name`, `future_country`, `admission_status`, `entrepreneurship_plans`, `govt_exam_prep`, `other_plans`, `rate_institution`, `experience`, `suggestions`, `alumni_network`, `alumni_consent`, `data_consent`, `digital_signature`, `date_of_submission`, `created_at`) VALUES
(1, 'Tarun Parmar', '0801cs221148', 'tarunparmar457@gmail.com', '07722840394', '2025-10-09', 'Male', 'F-74-IV, LUV KUSH AWAS VIHAR, MR10 ROAD, INDORE -452001, MADHYA PRADESH\r\nF-74-IV, LUV KUSH AWAS VIHAR, MR10 ROAD, INDORE -452001, MADHYA PRADESH', NULL, 'Computer Science & Engineering', '2026', 9.00, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 5, NULL, NULL, 1, 1, 1, 'Arun pamar', '2025-10-08', '2025-10-08 09:33:29');

-- --------------------------------------------------------

--
-- Table structure for table `faculty`
--

CREATE TABLE `faculty` (
  `Employee_ID` varchar(255) NOT NULL,
  `Full_Name` varchar(255) NOT NULL,
  `Email_ID` varchar(150) DEFAULT NULL,
  `Password` varchar(10) NOT NULL,
  `Linked_In` varchar(255) NOT NULL,
  `Assigned` int(1) NOT NULL DEFAULT 0,
  `contact` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `faculty`
--

INSERT INTO `faculty` (`Employee_ID`, `Full_Name`, `Email_ID`, `Password`, `Linked_In`, `Assigned`, `contact`) VALUES
('0305215', 'Swati Mishra', 'mishraswati621@gmail.com', 'Sgsits*123', '', 1, '9009937763'),
('0305225', 'Poornima Jeriya', 'pjeriya2912@gmail.com', 'Sgsits*123', '', 1, NULL),
('0305226', 'Ashwini Pahade', 'ashwini.pahade16@gmail.com', 'Sgsits*123', '', 1, '9503218090'),
('0305227', 'Chetali Neema', 'neemachetali99@gmail.com', 'Sgsits*123', '', 1, '8109545695'),
('0305228', 'Jyoti Chouhan', 'jyoti.chouhan15399@gmail.com', 'Sgsits*123', '', 0, NULL),
('0305241', 'Priya Jijnodiya', 'pjijnodiya07@gmail.com', 'Sgsits*123', '', 0, NULL),
('0305245', 'Ranjeet Vishwakarma', 'ranjeetvishwakarma7662@gmail.com', 'Sgsits*123', '', 0, '6268565710'),
('5112', 'Teena Trivedi', 'csealumniplus1952@gmail.com', 'Sgsits*123', '', 1, '8319426285');

-- --------------------------------------------------------

--
-- Table structure for table `job and internship`
--

CREATE TABLE `job and internship` (
  `ID` int(255) NOT NULL,
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

INSERT INTO `job and internship` (`ID`, `Title`, `Type`, `Location`, `Duration`, `Description`, `Requirement`, `Benefits`, `Deadline`, `Form_Link`) VALUES
(1, 'Nike India', 'internship', 'Indore', '6 Months', 'Nike is a global leader in athletic footwear, apparel, and innovation. Known for its iconic Swoosh logo and \"Just Do It\" slogan, Nike empowers athletes of all levels. With cutting-edge designs and a commitment to performance, sustainability, and style, Nike inspires movement, ambition, and excellence worldwide.', 'AL ML Developer', 'Flexible hours, project experience', '2025-09-30', 'https://example.com/graphic-design-form'),
(2, 'Google', 'internship', 'Indore', '6 Months', 'Google Pvt Ltd is a subsidiary or localized entity of Google, known globally for its innovations in search engines, cloud computing, and AI. It fosters tech development, digital advertising, and software solutions. In India, it supports startups, education, and digital transformation across industries.', 'Software Developer', 'Flexible hours, project experience', '2025-09-30', 'https://example.com/graphic-design-form');

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
(6, '0801CS221148', 'Academic Guidance,Entrepreneurship', 'this is atest req', 'Online', 1, '2025-09-23 12:09:52', 'pending'),
(7, '0801CS221150', 'Academic Guidance,Personal Development', 'this is a request', 'Online', 1, '2025-09-24 05:16:16', 'pending'),
(8, '0801CS221135', 'Academic Guidance,Industry Insights', 'thsi is a reuest', 'Online', 1, '2025-09-24 12:44:45', 'pending'),
(9, '0801CS221148', 'Industry Insights,Personal Development', 'this is a fake mentorship request', 'In-person', 1, '2025-09-28 06:51:15', 'pending'),
(10, '0801CS221148', 'Higher Education', 'asa', 'Online', 1, '2025-09-28 07:22:45', 'pending'),
(11, '0801CS221148', 'Academic Guidance', 'fake', 'Online', 1, '2025-09-28 07:25:27', 'pending'),
(12, '0801CS221148', 'Academic Guidance', 'fake', 'Online', 1, '2025-09-28 07:27:40', 'pending'),
(13, '0801CS221148', 'Personal Development,Higher Education', 'this is an fake request', 'Online', 1, '2025-10-02 23:06:29', 'pending'),
(14, '0801CS221148', 'Academic Guidance', 'sd', 'In-person', 1, '2025-10-02 23:09:03', 'pending'),
(15, '0801CS221148', 'Academic Guidance', 'sd', 'In-person', 1, '2025-10-02 23:10:58', 'pending'),
(16, '0801CS221148', 'Industry Insights,Personal Development', 'this is fake', 'Online', 1, '2025-10-02 23:11:14', 'pending'),
(17, '0801CS221148', 'Industry Insights', 'adfadfad', 'Online', 1, '2025-10-02 23:14:11', 'pending'),
(18, '0801CS221148', 'Academic Guidance', 'asd', 'Online', 1, '2025-10-02 23:18:57', 'pending'),
(19, '0801CS221148', 'Career Planning,Higher Education', 'asd', 'Online', 1, '2025-10-02 23:22:04', 'pending'),
(20, '0801CS221148', 'Career Planning,Higher Education', 'asd', 'Online', 1, '2025-10-02 23:23:04', 'pending'),
(21, '0801CS221148', 'Career Planning', 'd', 'Online', 1, '2025-10-02 23:23:35', 'pending'),
(22, '0801CS221148', 'Entrepreneurship', 'asd', 'Online', 1, '2025-10-02 23:27:55', 'pending'),
(23, '0801CS221148', 'Career Planning', 'asd', 'Online', 1, '2025-10-02 23:33:02', 'pending'),
(24, '0801CS221148', 'Academic Guidance', 'asd', 'Online', 1, '2025-10-02 23:41:40', 'pending'),
(25, '0801CS221148', 'Academic Guidance,Entrepreneurship', 'ad', 'Online', 1, '2025-10-03 00:04:49', 'pending'),
(26, '0801CS233D03', 'Entrepreneurship', 'no reason but i want to interact with the fake alumnis', 'In-person', 1, '2025-10-04 23:21:28', 'pending'),
(27, '0801CS22109', 'Higher Education,Personal Development', 'for my personal development', 'In-person', 1, '2025-11-04 04:10:30', 'pending'),
(28, '0801CS22109', 'Academic Guidance,Higher Education,Personal Development', 'this is a fake ', 'In-person', 1, '2025-11-04 13:01:33', 'pending'),
(29, '0801CS22109', 'Academic Guidance,Entrepreneurship', '', 'Online', 1, '2025-11-04 13:35:29', 'pending');

-- --------------------------------------------------------

--
-- Table structure for table `mentorship_session`
--

CREATE TABLE `mentorship_session` (
  `Session_ID` int(11) NOT NULL,
  `Alumni` varchar(200) NOT NULL,
  `Alumni_ID` int(255) NOT NULL,
  `Session_Date` datetime NOT NULL,
  `Duration` varchar(200) NOT NULL,
  `Mode` enum('Online','Offline') NOT NULL,
  `Topic` varchar(100) NOT NULL,
  `Description` text DEFAULT NULL,
  `Target_Audience` varchar(100) NOT NULL,
  `Registration_Deadline` date NOT NULL,
  `Meeting_Link` varchar(255) DEFAULT NULL,
  `Venue` varchar(255) DEFAULT 'Location Independent',
  `Status` enum('Pending','Scheduled','Accepted','Rejected') DEFAULT 'Pending',
  `Created_On` date DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentorship_session`
--

INSERT INTO `mentorship_session` (`Session_ID`, `Alumni`, `Alumni_ID`, `Session_Date`, `Duration`, `Mode`, `Topic`, `Description`, `Target_Audience`, `Registration_Deadline`, `Meeting_Link`, `Venue`, `Status`, `Created_On`) VALUES
(11, '108', 0, '2025-10-18 00:00:00', '1 Hours', 'Online', 'Master class', 'this is my rrequest ot alumni', 'final-year', '2025-10-19', 'http://localhost:8080/login_check', '', 'Pending', '2025-10-03'),
(12, 'Tarun Parmar', 108, '2025-10-23 00:00:00', '1 Hours', 'Offline', 'printing masterclass', 'this is again a fake printing session', 'final-year', '2025-10-19', '', 'sgsits lt101', 'Scheduled', '2025-10-03'),
(13, 'Tarun Parmar', 108, '2025-10-26 00:00:00', '1 Hours', 'Offline', 'Guidence', 'this is tarun faeke faking', 'recent-graduates', '2025-10-26', '', 'sgsits lt101', 'Scheduled', '2025-10-03'),
(14, 'Tarun Parmar', 108, '2025-10-19 00:00:00', '1 Hours', 'Offline', 'PDQA Project ', 'fake hte data', 'third-year', '2025-10-18', '', 'sgsits lt101', 'Rejected', '2025-10-06'),
(15, 'Dhruv Patidar', 1, '2025-10-17 00:00:00', '3 Months', 'Online', 'FOR Placement Mentorship', 'this is a fake request sended to dhruv patidar', 'all', '2025-10-07', 'http://localhost:8080/login_check', '', 'Pending', '2025-10-07'),
(16, 'Tarun Parmar', 108, '2025-11-23 00:00:00', '1 Hours', 'Offline', 'Personality Development', 'this is for the personal improvement session for higher studies interested students.', 'all', '2025-11-30', '', 'sgsits lt101', 'Pending', '2025-11-04'),
(17, 'Dhruv Patidar', 1, '2025-11-23 00:00:00', '1 Hours', 'Offline', 'Personality Development', 'this is fake', 'all', '2025-11-06', '', 'sgsits lt101', 'Pending', '2025-11-04');

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
  `Image` blob NOT NULL,
  `exit_form` int(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`Enrollment_No`, `Full_Name`, `Course`, `Contact_no`, `Email_ID`, `Batch`, `Password`, `Bio`, `Image`, `exit_form`) VALUES
('0801CS22109', 'Vikash Kasera', 'B.Tech', '9996297301', 'tarunparmar457@gmail.com', 2026, 'Tarun123', '', '', 0),
('0801cs221109', 'prakahr gupta', 'B.Tech', '9993297401', 'comradephotos86@gmail.com', 2024, 'lkj', '', '', 0),
('0801CS221135', 'shivansh Kalam', 'B.Tech', '9983298301', 'kalamshivansh@gmail.com', 2026, 'asd', '', '', 0),
('0801CS221148', 'Tarun Parmar', '', '9876543210', 'tarun@example.com', 2026, 'asd', '', '', 1),
('0801CS221150', 'Aarav Sharma', 'B.Tech', '9876543210', 'aarav.sharma@example.com', 2023, 'Tarun*123', '', '', 0),
('0801CS221152', 'Isha Verma', 'B.Tech', '9123456789', 'isha.verma@example.com', 2022, 'Tarun*123', '', '', 0),
('0801CS221153', 'Rohan Mehta', 'B.Tech', '9988776655', 'rohan.mehta@example.com', 2024, 'Tarun*123', '', '', 0),
('0801CS22131', 'Varun Pamra', 'B.Tech', '993297301', 'tarunparsgsits@gmail.com', 2026, 'add', '', '', 0),
('0801CS233D03', 'Devidas Hirve', 'B.Tech', '6232622662', 'devidashirve455@gmail.com', 2026, 'Devidas', '', '', 0),
('0801CS241148', 'Tanish', 'B.Tech', '9983297301', 'amarsinghparmar248@gmail.com', 2023, 'asd', '', '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `support`
--

CREATE TABLE `support` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `student_id` varchar(255) NOT NULL,
  `student_email` varchar(255) NOT NULL,
  `status` enum('pending','verified','in_progress','fulfilled','rejected') DEFAULT 'pending',
  `No of Needs` int(1) NOT NULL DEFAULT 0,
  `faculty_id` varchar(255) DEFAULT NULL,
  `alumni_id` int(11) DEFAULT NULL,
  `verified_at` datetime DEFAULT NULL,
  `fulfilled_at` datetime DEFAULT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `updated_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support`
--

INSERT INTO `support` (`id`, `title`, `description`, `student_id`, `student_email`, `status`, `No of Needs`, `faculty_id`, `alumni_id`, `verified_at`, `fulfilled_at`, `created_at`, `updated_at`) VALUES
(4, 'want chai', 'chai is my powerhouse', '0801CS233D03', '', 'rejected', 1, '', NULL, '0000-00-00 00:00:00', NULL, '2025-10-04 23:20:24', '2025-10-05 11:40:48'),
(5, 'NPTEL', 'cause i want to creat alumni website', '0801CS241148', '', 'in_progress', 1, '0305215', 108, '2025-10-05 11:36:02', NULL, '2025-10-05 01:46:36', '2025-10-08 20:15:34'),
(7, 'Want Domain Name for my major project', 'i want to deploy my project that\'s why i need a domain name', '0801cs221109', '', 'verified', 1, '0305215', NULL, '2025-10-05 08:37:49', NULL, '2025-10-05 08:27:27', '2025-10-05 08:37:49'),
(8, 'want Fees Help ', 'currently i am not able to pay my fees and also my scholarship is not approved so please help me and provide 45000 ', '0801CS221150', '', 'rejected', 1, NULL, NULL, NULL, NULL, '2025-10-05 08:31:20', '2025-10-05 08:37:31'),
(9, 'NPTEL ', 'paise dedo', '0801CS22131', '', 'in_progress', 1, '0305225', 1, '2025-10-06 14:49:33', NULL, '2025-10-06 14:47:32', '2025-10-07 19:45:18'),
(10, 'want a 50gb ram for my laptop', 'in android to run the software i need these RAM', '0801CS221148', '', 'verified', 1, '0305226', NULL, '2025-11-04 12:35:55', NULL, '2025-10-08 17:23:52', '2025-11-04 12:35:55'),
(11, 'NPTEL Deep Learning course', 'I’m currently pursuing the NPTEL Deep Learning course and would greatly appreciate your support in helping me access it. If any of you have previously enrolled or have access to the course materials, I’d be truly grateful if you could share them with me or guide me on how to proceed.', '0801CS22109', '', 'in_progress', 1, '0305227', 3, '2025-11-06 12:14:27', NULL, '2025-11-04 04:33:16', '2025-11-06 12:32:47');

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
(4, '0801CS221152', NULL, 'IIIT ', 'thes is a test request', 'uploads\\1758611815775.jpg', 'Pending', '2025-09-23 12:46:55', 1, NULL),
(5, '0801CS221135', NULL, 'NPTEL', 'thes is a test request', 'uploads\\1758697967397.jpg', 'Pending', '2025-09-24 12:42:47', 1, NULL);

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
(1, 'Varun Pamra', '0801CS22131', '993297301', 'tarunparsgsits@gmail.com', 'B.Tech', 'Student', '2026', 'add', 'uploads\\1758652317542.png', '2025-09-24', 'Verified'),
(3, 'Tarun', '0801CS221150', '9755146706', 'parnsdin@gmail.com', 'B.Tech', 'Student', '2025', 'qw', 'uploads\\1758652420063.png', '2025-09-24', 'Rejected'),
(4, 'prakahr gupta', '0801cs221109', '9993297401', 'comradephotos86@gmail.com', 'B.Tech', 'Student', '2024', 'lkj', 'uploads\\1758671036765.jpg', '2025-09-24', 'Verified'),
(5, 'Manish', '0801CS231148', '7822840394', 'tarunpsgsits07@gmail.com', 'B.Tech', 'Student', '2025', 'asd', 'uploads\\1758687069920.png', '2025-09-24', 'Pending'),
(6, 'Tanish', '0801CS241148', '9983297301', 'amarsinghparmar248@gmail.com', 'B.Tech', 'Student', '2023', 'asd', 'uploads\\1758687210613.jpg', '2025-09-24', 'Verified'),
(7, 'shivansh Kalam', '0801CS221135', '9983298301', 'kalamshivansh@gmail.com', 'B.Tech', 'Student', '2026', 'asd', 'uploads\\1758694853866.png', '2025-09-24', 'Verified'),
(9, 'Vashikaran Vishvkarma', '', '934057595', 'barkhaparmar1305@gmail.com', 'B.Tech', 'Alumni', '1999', 'Tarun@123', 'uploads\\1758961658181.jpg', '2025-09-27', 'Pending'),
(11, 'Myur Patel', '0801IP221135', '7788540394', '98ayur76@gmail.com', 'M.Tech', 'Student', '2000', 'tarun#123', 'uploads\\1758989422943.jpg', '2025-09-27', 'Pending'),
(12, 'hassan shekh', '', '7845850394', 'tarun221148@gmail.com', 'B.Tech', 'Alumni', '1998', 'asd', 'uploads\\1759021745576.jpg', '2025-09-28', 'Verified'),
(13, 'chandan patel', '', '9988540394', 'tarunpsgsits@gmail', 'B.Tech', 'Alumni', '2019', 'Tarun', 'uploads\\1759040286486.png', '2025-09-28', 'Pending'),
(15, 'Varun Yadav', '0801IP221148', '9995299302', 'amarsinghparmar48@gmail.com', 'B.Tech', 'Student', '2005', '1971', 'uploads\\1759135688849.png', '2025-09-29', 'Pending'),
(16, 'Devidas Hirve', '0801CS233D03', '6232622662', 'devidashirve455@gmail.com', 'B.Tech', 'Student', '2026', 'Devidas', 'uploads\\1759139369103.png', '2025-09-29', 'Verified'),
(18, 'Vikash Kasera', '0801CS22109', '9996297301', 'tarunparmar457@gmail.com', 'B.Tech', 'Student', '2026', 'Tarun123', 'uploads\\1762209178495.jpg', '2025-11-04', 'Verified');

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
-- Indexes for table `announcement`
--
ALTER TABLE `announcement`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `conversation`
--
ALTER TABLE `conversation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `support_id` (`support_id`);

--
-- Indexes for table `discussion_forum`
--
ALTER TABLE `discussion_forum`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_student` (`student_id`),
  ADD KEY `idx_category` (`category`),
  ADD KEY `idx_status` (`status`),
  ADD KEY `idx_created` (`created_at`);

--
-- Indexes for table `exit_form`
--
ALTER TABLE `exit_form`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `university_rollno` (`university_rollno`);

--
-- Indexes for table `faculty`
--
ALTER TABLE `faculty`
  ADD PRIMARY KEY (`Employee_ID`),
  ADD UNIQUE KEY `Email_ID` (`Email_ID`);

--
-- Indexes for table `job and internship`
--
ALTER TABLE `job and internship`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `mentorship_requests`
--
ALTER TABLE `mentorship_requests`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Enrollment_No` (`Enrollment_No`);

--
-- Indexes for table `mentorship_session`
--
ALTER TABLE `mentorship_session`
  ADD PRIMARY KEY (`Session_ID`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`Enrollment_No`);

--
-- Indexes for table `support`
--
ALTER TABLE `support`
  ADD PRIMARY KEY (`id`);

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
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT for table `announcement`
--
ALTER TABLE `announcement`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `conversation`
--
ALTER TABLE `conversation`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `discussion_forum`
--
ALTER TABLE `discussion_forum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exit_form`
--
ALTER TABLE `exit_form`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `job and internship`
--
ALTER TABLE `job and internship`
  MODIFY `ID` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `mentorship_requests`
--
ALTER TABLE `mentorship_requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `mentorship_session`
--
ALTER TABLE `mentorship_session`
  MODIFY `Session_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `support`
--
ALTER TABLE `support`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `support_requests`
--
ALTER TABLE `support_requests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `conversation`
--
ALTER TABLE `conversation`
  ADD CONSTRAINT `conversation_ibfk_1` FOREIGN KEY (`support_id`) REFERENCES `support` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `discussion_forum`
--
ALTER TABLE `discussion_forum`
  ADD CONSTRAINT `discussion_forum_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `student` (`Enrollment_No`) ON DELETE CASCADE;

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
