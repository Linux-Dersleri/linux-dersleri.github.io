---
layout: tutorial
title:  "Router Nasıl Çalışır ?"
modified: 2023-05-20
author: Taylan Özgür Bildik
coursetitle: "Temel Ağ Eğitimi"
excerpt: "Router aygıtlarının nasıl çalıştığını temel düzeye ele alıyoruz."
tags: [router,]
categories: [temel-network]
tutorial: 6
cover: routercover.webp
toc: true 
---


# Routerlar Nasıl Çalışır ?

Bu bölümde router aygıtlarının genel çalışma yapısına odaklanacağız. Router sayesinde ağlar arasında veri yönlendirmesi mümkün oluyor. Router, ağlar arasında bağlantı kurmak için her ağda birer IP ve MAC adresine sahiptir. Yani tıpkı host cihazları gibi router da IP ve MAC adresine sahip.

Router, hostlardan farklı olarak kendisine verilen paketi hedefine ulaşması için yönlendirebilir. Normalde eğer bir hosta, ona ait olmayan bir paket gelirse bu host bu paketi kabul etmez ve bu paket kaybolur. 

![packet-for-host.webp]({{ site.url }}/egitim/temel-network/router/packet-for-host.webp){:class="responsive img-zoomable"}

Fakat router, bir paket doğrudan kendisine ait değilse bile bu paketi hedef alıcısına ulaştırmak üzere bağlı olduğu ağlardan uygun olana yönlendirmeye çalışır. 

![packet-for-router.webp]({{ site.url }}/egitim/temel-network/router/packet-for-router.webp){:class="responsive img-zoomable"}

Router cihazları, bağlı oldukları her bir ağda benzersiz bir MAC ve IP adresine sahiptir. 

![router.webp]({{ site.url }}/egitim/temel-network/router/router.webp){:class="responsive img-zoomable"}

Yukarıdaki görsele bakacak olursanız, routerın ağlara göre ayrı ayrı IP ve MAC adresine sahip olduğunu görebilirsiniz. Bu sayede ağlar arasında köprü görevi görüp yönlendirme gerçekleştirerek ağlar arası iletişimi mümkün kılabiliyor.

Yönlendirme işlemlerini gerçekleştirmek için de “Routing Table” yani “Yönlendirme Tablosu” ile hangi IP adresinin hangi ağda olduğunun kaydını tutuyor. Örneğin yukarıdaki görseli ele alacak olursak, router 192.168.5.X gibi bir hedef IP adresine sahip paketi, tuttuğu yönlendirme tablosuna bakıp soldaki ağa yönlendiriyor. Benzer şekilde 192.168.2.X gibi bir hedefe sahip paketi de sağ taraftaki ağa yönlendiriyor. 

![routing-table.webp]({{ site.url }}/egitim/temel-network/router/routing-table.webp){:class="responsive img-zoomable"}

Tabii ki gerçekte “sağda” veya “solda” şeklinde değil, teknik olarak ayrıştırmayı sağlayan sayısal isimlendirme var ancak teorik kısmını anlamak için bu teknik detaylar gerekli değil. Biz sağ sol şeklinde ifade etmeye devam edelim.

Routing table aslında ağ yönetimi konusunda çok önemli bir husus, zira ağlar arasındaki tüm paket yönlendirmeleri bu tablo sayesinde mümkün oluyor. Bu sebeple “routing table” konusuna biraz daha değinecek olursak, tablo oluşturmada kullanılan üç farklı metodu kısaca ele alabiliriz.

# Directly Connected | Doğrudan Bağlı

Doğrudan tek bir router ile birbirine bağlı olan ağlar arasında yönlendirme bu sınıftadır.

![DC.webp]({{ site.url }}/egitim/temel-network/router/DC.webp){:class="responsive img-zoomable"}

<p class="mavi"><strong>ℹ️ Not:</strong> Buradaki "<strong>DC</strong>" kısaltması “<strong>D</strong>irectly <strong>C</strong>onnected” ifadesini temsil ediyor.</p>

Yalnızca iki ağ mevcut olduğunda bu tablo sayesinde ağlar içindeki hostlara paketlerin yönlendirilmesi sorunsuzdur çünkü tüm ağlar routing table üzerinde kayıtlıdır. 

![DC-example.webp]({{ site.url }}/egitim/temel-network/router/DC-example.webp){:class="responsive img-zoomable"}

