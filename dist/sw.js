// Service Worker para cachear modelos 3D
const CACHE_NAME = 'pineda-2000-v3';
const MODEL_CATALOG = '/models/models.json';

// Instalar service worker
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Instalando...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Service Worker: Cacheando modelos 3D...');
        return fetch(MODEL_CATALOG)
          .then((response) => response.json())
          .then((models) => cache.addAll([
            MODEL_CATALOG,
            ...models.flatMap((model) => [
              `/models/${model.obj}`,
              `/models/${model.mtl}`
            ])
          ]));
      })
      .catch((error) => {
        console.error('❌ Error al cachear modelos:', error);
      })
  );
  
  // Activar inmediatamente
  self.skipWaiting();
});

// Activar service worker
self.addEventListener('activate', (event) => {
  console.log('✅ Service Worker: Activado');
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Eliminando cache antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Tomar control inmediatamente
  return self.clients.claim();
});

// Interceptar requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // El catálogo debe actualizarse cuando se agregan nuevos modelos.
  if (url.pathname.endsWith('/models.json')) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }
  
  // Solo cachear modelos 3D
  if (url.pathname.includes('/models/') && 
      (url.pathname.endsWith('.obj') || url.pathname.endsWith('.mtl') ||
       url.pathname.endsWith('/models.json'))) {
    
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) {
            console.log('📦 Modelo servido desde cache:', url.pathname);
            return cachedResponse;
          }
          
          console.log('🌐 Descargando modelo:', url.pathname);
          
          return fetch(event.request)
            .then((response) => {
              // Solo cachear si la respuesta es válida
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }
              
              // Clonar la respuesta para cachearla
              const responseToCache = response.clone();
              
              caches.open(CACHE_NAME)
                .then((cache) => {
                  cache.put(event.request, responseToCache);
                  console.log('💾 Modelo cacheado:', url.pathname);
                });
              
              return response;
            })
            .catch((error) => {
              console.error('❌ Error al cargar modelo:', error);
              // Podrías retornar un modelo fallback aquí
              throw error;
            });
        })
    );
  }
});
