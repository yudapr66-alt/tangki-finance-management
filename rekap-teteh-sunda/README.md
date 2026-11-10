# Rekap Mobil Teteh Sunda — PT. Sinar Abadi Sriwijaya

Aplikasi web untuk ringkasan setoran kendaraan BG 8681 UR. Frontend Cloudflare Pages terhubung ke Google Apps Script dan tetap menggunakan Google Sheets yang sudah ada sebagai database.

## Struktur sumber data

- Spreadsheet ID: disimpan di Apps Script `Code.gs` (tidak diletakkan di frontend).
- Sheet tab: gid `1135156974`.
- Header: B8:D8 (`Tanggal Setor`, `Uang`, `RIT`).
- Data: B9:D34.
- Ringkasan sumber berada pada B5:D6, total tabel pada B35:D35.
- Aplikasi tidak menulis ke sheet lain atau mengubah formula ringkasan.

## Cloudflare Pages

Hubungkan repository yang sama namun set **Root directory** ke `rekap-teteh-sunda`.

- Framework preset: None
- Build command: `exit 0`
- Build output directory: `public`
- Production branch: `main`
- Environment variable (Production): `APPS_SCRIPT_URL` = URL Apps Script Web App berakhiran `/exec`

## Apps Script

1. Buka spreadsheet sumber dan pilih Extensions → Apps Script.
2. Simpan cadangan proyek yang ada terlebih dahulu. Jika belum ada proyek script terkait, buat proyek Apps Script baru yang terikat pada spreadsheet.
3. Salin isi file `Code.gs` dari paket ZIP migrasi yang disediakan ke editor Apps Script. Bila proyek Apps Script pada spreadsheet sudah digunakan untuk hal lain, jangan menimpanya; gunakan file/proyek terpisah.
4. Simpan, lalu deploy sebagai Web App (Execute as: Me; Who has access: Anyone) agar Cloudflare dapat memanggil endpoint tanpa login tambahan.
5. Salin URL `/exec` ke Environment variable `APPS_SCRIPT_URL` pada project Pages baru dan deploy ulang.

## Pengujian

- Muat dashboard dan verifikasi angka awal: Rp8.550.000, 22 RIT, rata-rata per baris setoran Rp2.137.500.
- Pastikan empat baris sumber tampil. Nilai tanggal 8 November 2006 pada data ekspor dipertahankan sebagaimana sumber; konfirmasikan dengan pemilik data jika sebenarnya dimaksudkan 8 November 2026.
- Uji simpan/edit/hapus hanya menggunakan satu baris uji yang telah disepakati.

## Catatan

API menggunakan akses `Anyone` pada deployment supaya Cloudflare dapat memanggilnya. Karena tidak ada autentikasi tambahan, siapa pun yang mengetahui alamat aplikasi/API berpotensi memanggil baca, simpan, ubah, atau hapus. Signature transaksi hanya mencegah operasi edit/hapus atas data yang sudah berubah; bukan autentikasi pengguna.