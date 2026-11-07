# Aturan Proyek: Template Undangan Pernikahan Digital Adat Nusantara

Dokumen ini berisi aturan baku (*always-on project rules*) yang wajib dipatuhi oleh asisten AI / Antigravity saat membuat atau memodifikasi template undangan digital di repositori ini.

---

## 1. Aturan Wajib: Integritas Struktur Konten (Invariant)
- **DILARANG KERAS** menambah, menghapus, atau mengubah urutan 9 seksi utama undangan:
  1. `Gate Cover (#gate-cover)`
  2. `Hero Section (#beranda)`
  3. `Mempelai (#mempelai)`
  4. `Acara (#acara)`
  5. `Galeri (#galeri)`
  6. `Cerita Cinta (#cerita)`
  7. `Tanda Kasih / Amplop Digital (#amplop)`
  8. `Ucapan & RSVP (#ucapan)`
  9. `Penutup (#penutup)`
- Eksplorasi hanya diizinkan pada:
  - Gaya visual, palet warna, tipografi, dan ragam ornamen adat.
  - Variasi tata letak internal kartu (selama isi informasi tetap sama).

---

## 2. Standar Komponen & Tata Letak Antarmuka
1. **Tanggal & Lokasi pada Cover:**
   - Wajib diformat menjadi **2 baris** terpusat (Baris 1: Hari & Tanggal, Baris 2: Kota & Wilayah Adat).
2. **Ornamen Sudut Cover & Hero:**
   - **JANGAN** memasang ornamen sudut segitiga di pojok kiri/kanan atas cover pembuka (`#gate-cover`) dan pojok atas seksi setelah cover (`#beranda`).
3. **Tombol Instagram Mempelai:**
   - Tombol Instagram pada kartu mempelai pria dan wanita wajib dibuat simetris sempurna (`height: 38px`, `padding: 0 20px`, `gap: 8px`, `line-height: 1`).
4. **Interaksi Cover & Audio:**
   - Tombol "Buka Undangan" (`#btn-open-gate`) wajib membuka tirai cover secara mulus dan memicu pemutaran audio latar secara otomatis.
   - Tombol piringan hitam (*Music FAB*) wajib tersedia di pojok atas untuk kontrol jeda/putar audio.
5. **Seksi Penutup:**
   - Ornamen penutup wajib diletakkan di bagian paling dasar (`bottom: 0`) di bawah dockbar navigasi (`z-index: 2` vs `dockbar z-index: 90`), dilengkapi gradasi hitam tipis dari bawah ke atas.
   - Tidak boleh ada ornamen pohon/manggar yang menutupi teks penutup.

---

## 3. Ornamen Adat & Tampilan Desktop
1. **Keaslian Motif Adat:**
   - Ornamen visual wajib mencerminkan motif otentik adat yang diangkat (contoh: Lancang Kuning & Awan Larat untuk Melayu; Gorga & Ulos untuk Batak; Rumah Gadang & Pucuk Rebung untuk Minang; Gapura & Patra Punggel untuk Bali).
   - Hindari membuat ornamen yang tampak identik antar template.
   - Lambang atau bintang di puncak kanopi wajib simetris dan tepat berada di titik tengah.
2. **Sayap Ambient Desktop (`@media (min-width: 768px)`):**
   - Wajib menyertakan sayap ornamen samping di kiri dan kanan layar luar stream.
   - Ornamen 4 sudut (`.wings-corner`) wajib menggunakan `transform-origin: center center;` agar pencerminan `scaleX(-1)` dan `scaleY(-1)` tidak terpotong keluar layar.
   - Ornamen samping dan sudut wajib memiliki animasi mengambang/melayang halus (*floating & micro-sway* 7–9 detik).
   - Wajib menyertakan `@media (prefers-reduced-motion: reduce)`.
