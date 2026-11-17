
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
      musicWrap.classList.remove('opacity-0');
      musicWrap.style.opacity = '1';
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
    musicWrap.classList.add('opacity-0');
    musicWrap.style.opacity = '0';
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
      musicWrap.classList.remove('opacity-0');
      musicWrap.style.opacity = '1';
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
    if (mutedIcon) {
      mutedIcon.classList.add('hidden');
      mutedIcon.classList.remove('flex');
    }
    if (playingIcon) {
      playingIcon.classList.remove('hidden');
      playingIcon.classList.add('flex', 'music-disc-spin');
    }
    if (toggleBtn) {
      toggleBtn.classList.remove('opacity-75');
      toggleBtn.setAttribute('title', 'Matikan Musik');
      toggleBtn.setAttribute('aria-label', 'Matikan Musik');
    }
  } else {
    if (mutedIcon) {
      mutedIcon.classList.remove('hidden');
      mutedIcon.classList.add('flex');
    }
    if (playingIcon) {
      playingIcon.classList.add('hidden');
      playingIcon.classList.remove('flex', 'music-disc-spin');
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

  const activeCls = 'px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 bg-[#564F35] text-[#F8EFE8] shadow-sm cursor-pointer';
  const inactiveCls = 'px-5 py-1.5 rounded-full text-xs font-bold tracking-wide transition-all duration-300 text-[#564F35]/80 hover:text-[#3A3523] bg-transparent cursor-pointer';

  if (tab === 'bank') {
    bankTab.className = activeCls;
    physicalTab.className = inactiveCls;
    bankContent.classList.remove('hidden');
    physicalContent.classList.add('hidden');
  } else {
    physicalTab.className = activeCls;
    bankTab.className = inactiveCls;
    physicalContent.classList.remove('hidden');
    bankContent.classList.add('hidden');
  }
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// 5. Buku Tamu (Ucapan & Doa) Character Counter & Live Submission
function updateCharCount() {
  const textarea = document.getElementById('wishMessage');
  const counter = document.getElementById('charCounter');
  if (textarea && counter) {
    counter.textContent = `${textarea.value.length} / 250`;
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

  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);
  const initial = escapeHtml(name.charAt(0).toUpperCase());

  const badgeLabel = status === 'hadir' ? 'Hadir' : (status === 'ragu' ? 'Masih Ragu' : 'Tidak Hadir');
  const badgeStyle = status === 'hadir'
    ? 'bg-[#564F35]/15 border border-[#564F35]/35 text-[#564F35]'
    : 'bg-[#C28E5C]/15 border border-[#C28E5C]/35 text-[#8A5E34]';

  const card = document.createElement('div');
  card.className = 'p-4 rounded-2xl bg-[#F8EFE8]/92 border border-[#C28E5C]/45 text-left transition-all shadow-[0_6px_18px_rgba(58,53,35,0.08)]';
  card.innerHTML = `
    <div class="flex items-center justify-between gap-2 mb-1.5">
      <div class="flex items-center gap-2.5">
        <div class="w-8 h-8 rounded-full bg-gradient-to-b from-[#564F35] to-[#3A3523] border border-[#C28E5C]/75 text-[#F8EFE8] flex items-center justify-center text-xs font-serif font-bold shadow-xs">
          ${initial}
        </div>
        <div>
          <h4 class="text-xs font-bold text-[#3A3523]">${safeName}</h4>
          <span class="text-[10px] text-[#8A5E34]">Baru saja</span>
        </div>
      </div>
      <span class="text-[9.5px] px-2.5 py-0.5 rounded-full ${badgeStyle} font-semibold">
        ${badgeLabel}
      </span>
    </div>
    <p class="text-xs text-[#3A3523]/90 leading-relaxed mb-2">${safeMessage}</p>
    <div class="flex items-center justify-end">
      <button onclick="toggleLike(this)" class="inline-flex items-center gap-1 text-xs text-[#C28E5C] hover:scale-110 transition cursor-pointer">
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
  if (cap) cap.textContent = caption || '';
  if (modal) {
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    requestAnimationFrame(() => {
      modal.classList.remove('opacity-0');
    });
  }
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) {
    modal.classList.add('opacity-0');
    setTimeout(() => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }, 250);
  }
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});


// ==============================================================
// 7. SMOOTH SCROLL REVEAL & ENTRANCE ANIMATION SYSTEM (STABLE & FLAP-FREE)
// ==============================================================
let scrollObserver = null;

function initScrollReveal() {
  // Observe animated elements across subsequent sections (preserve #home hero cover framing)
  const selector = '.mobile-app-container > .reveal, .mobile-app-container > .reveal-scale, .mobile-app-container :not(#home) .reveal, .mobile-app-container :not(#home) .reveal-fade, .mobile-app-container :not(#home) .reveal-scale, .mobile-app-container :not(#home) .reveal-left, .mobile-app-container :not(#home) .reveal-right, .mobile-app-container :not(#home) .reveal-botanical, section:not(#home) .reveal, section:not(#home) .reveal-fade, section:not(#home) .reveal-scale, section:not(#home) .reveal-left, section:not(#home) .reveal-right, section:not(#home) .reveal-botanical, section:not(#home).reveal';

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
        const footerElements = document.querySelectorAll('#terimakasih .reveal, #terimakasih .reveal-botanical, #terimakasih .reveal-fade, #terimakasih .reveal-scale, #terimakasih .reveal-left, #terimakasih .reveal-right');
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

// ==============================================================
// 8. MULTI-DEPTH RUSTIC VALLEY PARALLAX ENGINE (60FPS INERTIAL LERP)
// Drives layered mountain valleys & Mega Mendung mist smoothly on scroll
// ==============================================================
let parallaxInitialized = false;
function initRusticParallax() {
  if (parallaxInitialized) return;
  parallaxInitialized = true;

  const root = document.documentElement;
  let current = 0;
  let target = 0;
  let rafId = null;

  function computeTarget() {
    const doc = document.documentElement;
    const maxScroll = Math.max(1, (doc.scrollHeight || document.body.scrollHeight) - window.innerHeight);
    const y = window.scrollY || window.pageYOffset || 0;
    target = Math.max(0, Math.min(1, y / maxScroll));
  }

  function applyVars(p) {
    root.style.setProperty('--px-p', p.toFixed(4));
    root.style.setProperty('--px-sun-y', `${(-36 * p).toFixed(2)}px`);
    root.style.setProperty('--px-far-y', `${(-78 * p).toFixed(2)}px`);
    root.style.setProperty('--px-far-s', (1 + 0.045 * p).toFixed(4));
    root.style.setProperty('--px-mid-y', `${(-155 * p).toFixed(2)}px`);
    root.style.setProperty('--px-mid-s', (1 + 0.055 * p).toFixed(4));
    root.style.setProperty('--px-cloud-y', `${(-98 * p).toFixed(2)}px`);
    root.style.setProperty('--px-cloud-l', `${(-26 * p).toFixed(2)}px`);
    root.style.setProperty('--px-cloud-r', `${(26 * p).toFixed(2)}px`);
    root.style.setProperty('--px-near-y', `${(24 - 230 * p).toFixed(2)}px`);
  }

  function tick() {
    const diff = target - current;
    if (Math.abs(diff) < 0.0004) {
      current = target;
      applyVars(current);
      rafId = null;
      return;
    }
    current += diff * 0.14;
    applyVars(current);
    rafId = requestAnimationFrame(tick);
  }

  function onScroll() {
    computeTarget();
    if (!rafId) {
      rafId = requestAnimationFrame(tick);
    }
  }

  computeTarget();
  current = target;
  applyVars(current);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
}

function bootstrapInvitation() {
  initCountdown();
  initGate();
  initRusticParallax();
  const gateCover = document.getElementById('gateCover');
  if (!gateCover || gateCover.style.display === 'none' || gateCover.classList.contains('hidden')) {
    initScrollReveal();
  }
  initAudio();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapInvitation);
} else {
  bootstrapInvitation();
}