---
layout: tutorial
title:  "OSI TCP/IP Modeli"
modified: 2023-05-20
author: Taylan Özgür Bildik
coursetitle: "Temel Ağ Eğitimi"
excerpt: "OSI ve TCP/IP modellerini ele alarak ağın temel çalışma yapısına daha yakından bakıyoruz."
tags: [tcp, udp,]
categories: [temel-network]
tutorial: 3
cover: osi-tcp-ip-modelcover.webp
toc: true 
---


# OSI Modeli

Ağların temel amacı cihazların birbiri ile veri paylaşabilmesini sağlayabilmek. Bunun için ağ üzerindeki tüm yapıların ortak bir “protokol” ile iletişim kurabiliyor olması gerek. 

Burada bahsi geçen “**protokol**” kelimesi aslında “**ortak iletişim yöntemi**”ni temsil eden bir kavram. Gerçek dünyadan bir örnek verecek olursak, iki insanın birbiri ile iletişim kurabilmesi için her ikisinin de aynı dili biliyor olması gerek. Örneğin ben Türkçe konuştuğumda karşı tarafın beni anlaması için onun da Türkçe bilmesi gerek. Çünkü Türkçe’nin kendi içinde pek çok kuralı var. Bu kuralları bilmeyen kişiler bu dili anlayıp iletişime dahil olamazlar. Bu örnekteki protokol, karşılıklı olarak iletişim kurmamızı sağlayan Türkçe dilidir. Bu dili bilen herkes birbiri ile haberleşebilir. 

Söz konusu “ağ” olduğunda da, benzer şekilde cihazların birbiri ile iletişim kurabilmesi için takip etmesi gereken kurallar yani çeşitli protokoller vardır. Bunlar da “**OSI Model**” olarak tek bir çatı altında toplanıp standart kabul edilmiş kurallardır. Bu kuralları kabul eden ve uygulayan tüm cihazları birbiri ile haberleştirmek mümkün. Yani örneğin Windows sistemi ile Linux sistemi birbiri ile haberleşebilir ya da X marka bir ağ kartı Y marka bir ağ kartıyla veri alışverişinde bulunabilir. Çünkü OSI modeline uyan tüm cihazlar iletişim için gereken kuralları bilir ve protokole uygun hareket ederler. 

OSI modelinde 7 katman bulunuyor. Bu katmanların her biri veri iletişimi sürecindeki belirli görevleri ve kuralları tanımlıyor. Biz sırasıyla her katmadan kısaca bahsedeceğiz. 

Anlatımlara geçmeden önce buradaki anlatımların amacının OSI modelini ezberlemek olmadığının belirtmek istiyorum. Tek amacımız ileride tekrar tekrar göreceğimiz bu modellin var oluş amacını kavrayabilmek. Yani bu modelin, ağ dediğimiz yapıdaki rollerini farkında olmamız yeterli.

# Layer 1 - Physical

İlk katman fiziksel katmandır ve verilerin bitler halinde yani 0 ve 1’ler ile fiziksel hat üzerinden taşınmasını sağlar. Daha önce de bahsetmiş olduğumuz gibi, ethernet, coaxial, fiber, wi-fi gibi kanallar aracılığı ile veriler kablolu veya kablosuz şekilde taşınabiliyor. Bu katmandaki amaç verilerin hat boyunca taşınmasını sağlamak.

Ayrıca bunlar dışında örneğin sinyalleri tekrarlayarak hat üzerinde daha uzak noktalara iletilmesini sağlayan “repeater” cihazları da bu katmanda sayılabilir. Çünkü repeater cihazının tek yaptığı, aldığı veri sinyallerini tekrarlamaktır. 

Hatta Hub olarak geçen cihazlar da aslında fiziksel(layer 1) katmandadır çünkü bağlı bulunan hostlar arasında ayrım yapmadan verileri tüm hostlara aynı şekilde iletiyor. Bu bağlamda sıradan bir ethernet kablodan farkı yoktur çünkü herhangi bir ayrım yapmadan bağlı bulunan tüm uç noktalara veriyi iletir.  

