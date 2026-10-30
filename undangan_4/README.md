# 💍 Undangan Digital Minimalist Luxury 09 (Habib & Adiba)

Template clone 1:1 dari web referensi [Punakawan Digital Luxury 09](https://inv.punakawandigital.id/luxury-09/) menggunakan HTML5 murni, CSS3, dan Vanilla JavaScript.

---

## 🎨 Palet Warna & Tipografi (Tema Deep Emerald & Matte Gold)

- **Warna Utama**: Deep Emerald (`#004D40`), Midnight Forest (`#002B24`), Medium Emerald (`#00695C`)
- **Aksen Gold**: Matte Gold (`#B8860B`), Dark Gold (`#8C6508`), Luminous Gold (`#D4AF37`)
- **Latar Belakang**: Soft Cream (`#FAF0E6`), Linen Cream (`#F5EBE0`), Pure White (`#FFFFFF`)
- **Gradien Eksklusif**:
  - `linear-gradient(180deg, #00695C 0%, #004D40 100%)`
  - `linear-gradient(180deg, #005A4B 0%, #00382E 100%)`
  - `linear-gradient(180deg, #00796B 0%, #004D40 100%)`
  - `linear-gradient(135deg, #D4AF37 0%, #B8860B 100%)`
- **Tipografi**:
  - Custom Fonts lokal: `analogue`, `laluxesscript-regula`, `aston-script`, `power`, `creattion`, `editors-light` (format `.woff2` tersimpan lokal di `asset/`)
  - Google Fonts: `Arima`, `Cormorant Upright`, `Montserrat`, `Poppins`, `Jura`, `Quicksand`, `Roboto`

---

## 📁 Struktur Folder

```
undangan_4/
├── asset/                        # Seluruh aset visual, audio, & font 1:1
│   ├── LUXURY-09-FOTO.jpg
│   ├── 25JB432-tn.jpg
│   ├── 25JB432-p.jpg
│   ├── 25JB432-w.jpg
│   ├── 25JB432-ak-e1763359785610.jpg
│   ├── 11-e1763359681425.jpg
│   ├── 12.jpg
│   ├── 13.jpg
│   ├── 14.jpg
│   ├── BCA_5770.webp
│   ├── chip-atm-1-2-1-1-1-3-1-1.png
│   ├── img-tree-shadow-01-1-1.png
│   ├── bg-bank-1-1-3-1-1.webp
│   ├── song.mp3                  # Audio latar Rizky Febian feat. Mahalini - Bermuara
│   ├── analogue.woff2
│   ├── laluxesscript-regula.woff2
│   ├── aston-script.woff2
│   ├── power.woff2
│   ├── creattion.woff2
│   └── editors-light.woff2
├── css/
│   └── style.css                 # Styling 1:1 (desktop split, mobile frame, transisi & animasi)
├── js/
│   └── script.js                 # Logika interaktif lengkap
├── index.html                    # Halaman utama undangan
├── package.json
└── README.md
```

---

## ✨ Fitur & Interaktivitas

1. **Cover Pembuka Interaktif (`#sec`, `#kolom`, `#open`)**:
   - Efek tirai naik (`translateY(-100%)`) dan fade out mulus saat tombol *"Buka Undangan"* diklik.
   - Otomatis membuka kunci scroll dan menyalakan musik latar.
   - Nama tamu personalisasi dinamis via URL query parameter (contoh: `index.html?to=Bapak+Budi`).
2. **Desktop Centered Frame dengan Ambient Blurred Background**:
   - Pada layar desktop/laptop lebar: frame undangan (`#isi` 450px) berada persis di tengah layar (*centered layout*) dengan efek bayangan berlapis (*layered soft drop-shadow*).
   - Seluruh latar belakang di luar frame tidak kosong/gelap, melainkan dihiasi foto mempelai yang di-blur secara artistik (*ambient blurred backdrop*) berpadu dengan gradien warna Deep Emerald & Midnight Forest yang mewah.
   - Tombol floating musik piringan vinyl Template 1 berada di pojok kanan atas frame undangan.
   - Pada layar smartphone/tablet: otomatis responsif penuh 100% (max-width 450px terpusat).
3. **Hero Slideshow & Bouncing Scroll Indicator**:
   - Fading slideshow gambar pasangan Template 1 (`foto_mempelai_dummy.jpg` & `couple_1.jpg`) dengan tombol scroll meluncur mulus ke section berikutnya.
4. **Countdown Timer & Ar-Rum 21**:
   - Hitung mundur real-time menuju tanggal 28 Desember 2026 (Hari, Jam, Menit, Detik).
5. **Profil Mempelai Slim Uniform Frame**:
   - Foto mempelai pria dan wanita menggunakan foto Template 1 (`groom.jpg` & `bride.jpg`) dengan bingkai rounded ramping simetris 4px di seluruh sisi (atas, kanan, bawah, kiri) berpadu warna tema Deep Emerald (`#004D40`) tanpa teks overlay yang menutupi foto.
   - Profil lengkap Habib Yulianto & Adiba Putri Syakila beserta nama orang tua & tombol pill Instagram berbalut username resmi (`@habibyulianto` & `@adibasyakila`).
6. **Save The Date**:
   - Visual bertingkat kata *SAVE The DATE* dengan pill tanggal *28. 12. 2026*.
7. **Wedding Events (Akad Nikah & Resepsi)**:
   - Slideshow foto acara otomatis menggunakan foto momen Template 1.
   - Pita vertikal elegan (*vertical ribbon*) bertuliskan *"Akad Nikah"* dan *"Resepsi"*.
   - Animasi hitung angka tanggal 28 saat discroll (*countup animation*).
   - Waktu, lokasi, dan tombol *"Lihat Lokasi"* Google Maps.
8. **Love Story (Interactive Journey Storyboard)**:
   - Dirombak dari format 3 kartu bertumpuk menjadi **papan cerita interaktif dinamis (*single dynamic chapter showcase*)** yang ringkas dan pas di dalam tinggi layar 100vh.
   - Foto kenangan utama diperbesar sedikit secara proporsional dengan bingkai emas simetris bersih tanpa badge icon hati yang menutupi sudut foto.
   - Dilengkapi *interactive milestone stepper* dengan garis progres emas ([01 Awal] --- [02 Lamaran] --- [03 Menikah]) dan jarak lega (*breathing room*) dari foto.
   - Badge judul dihapus sehingga judul bab (*Awal Cerita*, *Momen Lamaran*, *Hari Bahagia*) langsung naik ke atas dengan proporsi tipografi yang bersih dan proporsional.
   - Transisi teks bab elegan dari bawah ke atas (*vertical bottom-to-top rising fade*): saat berpindah bab, teks bab baru memudar dan meluncur anggun dari bawah ke atas (`translateY: 24px -> 0`, `opacity: 0 -> 1`), sedangkan bab sebelumnya memudar lembut ke atas dengan ritme pelan dan elegan (*0.85s slow luxury*).
9. **Galeri Foto & Video Lightbox**:
   - Video YouTube undangan terintegrasi langsung di dalam halaman (`https://www.youtube.com/watch?v=ZeFpigRaXbI`) dengan konfigurasi *strict-origin-when-cross-origin* & JS API agar kompatibel di semua browser dan perangkat.
   - Grid masonry 2 kolom untuk 6 foto kenangan dari Template 1 dengan fitur klik *Full Lightbox Modal* (Prev, Next, Close, Keyboard ESC/Arrow).
10. **Amplop Digital Cashless & Kado Fisik**:
    - Tombol akordeon interaktif *"Kirim Hadiah"* dengan animasi putar chevron 180°, ikon kado goyang (*tada bounce*), efek klik *press scale*, dan active glow.
    - Pembukaan laci drawer mulus menggunakan transisi CSS Grid (`0fr -> 1fr`).
    - Animasi kartu masuk bertingkat (*staggered 3D card pop-in*) dengan pantulan kilau cahaya perak (*card metallic shimmer*) pada kartu ATM Bank BCA.
    - Nomor rekening sejajar lurus dengan logo BCA, chip kartu ATM, nama penerima, dan tombol salin nomor rekening ke clipboard dengan popup notifikasi toast.
    - Kartu alamat kirim kado fisik lengkap dengan tombol salin alamat.
11. **RSVP & Buku Tamu (Wishes)**:
    - Header section terstruktur mewah: subtitle aksen emas (*RSVP & UCAPAN*), judul serif (*Konfirmasi & Doa Restu*), dan pengantar sopan santun.
    - Pilihan kehadiran *"Hadir"* / *"Tidak Hadir"* dengan tombol pill warna dinamis.
    - Formulir nama dan doa/ucapan dengan textarea terkunci horizontal (*fixed width 100% & `resize: vertical`*) sehingga hanya bisa diatur tingginya saja tanpa merusak lebar layout.
    - Daftar ucapan real-time tersimpan secara lokal (*localStorage*) lengkap dengan avatar, lencana kehadiran, dan waktu ucapan.
12. **Pemutar Musik Mengambang (*Floating Audio Player - Template 1 Vinyl Style*)**:
    - Menggunakan desain vinyl piringan hitam seperti Template 1 dengan icon SVG piringan berputar saat aktif dan icon speaker mute saat dijeda.
    - Dibalut tema kaca putih blur (*frosted backdrop glassmorphism*), aksen border matte gold, dan warna ikon Deep Emerald (`#004D40`).
    - Posisi berada di dalam frame undangan digital di pojok kanan atas (`top: 20px`), selalu mudah diakses tanpa mengganggu bottom dockbar.
    - Otomatis pause saat berpindah tab browser dan melanjutkan saat kembali.
13. **Fixed Bottom Navigation Bar (Pill Squircle Style - Deep Emerald & Matte Gold)**:
    - Navigasi melayang di bagian bawah dengan wadah putih blur squircle konsentris (*frosted backdrop glassmorphism* `border-radius: 18px`) yang serasi dengan tombol squircle di dalamnya.
    - Icon navigasi: Home/Cover (`#hero`), Mempelai (`#mempelai`), Acara (`#acara`), Galeri (`#galeri`), dan Ucapan/RSVP (`#rsvp`).
    - Dilengkapi *scroll-spy* otomatis yang memperbarui status aktif tombol sesuai posisi section yang sedang dilihat.
14. **Ukuran Section 100vh & Animasi Persis Template 1 Bebas Flicker (*Zero Jitter*)**:
    - Setiap section memiliki tinggi minimum 100vh (*full viewport height*) dengan tata letak konten terpusat dan proporsional.
    - Animasi *scroll reveal* dua arah super halus (2.0s cubic-bezier) persis Template 1: `.reveal`, `.reveal-left`, `.reveal-right`, `.reveal-scale`, `.reveal-fade`, dan *stagger delay* berjenjang.
    - Dilengkapi proteksi anti-flicker (*anti kedat-kedut*): observer tidak lagi dire-instansiasi pada event scroll, dan elemen di tepi atas layar tidak di-reset agar tidak memicu osilasi transform translateY.
15. **Section Terimakasih & Watermark Terintegrasi**:
    - Bagian ucapan terima kasih dengan slideshow latar belakang berpadu elegan dengan watermark `by idmetafora` beserta tombol Instagram dan Web di area bawah section.
    - Menggunakan padding bawah aman (105px) sehingga watermark tampil sempurna di atas *dock bar* dan tidak terpotong atau tertutup.
16. **Favicon & Judul Halaman Resmi**:
    - Judul peramban bersih: `The Wedding of Habib & Adiba`.
    - Dilengkapi SVG favicon resmi bertema cincin/hati bernuansa Deep Emerald & Matte Gold.

---

## 🚀 Cara Menjalankan

1. Buka folder `undangan_4`.
2. Klik dua kali file `index.html` pada peramban web (Google Chrome, Edge, Safari, Firefox).
3. Untuk mengetes nama tamu dinamis, tambahkan parameter di URL:  
   `index.html?to=Nama+Tamu+Anda`
4. Atau jalankan server lokal:
   ```bash
   npm start
   ```
   Lalu buka `http://localhost:3000` pada browser.