Fakat birden fazla ağın routerlar ile birbirine bağlı olduğu durumda her bir router kendi yönlendirme tablosunu tutacağı için farklı routerlara bağlı olan ağlardaki hostlara yönlendirme yapılamaz.

![DC-routing-problem.webp]({{ site.url }}/egitim/temel-network/router/DC-routing-problem.webp){:class="responsive img-zoomable"}

Bu durumda paket kaybolur çünkü R1 isimli router, paketin ulaşması gereken ağa bağlı değildir. Dolayısıyla bu ağ hakkında kendi yönlendirme tablosunda bilgi bulunmadığı için paket yönlendirilemez ve kaybolur. Bu duruma çözüm olarak “Static Routes” yaklaşımı kullanılabilir.

# Static Routes | Statik Yönlendirmeler

Bu yöntemde, ağ yöneticisi manuel olarak birbirine bağlamak istediği ağların adres bilgilerini “routing table” yani yönlendirme tablosuna tek tek ekler. Bu sayede birbirine bağlanması istenen tüm ağlar direk bağlı olmasa bile bu elle eklenmiş olan statik adres bilgileri sayesinde ilgili ağa yönlendirme yapabilirler. 

![ST-route.webp]({{ site.url }}/egitim/temel-network/router/ST-route.webp){:class="responsive img-zoomable"}

![ST-route2.webp]({{ site.url }}/egitim/temel-network/router/ST-route2.webp){:class="responsive img-zoomable"}

![ST-route3.webp]({{ site.url }}/egitim/temel-network/router/ST-route3.webp){:class="responsive img-zoomable"}

Gördüğünüz gibi harici ağlar statik olarak elle belirtildiğinde, paket kaybı yaşanmadan doğru ağa yönlendirilebiliyor. Çünkü fiziksel olarak doğrudan bağlı olunmasa da, bağlı olan routerın ağ adresi bildiği için yönlendirme işi diğer routera devrediliyor. Diğer router da kendi ağ tablosuna bakarak paketi hedef hosta yönlendiriyor. Bu yaklaşım özellikle küçük çaplı ağlar için makul bir tercih. Fakat eğer büyük bir ağ yönetiliyorsa, tüm IP adreslerinin statik olarak elle girilmesi biraz zahmetli bir hal alabilir.

Bu duruma çözüm olarak da “Dynamic Routers” yaklaşımı kullanılabiliyor.

# Dynamic Routes

Bu yaklaşımda routerlar birbiri ile iletişim kurup ağ bilgilerini birbirileri ile paylaşıyorlar. Yani statik olarak elle eklenen adresler, bu dinamik yaklaşım kullanıldığında otomatik olarak ekleniyor. 

![Dynamic.webp]({{ site.url }}/egitim/temel-network/router/Dynamic.webp){:class="responsive img-zoomable"}

Otomatik olarak ağların keşfedilmesini sağlayan yaklaşımlar yani aslında bu otomatik çalışmanın arkaplanda nasıl gerçekleştirildiği ağ temelleri dışında kalan çok teknik bir konu olduğu için biz bu eğitimde bunlara değinmeyeceğiz. Temelde **dinamik yöntem**in **otomatik** olarak router keşfi yaptığını bilmeniz yeterli. 

Routing table yani yönlendirme tablolarına ek olarak routerların ARP tabloları tuttuğunu da biliyorsunuz. Daha önce harici ağlar arasındaki yönlendirmelerden bahsederken hostların ve routerların kendi ARP tablolarını tuttuğunu ve ARP protokolü sayesinde IP-MAC adresi eşleştirmesi yapılmasını sağladığını ele almıştık. Yönlendirme tablosunda, spesifik adres yönlendirme için gereken bilgi bulunmadığında, ARP tablosunun da yardımıyla paketin tam olarak hedefine yönlendirilmesi mümkün oluyor.

Örnek olarak ele aldığımız ağdaki routerların ARP tablosu aşağıdaki şekilde olacaktır.

![ARP-table.webp]({{ site.url }}/egitim/temel-network/router/ARP-table.webp){:class="responsive img-zoomable"}

