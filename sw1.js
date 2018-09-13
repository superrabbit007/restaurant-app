self.addEventListener('install', function(event) {
	event.waitUntil(
		caches.open('res-1').then(function(cache) {
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
