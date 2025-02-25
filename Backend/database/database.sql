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
VALUES
('optimuz prime','a robot','https://images.unsplash.com/photo-1676534228087-a5066e2197e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3B0aW11c3xlbnwwfHwwfHx8MA%3D%3D',20,'toy','red and blue','9999'),

('bumble bee','a robot','https://images.unsplash.com/photo-1676534228087-a5066e2197e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3B0aW11c3xlbnwwfHwwfHx8MA%3D%3D',20,'toy','red and blue','9999')
('woody ','a robot','https://images.unsplash.com/photo-1676534228087-a5066e2197e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3B0aW11c3xlbnwwfHwwfHx8MA%3D%3D',20,'toy','red and blue','9999')
('doreamon','a robot','https://images.unsplash.com/photo-1676534228087-a5066e2197e0?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b3B0aW11c3xlbnwwfHwwfHx8MA%3D%3D',20,'toy','red and blue','9999')
;

SELECT * FROM products where p_id = id

 UPDATE products SET (name,description,category,quantity,price,img) = ('buzz','space robot','toy',20,4999,'random') WHERE p_id = 9;

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(250) NOT NULL UNIQUE,
    password VARCHAR(250) NOT NULL,
    role VARCHAR(100) DEFAULT 'user'
)

SELECT * FROM products

select * from products where name ilike '%b%';