![layer1.webp]({{ site.url }}/egitim/temel-network/osi-modeli/layer1.webp){:class="responsive img-zoomable"}

# Layer 2 - Data Link

Data link katmanı, ilk katman olan fiziksel katman ile iletişime geçilmesini sağlar. Bu katmanda kablolu bağlantı için kullanılan NIC(network interfaces card) ya da kablosuz bağlantı için kullanılan "wi-fi access card" aygıtları bulunuyor. Bu aygıtlar fiziksel katmandan taşınmış olan bitleri alıyorlar ve benzer şekilde bir cihazın ürettiği bitleri de fiziksel katmana iletiyorlar. 

Bu katmandaki her bir cihazın yani ağ kartlarının her birinin, benzersiz kimlikleri olan **MAC** adresleri vardır. Mac adresi, “**M**edia **A**ccess **C**ontrol” ifadesinin kısaltmasından geliyor. Ağa bağlanmak isteyen tüm cihazların ağ kartı olması gerektiği için. Ağ kartlarındaki bu MAC adresi yani bu kimlik sayesinde ağa bağlı olan tüm cihazları birbirinden ayırabiliyoruz. Tıpkı IP adresleri gibi fakat bu MAC adresleri, cihaz üreticileri tarafından aygıtlara tek seferliğine tanımlanan benzersiz bir kimliktir.

Örnek adres göstermemiz gerekirse, **MAC** adresi “**00-B0-D0-63-C2-26**” şekilde gözüküyor. 

Fiziksel katmandan gelen verilerin doğru hedeflere iletilebilmesi için de MAC adresi bulunması zorunludur. Çünkü fiziksel katmandaki veriler bu MAC adres bilgisine göre doğru ağ kartına yönlendiriliyor. 

Örneğin switch aygıtları her bir portuna bağlı olan hostun MAC adresinin bilgisini tutar ve bu bilgiye göre yönlendirme yapar. Bu sebeple Switch aygıtları da aslında fiziksel katmandan gelen verileri, MAC bilgisi sayesinde doğru adrese yönlendiren 2. katmandaki yani "data link" katmanındaki bir cihazdır. 

![layer2-switch]({{ site.url }}/egitim/temel-network/osi-modeli/layer2-switch.webp){:class="responsive img-zoomable"}
<p class="mavi"><strong>ℹ️ Not:</strong> Görselleştirmeler sırasında MAC adresleri kısaltılarak, sembolik olarak eklenmiştir. </p>


Genellikle lokal ağımız dışında diğer ağlardaki cihazlar ile iletişime geçmek istediğimizde, karşılıklı iletişimi birden fazla router aygıtı üzerinden geçerek gerçekleştiriyoruz. Genellikle bu aradaki cihazlar da router aygıtları oluyor. Zaten Router ayıtlarının birden fazla ağı birbirine bağladığından daha önce bahsettik. Router aygıtları da ağlara bağlanırken NIC yani ağ kartları kullandığı ve her bir ağ kartının da benzersiz bir MAC adresi olduğu için aslında aşağıdaki gibi, veriler fiziksel kanaldan MAC adresleri yardımıyla bir ağ kartından bir diğerine adım adım aktarılıyor.

![hop-to-hop.webp]({{ site.url }}/egitim/temel-network/osi-modeli/hop-to-hop.webp){:class="responsive img-zoomable"}
Eğer açıklamalar şimdilik biraz karmaşık geldiyse hiç merak etmeyin. İleride MAC adresinin kullanımına örnekler üzerinden değindiğimizde bu durum çok daha anlaşılır olacak.

İşte bizzat gördüğümüz gibi MAC yardımıyla 2. katman olan "Data Link" katmanında, aslında bir ağ kartından bir diğerine fiziksel katman aracılığı ile veri iletilmesi mümkün oluyor. 

