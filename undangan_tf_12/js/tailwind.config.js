tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Batik Modern Jawa
        'deep-olive': '#161C0F', // Warna utama background
        'antique-gold': '#DA9F4E', // Ornamen batik, garis, dan aksen
        'muted-champagne': '#BB9F6A', // Aksen sekunder dan dekorasi
        'warm-ivory': '#F8E4CD', // Teks utama dan elemen terang
        
        // Warna tambahan
        'dark-olive': '#25271A', // Background alternatif
        'forest-black': '#10120B', // Background gelap
        'bronze': '#6E4E32', // Ornamen sekunder
        'soft-gold': '#D9C09C', // Border dan detail

        // Semantic aliases
        olive: {
          DEFAULT: '#161C0F',
          dark: '#10120B',
          alt: '#25271A',
        },
        gold: {
          DEFAULT: '#DA9F4E',
          antique: '#DA9F4E',
          muted: '#BB9F6A',
          soft: '#D9C09C',
          bronze: '#6E4E32',
        },
        ivory: {
          DEFAULT: '#F8E4CD',
          warm: '#F8E4CD',
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
