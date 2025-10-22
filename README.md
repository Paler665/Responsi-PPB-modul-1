# REST API Cuci Sepatu — Responsi PPB Modul 1

Proyek ini merupakan implementasi **REST API** menggunakan **Express.js** dan **Supabase** untuk mengelola data pesanan cuci sepatu.  
Aplikasi ini dibuat sebagai bagian dari **Responsi Praktikum Pemrograman Perangkat Bergerak (PPB) Modul 1**.

---

## Deskripsi Umum Proyek

REST API ini berfungsi untuk melakukan **manajemen data pesanan laundry sepatu**, seperti menambah pesanan, memperbarui status pencucian, dan menghapus data pesanan.  
Semua data disimpan dalam **database Supabase** yang berperan sebagai backend service.
API ini juga sudah **dideploy ke Vercel** agar bisa diakses secara online.

## Tujuan dan Fitur Utama

### Tujuan
- Membuat REST API sederhana menggunakan **Express.js**.
- Menghubungkan backend ke **Supabase Database**.
- Menerapkan operasi **CRUD (Create, Read, Update, Delete)** pada data pesanan.
- Men-deploy API agar dapat diakses publik.

### Fitur Utama
**Menampilkan semua pesanan**: Mengambil seluruh data dari tabel
**Menambah pesanan baru**: Menyimpan data pesanan baru ke Supabase
**Memperbarui status pesanan**:Mengubah status (Menunggu, Sedang Dicuci, Selesai)
**Menghapus pesanan**: Menghapus data pesanan berdasarkan ID
**Format JSON rapi**: Data ditampilkan dengan format JSON yang mudah dibaca

## Struktur Data

Tabel `orders` di Supabase dibuat dengan struktur berikut:
create table orders (
  id uuid primary key default gen_random_uuid(),
  nama_pelanggan text not null,
  nomor_telepon text,
  nama_sepatu text not null,
  tipe_layanan text not null check (
    tipe_layanan in ('Quick Clean', 'Deep Clean', 'Repaint', 'Unyellowing')
  ),
  status text not null default 'Menunggu' check (
    status in ('Menunggu', 'Sedang Dicuci', 'Selesai')
  ),
  tanggal_masuk date not null default current_date,
  tanggal_selesai date,
  harga numeric(12,2) default 0
);

## Contoh Request dan Response
GET Semua Pesanan
GET /api/orders
[
  {
    "id": "e3504e28-f6a3-45a0-a9c0-704888423a69",
    "nama_pelanggan": "Farrel",
    "nama_sepatu": "Kanky Story Mizu",
    "status": "Menunggu",
    "tanggal_masuk": "2025-10-22",
    "harga": 50000
  }
]

POST Tambah Pesanan Baru
POST /api/orders
{
  "nama_pelanggan": "Farrel",
  "nomor_telepon": "08123456789",
  "nama_sepatu": "Kanky Story Mizu",
  "tipe_layanan": "Deep Clean",
  "harga": 50000
}

PUT Ubah Status Pesanan
PUT /api/orders/:id
{
  "status": "Selesai"
}
Hasilnya:
[
  {
    "id": "e3504e28-f6a3-45a0-a9c0-704888423a69",
    "status": "Selesai",
    "tanggal_selesai": "2025-10-23"
  }
]

DELETE Hapus Pesanan
DELETE /api/orders/:id
{
  "message": "Order dihapus"
}

## Langkah instalasi dan cara menjalankan API
Clone Repository
git clone https://github.com/Paler665/Responsi-PPB-modul-1.git
cd Responsi-PPB-modul-1

Install Dependencies
npm install

Buat File .env
SUPABASE_URL=
SUPABASE_KEY=
PORT=3000

Jalankan Server di Lokal
npm run dev
(akan jalan di localhost:3000)

## Link Deploy
**Base URL:**  
https://responsi-ppb-modul-1.vercel.app/
