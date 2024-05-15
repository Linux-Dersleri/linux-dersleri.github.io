---
sitemap: true
layout: b-post
title:  "X-Forwarded-For Nedir ve Ona Ne Zaman Güvenebiliriz ?"
modified:
author: Taylan Özgür Bildik
tags: [http]
categories: blog 
cover: x-forwarded-host-usage-example.png
permalink: /:title
toc: true
---


HTTP istekleri çoğu durumda, nihai hedefine ulaşmadan önce birden fazla altyapı katmanından geçer. Bu sebeple isteği gerçekleştirilen asıl “istemci” bilgisinin nihai hedefteki sunucuya ulaştırılabilmesi için `X-Forwarded-For` başlığı kullanılabilir. Hemen basit bir örnek üzerinden açıklayalım.

![standart-http-request]({{ site.url }}\blog\img\x-forwarded-for\standart-http-request.png){:class="responsive img-zoomable"}

Bu örnekte, backend uygulamasına(app server) ulaşan http istediğinde orijinal istemcinin IP adresi çoktan yok olmuştur. Bu duruma çözüm olarak `X-Forwarded-For` başlığını kullanabiliriz. 

![http-request-with-x-forwarded-for]({{ site.url }}\blog\img\x-forwarded-for\http-request-with-x-forwarded-for.png){:class="responsive img-zoomable"}

HTTP isteğinin geçtiği her bir proxy yani aslında her bir “hop” ilgili isteğin kimden geldiğini `X-Forwarded-For` başlığına sırasıyla ekleyip bir sonraki “hop” a aktarır. Örnek durumda `XFF` başlığı aşağıdaki gibidir.

```jsx
X-Forwarded-For: 156.11.33.44, 110.30.10.101
```

IP adresleri, HTTP isteğinin geçtiği sunucuların sırasına göre soldan sağa doğru ekleniyor. Diğer bir deyişle proxy’ler aslında `X-Forwarded-For` başlığı ile “*ben bu istediği XXX ip adresi adına sana iletiyorum*” dermişçesine bir sonraki proxy’e iletiyor. Bu sayede **isteklerin hangi kaynaklardan geldiğini anlamak** mümkün oluyor. 

Bu bilgi, hedef sunucunun, gelen isteklerin kaynağını doğru bir şekilde tanımlamasına yardımcı olur. Özellikle yük dengeleme, güvenlik duvarları, istemci IP tabanlı erişim kontrolü ve istatistiksel amaçlar gibi senaryolarda **`X-Forwarded-For`** başlığı kullanılabiliyor.

# Peki `X-Forwarded-For`’a Güvenebilir Miyiz ?

Esasen kullanıcılardan gelen hiç bir girdiye körü körüne güvenemeyiz. Buna `XFF` gibi başlıklar da dahil elbette.

Örneğin bir isteğin, güvenli olarak kabul edilen şirket VPN’i veya şirket IP’si üzerinden geliyormuş gibi gösterilmesi mümkündür. Bu sebeple `XFF` başlığındaki IP adreslerinin kesin doğru bilgi içerdiği asla kabul edilmemeli. 

![x-forwarded-for-ip-spoofing]({{ site.url }}\blog\img\x-forwarded-for\x-forwarded-for-ip-spoofing.png){:class="responsive img-zoomable"}

Yukarıdaki gibi bir durumda, client 1.1.1.1 değerine sahip `XFF` başlığını içeren bir istek gönderiyor. Backend uygulaması, bu isteğin gerçekten istemcinin gerçek IP adresi olup olmadığını bilemez. Bu yüzden bunu görmezden gelmeli ve CDN altyapı hizmetimizin gördüğü istemci adresini (156.11.33.44) gerçek kaynak IP olarak ele almalıdır. Bu örnekte CDN servisi, kendisine gerçekleştirilen isteğin hangi ip adresinden geldiğini gördüğü için bunun bilgisini verebilir. 

