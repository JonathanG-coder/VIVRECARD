CREATE DATABASE vivrecard_db;

USE vivrecard_db;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL,
  verification_token VARCHAR(255),
  is_verified BOOLEAN DEFAULT FALSE,
  latitude DECIMAL(10,8),
  longitude DECIMAL(11,8),
  last_seen DATETIME,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

exit;