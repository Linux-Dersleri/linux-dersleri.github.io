---
layout: tutorial
title:  "Ağ Aygıtları"
modified: 2023-05-20
author: Taylan Özgür Bildik
coursetitle: "Temel Ağ Eğitimi"
excerpt: "Ağ oluşturma ve yönetme konusunda çözümler sunan bazı temel ağ aygıtlarını tanıyoruz."
tags: [hub, bridge, switch, router,]
categories: [temel-network]
tutorial: 2
cover: ag-aygitlaricover.webp
toc: true 
---


Bu bölümde, ağ oluşturma ve yönetme konusunda çözümler sunan bazı temel ağ aygıtlarını tanıyor olacağız. 

# Veri İletim Kanalı

Cihazlar arasında veri alışverişi olabilmesi için elbette bu verilerin bir kanalda taşınıyor olması gerekiyor. Veri iletimi için de temelde birkaç farklı çözüm mevcut.

![chanel.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/chanel.webp){:class="responsive img-zoomable"}

Örneğin sıradan ethernet kablosu, coaxial kablo, fiber, veya wi-fi ile veri iletmemiz mümkün.

Ethernet ve coaxial kablo verileri elektrik sinyalleri olarak taşır. 

Fiber, verileri ışık yolu ile taşır.

Wi-Fi ise radyo dalgaları aracılığı ile verilerin kablosuz şekilde iletilmesini sağlar.

Elbette bu taşıma yöntemlerinin de kendi içinde çeşitli versiyonları var. Örneğin ethernet üzerinde **Cat5 Cat6**, Wi-Fi üzerinde **Wi-Fi 4 Wi-Fi 5 Wi-Fi 6, fiberde ise SMF MMF** gibi farklı taşıma yaklaşımları var. Bu versiyonların hepsinin avantaj ve dezavantajları vardır. Tercih edilirken de bu avantaj ve dezavantajlar göz önünde bulundurulur. Versiyon detayları temel eğitim için kafa karıştırıcı olabilir fakat merak ediyorsanız kısa bir araştırma yapmanız yeterli. Yine de taşıma kanallarının neye göre tercih edilebileceğine dair genel fikir edinmek adına bazı örnek senaryolar verebiliriz.

1. **Yüksek Hızlı Veri İletimi:** Eğer yüksek hızda veri iletimi gerekiyorsa, fiber optik kablo tercih edilebilir. Örneğin, büyük veri merkezinde sunucular arasında hızlı veri alışverişi yapılması gerektiğinde, fiber optik kablo kullanmak daha mantıklı olabilir. Fiber optik kablolar, yüksek bant genişliği ve düşük gecikme süresi sunarak yüksek hızda veri iletimini sağlar.
2. **Kablosuz İletişim ve Taşınabilirlik:** Eğer verilerin kablosuz şekilde iletilmesi ve cihazların taşınabilir olması gerekiyorsa, Wi-Fi tercih edilebilir. Örneğin, bir ofiste çalışanlar arasında dizüstü bilgisayarlarla belge paylaşımı yapılması gerektiğinde, Wi-Fi ağı kullanmak kullanışlı olabilir. Bu sayede çalışanlar ofis içinde dolaşırken iletişimi kesintisiz olarak sürdürebilir.
3. **Uzun Mesafe İletişim:** Eğer iki uzak nokta arasında veri iletimi gerekiyorsa ve bu mesafe oldukça uzunsa, özel bir noktadan diğerine fiber optik bağlantı tercih edilebilir. Örneğin, farklı şehirlerdeki veri merkezleri arasında güvenli ve hızlı veri iletimi sağlamak için noktadan noktaya fiber bağlantılar kullanılabilir.
4. **Ekonomik Faktörler:** Maliyet faktörü önemli olduğunda, Ethernet kablosu tercih edilebilir. Örneğin, küçük bir işletme için ofis içi ağ bağlantılarını sağlamak için Cat5 veya Cat6 Ethernet kablosu kullanmak maliyet açısından uygun bir seçenek olabilir.
5. **Karışık İhtiyaçlar:** Birçok senaryoda farklı ihtiyaçlar bir araya gelir. Örneğin, büyük bir stadyumda hem yüksek hızda veri iletimi (fiber optik) hem de kablosuz bağlantı (Wi-Fi) gerekebilir. Burada hem hızlı bağlantı sağlamak hem de seyircilere kablosuz internet erişimi sunmak için farklı taşıma kanalları bir arada kullanılabilir.

