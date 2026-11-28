tailwind.config = {
  theme: {
    extend: {
      colors: {
        // Color palette — Dreamy Floral (Midnight Slate Ink, Cornflower Blue, Periwinkle Mist, Pearl White)
        'midnight-ink': '#152544',    // Teks utama, tombol & aksen kontras biru malam
        'slate-navy': '#1E335A',      // Sorotan biru dongker lembut untuk gradien gelap
        'cornflower': '#5D7BB4',      // Biru floral medium untuk garis, ikon & detail kelopak
        'periwinkle': '#8FA9D4',      // Biru kabut lembut untuk aura & bingkai halus
        'mist-blue': '#DCE6F7',       // Kabut biru cat air untuk tepian & latar kartu
        'pearl-white': '#F7F9FE',     // Putih mutiara cerah untuk kanvas & kartu kaca

        // Semantic aliases
        floral: {
          ink: '#152544',
          navy: '#1E335A',
          cornflower: '#5D7BB4',
          periwinkle: '#8FA9D4',
          mist: '#DCE6F7',
          ice: '#EDF3FC',
          pearl: '#F7F9FE',
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
