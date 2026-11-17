tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Rustic Modern (Warm Sand Parchment, Deep Olive & Ochre Gold)
        'rustic-olive': '#525135', // Zaitun rustic utama untuk tombol & aksen gelap
        'olive-ink': '#3A3823',    // Tinta zaitun tua untuk tipografi & dok
        'sage-mist': '#8E8866',    // Hijau lumut berkabut untuk bayangan lembah
        'warm-sand': '#E4D2BA',    // Kertas pasir hangat latar belakang
        'cream-linen': '#F6E4CE',  // Krem linen lembut untuk kartu & sorotan terang
        'ochre-gold': '#BF8C57',   // Emas okker hangat untuk garis, ikon & pembatas
        'bronze-ochre': '#8A5E34', // Perunggu okker untuk label kecil ber-kontras tinggi

        // Semantic aliases
        olive: {
          DEFAULT: '#525135',
          ink: '#3A3823',
          mist: '#8E8866',
        },
        sand: {
          DEFAULT: '#E4D2BA',
          light: '#F6E4CE',
          paper: '#EFE0CC',
        },
        ochre: {
          DEFAULT: '#BF8C57',
          bronze: '#8A5E34',
          soft: '#DFC5A4',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        script: ['"Alex Brush"', '"Great Vibes"', 'cursive'],
      }
    }
  }
};
