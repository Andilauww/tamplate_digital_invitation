/**
 * UNDANGAN 11 — BARALEK GADANG ADAT MINANGKABAU
 * Interactive Controller:
 * - Tirai Pembuka Pelaminan Minang & Guest Name Parser (?to= / ?tamu=)
 * - Musik Latar Talempong/Gamelan + YouTube Audio Ducking
 * - Ambient Bungo Sarunai Emas & Kilau Benang Makau Particles
 * - Two-Way Scroll Reveal (Exact undangan_1 Animation System)
 * - Hitung Mundur Baralek Gadang
 * - Native <dialog closedby="any"> Lightbox + Coordinate Fallback
 * - Tando Kasiah Gift Tabs + Salin Rekening/Alamat Toast
 * - Buku Tamu & Doa Restu Sanak Saudara (localStorage)
 */

(function () {
  "use strict";

  const STORAGE_KEY = "undangan11_adat_minang_rsvp_v1";

  const DEFAULT_WISHES = [
    {
      name: "Uda Rahmat & Uni Dewi (Bukittinggi)",
      presence: "Hadir",
      message:
        "Barakallahu lakuma wa baraka 'alaikuma wa jama'a bainakuma fii khair. Selamat menempuh hidup baru Habib & Adiba, semoga menjadi keluarga sakinah, mawaddah, warahmah.",
      time: "Baru saja",
    },
    {
      name: "Keluarga Besar Dt. Rajo Penghulu",
      presence: "Hadir",
      message:
        "Selamat melangsungkan Baralek Gadang untuk anak kemenakan kami Habib & Adiba. Semoga rukun damai sampai anak cucu.",
      time: "18 menit lalu",
    },
    {
      name: "Rani Puspita (Padang)",
      presence: "Tidak Hadir",
      message:
        "Mohon maaf belum dapat hadir langsung ke Bukittinggi, doa terbaik kami iringkan untuk kebahagiaan Marapulai & Anak Daro.",
      time: "1 jam lalu",
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    initGuestName();
    initMinangParticles();
    initGateAndAudio();
    initCountdown();
    initDockNavigation();
    initScrollReveal();
    initGalleryLightbox();
    initGiftTabsAndCopy();
    initRsvpGuestbook();
  });

  /* ========================================================================
     1. NAMA TAMU DARI PARAMETER URL (?to= / ?tamu= / ?guest=)
     ======================================================================== */
  function initGuestName() {
    const guestEl = document.getElementById("guest-name");
    const rsvpNameInput = document.getElementById("rsvp-name");
    if (!guestEl) return;

    const params = new URLSearchParams(window.location.search);
    const rawName =
      params.get("to") || params.get("tamu") || params.get("guest") || "";
    const cleaned = rawName.replace(/[+_]/g, " ").trim();

    if (cleaned) {
      guestEl.textContent = cleaned;
      if (rsvpNameInput && !rsvpNameInput.value) {
        rsvpNameInput.value = cleaned;
      }
    }
  }

  /* ========================================================================
     2. PARTIKEL BUNGO SARUNAI EMAS & KILAU BENANG MAKAU
     ======================================================================== */
  function initMinangParticles() {
    const container = document.getElementById("minang-particles");
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fragment = document.createDocumentFragment();

    // 12 Kelopak Bungo Sarunai Emas
    for (let i = 0; i < 12; i++) {
      const petal = document.createElement("span");
      petal.className = "sarunai-drop";
      petal.style.left = `${(i * 8.3 + Math.random() * 5).toFixed(1)}%`;
      petal.style.setProperty("--size", `${10 + (i % 4) * 3}px`);
      petal.style.setProperty("--dur", `${11 + (i % 5) * 2.2}s`);
      petal.style.setProperty("--delay", `${(i * 0.9).toFixed(1)}s`);
      petal.style.setProperty(
        "--sway",
        `${(i % 2 === 0 ? 1 : -1) * (26 + (i % 3) * 14)}px`
      );
      fragment.appendChild(petal);
    }

    // 10 Kilau Benang Makau
    for (let j = 0; j < 10; j++) {
      const mote = document.createElement("span");
      mote.className = "makau-mote";
      mote.style.left = `${(j * 9.8 + 4).toFixed(1)}%`;
      mote.style.setProperty("--size", `${4 + (j % 3) * 2}px`);
      mote.style.setProperty("--dur", `${8.5 + (j % 4) * 1.8}s`);
      mote.style.setProperty("--delay", `${(j * 0.75).toFixed(1)}s`);
      mote.style.setProperty(
        "--sway",
        `${(j % 2 === 0 ? -1 : 1) * (18 + (j % 3) * 10)}px`
      );
      fragment.appendChild(mote);
    }

    container.appendChild(fragment);
  }

  /* ========================================================================
     3. TIRAI PEMBUKA PELAMINAN & MUSIK LATAR
     ======================================================================== */
  function initGateAndAudio() {
    const gate = document.getElementById("gate-cover");
    const openBtn = document.getElementById("btn-open-gate");
    const audio = document.getElementById("bg-audio");
    const musicBtn = document.getElementById("btn-music");
    const musicIcon = document.getElementById("music-icon");
    const START_SEC = 15;
    const TARGET_VOL = 0.8;

    let musicAllowed = false;
    let resumeAfterHide = false;
    let resumeAfterVideo = false;
    let fadeTimer = 0;

    function setMusicUI(playing) {
      if (!musicBtn || !musicIcon) return;
      musicBtn.classList.toggle("is-playing", playing);
      musicIcon.className = playing ? "fas fa-compact-disc" : "fas fa-volume-mute";
      musicBtn.setAttribute(
        "aria-label",
        playing ? "Hentikan Musik Latar" : "Putar Musik Latar"
      );
    }

    function fadeVolume(to, ms, done) {
      if (!audio) return;
      clearInterval(fadeTimer);
      const from = audio.volume;
      const steps = 14;
      let i = 0;
      fadeTimer = window.setInterval(() => {
        i++;
        audio.volume = Math.max(0, Math.min(1, from + ((to - from) * i) / steps));
        if (i >= steps) {
          clearInterval(fadeTimer);
          if (done) done();
        }
      }, Math.max(16, Math.floor(ms / steps)));
    }

    function playMusic() {
      if (!audio || !musicAllowed) return;
      try {
        if (audio.currentTime < START_SEC) audio.currentTime = START_SEC;
      } catch (_) {}
      audio.volume = 0;
      const p = audio.play();
      if (p && typeof p.then === "function") {
        p.then(() => {
          setMusicUI(true);
          fadeVolume(TARGET_VOL, 600);
        }).catch(() => {
          setMusicUI(false);
        });
      }
    }

    function pauseMusic() {
      if (!audio) return;
      setMusicUI(false);
      fadeVolume(0, 420, () => audio.pause());
    }

    if (audio) {
      audio.addEventListener("ended", () => {
        audio.currentTime = START_SEC;
        playMusic();
      });
    }

    if (openBtn && gate) {
      openBtn.addEventListener("click", () => {
        musicAllowed = true;
        playMusic();
        document.body.classList.remove("is-locked");
        gate.classList.add("is-opened");
        triggerHeroReveal();
        window.setTimeout(() => {
          gate.classList.add("is-hidden");
        }, 1200);
      });
    }

    if (musicBtn) {
      musicBtn.addEventListener("click", () => {
        musicAllowed = true;
        if (!audio || audio.paused) {
          playMusic();
        } else {
          pauseMusic();
        }
      });
    }

    document.addEventListener("visibilitychange", () => {
      if (!audio) return;
      if (document.hidden) {
        resumeAfterHide = !audio.paused;
        if (resumeAfterHide) audio.pause();
      } else if (resumeAfterHide && musicAllowed) {
        resumeAfterHide = false;
        playMusic();
      }
    });

    window.addEventListener("message", (ev) => {
      if (!audio || !ev.data || typeof ev.data !== "string") return;
      try {
        const data = JSON.parse(ev.data);
        if (data.event === "onStateChange") {
          if (data.info === 1 && !audio.paused) {
            resumeAfterVideo = true;
            pauseMusic();
          } else if ((data.info === 0 || data.info === 2) && resumeAfterVideo) {
            resumeAfterVideo = false;
            playMusic();
          }
        }
      } catch (_) {}
    });
  }

  function triggerHeroReveal() {
    const heroEls = document.querySelectorAll(
      "#beranda .reveal, #beranda .reveal-fade, #beranda .reveal-scale, #beranda .reveal-left, #beranda .reveal-right"
    );
    heroEls.forEach((el) => {
      el.classList.remove("is-revealed", "is-visible");
      void el.offsetWidth;
      el.classList.add("is-revealed", "is-visible");
    });
  }

  /* ========================================================================
     4. HITUNG MUNDUR HARI BARALEK GADANG
     ======================================================================== */
  function initCountdown() {
    const ribbon = document.querySelector(".countdown-ribbon[data-target]");
    if (!ribbon) return;

    const targetAttr = ribbon.getAttribute("data-target");
    const targetTime = new Date(targetAttr).getTime();
    if (Number.isNaN(targetTime)) return;

    const elDays = document.getElementById("cd-days");
    const elHours = document.getElementById("cd-hours");
    const elMins = document.getElementById("cd-mins");
    const elSecs = document.getElementById("cd-secs");

    function pad(num) {
      return String(Math.max(0, num)).padStart(2, "0");
    }

    function tick() {
      const now = Date.now();
      const diff = Math.max(0, targetTime - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      if (elDays) elDays.textContent = pad(days);
      if (elHours) elHours.textContent = pad(hours);
      if (elMins) elMins.textContent = pad(mins);
      if (elSecs) elSecs.textContent = pad(secs);
    }

    tick();
    window.setInterval(tick, 1000);
  }

  /* ========================================================================
     5. FLOATING DOCK NAVIGATION & SCROLL SPY
     ======================================================================== */
  function initDockNavigation() {
    const links = Array.from(document.querySelectorAll(".floating-dock .dock-link"));
    if (!links.length) return;

    const sectionMap = links
      .map((link) => {
        const id = link.getAttribute("data-nav");
        const sec = id ? document.getElementById(id) : null;
        return sec ? { link, sec } : null;
      })
      .filter(Boolean);

    function setActiveLink(activeLink) {
      links.forEach((l) => l.classList.toggle("is-active", l === activeLink));
    }

    links.forEach((link) => {
      link.addEventListener("click", () => setActiveLink(link));
    });

    if ("IntersectionObserver" in window && sectionMap.length) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const found = sectionMap.find((item) => item.sec === entry.target);
              if (found) setActiveLink(found.link);
            }
          });
        },
        {
          rootMargin: "-35% 0px -45% 0px",
          threshold: 0.05,
        }
      );

      sectionMap.forEach((item) => spyObserver.observe(item.sec));
    }
  }

  /* ========================================================================
     6. TWO-WAY SCROLL REVEAL (EXACT UNDANGAN_1 OBSERVER SYSTEM)
     ======================================================================== */
  function initScrollReveal() {
    const selector =
      ".reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right";
    const items = document.querySelectorAll(selector);
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-revealed", "is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed", "is-visible");
          } else {
            entry.target.classList.remove("is-revealed", "is-visible");
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    items.forEach((el) => observer.observe(el));
  }

  /* ========================================================================
     7. NATIVE <dialog closedby="any"> LIGHTBOX (MODERN-WEB-GUIDANCE)
     ======================================================================== */
  function initGalleryLightbox() {
    const dialog = document.getElementById("lightbox-dialog");
    const imgEl = document.getElementById("lightbox-img");
    const counterEl = document.getElementById("lightbox-counter");
    const captionEl = document.getElementById("lightbox-caption");
    const btnClose = document.getElementById("lb-close");
    const btnPrev = document.getElementById("lb-prev");
    const btnNext = document.getElementById("lb-next");
    const tiles = Array.from(document.querySelectorAll(".mg-tile"));

    if (!dialog || !imgEl || !tiles.length) return;

    let currentIndex = 0;

    function showSlide(index) {
      currentIndex = (index + tiles.length) % tiles.length;
      const thumbImg = tiles[currentIndex].querySelector("img");
      if (!thumbImg) return;

      imgEl.src = thumbImg.getAttribute("src") || "";
      imgEl.alt = thumbImg.getAttribute("alt") || "Pratinjau Galeri";
      if (counterEl) {
        counterEl.textContent = `${currentIndex + 1} / ${tiles.length}`;
      }
      if (captionEl) {
        captionEl.textContent = thumbImg.getAttribute("alt") || "";
      }
    }

    function openLightbox(index) {
      showSlide(index);
      if (typeof dialog.showModal === "function") {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "");
      }
    }

    function closeLightbox() {
      if (typeof dialog.close === "function") {
        dialog.close();
      } else {
        dialog.removeAttribute("open");
      }
    }

    tiles.forEach((tile, idx) => {
      tile.addEventListener("click", () => openLightbox(idx));
    });

    if (btnClose) btnClose.addEventListener("click", closeLightbox);
    if (btnPrev) btnPrev.addEventListener("click", () => showSlide(currentIndex - 1));
    if (btnNext) btnNext.addEventListener("click", () => showSlide(currentIndex + 1));

    // Coordinate-click light-dismiss fallback for browsers without closedby="any"
    dialog.addEventListener("click", (e) => {
      const rect = dialog.getBoundingClientRect();
      const clickedOutside =
        e.clientY < rect.top ||
        e.clientY > rect.bottom ||
        e.clientX < rect.left ||
        e.clientX > rect.right;
      if (clickedOutside) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
      if (e.key === "ArrowRight") showSlide(currentIndex + 1);
    });
  }

  /* ========================================================================
     8. TANDO KASIH TABS & SALIN REKENING/ALAMAT + TOAST
     ======================================================================== */
  function initGiftTabsAndCopy() {
    const tabBtns = Array.from(document.querySelectorAll(".gift-tab-btn"));
    const panels = Array.from(document.querySelectorAll(".gift-panel"));

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        tabBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", active ? "true" : "false");
        });
        panels.forEach((panel) => {
          const match = panel.id === targetId;
          panel.classList.toggle("is-visible", match);
          if (match) {
            panel.removeAttribute("hidden");
          } else {
            panel.setAttribute("hidden", "");
          }
        });
      });
    });

    const copyBtns = document.querySelectorAll("[data-copy]");
    copyBtns.forEach((btn) => {
      btn.addEventListener("click", async () => {
        const text = btn.getAttribute("data-copy") || "";
        const toastMsg =
          btn.getAttribute("data-toast") || "Berhasil disalin ke papan klip";
        if (!text) return;

        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
          } else {
            fallbackCopyText(text);
          }
          showPortalToast(toastMsg);
        } catch (_) {
          fallbackCopyText(text);
          showPortalToast(toastMsg);
        }
      });
    });
  }

  function fallbackCopyText(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand("copy");
    } catch (_) {
      // Ignore
    }
    document.body.removeChild(ta);
  }

  let toastTimer = null;
  function showPortalToast(message) {
    const toast = document.getElementById("portal-toast");
    if (!toast) return;

    toast.textContent = message;
    toast.removeAttribute("hidden");

    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.setAttribute("hidden", "");
    }, 2800);
  }

  /* ========================================================================
     9. KONFIRMASI KEHADIRAN (RSVP) & BUKU TAMU DOA RESTU
     ======================================================================== */
  function initRsvpGuestbook() {
    const form = document.getElementById("rsvp-form");
    const feed = document.getElementById("wishes-feed");
    const countHadirEl = document.getElementById("count-hadir");
    const countAbsenEl = document.getElementById("count-absen");

    if (!form || !feed) return;

    function loadWishes() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [...DEFAULT_WISHES];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length ? parsed : [...DEFAULT_WISHES];
      } catch (_) {
        return [...DEFAULT_WISHES];
      }
    }

    function saveWishes(list) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (_) {
        // Ignore storage quota errors
      }
    }

    function renderWishes(list) {
      feed.innerHTML = "";
      let hadirCount = 0;
      let absenCount = 0;

      list.forEach((item) => {
        const isHadir = item.presence === "Hadir";
        if (isHadir) hadirCount++;
        else absenCount++;

        const card = document.createElement("article");
        card.className = "wish-card";

        const head = document.createElement("div");
        head.className = "wish-head";

        const nameEl = document.createElement("strong");
        nameEl.className = "wish-name";
        nameEl.textContent = item.name;

        const badge = document.createElement("span");
        badge.className = `wish-badge ${
          isHadir ? "wish-badge--hadir" : "wish-badge--absen"
        }`;
        badge.textContent = isHadir ? "Hadir" : "Berhalangan";

        head.appendChild(nameEl);
        head.appendChild(badge);

        const body = document.createElement("p");
        body.className = "wish-text";
        body.textContent = item.message;

        const time = document.createElement("span");
        time.className = "wish-time";
        time.textContent = item.time || "Baru saja";

        card.appendChild(head);
        card.appendChild(body);
        card.appendChild(time);
        feed.appendChild(card);
      });

      if (countHadirEl) countHadirEl.textContent = String(hadirCount);
      if (countAbsenEl) countAbsenEl.textContent = String(absenCount);
    }

    let wishes = loadWishes();
    renderWishes(wishes);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("rsvp-name");
      const presenceInput = document.getElementById("rsvp-presence");
      const msgInput = document.getElementById("rsvp-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const presence = presenceInput ? presenceInput.value : "Hadir";
      const message = msgInput ? msgInput.value.trim() : "";

      if (!name || !message) {
        showPortalToast("Mohon lengkapi nama dan doa restu Anda");
        return;
      }

      const newEntry = {
        name,
        presence,
        message,
        time: "Baru saja",
      };

      wishes = [newEntry, ...wishes];
      saveWishes(wishes);
      renderWishes(wishes);

      if (msgInput) msgInput.value = "";
      showPortalToast("Tarimo kasih! Doa restu Anda telah tercatat");
    });
  }
})();
