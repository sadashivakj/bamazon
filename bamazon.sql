/* bamazon home work assignment 
Create database called bamazon 
Create table called products under bamazon database
Insert dummy records into prodcuts table
*/

drop database if exists bamazon;

create database bamazon;

use bamazon;

-- item_id (unique id for each product)
-- product_name (Name of product)
-- department_name
-- price (cost to customer)
-- stock_quantity (how much of the product is available in stores)

create table products (
item_id integer(10) PRIMARY KEY auto_increment not null,
product_name varchar (100) not null,
department_name varchar (100) not null,
price decimal(10,2) not null,
stock_quantity integer(10) not null
);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("Adidas shoes", "Sports department", 99.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity) 
VALUES ("canon camera", "Photography department", 200, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Levis Jeans", "Clothing department", 39.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("claritin", "Pharmacy department", 9.99, 500);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("apple", "Food department", 3, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("refrigerator", "Appliances department", 500, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Watch", "Jewelry", 100, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("bicycle", "Sports department", 75, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Milk", "Dairy department", 2.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ice cream", "Frozen Department", 5, 200);

select * from products;