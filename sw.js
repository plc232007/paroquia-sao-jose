/* Service worker — cache básico para o site funcionar offline (horários etc.) */
const CACHE = 'paroquia-sao-jose-v1';
const NUCLEO = [
  './',
  './index.html',
  './horarios.html',
  './pastorais.html',
  './eventos.html',
  './contato.html',
  './blog.html',
  './politica-de-privacidade.html',
  './paroquia/nossa-historia.html',
  './paroquia/nossos-parocos.html',
  './paroquia/mensagem-do-paroco.html',
  './paroquia/padroeiro.html',
  './paroquia/cursos.html',
  './paroquia/capela-nossa-senhora-de-fatima.html',
  './paroquia/livretos.html',
  './css/style.css',
  './js/main.js',
  './assets/img/cropped-Sao-Jose.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(NUCLEO)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(chaves => Promise.all(chaves.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || !e.request.url.startsWith(self.location.origin)) return;
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request).then(resposta => {
      const copia = resposta.clone();
      caches.open(CACHE).then(c => c.put(e.request, copia));
      return resposta;
    }).catch(() => caches.match('./index.html')))
  );
});
