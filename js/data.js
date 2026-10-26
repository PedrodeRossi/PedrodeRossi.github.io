/* ==========================================================================
   CONTEÚDO DO PORTFÓLIO — edite aqui projetos, skills, experiência e contatos.
   Campos de texto aceitam { pt, en } para o modo bilíngue.
   ========================================================================== */

const CONTACT = {
  email: "pemrossi@outlook.com",
  phone: "+55 11 98882-8537",
  whatsapp: "https://wa.me/5511988828537",
  linkedin: "https://www.linkedin.com/in/pedro-de-rossi",
  github: "https://github.com/PedrodeRossi",
};

const SKILLS = [
  "Python",
  "Google Apps Script",
  "Claude AI",
  { pt: "Inteligência Artificial", en: "Artificial Intelligence" },
  "Dashboards",
  { pt: "Planilhas & Automação", en: "Spreadsheets & Automation" },
  { pt: "Dados", en: "Data" },
  "Adobe Photoshop",
  { pt: "Inglês avançado", en: "Advanced English" },
];

// Números de destaque na seção "Sobre" (animam contando ao aparecer na tela)
const STATS = [
  { value: 10, suffix: "+", label: { pt: "anos estudando inglês", en: "years studying English" } },
  { value: 5, suffix: "", label: { pt: "meses de intercâmbio nos EUA", en: "months studying in the USA" } },
  { value: 2030, suffix: "", label: { pt: "formatura em Ciência da Computação", en: "Computer Science graduation" } },
];

// TODO: adicionar projetos do GitHub conforme forem publicados
const PROJECTS = [
  {
    id: "automacao-planilhas",
    title: { pt: "Automação de Planilhas com IA", en: "AI-Powered Spreadsheet Automation" },
    summary: {
      pt: "Atualização de planilhas e informações de projetos usando código e Inteligência Artificial na Eletromidia.",
      en: "Updating spreadsheets and project information with code and Artificial Intelligence at Eletromidia.",
    },
    description: {
      pt: "Como aprendiz de Implantação e Tecnologia na Eletromidia, uso Google Apps Script e IA para automatizar a atualização de planilhas e o acompanhamento de projetos e instalações, reduzindo trabalho manual.",
      en: "As an Implementation & Technology apprentice at Eletromidia, I use Google Apps Script and AI to automate spreadsheet updates and the tracking of projects and installations, reducing manual work.",
    },
    highlights: {
      pt: ["Scripts em Google Apps Script", "Uso de IA (Claude) no fluxo de trabalho", "Acompanhamento de instalações e projetos"],
      en: ["Google Apps Script automations", "AI (Claude) in the workflow", "Tracking of installations and projects"],
    },
    tags: ["Apps Script", "Claude AI", "Dashboards"],
    category: "work",
    image: "assets/img/project-sheets.svg",
    repo: "",
    demo: "",
  },
  {
    id: "portfolio",
    title: { pt: "Portfólio Pessoal", en: "Personal Portfolio" },
    summary: {
      pt: "Este site: bilíngue, responsivo e cheio de animações, feito com HTML, CSS e JavaScript puro.",
      en: "This website: bilingual, responsive and full of animations, built with plain HTML, CSS and JavaScript.",
    },
    description: {
      pt: "Portfólio com identidade azul neon, tema claro/escuro, animações de rolagem, fundo interativo em canvas e conteúdo em português e inglês — sem frameworks.",
      en: "Portfolio with a neon-blue identity, light/dark theme, scroll animations, an interactive canvas background and content in Portuguese and English — no frameworks.",
    },
    highlights: {
      pt: ["Bilíngue PT/EN", "Animações e efeitos 3D", "Desenvolvido com apoio de IA"],
      en: ["Bilingual PT/EN", "Animations and 3D effects", "Built with AI assistance"],
    },
    tags: ["HTML", "CSS", "JavaScript"],
    category: "web",
    image: "assets/img/project-web.svg",
    repo: "https://github.com/PedrodeRossi",
    demo: "",
  },
  {
    id: "estudos-python",
    title: { pt: "Estudos em Python & Dados", en: "Python & Data Studies" },
    summary: {
      pt: "Exercícios e projetos da graduação em Ciência da Computação na FIAP, com foco em Python, dados e IA.",
      en: "Exercises and projects from my Computer Science degree at FIAP, focused on Python, data and AI.",
    },
    description: {
      pt: "Repositório dos meus estudos na FIAP e em cursos complementares: lógica de programação, Python, manipulação de dados e primeiros passos em Inteligência Artificial.",
      en: "Repository of my studies at FIAP and complementary courses: programming logic, Python, data handling and first steps in Artificial Intelligence.",
    },
    highlights: {
      pt: ["Lógica de programação", "Python", "Dados e IA"],
      en: ["Programming logic", "Python", "Data and AI"],
    },
    tags: ["Python", "FIAP", "IA"],
    category: "study",
    image: "assets/img/project-python.svg",
    repo: "https://github.com/PedrodeRossi",
    demo: "",
  },
];

const EXPERIENCE = [
  {
    period: { pt: "Set 2026 — Atual", en: "Sep 2026 — Present" },
    role: { pt: "Jovem Aprendiz · Implantação e Tecnologia", en: "Young Apprentice · Implementation & Technology" },
    company: "Eletromidia · São Paulo, SP",
    type: "work",
    bullets: {
      pt: [
        "Suporte em sistemas e controles internos",
        "Atualização de planilhas e informações de projetos com código e IA",
        "Acompanhamento do andamento das instalações",
        "Suporte relacionado a painéis, telas e outros produtos Eletromidia",
      ],
      en: [
        "Support for internal systems and controls",
        "Updating spreadsheets and project information through coding and AI",
        "Monitoring the progress of installations",
        "Support for Eletromidia panels, screens and other products",
      ],
    },
  },
  {
    period: { pt: "Jul 2026 — Jun 2030", en: "Jul 2026 — Jun 2030" },
    role: { pt: "Bacharelado em Ciência da Computação", en: "B.Sc. in Computer Science" },
    company: "FIAP",
    type: "education",
    bullets: { pt: [], en: [] },
  },
  {
    period: { pt: "Jan 2026 — Mai 2026", en: "Jan 2026 — May 2026" },
    role: { pt: "English for Communication", en: "English for Communication" },
    company: "Dallas Baptist University · Dallas, EUA",
    type: "education",
    bullets: {
      pt: ["Intercâmbio de 5 meses nos Estados Unidos"],
      en: ["5-month study abroad experience in the United States"],
    },
  },
  {
    period: { pt: "2013 — 2024", en: "2013 — 2024" },
    role: { pt: "Inglês como segunda língua", en: "English as a Second Language" },
    company: "Cultura Inglesa",
    type: "education",
    bullets: { pt: [], en: [] },
  },
];
