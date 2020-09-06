GRANT ALL ON *.* TO 'admin'@'%' IDENTIFIED BY 'password' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'admin'@'localhost' IDENTIFIED BY 'password' WITH GRANT OPTION;
GRANT ALL ON *.* TO 'admin'@'127.0.0.1' IDENTIFIED BY 'password' WITH GRANT OPTION;

CREATE DATABASE weather_history;

use weather_history;

CREATE TABLE locations (
    location_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    zipCode VARCHAR(50) NOT NULL
) ENGINE=InnoDB, CHARSET=utf8mb4;

CREATE TABLE weather_states (
    weather_states_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    location_id INT NOT NULL,
    CONSTRAINT `fk_location`
        FOREIGN KEY (location_id) REFERENCES locations (location_id)
        ON DELETE CASCADE
        ON UPDATE RESTRICT,
    search_date DATETIME NOT NULL,
    temp INT NOT NULL,
    units VARCHAR(1) NOT NULL,
    humidity INT NOT NULL
) ENGINE=InnoDB, CHARSET=utf8mb4;