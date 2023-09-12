'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "0b5059fc80e6903d2f357a2e14881a33",
"assets/AssetManifest.json": "3693614d60893e3bacf444d8232d7cf8",
"assets/assets/fonts/Inter-Regular.ttf": "079af0e2936ccb99b391ddc0bbb73dcb",
"assets/assets/gifs/background_removal.gif": "1a9dffeaf99d51fb39d89d17c12f5a59",
"assets/assets/gifs/custom_ai_training.gif": "af0118aca3eb01fca180e923dde71cd7",
"assets/assets/gifs/inpainting.gif": "5170d6be0ff2f4e8582c7c221bb510d4",
"assets/assets/gifs/subfeature_1.gif": "ebfb66394d7ed81f00bb6f0e5b115a90",
"assets/assets/gifs/subfeature_2.gif": "f7708e8a76a6952c9f5a84b1719ab0a2",
"assets/assets/gifs/text_to_image.gif": "6807b3dae73f05f4bab2be7aecef625a",
"assets/assets/images/awards/award_1.png": "0bab1552214ad662c469ccdebfbafa6c",
"assets/assets/images/awards/award_2.png": "01da9894898ebdc562603ffd6e5d0b91",
"assets/assets/images/awards/award_3.png": "af5dbf55f7c3404e0efad0481a179c23",
"assets/assets/images/community_logos/cbs.png": "8864bbd26a9ce9e6d303b43b7620b841",
"assets/assets/images/community_logos/corridor.png": "644118b1fc64de8f01f84057efdabac4",
"assets/assets/images/community_logos/google.png": "a0a48981f4594212df3ff217c51185b5",
"assets/assets/images/community_logos/microsoft.png": "2db440f203a920c76bf2eaa1c57042d7",
"assets/assets/images/community_logos/nb.png": "dc41a08b338e7c0255ef32356ad2e67e",
"assets/assets/images/community_logos/nick.png": "15219dab4f73b558ad104a203413e7fd",
"assets/assets/images/community_logos/ny.png": "c4155826076ef81fb553b13b94c56d8c",
"assets/assets/images/community_logos/rga.png": "afe24457bde50cfc15c83e1186cfdc7b",
"assets/assets/images/community_logos/vox.png": "a388509e96f5d2cd4826f9dab10f86b3",
"assets/assets/images/hero_image.png": "949fba542d1b26f808ab3bd70b866170",
"assets/assets/svg/logo.svg": "17fb664a782911aa121d58918cbacf45",
"assets/assets/svg/social_media_logos/facebook.svg": "d4786fe3b980a4ef56b4612cb4aa8b13",
"assets/assets/svg/social_media_logos/instagram.svg": "caceab5e905b987767e23bf359fc3826",
"assets/assets/svg/social_media_logos/linkedIn.svg": "985e01e15176fcd30ed6a8af4e0197b8",
"assets/assets/svg/social_media_logos/reddit.svg": "1e3086aa1c2a3de666bef00051caaaa3",
"assets/assets/svg/social_media_logos/tiktok.svg": "b84c1e386ba7ee7c84f17c42d8c49b3b",
"assets/assets/svg/social_media_logos/twitter.svg": "e2bafa237cdb99ed3892b42f50bcbbd6",
"assets/assets/svg/social_media_logos/youtube.svg": "a7930570770dd3b1d495022167bbb1e5",
"assets/FontManifest.json": "ee330b453adffc411cf5399c36204ecb",
"assets/fonts/MaterialIcons-Regular.otf": "d63b411d307e59f8df6cdf2ff4c53f27",
"assets/NOTICES": "162127388059e0d6c121d8306ab841cb",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/shaders/ink_sparkle.frag": "f8b80e740d33eb157090be4e995febdf",
"canvaskit/canvaskit.js": "5caccb235fad20e9b72ea6da5a0094e6",
"canvaskit/canvaskit.wasm": "d9f69e0f428f695dc3d66b3a83a4aa8e",
"canvaskit/chromium/canvaskit.js": "ffb2bb6484d5689d91f393b60664d530",
"canvaskit/chromium/canvaskit.wasm": "393ec8fb05d94036734f8104fa550a67",
"canvaskit/skwasm.js": "95f16c6690f955a45b2317496983dbe9",
"canvaskit/skwasm.wasm": "d1fde2560be92c0b07ad9cf9acb10d05",
"canvaskit/skwasm.worker.js": "51253d3321b11ddb8d73fa8aa87d3b15",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "6b515e434cea20006b3ef1726d2c8894",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "fe7b225774319bd138061b188ad8dde2",
"/": "fe7b225774319bd138061b188ad8dde2",
"main.dart.js": "24e6c2acd6cbe1965bd32827069adb19",
"manifest.json": "0f3d20a25414d0ee4c78806c0be312c5",
"version.json": "d364650cf536c16d589bf63236126201"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
