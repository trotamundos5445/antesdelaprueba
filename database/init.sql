SET NAMES utf8mb4;

CREATE DATABASE IF NOT EXISTS empresa_cloud
  CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE empresa_cloud;

CREATE TABLE IF NOT EXISTS servicios (
  id     INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  tipo   VARCHAR(50)  NOT NULL,
  estado VARCHAR(30)  NOT NULL
);

INSERT INTO servicios (nombre, tipo, estado) VALUES
  ('Portal Web',           'Web',     'Activo'),
  ('Base de Datos',        'MariaDB', 'Activo'),
  ('Sistema de Respaldos', 'Backup',  'Mantención'),
  ('API Clientes',         'API',     'Activo');