İlgili paketin uzaktaki hedefine ulaşabilmesi için, yani uçtan uça veri alışverişinin sürdürülebilmesi için de **3. katman** olan "**Network**" katmanına ihtiyacımız var. 
![end-to-end.webp]({{ site.url }}/egitim/temel-network/osi-modeli/end-to-end.webp){:class="responsive img-zoomable"}


# Layer 3 - Network

"Network" yani "Ağ" katmanının ana işlevi, veri paketlerini kaynak cihazdan hedef cihaza ulaştırmak ve farklı ağlardan geçerken yönlendirme yapmaktır. Hedef belirtme ve yönlendirme işlemleri de, her bir cihazın sahip olduğu IP adresi sayesinde mümkün oluyor.

Daha iyi anlamak için birbirinden farklı iki ağdaki cihazların veri alışverişinde bulunmak istediğini düşünelim. Yönlendirme işinden routerlar sorumlu olduğu için biz hedef IP adresini belirtip, bizim ağımıza bağlı bulunan routera bu paketi iletiyoruz. Router da bağlı olduğu ağlardan uygun olanlara bu paketi iletip, ilgili IP adresine sahip hosta bu paketin ulaşmasını sağlıyor. Nasıl olduğunu adım adım ele alalım:

![r1.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r1.webp){:class="responsive img-zoomable"}

Öncelikle, kaynak ve hedef IP adresleri pakete eklendi. Ayrıca bu paketi uygun yere yönlendirebilmesi için router cihazının MAC adresi de hedef adres olarak eklendi. 

![r2.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r2.webp){:class="responsive img-zoomable"}

Bu paket routera geldiğinde router alıp inceliyor ve hedef IP adresinin kendisine bağlı olan bir ağda olup olmadığını kontrol ediyor. 

![r3.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r3.webp){:class="responsive img-zoomable"}

Kendisine bağlı bir ağda bu IP adresine sahip cihaz olmadığı için bunu, bağlı olduğu diğer router cihazına, MAC adresi yardımıyla yönlendiriyor.

![r4.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r4.webp){:class="responsive img-zoomable"}

![r5.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r5.webp){:class="responsive img-zoomable"}

Bu paket ikinci router cihazına geldiğinde router hedef IP adresini kontrol ediyor. 

![r6.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r6.webp){:class="responsive img-zoomable"}

Hedef IP adresinin, bağlı olduğu ağdaki bir hosta ait olduğunu öğrendiğinde bu hosta bu paketi iletmek için hedef MAC adresi olarak bu hostun MAC adresini ekleyip gönderiyor.

![r7.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r7.webp){:class="responsive img-zoomable"}

![r8.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r8.webp){:class="responsive img-zoomable"}

Bu paketi alan host, paketin göndericisini ve hedefini kontrol ediyor. Bu sayede paketin kendisi için olup olmadığını ve yanıt vermek istediğinde yanıtını hangi IP adresine göndermesi gerektiğini öğrenmiş oluyor. 

![r9.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r9.webp){:class="responsive img-zoomable"}

IP adresi kendisine ait olduğu için bu paketi kabul edip, içeriğini yani DATA kısmını okuyor.

![r10.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r10.webp){:class="responsive img-zoomable"}

![r11.webp]({{ site.url }}/egitim/temel-network/osi-modeli/r11.webp){:class="responsive img-zoomable"}

Böylelikle farklı ağlardaki iki hostun iletişim kurması mümkün oluyor.

Adım adım ele aldığımız gibi; bağlı bulunan ağlarda IP eşleşmesi olmadığı sürece routerlar MAC adresleri sayesinde ilgili paketin, kendilerine bağlı bulunan bir sonraki noktaya yönlendirilmesini sağlıyor. En son router da hedef IP adresindeki hostun kendi ağında olduğunu bildiği için bu hosta, MAC adresi sayesinde bu paketi ulaştırıyor.