ARP tablosu ilk başta her bir router üzerinde boştur. Gerektikçe ARP protokolü ile IP-MAC eşleştirmesi yapılarak tabloya kaydedilir. Her bir router da ayrı ayrı kendi ARP tablosunu tutar. Zaten IP adresine sahip olan tüm cihazların kendine ait bir ARP tablosu vardır. Daha önce ARP protokolünü açıkladığımız için burada tekrar nasıl çalıştığına değinmemize gerek yok. Eğer ARP protokolünü ele aldığımız kısımları hatırlamıyorsanız veya o bölümü atladıysanız dönüp tekrar kontrol edebilirsiniz. 

Routing table sayesinde routerlar ağların adreslerini biliyorken, ARP tablosu sayesinde IP adreslerine karşılık gelen MAC adreslerini biliyorlar. Bu sayede paket yönlendirmeyi hangi ağa yapacağını “routing table” üzerinden bakarken, paketin tam olarak hangi IP ve MAC adresine yönlendirileceğine de ARP tablosu üzerinden bakıyor. 

Özetle routerların her birinin kaydını tuttuğu, Routing ve ARP tabloları sayesinde ağlar arasında veri yönlendirilmesi mümkün oluyor. 

En nihayetinde bizim basit örnekler üzerinden ele aldığımız bu yaklaşımı elbette istediğiniz ölçüde genişletip aynı şekilde veri aktarımı yapabilirsiniz. Örneğin internet dediğimiz geniş ağ(WAN) da aslında bir çok routerın birleşiminden başka bir yapı değil. Yani internet geneli için de benzer yaklaşım söz konusu.

![INTERNET.webp]({{ site.url }}/egitim/temel-network/router/INTERNET.webp){:class="responsive img-zoomable"}

# Router Hiyeraşisi

Daha önceki anlatımlarımızda routerların tek bir hat üzerinde bağlı olduğu örnekleri ele aldık. Fakat aslında routerlar genellikle hiyerarşik biçimde birbirine bağlı oluyorlar. 

![router-hierarchy.webp]({{ site.url }}/egitim/temel-network/router/router-hierarchy.webp){:class="responsive img-zoomable"}

Hiyerarşik yapı sayesinde ağların yönetimi yani “**ölçeklenmesi**” çok daha kolaylaşmış oluyor. Ayrıca bağlantıların “**sürekliliği”** de güvence altına alınmış oluyor. Gelin neden böyle olduğunu ele alalım.

Örneğin mevcut ağa yeni alt ağlar bağlanmak istenildiğinde tek yapılması gereken ana routera alt ağların routerlarını bağlamak.

![add-router.webp]({{ site.url }}/egitim/temel-network/router/add-router.webp){:class="responsive img-zoomable"}

Bu yaklaşım sayesinde gördüğünüz gibi zahmetsizce ağın büyüklüğü değiştirilebiliyor. Dilersek artık ihtiyaç duyulmayan alt ağları da benzer şekilde ilgili router bağlantısını sonlandırarak ağdan çıkarabiliriz. Yani özetle ağı “**ölçeklemek**” bu hiyerarşik düzen sayesinde çok daha kolay.

Bağlantıların “**sürekliliği**” avantajına da kısaca değinelim. Eğer ağlar hiyerarşik olarak değil de tek bir hat üzerinde birbirine bağlı olsaydı ağ yapısı aşağıdaki gibi gözükecekti.

![linear-connection.webp]({{ site.url }}/egitim/temel-network/router/linear-connection.webp){:class="responsive img-zoomable"}

Bu yaklaşımda tüm trafik tek bir hat üzerinden iletildiği için hat üzerindeki diğer routerlar da gereksiz yere meşgul edilmiş olacak. 

![router-linear-traffic.webp]({{ site.url }}/egitim/temel-network/router/router-linear-traffic.webp){:class="responsive img-zoomable"}

Ayrıca bu gereksiz ağ trafiğine ek olarak, hat üzerinde herhangi bir noktadaki kesintinin, hattın gerisindeki tüm ağları etkileyeceğini görmek zor değil.

![linear-connection-error.webp]({{ site.url }}/egitim/temel-network/router/linear-connection-error.webp){:class="responsive img-zoomable"}

Yani bu yaklaşımla iletişimin “**sürekliliği**” risk altındadır.

İşte bu sebeple hiyerarşik yaklaşım “**ölçeklenebilirlik**” ve “**süreklilik**” konusunda daha güvenli bir yaklaşımdır. Ayrıca bunlar dışında hiyerarşi aslında “**sadeleştirme**” imkanı da tanıyor.

