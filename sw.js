const CACHE_NAME = "V1_cache_PWA";

var urlToCache = [
    "./",
    "images/habilidades/angular.webp",
    "images/habilidades/Csharp.png",
    "images/habilidades/dart.png",
    "images/habilidades/htmlcss.png",
    "images/habilidades/java.jpg",
    "images/habilidades/js.png",
    "images/habilidades/logo-CSharp.png",
    "images/habilidades/logo-dart.png",
    "images/habilidades/logo-java.png",
    "images/habilidades/node.png",
    "images/habilidades/python.png",
    "images/habilidades/react.png",
    "images/habilidades/ts.png",
    "images/Icons/logo.png",
    "images/Icons/logo16x16.png",
    "images/Icons/logo32x32.png",
    "images/Icons/logo64x64.png",
    "images/Icons/logo96x96.png",
    "images/Icons/logo128x128.png",
    "images/Icons/logo192x192.png",
    "images/Icons/logo256x256.png",
    "images/Icons/logo384x384.png",
    "images/Icons/logo512x512.png",
    "images/Icons/logo1024x1024.png"
];

// Instalación del Service Worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log("Cache abierta");
                return cache.addAll(urlToCache)
                    .then(() => {
                        self.skipWaiting();
                    });
            })
            .catch(error => console.error("Error al abrir la cache:", error))
    );
});

// Activación del Service Worker
self.addEventListener("activate", event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        //Borrar cache innecesaria
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() => {
            //Activar cache en el dispositivo
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then((res => {
            if (res) {
                return res;
            }
            return fetch(event.request);
        })
    ));
});