DROP DATABASE IF EXISTS epytodo;
CREATE DATABASE epytodo;

use epytodo;

ALTER USER 'root' IDENTIFIED WITH mysql_native_password BY 'password';
flush privileges;

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
    status varchar(255) DEFAULT "not started",
    user_id int UNSIGNED NOT NULL
);
