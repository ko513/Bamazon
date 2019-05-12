DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products (
	id INTEGER(11) AUTO_INCREMENT NOT NULL,
    name VARCHAR(50) NOT NULL,
    department VARCHAR(25) NOT NULL,
    price FLOAT(6, 2) NOT NULL,
    stock INT(5) NOT NULL,
    sales FLOAT(9, 2),
    PRIMARY KEY (id)
);

INSERT INTO products (name, department, price, stock)
VALUES
	("Yes - Yessongs CD", "Music", 19.99, 100),
	("MacBook Pro", "Electronics", 1499.99, 10),
	("The Qatsi Trilogy Blu-Ray", "Video", 49.99, 13),
	("Cryptonomicon, Neal Stephenson", "Book", 19.99, 50),
	("Yamaha BD-A1060 Blu-Ray Player", "Electronics", 499.99, 20),
	("Utopia for Realists, Rutger Bregman", "Books", 9.99, 30),
	("Brian Eno - Apollo Atmospheres (Vinyl)", "Music", 29.99, 49),
	("Dorico 2.0 Music Notation Software", "Software", 99.99, 37),
	("Moog One 16-voice Analog Synthesizer", "Music", 7999.00, 1),
	("Trois Coleurs Trilogy Blu-Ray", "Video", 49.99, 19);