Sadeleştirme durumunu açıklamak üzere öncelikle buradaki routerları numaralandıralım.

![Routers.webp]({{ site.url }}/egitim/temel-network/router/Routers.webp){:class="responsive img-zoomable"}

Örnek olarak 5 numaralı routerı ele alacak olursak, bu routerın yönlendirme tablosu aşağıdaki gibi olur.

![routing-table-in-hierarchy.webp]({{ site.url }}/egitim/temel-network/router/routing-table-in-hierarchy.webp){:class="responsive img-zoomable"}

5 numaralı router bu tabloya bakarak, hangi paketin hangi hangi routera yönlendirilmesi gerektiğini biliyor. Örneğin 10.20.30.5 hedef IP adresine sahip bir paket bu routera gelirse, router bu paketin 10.20.X.X ağı içinde olduğunu subnet prefix(24) değerine bakarak anlıyor ve bu paketi R7 routerına yönlendiriyor.

![router-redirect1.webp]({{ site.url }}/egitim/temel-network/router/router-redirect1.webp){:class="responsive img-zoomable"}

Bir başka örnek olarak hedefi 10.10.40.15 olan bir paket geldiğini varsayalım. Bu router yönlendirme tablosuna bakarak, bu paketin R4 routerına bağlı ağda olduğunu anlar. Ve paketi bu routera yönlendirir.

![router-redirect2.webp]({{ site.url }}/egitim/temel-network/router/router-redirect2.webp){:class="responsive img-zoomable"}

Bu noktadan sonra paketin doğru hedefe ulaşması için bu R4 routerı sorumludur. O da kendi tablosuna bakarak bu IP adresinin hangi ağda olduğunu bulur ve bunu R1 routerına aktarır. 

![router-redirect3.webp]({{ site.url }}/egitim/temel-network/router/router-redirect3.webp){:class="responsive img-zoomable"}

R1 routerı da bağlı bulunduğu ağda bu IP ile eşleşen bir host varsa kendi ARP tablosunun da yardımıyla paketi ona yönlendirir. Yani paket teslimatı hiyerarşik şekilde yönlendirmeler sayesinde sorunsuzca gerçekleştirilir. 

Bu harika bir yapı fakat dikkat edecek olursanız yönlendirme tablosunda farklı IP adreslerinin aynı routera işaret ettiğini görüyoruz. Bunun nedeni gerçekten de hiyerarşik olarak tüm bu ağların bu routera bağlı olması. Bu durumda aslında bu tablodaki gösterim biraz daha sadeleştirilebilir.

Örneğin 10.10.20.X 10.10.30.X 10.10.40.X ağlarının hepsi ortak olarak 10.10.0.0 ağı içinde bulunuyor. Dolayısıyla bu ağda bulunan bir paket ile karşılaşıldığında doğrudan R4 routerına yönlendirmesi için routing table üzerinde 10.10.0.0 /16 şeklinde de temsil edebilir. 

![router-redirect4.webp]({{ site.url }}/egitim/temel-network/router/router-redirect4.webp){:class="responsive img-zoomable"}

Bildiğiniz gibi buradaki 16 prefix değeri ilk iki oktetin ağ olduğunu yani 10.10. değerinin ağı gösterdiğini diğer kısımların hostları temsil ettiğini belirtiyor. Yani neticede tüm alt ağlar aynı router cihazına bağlı olduğu için tek tek tüm alt ağların yazılmasına gerek kalmıyor. Tek seferde tüm bu alt ağları kapsayan ağ ile router cihazını tabloda sade şekilde ilişkilendirmiş oluyoruz.

Yani neticede yönlendirme tablosu sadeleştirilmiş oluyor. Ele aldığımız ağın küçüklüğü dolayısıyla bu size şu an için gereksiz gelmiş olabilir. Fakat yönetilecek ağ sayısı yüzlere hatta binlere ulaştığında bu sadeleştirme gerçekten önemli bir hal alıyor. Özellikle yeni alt ağlar oluşturulduktan veya mevcut alt ağlar ağdan çıkarıldıktan sonra bunların ayrı ayrı yazılması yerine, tek seferde tüm ağa bağlı olan cihazların temsil edilebilmesi çok daha kolay bir yaklaşım.

Daha iyi anlamak adına bir alt ağdaki routerın yönlendirme tablosuna göz atalım. Örneğin R8 routerının yönlendirme tablosuna göz atalım.

