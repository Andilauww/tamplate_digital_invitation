(() => {
  "use strict";

  const STORAGE_KEY = "undangan10_puri_bali_rsvp_v3";
  const DEFAULT_WISHES = [
    {
      name: "Ida Bagus Made & Keluarga",
      presence: "Hadir",
      message: "Om Swastyastu. Selamat atas Pawiwahan Ageng Habib & Adiba. Dumogi langgeng riwekasan, labda karya, tur shanti salawasna.",
      createdAt: Date.now() - 3600 * 1000 * 4,
    },
    {
      name: "Ni Wayan Putu Anggreni",
      presence: "Hadir",
      message: "Megah sekali suasana Puri Agung Balinya! Selamat menempuh Grhastha Asrama Habib dan Adiba, dumogi rahayu.",
      createdAt: Date.now() - 3600 * 1000 * 15,
    },
    {
      name: "Bapak I Gede Suardana",
      presence: "Tidak Hadir",
      message: "Mohon maaf belum dapat hadir langsung ke Denpasar, doa tulus kami senantiasa menyertai kebahagiaan kedua mempelai.",
      createdAt: Date.now() - 3600 * 1000 * 28,
    },
  ];

  // 1. Dynamic Guest Name (?to=... | ?guest=... | ?kepada=...)
  const params = new URLSearchParams(window.location.search);
  const rawGuest = (params.get("to") || params.get("guest") || params.get("kepada") || "").trim();
  const guestEl = document.getElementById("guest-name");
  const rsvpNameInput = document.getElementById("rsvp-name");
  if (rawGuest) {
    if (guestEl) guestEl.textContent = rawGuest;
    if (rsvpNameInput) rsvpNameInput.value = rawGuest;
  }

  // 2. Ambient Falling Bunga Jepun & Golden Prada Fireflies
  const particleStage = document.getElementById("bali-particles");
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (particleStage && !reduceMotion) {
    const isDesktop = window.innerWidth >= 1024;
    const petalCount = isDesktop ? 18 : 11;
    const moteCount = isDesktop ? 14 : 8;
    const frag = document.createDocumentFragment();

    for (let i = 0; i < petalCount; i++) {
      const p = document.createElement("span");
      p.className = "jepun-drop";
      const leftPct = 3 + (i / Math.max(1, petalCount - 1)) * 94 + (((i * 7) % 5) - 2);
      const size = 10 + ((i * 3) % 5) * 1.6;
      const dur = 11 + ((i * 5) % 6) * 1.8;
      const delay = -(((i * 3.3) + 1.7) % 15);
      const drift = (i % 2 === 0 ? 1 : -1) * (16 + ((i * 7) % 22));

      p.style.left = `${Math.min(98, Math.max(2, leftPct)).toFixed(1)}%`;
      p.style.setProperty("--sz", `${size.toFixed(1)}px`);
      p.style.setProperty("--dur", `${dur.toFixed(1)}s`);
      p.style.setProperty("--delay", `${delay.toFixed(1)}s`);
      p.style.setProperty("--drift", `${drift}px`);
      frag.appendChild(p);
    }

    for (let j = 0; j < moteCount; j++) {
      const m = document.createElement("span");
      m.className = "prada-mote";
      m.style.left = `${(6 + ((j * 19) % 88)).toFixed(1)}%`;
      m.style.top = `${(12 + ((j * 23) % 78)).toFixed(1)}%`;
      m.style.setProperty("--msz", `${3 + (j % 3) * 1.5}px`);
      m.style.setProperty("--mdur", `${5.5 + (j % 5) * 1.4}s`);
      m.style.setProperty("--mdelay", `-${(j * 1.3).toFixed(1)}s`);
      frag.appendChild(m);
    }

    particleStage.appendChild(frag);
  }

  // 3. Toast Helper
  const toastEl = document.getElementById("portal-toast");
  let toastTimer = 0;
  function showToast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.hidden = true;
    }, 2400);
  }

  // 4. Gamelan Audio Controller (Smooth Fade & YouTube Ducking)
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
    } catch {}
    audio.volume = 0;
    const p = audio.play();
    if (p && typeof p.then === "function") {
      p.then(() => {
        setMusicUI(true);
        fadeVolume(TARGET_VOL, 600);
      }).catch(() => setMusicUI(false));
    }
  }

  function pauseMusic() {
    if (!audio) return;
    setMusicUI(false);
    fadeVolume(0, 420, () => audio.pause());
  }

  audio?.addEventListener("ended", () => {
    audio.currentTime = START_SEC;
    playMusic();
  });

  musicBtn?.addEventListener("click", () => {
    musicAllowed = true;
    if (!audio || audio.paused) playMusic();
    else pauseMusic();
  });

  document.addEventListener("visibilitychange", () => {
    document.body.classList.toggle("is-page-hidden", document.hidden);
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
    if (!ev.data || typeof ev.data !== "string") return;
    try {
      const data = JSON.parse(ev.data);
      if (data.event === "onStateChange") {
        if (data.info === 1 && audio && !audio.paused) {
          resumeAfterVideo = true;
          pauseMusic();
        } else if ((data.info === 0 || data.info === 2) && resumeAfterVideo) {
          resumeAfterVideo = false;
          playMusic();
        }
      }
    } catch {}
  });

  // 5. Curtain-Lift Cover Unlock
  const gateCover = document.getElementById("gate-cover");
  const openBtn = document.getElementById("btn-open-gate");
  if (openBtn && gateCover) {
    openBtn.addEventListener("click", () => {
      musicAllowed = true;
      playMusic();
      document.body.classList.remove("is-locked");
      gateCover.classList.add("is-opening");
      if (particleStage) particleStage.style.zIndex = "80";
      window.setTimeout(() => {
        gateCover.classList.add("is-hidden");
      }, 1200);
    });
  }

  // 6. Scroll Reveal Observer
  const revealEls = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
  if ("IntersectionObserver" in window) {
    const revealObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObs.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => revealObs.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  // 7. Bottom Dock Scroll-Spy & Smooth Navigation
  const dockLinks = Array.from(document.querySelectorAll(".dock-link"));
  if ("IntersectionObserver" in window) {
    const spyObs = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            dockLinks.forEach((a) => a.classList.toggle("is-active", a.dataset.nav === id));
          }
        }
      },
      { rootMargin: "-38% 0px -50% 0px" }
    );
    ["beranda", "mempelai", "acara", "galeri", "ucapan"].forEach((id) => {
      const sec = document.getElementById(id);
      if (sec) spyObs.observe(sec);
    });
  }

  dockLinks.forEach((link) => {
    link.addEventListener("click", (evt) => {
      const targetHash = link.getAttribute("href");
      if (targetHash?.startsWith("#")) {
        const targetEl = document.getElementById(targetHash.slice(1));
        if (targetEl) {
          evt.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
          dockLinks.forEach((a) => a.classList.toggle("is-active", a === link));
        }
      }
    });
  });

  // 8. Live Countdown
  const cdWrap = document.querySelector(".countdown-ribbon");
  if (cdWrap) {
    const targetMs = Date.parse(cdWrap.getAttribute("data-target") || "2026-12-28T01:00:00Z");
    const els = ["cd-days", "cd-hours", "cd-mins", "cd-secs"].map((id) => document.getElementById(id));
    const pad = (n) => String(Math.max(0, n)).padStart(2, "0");

    const tick = () => {
      const diff = Math.max(0, targetMs - Date.now());
      const vals = [
        pad(Math.floor(diff / 86400000)),
        pad(Math.floor((diff % 86400000) / 3600000)),
        pad(Math.floor((diff % 3600000) / 60000)),
        pad(Math.floor((diff % 60000) / 1000)),
      ];
      els.forEach((el, idx) => {
        if (el) el.textContent = vals[idx];
      });
    };
    tick();
    window.setInterval(tick, 1000);
  }

  // 9. Gift Tabs & Clipboard Copy
  const giftTabs = Array.from(document.querySelectorAll(".gift-tab-btn"));
  giftTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      giftTabs.forEach((t) => {
        const active = t === tab;
        t.classList.toggle("is-active", active);
        t.setAttribute("aria-selected", String(active));
        const panel = document.getElementById(t.getAttribute("aria-controls") || "");
        if (panel) panel.hidden = !active;
      });
    });
  });

  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const text = btn.getAttribute("data-copy") || "";
      const msg = btn.getAttribute("data-toast") || "Berhasil disalin";
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      showToast(msg);
    });
  });

  // 10. Native <dialog closedby="any"> Lightbox + Safari Fallback
  const dialog = document.getElementById("lightbox-dialog");
  const lbImg = document.getElementById("lightbox-img");
  const lbCap = document.getElementById("lightbox-caption");
  const lbCount = document.getElementById("lightbox-counter");
  const tiles = Array.from(document.querySelectorAll(".mosaic-tile"));
  const galleryItems = tiles.map((btn) => {
    const img = btn.querySelector("img");
    return {
      src: img?.getAttribute("src") || "",
      alt: img?.getAttribute("alt") || "",
    };
  });
  let currentIdx = 0;

  function renderSlide(idx) {
    if (!galleryItems.length) return;
    currentIdx = (idx + galleryItems.length) % galleryItems.length;
    const item = galleryItems[currentIdx];
    if (lbImg) {
      lbImg.src = item.src;
      lbImg.alt = item.alt;
    }
    if (lbCap) lbCap.textContent = item.alt;
    if (lbCount) lbCount.textContent = `${currentIdx + 1} / ${galleryItems.length}`;
  }

  tiles.forEach((btn, i) => {
    btn.addEventListener("click", () => {
      renderSlide(i);
      if (dialog && typeof dialog.showModal === "function") dialog.showModal();
    });
  });

  document.getElementById("lb-prev")?.addEventListener("click", () => renderSlide(currentIdx - 1));
  document.getElementById("lb-next")?.addEventListener("click", () => renderSlide(currentIdx + 1));
  document.getElementById("lb-close")?.addEventListener("click", () => dialog?.close());

  if (dialog) {
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

    dialog.addEventListener("keydown", (ev) => {
      if (ev.key === "ArrowLeft") renderSlide(currentIdx - 1);
      if (ev.key === "ArrowRight") renderSlide(currentIdx + 1);
    });

    let touchX = 0;
    dialog.addEventListener("touchstart", (ev) => {
      touchX = ev.changedTouches[0].clientX;
    }, { passive: true });
    dialog.addEventListener("touchend", (ev) => {
      const dx = ev.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 42) renderSlide(dx < 0 ? currentIdx + 1 : currentIdx - 1);
    }, { passive: true });
  }

  // 11. RSVP & Guestbook Wall (localStorage)
  function loadWishes() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length) return parsed;
      }
    } catch {}
    return DEFAULT_WISHES.slice();
  }

  function saveWishes(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch {}
  }

  function relTime(ts) {
    const mins = Math.max(0, Math.floor((Date.now() - ts) / 60000));
    if (mins < 1) return "Baru saja";
    if (mins < 60) return `${mins} menit lalu`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs} jam lalu`;
    return `${Math.floor(hrs / 24)} hari lalu`;
  }

  const feedEl = document.getElementById("wishes-feed");
  const hadirEl = document.getElementById("count-hadir");
  const absenEl = document.getElementById("count-absen");
  let wishes = loadWishes();

  function renderWishes() {
    let hadir = 0;
    let absen = 0;
    if (feedEl) feedEl.innerHTML = "";

    wishes.forEach((w) => {
      const isHadir = w.presence === "Hadir";
      if (isHadir) hadir++;
      else absen++;

      if (!feedEl) return;
      const card = document.createElement("article");
      card.className = "wish-card";

      const ava = document.createElement("div");
      ava.className = "wish-avatar";
      ava.textContent = (w.name || "T").trim().charAt(0).toUpperCase();

      const body = document.createElement("div");
      const meta = document.createElement("div");
      meta.className = "wish-meta";

      const author = document.createElement("span");
      author.className = "wish-author";
      author.textContent = w.name;

      const badge = document.createElement("span");
      badge.className = "wish-badge" + (isHadir ? " wish-badge--hadir" : "");
      badge.textContent = w.presence;

      const text = document.createElement("p");
      text.className = "wish-text";
      text.textContent = w.message;

      const time = document.createElement("span");
      time.className = "wish-time";
      time.textContent = relTime(w.createdAt || Date.now());

      meta.append(author, badge);
      body.append(meta, text, time);
      card.append(ava, body);
      feedEl.appendChild(card);
    });

    if (hadirEl) hadirEl.textContent = String(hadir);
    if (absenEl) absenEl.textContent = String(absen);
  }

  renderWishes();

  const rsvpForm = document.getElementById("rsvp-form");
  const msgInput = document.getElementById("rsvp-message");
  rsvpForm?.addEventListener("submit", (ev) => {
    ev.preventDefault();
    const fd = new FormData(rsvpForm);
    const name = String(fd.get("name") || "").trim();
    const presence = String(fd.get("presence") || "Hadir");
    const message = String(fd.get("message") || "").trim();

    if (!name || !message) {
      showToast("Mohon lengkapi nama dan doa restu Anda");
      return;
    }

    wishes.unshift({ name, presence, message, createdAt: Date.now() });
    saveWishes(wishes);
    renderWishes();
    if (msgInput) msgInput.value = "";
    showToast("Matur suksma! Doa restu Anda telah tersimpan");
  });
})();
