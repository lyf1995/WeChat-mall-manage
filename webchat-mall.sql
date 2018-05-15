/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50714
Source Host           : localhost:3306
Source Database       : webchat-mall

Target Server Type    : MYSQL
Target Server Version : 50714
File Encoding         : 65001

Date: 2018-04-25 17:39:27
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for address
-- ----------------------------
DROP TABLE IF EXISTS `address`;
CREATE TABLE `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contacts` varchar(255) DEFAULT NULL,
  `phoneNumber` varchar(255) DEFAULT '',
  `province` varchar(255) DEFAULT NULL,
  `provinceCity` varchar(255) DEFAULT NULL,
  `area` varchar(255) DEFAULT NULL,
  `detailAddress` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of address
-- ----------------------------

-- ----------------------------
-- Table structure for goods
-- ----------------------------
DROP TABLE IF EXISTS `goods`;
CREATE TABLE `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '',
  `vip_price` float(10,0) DEFAULT NULL,
  `price` float(10,0) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT '',
  `stock` float(10,0) DEFAULT NULL,
  `mainImage` varchar(255) DEFAULT NULL,
  `carouselImage` varchar(255) DEFAULT '',
  `detailImage` varchar(255) DEFAULT '',
  `typeId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `typeId` (`typeId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goods
-- ----------------------------

-- ----------------------------
-- Table structure for goodstype
-- ----------------------------
DROP TABLE IF EXISTS `goodstype`;
CREATE TABLE `goodstype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `type` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of goodstype
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `number` varchar(255) DEFAULT '',
  `status` varchar(255) DEFAULT '',
  `userId` int(11) NOT NULL,
  `goosId` int(11) NOT NULL,
  `addressId` int(11) NOT NULL,
  `goodsNumber` int(11) DEFAULT NULL,
  `totalAmount` float(255,0) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`),
  KEY `goodsId` (`goosId`),
  KEY `addressId` (`addressId`),
  KEY `userId` (`userId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for share
-- ----------------------------
DROP TABLE IF EXISTS `share`;
CREATE TABLE `share` (
  `id` int(11) NOT NULL,
  `shareUserId` int(11) NOT NULL,
  `clickUserId` int(11) NOT NULL,
  `goodsId` int(11) NOT NULL,
  `status` int(11) DEFAULT NULL,
  `amounts` float(255,0) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `shareUserId` (`shareUserId`),
  KEY `clickUserId` (`clickUserId`),
  KEY `goodsId` (`goodsId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of share
-- ----------------------------

-- ----------------------------
-- Table structure for shoppingcar
-- ----------------------------
DROP TABLE IF EXISTS `shoppingcar`;
CREATE TABLE `shoppingcar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userId` int(11) NOT NULL,
  `goodsId` int(11) NOT NULL,
  `goodsNumber` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `goodsId` (`goodsId`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of shoppingcar
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `phoneNumber` varchar(255) DEFAULT '',
  `password` varchar(255) DEFAULT '',
  `name` varchar(255) DEFAULT '',
  `imgage` varchar(255) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
