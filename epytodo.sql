DROP DATABASE IF EXISTS epytodo;
CREATE DATABASE epytodo;

use epytodo;

CREATE USER 'YOUR_USERNAME'@'%' IDENTIFIED WITH mysql_native_password BY 'YOUR_PASSWORD';
GRANT ALL ON epytodo.* TO 'YOUR_USERNAME'@'%';

CREATE TABLE IF NOT EXISTS user (
    id int NOT NULL AUTO_INCREMENT KEY,
    email varchar(255) NOT NULL UNIQUE,
    password varchar(255) NOT NULL,
    name varchar(255) NOT NULL,
    firstname varchar(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS todo (
    id int NOT NULL AUTO_INCREMENT KEY,
    title varchar(255) NOT NULL,
    description varchar(255) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    due_time DATETIME NOT NULL,
    status enum('not started','todo','in progress','done') NOT NULL DEFAULT 'not started',
    user_id int UNSIGNED NOT NULL
);
