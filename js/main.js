/* ==========================================================================
   Pedro de Rossi — Portfólio: lógica e animações
   ========================================================================== */

const CONTACT_EMAIL = CONTACT.email;

const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
};

const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(pointer: fine)").matches;

let lang = storage.get("lang") || (navigator.language.startsWith("pt") ? "pt" : "en");
let activeFilter = "all";

const t = (key) => TRANSLATIONS[lang][key] ?? key;
const loc = (value) => (value && typeof value === "object" && !Array.isArray(value) ? value[lang] : value);

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Preloader -------------------------------------------------------------- */
(function preloader() {
  const el = document.getElementById("preloader");
  const log = document.getElementById("preloader-log");
  const steps = ["booting portfolio...", "loading modules...", "compiling ideas...", "ready ✓"];
  let i = 0;
  const timer = setInterval(() => { if (++i < steps.length) log.textContent = steps[i]; }, 260);
  const minTime = reducedMotion ? 0 : 1100;
  const start = performance.now();

  window.addEventListener("load", () => {
    setTimeout(() => {
      clearInterval(timer);
      log.textContent = steps[steps.length - 1];
      el.classList.add("done");
      document.body.classList.remove("is-loading");
      document.body.classList.add("loaded");
    }, Math.max(0, minTime - (performance.now() - start)));
  });
})();

/* Idioma ----------------------------------------------------------------- */
function applyTranslations() {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.title = t("meta.title");

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });

  document.getElementById("lang-toggle").textContent = lang === "pt" ? "EN" : "PT";

  renderStats();
  renderSkills();
  renderFilters();
  renderProjects();
  renderTimeline();
  startTyping();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  lang = lang === "pt" ? "en" : "pt";
  storage.set("lang", lang);
  applyTranslations();
});

/* Tema ------------------------------------------------------------------- */
document.getElementById("theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const next = root.dataset.theme === "light" ? "dark" : "light";
  root.dataset.theme = next;
  storage.set("theme", next);
});