Örnekler üzerinden izah ettiğimiz gibi tercih edilecek taşıma kanalının belirlenmesi, ihtiyaçları doğru bir şekilde analiz etmeyi gerektiriyor. Hepsinin amacı verileri bir noktadan bir diğerine taşımak fakat, bu taşımanın maliyeti ve verimliliği hangi kanalı tercih edeceğimizi etkiliyor. 

# Ağ Kartları | Network Interface Card(NIC)

Cihazların ağa bağlanmasını sağlayan ağ kartlarına “**N**etwork **I**nterface **C**ard” yani kısaca **NIC** deniyor. Bu kartlar ağ üzerinden gelen verilerin alınmasını ve yine ağa veri iletilmesini sağlıyor. Yani kablolu veya kablosuz şekilde ağa bağlanırken bu ağ kartlarını kullanıyoruz. Bu kartlar genellikle kullanılan cihazda gömülü olarak gelmekle birlikte harici olarak bağlayabileceğimiz ağ kartları da var. Bu ağ arayüz kartları aşağıdaki şekilde gözüküyor.

![nics.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/nics.webp){:class="responsive img-zoomable"}

# Repeater | Tekrarlayıcı

Repeater kelimesi “tekrarlayıcı” anlamına geliyor ve bu cihazın işlevi de tam olarak bu. Fiziksel olarak birbirinden uzakta yer alan cihazların, ağ üzerindeki iletişimini kuvvetlendirmek için iletişim kanalı arasına “repeater” olarak ifade edilen cihaz bağlanabiliyor. 

Kablolu veya kablosuz fark etmeksizin veri iletiminin fiziksel sınırları olduğu için belirli bir mesafenin üzerinde veri sinyalleri yavaşlayarak kaybolabiliyor. 

![repeater.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/repeater.webp){:class="responsive img-zoomable"}

Bu sebeple araya bu sinyalleri tekrarlatacak bir cihaz koyduğumuzda verileri daha uzun mesafelere iletmemiz mümkün oluyor.

![repeater2.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/repeater2.webp){:class="responsive img-zoomable"}

Örneğin standart bir ethernet kablosu ile sağlanan 100 metre ve üzerinde bağlantılarda kopmalar meydana gelebiliyor. Bu durumda veri sinyallerini kuvvetlendirmek üzere bu bağlantıya repeater eklenerek sinyallerin daha ileriye iletilmesi sağlanabilir. Benzer şekilde Wi-Fi sinyalleri de duvar gibi fiziksel engeller dolayısıyla absorbe olabildiği için araya bu Wi-Fi sinyallerini tekrarlayacak bir cihaz bağlanarak bu sinyallerin daha geniş alanlara iletilmesi mümkün oluyor.

![repeater-devices.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/repeater-devices.webp){:class="responsive img-zoomable"}

# Hub

Ağ oluşturmak üzere birden fazla cihazı yani host’u birbirine bağlayabileceğimizi biliyoruz. Fakat özellikle host sayısı artmaya başladığında bu bağlantının kurulumu ve yönetimi zahmetli olabiliyor. Hemen basit bir örnek olması için 5 host’u birbirine bağlayalım. Her host’un, birbiri ile haberleşebiliyor olması gerek.

![connect-5-host.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/connect-5-host.webp){:class="responsive img-zoomable"}

Görüldüğü üzere bu biraz karmaşık bir yapı. Ve ağa yeni bir host ekleyip çıkarmak istediğimizde de zahmetli bir iş. Bunun yerine tüm host bağlantılarını tek bir noktada toplamak için “hub” cihazlarını kullanabiliyoruz.

![Hub.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/Hub.webp){:class="responsive img-zoomable"}

Hub cihaz da kendisine gönderilmiş olan veri paketini, bağlı bulunan tüm hostlara iletiyor. Bu herkese iletilmesi yani aslında “**yayın yapılması**” metoduna da “**broadcasting**” deniyor.

