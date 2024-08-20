---
sitemap: true
layout: b-post
title:  "HTTP hop-by-hop Başlıklarının Kötüye Kullanımı"
modified:
author: Taylan Özgür Bildik
tags: [network, http, web, güvenlik]
categories: blog 
cover: http-hop-by-hop-kotuye-kullanim-cover.png
permalink: /:title
toc: true
---

Buradaki anlatımların netleşmesi için temelde HTTP/1 ve HTTP/2 protokollerinin nasıl çalıştığını bilmek faydalı olabilir. 

# hop-by-hop Header Nedir ?

"hop-by-hop" başlık(header), bir HTTP isteğinin veya yanıtın yalnızca bir hop (sunucu veya istemci) üzerinde geçerli olduğu anlamına gelir. Bu başlıklar, istek veya yanıtın yalnızca bir ağ noktasından diğerine iletilmesi gereken bilgileri içerir. 

![hop-by-hop]({{ site.url }}/blog/img/http-hop-by-hop-kotuye-kullanim/hop-by-hop.png){:class="responsive img-zoomable"}

end-to-end header olarak geçen istek veya yanıtlarda ise başlıklar baştan sonra aynı kalır.

![end-to-end]({{ site.url }}/blog/img/http-hop-by-hop-kotuye-kullanim/end-to-end.png){:class="responsive img-zoomable"}

