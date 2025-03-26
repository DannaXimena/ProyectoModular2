CREATE DATABASE usuariosDB;

USE usuariosDB;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL
);

-- Administrador por el momento unico
INSERT INTO usuarios (username, password)
VALUES ('Psicologa', 'admin'); 