![hub-broadcasting.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/hub-broadcasting.webp){:class="responsive img-zoomable"}

Hub aygıtı bu yaklaşımı tüm hostlardan gelen tüm istekler için aynen uyguluyor. Yani ağ üzerinde yalnızca iki host birbiri ile haberleşmek istiyor olsa bile her defasında tüm paketler tüm hostlara gönderiliyor. Bu sebeple HUB kullanımının esasen ağ trafiğinde yük oluşturma ve güvenlik konusunda olumsuz bir etkisi mevcut. Hub cihazı aşağıdaki şekilde gözüküyor.

![hub-device.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/hub-device.webp){:class="responsive img-zoomable"}

# Bridge

Bridge ifadesi Türkçe olarak “köprü” anlamına geliyor. Bridge aygıtı sayesinde iki HUB cihazını bağlayarak ağlar arası iletişim mümkün kılınıyor. Bridge esasen hangi hostun hangi ağda olduğunu bilen basit bir köprü aracıdır.

Örneğin aşağıdaki diyagram üzerinden inceleyecek olursak: sol taraftaki bir host yine sol taraftaki bir hosta veri göndereceği zaman bridge bu verinin sol taraftaki ağda kalması gerektiğini bildiği için bu veriyi sağ taraftaki ağa iletmez.

![bridge-broadcast.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/bridge-broadcast.webp){:class="responsive img-zoomable"}

Aynı şekilde sağdaki ağda yer alan bir host kendi ağı içindeki bir hosta veri iletmek istediğinde, köprü bu verilerin yalnızca sağ taraftaki ağda kalmasını sağlar.

![bridge-broadcast2.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/bridge-broadcast2.webp){:class="responsive img-zoomable"}

Elbette ağlar arasında veri aktarılacağında da bridge hangi hostun hangi ağda olduğunu bildiği için bu aktarıma izin veriyor. Örneğin gerektiğinde sol taraftaki bir host sağ tarafta yer alan ağdaki bir hosta veri gönderebilir.

![bridge-broadcast3.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/bridge-broadcast3.webp){:class="responsive img-zoomable"}

Diyagramlar üzerinden de açıkça görebildiğimiz gibi standart bridge cihazları da broadcast yayını şeklinde verileri iletir. Yani spesifik olarak bir hosta veri iletmek istiyor olsak bile bu veri HUB vasıtasıyla tüm hostlara iletilir. Bu durum da ağ üzerinde gereksiz trafik yükü oluşturur. Özellikle büyük ağlarda bu yaklaşımın kullanımı güvenli ve verimli değildir. 

# Switch

Switch cihazı aslında HUB aygıtlarının daha akıllı bir alternatifidir. Switch aygıtına da birden fazla host bağlanabiliyor ve switch hangi hostun hangi porta bağlı olduğunu bildiği için uygun veriyi yalnızca uygun hosta yönlendirebiliyor.

Bildiğiniz gibi HUB aygıtları verileri “**broadcast**” ile, kendisine bağlı bulunan tüm hostlara gönderiyor. Switch ise hangi hostun hangi porta bağlı olduğunu bildiği için verileri spesifik olarak ilgili hosta yönlendiriyor. Bu hedef odaklı veri iletilmesine de “unique” yani “benzersiz” ifadesinin kısaltmasından gelen “**unicast**” deniyor. Veriler hedef odaklı iletildiği için her seferinde ağdaki tüm hostlar boş yere meşgul edilmemiş, ağ trafik yükü azaltılmış oluyor. Dolayısıyla daha hızlı bir iletişim sağlanabiliyor.

![switch-unicast.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/switch-unicast.webp){:class="responsive img-zoomable"}

Switch cihazına bağlı olan tüm hostlar aynı ağdadır ve hepsinin benzersiz bir IP adresi vardır. 

![switch-ip-address.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/switch-ip-address.webp){:class="responsive img-zoomable"}