![router-redirect5.webp]({{ site.url }}/egitim/temel-network/router/router-redirect5.webp){:class="responsive img-zoomable"}

Bakın R8 routerı doğrudan(DC) bağlı olduğu 10.20.40.x ağı dışındaki tüm yönlendirme işlemlerini R5 üzerinden gerçekleştirdiği için, R8 için tüm IP bloklarının hedefi R5 cihazı. Dolayısıyla bu uzun gösterim yerine 10 ile başlayan tüm IP adreslerinin R5 routerına yönlendirilmesi için subnet mask değeri olarak 8 prefix değerini belirtebiliriz.

![router-redirect6.webp]({{ site.url }}/egitim/temel-network/router/router-redirect6.webp){:class="responsive img-zoomable"}

Bu yaklaşımda 10 ile başlayan tüm IP adresleri R5 routerına yönlendiriliyor olacak. Yani R8 routerı şirket ağındaki herhangi bir IP adresine yönlendirme yapacağı zaman R5 routerına yönlendirme yapıyor olacak. Dolayısıyla bu sadeleştirilmiş tanımlama sayesinde tüm alt ağların ayrı ayrı tanımlanması gerekmiyor. 

Fakat peki ya 10.20.40.X gibi bir hedef IP adresine sahip paketin yönlendirilmesi gerekirse ne olacak ?

![router-redirect7.webp]({{ site.url }}/egitim/temel-network/router/router-redirect7.webp){:class="responsive img-zoomable"}

Neticede hem 10 ile başlıyor hem de R8 router’ının doğrudan bağlı olduğu 10.20.40.X ağı ile eşleşiyor. Bu durumda bu paket R5 routerına mı yoksa R8 in doğrudan bağlı olduğu ağa mı yönlendirilir ?

Bu gibi durumlarda paket daha spesifik olarak eşleşeme gösteren yere yönlendirilir. 

![router-redirect8.webp]({{ site.url }}/egitim/temel-network/router/router-redirect8.webp){:class="responsive img-zoomable"}

Bu IP adresi 10 ile başlıyor ama devamında R8 in doğrudan bağlı(DC) olduğu 10.20.40. IP adresini barındırdığı için bu çok daha spesifik bir tanımlamadır. Dolayısıyla bu paket doğrudan bağlı olan bu ağa yönlendirilir. 

Şimdiye kadar örneklerimizi hep şirket ağı içindeki yönlendirmelerden verdik. Peki ya bir paketin internete yönlendirilmesi gerekiyorsa ne olacak ?

İnternet üzerindeki IP aralığı şirket için tanımladığımız en geniş aralık olan 10.0.0.0/8 den çok daha büyük. Bu duruma çözüm olarak internet ağını kapsamak için 0.0.0.0/0 şeklinde tanımlama yapılabilir. Örneğin R8 routerı üzerinde böyle bir tanımlama yapılacak olursa, yönlendirme tablosu aşağıdaki gibi gözükecektir.

![router-redirect9.webp]({{ site.url }}/egitim/temel-network/router/router-redirect9.webp){:class="responsive img-zoomable"}

Bu sayede R8 paketine hangi IP adresine yönlendirilmesi gereken paket gelecek olursa olsun, bu paket R5 routerına yönlendirilecek. Zaten R8 routerı diğer ağlar ile iletişime geçmek için fiziksel olarak R5 routerına bağlı olduğu için bu şekilde tüm IP aralığının kapsanarak R5 cihazına gönderilmesi de makul bir yaklaşım. 

."0.0.0.0/0" ağ adresi, tüm IPv4 adreslerini temsil ettiği için "varsayılan yönlendirme" veya "default route" olarak ifade ediliyor. 

Bu tanımlama olmazsa, R8 routerına gönderilen internete yönlendirilmesi gereken bir paket olduğunda bu paketin hangi adrese yönlendirilmesi gerektiği belirlenemez. Örneğin bu tanımlama olmadan hedefi, internet üzerindeki 172.155.44.23 gibi bir IP olan paketin nereye yönlendirilmesi gerektiği belirlenemez. Çünkü yönlendirme tablosunda bu IP için bir tanımlama bulunmuyordur.   

Böylelikle ağların neden routerlar vasıtasıyla hiyerarşik düzende tasarlandığını ve bu hiyerarşinin nasıl sadeleştirilerek ifade edildiğini görmüş olduk.