# Paróquia São José — novo site

Reconstrução moderna do site [paroquiasaojose.org](https://www.paroquiasaojose.org/), mantendo a identidade visual (azul `#232e6a` / `#0170B9`, Playfair Display + Roboto) e todo o conteúdo original, com layout responsivo e animações.

## Estrutura

```
paroquia-sao-jose/
├── index.html                  # Home (palavra do pároco, atalhos, blog, folheto)
├── horarios.html               # Celebrações, confissões e secretaria
├── pastorais.html              # 22 pastorais com busca e acordeões
├── eventos.html                # O que vem por aí
├── contato.html                # Telefones, e-mail, WhatsApp e mapa
├── blog.html                   # Últimos artigos (links para o site atual)
├── politica-de-privacidade.html
├── paroquia/                   # Subseção "Paróquia"
│   ├── nossa-historia.html     #   Linha do tempo 1986 → 2021
│   ├── nossos-parocos.html     #   Pe. Paulinho, Diác. Albérico, Pe. Olmer
│   ├── mensagem-do-paroco.html
│   ├── padroeiro.html          #   Quem foi São José + terço, orações e ladainha
│   ├── cursos.html             #   Batismo, Catequese e Noivos (com formulários)
│   ├── capela-nossa-senhora-de-fatima.html
│   └── livretos.html           #   Folhetos em PDF
├── css/style.css               # Design system compartilhado (única folha de estilos)
├── js/main.js                  # Header/rodapé injetados (fonte única) + animações
└── assets/img/                 # Imagens baixadas do site original
```

## Como funciona

- **Header e rodapé** ficam definidos uma única vez em `js/main.js` e são injetados
  nos placeholders `<div id="menu-site">` / `<div id="rodape-site">` de cada página.
  Cada `<body>` declara `data-raiz` (prefixo até a raiz: `./` ou `../`) e
  `data-pagina` (slug que marca o item ativo do menu).
- **Sem build e sem dependências**: HTML/CSS/JS puros — basta abrir o `index.html`
  no navegador. As fontes vêm do Google Fonts (precisa de internet).
- **Animações**: revelação ao rolar via `IntersectionObserver`, parallax no hero e
  transições nos cards — tudo respeitando `prefers-reduced-motion`.
- **Mobile**: menu hambúrguer em tela cheia com submenu expansível, grids que
  empilham e tipografia fluida com `clamp()`.

## Publicação

O site está publicado via GitHub Pages a partir do branch `main` deste repositório:
**https://plc232007.github.io/paroquia-sao-jose/**

Para atualizar o site no ar, basta commitar e dar `git push` — o Pages republica
automaticamente em ~1 minuto.

## Conteúdo

Todo o texto foi transcrito fielmente das páginas originais (extraído em 19/07/2026).
Links de formulários (Google Forms), PDFs dos livretos e artigos do blog apontam
para os endereços originais. E-mails que estavam ofuscados pelo Cloudflare foram
decodificados: `secretaria@paroquiasaojose.org`, `catequesesaojoselc@gmail.com`
(PIX catequese) e `pastoralfamiliar.psjlc@gmail.com` (PIX curso de noivos).
