/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/about/index.html","080142379c33d2fbcd0a9203848b4496"],["/assets/favicons/android-chrome-144x144.png","08718b78ebaa88fd2ab1f87b2237526b"],["/assets/favicons/android-chrome-192x192.png","604e88eabf7cc4ece3aca5e52d77272a"],["/assets/favicons/android-chrome-36x36.png","9648e337ea9e210cb205aceac90e80b3"],["/assets/favicons/android-chrome-48x48.png","c6b3a17f0f82eae2d0ea9618c4406088"],["/assets/favicons/android-chrome-72x72.png","55a45c76c37bdf070cf62af894e7a28e"],["/assets/favicons/android-chrome-96x96.png","2067466a7bdf1ada6df5234a0c1f8694"],["/assets/favicons/apple-touch-icon-114x114.png","19b108e9bc35540c25455eb0b0fc0e2f"],["/assets/favicons/apple-touch-icon-120x120.png","534b706bdc23b686e715d8eed1b44ac1"],["/assets/favicons/apple-touch-icon-144x144.png","07a526f2e4faf0fad2273e8f657185ea"],["/assets/favicons/apple-touch-icon-152x152.png","4b4860b3ca9613803714f3eb9d53399d"],["/assets/favicons/apple-touch-icon-180x180.png","919a48f31aab579b98b7bd46bfbc453b"],["/assets/favicons/apple-touch-icon-57x57.png","4e68e35c13552b5a70a26461712fb2fe"],["/assets/favicons/apple-touch-icon-60x60.png","7f6dcbca2a5250dad0af2f08225463a0"],["/assets/favicons/apple-touch-icon-72x72.png","db0a83b692bd220d03f412981436363f"],["/assets/favicons/apple-touch-icon-76x76.png","4c8c19e51bc488aecad1929da154a345"],["/assets/favicons/apple-touch-icon-precomposed.png","69933c4ce44b0719389e1149ab6cdcaf"],["/assets/favicons/apple-touch-icon.png","919a48f31aab579b98b7bd46bfbc453b"],["/assets/favicons/favicon-16x16.png","d942e4cc057fd80b04beadcdad81eb19"],["/assets/favicons/favicon-32x32.png","551703c7f2fa83a8dfb36d7407943366"],["/assets/favicons/favicon-96x96.png","a9f12de8aa95e3b6a9ec83f9b82e432c"],["/assets/favicons/mstile-144x144.png","b45295c58d198071fdb4ceb9a9351c5f"],["/assets/favicons/mstile-150x150.png","9a0899937ac55fbc9e3b64dd78c176d6"],["/assets/favicons/mstile-310x150.png","a3028a5bdcd548bf1f0111c59dd764dc"],["/assets/favicons/mstile-310x310.png","dd4116592d78db9c0000b45d1bccb072"],["/assets/favicons/mstile-70x70.png","b30609d50aff144499748b8ebd241d8c"],["/assets/favicons/profile-photo-2x.jpg","bc235f0378ebc45257a1c3d1ff56ae6a"],["/assets/favicons/profile-photo-3x.jpg","afe43d4358a79b2f1026da9bbffeca8b"],["/assets/favicons/profile-photo.jpg","cd4d940f5a24e5d2cbcbc451cda3eb0f"],["/assets/favicons/safari-pinned-tab.svg","2f26b4871494a48651a8b9c96e3cafa2"],["/assets/profile-photo-2x.jpg","afe43d4358a79b2f1026da9bbffeca8b"],["/assets/profile-photo-3x.jpg","0d5b186bb48da0c613b50d72acf309e0"],["/assets/profile-photo-high.jpg","c0266c925638041e30a5e0baba413eb7"],["/assets/profile-photo-og.jpg","cb40f1df680e1121d9f8152c5900030c"],["/assets/profile-photo.jpg","507ae86494e850cf4ad8b707f18fd2c4"],["/assets/style.css","52ffe56ee1d7251321d947171237357c"],["/assets/style.min.css","2cb3a90ad652b6751b7780b47666407d"],["/blog/index.html","451d5966c764daf558a97a8989822ebb"],["/google7f176964500738f2.html","60d83b43bb38f94b355feb5222d91337"],["/index.html","907c4df19d1dcd6823230fc819f9564c"],["/service-worker.js","8e2c8aed3dced09cb4c6792bef39f90f"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







