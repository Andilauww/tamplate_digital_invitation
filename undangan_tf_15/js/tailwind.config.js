tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Jawa Klasik (Merah Crimson Keraton & Emas Klasik)
        'keraton-crimson': '#841816', // Sorotan terang merah keraton
        'keraton-maroon': '#5E100E', // Warna utama merah marun klasik hangat
        'deep-maroon': '#480A0B', // Kedalaman marun keraton
        'dark-velvet': '#350606', // Bayangan terluar desktop & bingkai dalam
        'royal-gold': '#E8B15E', // Emas klasik terang untuk ikon & sorotan
        'bronze-gold': '#B9732B', // Emas ukir tua Jawa
        'warm-ivory': '#FAEADB', // Krem gading hangat untuk teks & tombol

        // Semantic aliases
        maroon: {
          DEFAULT: '#5E100E',
          crimson: '#841816',
          deep: '#480A0B',
          dark: '#350606',
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