`X-Forwarded-For` başlığı üzerinde bir miktar kontrol kazanmanın bir yolu, güvenilir bir reverse proxy dahil etmek ve bu proxy dışında backend sunucusuna ve diğer proxy'lere/sunuculara/load balancer’lara ağ düzeyinde doğrudan erişimi devre dışı bırakmaktır. API geliştiricileri için bu genellikle bir API Getway tarafından gerçekleştirilir, ancak Fastly, Squid Proxy, Cloudflare vb. gibi bir CDN de olabilir. İstek güvenilir bir proxy aracılığıyla geliyorsa ve bu reverse proxy'nin kendisi saldırıya uğramamışsa, muhtemelen gördüğünüz IP zincirinin en azından bir kısmına inanma konusunda sorun yaşamazsınız. Ama bu ip zincirinin hangi kısmına güvenebiliriz ?

Temelde, güvenilir ve kontrol edilebilir proxy’den önceki tüm ip adreslerine şüpheyle yaklaşılmalı. Bunu sağlamak için, reverse proxy seviyesinde başlıkların(header) nasıl oluşturulduğunu değiştiren kararlar alabilirsiniz. Örneğin, nginx, `X-Forwarded-For` başlığını tamamen geçersiz kılabilir, istemcinin sağladığı her şeyi görmezden gelebilir ve onu gördüğü gerçek IP adresiyle değiştirebilir. Tüm istekler nginx üzerinden gelirse, bu, altyapınızın etrafına etkili bir şekilde bir çizgi çizer ve dışarıdan alınan tüm güvenilmeyen değerleri bırakarak altyapınızdaki diğer tüm hizmetlerin bu başlığa güvenmesine olanak tanır. Bunun için nginix’te aşağıdaki konfigürasyon tanımlanabilir 

```jsx
proxy_set_header X-Forwarded-For $remote_addr;
```

Bu konfigürasyon, XFF başlığını client’ın gerçek IP adresiyle değiştirir ve client tarafından gelenleri görmezden gelir. Bu sayede bu IP adresine güvenebilirsiniz.

Eğer altyapının tek bir giriş noktası yoksa yani birden fazla proxy varsa, bu durumda backend uygulamasının gelen değerleri işleyip temizlemesi ve gerçek IP adresine göre işlem yapmasını sağlayabilirsiniz. Yine de bu işlem isteklerin güvenle ele alındığının garanti edilmesi için zor bir yol.

Client tarafından gönderilen `XFF` isteğini koruyup, isteğin geldiği gerçek ip adresini de eklemek için nginx üzerinde aşağıdaki konfigürasyon tanımlanabilir. 

```jsx
proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
```

Eğer Nginx sunucunuz bir dizi proxy sunucusu arasında yer alıyorsa ve her bir proxy sunucusunun IP adresi korunmalıysa, **`$proxy_add_x_forwarded_for`** kullanmak daha uygundur. Bu şekilde, mevcut **`X-Forwarded-For`** başlığına eklenen yeni IP adresleri zinciri oluşturulur. 

Bu isteğin backend tarafından doğru şekilde ele alınması fevkalade önemli tabii.

# `X-Forwarded-Host` ?

`X-Forwarded-Host`: HTTP isteği iletilirken, arada load balancer gibi bir proxy bulunan bağlantılarda, istemcinin ana hedef sunucuyu belirtmesini sağlamak için kullanılır. Birden fazla kullanım nedeni olabilir fakat bir örnek vermek gerekirse:

