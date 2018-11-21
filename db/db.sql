CREATE DATABASE IF NOT EXISTS marvel;
USE marvel;

CREATE TABLE heroes (
	id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(11) DEFAULT NULL,
    PRIMARY KEY(id)
);

INSERT INTO employees values
	(1, 'Capital America', 2000),
    (2, 'Iron man', 50000),
	(2, 'Spiderman', 38000);
    
DESCRIBE heroes;