Özetle MAC adresleri birbirine bağlı bulunan ağ kartları arasındaki iletişim ve aktarım için kullanılıyorken, IP adresi ağların ve ağlardaki hostların tanınması için yani uçtan uça aktarım için kullanılıyor. 

Burada router cihazlarının IP ile MAC adresini eşleştirebilmesini sağlayan “**ARP**” isimli bir protokol bulunuyor. Bu protokol sayesinde IP ve MAC bilgisi elde edilip, routerların kendi tablosuna bu bilgiler ekleniyor. Bu sayede routerlar, hangi IP adreslerinin hangi MAC ile eşleştiğini bilip buna göre yönlendirme yapabiliyor. Bu konudan daha sonra ayrıca bahsedeceğiz.

Şimdilik 3. katmandaki IP ile 2. katmandaki MAC adresinin, veri paketlerinin iletilebilmesindeki temel rollerini bilmemiz yeterli. 

# Layer 4 - Transport

Şimdiye kadar ele aldığımız anlatımlarda, verilerin tek bir hat üzerinden iletildiğini gördük. Peki ama tüm veriler tek bir hat üzerinden iletiliyorken, doğru programın doğru paketi aldığından nasıl emin olabiliyoruz ?

Örneğin ben web tarayıcısı, discord ve spotify gibi internet bağlantısını gerektiren uygulamaları aynı anda kullanabiliyorum. Bu uygulamaların sorunsuzca veri alışverişinde bulunması için doğru paketlerin doğru araca iletilmesi gerek. Bu da “adresleme şeması” ya da doğrudan “**port**” olarak ifade edilen bir yaklaşım sayesinde mümkün oluyor.

Her bir aracın kendisine ait bir port numarası bulunuyor. Bu sayede veriler bu portlar aracılığı ile yalnızca ilgili olan araçlara iletilebiliyor. Yani tek bir hat üzerinden geliyor olsa da veriler birbirinden izole şekilde, yalnızca doğru portlara iletiliyor. 

![transport-port.webp]({{ site.url }}/egitim/temel-network/osi-modeli/transport-port.webp){:class="responsive img-zoomable"}

Servislerle iletişim kurulurken gönderici, rastgele bir port üzerinden veri gönderip yine aynı port üzerinden veri alabiliyor. Örneğin bir websitesini ziyaret etmek istediğinizde aşağıdaki gibi IP ve port numaraları üzerinden iletişim kuruyorsunuz. 

![src-dst-port.webp]({{ site.url }}/egitim/temel-network/osi-modeli/src-dst-port.webp){:class="responsive img-zoomable"}

Örneğin web tarayıcısını kullandığınızda açtığınız her yeni sekme aslında rastgele farklı bir port üzerinden ilgili servislere haberleşecek. Bu sayede farklı sekmelerdeki veriler birbirinden izole şekilde doğru sekmeye iletilebiliyor. Ben farklı sekmelerde aynı websitesini ziyaret edecek olursam aşağıdaki gibi bir iletişim söz konusu olacak.

![multi-tab-port.webp]({{ site.url }}/egitim/temel-network/osi-modeli/multi-tab-port.webp){:class="responsive img-zoomable"}

Rastgele tanımlanan port numaraları haricinde çeşitli servisler için kullanılan bazı standart portlar vardır. Örneğin birkaç tanesi aşağıdaki gibidir:

- HTTP: 80
- HTTPS: 443
- FTP (File Transfer Protocol): 21
- SSH (Secure Shell): 22
- Telnet: 23
- SMTP (Simple Mail Transfer Protocol): 25

