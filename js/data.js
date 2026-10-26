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
  "Dashboards",
  { pt: "Sites sob medida", en: "Custom websites" },
  { pt: "Foco no cliente (UX)", en: "Customer-focused UX" },
  { pt: "Planilhas & Automação", en: "Spreadsheets & Automation" },
  "Google Apps Script",
  { pt: "Inteligência Artificial", en: "Artificial Intelligence" },
  "Claude AI",
  "HTML, CSS & JavaScript",
  "Python",
  "Adobe Photoshop",
  { pt: "Inglês avançado", en: "Advanced English" },
];

// Números de destaque na seção "Sobre" (animam contando ao aparecer na tela)
const STATS = [
  { value: 100, suffix: "%", label: { pt: "sob medida para cada cliente", en: "tailored to each client" } },
  { value: 10, suffix: "+", label: { pt: "anos estudando inglês", en: "years studying English" } },
  { value: 5, suffix: "", label: { pt: "meses de intercâmbio nos EUA", en: "months studying in the USA" } },
];

// Cada projeto tem um botão "Quero um projeto assim" que abre o WhatsApp.
const PROJECTS = [
  {
    id: "dashboard-instalacoes",
    title: { pt: "Dashboard de Acompanhamento de Instalações", en: "Installation Tracking Dashboard" },
    summary: {
      pt: "Painel que mostra em tempo real o andamento de projetos e instalações, alimentado por planilhas automatizadas com IA.",
      en: "Dashboard showing the real-time progress of projects and installations, powered by AI-automated spreadsheets.",
    },
    description: {
      pt: "Desenvolvido na rotina de Implantação e Tecnologia da Eletromidia: as informações dos projetos são atualizadas automaticamente com Google Apps Script e IA e viram indicadores visuais, para que a equipe enxergue prazos, status e gargalos de relance.",
      en: "Built within Eletromidia's Implementation & Technology routine: project data is updated automatically with Google Apps Script and AI and turned into visual indicators, so the team can see deadlines, status and bottlenecks at a glance.",
    },
    highlights: {
      pt: ["Atualização automática dos dados", "Indicadores de status e prazos", "Menos trabalho manual para a equipe"],
      en: ["Automatic data updates", "Status and deadline indicators", "Less manual work for the team"],
    },
    tags: ["Dashboards", "Apps Script", "IA"],
    category: "dashboards",
    image: "assets/img/project-dashboard.svg",
    repo: "",
    demo: "",
  },
  {
    id: "dashboards-negocios",
    title: { pt: "Dashboards para Negócios", en: "Business Dashboards" },
    summary: {
      pt: "Painéis personalizados que transformam os dados do seu negócio — vendas, clientes, metas — em decisões rápidas.",
      en: "Custom dashboards that turn your business data — sales, customers, goals — into quick decisions.",
    },
    description: {
      pt: "Começo entendendo o que o seu cliente e a sua equipe realmente precisam acompanhar. A partir disso, monto um painel claro e automatizado, com os indicadores certos e sem excesso de informação.",
      en: "I start by understanding what your customers and team really need to track. From there, I build a clear, automated dashboard with the right indicators and no information overload.",
    },
    highlights: {
      pt: ["Indicadores escolhidos com você", "Dados atualizados automaticamente", "Visual limpo e fácil de ler"],
      en: ["KPIs chosen together with you", "Automatically updated data", "Clean, easy-to-read visuals"],
    },
    tags: ["Dashboards", "Google Sheets", "KPIs"],
    category: "dashboards",
    image: "assets/img/project-sheets.svg",
    repo: "",
    demo: "",
  },
  {
    id: "sites-sob-medida",
    title: { pt: "Sites Sob Medida", en: "Custom Websites" },
    summary: {
      pt: "Sites criados a partir do interesse do seu consumidor: conteúdo, visual e navegação pensados para quem vai comprar.",
      en: "Websites built around your customer's interests: content, visuals and navigation designed for the people who buy.",
    },
    description: {
      pt: "Antes do código, estudo o público: o que ele procura, o que o faz confiar e o que o leva a entrar em contato. O resultado é um site rápido, bonito e responsivo, com chamadas diretas para WhatsApp, e-mail e redes sociais.",
      en: "Before coding, I study the audience: what they look for, what makes them trust you and what leads them to get in touch. The result is a fast, beautiful, responsive site with direct calls to WhatsApp, e-mail and social media.",
    },
    highlights: {
      pt: ["Estratégia baseada no consumidor", "Funciona perfeitamente no celular", "Botões diretos para contato e vendas"],
      en: ["Customer-driven strategy", "Works perfectly on mobile", "Direct buttons for contact and sales"],
    },
    tags: ["Sites", "UX", "Responsivo"],
    category: "sites",
    image: "assets/img/project-web.svg",
    repo: "",
    demo: "",
  },
  {
    id: "portfolio",
    title: { pt: "Este Portfólio", en: "This Portfolio" },
    summary: {
      pt: "Um exemplo do meu trabalho: bilíngue, animado, responsivo e com contato direto em um clique.",
      en: "An example of my work: bilingual, animated, responsive and with one-click direct contact.",
    },
    description: {
      pt: "Identidade azul neon, tema claro/escuro, animações de rolagem, fundo interativo e botões que levam direto ao WhatsApp, e-mail e LinkedIn — feito com HTML, CSS e JavaScript.",
      en: "Neon-blue identity, light/dark theme, scroll animations, an interactive background and buttons that go straight to WhatsApp, e-mail and LinkedIn — built with HTML, CSS and JavaScript.",
    },
    highlights: {
      pt: ["Bilíngue PT/EN", "Animações e efeitos 3D", "Contato direto em um clique"],
      en: ["Bilingual PT/EN", "Animations and 3D effects", "One-click direct contact"],
    },
    tags: ["Sites", "HTML", "CSS", "JavaScript"],
    category: "sites",
    image: "assets/img/project-portfolio.svg",
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
