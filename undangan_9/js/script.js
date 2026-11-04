
// ==============================================================
// GATE COVER / PINTU MASUK LOGIC
// ==============================================================
function initGate() {
  // Prevent browser from restoring scroll to middle of page
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }
  window.scrollTo(0, 0);

  const gateCover = document.getElementById('gateCover');
  if (!gateCover || gateCover.style.display === 'none' || gateCover.classList.contains('hidden')) {
    document.body.style.overflow = 'auto';
    triggerHeroReveal();
    const nav = document.querySelector('nav');
    if (nav) {
      nav.style.opacity = '1';
      nav.style.pointerEvents = 'auto';
    }
    const musicWrap = document.getElementById('musicControlWrap');
    if (musicWrap) {
      musicWrap.style.opacity = '1';
      musicWrap.style.pointerEvents = 'auto';
    }
    return;
  }

  // Ensure all page elements remain hidden until gate opens / until scrolled into view
  const allRevealEls = document.querySelectorAll('.hero-anim, .reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right, .reveal-botanical');
  allRevealEls.forEach(el => el.classList.remove('is-revealed'));
  
  // Lock body scroll while on gate
  document.body.style.overflow = 'hidden';

  // Hide bottom nav while on gate
  const nav = document.querySelector('nav');
  if (nav) {
    nav.style.opacity = '0';
    nav.style.pointerEvents = 'none';
    nav.style.transition = 'opacity 0.6s ease';
  }
  const musicWrap = document.getElementById('musicControlWrap');
  if (musicWrap) {
    musicWrap.style.opacity = '0';
    musicWrap.style.pointerEvents = 'none';
    musicWrap.style.transition = 'opacity 0.6s ease';
  }

  // Get guest name from URL (?to=Nama+Tamu or ?u=Nama+Tamu)
  const urlParams = new URLSearchParams(window.location.search);
  const guest = urlParams.get('to') || urlParams.get('u');
  if (guest) {
    const guestWrap = document.getElementById('coverGuestWrap');
    if (guestWrap) guestWrap.classList.remove('hidden');
    const guestEls = document.querySelectorAll('#coverGuestName, .coverGuestNameTarget, [data-guest-name]');
    guestEls.forEach(el => {
      el.textContent = decodeURIComponent(guest);
    });
  }
}

let isGateOpening = false;

function openGate() {
  if (isGateOpening) return;
  isGateOpening = true;

  const gatePage = document.getElementById('gatePage');
  const gateCover = document.getElementById('gateCover');
  const nav = document.querySelector('nav');
  const musicWrap = document.getElementById('musicControlWrap');

  // Guarantee page is locked at the very top (never jump/drop)
  window.scrollTo(0, 0);

  // 1. Option 3: Immediate Flower Bloom Pop + Golden Sunbeam Burst ignition
  if (gatePage) {
    gatePage.classList.add('gate-opening-bloom');
  }

  // Disable pointer events on center card immediately
  const centerCard = document.getElementById('gateCenterCard');
  if (centerCard) {
    centerCard.style.pointerEvents = 'none';
  }

  // 2. Start romantic background music
  playMusic();

  // 3. Trigger 3D Heritage Double Door Swing after bloom ignition (220ms)
  setTimeout(() => {
    if (gatePage) {
      gatePage.classList.add('doors-opened');
    }

    // 4. Trigger sequential hero entrance reveal behind the parting doors
    triggerHeroReveal();
  }, 220);

  // 5. Smoothly reveal music toggle & bottom navigation as doors open
  setTimeout(() => {
    if (musicWrap) {
      musicWrap.style.opacity = '1';
      musicWrap.style.pointerEvents = 'auto';
    }
    if (nav) {
      nav.style.opacity = '1';
      nav.style.pointerEvents = 'auto';
    }
  }, 600);

  // 6. Clean up gate overlay & unlock scroll after 3D swing completes (1320ms)
  setTimeout(() => {
    if (gateCover) {
      gateCover.classList.add('gate-fade-out');
      setTimeout(() => {
        gateCover.style.display = 'none';
      }, 150);
    }

    document.body.style.overflow = 'auto';
    initScrollReveal();
    isGateOpening = false;
  }, 1320);
}

