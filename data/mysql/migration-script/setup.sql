USE drivdmh4wkbg0mlr;

CREATE USER 'agora_user_1'@'%' IDENTIFIED BY 'pass1234';
GRANT INSERT, SELECT ON *.* TO 'agora_user_1'@'%';

CREATE USER 'qcltlj7uof1b2xp8'@'%' IDENTIFIED BY 'j06md60bhr60kqyz';
GRANT INSERT, SELECT ON *.* TO 'qcltlj7uof1b2xp8'@'%';

CREATE TABLE accounts(
   account_id INT NOT NULL AUTO_INCREMENT,
   product_id INT,
   user_id INT,
   status VARCHAR(50),
   balance DECIMAL(13,2),
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(account_id)
);

INSERT INTO accounts (product_id, user_id, status, balance)
VALUES('999','010','CANCELLED','-5400');

INSERT INTO accounts (product_id, user_id, status, balance)
VALUES('100','999','ACTIVE','134.32');

INSERT INTO accounts (product_id, user_id, status, balance)
VALUES('111','222','SUSPENDED','200');

CREATE TABLE users(
   user_id INT NOT NULL AUTO_INCREMENT,
   email VARCHAR(50),
   date_of_birth VARCHAR(10),
   created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
   updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP,
   PRIMARY KEY(user_id),
   UNIQUE(email)
);

INSERT INTO users (user_id, email, date_of_birth)
VALUES('10','ann@yopmail.com','1971-01-01');

INSERT INTO users (user_id, email, date_of_birth)
VALUES('999','barry@yopmail.com','1972-02-02');

INSERT INTO users (user_id, email, date_of_birth)
VALUES('222','jim@yopmail.com','1973-03-03');