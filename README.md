# Pedro de Rossi — Portfólio

Site de portfólio pessoal em **HTML, CSS e JavaScript puro** (sem build), bilíngue **PT-BR / EN**, com tema claro/escuro.

## Seções
- **Hero** — nome, cargo, chamadas e redes sociais
- **Sobre** — bio, foto e tecnologias
- **Projetos** — cards com filtro por categoria e modal de detalhes
- **Experiência** — linha do tempo + download do currículo
- **Contato** — formulário (abre o e-mail do visitante via `mailto:`)

## Estrutura
```
index.html          # Estrutura da página
css/style.css       # Estilos (variáveis de tema no :root)
js/data.js          # ✏️ CONTEÚDO: projetos, skills, experiência
js/i18n.js          # ✏️ Textos da interface em PT e EN
js/main.js          # Lógica (idioma, tema, filtros, modal, formulário)
assets/img/         # Foto, favicon e imagens dos projetos
assets/cv/          # Coloque aqui pedro-de-rossi-cv.pdf
```

## Rodando localmente
Abra `index.html` no navegador, ou sirva a pasta:
```bash
python3 -m http.server 8000
# http://localhost:8000
```

## Personalizando
1. **Conteúdo**: edite `js/data.js` (projetos, experiência, skills).
2. **Textos fixos/bio**: edite `js/i18n.js` (as duas línguas).
3. **Links**: troque GitHub/LinkedIn em `index.html` e `CONTACT_EMAIL` em `js/main.js`.
4. **Foto**: substitua `assets/img/avatar.svg` (ou aponte o `<img>` para um `.jpg`).
5. **Currículo**: adicione `assets/cv/pedro-de-rossi-cv.pdf`.
6. **Cor de destaque**: altere `--accent` em `css/style.css`.

## Deploy
Funciona em qualquer hospedagem estática: **GitHub Pages**, Netlify ou Vercel.
No GitHub Pages: *Settings → Pages → Deploy from branch → `main` / root*.
