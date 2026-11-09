/**
 * ============================================================================
 * UNDANGAN_14 — MAJELIS RAJA SEHARI ADAT MELAYU
 * Interactive Controller:
 * 1. Guest Name Parser (?to= / ?tamu= / ?guest=)
 * 2. Bunga Rampai & Beras Kunyit Diraja Ambient Particles
 * 3. Tirai Pembuka Balairung Seri & Musik Latar (Start @ 15s + Fade-In)
 * 4. Hitung Mundur Hari Bahagia (Target: 28 Desember 2026)
 * 5. Floating Bottom Dock Navigation & Scroll-Spy
 * 6. Two-Way Scroll Reveal (Luxury Staggered Intersection Observer)
 * 7. Native <dialog closedby="any"> Gallery Lightbox + Coordinate Fallback
 * 8. Cenderamata & Tanda Kasih Gift Tabs + Clipboard Copy Toast
 * 9. Konfirmasi Kehadiran (RSVP) & Warkah Doa Restu (localStorage)
 * ============================================================================
 */

(function () {
  "use strict";

  const STORAGE_KEY = "undangan13_adat_melayu_rsvp_v1";

  const DEFAULT_WISHES = [
    {
      name: "Datuk Seri H. Tengku Syarifuddin & Keluarga",
      presence: "Hadir",
      message:
        "Tahniah dan selamat menempuh hidup baru untuk ananda Habib & Adiba. Semoga Allah SWT menghimpun keduanya dalam keberkahan, sakinah, mawaddah, warahmah hingga ke Jannah.",
      time: "Baru saja",
    },
    {
      name: "Encik Zulkifli & Puan Siti Aisyah (Pekanbaru)",
      presence: "Hadir",
      message:
        "Elok berlayar lancang kuning, singgah berlabuh di Tanjung Jati; Selamat bersanding Raja & Ratu Sehari, semoga berkekalan kasih sampai akhir nanti. InsyaAllah kami hadir.",
      time: "15 menit lalu",
    },
    {
      name: "dr. Wan Nurhaliza, Sp.PD (Batam)",
      presence: "Tidak Hadir",
      message:
        "Mohon maaf belum dapat hadir langsung ke Pekanbaru karena jadwal tugas di rumah sakit. Doa terbaik dan tanda kasih tulus kami iringkan untuk kebahagiaan Habib & Adiba.",
      time: "1 jam lalu",
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    initGuestName();
    initMelayuParticles();
    initGateAndAudio();
    initCountdown();
    initDockNavigation();
    initScrollReveal();
    // Galeri & Lightbox tidak digunakan pada edisi TF
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
     2. PARTIKEL BUNGA RAMPAI & BERAS KUNYIT DIRAJA
     ======================================================================== */
  function initMelayuParticles() {
    const container = document.getElementById("melayu-particles");
    if (!container) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < 12; i++) {
      const drop = document.createElement("span");
      drop.className = "rampai-drop";
      drop.style.left = `${(i * 8.3 + Math.random() * 5).toFixed(1)}%`;
      drop.style.setProperty("--size", `${9 + (i % 4) * 2.5}px`);
      drop.style.setProperty("--dur", `${12 + (i % 5) * 2.4}s`);
      drop.style.setProperty("--delay", `${(i * 0.85).toFixed(1)}s`);
      drop.style.setProperty(
        "--sway",
        `${(i % 2 === 0 ? 1 : -1) * (28 + (i % 3) * 12)}px`
      );
      fragment.appendChild(drop);
    }

    for (let j = 0; j < 10; j++) {
      const mote = document.createElement("span");
      mote.className = "kunyit-mote";
      mote.style.left = `${(j * 9.8 + 4).toFixed(1)}%`;
      mote.style.setProperty("--size", `${4 + (j % 3) * 2}px`);
      mote.style.setProperty("--dur", `${9 + (j % 4) * 2}s`);
      mote.style.setProperty("--delay", `${(j * 0.7).toFixed(1)}s`);
      mote.style.setProperty(
        "--sway",
        `${(j % 2 === 0 ? -1 : 1) * (18 + (j % 3) * 10)}px`
      );
      fragment.appendChild(mote);
    }

    container.appendChild(fragment);
  }

  /* ========================================================================
     3. TIRAI PEMBUKA BALAIRUNG SERI & MUSIK LATAR
     ======================================================================== */
  function initGateAndAudio() {
    const gate = document.getElementById("gate-cover");
    const openBtn =
      document.getElementById("btn-open-gate") ||
      document.getElementById("btn-open-invitation");
    const audio =
      document.getElementById("bg-audio") ||
      document.getElementById("bgm-audio");
    const musicBtn = document.getElementById("btn-music");
    const musicIcon = document.getElementById("music-icon");
    const floatingDock =
      document.getElementById("floating-dock") ||
      document.querySelector(".floating-dock");

    const START_SEC = 15;
    const TARGET_VOL = 0.8;

    let musicAllowed = false;
    let resumeAfterHide = false;
    let resumeAfterVideo = false;
    let fadeTimer = 0;

    function setMusicUI(playing) {
      if (!musicBtn || !musicIcon) return;
      musicBtn.classList.toggle("is-playing", playing);
      musicIcon.className = playing
        ? "fas fa-compact-disc"
        : "fas fa-volume-mute";
      musicBtn.setAttribute(
        "aria-label",
        playing ? "Hentikan Musik Latar" : "Putar Musik Latar"
      );
      musicBtn.setAttribute("aria-pressed", playing ? "true" : "false");
    }

    function fadeVolume(to, ms, done) {
      if (!audio) return;
      clearInterval(fadeTimer);
      const from = audio.volume;
      const steps = 14;
      let i = 0;
      fadeTimer = window.setInterval(() => {
        i++;
        audio.volume = Math.max(
          0,
          Math.min(1, from + ((to - from) * i) / steps)
        );
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

    function triggerHeroReveal() {
      const heroEls = document.querySelectorAll(
        "#beranda .reveal, #beranda .reveal-fade, #beranda .reveal-scale, #beranda .reveal-left, #beranda .reveal-right"
      );
      heroEls.forEach((el) => {
        el.classList.remove("is-revealed", "is-visible", "active");
        void el.offsetWidth;
        el.classList.add("is-revealed", "is-visible", "active");
      });
    }

    if (openBtn && gate) {
      openBtn.addEventListener("click", () => {
        musicAllowed = true;
        playMusic();
        document.body.classList.remove("is-locked");
        gate.classList.add("is-opened");
        triggerHeroReveal();

        if (musicBtn) musicBtn.classList.add("is-visible");
        if (floatingDock) floatingDock.classList.add("is-visible");

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
          } else if (
            (data.info === 0 || data.info === 2) &&
            resumeAfterVideo
          ) {
            resumeAfterVideo = false;
            playMusic();
          }
        }
      } catch (_) {}
    });
  }

  /* ========================================================================
     4. HITUNG MUNDUR HARI BAHAGIA (COUNTDOWN TIMER)
     ======================================================================== */
  function initCountdown() {
    const ribbon = document.querySelector(".countdown-ribbon[data-target]");
    if (!ribbon) return;

    const targetAttr = ribbon.getAttribute("data-target");
    const targetTime = new Date(targetAttr).getTime();
    if (Number.isNaN(targetTime)) return;

    const elDays = document.getElementById("cd-days");
    const elHours = document.getElementById("cd-hours");
    const elMins =
      document.getElementById("cd-mins") ||
      document.getElementById("cd-minutes");
    const elSecs =
      document.getElementById("cd-secs") ||
      document.getElementById("cd-seconds");

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
     5. FLOATING DOCK NAVIGATION & SCROLL-SPY
     ======================================================================== */
  function initDockNavigation() {
    const links = Array.from(
      document.querySelectorAll(".floating-dock .dock-link")
    );
    if (!links.length) return;

    const sectionMap = links
      .map((link) => {
        const id =
          link.getAttribute("data-nav") || link.getAttribute("data-section");
        const sec = id ? document.getElementById(id) : null;
        return sec ? { link, sec } : null;
      })
      .filter(Boolean);

    function setActiveLink(activeLink) {
      links.forEach((l) =>
        l.classList.toggle("is-active", l === activeLink)
      );
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
     6. TWO-WAY SCROLL REVEAL (INTERSECTION OBSERVER SYSTEM)
     ======================================================================== */
  function initScrollReveal() {
    const selector =
      ".reveal, .reveal-fade, .reveal-scale, .reveal-left, .reveal-right";
    const items = document.querySelectorAll(selector);
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach((el) =>
        el.classList.add("is-revealed", "is-visible", "active")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed", "is-visible", "active");
          } else {
            entry.target.classList.remove(
              "is-revealed",
              "is-visible",
              "active"
            );
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
    const btnClose =
      document.getElementById("lb-close") ||
      document.getElementById("lightbox-close");
    const btnPrev =
      document.getElementById("lb-prev") ||
      document.getElementById("lightbox-prev");
    const btnNext =
      document.getElementById("lb-next") ||
      document.getElementById("lightbox-next");
    const tiles = Array.from(document.querySelectorAll(".mg-tile"));

    if (!dialog || !imgEl || !tiles.length) return;

    let currentIndex = 0;

    function showSlide(index) {
      currentIndex = (index + tiles.length) % tiles.length;
      const thumbImg = tiles[currentIndex].querySelector("img");
      if (!thumbImg) return;

      const src =
        tiles[currentIndex].getAttribute("data-full") ||
        thumbImg.getAttribute("src") ||
        "";
      const alt =
        tiles[currentIndex].getAttribute("data-caption") ||
        thumbImg.getAttribute("alt") ||
        "Pratinjau Galeri";

      imgEl.src = src;
      imgEl.alt = alt;
      if (counterEl) {
        counterEl.textContent = `${currentIndex + 1} / ${tiles.length}`;
      }
      if (captionEl) {
        captionEl.textContent = alt;
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
    if (btnPrev) {
      btnPrev.addEventListener("click", (e) => {
        e.stopPropagation();
        showSlide(currentIndex - 1);
      });
    }
    if (btnNext) {
      btnNext.addEventListener("click", (e) => {
        e.stopPropagation();
        showSlide(currentIndex + 1);
      });
    }

    // Fallback for browsers without closedby support (e.g., Safari)
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      dialog.addEventListener("click", (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      });
    }

    document.addEventListener("keydown", (e) => {
      if (!dialog.open) return;
      if (e.key === "ArrowLeft") showSlide(currentIndex - 1);
      if (e.key === "ArrowRight") showSlide(currentIndex + 1);
    });
  }

  /* ========================================================================
     8. CENDERAMATA TABS & SALIN REKENING/ALAMAT + TOAST
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
    } catch (_) {}
    document.body.removeChild(ta);
  }

  let toastTimer = null;
  function showPortalToast(message) {
    const toast =
      document.getElementById("portal-toast") ||
      document.getElementById("copy-toast");
    if (!toast) return;

    toast.textContent = message;
    toast.removeAttribute("hidden");
    toast.classList.add("is-visible");

    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toast.setAttribute("hidden", "");
      toast.classList.remove("is-visible");
    }, 2800);
  }

  /* ========================================================================
     9. KONFIRMASI KEHADIRAN (RSVP) & BUKU TAMU DOA RESTU
     ======================================================================== */
  function initRsvpGuestbook() {
    const form = document.getElementById("rsvp-form");
    const feed =
      document.getElementById("wishes-feed") ||
      document.getElementById("wishes-list");
    const countHadirEl =
      document.getElementById("count-hadir") ||
      document.getElementById("stat-hadir");
    const countAbsenEl =
      document.getElementById("count-absen") ||
      document.getElementById("stat-tidak");

    if (!form || !feed) return;

    function loadWishes() {
      try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) return [...DEFAULT_WISHES];
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) && parsed.length
          ? parsed
          : [...DEFAULT_WISHES];
      } catch (_) {
        return [...DEFAULT_WISHES];
      }
    }

    function saveWishes(list) {
      try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
      } catch (_) {}
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

    const currentWishes = loadWishes();
    renderWishes(currentWishes);

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const nameInput = document.getElementById("rsvp-name");
      const presenceSelect = document.getElementById("rsvp-presence");
      const messageInput = document.getElementById("rsvp-message");

      const name = nameInput ? nameInput.value.trim() : "";
      const presence = presenceSelect ? presenceSelect.value : "Hadir";
      const message = messageInput ? messageInput.value.trim() : "";

      if (!name || !message) {
        showPortalToast("Mohon lengkapi nama dan untaian doa Anda.");
        return;
      }

      const newEntry = {
        name,
        presence,
        message,
        time: "Baru saja",
      };

      currentWishes.unshift(newEntry);
      saveWishes(currentWishes);
      renderWishes(currentWishes);

      if (messageInput) messageInput.value = "";
      showPortalToast(
        "Terima kasih setulus hati! Doa restu Anda telah tersimpan."
      );
    });
  }
})();