/* Menu mobile ------------------------------------------------------------ */
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.getElementById("nav-menu");
navToggle.addEventListener("click", () => {
  const open = navMenu.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(open));
});
navMenu.addEventListener("click", (e) => {
  if (e.target.closest("a")) {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* Efeito de digitação no cargo ------------------------------------------- */
let typingTimer;
function startTyping() {
  clearTimeout(typingTimer);
  const el = document.getElementById("typed-role");
  const roles = t("hero.roles");
  if (reducedMotion) { el.textContent = roles[0]; return; }

  let r = 0, c = 0, deleting = false;
  const tick = () => {
    const word = roles[r];
    c += deleting ? -1 : 1;
    el.textContent = word.slice(0, c);
    let delay = deleting ? 35 : 70;
    if (!deleting && c === word.length) { deleting = true; delay = 1800; }
    else if (deleting && c === 0) { deleting = false; r = (r + 1) % roles.length; delay = 350; }
    typingTimer = setTimeout(tick, delay);
  };
  tick();
}

/* Revelação ao rolar ----------------------------------------------------- */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
const observeReveals = () =>
  document.querySelectorAll("[data-reveal]:not(.visible), .timeline-item:not(.visible)").forEach((el) => revealObserver.observe(el));

/* Números (contador) ----------------------------------------------------- */
function renderStats() {
  const list = document.getElementById("stats");
  list.innerHTML = STATS.map(
    (s, i) => `
      <li class="stat" data-reveal style="--d:${i + 1}">
        <span class="stat-value"><span class="count" data-target="${s.value}">${list.dataset.counted ? s.value : 0}</span><span class="suffix">${escapeHtml(s.suffix)}</span></span>
        <span class="stat-label">${escapeHtml(loc(s.label))}</span>
      </li>`
  ).join("");
  observeReveals();
}

new IntersectionObserver(
  (entries, obs) => {
    if (!entries[0].isIntersecting) return;
    obs.disconnect();
    const list = entries[0].target;
    list.dataset.counted = "1";
    list.querySelectorAll(".count").forEach((el) => {
      const target = Number(el.dataset.target);
      const duration = reducedMotion ? 0 : 1600;
      const start = performance.now();
      const step = (now) => {
        const p = duration ? Math.min(1, (now - start) / duration) : 1;
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  },
  { threshold: 0.4 }
).observe(document.getElementById("stats"));

/* Skills (faixa infinita) ------------------------------------------------ */
// A lista é duplicada para o loop do marquee ficar contínuo
function renderSkills() {
  document.getElementById("skills-track").innerHTML = [...SKILLS, ...SKILLS]
    .map((s, i) => `<li${i >= SKILLS.length ? ' aria-hidden="true"' : ""}>${escapeHtml(loc(s))}</li>`)
    .join("");
}

/* Projetos --------------------------------------------------------------- */
function renderFilters() {
  const categories = ["all", ...new Set(PROJECTS.map((p) => p.category))];
  document.getElementById("project-filters").innerHTML = categories
    .map((c) => {
      const label = c === "all" ? t("projects.all") : t(`projects.cat.${c}`);
      return `<button class="filter-btn" data-filter="${c}" aria-pressed="${c === activeFilter}">${escapeHtml(label)}</button>`;
    })
    .join("");
}

document.getElementById("project-filters").addEventListener("click", (e) => {
  const btn = e.target.closest("[data-filter]");
  if (!btn) return;
  activeFilter = btn.dataset.filter;
  renderFilters();
  renderProjects();
});

function renderProjects() {
  const list = PROJECTS.filter((p) => activeFilter === "all" || p.category === activeFilter);
  document.getElementById("projects-grid").innerHTML = list
    .map(
      (p, i) => `
      <article class="project-card" style="--i:${i}">
        <div class="project-thumb-wrap">
          <img class="project-thumb" src="${p.image}" alt="" loading="lazy" />
          <span class="project-index">0${i + 1}</span>
        </div>
        <div class="project-body">
          <h3>${escapeHtml(loc(p.title))}</h3>
          <p>${escapeHtml(loc(p.summary))}</p>
          <ul class="tags">${p.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
          <div class="project-links">
            <button type="button" data-open="${p.id}">${t("projects.details")} <span class="arrow">→</span></button>
            ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">${t("projects.code")} ↗</a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")} ↗</a>` : ""}
          </div>
        </div>
      </article>`
    )
    .join("");
}

/* Cards com inclinação 3D + brilho seguindo o mouse */
const grid = document.getElementById("projects-grid");
if (finePointer && !reducedMotion) {
  grid.addEventListener("pointermove", (e) => {
    const card = e.target.closest(".project-card");
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    card.style.setProperty("--mx", `${x * 100}%`);
    card.style.setProperty("--my", `${y * 100}%`);
    card.style.setProperty("--ry", `${(x - 0.5) * 10}deg`);
    card.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
  });
  grid.addEventListener("pointerout", (e) => {
    const card = e.target.closest(".project-card");
    if (card && !card.contains(e.relatedTarget)) {
      card.style.setProperty("--rx", "0deg");
      card.style.setProperty("--ry", "0deg");
    }
  });
}

/* Modal de detalhe */
const modal = document.getElementById("project-modal");
grid.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-open]");
  if (!btn) return;
  const p = PROJECTS.find((x) => x.id === btn.dataset.open);
  const highlights = loc(p.highlights) || [];
  document.getElementById("modal-content").innerHTML = `
    <img class="project-thumb" src="${p.image}" alt="" />
    <div class="modal-body">
      <h3>${escapeHtml(loc(p.title))}</h3>
      <ul class="tags">${p.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
      <p>${escapeHtml(loc(p.description))}</p>
      ${highlights.length ? `<h4>${t("projects.highlights")}</h4><ul class="highlights">${highlights.map((h) => `<li>${escapeHtml(h)}</li>`).join("")}</ul>` : ""}
      <div class="project-links">
        ${p.repo ? `<a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">${t("projects.code")} ↗</a>` : ""}
        ${p.demo ? `<a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")} ↗</a>` : ""}
      </div>
    </div>`;
  modal.showModal();
});
document.getElementById("modal-close").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => { if (e.target === modal) modal.close(); });

/* Experiência ------------------------------------------------------------ */
function renderTimeline() {
  document.getElementById("timeline").innerHTML = EXPERIENCE.map((item) => {
    const bullets = loc(item.bullets) || [];
    return `
      <li class="timeline-item">
        <div class="timeline-card" data-reveal>
          <span class="timeline-type">${item.type === "work" ? "💼" : "🎓"} ${t(`experience.type.${item.type}`)}</span>
          <span class="timeline-period">${escapeHtml(loc(item.period))}</span>
          <h3>${escapeHtml(loc(item.role))}</h3>
          <p class="timeline-company">${escapeHtml(item.company)}</p>
          ${bullets.length ? `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>` : ""}
        </div>
      </li>`;
  }).join("");
  observeReveals();
}

/* Contato ---------------------------------------------------------------- */
// Sem back-end: abre o cliente de e-mail do visitante. Para envio direto,
// troque por um serviço como Formspree (https://formspree.io).
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.currentTarget;
  const status = document.getElementById("form-status");
  let valid = true;

  ["name", "email", "message"].forEach((id) => {
    const field = form.elements[id];
    const ok = field.checkValidity() && field.value.trim() !== "";
    field.removeAttribute("aria-invalid");
    void field.offsetWidth; // reinicia a animação de "shake"
    if (!ok) { field.setAttribute("aria-invalid", "true"); valid = false; }
  });

  if (!valid) {
    status.textContent = t("contact.error");
    status.className = "form-status error";
    return;
  }

  const { name, email, message } = form.elements;
  const subject = encodeURIComponent(`Portfólio — ${name.value}`);
  const body = encodeURIComponent(`${message.value}\n\n— ${name.value} (${email.value})`);
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;

  status.textContent = t("contact.success");
  status.className = "form-status success";
  form.reset();
});

/* Rolagem: barra de progresso, header, linha do tempo -------------------- */
const header = document.getElementById("site-header");
const progressBar = document.getElementById("scroll-progress");
const timeline = document.getElementById("timeline");
let scrollTicking = false;

function onScroll() {
  const max = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
  header.classList.toggle("scrolled", scrollY > 20);

  const r = timeline.getBoundingClientRect();
  const p = (innerHeight * 0.75 - r.top) / r.height;
  timeline.style.setProperty("--progress", Math.min(1, Math.max(0, p)).toFixed(3));
  scrollTicking = false;
}
addEventListener("scroll", () => {
  if (!scrollTicking) { scrollTicking = true; requestAnimationFrame(onScroll); }
}, { passive: true });

/* Link ativo no menu */
const navLinks = [...document.querySelectorAll(".nav-menu a")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);
document.querySelectorAll("main section[id]").forEach((s) => sectionObserver.observe(s));

/* Brilho do cursor + botões magnéticos + parallax da foto ----------------- */
if (finePointer && !reducedMotion) {
  const glow = document.getElementById("cursor-glow");
  const avatar = document.getElementById("avatar");
  let mx = innerWidth / 2, my = innerHeight / 2, gx = mx, gy = my;

  addEventListener("pointermove", (e) => {
    mx = e.clientX; my = e.clientY;
    glow.classList.add("active");
  });
  document.addEventListener("pointerleave", () => glow.classList.remove("active"));

  (function follow() {
    gx += (mx - gx) * 0.12;
    gy += (my - gy) * 0.12;
    glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
    // a foto inclina levemente em direção ao mouse
    const dx = (mx / innerWidth - 0.5) * 2, dy = (my / innerHeight - 0.5) * 2;
    avatar.style.transform = `perspective(900px) rotateY(${dx * 8}deg) rotateX(${-dy * 8}deg)`;
    requestAnimationFrame(follow);
  })();

  document.addEventListener("pointermove", (e) => {
    const btn = e.target.closest(".magnetic");
    document.querySelectorAll(".magnetic.is-pulled").forEach((b) => {
      if (b !== btn) { b.style.transform = ""; b.classList.remove("is-pulled"); }
    });
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    btn.classList.add("is-pulled");
  });
}

/* Fundo: rede de partículas ---------------------------------------------- */
(function particles() {
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");
  const mouse = { x: -9999, y: -9999 };
  let w, h, dpr, points = [], color = "0, 217, 255", running = true;

  const readColor = () => {
    color = getComputedStyle(document.documentElement).getPropertyValue("--neon-rgb").trim() || color;
  };

  function resize() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr;
    h = canvas.height = innerHeight * dpr;
    const count = Math.min(90, Math.floor((innerWidth * innerHeight) / 16000));
    points = Array.from({ length: count }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.35 * dpr, vy: (Math.random() - 0.5) * 0.35 * dpr,
      r: (Math.random() * 1.4 + 0.6) * dpr,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);
    const linkDist = 130 * dpr, mouseDist = 180 * dpr;
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      if (!reducedMotion) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${color}, 0.7)`;
      ctx.fill();

      for (let j = i + 1; j < points.length; j++) {
        const q = points[j];
        const d = Math.hypot(p.x - q.x, p.y - q.y);
        if (d < linkDist) {
          ctx.strokeStyle = `rgba(${color}, ${0.18 * (1 - d / linkDist)})`;
          ctx.lineWidth = dpr;
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        }
      }
      const md = Math.hypot(p.x - mouse.x, p.y - mouse.y);
      if (md < mouseDist) {
        ctx.strokeStyle = `rgba(${color}, ${0.5 * (1 - md / mouseDist)})`;
        ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
      }
    }
    if (running && !reducedMotion) requestAnimationFrame(draw);
  }

  addEventListener("resize", () => { resize(); if (reducedMotion) draw(); });
  addEventListener("pointermove", (e) => { mouse.x = e.clientX * dpr; mouse.y = e.clientY * dpr; });
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running && !reducedMotion) requestAnimationFrame(draw);
  });
  new MutationObserver(readColor).observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  readColor();
  resize();
  draw();
})();

/* Init ------------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
applyTranslations();
observeReveals();
onScroll();
