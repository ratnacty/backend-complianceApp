-- Create and use database
CREATE DATABASE IF NOT EXISTS compliance_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE compliance_db;

-- store_account
CREATE TABLE IF NOT EXISTS store_account (
  account_id INT AUTO_INCREMENT PRIMARY KEY,
  account_name VARCHAR(100) NOT NULL
);

-- store_area
CREATE TABLE IF NOT EXISTS store_area (
  area_id INT AUTO_INCREMENT PRIMARY KEY,
  area_name VARCHAR(100) NOT NULL
);

-- store
CREATE TABLE IF NOT EXISTS store (
  store_id INT AUTO_INCREMENT PRIMARY KEY,
  store_name VARCHAR(100) NOT NULL,
  account_id INT,
  area_id INT,
  is_active TINYINT(1) DEFAULT 1,
  FOREIGN KEY (account_id) REFERENCES store_account(account_id) ON DELETE SET NULL,
  FOREIGN KEY (area_id) REFERENCES store_area(area_id) ON DELETE SET NULL
);

-- brand
CREATE TABLE IF NOT EXISTS brand (
  brand_id INT AUTO_INCREMENT PRIMARY KEY,
  brand_name VARCHAR(100) NOT NULL
);

-- product
CREATE TABLE IF NOT EXISTS product (
  product_id INT AUTO_INCREMENT PRIMARY KEY,
  product_name VARCHAR(100) NOT NULL,
  brand_id INT,
  FOREIGN KEY (brand_id) REFERENCES brand(brand_id) ON DELETE SET NULL
);

-- report_product
CREATE TABLE IF NOT EXISTS report_product (
  report_id INT AUTO_INCREMENT PRIMARY KEY,
  store_id INT,
  product_id INT,
  compliance DECIMAL(5,2),
  tanggal DATE,
  FOREIGN KEY (store_id) REFERENCES store(store_id) ON DELETE SET NULL,
  FOREIGN KEY (product_id) REFERENCES product(product_id) ON DELETE SET NULL
);

-- ===================== SEED DATA =====================

INSERT INTO store_account (account_name) VALUES
('PT Maju Bersama'),
('CV Sukses Jaya'),
('PT Nusantara Raya');

INSERT INTO store_area (area_name) VALUES
('DKI Jakarta'),
('Jawa Barat'),
('Kalimantan'),
('Jawa Tengah'),
('Bali');

INSERT INTO store (store_name, account_id, area_id, is_active) VALUES
('Toko A Jakarta', 1, 1, 1),
('Toko B Jakarta', 2, 1, 1),
('Toko C Bandung', 1, 2, 1),
('Toko D Bandung', 3, 2, 1),
('Toko E Kalimantan', 2, 3, 1),
('Toko F Kalimantan', 1, 3, 1),
('Toko G Semarang', 3, 4, 1),
('Toko H Semarang', 2, 4, 1),
('Toko I Bali', 1, 5, 1),
('Toko J Bali', 3, 5, 1);

INSERT INTO brand (brand_name) VALUES
('Roti Tawar'),
('Susu Kaleng');

INSERT INTO product (product_name, brand_id) VALUES
('Roti Tawar Putih', 1),
('Roti Tawar Gandum', 1),
('Susu Kaleng Full Cream', 2),
('Susu Kaleng Skim', 2);

INSERT INTO report_product (store_id, product_id, compliance, tanggal) VALUES
-- DKI Jakarta (area 1) - stores 1,2
(1, 1, 0.50, '2024-01-10'), (1, 2, 0.45, '2024-01-10'), (1, 3, 0.55, '2024-01-10'),
(2, 1, 0.48, '2024-01-11'), (2, 2, 0.52, '2024-01-11'), (2, 4, 0.47, '2024-01-11'),
(1, 1, 0.53, '2024-02-10'), (1, 3, 0.49, '2024-02-10'),
(2, 2, 0.50, '2024-02-11'), (2, 4, 0.51, '2024-02-11'),
-- Jawa Barat (area 2) - stores 3,4
(3, 1, 0.70, '2024-01-12'), (3, 2, 0.72, '2024-01-12'), (3, 3, 0.73, '2024-01-12'),
(4, 1, 0.71, '2024-01-13'), (4, 4, 0.70, '2024-01-13'),
(3, 2, 0.74, '2024-02-12'), (3, 3, 0.69, '2024-02-12'),
(4, 1, 0.72, '2024-02-13'), (4, 4, 0.71, '2024-02-13'),
-- Kalimantan (area 3) - stores 5,6
(5, 1, 1.00, '2024-01-14'), (5, 2, 1.00, '2024-01-14'), (5, 3, 1.00, '2024-01-14'),
(6, 1, 1.00, '2024-01-15'), (6, 4, 1.00, '2024-01-15'),
(5, 2, 1.00, '2024-02-14'), (5, 3, 1.00, '2024-02-14'),
(6, 1, 1.00, '2024-02-15'), (6, 4, 1.00, '2024-02-15'),
-- Jawa Tengah (area 4) - stores 7,8
(7, 1, 0.90, '2024-01-16'), (7, 2, 0.89, '2024-01-16'), (7, 3, 0.91, '2024-01-16'),
(8, 1, 0.90, '2024-01-17'), (8, 4, 0.88, '2024-01-17'),
(7, 2, 0.92, '2024-02-16'), (7, 3, 0.90, '2024-02-16'),
(8, 1, 0.89, '2024-02-17'), (8, 4, 0.91, '2024-02-17'),
-- Bali (area 5) - stores 9,10
(9, 1, 0.80, '2024-01-18'), (9, 2, 0.81, '2024-01-18'), (9, 3, 0.79, '2024-01-18'),
(10, 1, 0.80, '2024-01-19'), (10, 4, 0.82, '2024-01-19'),
(9, 2, 0.80, '2024-02-18'), (9, 3, 0.81, '2024-02-18'),
(10, 1, 0.79, '2024-02-19'), (10, 4, 0.80, '2024-02-19');