// 1. Smooth "Buka Undangan" Action + Romantic Audio Auto-Start
function openInvitation(e) {
  if (e) e.preventDefault();
  const targetSection = document.getElementById('prologue') || document.getElementById('mempelai');
  if (targetSection) {
    targetSection.scrollIntoView({ behavior: 'smooth' });
  }
  if (!isPlayingAudio) {
    playMusic();
  }
}

// ==============================================================
// 2. BACKGROUND MUSIC CONTROLLER (Coral Island Overture MP3)
// ==============================================================
let isPlayingAudio = false;

function initAudio() {
  const audio = document.getElementById('weddingMusic');
  if (!audio) return;

  // Gentle, romantic background volume
  audio.volume = 0.75;

  // Keep state and UI synchronized whenever playback status changes
  audio.addEventListener('play', () => {
    isPlayingAudio = true;
    updateMusicUI(true);
  });

  audio.addEventListener('pause', () => {
    isPlayingAudio = false;
    updateMusicUI(false);
  });

  // Seamless loop fallback if browser loop attribute fails
  audio.addEventListener('ended', () => {
    audio.currentTime = 0;
    audio.play().catch(e => console.log('Audio loop restart error:', e));
  });
}

function playMusic() {
  const audio = document.getElementById('weddingMusic');
  if (!audio) return;

  audio.muted = false;
  const playPromise = audio.play();
  if (playPromise !== undefined) {
    playPromise.then(() => {
      isPlayingAudio = true;
      updateMusicUI(true);
    }).catch(err => {
      console.log('Autoplay waiting for user interaction or blocked:', err);
      isPlayingAudio = false;
      updateMusicUI(false);
    });
  }
}

function pauseMusic() {
  const audio = document.getElementById('weddingMusic');
  if (!audio) return;
  audio.pause();
  isPlayingAudio = false;
  updateMusicUI(false);
}

function toggleMusic() {
  const audio = document.getElementById('weddingMusic');
  if (!audio) return;

  if (audio.paused || !isPlayingAudio) {
    playMusic();
  } else {
    pauseMusic();
  }
}

function updateMusicUI(isPlaying) {
  const mutedIcon = document.getElementById('audioIconMuted');
  const playingIcon = document.getElementById('audioIconPlaying');
  const toggleBtn = document.getElementById('musicToggleBtn');

  if (isPlaying) {
    if (mutedIcon) mutedIcon.classList.add('hidden');
    if (playingIcon) {
      playingIcon.classList.remove('hidden');
      playingIcon.classList.add('music-disc-spin');
    }
    if (toggleBtn) {
      toggleBtn.classList.remove('opacity-75');
      toggleBtn.setAttribute('title', 'Matikan Musik');
      toggleBtn.setAttribute('aria-label', 'Matikan Musik');
    }
  } else {
    if (mutedIcon) mutedIcon.classList.remove('hidden');
    if (playingIcon) {
      playingIcon.classList.add('hidden');
      playingIcon.classList.remove('music-disc-spin');
    }
    if (toggleBtn) {
      toggleBtn.classList.add('opacity-75');
      toggleBtn.setAttribute('title', 'Putar Musik');
      toggleBtn.setAttribute('aria-label', 'Putar Musik');
    }
  }
}

