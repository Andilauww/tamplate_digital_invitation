# Undangan 8 — Pawiwahan Pethak (Adat Jawa Batik Putih & Sekar Melati)

Template undangan pernikahan digital bertema **Adat Jawa Batik Putih & Sekar Melati Keraton**, menggabungkan arsitektur panggung 3-kolom desktop ala `undangan_7` dengan tata letak ornamen baru serta animasi berlapis terinspirasi dari `undangan_1` – `undangan_7`.

## Highlight Layout, Ornamen & Animasi

- **Desktop Centered 3-Column Kraton Stage** (`>= 1024px`) — Meniru mode desktop `undangan_7`: kolom undangan (`440px`) berada di tengah diapit sayap *sticky* kiri dan kanan bertekstur kain **Batik Kawung Putih** dengan untaian **Roncen Melati**, buket sudut **Sekar Melati & Anggrek Putih**, serta kartu potret mutiara.
- **Pintu Gebyog Batik Putih 3D (`#gate-cover`)** — Animasi buka pintu kembar 3D (`perspective: 1600px`), mandala Kawung berputar, sepasang Gunungan Pethak pengapit medali, dan deteksi nama tamu dinamis (`?to=Nama+Tamu`).
- **Tata Letak Ornamen Berbeda dari Undangan 7**:
  - Kanopi atas berhias untaian **Roncen Melati Menggantung** (*pendulum sway*).
  - Sudut diagonal berhias **Buket Sekar Melati, Anggrek Bulan Putih & Daun Batik Prada** (*pop-slow bloom* & *wind sway*).
  - Halo **Cakra Mandala Kawung Emas** berputar perlahan di belakang Gunungan Pethak, medali cover, monogram `&`, dan potret penutup.
  - Perbatasan seksi berhias **Renda Ukiran Gebyog Putih** (*scalloped lace divider*).
  - Panggung penutup (*Matur Nuwun*) diapit simetris oleh **Sepasang Wayang Kulit Putih Prada Emas (Rama & Shinta)**.
- **Kelopak Melati Gugur Halus & Multi-Directional Reveal** — Kelopak melati putih melayang lembut di layar, animasi *count-up* tanggal penanggalan Jawa (`01` → `28`), piringan musik Gamelan berputar otomatis, serta modal galeri native `<dialog>` dengan transisi *top-layer* (`@starting-style` + `allow-discrete`).

## Cara Menjalankan

```bash
npx serve .
```
