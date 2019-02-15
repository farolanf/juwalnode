-- Create users table
CREATE TABLE `users` (
  `user_id`       INT            NOT NULL  AUTO_INCREMENT,
  `email`         VARCHAR(100)   NOT NULL,
  `password`      VARCHAR(50)    NOT NULL,
  `customer_id`   INT            NOT NULL,
  `authProvider`  VARCHAR(50)    NOT NULL,
  `authToken`     VARCHAR(100)   NOT NULL,
  PRIMARY KEY  (`user_id`)
) ENGINE=MyISAM;