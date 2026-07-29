# Paróquia São José — contexto do projeto

## O que é
Site institucional da Paróquia São José (comunidade Lúcio Costa, Guará-DF), reconstrução
estática do site original em WordPress/Elementor (paroquiasaojose.org). Público: paroquianos
de todas as idades, muitos acessando pelo celular, buscando horário de missa, notícias e
contato — não é um site de marketing, é utilitário + institucional.

## Stack (não mudar sem motivo forte)
- HTML/CSS/JS puro. **Sem build step, sem framework, sem dependências de npm.** Isso é uma
  escolha deliberada, não uma limitação a "resolver" — o site é pequeno o suficiente pra não
  justificar a complexidade de um SSG.
- Fontes via Google Fonts (precisa de internet): Playfair Display (display/serif) + Roboto (sans/corpo).
- Header e rodapé são definidos uma única vez em `js/main.js` e injetados nos placeholders
  `<div id="menu-site">` / `<div id="rodape-site">` de cada página.
- Cada `<body>` declara `data-raiz` (prefixo relativo até a raiz: `./` ou `../`) e
  `data-pagina` (slug usado para marcar o item ativo do menu). **Sempre declare os dois
  atributos em página nova.**
- `css/style.css` é a única folha de estilos do projeto — não criar CSS por página.
- Animações usam `IntersectionObserver` (scroll reveal) e respeitam
  `@media (prefers-reduced-motion:reduce)` — qualquer animação nova precisa ter fallback ali.
- Publicado via GitHub Pages a partir do branch `main`. Push = deploy automático (~1min).

## Design tokens atuais (`css/style.css`, linhas 5–21)
```
--azul-escuro:#232e6a   --azul:#0170B9        --dourado:#c9a227
--texto:#3a3a3a         --texto-suave:#4B4F58 --cinza-claro:#F5F5F5
--serif: Playfair Display   --sans: Roboto
```
Há um bloco de override para dark mode (`prefers-color-scheme`) mais abaixo no mesmo arquivo.
Qualquer nova cor entra como variável em `:root`, nunca hardcoded no seletor.

## Devoção local (contexto que orienta o design)
A paróquia tem uma devoção própria: **São José das Mãos Piedosas** — imagem com a mão direita
estendida (acolhida/proteção) e lírio na mão esquerda. Missa votiva toda quarta-feira, 19h,
com partilha de testemunhos. Fonte de conteúdo original:
`https://www.paroquiasaojose.org/missa-votiva-de-sao-jose-das-maos-piedosas/`.
Hoje essa devoção **não tem página própria no site novo** — é só um link externo na home.
Isso é uma lacuna de conteúdo prioritária, ver `DESIGN-BRIEF.md`. Essa devoção é o elemento
de identidade mais específico que a paróquia tem — deve orientar o hero da home e ganhar
página e paleta próprias (lilás/terracota extraídos da imagem real), sem virar a cor do
site inteiro.

## Débitos conhecidos (ver crítica completa no histórico da conversa)
Itens que já foram identificados como "clichê de template genérico" e que uma revisão de
design deve resolver — ver `DESIGN-BRIEF.md` para o plano completo:
1. Botões pill (`border-radius:999px`) — padrão SaaS genérico, trocar por algo com identidade própria.
2. Ícones de card em círculo com gradiente diagonal — clichê de feature-card.
3. Hero com fade-up escalonado (`.anim1`–`.anim4`) — animação-clichê de site gerado por IA.
4. Eyebrow label + traço dourado sob títulos de seção — decoração sem função informativa.
5. Círculos decorativos abstratos em `.pagina-hero::before/::after` — decoração pura, cortar ou substituir por motivo com significado.
6. **Falha de acessibilidade real**: só `.busca-wrap input:focus` e `.tem-sub:focus-within`
   têm estado de foco visível. Botões, links de nav e cards não têm `:focus-visible`. Corrigir
   isso tem prioridade sobre qualquer ajuste estético.

## Como trabalhar neste projeto
- Mudanças de conteúdo (textos, horários, eventos) devem ser feitas exatamente como estão nas
  páginas originais (o conteúdo foi transcrito fielmente do site oficial em 19/07/2026) —
  não reescrever texto litúrgico/institucional por conta própria.
- Mudanças de design: uma seção/componente por vez, não reescrever `style.css` inteiro numa
  tacada. Depois de cada mudança visual, abrir a página num browser local
  (`python3 -m http.server` na raiz do repo) e conferir antes de seguir pra próxima seção.
- Commits pequenos, um por seção/componente aprovado.
- Antes de adicionar qualquer decoração nova, perguntar: "isso vem da iconografia real de São
  José ou é decoração genérica?" — ver `DESIGN-BRIEF.md`, seção "Elemento assinatura".
