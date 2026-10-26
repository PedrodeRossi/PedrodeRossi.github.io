/* ==========================================================================
   Pedro de Rossi — Portfólio: lógica da página
   ========================================================================== */

const CONTACT_EMAIL = "contato@pedroderossi.dev"; // TODO: trocar pelo e-mail real

const storage = {
  get(key) { try { return localStorage.getItem(key); } catch { return null; } },
  set(key, value) { try { localStorage.setItem(key, value); } catch { /* ignore */ } },
};

let lang = storage.get("lang") || (navigator.language.startsWith("pt") ? "pt" : "en");
let activeFilter = "all";

const t = (key) => TRANSLATIONS[lang][key] ?? key;
const loc = (value) => (value && typeof value === "object" && !Array.isArray(value) ? value[lang] : value);

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

/* Idioma ----------------------------------------------------------------- */
function applyTranslations() {
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
  document.title = t("meta.title");

  document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
  document.querySelectorAll("[data-i18n-aria]").forEach((el) => { el.setAttribute("aria-label", t(el.dataset.i18nAria)); });
  document.querySelectorAll("[data-i18n-alt]").forEach((el) => { el.alt = t(el.dataset.i18nAlt); });

  document.getElementById("lang-toggle").textContent = lang === "pt" ? "EN" : "PT";

  renderFilters();
  renderProjects();
  renderTimeline();
}

document.getElementById("lang-toggle").addEventListener("click", () => {
  lang = lang === "pt" ? "en" : "pt";
  storage.set("lang", lang);
  applyTranslations();
});

/* Tema ------------------------------------------------------------------- */
document.getElementById("theme-toggle").addEventListener("click", () => {
  const root = document.documentElement;
  const current = root.dataset.theme || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
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
  if (e.target.tagName === "A") {
    navMenu.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  }
});

/* Skills ----------------------------------------------------------------- */
document.getElementById("skills-list").innerHTML = SKILLS.map((s) => `<li>${escapeHtml(s)}</li>`).join("");

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
      (p) => `
      <article class="project-card">
        <img class="project-thumb" src="${p.image}" alt="" loading="lazy" />
        <div class="project-body">
          <h3>${escapeHtml(loc(p.title))}</h3>
          <p>${escapeHtml(loc(p.summary))}</p>
          <ul class="tags">${p.tags.map((tag) => `<li>${escapeHtml(tag)}</li>`).join("")}</ul>
          <div class="project-links">
            <button type="button" data-open="${p.id}">${t("projects.details")} →</button>
            ${p.repo ? `<a href="${p.repo}" target="_blank" rel="noopener">${t("projects.code")}</a>` : ""}
            ${p.demo ? `<a href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")}</a>` : ""}
          </div>
        </div>
      </article>`
    )
    .join("");
}

/* Modal de detalhe */
const modal = document.getElementById("project-modal");
document.getElementById("projects-grid").addEventListener("click", (e) => {
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
        ${p.repo ? `<a class="btn btn-ghost" href="${p.repo}" target="_blank" rel="noopener">${t("projects.code")}</a>` : ""}
        ${p.demo ? `<a class="btn btn-primary" href="${p.demo}" target="_blank" rel="noopener">${t("projects.demo")}</a>` : ""}
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
        <span class="timeline-period">${escapeHtml(loc(item.period))}</span>
        <h3>${escapeHtml(loc(item.role))}</h3>
        <p class="timeline-company">${escapeHtml(item.company)}</p>
        ${bullets.length ? `<ul>${bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>` : ""}
      </li>`;
  }).join("");
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
    field.setAttribute("aria-invalid", String(!ok));
    if (!ok) valid = false;
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

/* Navegação ativa + animação de entrada ---------------------------------- */
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

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll(".section").forEach((el) => {
  el.classList.add("reveal");
  revealObserver.observe(el);
});

/* Init ------------------------------------------------------------------- */
document.getElementById("year").textContent = new Date().getFullYear();
applyTranslations();
