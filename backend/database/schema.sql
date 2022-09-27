-- CREATE DATABASE animal;
USE animal;

CREATE TABLE Cats(
    id INT AUTO_INCREMENT NOT NULL,
    name VARCHAR(255),
    description VARCHAR(255),
    breed VARCHAR(255),
    is_deleted TINYINT DEFAULT 0,
        PRIMARY KEY (id)

)


