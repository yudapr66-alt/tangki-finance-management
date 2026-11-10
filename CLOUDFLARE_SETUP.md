# Aktivasi Cloudflare Pages

## 1. Siapkan Apps Script terlebih dahulu

1. Buat salinan cadangan project Apps Script saat ini.
2. Tambahkan isi file `apps-script/doPost-router-snippet.js` ke bagian akhir `Code.gs` yang sudah ada.
3. Jangan menghapus atau mengganti `doGet()`, fungsi validasi, token transaksi, atau fungsi CRUD lama.
4. Deploy ulang sebagai Web App. Pilih eksekusi sebagai pemilik project dan akses **Anyone** karena tidak ada lapisan autentikasi baru yang digunakan pada rancangan ini.
5. Simpan URL Web App yang berakhiran `/exec`.

## 2. Selesaikan frontend

File `public/index.html` di repository masih berupa halaman pemeriksaan sementara. Ganti dengan file adaptasi UI asli `Index-cloudflare.html` yang disediakan terpisah sebelum mengaktifkan aplikasi.

Adaptasi tersebut mempertahankan UI lama dan mengganti semua pemanggilan `google.script.run` dengan `fetch('/api/tangki')`.

## 3. Hubungkan Cloudflare Pages

Buat Pages project dari repository ini:

- Production branch: `main`
- Framework preset: None
- Build command: kosong / none
- Build output directory: `public`
- Root directory: repository root

Pada Pages project settings, tambahkan environment variable:

- Name: `APPS_SCRIPT_URL`
- Value: URL Web App Apps Script yang berakhiran `/exec`

Atur untuk Production (dan Preview bila diperlukan), lalu deploy.

Pages Function di `functions/api/tangki.js` otomatis menyediakan route `/api/tangki`.

## 4. Pengujian setelah deployment

1. Buka URL `pages.dev` dan pastikan konfigurasi bulan berhasil dimuat.
2. Periksa dropdown, dashboard, dan riwayat.
3. Uji simpan menggunakan transaksi uji yang disepakati, lalu verifikasi barisnya di spreadsheet lama.
4. Uji edit dan hapus hanya pada transaksi uji.
5. Jangan uji CRUD menggunakan transaksi operasional sungguhan.

## Risiko akses

Sesuai permintaan, rancangan ini tidak menambahkan login, PIN, API key, atau Cloudflare Access. Karena Apps Script Web App dibuka untuk Anyone, orang yang mengetahui alamat aplikasi/API dapat memanggil operasi baca, simpan, ubah, dan hapus. Token transaksi yang sudah ada tetap melindungi edit/hapus dari perubahan data yang kedaluwarsa, tetapi bukan mekanisme autentikasi.

## Rollback

Aplikasi Apps Script lama melalui `/exec` tetap dipertahankan. Bila versi Pages belum berjalan baik, gunakan kembali URL Web App lama. Jangan menghapus deployment lama atau mengubah struktur spreadsheet.
