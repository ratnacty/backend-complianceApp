# Compliance App - Backend

Aplikasi backend untuk Compliance Dashboard & Report Management.

## 💡 Tentang Aplikasi

Aplikasi ini dibangun menggunakan:
- Node.js + Express
- Sequelize ORM
- MySQL (database)
- REST API untuk manipulasi data:
  - store accounts, store areas, stores
  - brands, products, report_product
  - dashboard (chart, summary, brand-area pivot)

Fitur utama:
- CRUD Report Product (tambah/edit/hapus)
- Dashboard nilai compliance per area + per brand
- Filtering berdasarkan area + rentang tanggal
- Kecepatan respon lewat query teroptimasi

## ⚙️ Prasyarat

Pastikan telah terpasang:
- Node.js (>= 14)
- MySQL (MariaDB boleh)
- Git

## 📁 Struktur

- `server.js`: entry point server
- `config/database.js`: config Sequelize
- `controllers/`: logic endpoint
- `models/`: definisi model Sequelize
- `routes/`: express route

## 🛠️ Setup

1. Masuk folder backend:
   ```bash
   cd c:\xampp\htdocs\express_js\backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Salin file `.env` (jika belum ada):
   ```bash
   copy .env.example .env
   ```
   (atau buat manual)

4. Isi `.env`:
   ```dotenv
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=compliance_db
   ```

5. Buat database MySQL:
   - via phpMyAdmin atau command line:
     ```sql
     CREATE DATABASE compliance_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
     ```

6. Jalankan aplikasi:
   ```bash
   npm run dev    # menggunakan nodemon
   # atau
   npm start
   ```

7. Tes endpoint:
   - `http://localhost:3000/`
   - `http://localhost:3000/api/dashboard/summary`
   - `http://localhost:3000/api/reports`

## 🧩 API Endpoints Singkat

- `GET /api/reports`
- `POST /api/reports`
- `PUT /api/reports/:id`
- `DELETE /api/reports/:id`

- `GET /api/dashboard/chart?area_id=&date_from=&date_to=`
- `GET /api/dashboard/brand-table?area_id=&date_from=&date_to=`
- `GET /api/dashboard/summary`

## 🍀 Tips

- Pastikan `.env` tidak commit ke Git; `backend/.gitignore` harus sudah memiliki `.env`.
- Jika error `ER_BAD_DB_ERROR`, cek apakah database `compliance_db` sudah terbuat.
- Untuk manajemen dataset awal, gunakan `backend/database.sql` (bila ada) atau insert manual.
