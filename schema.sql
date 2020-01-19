DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price DECIMAL(5,4) NOT NULL,
  stock_quantity INT NOT NULL,
  PRIMARY KEY (item_id)
);

select * from products