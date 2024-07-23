---
sitemap: true
layout: b-post
title:  "Web Cache Deception Zafiyeti ve Sömürülmesi"
modified:
author: Taylan Özgür Bildik
tags: [web, güvenlik, cache]
categories: blog 
cover: web_cache_deception-cover.png
permalink: /:title
toc: true
---

# Girizgah

Günümüzde pek çok websitesi verimlilik için bazı statik dosyaların önbellekte(CDN, load balance veya reverse proxy vb..) bulunmasını sağlıyor. 

Örneğin [linuxdersleri.net](http://linuxdersleri.net) adresinin reverse proxy sayesinde önbellek tuttuğunu düşünelim. Kullanıcılar [linuxdersleri.net/hesap](http://linuxdersleri.net/hesap) sayfasını ziyaret ettiklerinde, mevcut kullanıcıya ait hesap bilgilerinin dinamik web sunucusu tarafında üretilip kullanıcıya sunuluyor olsun. Bu durumda tabii ki bu içerik dinamik olarak her kullanıcıya özel olacağı için önbellekte tutulmayacaktır. 

Önbellekte tutulan veriler statik yani değişmeyen ve hassas bilgi bulundurmayan türdeki dosyalar olacaktır. Örneğin aşağıdaki türde dosyalar genellikle statik olarak kabul edilip önbellekte tutulurlar.

```jsx
aif, aiff, au, avi, bin, bmp, cab, carb, cct, cdf, class, css, doc, dcr, dtd, gcf, gff, gif, grv, hdml, hqx, ico, ini, jpeg, jpg, js, mov, mp3, nc, pct, ppc, pws, swa, swf, txt, vbs, w32, wav, wbmp, wml, wmlc, wmls, wmlsc, xsd, zip
```

Yani örneğin [linuxdersleri.net/tasarım.css](http://linuxdersleri.net/tasarım.css) adresindeki .css dosyası statik içeriğe sahip olduğu için önbelleğe alınabilir. Ayrıca var olmayan bir dizin adresine gidildiğinde otomatik olarak var olan bir üst dizindeki adresin içeriğini getiriyor olsun.

Örneğin ben [linuxdersleri.net/hesap/olmayan.css](http://linuxdersleri.net/hesap/olmayan.css) adresine gittiğimde, [linuxdersleri.net/he](http://linuxdersleri.net/heasp)sap adresindeki içerik sunulacaktır. Aynı zamanda bu adres .css uzantısı ile bittiği için bu döndürülen içerik tam olarak bu adreste önbelleğe alınacaktır. Çünkü;

1- Kullanıcı tarayıcı üzerinden [linuxdersleri.net/hesap/olmayan.css](http://linuxdersleri.net/hesap/olmayan.css) adresini ziyaret eder.

2- Web sunucusu böyle bir adres olmadığı için [linuxdersleri.net/hesap](http://linuxdersleri.net/hesap/olmayan.css) adresinin içeriğini döndürür. Ayrıca bu aşamada bu sayfanın aslında önbelleğe alınmaması talimatını veren HTTP başlıkları da sunucu tarafından HTTP yanıtında iletilir.

3- Reverse proxy kullanıldığı için bu yanıt öncelikle proxy’e iletilir.

4- Proxy adresin sonunda .css uzantısı olduğu için kendi konfigürasyonları gereği bu adresin önbelleğe alınması gerektiğine karar verir.  Bu aşamada HTTP yanıtında yer alan önbelleğe alınmaması belirtilen başlıklar görmezden gelinir.

5- Böylelikle aslında [linuxdersleri.net/hesap](http://linuxdersleri.net/hesap) adresinde kullanıcıya özel dinamik olarak üretilmiş olan veriler, [linuxdersleri.net/hesap/olmayan.css](http://linuxdersleri.net/hesap/olmayan.css) adresinde önbellek olarak saklanmış olur.

![web-cache-deception]({{ site.url }}/blog/img/web-cache-deception/web_cache_deception.png){:class="responsive img-zoomable"}

Tabii ki bu durumun yaşanması için aşağıdaki koşulların sağlanması gerekir.

1- Önbelleğe alan mekanizma üzerinde, yanıtta bulunan HTTP önbellek başlıklarını(`Cache-Control`, `expires`, `etag`, `Last-Modified` vb..) dikkate almıyor olması gerekir. 

2- Önbelleğe alınan verinin türüne bakılmaksızın önbelleğe alınmalı.

3- Web sunucusunun hatalı bağlantılara yanıt olarak geçerli ve kritik bilgi(csrf token veya kişisel veri vb..) barındıran sayfaların içeriğini döndürmesi gerekir.

Bu durumu çözmek için de:

1- Önbellekleme yapan mekanizma üzerinde; yalnızca URL uzantısında yer alan .css vb eklere değil, sunucu tarafından gelen HTTP yanıtında yer alan cache header yani önbellek başlıklarını dikkate alacak şekilde konfigürasyon yapılmalı.

2- Önbelleğe alınan veri içeriğinin gerçekten css veya örneğin png dosyası olup olmadığı kontrol edilebilir. 

3- Web sunucusunun [linuxdersleri.net/hesap/olmayan.css](http://linuxdersleri.net/hesap/olmayan.css) gibi sayfalar için bir önceki adres olan /hesap içeriğini döndürmeyecek şekilde yapılandırın. Bu gibi durumlarda 404 veya 302 ile standart zararsız yanıtların gönderilmesi gerekir.

Ortaya çıkması için gereken birden fazla hatalı konfigürasyonun olması gerektiği için, bu tür bir zafiyetin yaygın olduğunu söylemek doğru olmayabilir. Yine de anlatılanları pekiştirmek üzere somut bir örnek üzerinden gitmek için [buradaki](https://nokline.github.io/bugbounty/2024/02/04/ChatGPT-ATO.html){:target="_blank"} writeup’ı kısaca ele alabiliriz. 

# PoC | ChatGPT Account Takeover

Araştırmacı ChatGPT üzerinde bulunan “paylaşım” özelliği sayesinde mevcut mesajların URL üzerinden herkese açık şekilde paylaşılabildiğini ve bu URL adresinin önbelleğe kaydedildiğini(`Cf-Cache-Status: HIT` başlığı sayesinde) fark etmiş. 

Aşağıdaki URL statik bir içerik uzantısına(.css .png .js vb..) sahip olmamasına rağmen önbelleğe alındığını sunucu yanıtındaki CF-Cache-Status: HIT başlığından teyit etmiş.

```jsx
https://chat.openai.com/share/CHAT-UUID
```

Bu, muhtemelen dosyanın uzantısına değil, URL'nin yolundaki konumuna bağlı olan bir önbellek kuralının bulunduğu anlamına geliyor. Bu varsayımı test etmek için https://chat.openai.com/share/random-path-that-does-not-exist'i adresini kontrol etmiş ve beklendiği gibi bu adresin de önbelleğe alındığını görmüş.

Dolayısıyla önbelleğe alma kuralının **/share/*** gibi bir kurala bağlı olduğunu teyit etmiş. 

## Path Traversal Confusion

Önbellek mekanizmasını kullan websiteleri bu iş için genellikle CDN hizmetlerinden faydalanır. ChatGPT örneğinde de Cloudflare kullanıldığını HTTP yanıt mesajındaki `Cf-Cache-Status` başlığından öğrenebiliyoruz. Bu durumda girilen URL adresinin hem CDN hem de web sunucusu tarafında işleniyor. Dolayısıyla URL ayrıştırıcısı karışıklığına sebep olmak mümkün olabilir.

Mevcut ChatGPT örneğinde de URL encode edilmiş `/` karakteri yani `%2F` karakteri CDN tarafında decode edilmezken web sunucusu tarafında decode edilmiş. Dolayısıyla kritik öneme sahip api anahtarına giden yolun url encode şekilde sunucuya iletilerek önbelleğe alınmasını sağlamak mümkün olabilir.

 Örneğin aşağıdaki url adresinde / karakteri URL encode şekilde yazıldığında:

```jsx
https://chat.openai.com/share/%2F..%2Fapi/auth/session?cachebuster=123
```

- CDN /share/ dizini altındaki her şeyi önbelleğe aldığını biliyoruz
- CDN’in `%2F..%2F` karakterlerini decode etmediğini dolayısıyla bu şekilde önbelleğe alınacağını biliyoruz.
- Web sunucusuna CDN tarafından iletilen bu `/share/%2F..%2Fapi/auth/session?cachebuster=123` adresi decode edilip, `/auth/session?cachebuster=123` olarak ele alınacak.

Dolayısıyla https://chat.openai.com/share/%2F..%2Fapi/auth/session?cachebuster=123 adresini ziyaret eden kullanıcının api bilgisi önbelleğe kaydedilecek. Daha sonra aynı URL adresini ziyaret eden saldırgan bu önbellek yanıtı sayesinde api bilgisini elde etmiş olacak.

![Chat-GPT-Attack]({{ site.url }}/blog/img/web-cache-deception/ChatGPT_Attack.svg){:class="responsive img-zoomable"}
[Resim kaynağı](https://nokline.github.io/bugbounty/2024/02/04/ChatGPT-ATO.html){:target="_blank"}

Neticede kısaca ele aldığımız gibi Web Cache Deception eğer şartlar müsaitse fevkalade tehlikeli bir zafiyet. 

# İleri Okuma

[https://omergil.blogspot.com/2017/02/web-cache-deception-attack.html](https://omergil.blogspot.com/2017/02/web-cache-deception-attack.html){:target="_blank"}

[https://nokline.github.io/bugbounty/2024/02/04/ChatGPT-ATO.html](https://nokline.github.io/bugbounty/2024/02/04/ChatGPT-ATO.html){:target="_blank"}