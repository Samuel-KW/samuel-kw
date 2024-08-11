const CACHE_NAME = 'cache-v0.1';
const CACHE_URLS = [
    
];

self.addEventListener('install', function(event) {
    console.log('Service worker has installed:', event);

    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {

            console.log('Caching URLs:', CACHE_URLS);
            return cache.addAll(CACHE_URLS);
        })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(

        caches.match(event.request)
            .then(function(response) {
                
                if (response) return response;

                return fetch(event.request);
                
            })
    );
});