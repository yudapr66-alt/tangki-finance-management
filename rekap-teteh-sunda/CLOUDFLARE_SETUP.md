# Petunjuk Aktivasi — Rekap Mobil Teteh Sunda

Database tetap menggunakan Google Sheets yang sudah ada. Jangan memindahkan atau membuat ulang spreadsheet.

## A. Buat endpoint Google Apps Script
1. Buka https://script.google.com/ dengan akun yang memiliki akses edit ke spreadsheet.
2. Klik **New project / Proyek baru**, beri nama **API Rekap Teteh Sunda**.
3. Buka file Code.gs, hapus contoh myFunction() saja, lalu tempel seluruh kode dari file Code.gs di paket ZIP migrasi.
4. Simpan.
5. Klik **Deploy → New deployment → Web app**.
6. Execute as: **Me**.
7. Who has access: **Anyone**.
8. Klik Deploy, berikan izin yang diminta, lalu salin URL yang berakhiran /exec.

Gunakan proyek Apps Script terpisah agar tidak mengganggu proyek Tangki atau script lain yang mungkin sudah terpasang pada spreadsheet.

**Catatan akses:** Web App Anyone tidak memakai login tambahan. Siapa pun yang mengetahui URL endpoint berpotensi memanggil operasi baca, tambah, ubah, dan hapus. Jangan sebarkan URL deployment Apps Script.

## B. Buat project Cloudflare Pages kedua
1. Cloudflare Dashboard → Workers & Pages → Create application → Pages → Connect to Git.
2. Pilih akun GitHub yudapr66-alt dan repository tangki-finance-management.
3. Project name: rekap-teteh-sunda.
4. Production branch: main.
5. Framework preset: None.
6. Root directory (advanced): rekap-teteh-sunda.
7. Build command: exit 0.
8. Build output directory: public.
9. Settings → Variables and Secrets → Add:
   - Type: Text
   - Name: APPS_SCRIPT_URL
   - Value: URL Apps Script lengkap yang berakhiran /exec
   - Environment: Production
10. Simpan dan jalankan deployment ulang.

Alamat yang diharapkan: https://rekap-teteh-sunda.pages.dev (Cloudflare memastikan subdomain saat pembuatan project).

## C. Uji awal
1. Buka URL Pages dan pastikan status DATABASE TERHUBUNG.
2. Bandingkan ringkasan awal: Rp8.550.000, 22 RIT, rata-rata nominal per baris Rp2.137.500.
3. Pastikan empat setoran awal terlihat.
4. Setelah data baca sesuai, uji simpan/edit/hapus menggunakan transaksi percobaan yang disepakati.

## Catatan tanggal sumber
Tiga tanggal pertama pada file ekspor adalah 18, 24, dan 31 Oktober 2026. Tanggal setoran keempat terbaca 08 November 2006. Aplikasi mempertahankan nilai sumber itu; periksa di Google Sheets sebelum mengoreksinya.

## Struktur worksheet yang digunakan
- Spreadsheet ID hanya disimpan pada Apps Script Code.gs.
- Sheet tab ID/GID: 1135156974.
- Header: B8:D8.
- Data: B9:D34.
- Rumus ringkasan dan total asli tidak diubah.
