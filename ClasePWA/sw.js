const CACHE_NAME = 'v1_cache_DGR_PWA';

var urlsToCache = [
    './',
    './img/Escudo UTCH.jpg'
];

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                        self.skipWaiting();
                    })
            })
            .catch(err => console.log('No se ha registrado el cache', err))
    );
});

self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

  e.waitUntil(
        caches.keys()
            .then(cachesNames => {
                return Promise.all(
                    cachesNames.map(cacheName => {
                        if (cacheWhitelist.indexOf(cacheName) == -1) {
                            return cache.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                self.clients.claim(); 
            })
    );
});

self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
            .then(res => {
                if (res) {
                    console.log("Devuelve los datos desde cache /n")
                    return res;
                }
                return fetch(e.request);
                }
        )
    )
});