Bunlar sadece birkaç örnek. Birçok farklı servis, protokol ve uygulama kendi standart port numaralarını kullanabiliyor. Bu sayede standart konfigürasyonlar için başvurulacak standart bir adres oluyor. Örneğin web içeriklerini almak istediğimizde http protokolü için ilgili IP adresinin 80 numaralı portuna istekte bulunuyoruz. Eğer web içeriklerinin şifreli şekilde iletilmesini istiyorsak da bu kez https protokolü için 443 portundan ilgili IP adresiyle iletişime geçiyoruz. Özetle port numaraları taşıma katmanında doğru paketin doğru adrese iletilmesi için çok önemlidir.

Üstelik transport yani taşıma katmanında yalnızca port numarası değil, verinin ne şekilde taşınacağı da önemli. Veri taşıma için TCP ve UDP olmak üzere iki temel alternatif yöntem bulunuyor.

## TCP

TCP, “**T**ransmission **C**ontrol **P**rotocol” ifadesinin kısaltmasından geliyor ve isminde de olduğu şekilde veri iletimini kontrollü bir şekilde gerçekleştiriyor. TCP, bağlantı temelli(connection oriented) bir protokoldür. Yani veri paketlerini göndermeden önce, alıcının bu paketleri almaya hazır olduğunu kontrol etmek için öncelikle alıcı ile bağlantı gerçekleştirir. Bu yaklaşım, verilerin iletim sırasında kaybolmamasını, sırasının bozulmamasını ve doğru bir şekilde ulaşmasını sağlar. 

Alıcı ile bağlantı kurulmasına da üçlü el sıkışma(Three-Way Handshake) deniyor. 

Örneğin bir veri paketi TCP ile taşınacaksa öncelikle hedef sunucuya senkronizasyon için **SYN**(**Syn**chronize**)** isimli bir kontrol paketi gönderilir. 

Hedef sunucu bu **SYN** paketini alırsa, yanıt olarak istemciye onay yani **SYN-ACK(Acknowledgment)** paketi ile bağlantı kurmaya hazır olduğunu bildirir.

İstemci, hedef sunucunun SYN-ACK paketini aldığında bu bağlantıyı **ACK** onaylar ve her ikisi de gerçek veri aktarımını başlatacakları güvenilir bir bağlantı kurar.

![SYN-ACK.webp]({{ site.url }}/egitim/temel-network/osi-modeli/SYN-ACK.webp){:class="responsive img-zoomable"}

Daha sonra veri paketleri hedefe gönderilir. Ayrıca veri iletimi sırasında, gönderilen veri paketleri kaybolabilir, gecikebilir veya bozulabilir. Ancak TCP, bu tür sorunlarla başa çıkmak için hata kontrolü ve eksik veya bozulmuş verinin yeniden iletilmesi gibi mekanizmalara sahiptir. Bu sayede, güvenilir ve düzenli veri iletimi sağlanır. Bu yaklaşımı sebebiyle TCP, veri bütünlüğünün önemli olduğu durumlarda eksiksiz iletim için kullanılıyor. Örneğin e-posta, websitesi içeriğinin alınması, veya dosya indirme gibi tüm verilerin eksiksiz iletiminin şart olduğu durumlarda TCP kullanılıyor. 

## UDP

UDP, “**U**ser **D**atagram **P**rotocol” ifadesinin kısaltmasından geliyor. Bu iletim protokolü TCP gibi bağlantı tabanlı değildir. Yani verileri göndermeden önce alıcı ile bağlantı kurup alıcıyı kontrol etmez. Veri paketlerini doğrudan gönderir. Bu sayede çok daha hızlı veri transferi mümkündür fakat, tüm verilerin hedefe ulaşıp ulaşmayacağı garanti edilmez. Çünkü verilerin ulaşıp ulaşmadığına dair bir kontrol mekanizması yoktur. Bu sebeple, hız gerektiren ama veri bütünlüğü veya doğruluğunun önemsiz olduğu durumlarda tercih edilir. Örneğin sesli ve görüntülü iletişim, video oyunları ve yayın hizmetleri gibi alanlarda sıkça kullanılır. Zaten özellikle görüntülü ve sesli iletişim uygulamalarını kullanırken, ara sıra kesintiler olduğuna bizzat şahit olmuşsunuzdur. UDP tüm paketlerin hedefe ulaşmasını garanti etmediği için arada paket kayıpları yaşanması olağandır. Fakat getirdiği hız dolayısıyla bu tür uygulamalarda verilerin taşınması için kullanılması da kaçınılmazdır.

