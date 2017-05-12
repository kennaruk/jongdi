-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2017 at 10:45 PM
-- Server version: 10.1.21-MariaDB
-- PHP Version: 5.6.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `jongdi`
--

-- --------------------------------------------------------

--
-- Table structure for table `emergency_contact`
--

CREATE TABLE `emergency_contact` (
  `emer_name` text NOT NULL,
  `emer_tel` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `emergency_contact`
--

INSERT INTO `emergency_contact` (`emer_name`, `emer_tel`, `user_id`) VALUES
('max', 912346787, 1),
('gitjet', 916784324, 3),
('sky', 927786576, 4),
('boo', 967784356, 7),
('black', 989987654, 9),
('ken', 832619668, 10);

-- --------------------------------------------------------

--
-- Table structure for table `item`
--

CREATE TABLE `item` (
  `item_id` int(11) NOT NULL,
  `item_name` text NOT NULL,
  `shop_id` int(11) NOT NULL,
  `item_price` int(11) NOT NULL,
  `item_stock` int(11) NOT NULL,
  `item_picture` text NOT NULL,
  `item_description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `item`
--

INSERT INTO `item` (`item_id`, `item_name`, `shop_id`, `item_price`, `item_stock`, `item_picture`, `item_description`) VALUES
(5, 'disney', 4, 1500, 9, 'http://scenesmedia.com/wp-content/uploads/2016/11/Walt-Disney-Studios.jpg', 'The mission of the Walt Disney Company is to be one of the world\'s leading producers and providers of entertainment and information.'),
(6, 'coldplay', 5, 3500, 10, 'https://yt3.ggpht.com/-5E9R-kUK4H0/AAAAAAAAAAI/AAAAAAAAAAA/8RWanSWSVOI/s900-c-k-no-mo-rj-c0xffffff/photo.jpg', 'Coldplay are a British rock band formed in 1996 by lead vocalist and keyboardist Chris Martin and lead guitarist Jonny Buckland at University College London (UCL). After they formed under the name Pectoralz, Guy Berryman joined the group as bassist and they changed their name to Starfish.'),
(7, 'catradio', 6, 1000, 10, 'http://www.thisiscat.com/themes/cat_radio/images/artist1.jpg', 'information about cat radio, the internet\'s only radio station featuring the vocal performances of cats with electronic experimental dance, tribal, and break music.');

-- --------------------------------------------------------

--
-- Table structure for table `reserve`
--

CREATE TABLE `reserve` (
  `user_id` int(11) NOT NULL,
  `item_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `shop`
--

CREATE TABLE `shop` (
  `shop_id` int(11) NOT NULL,
  `shop_name` text NOT NULL,
  `shop_tel` int(11) NOT NULL,
  `shop_email` text NOT NULL,
  `shop_pass` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `shop`
--

INSERT INTO `shop` (`shop_id`, `shop_name`, `shop_tel`, `shop_email`, `shop_pass`) VALUES
(1, 'KEN SHOP', 832619668, '', ''),
(2, 'Major', 23576896, '', ''),
(3, 'SF', 24567567, '', ''),
(4, 'Thaiticket', 2787433, '', ''),
(5, 'ticketshop', 25676435, '', ''),
(6, 'getTicket', 29876576, '', ''),
(7, 'aa', 11, 'aa2', 'a'),
(8, 'aa', 22, 'a', 'a'),
(9, 'firstshopname', 2, 'firstemail', 'a'),
(10, 'Ken Shop', 832619668, 'k-e-n_ken@hotmail.com', 'kenshop');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_name` text NOT NULL,
  `user_addr` text NOT NULL,
  `user_phone` text NOT NULL,
  `user_pass` text NOT NULL,
  `user_email` text NOT NULL,
  `user_contact` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_name`, `user_addr`, `user_phone`, `user_pass`, `user_email`, `user_contact`) VALUES
(1, 'kennaruk', '1110 Street Walk', '0832619668', 'kennaruk', 'k-e-n_ken@hotmail.com', ''),
(3, 'Somsom', 'Bangkok', '0812345678', 'somsom1234', 'somsom@gmail.com', ''),
(4, 'Punpun', 'USA', '0822223345', 'punpun1234', 'punpun@gmail.com', ''),
(7, 'Nana', 'Phatum ', '0845579864', 'nana1234', 'nana@gmail.com', ''),
(9, 'Apple', 'Bangkok', '0856679865', 'apple1234', 'apple@gmail.com', ''),
(10, 'Bambam', 'Bangkok', '0878896532', 'bambam1234', 'bambam@gmail.com', ''),
(11, 'kenfromjs', 'test', '832619668', 'kenn', 'wow', ''),
(12, 'yanil', '110 tanurat', '836', 'aa', 'k-en', ''),
(13, 'name', 'addr', '0', 'pas', 'email', 'contact'),
(14, 'name', 'ad', '0', 'pas', 'mailna', 'con'),
(15, 'a', 'ad', '0', 'a', 'a', ''),
(16, 'aa', 'addr', '1', 'a', 'aa', 'aaa'),
(17, 'aa', 'aa', '2', 'aa', 'aa2', 'aa'),
(18, 'a', 'a', '2', 'aa', 'aa22', 'aa'),
(19, 'kenken', '1104 tanuray', '8349', 'kentest', 'kentest@email.com', '08492-20'),
(20, 'test', 'test', '22', 'test', 'test', 'test'),
(21, 'test', 'test', '2', 'test', 'test2', 'test'),
(22, 'test', 'test', '2', 'test', 'test3', 'test'),
(23, 'ad', 'asd', '1', 'a', 'asd', '2'),
(24, 'wer', 'wer', '1', 'wer', 'werwre', 'wer'),
(25, 'aa', 'addr', '1', 'a', 'aaa', 'a');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  ADD PRIMARY KEY (`user_id`);

--
-- Indexes for table `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`item_id`),
  ADD KEY `shop_id` (`shop_id`);

--
-- Indexes for table `reserve`
--
ALTER TABLE `reserve`
  ADD KEY `user_id` (`user_id`),
  ADD KEY `item_id` (`item_id`);

--
-- Indexes for table `shop`
--
ALTER TABLE `shop`
  ADD PRIMARY KEY (`shop_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `item`
--
ALTER TABLE `item`
  MODIFY `item_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;
--
-- AUTO_INCREMENT for table `shop`
--
ALTER TABLE `shop`
  MODIFY `shop_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
--
-- Constraints for dumped tables
--

--
-- Constraints for table `emergency_contact`
--
ALTER TABLE `emergency_contact`
  ADD CONSTRAINT `emergency_contact_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`);

--
-- Constraints for table `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`shop_id`) REFERENCES `shop` (`shop_id`);

--
-- Constraints for table `reserve`
--
ALTER TABLE `reserve`
  ADD CONSTRAINT `reserve_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
  ADD CONSTRAINT `reserve_ibfk_2` FOREIGN KEY (`item_id`) REFERENCES `item` (`item_id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