Virtual hosting ile birden fazla hostun barındırıldığı bir uygulama sunucusu düşünelim. Bu hostlar “internal network” yani yalnızca “iç ağ” üzerinden erişilebilir olsun. Bu hostlara erişmek için de “internet” ile “internal” network arasında reverse proxy, load balancer ya da bir CDN servisi olsun. Bu durumda eğer internet üzerindeki bir kullanıcı, iç ağda(internal network) bulunan bir hosta istek gönderirse, bu istek reverse proxy’nin bulunduğu ip adresine çözümlenecek. Yani yapı gereği tüm hostların önünde bu reverse proxy durduğu için istek öncelikle mecburen bu reverse proxy’e ulaştırılacak. Reverse proxy de internal network’de bulunan bu host’u bulup, isteği ilgili host’a iletecek. Bunu yaparken, reverse proxy `Host` başlığını internal network’deki host ile değiştirip, kullanıcı tarafından belirtilen host bilgisini ise `X-Forwarded-Host` başlığı ile yine iletir. Bu sayede, hedefteki host’ta yer alan web uygulaması, kullanıcının hangi host’a erişmek istediğini anlayıp uygun şekilde işlem yapabilir. Örneğin kayıt tutabilir ya da farklı bir yönlendirme yapısı varsa bu host bilgisine uygun şekilde yönlendirme de gerçekleştirebilir. 

![x-forwarded-host-usage-example]({{ site.url }}\blog\img\x-forwarded-for\x-forwarded-host-usage-example.png){:class="responsive img-zoomable"}

Özetle, `X-Forwarded-Host` bilgisi, istemcinin orijinal host hedefini koruyarak nihai hedef sunucuya ulaştırmak için kullanılan bir başlıktır. Bu bilgi ihtiyaca yönelik olarak pek çok farklı amaçla kullanılabilir.

Ayrıca hedef sunucuya protokol ve port bilgisini iletmek için de `X-Forwarded-Proto` ve  `X-Forwarded-Port` başlıkları da kullanılabilir. 

# Alternatifler ve Standartlar

`X-Forwarded-*` ile başlayan başlıklar esasen “de facto” başlıklardır. Bu sebeple standartlaşması adına çeşitli başlıklar tanımlanmıştır.

**de facto**: resmi olmamakla birlikte fiilen devam eden, süregelen anlamına gelmektedir.

## `Forwarded` Başlığı

