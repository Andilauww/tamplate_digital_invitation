/**
 * ============================================================================
 * UNDANGAN_21 — PERKAWINAN ADAT AMBON / MALUKU
 * Interactive Controller (Ref: Undangan 14):
 * 1. Guest Name Parser (?to= / ?u= / ?tamu= / ?guest=)
 * 2. Maluku Gold Sparkle Ambient Particles
 * 3. Gate Cover & Background Audio Controller
 * 4. Countdown Timer (Target: 28 Desember 2026)
 * 5. Floating Bottom Dock Navigation & Scroll-Spy
 * 6. Two-Way Scroll Reveal
 * 7. Native <dialog closedby="any"> Gallery Lightbox + Prev/Next/Counter
 * 8. Gift Tabs & Clipboard Copy Toast
 * 9. RSVP & Wishes (localStorage)
 * ============================================================================
 */

(function () {
  "use strict";

  const STORAGE_KEY = "undangan21_adat_ambon_rsvp_v1";

  const DEFAULT_WISHES = [
    {
      name: "Bapak Dominggus Pattinama & Keluarga",
      presence: "Hadir",
      message:
        "Selamat menempuh hidup baru untuk Habib & Adiba. Semoga berkat Tuhan selalu menyertai rumah tangga kalian di Bumi Raja-Raja.",
      time: "Baru saja",
    },
    {
      name: "Ibu Martha Latuconsina (Ambon)",
      presence: "Hadir",
      message:
        "Ale rasa beta rasa, katong samua basudara ikut berbahagia. InsyaAllah kami hadir di Gedung Ashari Al-Fatah.",
      time: "15 menit lalu",
    },
    {
      name: "Rizky Pratama & Istri (Jakarta)",
      presence: "Tidak Hadir",
      message:
        "Mohon maaf belum bisa terbang langsung ke Ambon karena jadwal tugas. Doa terbaik dan tanda kasih tulus menyertai Habib & Adiba.",
      time: "1 jam lalu",
    },
  ];

  document.addEventListener("DOMContentLoaded", () => {
    initGuestName();
    initMalukuParticles();
    initGateAndAudio();
    initCountdown();
    initDockNavigation();
    initScrollReveal();
    initGiftTabsAndCopy();
    initRsvpGuestbook();
  });

  function initGuestName() {
    const guestEl = document.getElementById("guest-name");
    const rsvpInput = document.getElementById("rsvp-name");
    if (!guestEl) return;

    const params = new URLSearchParams(window.location.search);
    const raw = params.get("to") || params.get("u") || params.get("tamu") || params.get("guest") || "";
    const cleaned = raw.replace(/[+_]/g, " ").trim();

    if (cleaned) {
      guestEl.textContent = cleaned;
      if (rsvpInput && !rsvpInput.value) {
        rsvpInput.value = cleaned;
      }
    }
  }

  function initMalukuParticles() {
    const container = document.getElementById("maluku-particles");
    if (!container) return;

    const count = 16;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("span");
      dot.className = "maluku-particle";
      const size = 4 + Math.random() * 5;
      dot.style.width = `${size}px`;
      dot.style.height = `${size}px`;
      dot.style.left = `${Math.random() * 100}%`;
      dot.style.animationDuration = `${10 + Math.random() * 9}s`;
      dot.style.animationDelay = `${Math.random() * 8}s`;
      container.appendChild(dot);
    }
  }

  function initGateAndAudio() {
    const gate = document.getElementById("gate-cover");
    const openBtn = document.getElementById("btn-open-gate");
    const audio = document.getElementById("bg-audio");
    const musicBtn = document.getElementById("btn-music");

    let isPlaying = false;

    function updateMusicUI(playing) {
      isPlaying = playing;
      if (!musicBtn) return;
      musicBtn.classList.toggle("is-playing", playing);
      musicBtn.setAttribute("aria-pressed", String(playing));
    }

    function playAudio() {
      if (!audio) return;
      const playPromise = audio.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise.then(() => updateMusicUI(true)).catch(() => updateMusicUI(false));
      } else {
        updateMusicUI(true);
      }
    }

    if (openBtn && gate) {
      openBtn.addEventListener("click", () => {
        gate.classList.add("is-open");
        document.body.classList.remove("is-locked");
        playAudio();
      });
    }

    if (musicBtn && audio) {
      musicBtn.addEventListener("click", () => {
        if (isPlaying) {
          audio.pause();
          updateMusicUI(false);
        } else {
          playAudio();
        }
      });
    }
  }

  function initCountdown() {
    const ribbon = document.querySelector(".countdown-ribbon");
    const targetStr = ribbon?.getAttribute("data-target") || "2026-12-28T01:00:00Z";
    const targetDate = new Date(targetStr).getTime();

    const dEl = document.getElementById("cd-days");
    const hEl = document.getElementById("cd-hours");
    const mEl = document.getElementById("cd-mins");
    const sEl = document.getElementById("cd-secs");
    if (!dEl || !hEl || !mEl || !sEl) return;

    function pad(n) { return String(Math.max(0, n)).padStart(2, "0"); }

    function tick() {
      const diff = Math.max(0, targetDate - Date.now());
      dEl.textContent = pad(Math.floor(diff / (1000 * 60 * 60 * 24)));
      hEl.textContent = pad(Math.floor((diff / (1000 * 60 * 60)) % 24));
      mEl.textContent = pad(Math.floor((diff / (1000 * 60)) % 60));
      sEl.textContent = pad(Math.floor((diff / 1000) % 60));
    }

    tick();
    setInterval(tick, 1000);
  }

  function initDockNavigation() {
    const links = Array.from(document.querySelectorAll(".dock-link"));
    if (!links.length) return;

    const targets = links
      .map((link) => {
        const id = link.getAttribute("data-nav");
        return { link, el: id ? document.getElementById(id) : null };
      })
      .filter((item) => item.el);

    function setActive(activeLink) {
      links.forEach((l) => l.classList.toggle("is-active", l === activeLink));
    }

    links.forEach((link) => link.addEventListener("click", () => setActive(link)));

    window.addEventListener("scroll", () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.38;
      let current = targets[0];
      for (const item of targets) {
        if (item.el.offsetTop <= scrollPos) current = item;
      }
      if (current) setActive(current.link);
    }, { passive: true });
  }

  function initScrollReveal() {
    const items = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    if (!items.length || !("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.14 }
    );

    items.forEach((el) => observer.observe(el));
  }

  function initGalleryLightbox() {
    const dialog = document.getElementById("lightbox-dialog");
    const imgEl = document.getElementById("lightbox-img");
    const capEl = document.getElementById("lightbox-caption");
    const counterEl = document.getElementById("lightbox-counter");
    const closeBtn = document.getElementById("lb-close");
    const prevBtn = document.getElementById("lb-prev");
    const nextBtn = document.getElementById("lb-next");
    const tiles = Array.from(document.querySelectorAll(".mg-tile"));
    if (!dialog || !imgEl || !tiles.length) return;

    let currentIdx = 0;

    function showSlide(index) {
      currentIdx = (index + tiles.length) % tiles.length;
      const tileImg = tiles[currentIdx].querySelector("img");
      if (tileImg) {
        imgEl.src = tileImg.src;
        imgEl.alt = tileImg.alt || "";
        if (capEl) capEl.textContent = tileImg.alt || "";
      }
      if (counterEl) counterEl.textContent = `${currentIdx + 1} / ${tiles.length}`;
    }

    tiles.forEach((tile, idx) => {
      tile.addEventListener("click", () => {
        showSlide(idx);
        if (typeof dialog.showModal === "function") dialog.showModal();
        else dialog.setAttribute("open", "");
      });
    });

    if (prevBtn) prevBtn.addEventListener("click", () => showSlide(currentIdx - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => showSlide(currentIdx + 1));
    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        if (typeof dialog.close === "function") dialog.close();
        else dialog.removeAttribute("open");
      });
    }
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") showSlide(currentIdx - 1);
      if (e.key === "ArrowRight") showSlide(currentIdx + 1);
    });
  }

  function initGiftTabsAndCopy() {
    const tabBtns = document.querySelectorAll(".gift-tab-btn");
    const panels = document.querySelectorAll(".gift-panel");

    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("aria-controls");
        tabBtns.forEach((b) => {
          const active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-selected", String(active));
        });
        panels.forEach((panel) => {
          const match = panel.id === targetId;
          panel.classList.toggle("is-visible", match);
          panel.hidden = !match;
        });
      });
    });

    document.querySelectorAll("[data-copy]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const text = btn.getAttribute("data-copy") || "";
        const toastMsg = btn.getAttribute("data-toast") || "Berhasil disalin ke clipboard!";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(() => showToast(toastMsg));
        } else {
          showToast(toastMsg);
        }
      });
    });
  }

  function initRsvpGuestbook() {
    const form = document.getElementById("rsvp-form");
    const feed = document.getElementById("wishes-feed");
    const hadirEl = document.getElementById("count-hadir");
    const absenEl = document.getElementById("count-absen");
    if (!form || !feed) return;

    function loadWishes() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length) return parsed;
        }
      } catch (_) {}
      return DEFAULT_WISHES.slice();
    }

    function saveWishes(items) {
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch (_) {}
    }

    function renderWishes(items) {
      const hadirCount = items.filter((i) => i.presence === "Hadir").length;
      if (hadirEl) hadirEl.textContent = String(hadirCount);
      if (absenEl) absenEl.textContent = String(items.length - hadirCount);

      feed.innerHTML = "";
      items.forEach((item) => {
        const card = document.createElement("article");
        card.className = "wish-item";

        const head = document.createElement("div");
        head.className = "wish-head";

        const author = document.createElement("strong");
        author.className = "wish-author";
        author.textContent = item.name;

        const badge = document.createElement("span");
        badge.className = item.presence === "Hadir" ? "wish-badge" : "wish-badge wish-badge--absen";
        badge.textContent = item.presence;

        head.append(author, badge);

        const body = document.createElement("p");
        body.className = "wish-text";
        body.textContent = item.message;

        const time = document.createElement("span");
        time.className = "wish-time";
        time.textContent = item.time || "Baru saja";

        card.append(head, body, time);
        feed.appendChild(card);
      });
    }

    let wishes = loadWishes();
    renderWishes(wishes);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const nameInput = document.getElementById("rsvp-name");
      const presenceInput = document.getElementById("rsvp-presence");
      const msgInput = document.getElementById("rsvp-message");

      const name = (nameInput?.value || "").trim();
      const presence = presenceInput?.value || "Hadir";
      const message = (msgInput?.value || "").trim();

      if (!name || !message) {
        showToast("Mohon lengkapi nama dan ucapan Anda.");
        return;
      }

      wishes.unshift({ name, presence, message, time: "Baru saja" });
      saveWishes(wishes);
      renderWishes(wishes);
      if (msgInput) msgInput.value = "";
      showToast("Terima kasih atas ucapan & konfirmasinya!");
    });
  }

  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById("portal-toast");
    if (!toast) return;
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { toast.hidden = true; }, 2600);
  }
})();
