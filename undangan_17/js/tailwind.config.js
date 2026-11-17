tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Rustic Modern (Sageland Olive, Warm Parchment & Ochre Gold)
        'rustic-olive': '#564F35', // Warna utama olive natural
        'olive-ink': '#3A3523', // Teks gelap kontras tinggi & tombol utama
        'sage-mist': '#8E886B', // Siluet perbukitan tengah
        'warm-sand': '#E8D0B6', // Latar langit & kertas hangat
        'cream-linen': '#F8EFE8', // Kartu terang & highlights
        'ochre-gold': '#C28E5C', // Ukiran, garis pembatas, & aksen tembaga

        // Semantic aliases
        olive: {
          DEFAULT: '#564F35',
          dark: '#3A3523',
          sage: '#8E886B',
        },
        sand: {
          DEFAULT: '#E8D0B6',
          light: '#EEDCC6',
          mid: '#E2CEB3',
        },
        gold: {
          DEFAULT: '#C28E5C',
          ochre: '#C28E5C',
          soft: '#DFB68C',
        },
        cream: {
          DEFAULT: '#F8EFE8',
          warm: '#F8EFE8',
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
