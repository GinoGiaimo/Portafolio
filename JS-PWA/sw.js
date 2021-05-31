//Archivos a cacheat
const cacheName = 'apv-v1'
const archivos = [
    './',
    './error.html',
    './index.html',
    './css/bootstrap.css',
    './css/styles.css',
    './js/app.js',
    './js/apv.js'
]


//Se instalo el sw
self.addEventListener('install', (e) => {
    console.log('Instalando el SW');

    e.waitUntil(caches.open(cacheName).then(cache => {
        console.log('cacheando');
        cache.addAll(archivos);
    }))
})

//Cuando se activa el sw
self.addEventListener('activate', (e) => {
    console.log('SW Activado');

    e.waitUntil(caches.keys().then(keys => {
        return Promise.all(keys.filter(key => key !== cacheName).map(key => caches.delete(key)))
    }))
})

self.addEventListener('fetch', e => {
    //console.log('Fetch', e);

    e.respondWith(caches.match(e.request).then(respuesta => {
        return respuesta
    }).catch(() => caches.match('./error.html')))
})