HTTP/1.1, [RFC 2612](https://tools.ietf.org/html/rfc2616#section-13.5.1) gereği `Keep-Alive`, `Transfer-Encoding`, `TE`, `Connection`, `Trailer`, `Upgrade`, `Proxy-Authorization` ve  `Proxy-Authenticate` başlıklarını varsayılan olarak hop-by-hop başlıklar olarak kabul ediyor. Ayrıca ek başlıklar, `Connection` başlığı aracılığıyla hop-by-hop olarak belirtilebiliyor.  Dolayısıyla HTTP/1.1 uyumlu bir proxy bu başlıkları içeren bir istek aldığında, başlığın gerektirdiği işlemi uygulayıp bu başlıkları bir sonraki “hop” yani atlama noktası olan proxy’e **iletmemesi** gerekiyor. 

```jsx
Connection: close, test1, test2
```

Yukarıdaki başlığı alan proxy, `test1` ve `test2` değerlerini hop-by-hop olarak ele aldığı için bir sonraki noktaya iletmeden önce bunları kaldırıyor. **HTTP/1.1 de mevcut olan bu özellik** sayesinde özelleştirilmiş hop-by-hop başlıklar oluşturabiliyoruz.

# Hop-by-hop Başlıklarının Kötüye Kullanımı

HTTP isteklerinde başlıkları kaldırmak her zaman sorun teşkil etmese de, orijinal istekte bulunmayan ancak zincirdeki başka bir proxy tarafından eklenen başlıkları kaldırabilmek öngörülemeyen sonuçlar yaratabilir. 

Örneğin eğer backend, aradaki proxy tarafından eklenen `X-Important` gibi bir başlığını bekleyip bu başlığa göre bir karar veriyorsa hop-by-hop başlığının kötüye kullanımı sorun yaratabilir.

![abuse-hop-by-hop]({{ site.url }}/blog/img/http-hop-by-hop-kotuye-kullanim/abuse-hop-by-hop.png){:class="responsive img-zoomable"}

Not: Tüm proxy’lerin `Connection` başlığına tepkileri aynı olmayabilir. Aradaki proxy `Connection` başlığına dokumadan bir sonraki noktaya da iletebilir. Bu durum, kullanılan teknolojilere bağlı farklı yorumlama-ele alınış sebebiyle gerçekleşebilir.

# Hop-by-hop Başlıklarının Kötüye Kullanımını Test Etme

Test etmek için mevcut ve mevcut olmadığında yanıtta gözle görülür bir fark yaratan bir başlığı `Connection` ile hop-by-hop başlık olarak ekleyip yanıttaki farkı gözlemleyebiliriz. 

Örneğin `Cookie` başlığı olmadığında yetki hatası döndürülüyorsa, `Cookie` başlığını `Connection` başlığında belirterek hop-by-hop başlığı olarak ele alınmasını sağlayın. Eğer yanıt olarak yetki hatası alırsanız, hop-by-hop olarak kabul edildiğini teyit etmiş olursunuz.

Cookie başlığı olan standart istek:

```jsx
GET /api/me HTTP/1.1
Host: foo.bar
Cookie: session=xxx
```

Yanıt:

```jsx
HTTP/1.1 200 OK
```

`Cookie` başlığı olmayan standart  istek:

```jsx
GET /api/me HTTP/1.1
Host: foo.bar
```

Yanıt:

```jsx
HTTP/1.1 403 Forbidden
```

Hop-by-hop testi:

İstek:

```jsx
GET /api/me HTTP/1.1
Host: foo.bar
Cookie: session=xxx
Connection: close, Cookie
```

Yanıt:

```jsx
HTTP/1.1 403 Forbidden
```

Gördüğünüz gibi `Cookie` başlığı olmadığında aldığımız yanıtta olduğu gibi erişim yetkisi hatası aldık. Çünkü `Connection` başlığı hop-by-hop kabul edilip aradaki proxy tarafından `Cookie` değeri silindiği için nihai sunucuya bu başlık iletilmedi.

![abuse-hop-by-hop-testing]({{ site.url }}/blog/img/http-hop-by-hop-kotuye-kullanim/abuse-hop-by-hop-testing.png){:class="responsive img-zoomable"}

Ayrıca Burp Intruder veya [buradaki script](https://gist.github.com/ndavison/298d11b3a77b97c908d63a345d3c624d) yardımıyla [buradaki](https://github.com/danielmiessler/SecLists/blob/master/Discovery/Web-Content/BurpSuite-ParamMiner/lowercase-headers) gibi bir başlık listesini kullanarak, orijinal istekte mevcut olmasa bile hangi başlıkların hop-by-hop olarak etkilendiğini gözlemleyebilirsiniz. 

Örneğin ilgili scripti kullanmak için, bash kabuğunda aşağıdaki komutu girebilirsiniz:

```jsx
for HEADER in $(cat headers.txt); do python poison-test.py -u "https://target" -x "$HEADER"; sleep 1; done
```

Bu komut, başlık listesindeki tüm başlıkları sırasıyla hop-by-hop olarak ekleyip başlıkların farklı bir durum kodu veya yanıt gövdesi boyutu oluşturup oluşturmadığını size bildirecektir. Bu sayede orijinal istekte olmasa bile hop-by-hop olarak ele alınan başlıkları keşfetmeniz mümkün olabilir. 

Temel kavramlar ve tespiti için gereken yaklaşımdan bahsettiğimize göre bu tekniğin kullanılabileceği bazı alanlarından bahsederek devam edebiliriz. 

# X-Forwarded-For'u Gizleyerek Kaynak IP Adresini Maskeleme

Bir frontend proxy'si bir kullanıcı isteğini kabul ettiğinde, bu kullanıcının IP adresini `X-Forwarded-For` (`XFF`) başlığına ekleyebilir, böylece backend’deki altyapı ve uygulamalar istekte bulunan kullanıcının IP adresini bilebilir. Ancak proxy'lere bu başlığın hop-by-hop olduğu talimatını vererek, bu başlığı istekten kaldırabiliriz. Bu sayede backend uygulaması orijinal IP adresini bilemez.

İstekte zaten mevcut değilse, isteği gerçekleştiren IP adresini `XFF` başlığı ile uygulama sunucusuna aktaran bir load balancer proxy’nin bulunduğu durumda:

Örnek olarak, CDN > load balancer > app server durumundaki yapıyı düşünelim. Bu uygulama CDN arkasındaki load balancer’a güvendiği için doğrudan bu load balancer’dan gelen yerel bir IP aralığından (örneğin 10.1.2.3/24 gibi) gelen bir istekle karşılaşıldığında isteklere özel /admin adresine admin yetkisi tanıyor olsun. 

Güvenilir bir load balancer'ın arkasında olduğu için uygulama, saldırgan `X-Forwarded-For` sahteciliği yapmaya çalışsa bile, CDN’in gerçek kaynak IP'yi başlığa ekleyeceğine güvenebilir. Gerçek IP adresinin nasıl eklenebileceği, kullanılan proxy çözümüne bağlı olarak değişebilir lakin buradaki [XFF]({{ site.url }}/x-forwared-for) yazısı yardımcı olabilir. En nihayetinde istek `X-Forwarded-For:<saldırgan sahte ip>, <gerçek saldırgan ip>` gibi görünür, böylece uygulama sahtecilik girişimlerini güvenle halledebilir. Ancak, `XFF` başlığı uygulamaya ulaşmadan önce çıkarılıyorsa, ki bu bir saldırganın `XFF`'yi hop-by-hop başlığı olarak eklemesi durumunda söz konusu olabilir, o zaman bir load balancer proxy  `X-Forwarded-For`'un yokluğuna, kendisinden önceki yük dengeleyicinin IP adresini talep eden IP (örn. 10.1.2.3) olarak alarak tepki verecek ve uygulamaya ulaşan son `X-Forwarded-For` değeri, başka hiçbir şey eklenmeden 10.1.2.3 olacaktır. Böyle bir uygulamada, bu istek **/admin** adresine erişim izni verecektir çünkü bu yerel bir adrestir.

![abuse-hop-by-hop-hide-ip]({{ site.url }}/blog/img/http-hop-by-hop-kotuye-kullanim/abuse-hop-by-hop-hide-ip.png){:class="responsive img-zoomable"}

Ayrıca `XFF` yerine isteğin IP kaynağını belirtmek için   `Forwarded`, `X-Real-IP` gibi başlıklar da kullanılabilir. 

# Cache poisoning DoS

Eğer önbellek sunucusu, kendisine iletilen hop-by-hop başlığına dokunmadan bunu bir sonraki proxy’e yönlendirirse ve bu proxy de bu başlığı işleyip kaldırırsa ve bu durum 400 veya 501 gibi bir hataya sebep olursa: bu, uygulamanın önündeki web önbelleğinin, bu istenmeyen yanıtı diğer kullanıcılara hizmet verecek kopya olarak kabul etmeyi seçmesine neden olabilir ve bu nedenle, önbellek zehirlenmesi DoS ile karşı karşıya kalırız.

![abuse-hop-by-hop-cache-poisoning-dos]({{ site.url }}/blog/img/http-hop-by-hop-kotuye-kullanim/abuse-hop-by-hop-cache-poisoning-dos.png){:class="responsive img-zoomable"}

# Rate Limit Bypass

Ayrıca kimi durumlarda `X-Forwarded-For` başlığı sayesinde istemcinin IP adresine bakarak rate limit uygulayan yapıları sahte `X-Forwarded-For` başlığı ile bypass etmek mümkün olabilir. Her istekte sahte bir IP adresi ile neredeyse sınırsız sayıda istek göndermek mümkün olabilir.

Kaynakça:

- [Abusing HTTP hop-by-hop request headers](https://nathandavison.com/blog/abusing-http-hop-by-hop-request-headers){:target="_blank"}