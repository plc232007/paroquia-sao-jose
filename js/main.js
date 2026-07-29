/* ==========================================================
   Paróquia São José — script compartilhado
   Injeta cabeçalho/rodapé (fonte única) e ativa as animações.
   Cada página define no <body>:
     data-raiz   → prefixo até a raiz do site ("./" ou "../")
     data-pagina → slug usado para marcar o item ativo do menu
   ========================================================== */
(function () {
  const raiz = document.body.dataset.raiz || './';
  const paginaAtual = document.body.dataset.pagina || '';

  /* ---------- Tema claro/escuro ---------- */
  const temaSalvo = localStorage.getItem('tema');
  const prefereEscuro = window.matchMedia('(prefers-color-scheme: dark)').matches;
  let temaAtual = temaSalvo || (prefereEscuro ? 'escuro' : 'claro');
  document.documentElement.dataset.tema = temaAtual;

  const ICONE_SOL = '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>';
  const ICONE_LUA = '<svg viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  /* ---------- Cabeçalho ---------- */
  const LINKS = [
    { slug: 'home', rotulo: 'Home', href: 'index.html' },
    {
      slug: 'paroquia', rotulo: 'Paróquia', href: 'paroquia/nossa-historia.html',
      filhos: [
        { slug: 'nossa-historia', rotulo: 'Nossa História', href: 'paroquia/nossa-historia.html' },
        { slug: 'nossos-parocos', rotulo: 'Nossos Párocos', href: 'paroquia/nossos-parocos.html' },
        { slug: 'mensagem-do-paroco', rotulo: 'Mensagem do Pároco', href: 'paroquia/mensagem-do-paroco.html' },
        { slug: 'padroeiro', rotulo: 'Padroeiro', href: 'paroquia/padroeiro.html' },
        { slug: 'maos-piedosas', rotulo: 'São José das Mãos Piedosas', href: 'paroquia/sao-jose-das-maos-piedosas.html' },
        { slug: 'cursos', rotulo: 'Cursos', href: 'paroquia/cursos.html' },
        { slug: 'capela', rotulo: 'Capela N. Sra. de Fátima', href: 'paroquia/capela-nossa-senhora-de-fatima.html' },
        { slug: 'livretos', rotulo: 'Livretos', href: 'paroquia/livretos.html' }
      ]
    },
    { slug: 'horarios', rotulo: 'Horários', href: 'horarios.html' },
    { slug: 'pastorais', rotulo: 'Pastorais', href: 'pastorais.html' },
    { slug: 'eventos', rotulo: 'Eventos', href: 'eventos.html' },
    { slug: 'contato', rotulo: 'Contato', href: 'contato.html' },
    { slug: 'blog', rotulo: 'Blog', href: 'blog.html' }
  ];

  function itemMenu(l) {
    const ativo = (l.slug === paginaAtual || (l.filhos || []).some(f => f.slug === paginaAtual)) ? ' class="ativo"' : '';
    if (!l.filhos) return `<li><a${ativo} href="${raiz}${l.href}">${l.rotulo}</a></li>`;
    return `<li class="tem-sub">
      <a${ativo} href="${raiz}${l.href}">${l.rotulo}</a>
      <ul class="submenu">${l.filhos.map(f =>
        `<li><a href="${raiz}${f.href}">${f.rotulo}</a></li>`).join('')}</ul>
    </li>`;
  }

  const cabecalho = document.getElementById('menu-site');
  cabecalho.outerHTML = `
  <header class="topo" id="topoHeader">
    <div class="nav-wrap">
      <a class="brand" href="${raiz}index.html">
        <img src="${raiz}assets/img/cropped-Sao-Jose.png" alt="São José">
        <span>
          <span class="brand-name">Paróquia São José</span><br>
          <span class="brand-sub">Lúcio Costa · Guará-DF</span>
        </span>
      </a>
      <nav class="menu" id="menuNav"><ul>${LINKS.map(itemMenu).join('')}</ul></nav>
      <div style="display:flex;align-items:center">
        <button class="tema-btn" id="temaBtn" aria-label="Alternar tema claro/escuro">${temaAtual === 'escuro' ? ICONE_SOL : ICONE_LUA}</button>
        <button class="menu-btn" id="menuBtn" aria-label="Abrir menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>`;

  /* ---------- Rodapé ---------- */
  const rodape = document.getElementById('rodape-site');
  rodape.outerHTML = `
  <footer class="rodape">
    <div class="rodape-grid">
      <div>
        <div class="rodape-marca">
          <img src="${raiz}assets/img/cropped-Sao-Jose.png" alt="São José">
          <span>Paróquia São José</span>
        </div>
        <p>Presente na comunidade Lúcio Costa desde 1996, um templo de Deus aberto a todos que se sentirem convidados a conhecer.</p>
        <div class="sociais">
          <a href="https://www.facebook.com/paroquiasaojose.lc" target="_blank" rel="noopener" aria-label="Facebook">
            <svg viewBox="0 0 24 24"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07z"/></svg>
          </a>
          <a href="https://www.instagram.com/paroquiasaojose.lc/" target="_blank" rel="noopener" aria-label="Instagram">
            <svg viewBox="0 0 24 24"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.13 1.38A5.88 5.88 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.13a5.88 5.88 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.88 5.88 0 0 0 2.13-1.38 5.88 5.88 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.88 5.88 0 0 0-1.38-2.13A5.88 5.88 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zm0 10.16A4 4 0 1 1 16 12a4 4 0 0 1-4 4zm7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z"/></svg>
          </a>
          <a href="https://www.youtube.com/paroquiasaojose" target="_blank" rel="noopener" aria-label="YouTube">
            <svg viewBox="0 0 24 24"><path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 0 0 2.12-2.14C24 15.93 24 12 24 12s0-3.93-.5-5.81zM9.55 15.57V8.43L15.82 12l-6.27 3.57z"/></svg>
          </a>
        </div>
      </div>
      <div>
        <h4>Navegação</h4>
        <ul>
          <li><a href="${raiz}index.html">Home</a></li>
          <li><a href="${raiz}horarios.html">Horários</a></li>
          <li><a href="${raiz}pastorais.html">Pastorais</a></li>
          <li><a href="${raiz}eventos.html">Eventos</a></li>
          <li><a href="${raiz}blog.html">Blog</a></li>
        </ul>
      </div>
      <div>
        <h4>A Paróquia</h4>
        <ul>
          <li><a href="${raiz}paroquia/nossa-historia.html">Nossa História</a></li>
          <li><a href="${raiz}paroquia/nossos-parocos.html">Nossos Párocos</a></li>
          <li><a href="${raiz}paroquia/padroeiro.html">Padroeiro</a></li>
          <li><a href="${raiz}paroquia/cursos.html">Cursos</a></li>
          <li><a href="${raiz}paroquia/capela-nossa-senhora-de-fatima.html">Capela N. Sra. de Fátima</a></li>
        </ul>
      </div>
      <div>
        <h4>Contato</h4>
        <ul>
          <li><a href="tel:+556135685027">(61) 3568-5027</a></li>
          <li><a href="https://api.whatsapp.com/send?1=pt_BR&phone=5561998587357" target="_blank" rel="noopener">(61) 9 9858-7357</a></li>
          <li><a href="${raiz}contato.html">Fale conosco</a></li>
          <li><a href="${raiz}horarios.html">Horários da secretaria</a></li>
        </ul>
      </div>
    </div>
    <div class="rodape-base">
      Copyright © 2023 Paróquia São José · Desenvolvido por David Mendes Viana ·
      <a href="${raiz}politica-de-privacidade.html">Política de privacidade</a>
    </div>
  </footer>`;

  /* ---------- Comportamento do cabeçalho ---------- */
  const topo = document.getElementById('topoHeader');
  window.addEventListener('scroll', () => {
    topo.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  const menuBtn = document.getElementById('menuBtn');
  const menuNav = document.getElementById('menuNav');
  menuBtn.addEventListener('click', () => {
    const aberto = menuNav.classList.toggle('aberto');
    menuBtn.classList.toggle('aberto', aberto);
    menuBtn.setAttribute('aria-expanded', aberto);
    document.body.style.overflow = aberto ? 'hidden' : '';
  });
  // No mobile, o primeiro toque em "Paróquia" expande o submenu
  menuNav.querySelectorAll('.tem-sub > a').forEach(a => {
    a.addEventListener('click', e => {
      if (window.matchMedia('(max-width: 940px)').matches) {
        const li = a.parentElement;
        if (!li.classList.contains('expandido')) {
          e.preventDefault();
          li.classList.add('expandido');
        }
      }
    });
  });
  menuNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (!a.parentElement.closest('.tem-sub') || a.closest('.submenu')) {
      menuNav.classList.remove('aberto');
      menuBtn.classList.remove('aberto');
      document.body.style.overflow = '';
    }
  }));

  /* ---------- Parallax do hero (quando existir) ---------- */
  const heroBg = document.querySelector('.hero-bg');
  const reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (heroBg && !reduzMovimento) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) heroBg.style.transform = `translateY(${y * 0.35}px)`;
    }, { passive: true });
  }

  /* ---------- Revelar elementos ao rolar ---------- */
  const observador = new IntersectionObserver(entradas => {
    entradas.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visivel');
        observador.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.revelar, .revelar-esq, .revelar-dir').forEach(el => observador.observe(el));

  /* ---------- Busca de pastorais (quando existir) ---------- */
  const busca = document.getElementById('buscaPastoral');
  if (busca) {
    const itens = Array.from(document.querySelectorAll('.acordeao'));
    busca.addEventListener('input', () => {
      const termo = busca.value.trim().toLowerCase();
      itens.forEach(d => {
        const combina = d.textContent.toLowerCase().includes(termo);
        d.style.display = combina ? '' : 'none';
      });
    });
  }

  /* ---------- Alternância de tema ---------- */
  const temaBtn = document.getElementById('temaBtn');
  temaBtn.addEventListener('click', () => {
    temaAtual = temaAtual === 'escuro' ? 'claro' : 'escuro';
    document.documentElement.dataset.tema = temaAtual;
    localStorage.setItem('tema', temaAtual);
    temaBtn.innerHTML = temaAtual === 'escuro' ? ICONE_SOL : ICONE_LUA;
  });

  /* ---------- Barra de progresso de leitura ---------- */
  const barra = document.createElement('div');
  barra.id = 'barraProgresso';
  document.body.appendChild(barra);

  /* ---------- Botão voltar ao topo ---------- */
  const btnTopo = document.createElement('button');
  btnTopo.id = 'btnTopo';
  btnTopo.setAttribute('aria-label', 'Voltar ao topo');
  btnTopo.innerHTML = '<svg viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  btnTopo.addEventListener('click', () => window.scrollTo({ top: 0, behavior: reduzMovimento ? 'auto' : 'smooth' }));
  document.body.appendChild(btnTopo);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    barra.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + '%';
    btnTopo.classList.toggle('visivel', window.scrollY > 600);
  }, { passive: true });

  /* ---------- Transição suave entre páginas ---------- */
  if (!reduzMovimento) {
    document.addEventListener('click', e => {
      const a = e.target.closest('a');
      if (!a || e.ctrlKey || e.metaKey || e.shiftKey || a.target === '_blank') return;
      const href = a.getAttribute('href') || '';
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
      e.preventDefault();
      document.body.classList.add('saindo');
      setTimeout(() => { window.location.href = a.href; }, 180);
    });
    // volta do histórico (bfcache) chega com a classe ainda aplicada
    window.addEventListener('pageshow', () => document.body.classList.remove('saindo'));
  }

  /* ---------- Contadores animados ---------- */
  const contadores = document.querySelectorAll('[data-contar]');
  if (contadores.length) {
    const obsContador = new IntersectionObserver(entradas => {
      entradas.forEach(entrada => {
        if (!entrada.isIntersecting) return;
        obsContador.unobserve(entrada.target);
        const el = entrada.target;
        const alvo = parseInt(el.dataset.contar, 10);
        const inicio = parseInt(el.dataset.inicio || '0', 10);
        const prefixo = el.dataset.prefixo || '';
        if (reduzMovimento) { el.textContent = prefixo + alvo; return; }
        const duracao = 1400;
        const t0 = performance.now();
        (function passo(t) {
          const p = Math.min((t - t0) / duracao, 1);
          const suave = 1 - Math.pow(1 - p, 3);
          el.textContent = prefixo + Math.round(inicio + (alvo - inicio) * suave);
          if (p < 1) requestAnimationFrame(passo);
        })(t0);
      });
    }, { threshold: 0.6 });
    contadores.forEach(el => obsContador.observe(el));
  }

  /* ---------- Lightbox ---------- */
  const lb = document.createElement('div');
  lb.id = 'lightbox';
  lb.innerHTML = '<button class="fechar-lb" aria-label="Fechar">×</button><img alt=""><p class="legenda-lb"></p>';
  document.body.appendChild(lb);
  const lbImg = lb.querySelector('img');
  const lbLegenda = lb.querySelector('.legenda-lb');

  function abrirLightbox(src, legenda) {
    lbImg.src = src;
    lbLegenda.textContent = legenda || '';
    lb.classList.add('aberto');
    document.body.style.overflow = 'hidden';
  }
  function fecharLightbox() {
    lb.classList.remove('aberto');
    document.body.style.overflow = '';
  }
  lb.addEventListener('click', fecharLightbox);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') fecharLightbox(); });

  document.querySelectorAll('a.lightbox').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      const img = a.querySelector('img');
      abrirLightbox(a.getAttribute('href'), img ? img.alt : '');
    });
  });
  document.querySelectorAll('.moldura img, .perfil-foto img, .acordeao .conteudo img').forEach(img => {
    img.addEventListener('click', () => abrirLightbox(img.src, img.alt));
  });

  /* ---------- Próxima celebração (home) ---------- */
  const pm = document.getElementById('proximaMissa');
  if (pm) {
    // dia da semana (0=domingo), [hora, minuto], título, local
    const AGENDA = [
      [0, 7, 30, 'Santa Missa', 'Paróquia São José'],
      [0, 9, 30, 'Santa Missa', 'Paróquia São José'],
      [0, 19, 0, 'Santa Missa', 'Paróquia São José'],
      [1, 19, 0, 'Celebração da Palavra', 'Paróquia São José'],
      [2, 19, 0, 'Santa Missa', 'Paróquia São José'],
      [3, 19, 0, 'Santa Missa', 'Paróquia São José'],
      [4, 19, 0, 'Santa Missa', 'Paróquia São José'],
      [5, 19, 0, 'Santa Missa', 'Paróquia São José'],
      [6, 17, 0, 'Santa Missa', 'Capela N. Sra. de Fátima'],
      [6, 19, 0, 'Santa Missa', 'Paróquia São José']
    ];
    const agora = new Date();
    let melhor = null;
    for (const [dia, h, m, titulo, local] of AGENDA) {
      const data = new Date(agora);
      data.setDate(agora.getDate() + ((dia - agora.getDay() + 7) % 7));
      data.setHours(h, m, 0, 0);
      if (data <= agora) data.setDate(data.getDate() + 7);
      if (!melhor || data < melhor.data) melhor = { data, titulo, local };
    }
    const DIAS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];
    const diasAte = Math.floor((melhor.data - new Date(agora.getFullYear(), agora.getMonth(), agora.getDate())) / 86400000);
    const quando = diasAte === 0 ? 'Hoje' : diasAte === 1 ? 'Amanhã' : DIAS[melhor.data.getDay()].charAt(0).toUpperCase() + DIAS[melhor.data.getDay()].slice(1);
    const hora = String(melhor.data.getHours()).padStart(2, '0') + 'h' + String(melhor.data.getMinutes()).padStart(2, '0');
    pm.innerHTML = `<span class="rotulo-pm">Próxima celebração</span>
      <span class="valor-pm">${quando} às ${hora} · ${melhor.titulo}</span>
      <span class="local-pm">${melhor.local}</span>`;
  }

  /* ---------- Service worker (PWA, só quando hospedado) ---------- */
  if ('serviceWorker' in navigator && location.protocol.startsWith('http')) {
    navigator.serviceWorker.register(raiz + 'sw.js').catch(() => {});
  }
})();
