tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Jawa Klasik (Keraton Maroon & Royal Gold)
        'keraton-maroon': '#480A0B', // Warna utama merah marun klasik
        'deep-maroon': '#280404', // Latar gelap marun beludru
        'royal-crimson': '#5E1112', // Sorotan hangat marun
        'dark-velvet': '#170203', // Latar terluar desktop & bayangan
        'royal-gold': '#E8B15E', // Emas klasik terang untuk ikon & sorotan
        'bronze-gold': '#B9732B', // Emas ukir tua Jawa
        'warm-ivory': '#FAEADB', // Krem gading hangat untuk teks & tombol

        // Semantic aliases
        maroon: {
          DEFAULT: '#480A0B',
          deep: '#280404',
          dark: '#170203',
          crimson: '#5E1112',
        },
        gold: {
          DEFAULT: '#E8B15E',
          royal: '#E8B15E',
          bronze: '#B9732B',
          soft: '#F0D5B2',
        },
        ivory: {
          DEFAULT: '#FAEADB',
          warm: '#FAEADB',
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