Kısacası, TCP güvenilir veri iletimini sağlarken, UDP hızlı ancak veri bütünlüğü konusunda daha az güvenilir bir iletim sağlıyor.

![TCP-UDP.webp]({{ site.url }}/egitim/temel-network/osi-modeli/TCP-UDP.webp){:class="responsive img-zoomable"}

# Session - Presentation - Application Layers

Son olarak oturum(session), sunum(presentation) ve uygulama(application) katmanlarını çok kısaca ele alabiliriz. Bu katmanlar ağ bağlantısına ihtiyaç duyan uygulamaların iletişiminin yönetildiği katmandır. Kullanıcılar ağ gerektiren bir uygulamayı kullanırken aslında bu katmanlarla etkileşime geçerler. 

Örneğin bir websitesinin içeriğini görüntülemek istediğimizde, bu içerik bize HTTP(HyperText Transfer Protocol) protokolü üzerinden iletilir. Biz de web tarayıcısı yardımıyla bu HTTP protokolünü çözümleyip görüntüleriz. Bu protokol websitesi içeriğine her yerden standart şekilde ulaşılabilmesini sağlar.

Benzer şekilde örneğin dosya transferi sırasında FTP yani File Transfer Protocol kullanılıyor. Dosya transferi sağlayan uygulamalar bu protokolü kullanarak karşılıklı olarak dosya transferinde bulunabiliyorlar.

Bu örneklere benzer şekilde pek çok farklı amaç için kullanılan pek çok farklı protokol vardır. Tüm protokollerin ortak amacı, belirli bir tür veri transferini karşılıklı olarak sorunsuzca gerçekleştirebilmektir. 

Şimdiye kadar ele aldığımız OSI modelinde, ağ ile ilgili uygulamaların iletişimi üç farklı katmanda ele alınıyor. 

![Application-layer.webp]({{ site.url }}/egitim/temel-network/osi-modeli/Application-layer.webp){:class="responsive img-zoomable"}

Fakat günümüzde daha yaygın kullanımda olan **TCP/IP** isimli ağ modelinde ise tüm bu katmanlar **Application** katmanı altında tek bir katmanda ele alınıyor. 

![OSI-TCP-IP.webp]({{ site.url }}/egitim/temel-network/osi-modeli/OSI-TCP-IP.webp){:class="responsive img-zoomable"}

Her iki model de aynı temel standartları ifade ediyor olmasına karşın TCP/IP isimli ağ modeli biraz daha sadeleştirilmiş bir temsile sahip. Yoksa OSI ve TCP/IP modellerinin her ikisi de aynı şekilde sorunsuz ağ iletişimi için gereken temel protokollerin tanımlandığı modellerdir.

Ağdaki veri akışını anlamak için önemli olan OSI modelinde **1-4** veya **TCP/IP** modelinde **1-3** katmanlardaki yapılar aslında. Bunun dışındaki katmanlar uygulamaların veri iletimi için kullandığı özel protokollerden ibaret. 

# Encapsulation Decapsulation | Kapsülleme Kapsül Açma İşlemleri

## Encapsulation

Uygulama katmanından gönderilen veriler “encapsulation” yani “kapsülleme” denilen bir metotla alt katmanlara iletiliyor. 

![encapsulation.webp]({{ site.url }}/egitim/temel-network/osi-modeli/encapsulation.webp){:class="responsive img-zoomable"}

Uygulama katmanından gelen veriye öncelikle hangi taşıma yöntemi ile taşınacağının bilgisi eklenerek bu veri kapsülleniyor. Verinin bu haline de “**Segment**” deniyor.