`X-Forwarded-*` başlıkları yaygın kullanımına karşın aslında şaşırtıcı biçimde resmi bir standart değildir. Yani IETF gibi bir oluşum tarafından standart olarak tanımlanmamıştır. Popüler olmasına ve genellikle uyumluluk sorunları yaşanmamasına rağmen, bu başlıklar yerine [RFC 7239](https://datatracker.ietf.org/doc/html/rfc7239): 2014'te `Forwarded` başlığı tanımlanmıştır. 

Kullanım örneği için aşağıdaki resimde olduğu gibi bir durumu ele alırsak, uygulama sunucusuna ulaşan istekteki `Forwarded` başlığı şu şekilde olurdu.

![forwarded-header-example]({{ site.url }}\blog\img\x-forwarded-for\forwarded-header-example.png){:class="responsive img-zoomable"}

Eğer ipv6 adresleri belirtilecekse köşeli parantez içinde belirtiliyor.

```jsx
X-Forwarded-For: 192.0.2.43, 2001:db8:cafe::17
Forwarded: for=192.0.2.43, for="[2001:db8:cafe::17]"
```

Örneğin nginx'in [önerdiği](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/) gibi, `Forwarded` ile istemciye yönelik güvenilir proxy'niz kendisini tanımlamak için “secret token” içerebilir:

```jsx
Forwarded: for=12.34.56.78, for=23.45.67.89;secret=egah2CGj55fSJFs, for=10.1.2.3
```

Bu sayede yalnızca gerçekten ilgili proxy tarafından eklenebilecek bir “gizli” token ile bu isteğin zararlı olmadığını teyit etmek mümkün olabilir.

Üstelik gelecekte eklenebilecek yeni direktiflere ek olarak `by` `for` `host` `proto` gibi [direktifler](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded) ile özelleşmiş istekler oluşturmak mümkün. 

Kısaca buradaki direktifleri açıklayacak olursak:

- `by` : isteğin nereden geldiğinin bilgisi: Yani ilgili istediğin doğrudan kaynağı.
    - `hidden` veya `secret` gibi bir doğrulama tokeni ile doğrulama işleminde kullanılır
    - ip adresini belirtir( v4 veya v6, isteğe bağlı olarak port belirtilebilir ayrıca ipv6 [köşeli parantez] içinde olmalıdır.
    - Kaynak bilinmediğinde `unknown` şeklinde de belirtilebilir.
- `for` : Bu isteğin kim veya sırasıyla kimler için yapıldığının bir bilgisidir. Yani `X-Forwarded-For` başlığı yerine kullanılabilir.
- `host` proxy tarafından alınan `Host` header bilgisidir. `X-Forwarded-Host` ile benzer amaçlar için kullanılabilir.
- `proto` : İstekte bulunmak için hangi protokolün kullanıldığını belirtir (genellikle "http" veya "https").

Örnekler:

```jsx
Forwarded: for="_mdn"

# Küçük büyük harf duyarsızdır
Forwarded: For="[2001:db8:cafe::17]:4711"

# noktalı virgül ile birbirinden ayrılır
Forwarded: for=192.0.2.60;proto=http;by=203.0.113.43, host=example.com

# Birden fazla proxyden gelen değerler virgül kullanılarak eklenebilir
Forwarded: for=192.0.2.43, for=198.51.100.17

```

Tek bir `Forwared` ile belirtilebilecek metaveriler ayrı ayrı `X-Forwarded-For` `X-Forwarded-Host` `X-Forwarded-Proto` başlıkları ile belirtiliyordu. `Forwared` bunu daha basitleştirmiş oldu.

## `Via` Başlığı

İsteğin kimin üzerinden geldiğinin bilgisini verir. Üstelik protokol ve sürüm bilgileri de yer alır. Bu sayede isteğin HTTP/2'den 1.1'e veya HTTPS'den HTTP'ye düşürülüp düşürülmediğini gibi bilgileri edinmek de mümkün olur. Ayrıca hangi yazılım ve sürümün kullandığı gibi bazı ek bilgiler de sunulabileceği için `X-Forwarded-For` ve `Forwarded` başlıklarından farklı olarak daha çok bilgi/hata ayıklama veya bilgi verme amaçlı kullanılır. 

Örneğin:

```makefile
Via: 1.1 proxy1.example.com (Apache/2.2.22)
```

Bu başlık, HTTP/1.1 isteğinin proxy1.example.com adlı bir proxy sunucusundan geçtiğini ve bu proxy sunucusunun Apache/2.2.22 sürümü olduğunu belirtir.

Birden fazla proxy sunucusu varsa, her biri sırayla listelenir:

```makefile
Via: 1.1 proxy1.example.com, 1.1 proxy2.example.com
```

Bu örnekte, HTTP/1.1 istekleri önce proxy1.example.com'dan geçer, ardından proxy2.example.com'dan geçer.

## Diğer Başlıklar

Benzer amaçlarla kullanılan standart olmayan diğer başlıklardan da kısaca söz edebiliriz.

`X-Real-IP`: kesin bir standart yaklaşım olmamakla birlikte genellikle sunucuya isteği ileten ip adresini belirtmek için kullanılır. Tıpkı `Forwarded` başlığının `by` direktifi gibi kullanılabiliyor. Örneğin nginx için aşağıdaki şekilde bir konfigürasyon tanımlaması yapılır.

```jsx
proxy_set_header X-Real-IP $remote_addr;
```

Yukarıdaki tanımlama sayesinde nginx sunucuya istekte bulunan istemcinin gerçek ip adresi `X-Real-IP` olarak tutulacaktır. 

Ama bu konuda standart bir yaklaşım olmadığı için kimi sunucular `X-Forwarded-For` yerine aynı amaçla `X-Real-IP` kullanabiliyor. RFC kılavuzlarında standart hale getirilmeyen tüm başlıklar için farklı kullanım senaryoları ile karşılaşmak kaçınılmaz. 

---

`CF-Connecting-IP`: Cloudflare, istekleri kendisine yönlendirirken, gerçek istemci IP adresini **`CF-Connecting-IP`** başlığına ekler ve bu şekilde hedef sunucu, isteğin asıl kaynağını doğru bir şekilde belirleyebilir.

---

`Ali-CDN-Real-IP` : Bu başlık, Alibaba Cloud CDN'inin arkasındaki web sunucusunda, isteğin nereden geldiğini yani istemcinin gerçek IP adresini doğru bir şekilde belirlemek için kullanılır.

---

`X-NF-Client-Connection-IP` : istemcinin gerçek IP adresini almak için Netlify’ın kullandığı başlıktır. Ayrıca http istekleri içinde `XFF` ve diğer başlıklar olsa bile bunlar Netlify tarafından desteklenmediği için dikkate alınmaz.

---

`X-Vercel-Forwarded-For` : `XFF` başlığının Vercel tarafında kullanılan versiyonudur. Bu başlık, isteğin Vercel'in sunucularına ulaşırken geçtiği proxy sunucularını ve gerçek istemci IP adresini içerir.

Örneğin, bir istemci Vercel'in sunucularına bir istek gönderdiğinde ve bu istek bir proxy sunucusu üzerinden geçiyorsa, bu başlık şu şekilde olabilir:

```makefile
X-Vercel-Forwarded-For: 203.0.113.195, 198.51.100.17
```

Bu, isteğin orijinal istemci IP'si 203.0.113.195 olduğunu ve bu isteğin proxy sunucuları aracılığıyla geçtiğini gösterir. En son IP adresi (**`198.51.100.17`**) genellikle Vercel'in sunucusunun IP adresini içerir.

---

`X-Vercel-IP-{…} :` Bu başlık, Vercel'in sunucuları aracılığıyla iletilen isteklerde, isteğin gerçek istemci IP adresini içerir. Bu başlık, genellikle "X-Vercel-IP" başlığı altında tek bir IP adresi ile gelir, ancak bazen bir dizi başlık ("X-Vercel-IP-1", "X-Vercel-IP-2", vb.) şeklinde de olabilir.

```jsx
X-Vercel-IP: 203.0.113.195
```

```jsx
X-Vercel-IP-1: 203.0.113.195
X-Vercel-IP-2: 198.51.100.17
```

---

**`Cache-Status`**, **`X-Cache-Status`**, **`X-Served-By`, `X-Cache-Hits`**

Bu başlıklar, sunucudan istemciye gönderilen yanıtlardaki başlıklardır. Bu başlıklar, web sunucusu ve önbellek(cache) sistemi tarafından sağlanan istatistikleri ve isteğin işlenme durumunu belirlemek için kullanıyor. Yani verilen yanıt önbellekten mi döndürülüyor eğer öyleyse ne kadar ve ne şekilde önbellekte tutulacak gibi bilgiler sunuluyor.

1. **`Cache-Status`**: Bu başlık, bir sunucunun isteği önbelleğe alıp almadığını veya isteğin nasıl işlendiğini belirtir. Sunucu yanıtının durumunu ifade eder.
    
    Örneğin:
    
    ```makefile
    Cache-Status: MISS
    ```
    
    Bu, isteğin önbellekte bulunmadığını ve sunucunun orijinal içeriği döndürdüğünü gösterir. "MISS", önbelleğe alınmamış bir isteği belirtir. 
    
    Diğer olası değerler arasında "HIT" (içerik önbelleğe alındı ve doğrudan önbellekten alındı) ve "EXPIRED" (önbellekteki içerik zaman aşımına uğradı) bulunur.
    
2. **`X-Cache-Status`**: Bu başlık da önbellek durumunu belirtir, ancak genellikle bir proxy sunucusu veya bir CDN tarafından eklenir.
    
    Örneğin:
    
    ```makefile
    X-Cache-Status: MISS
    ```
    
    Bu, isteğin önbellekte bulunmadığını ve sunucunun orijinal içeriği geri döndürdüğünü gösterir. HIT ve EXPIRED de yukarıdaki şekilde aynı anlama gelir.
    
3. **`X-Served-By`**: Bu başlık, isteğin işlendiği sunucunun adını veya IP adresini belirtir. Özellikle, bir yük dengeleyici veya bir proxy sunucusu tarafından eklenir.
    
    Örneğin:
    
    ```makefile
    X-Served-By: cache-sea4481-SEA
    ```
    
    Bu, isteğin "cache-sea4481-SEA" adlı bir sunucu tarafından işlendiğini gösterir.
    
4. **`X-Cache-Hits`**, bir HTTP başlığıdır ve genellikle bir proxy sunucusu veya bir önbellek sistemi tarafından eklenir. Bu başlık, belirli bir içeriğin önbelleğe alındığı ve önbellekteki içeriğin kaç kez kullanıldığını belirtir.
    
    Örneğin:
    
    ```makefile
    X-Cache-Hits: 3
    ```
    
    Bu, istenen içeriğin önbellekte bulunduğunu ve bu içeriğin toplamda 3 kez önbellekten alındığını gösterir.
    

Daha fazla detay için [göz atabilirsiniz](https://httptoolkit.com/blog/status-targeted-caching-headers/).

# Olası Tehlikeler Üzerine

HTTP başlıklarının kötüye kullanımlarına dair notlar.

## Arbitrary Code Execution

Şimdiye kadar bahsetmiş olduğumuz sahte ip adreslerinin ötesinde aslında doğrudan zararlı kod çalıştırmak da mümkün olabilir.

Eğer saldırganlar tarafından, hedefteki teknolojik altyapı biliyor veya tahmin edilebiliyorsa ve kullanıcı girdileri düzgün şekilde ele alınıp temizlenmiyorsa log kayıtlarını tutan servisler gibi harici servisler üzerinden zararlı kod yürütme mümkün olabilir. Bu duruma örnek olarak Log4Shell olarak bilinen CVE-2021-44228 zafiyetini düşünebiliriz. 

 Şöyle bir girdi olduğunu düşünebilirsiniz

```jsx
X-Forwarded-For: 1.2.3.4,${zararlı-kod()},2.2.2.2,28.178.124.142,198.40.10.101
```

Bu tür zafiyetlerin önüne geçmek için her türlü girdiyi doğrulamak gerek. Örneğin uygun uzunlukta olmayan veya ip adresi formatında olmayan girdilerin kontrolü yapılabilir. 

## HTTP Request Smuggling

Backend sunucusu önünde duran sunucular, istekleri backend’e iletmeden önce bazı başlıklar eklerler. Bunlardan biri de `XFF` başlığı olabilir. HTTP Request Smuggling saldırısı ile bu başlığı manipüle ederek normalde erişilemeyecek kaynaklara erişmek mümkün olabilir. 

[Request Smuggling](https://portswigger.net/web-security/request-smuggling/exploiting)

<p class="mavi"><strong>ℹ️ Not:</strong> Olası tehlikeler hakkında ileride güncelleme ile daha detaylı bir açıklama eklenebilir.</p>

## Kaynakça ve İleri Okuma

- [What is XFF](https://httptoolkit.com/blog/what-is-x-forwarded-for/)
- [RFC 7239: Forwarded HTTP Extension](https://datatracker.ietf.org/doc/html/rfc7239)
- [MDN Web Docs: X-Forwarded-For](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Forwarded-For)
- [MDN Web Docs: Forwarded](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Forwarded)
- [Using Forwarded in NGINX](https://www.nginx.com/resources/wiki/start/topics/examples/forwarded/)
- [Cloudflare Fundamentals: HTTP request headers](https://developers.cloudflare.com/fundamentals/reference/http-request-headers/)
- [Derinlemesine Nginx](https://github.com/muratcabuk/derinlemesine-nginx/blob/master/1.reverse-proxy.md)
- [Real Life Usage Of XFH](https://stackoverflow.com/questions/19084340/real-life-usage-of-the-x-forwarded-host-header)
- [X-Forwarded-Host](https://www.keycdn.com/support/x-forwarded-host)
- [Host Header Vulnerabilities](https://portswigger.net/web-security/host-header/exploiting#how-to-test-for-vulnerabilities-using-the-http-host-header)
