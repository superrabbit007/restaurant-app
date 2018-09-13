var staticCacheName = 'res-1'; 

self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open(staticCacheName).then(function(cache) {
			return cache.addAll([
				'/',
				'css/',
				'js/main.js',
				'js/restaurant_info.js',
				'js/dbhelper.js',
				'img/',
				'index.html',
				'restaurant.html'
			]);
		})
	);
});

self.addEventListener('activate', function(event) {
	event.waitUntil(
		caches.keys().then(function(cacheNames) {
			cacheNames.filter(function(cacheName) {
				return 	cacheName.startsWith('res-') && 
						cacheName != staticCacheName;
 			}).map(function(cacheName) {
 				return cache.delete(cacheName);
 			})
		})
	);
});


self.addEventListener('fetch', function(event) {
	console.log(event.request);
	event.respondWith(
		caches.match(event.request).then(function(response) {
			if(response) {
				return response;
			};
			return fetch(event.request);
		})
	);
});