Ben kısaltma şeklinde verdim fakat network adresi **192.168.1.0** şeklinde. Fakat “0” yerine hostların IP adresi gelebileceği için “X” ile ağ adresini belirttim. Ve tüm hostlar aynı ağda olduğu için network adresi olan **192.168.1** adresinin tekrar tekrar yazmak yerine yalnızca benzersiz host numaralarını yazdım. Yani örneğin ilk bilgisayar **192.168.1.10** IP adresine sahip fakat kısaca “**.10**” ile temsil ediliyor.

Bu örnek diyagram tek bir ağdaki hostların switch ile bağlantısını temsil ediyor. Eğer hostları ayrı ağlara bölmek istersek bunun için birden fazla switch kullanabiliyoruz.

![2-network-with-switch.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/2-network-with-switch.webp){:class="responsive img-zoomable"}

Gördüğünüz gibi hostları switch ile gruplayarak ayrı ağlar oluşturduk. Bu hostlar yalnızca kendi ağları içindeki hostlar ile iletişim kurabilir. Çünkü her iki ağ birbirinden izole.

Farklı ağlardaki hostlar birbiri ile iletişim kurmak istiyorsa router ile bu ağları birbirine bağlamamız gerekiyor.

# Router

Router, ağları birbirine bağlayan bir kontrol cihazıdır. Ağlar arasındaki tüm trafik router üzerinden yönlendirildiği için her türlü filtreleme ve yönlendirme konfigürasyonu tanımlamamız da mümkün oluyor. Örneğin switchleri router ile bağlayarak birden fazla ağı birbirine bağlayabiliriz. 

![router-with-switchs.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/router-with-switchs.webp){:class="responsive img-zoomable"}

Router bu yönlendirme işini, kendi bünyesinde tuttuğu yönlendirme tablosu(routing table) sayesinde gerçekleştiriyor. Bu yönlendirme tablosundan daha sonra ayrıca bahsedeceğiz. Yönlendirme tablosu dışında routerlar aslında her bir ağa dahil olmak üzere benzersiz bir IP adresine de sahiptirler.

![router-with-switchs-ip.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/router-with-switchs-ip.webp){:class="responsive img-zoomable"}

Yukarıdaki diyagramda **192.168.1.X** ağında bağlı cihazlar routerın IP adresini **192.168.1.1** olarak görüyor. 

**192.168.2.X** ağına bağlı cihazlar ise aynı routerın IP adresini **192.168.2.254** olarak görüyor. Yani routerlar bağlı bulundukları ağlara dahil olmak üzere bağımsız IP adresleri alabiliyorlar.

Bu sayede ağlara dahil olup ağlar arasında “**getway**” olarak isimlendirilen “geçit” görevi görebiliyorlar. Örneğin **192.168.1.**0 ağındaki **30** numaralı hostun “default getway” adresi aşağıdaki gibidir. 

![default-getway.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/default-getway.webp){:class="responsive img-zoomable"}

Hostlar kendi ağlarının dışındaki bir host ile iletişime geçmek istediklerinde, diğer ağlara veri paketlerini yönlendiren yapı “default getway”’dir. 

Örneğin aynı router’a bağlı olan **192.168.2.X** ağındaki bir host için **default getway** adresi de **192.168.2.254**’dür.

![default-getway2.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/default-getway2.webp){:class="responsive img-zoomable"}

Benzer şekilde ev ağımız olan LAN üzerinden internet olarak bilinen geniş WAN ağına çıkmak için router kullanıyoruz. Bu sayede evimizdeki ağa bağlı olan tüm cihazlar router üzerinden internete bağlanabiliyor. 

Modem olarak bildiğiniz cihaz da aslında kendi içinde switch ve router barındıran bir cihazdır. Bu cihaz sayesinde evimizdeki cihazlar birer host olarak kendi ağımıza bağlanıp, bu ağ da router ile internet servis sağlayıcına bağlanarak internet ağına erişmemiz mümkün oluyor.

![LAN-to-WAN-with-router.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/LAN-to-WAN-with-router.webp){:class="responsive img-zoomable"}

Gerçek dünya örneği olması açısından modeminiz yani routerınızın IP adresinin bu ağa bağlı olan hostların default getway adresi olduğunu kendi ağınız üzerinden teyit edebilirsiniz. Bunun için daha önce lokal IP adresinizi öğrenmek üzere konsola girmiş olduğunuz `ifconfig` veya `ip addr` komutlarını tekrar girip çıktılara göz atabilirsiniz.

