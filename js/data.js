/* ==========================================================================
   CONTEÚDO DO PORTFÓLIO — edite aqui projetos, skills e experiência.
   Campos de texto aceitam { pt, en } para o modo bilíngue.
   ========================================================================== */

const SKILLS = [
  "JavaScript", "TypeScript", "React", "Node.js", "Python",
  "SQL", "PostgreSQL", "Docker", "Git", "HTML & CSS",
];

const PROJECTS = [
  {
    id: "projeto-1",
    title: { pt: "Dashboard Financeiro", en: "Finance Dashboard" },
    summary: {
      pt: "Painel para acompanhar gastos e receitas com gráficos interativos e relatórios mensais.",
      en: "Dashboard to track expenses and income with interactive charts and monthly reports.",
    },
    description: {
      pt: "Aplicação web que consolida transações de várias contas, categoriza gastos automaticamente e gera relatórios exportáveis.",
      en: "Web app that consolidates transactions from multiple accounts, auto-categorizes expenses and generates exportable reports.",
    },
    highlights: {
      pt: ["Gráficos interativos", "Importação de extratos CSV", "Autenticação com JWT"],
      en: ["Interactive charts", "CSV statement import", "JWT authentication"],
    },
    tags: ["React", "Node.js", "PostgreSQL"],
    category: "web",
    image: "assets/img/project-placeholder.svg",
    repo: "https://github.com/",
    demo: "",
  },
  {
    id: "projeto-2",
    title: { pt: "API de Agendamentos", en: "Scheduling API" },
    summary: {
      pt: "API REST para agendamento de serviços com notificações por e-mail e controle de disponibilidade.",
      en: "REST API for service scheduling with e-mail notifications and availability control.",
    },
    description: {
      pt: "Back-end escalável com documentação OpenAPI, testes automatizados e deploy em contêineres.",
      en: "Scalable back-end with OpenAPI docs, automated tests and containerized deployment.",
    },
    highlights: {
      pt: ["Documentação Swagger", "Cobertura de testes > 90%", "CI/CD com GitHub Actions"],
      en: ["Swagger documentation", "> 90% test coverage", "CI/CD with GitHub Actions"],
    },
    tags: ["Python", "FastAPI", "Docker"],
    category: "backend",
    image: "assets/img/project-placeholder.svg",
    repo: "https://github.com/",
    demo: "",
  },
  {
    id: "projeto-3",
    title: { pt: "App de Hábitos", en: "Habit Tracker App" },
    summary: {
      pt: "Aplicativo para criar e acompanhar hábitos diários, com sequências e lembretes.",
      en: "App to build and track daily habits, with streaks and reminders.",
    },
    description: {
      pt: "PWA que funciona offline, sincroniza dados entre dispositivos e envia notificações push.",
      en: "Offline-first PWA that syncs data across devices and sends push notifications.",
    },
    highlights: {
      pt: ["Funciona offline", "Notificações push", "Tema claro/escuro"],
      en: ["Works offline", "Push notifications", "Light/dark theme"],
    },
    tags: ["TypeScript", "PWA", "IndexedDB"],
    category: "mobile",
    image: "assets/img/project-placeholder.svg",
    repo: "https://github.com/",
    demo: "",
  },
];

const EXPERIENCE = [
  {
    period: { pt: "2024 — Atual", en: "2024 — Present" },
    role: { pt: "Desenvolvedor Full Stack", en: "Full Stack Developer" },
    company: "Empresa Exemplo",
    bullets: {
      pt: ["Desenvolvimento de novas funcionalidades em produto SaaS", "Melhoria de performance e acessibilidade do front-end"],
      en: ["Built new features for a SaaS product", "Improved front-end performance and accessibility"],
    },
  },
  {
    period: { pt: "2022 — 2024", en: "2022 — 2024" },
    role: { pt: "Desenvolvedor Júnior", en: "Junior Developer" },
    company: "Outra Empresa",
    bullets: {
      pt: ["Manutenção de APIs e integrações", "Automação de processos internos"],
      en: ["Maintained APIs and integrations", "Automated internal processes"],
    },
  },
  {
    period: { pt: "2019 — 2023", en: "2019 — 2023" },
    role: { pt: "Bacharelado em Ciência da Computação", en: "B.Sc. in Computer Science" },
    company: "Universidade Exemplo",
    bullets: { pt: [], en: [] },
  },
];
