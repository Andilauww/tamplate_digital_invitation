tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Elegant Royale (Midnight Sapphire Navy & Champagne Gold)
        'sapphire-royal': '#1F3C6B', // Sorotan safir biru kerajaan
        'royal-navy': '#13284A',     // Warna utama biru malam elegan
        'midnight-navy': '#0C1A33',  // Kedalaman navy klasik mewah
        'abyss-navy': '#071124',     // Bayangan terluar desktop & bingkai dalam
        'royal-gold': '#DFC092',     // Emas sampanye terang untuk ikon & sorotan
        'bronze-gold': '#A88450',    // Emas antik lembut untuk garis tepi
        'warm-ivory': '#FBF3E8',     // Putih gading hangat untuk teks & tombol

        // Semantic aliases
        navy: {
          DEFAULT: '#13284A',
          sapphire: '#1F3C6B',
          deep: '#0C1A33',
          dark: '#071124',
        },
        gold: {
          DEFAULT: '#DFC092',
          royal: '#DFC092',
          bronze: '#A88450',
          soft: '#EED8B8',
        },
        ivory: {
          DEFAULT: '#FBF3E8',
          warm: '#FBF3E8',
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
