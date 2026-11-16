# 🌲 Undangan Pernikahan Arga & Maya (Versi Gunung / Alpine Mountain Wedding)

Proyek website undangan pernikahan digital bernuansa pegunungan (*Misty Mountain & Alpine Pine Forest*) yang elegan, mewah, responsif, dan kaya animasi, dibangun menggunakan arsitektur **HTML5, CSS3 kustom, dan Vanilla JavaScript**.

Struktur konten, tata letak kartu, dan seluruh kurva animasi kemunculan komponen (*scroll reveal, gate 3D opening, botanical pop slow, dan lateral wind sway*) dirancang **sama persis** dengan `undangan_3`, namun disesuaikan secara tematik ke estetika alam pegunungan tinggi (*highland sanctuary*).

---

## 🏔️ Karakteristik & Palet Desain
- **Tema**: Misty Mountain, Alpine Pine Forest & Edelweiss Highland Wedding.
- **Palet Warna**:
  - 🌲 **Deep Highland Pine**: `#1E352B` & `#152A22` (Canvas utama, tombol aksi, dan teks judul).
  - 🌫️ **Misty Alpine Fog**: `#E8EDE7` & `#5A7266` (Background selang-seling section & kartu nuansa kabut).
  - 🌼 **Edelweiss Cream**: `#FAF9F5` (Canvas tengah mobile 430px & kartu kaca buram).
  - ✨ **Warm Mountain Cedar Gold**: `#C59A45` (Aksen wax seal, divider, dan border kartu).
- **Transisi Antar Section**: Siluet punggungan gunung berkabut (*mountain ridges*) berlapis organik SVG menggantikan ombak pantai.

---

## 📂 Struktur File & Folder

```
undangan_5/
├── index.html              # Struktur utama dokumen HTML5 (persis struktur undangan_3)
├── css/
│   └── style.css           # Styling kustom (animasi 3D pintu gerbang, keyframes reveal, wind sway)
├── js/
│   ├── tailwind.config.js  # Konfigurasi palet warna tema gunung & tipografi
│   └── script.js           # Logika interaktif (Countdown, Audio, Gate Open, RSVP, Lightbox)
├── asset/
│   ├── img/
│   │   ├── bg/             # Background pemandangan pegunungan berkabut (mountain_bg.jpg)
│   │   ├── mempelai/       # Foto potret editorial mempelai pria, wanita, & couple cutout
│   │   └── ornamen/        # Rangkaian botanical bunga edelweis, daun pinus & buket
│   └── music/              # Musik instrumen orkestra romantis (Alpine Serenade.mp3)
├── package.json            # Konfigurasi script dev
└── README.md               # Dokumentasi template
```

---

## 🚀 Fitur Utama

1. **3D Double-Leaf Gate Cover**:
   - Efek pintu 2 daun terbuka ke samping (*folding gate doors*) bersanding dengan kartu kaca buram utuh (*frosted glass blur*) dan foto cutout mempelai.
   - Ornamen botanical di 4 sudut yang berputar mekar seirama dengan ayunan pintu.
2. **Audio Controller & Romantic Background Music**:
   - Pemutar audio otomatis saat pintu dibuka, lengkap dengan tombol kontrol piringan hitam berputar (*rotating vinyl disc*) di pojok kanan atas.
3. **Animasi Kemunculan Komponen (Identik Undangan 3)**:
   - Menggunakan sistem `IntersectionObserver` hemat memori (60fps tanpa jank).
   - Efek `.reveal`, `.reveal-scale`, `.reveal-left`, `.reveal-right`, dan `.reveal-botanical` (*pop slow*).
4. **Countdown Timer Interaktif**:
   - Kotak hitung mundur mengambang (*unified island countdown bar*) menuju tanggal pernikahan.
5. **Rangkaian Acara & Integrasi Peta**:
   - 2 kartu resort terpisah untuk Akad Nikah & Resepsi Pernikahan, terintegrasi langsung dengan Google Maps & Google Calendar.
6. **Galeri Momen & Lightbox**:
   - Layout editorial masonry asimetris (foto vertikal, tumpuk, dan panorama) dengan modal pratinjau resolusi tinggi.
7. **Tanda Kasih (Amplop Digital & Kado Fisik)**:
   - Kartu ATM modern (BCA & Mandiri) dengan tombol salin instan (*copy to clipboard*) serta alamat pengiriman kado fisik.
8. **Buku Tamu & RSVP Interaktif**:
   - Formulir konfirmasi kehadiran, penghitung karakter (0/200), penyimpanan live stream ucapan, dan tombol like interaktif.
9. **Floating Bottom Dock Navigation**:
   - Navigasi melayang responsif dengan 5 ikon menu memudahkan penjelajahan di perangkat seluler.

---

## 💻 Cara Menjalankan

Cukup buka atau klik dua kali file `index.html` pada browser modern apa pun (Google Chrome, Microsoft Edge, Safari, Firefox). Tidak diperlukan build step atau kompilasi server.

© 2025 **Andilauww**. All Rights Reserved.
