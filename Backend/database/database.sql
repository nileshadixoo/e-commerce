CREATE TABLE products(
    p_id SERIAL PRIMARY KEY,
    name VARCHAR(250) NOT NULL,
    description TEXT,
    img VARCHAR(1000),
    price INT NOT NULL,
    quantity INT,
    category VARCHAR(250),
    color VARCHAR(250)

)
INSERT INTO products(name,description,img,quantity,category,color,price)
VALUES();

SELECT * FROM products where p_id = id

 UPDATE products SET (name,description,category,quantity,price,img) = ('buzz','space robot','toy',20,4999,'random') WHERE p_id = 9;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    role VARCHAR(100) DEFAULT 'user'
)