![ipconfig.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ipconfig.webp){:class="responsive img-zoomable"}

Bakın burada, benim Windows hostum **Default Getway** adresi olarak **192.168.1.1** değerini almış. Eğer bu IP adresini tarayıcıma yazıp onaylayacak olursam, modemimin konfigürasyon penceresi açılacak.

![default-getway-login.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/default-getway-login.webp){:class="responsive img-zoomable"}

Bu pencere açıldı çünkü benim bilgisayarımda default getway olarak bu modem(router) kullanılıyor. Yani ben lokal ağımdan geniş ağ olan internete bu geçit(getway) görevi gören modem(router) üzerinden çıkış yapıyorum. Dolayısıyla bu IP adresini girdiğimde modemimi konfigüre edebileceğim pencere açılıyor.

Burada modem, lokal IP adreslerini internet servis sağlayıcısının bana tahsis etmiş olduğu genel(public) IP ile **NAT**(**N**etwork **A**ddress **T**ranslation) sayesinde dönüştürüp benim internet ağına çıkmamı sağlayan bir geçittir(getway). 

![NAT.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/NAT.webp){:class="responsive img-zoomable"}

Daha önce lokal ağımıza özel olan IP adreslerinden bahsederken bu durumu ele almıştık hatırlıyorsanız. Şimdi bizzat bu durumu teyit etmiş olduk.

Router sayesinde ağları hiyerarşik bir biçimde birbirine bağlamamız mümkün oluyor. Daha önce örneğini verdiğimiz “bir şirketin alt ağlara bölünmesi” durumu da routerlar sayesinde mümkün oluyor. 

![company-router.webp]({{ site.url }}/egitim/temel-network/ag-aygitlari/company-router.webp){:class="responsive img-zoomable"}

Hazır yeri gelmişken çok kısaca hatırlayacak olursak; switchler, hostlar arasındaki iletişimi mümkün kılarken, routerlar ise ağlar arasındaki iletişimi mümkün kılarlar. 

Şimdiye kadar bahsettiğimiz aygıtlar dışında elbette kullanılan pek çok farklı ağ aygıtı mevcut. Bunlarda birkaçını aşağıdaki şekilde sıralayabiliriz.

- Access Point: **(Erişim Noktası):** Kablosuz ağları oluşturmak, genişletmek veya cihazlara kablosuz ağ bağlantısı sağlamak için kullanılan cihazdır. Modemlerden farklı olarak, sadece kablosuz bağlantılarla ilgilenirler.
- Firewall: **(Güvenlik Duvarı):** Ağ trafiğini izleyen ve denetleyen güvenlik cihazıdır. İstenmeyen erişimleri engellemek, ağ güvenliğini sağlamak ve veri trafiğini denetlemek için kullanılır. Routerlar genellikle dahili firewall özellikleri sunsa da, işletmelerde daha güçlü ve özelleştirilebilir firewall cihazları tercih edilir.

Bunlar dışında aşağıdaki gibi özelleşmiş amaçlar için kullanılan aygıtlar da vardır.

- Proxy
- Load Balancer
- Virtual Switch
- IDS/IPS

Fakat ben tüm ağ aygıtlarından bahsetmeyi planlamıyorum çünkü ağ temellerini anlamak için bu kadarı yeterli. Zira hepsi çeşitli amaçlar için özelleştirilmiş olan ve esasında temelde router veya switch cihazları gibi davranan cihazlardır. Örneğin pek çok modem ve router üzerinde firewall ayarlaması gerçekleştirerek gelen ve giden trafiği istediğimiz gibi filtreleyebiliyoruz. Elbette yalnızca “firewall” görevi için üretilmiş olan donanımlar kadar güçlü ve özelleştirilebilir olmasa da dediğim gibi biz ağ temellerinin teorik kısmını ele aldığımız için başlangıç düzeyi için gerektiği kadar detaya değindiğimi düşünüyorum. Daha fazlası için pek alâ kendiniz de ek araştırmalar yapabilirsiniz.