// 3. Live Countdown Timer Logic
function initCountdown() {
  let targetDate = new Date('2025-05-24T08:00:00+07:00').getTime();
  const nowCheck = new Date().getTime();
  if (targetDate <= nowCheck) {
    targetDate = nowCheck + (24 * 24 * 60 * 60 * 1000) + (5 * 60 * 60 * 1000) + (19 * 60 * 1000);
  }

  setInterval(() => {
    const now = new Date().getTime();
    const diff = Math.max(0, targetDate - now);

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);

    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMinutes = document.getElementById('cd-minutes');
    const cdSeconds = document.getElementById('cd-seconds');

    if (cdDays) cdDays.textContent = String(d).padStart(2, '0');
    if (cdHours) cdHours.textContent = String(h).padStart(2, '0');
    if (cdMinutes) cdMinutes.textContent = String(m).padStart(2, '0');
    if (cdSeconds) cdSeconds.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// 4. Salin Nomor Rekening ke Clipboard
function copyToClipboard(text, btnElement) {
  navigator.clipboard.writeText(text).then(() => {
    const originalHTML = btnElement.innerHTML;
    btnElement.innerHTML = `<svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/></svg><span>Tersalin ✓</span>`;
    btnElement.classList.add('brightness-110');
    setTimeout(() => {
      btnElement.innerHTML = originalHTML;
      btnElement.classList.remove('brightness-110');
    }, 2000);
  }).catch(() => {
    prompt('Salin teks berikut:', text);
  });
}

function switchGiftTab(tab) {
  const bankTab = document.getElementById('giftTabBank');
  const physicalTab = document.getElementById('giftTabPhysical');
  const bankContent = document.getElementById('giftContentBank');
  const physicalContent = document.getElementById('giftContentPhysical');
  
  if (!bankTab || !physicalTab || !bankContent || !physicalContent) return;

  if (tab === 'bank') {
    bankTab.className = 'px-4 py-1.5 rounded-full text-xs font-semibold heritage-btn-maroon transition-all cursor-pointer';
    physicalTab.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-transparent text-[#5A342B] hover:text-[#481E1B] transition-all cursor-pointer';
    bankContent.classList.remove('hidden');
    physicalContent.classList.add('hidden');
  } else {
    physicalTab.className = 'px-4 py-1.5 rounded-full text-xs font-semibold heritage-btn-maroon transition-all cursor-pointer';
    bankTab.className = 'px-4 py-1.5 rounded-full text-xs font-semibold bg-transparent text-[#5A342B] hover:text-[#481E1B] transition-all cursor-pointer';
    physicalContent.classList.remove('hidden');
    bankContent.classList.add('hidden');
  }
}

// 5. Buku Tamu (Ucapan & Doa) Character Counter & Live Submission
function updateCharCount() {
  const textarea = document.getElementById('wishMessage');
  const counter = document.getElementById('charCounter');
  if (textarea && counter) {
    counter.textContent = `${textarea.value.length}/200`;
  }
}

function submitWish(e) {
  e.preventDefault();
  const nameInput = document.getElementById('wishName');
  const msgInput = document.getElementById('wishMessage');
  const statusInput = document.getElementById('attendanceSelect');
  const container = document.getElementById('wishesContainer');

  const name = nameInput.value.trim();
  const message = msgInput.value.trim();
  const status = statusInput ? statusInput.value : 'hadir';
  if (!name || !message) return;

  const badgeLabel = status === 'hadir' ? 'Hadir' : (status === 'ragu' ? 'Masih Ragu' : 'Tidak Hadir');
  const badgeStyle = status === 'hadir'
    ? 'bg-[#5E1217]/10 border border-[#5E1217]/25 text-[#520E13]'
    : 'bg-[#B68440]/15 border border-[#B68440]/40 text-[#6E4033]';

  const card = document.createElement('div');
  card.className = 'p-3.5 heritage-subcard text-left transition-all';
  card.innerHTML = `
    <div class="flex items-center justify-between gap-2 mb-1.5">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-gradient-to-b from-[#5E1217] to-[#3B070A] border border-[#E8C995]/75 text-[#FAF0E4] flex items-center justify-center text-xs font-serif font-bold shadow-xs">
          ${name.charAt(0).toUpperCase()}
        </div>
        <div>
          <h4 class="text-xs font-bold text-[#481E1B]">${name}</h4>
          <span class="text-[10px] text-[#6E4033]">Baru saja</span>
        </div>
      </div>
      <span class="text-[9.5px] px-2.5 py-0.5 rounded-full ${badgeStyle} font-semibold">
        ${badgeLabel}
      </span>
    </div>
    <p class="text-xs text-[#5A342B] leading-relaxed mb-2">${message}</p>
    <div class="flex items-center justify-end">
      <button onclick="toggleLike(this)" class="inline-flex items-center gap-1 text-xs text-[#5E1217] hover:scale-110 transition cursor-pointer">
        <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"/></svg>
        <span class="text-[10px] font-bold">1</span>
      </button>
    </div>
  `;

  container.prepend(card);
  nameInput.value = '';
  msgInput.value = '';
  updateCharCount();
  alert('Terima kasih atas ucapan dan doa restunya!');
}

function toggleLike(btn) {
  const countSpan = btn.querySelector('span');
  let count = parseInt(countSpan.textContent, 10) || 0;
  if (btn.dataset.liked === 'true') {
    count--;
    btn.dataset.liked = 'false';
  } else {
    count++;
    btn.dataset.liked = 'true';
  }
  countSpan.textContent = count;
}

// 6. Gallery Lightbox
function openLightbox(src, caption) {
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  const modal = document.getElementById('lightboxModal');
  if (img) img.src = src;
  if (cap) cap.textContent = caption;
  if (modal) modal.classList.remove('hidden');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.add('hidden');
}


// ==============================================================
// 7. SMOOTH SCROLL REVEAL & ENTRANCE ANIMATION SYSTEM (STABLE & FLAP-FREE)
// ==============================================================
let scrollObserver = null;

function initScrollReveal() {
  // Observe animated elements across subsequent sections (preserve #home hero cover framing)
  const selector = 'section:not(#home) .reveal, section:not(#home) .reveal-fade, section:not(#home) .reveal-scale, section:not(#home) .reveal-left, section:not(#home) .reveal-right, section:not(#home) .reveal-botanical, section:not(#home).reveal';

  const revealElements = document.querySelectorAll(selector);
  
  if ('IntersectionObserver' in window) {
    if (scrollObserver) {
      scrollObserver.disconnect();
    }
    
    scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        } else {
          // Two-way scroll animation: remove is-revealed when scrolled past
          // so it smoothly resets and re-animates every time you return to that section!
          // Protect #home elements so hero framing bouquets remain visible
          if (!entry.target.closest('#home')) {
            entry.target.classList.remove('is-revealed');
          }
        }
      });
    }, {
      threshold: 0.02,
      rootMargin: '20px 0px 20px 0px'
    });

    revealElements.forEach(el => scrollObserver.observe(el));

    // Guarantee footer section elements reveal when reaching near bottom
    window.addEventListener('scroll', () => {
      if ((window.innerHeight + window.scrollY) >= (document.documentElement.scrollHeight - 250)) {
        const footerElements = document.querySelectorAll('#terimakasih .reveal, #terimakasih .reveal-botanical, #terimakasih .reveal-fade, #terimakasih .reveal-scale');
        footerElements.forEach(el => el.classList.add('is-revealed'));
      }
    }, { passive: true });
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }
}

// Trigger smooth, slow blooming entrance on Hero (#home) as Gate book flips open
// Trigger smooth, slow blooming entrance on Hero (#home) as Gate book flips open
function triggerHeroReveal() {
  const homeElements = document.querySelectorAll(
    '#home .hero-anim, #home .reveal, #home .reveal-fade, #home .reveal-scale, #home .reveal-botanical'
  );
  
  // Staggered luxury blooming reveal right as the 3D doors part
  homeElements.forEach(el => {
    el.classList.add('is-revealed');
  });
}

window.onload = function () {
  initCountdown();
  initGate();
  const gateCover = document.getElementById('gateCover');
  if (!gateCover || gateCover.style.display === 'none' || gateCover.classList.contains('hidden')) {
    initScrollReveal();
  }
  initAudio();
};