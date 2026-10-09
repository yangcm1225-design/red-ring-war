const CACHE='red-ring-mobile-v25';
const ASSETS=['./index.html','./manifest.webmanifest','./icons/icon-192.png','./icons/icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('red-ring-mobile-')&&k!==CACHE).map(k=>caches.delete(k)))).then(async()=>{await self.clients.claim();const windows=await self.clients.matchAll({type:'window',includeUncontrolled:true});windows.forEach(client=>{const next=new URL(client.url);next.searchParams.set('rrv','25');client.navigate(next.href);});}));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET'||new URL(event.request.url).origin!==self.location.origin)return;
 event.respondWith(caches.match(event.request).then(hit=>hit||fetch(event.request).catch(error=>{if(event.request.mode==='navigate')return caches.match('./index.html');throw error;})));
});
