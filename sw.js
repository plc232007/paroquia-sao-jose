/* Service worker — cache básico para o site funcionar offline (horários etc.) */
const CACHE = 'paroquia-sao-jose-v3';
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
  './paroquia/sao-jose-das-maos-piedosas.html',
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
      .then(chaves => Promise.all(chaves.filter(k => k.startsWith('paroquia-sao-jose-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;
  // Rede primeiro: uma visita online sempre recebe a versão atual.
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    try {
      const resposta = await fetch(e.request);
      if (resposta.ok) await cache.put(e.request, resposta.clone());
      return resposta;
    } catch {
      const salva = await cache.match(e.request);
      if (salva) return salva;
      if (e.request.mode === 'navigate') return new Response(
        '<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Sem conexão</title><h1>Você está sem conexão</h1><p>Esta página ainda não está disponível offline. Reconecte-se e tente novamente.</p></html>',
        { status: 503, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
      );
      return Response.error();
    }
  })());
});