![layer4.webp]({{ site.url }}/egitim/temel-network/osi-modeli/layer4.webp){:class="responsive img-zoomable"}

Ağ katmanında gönderici ve alıcı IP adresi ekleniyor. Buna da “**packet**” deniyor.

![layer3.webp]({{ site.url }}/egitim/temel-network/osi-modeli/layer3.webp){:class="responsive img-zoomable"}

Data link katmanında da gönderici ve alıcı MAC adresi eklenip hedef cihazın belirtilmesi sağlanıyor. Buna da “**frame**” yani “**çerçeve**” deniyor.

![layer2.webp]({{ site.url }}/egitim/temel-network/osi-modeli/layer2.webp){:class="responsive img-zoomable"}

En nihayetinde fiziksel katmanda frame, hat üzerinden iletilmek üzere 0 ve 1’lere dönüştürülüp hat üzerinde hedefe gönderiliyor.

![physical-layer.webp]({{ site.url }}/egitim/temel-network/osi-modeli/physical-layer.webp){:class="responsive img-zoomable"}

Özetle “encapsulation” yani “kapsülleme” işlemi bu şekilde. 

![encapsulation.webp]({{ site.url }}/egitim/temel-network/osi-modeli/encapsulation.webp){:class="responsive img-zoomable"}

## Decapsulation

Alıcı ise aynı işlemleri tersten gerçekleştirerek, kapsülü katman katman açıyor. Buna “**decapsulation**” yani “**kapsülü açma**” deniyor. 

![decapsulation.webp]({{ site.url }}/egitim/temel-network/osi-modeli/decapsulation.webp){:class="responsive img-zoomable"}

Yani 0 ve 1’leri frame haline çevirip data link katmanına gönderiyor.

![de-layer1.webp]({{ site.url }}/egitim/temel-network/osi-modeli/de-layer1.webp){:class="responsive img-zoomable"}

Buradaki MAC bilgisine bakılarak hangi ağ kartının MAC adresinin hedeflendiği öğreniliyor.

![de-layer2.webp]({{ site.url }}/egitim/temel-network/osi-modeli/de-layer2.webp){:class="responsive img-zoomable"}

Daha sonra IP adresine bakılarak bu adresin doğruluğu kontrol ediliyor. IP adresi, verinin nereye yönlendirilmesi gerektiğini gösterir. Eğer IP adresi doğruysa, veri taşıma katmanına iletilir.

![de-layer3.webp]({{ site.url }}/egitim/temel-network/osi-modeli/de-layer3.webp){:class="responsive img-zoomable"}

Taşıma katmanında TCP veya UDP sayesinde verilerin taşınma yöntemi ve hangi porta veri gönderildiği öğrenilip bu porta veri yönlendiriliyor.

![de-layer4.webp]({{ site.url }}/egitim/temel-network/osi-modeli/de-layer4.webp){:class="responsive img-zoomable"}

Son olarak uygulama katmanı da, kendisine gönderilen veri paketini alıp uygun şekilde işliyor.

![de-layer5-7.webp]({{ site.url }}/egitim/temel-network/osi-modeli/de-layer5-7.webp){:class="responsive img-zoomable"}

İşte kapsülleme ve kapsülü açma işlemi yani ağ üzerinden veri akışı bu şekilde.

Tüm detayları ile olmasa da ağ temellerini kavrayabileceğimiz düzeyde **OSI** ve **TCP/IP** modellerinden bahsetmiş olduk. Eğer bu katmanları ve ek detayları ezberlemenizi gerektiren bir sınava hazırlanmıyorsanız buradaki bilgiler giriş seviyesi temel network bilgisi için yeterli olacaktır. Neticede bunlar yalnızca iletişimi standartlaştırma adına modeller. Veri akışının genel hatlarını belirtmek için kullanılıyorlar. Önemli olan veri akışının temel olarak nelere bağlı olduğunu kavrayabilmek.