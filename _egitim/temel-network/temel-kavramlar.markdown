---
layout: tutorial
title:  "Temel Kavramlar"
modified: 2023-05-20
author: Taylan Özgür Bildik
coursetitle: "Temel Ağ Eğitimi"
excerpt: "Eğitim boyunca karşılaşacağımız temel kavramları ele alıyoruz"
tags: [network, host, client, server, IP, subnetting]
categories: [temel-network]
tutorial: 1
cover: temel-kavramlarcover.webp
toc: true 
---


Öncelikle tüm eğitim boyunca tekrar tekrar karşılaşacağımız temel kavramları açıklayarak başlayalım.

# Ağ(Network) Nedir ?

“**ağ**” yani “**network**” olarak bilinen yapı esasen iki veya daha fazla cihazın iletişim kurabilmesi için oluşturulan bağlantının genel adıdır. İhtiyaca göre iki veya çok daha fazla cihazın bağlanmasıyla “network” oluşturabiliyor.  

# Host Nedir ?

Ağ üzerinde veri alışverişinde bulunan cihazlara da “**host**” deniyor. Yani ağa bağlı olan, bilgisayarları, telefonları, yazıcıları, sunucuları ve benzer tüm cihazları “host” olarak isimlendiriyoruz. Ayrıca bunlar dışında tabii ki "internet of things(IoT)" olarak geçen akıllı televizyonlar, akıllı ev sistemleri de sayılabilir. Yani ağ üzerinde veri trafiği oluşturan ve bu trafiği alan tüm cihazlara “host” deniyor. 

# İstemci(Client) Sunucu(Server) Nedir ?

Ağ üzerindeki hostlar, büründükleri roller gereği “**Client**” ve “**Server**” yani “**İstemci**” ve “**Sunucu**” olarak isimlendirilebiliyor. 

Client talep eden, Server ise yanıtlayan taraftır. Örneğin bir websitesine ulaşmak üzere client istekte bulunur web server ise yanıt olarak websitesini sunar.

![client-server.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/client-server.webp){:class="responsive img-zoomable"}

Sunucular da aslında içerisinde spesifik yanıtlara karşılık verebilecek yazılımların kurulu olduğu sıradan bilgisayarlardır. Herhangi bir bilgisayara uygun yazılımları kurup bu bilgisayarın sunucu olarak hizmet vermesini sağlayabiliyoruz. Örneğin websitenizi sunmak için gereken yazılımları kurup websitenizi kendi bilgisayarınız üzerinden internete açabilirsiniz. Yani kendi bilgisayarınızı sunucu haline getirebilirsiniz. Sizin websitenize ulaşmak isteyen clientlar da sizin bilgisayarınıza yani sunucuya istekte bulunur, bilgisayarınız da server rolü gereği bu istekleri yanıtlar.

![server.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/server.webp){:class="responsive img-zoomable"}

Aslında bu roller değişkendir. Örneğin bir web sunucusu da websitesinin dosyalarını istemek için file servera istekte bulunabilir. Bu durumda web server istemci halini alırken, file server sunucu rolündedir. 

![file-server.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/file-server.webp){:class="responsive img-zoomable"}

Benzer şekilde örneğin file server da güncelleme almak için update server dan istekte bulunacak olursa, bu durumda file server istemci, update server ise sunucu rolünü üstlenmiş oluyor.

![update-server.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/update-server.webp){:class="responsive img-zoomable"}

Yani istemci ve sunucu olma durumu tamamen değişken bir kavramdır. İstemci, veri veya hizmet talep eden tarafı temsil ederken, sunucu ise bu taleplere yanıt veren tarafı temsil eder.

# LAN(Local Area Network)

Yerel ağlar, isminden anlaşılabileceği gibi ofis ve ev gibi sınırlı bir alan içindeki cihazların yerel iletişimi sağlamak üzere kullanılan ağın kapsamını belirtiyor. Örneğin ofisteki bilgisayarların yazıcıya erişmek için yerel ağda olmaları yeterlidir. 

![LAN.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/LAN.webp){:class="responsive img-zoomable"}

# WAN (Wide Area Network)

Birden fazla yerel ağın(LAN) birleştirilmesi ile oluşturulan daha geniş bir ağ kümesine WAN deniyor. En geniş WAN “internet” olarak bildiğimiz ağdır. Cihazlar kendi bulundukları lokal ağlarından, uygun şekilde herkesin bağlı olduğu bu ağa bağlanarak, ağdaki tüm cihazlar ile uygun koşullar altında iletişim kurabiliyor. 

![WAN.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/WAN.webp){:class="responsive img-zoomable"}

Yani en az iki lokal ağın birbirine bağlanmasıyla bile WAN ağı oluşturulabilir. Buradaki amaç ağlar arasındaki veri iletiminin sağlanabilmesidir. 

<p class="mavi"><strong>ℹ️ Not:</strong> Açıklamalar sırasında kullandığım diyagramlar elbette basitleştirilmiş görselleştirmelerden ibaret. Ayrıca burada bahsi geçen ağ türleri dışında farklı amaçlarla kullanılan çeşitli ağ türleri de mevcut. Fakat temelde bu kadarlık bilgi bize şimdilik yeterli.</p>

# IP Adresi

IP adresi her host’un sahip olması gereken benzersiz kimliğidir. Bu kimlik sayesinde hostlar arasında ağ üzerinden iletişim mümkün oluyor.

Örneğin bir websitesini ziyaret etmek istediğinizde, ziyaret etmek istediğiniz web server’ın IP adresi hedef IP, sizin IP adresiniz de kaynak IP olarak bir pakete eklenip bu istek ağ üzerinden hedef server’a iletiliyor. 

![IP.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/IP.webp){:class="responsive img-zoomable"}

Bu sayede hedefteki server da yanıtını hangi IP adresine göndermesi gerektiğini, kaynak IP adresine bakarak öğreniyor ve yanıtını bu IP adresine iletebiliyor. 

![IP-response.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/IP-response.webp){:class="responsive img-zoomable"}

Bu yaklaşım sayesinde ağdaki tüm hostlar benzersiz kimlikleri sayesinde birbiri ile uygun şekilde haberleşebiliyor. 

IP adreslerini anlamak, ağların oluşumunu kavramak için önemli olduğundan tam da bu noktada IP adreslerinin nasıl oluştuğuna değinerek devam etmek istiyorum.

## IP Adresleri Nasıl Tanımlanır ?

Bilgisayar dünyasında verilerin 0 ve 1’lerden ibaret olduğunu mutlaka daha önce duymuşsunuzdur. **0** ve **1** aslında “**binary**” yani “**ikili**“ sayı sistemi sayesinde verilerin temsil edilmesini sağlıyor. Bilgisayar dünyasındaki en küçük birim olan bu “0” veya “1” olma durumuna da “**bit**” deniyor. Yani bir bitlik bir veri ya “**0**” ya da “**1**” olabilir. Bu sebeple IP adresleri de aslında 0 ve 1’lerden oluşan bitlerle tanımlanıyor. 

IPv4 olarak geçen IP adresleri birbirinden noktalar ile ayrılmış 4 adet 8’er bitten toplam 32 bit uzunluğunda bir değerdir. IP adresindeki her **8 bitlik** bloklar da aslında “**oktet**” ****olarak isimlendiriliyor. Dolayısıyla bir IP adresi aşağıdaki aralıkta olabilir.

![ip-range.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ip-range.webp){:class="responsive img-zoomable"}

Fakat bu sayılar bizim için pek okunaklı olmadığından bunları daha aşina olduğumuz ondalık gösterime çevirebiliriz. Hesaplama için de her bir oktetteki basamak sayısına göre ikinin üsleri ile çarpıp sonuçları toplamamız gerek. 

Öncelikle “**00000000**” oktetini hesaplayalım.

![binary-to-decimal.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/binary-to-decimal.webp){:class="responsive img-zoomable"}

Diğer 3 oktet de aynı olduğu için ondalık gösterimde IPv4 adresleri **0.0.0.0**’dan başlıyor.

En son verilebilecek IP adresini öğrenmek için “**11111111**” oktetini de hesaplayalım.

![binary-to-decimal2.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/binary-to-decimal2.webp){:class="responsive img-zoomable"}

Diğer 3 oktet de aynı olduğu için ondalık gösterimde IPv4 adresleri en fazla **255.255.255.255** değerini alabiliyor. Yani aslında ondalık gösterimde **0.0.0.0-255.255.255.255** aralığında IP adresi tanımlaması yapmamız mümkün.

Teorik olarak her bir oktette 2^8 den toplam 4 oktette 2^32 yani 4,2~ milyar IP adresi tanımlanabiliyor. İşte IP adreslerinin hesaplaması bu şekilde yapılıyor. Tabii ki her seferinde IP adreslerini hesaplamak için bizim bu tür bir çeviriye ihtiyacımız yok. Yalnızca arka planda nasıl bir işleyiş olduğunu kavrayabilmemiz için bu yaklaşımı bilmemiz gerekiyor.

İlk zamanlarda bu kadar IP adresinin yeterli olacağı düşünülmüş olsa da günümüzde 4.2~ milyar IP adresi kesinlikle yeterli değil. Bu duruma çözüm olarak “**alt ağ**” oluşturma yani “**subnetting**” yaklaşımı kullanılabiliyor. 

## IP Subnetting

Subnet kavramı “**sub net**work” ifadesinin kısaltmasından geliyor. Ve ağları daha küçük ağlara bölmemizi sağlıyor. Bu sayede IP adreslerini daha verimli kullanıp, ağ üzerindeki trafiği azaltabiliyor ve güvenlik gibi avantajları dolayısıyla da ağı çok daha kolay yönetebiliyoruz. Alt ağlara bölmenin neden avantajlı olduğunu tam olarak anlamak için aslında ağ konusunda biraz daha bilgiye sahip olmamız gerek. Şimdilik önemli olduğunun bilinciyle devam edelim.

Her bir IP adresi üzerinde aslında “network” ve “host” olmak üzere iki temel bilgi bulunur. Network kısmı “ağ” adresinin, host kısmı ise “ağdaki cihazların” adreslerinin belirlenmesini sağlar. IP adresi üzerinde network ve host ayrımını yapabilmek çok önemli çünkü birbirine bağlı olan birden fazla ağ üzerindeki cihazların haberleşebilmesi için network ve host bilgisine ihtiyacı var.

Çok basit şekilde bu durumu görselleştirecek olursak “X Ağı” ve “Y Ağı” olmak üzere iki ayrı ağdaki hostları düşünelim.

![x-y-networks.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/x-y-networks.webp){:class="responsive img-zoomable"}

Örneğin X ağındaki 192.168.1.2 IP adresine sahip host, kendi ağındaki 192.168.1.4 IP adresine sahip olan host ile iletişime geçmek isterse bunu rahatlıkla yapabilir çünkü aynı ağda olduklarını 192.168.1 değerine bakarak anlayabiliyor. Dikkat edecek olursanız aynı ağdaki tüm hostlar aynı IP adresi ile başlıyor. Bu adres de zaten bulundukları network yani ağın adresini belirtiyor.

Benzer şekilde eğer X ağındaki bir host 192.168.5.3 IP adresine sahip hosta veri göndermek istediğinde de yine IP adresindeki 192.168.5 kısmına bakarak bu hostun kendi ağında olmadığını anlayabiliyor. Bu sayede gönderim işlemini de harici bir ağa nasıl gönderim yapılması gerekiyorsa o şekilde gerçekleştiriyor. 

Eğer IP adreslerinin belirli bir kısmı network yani ağ adresini tanımlamıyor olsaydı birbirine bağlı olan ağlar arasında iletişim mümkün olmazdı çünkü doğru ağ bulunamazdı. 

### Network ve Host Ayrımı Nasıl Yapılır ?

IP adresi üzerinde “network” ve “host” ayrımını yapabilmek için “**subnet mask**” ya da “**alt ağ maskesi**” olarak bilinen adrese bakıyoruz. Daha iyi anlamak için hemen somut bir örnek verelim.

Örneğin IP adresi **192.168.1.10** olan ve subnet maskı **255.255.255.0** olan bir IP adresi gördüğümüzde:

**192.168.1** kısmı **network** yani ağ adresini belirtiyor.

**10** ise bu ağdaki **host**un yani cihazın adresini belirtiyor. 

Yani bu IP adresi **192.168.1.0** ağındaki **10** numaralı hosta işaret ediyor. Peki ama bunu nasıl anladık ? Tabii ki subnet mask olarak geçen değere bakarak. En yalın haliyle IP adresini ve subnet mask değerini alt alta koyup, subnet mask değerindeki her 255 sayısına karşılık gelen IP adresindeki oktetlerin ağ adresini temsil ettiğini bilmeniz yeterli. Ağ adresi dışında kalan kısım ise host kısmını temsil eder. Aşağıdaki görsel bu durumu açıklıyor.

![ip-subnetmask.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ip-subnetmask.webp){:class="responsive img-zoomable"}

Dolayısıyla 192.168.1.0 ağında 0 ila 255 arasında host bulunabiliyor. Yani biz bu 192.168.1.0 ağına bağlı olan cihazlara bu kadar sayıda IP tanımlaması yapabiliyoruz.

Burada dikkat etmeniz gereken detay **0.** değer aslında **ağın kendisini** temsil ettiği için bir hosta bu değer tanımlanamaz. Yani bu ağın adresi **192.168.1.0** olduğu için **0.** IP, host IP adresi olarak tanımlanamaz.

Benzer şekilde ileride ele alacağımız **broadcast** olarak geçen yaklaşım dolayısıyla genellikle ağda tanımlanabilir olan en son IP adresi broadcast için ayrılıyor. Örneğin bu ağda **255.** IP adresi de bu amaçla rezerve edilmiştir. Yani 255. IP adresi de hostlara IP adresi olarak tanımlanamaz. Dolayısıyla teknik olarak bu ağ üzerinde **1-254** arasında IP tanımlaması yapabiliriz. 

Burada belirttiğim, kısayoldan subnet mask üzerindeki 255 sayısına bakarak bulma yaklaşımı mantığınıza yatmamış olabilir. Bu sebeple kısayol yerine tam olarak nasıl hesaplandığını açıklayalım. Nasıl hesaplandığını anladığınızda zaten kısayoldan kendiniz de hesaplayabiliyor olacaksınız. 

Öncelikle ondalık biçimde olan IP adresini ikili gösterimde yazalım. **192.168.1.10** IP adresini ikili sistemde göstermek için her bir grup için 8 bitlik ikili sayılara dönüştürmemiz gerekiyor:


`192` -> `11000000`

`168` -> `10101000`

`1` -> `00000001`

`10` -> `00001010`


Bu sayıları birleştirerek **192.168.1.10** IP adresini ikili gösterimde şu şekilde elde ederiz: 

`11000000.10101000.00000001.00001010`

Aynı şekilde **255.255.255.0** subnet mask değerini de ikili biçimde yazalım.

`11111111.11111111.11111111.00000000`

Şimdi ağ kısmını bulmak için iki adresi alt alta yazıp matematikteki “**ve**” mantığına göre değerlendirmemiz gerek. Yani **1** ve **1** olduğu durumda **1**, aksi halde **0** değeri kabul edilecek. 

**11**000000.**1**0**1**0**1**000.0000000**1**.00001010 : IP Adresi

**11**111111.**1**1**1**1**1**111.1111111**1**.00000000 : Subnet Mask

**11**000000.**1**0**1**0**1**000.0000000**1**.00000000 : Sonuç

Elde ettiğimiz sonucu ondalık gösterime çevirecek olursak: **192.168.1.0** değerini alıyoruz. Bu da “**ağ**” yani “**network**” kısmını veriyor. Network dışında kalan kısımlar ise host olarak kabuk ediliyor. Sonuç olarak burada ele aldığımız örnekte, cihaz kimliği yani hostlar için 8 bit kullanılıyor ve 2^8 - 2 kadar host adresi olabilir. Bu, 256 - 2 = 254 host adresine denk geliyor. Bildiğiniz gibi 2 çıkarılıyor çünkü her bir alt ağ için ilk IP adresi ağın kendi adresi(192.168.1.0) ve son IP adresi ile broadcast adresi(192.168.1.255) olarak rezerve ediliyor.

Elbette subnet mask değeri her zaman 255.255.255.0 şeklinde olmak zorunda da değil.

Örneğin 192.168.1.10 IP adresi 255.255.0.0 subnet mask adresine sahip olursa, bu IP adresinin **192.168.** kısmı **network**, **1.10** kısmı ise **host**u belirtir. Dolayısıyla 192.168.0.0 dan 192.168.255.255 adresine kadar hostlar için IP tanımlaması yapılabilir. Ve tüm bu hostlar 192.168 ile başlayan ağın içerisindedir. Sonuç olarak, hostlar için 16 bit kullanılabiliyor yani 2^16 - 2 kadar host adresi olabilir. Bu da, 65536 - 2 = 65534 host adresine denk gelir. 2 çıkarılıyor çünkü her bir alt ağ için ağ kimliği ve yayın adresi rezerve ediliyor.

Aynı IP adresi 255.0.0.0 subnet mask değerine sahip olsaydı bu kez **network** kısmı **192.** olup, geri kalan tüm IP bölümleri hostlar için tanımlanabiliyor olacaktı. Sonuç olarak, hostlar için 24 bit kullanılabildiği için 2^24 - 2 kadar host adresi tanımlanabilir. Bu da, 16777216 - 2 = 16777214 host adresine denk gelir. 2 çıkarılıyor çünkü her bir alt ağ için ağ kimliği ve yayın adresi rezerve ediliyor.

Üstelik subnet mask değerleri kısaca bitlerin toplamı şeklinde de gösterebiliyor. Örneğin “**255.255.255.0**” subnet mask değerini yalnızca “**/24**” şeklinde de belirtebiliriz. Bu kısa gösterimin hesaplanması için subnet mask değerindeki bitlerin toplanması gerekiyor. Bunun için öncelikle subnet mask değerini ikili gösterimde yazalım:

11111111.11111111.11111111.00000000 

Bu gösterimdeki **1** değerlerini toplayıp **8**+**8**+**8** den **24** değerine ulaşabiliyoruz. Bu sayede IP adresini ve subnet mask değerini örneğin “**192.168.1.10/24**” şeklinde kısaca ifade edebiliyoruz. Buradaki 24 sayısı biraz önce gerçekleştirdiğimiz subnet mask değerinin ikili gösterimindeki “**1**” değerlerinin toplamından geliyor.

Dolayısıyla “**255.255.0.0**” subnet mask değerini “**16**”, “**255.0.0.0**” gösterimini ise “**8**” ile kısaca belirtebiliyoruz. Subnet mask değerlerinin bu kısaltılmış gösterimine de “**prefix**” deniyor.

Subnet mask hakkında biraz daha detaydan bahsedecek olursak, elbette subnet mask değerleri her zaman bizim şimdiye kadar ele aldığımız değerlerde de olmak zorunda değil. Ağ büyüklüğünü yani ağdaki kullanıcı sayısını istediğimiz değerde ayarlayabilmek için özelleştirilmiş subnet mask değerleri de tanımlayabiliyoruz. 

Örneğin yalnızca 60 hostluk bir ağa ihtiyacımız var diyelim. Bunun için ağ büyüklüğünü istediğimiz ölçüye göre daraltabiliriz. Sizin de bildiğiniz gibi hostlar, IP gösteriminde subnet mask değerinin 0 olduğu bölümlerde bulunduğu için bize 60 civarı host sağlayacak kadar 0 değerinin subnet mask üzerinde bulunması gerek. Oktetlerin her basamağında 2’nin üssü olarak IP adreslerinin üretildiğini biliyoruz. Bu sebeple 60 civarına gelene kadar ikinin üssü şekilde yazıp toplayalım. 

![subnet-calc.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/subnet-calc.webp){:class="responsive img-zoomable"}

Bakın peşi sıra yazıp topladığımızda **2^5** değerine kadar olan üslerin toplamı sayesinde **63** sayısına ulaşabildiğimizi hesapladık. Yani gördüğünüz gibi 60 civarı bir host için gereken sayıya 6 basamakta ulaşabiliyoruz. IP adresi üzerinde hostların alanı “0” ile temsil edildiği için de subnet mask değerinin sonunda 6 tane 0 bulunması gerektiğini bu şekilde hesaplamış olduk.

**2^0** + **2^1** + **2^2** + **2^3** + **2^4** + **2^5** = **63**

**1** + **2** + **4** + **8** + **16** + **32** = **63** 

Yani subnet mask değeri **11111111.11111111.11111111.11000000** şeklinde olmalı. Bu subnet mask değerinin prefix olarak gösterilmesi için “1” lerin toplandığını biliyorsunuz. Dolayısıyla ağ büyüklüğünü istediğimiz gibi ayarlamak için kısaca **/26** subnet mask değerini kullanmamız gerekiyor.  

Tersten bakacak olursak aslında subnet mask değeri maksimum **11111111.11111111.11111111.11111111** şeklinde **32 bit**lik olabileceği için ve biz sonda **6** tane **0** istediğimiz için **32-6**=**26** değerini de kolayca bulabiliyoruz. 

Yani **192.168.1.10/26** şeklindeki gösterim sayesinde **192.168.1.0** ağı içerisinde ağ adresi ve broadcast adresini saymazsak **62** tane host için IP tanımlama imkanına sahibiz. Bizzat adım adım gördüğünüz gibi bu yaklaşımı kullanarak ağın büyüklüğünü dilediğimiz gibi belirlemiş olduk.

Elbette bu tanımlama biraz zahmetli gelmiş olabilir. Bunu zihninizden yapmak yerine internet üzerinde bu iş için hesaplama yapan araçları da kullanabilirsiniz. “**IP Subnet Calculator”** şeklinde aratacak olursanız benzeri işi yapan pek çok çevrimiçi araca ulaşabilirsiniz.

Bu araçlar üzerinde oluşturmak istediğiniz ağın büyüklüğünü ve ağ adres aralığını belirtip dilediğiniz ağ adresini dilediğiniz büyüklükte konfigüre edebilirsiniz. Benzer şekilde daha öncesinde konfigüre edilmiş olan ağın büyüklüğünü öğrenmek için de bu aracı kullanabilirsiniz. 

Ben denemek üzere örnek olarak ele aldığımız IP adresi tanımlamasını internet üzerinde bulduğum araçlardan birine giriyorum.

![ip-subnet-calculator.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ip-subnet-calculator.webp){:class="responsive img-zoomable"}

Bakın gördüğünüz gibi tam olarak bizim belirttiğimiz şekilde hostlar için kullanılabilir “62” tane IP adresi olduğu açıkça belirtiliyor.

![ip-subnet-calculator-result.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ip-subnet-calculator-result.webp){:class="responsive img-zoomable"}

Ayrıca aldığım sonuçların alt tarafında,192.168 ile başlayan 4 ağ oluşturabileceğimiz de belirtilmiş. 

![ip-subnet-calculator-result2.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ip-subnet-calculator-result2.webp){:class="responsive img-zoomable"}

Sırasıyla bu ağların IP adresleri, hostlara tanımlanabilir IP aralığı ve broadcast adresleri açıkça belirtiliyor. 

Bu yaklaşımla 4 adet ağ oluşturup her birinde 62 hosta kadar IP tanımlayabileceğimiz bir subnet mask tanımlamış olduk. Yani örneğin 192.168.1.70/26 şeklinde bir tanımlama gördüğünüzde bu ifade 192.168.1.64 ağı altında 62 host tanımlanabileceğini ve bu IP adresinin de bu ağdaki 70 numaralı IP adresine sahip olduğunu belirtir. Eğer bu tanımlama kafanıza yatmadıysa şimdiye kadar bahsetmiş olduğumuz çözümleme yöntemleri ile sağlamasını yapabilirsiniz. Hemen hızlıca “ve” mantığı ile IP ve subnet mask değerlerine bakarak ağ adresini bulacak olursak:

**11**000000.**1**0**1**0**1**000.0000000**1**.0**1**000**11**0 : IP Adresi(192.168.1.70)

**11**111111.**1**1**1**1**1**111.1111111**1**.1**1**000000 : Subnet Mask(26 ya da 255.255.255.192)

**11**000000.**1**0**1**0**1**000.0000000**1**.0**1**000000 : Ağ Adresi (192.168.1.64)

Gördüğünüz gibi 192.168.1.70/26 şeklinde tanımlı bir IP adresinin ağ adresinin 192.168.1.64 olduğunu, 70 sayısının ise bu ağdaki hostun benzersiz IP adresi olduğunu öğrenmiş olduk. Bu ağda, hostlar için 192.168.1.65-192.168.1.127 aralığında tüm IP adresleri tanımlanabilir. Yani ağda 62 host bulunabilir. Tanımlanabilir olan ilk IP adresi ağ adresi olduğu için 192.168.1.64 IP adresi ağın kendi adresidir. Tanımlanabilir en son IP adresi de 192.168.1.127 olduğu için bu adres de broadcast için ayrılmıştır. 

Benzer şekilde siz de kaç ağ ve kaç host için tanımlama yapacaksanız buradaki değerleri uygun şekilde konfigüre edebilirsiniz. Gerçek dünya örneği vermemiz gerekirse, örneğin bir şirket farklı şehirlerdeki şubeler için farklı ağlar kullanabilir. Ayrıca bu ağlar içinde farklı departmanlar için de farklı ağlar kurabilir. Bu sayede ağların yönetimi kolaylaşmış olur. 

![subnetting-for-company.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/subnetting-for-company.webp){:class="responsive img-zoomable"}

IP adresi ve subnet mask tanımlaması genellikle karıştırılan bir konu fakat temel düzeyde işleyişi bildiğimizde aslında pek de karmaşık değil. Zaten ben de bu sebeple temel işleyişi çok kısaca izah etmeye çalıştım. Ayrıca eğer gözünüz korktuysa kesinlikle endişelenmeyin zira sürekli hesaplama yapmanızı gerektiren bir işiniz yoksa hesaplama yöntemi hafızanızda birebir kalmayacağı için internet üzerinden bu tür araçlardan yardım almanız son derece normal. Eğer ezber gerektiren bir sınava hazırlanmıyorsanız, gerçek dünyada işi sağlama almak için zaten araç kullanabilirsiniz. 

Yine de ağ temellerini doğru şekilde anlayabilmek için bir IP adresindeki “network” ve “host” kısımlarının kapsamını biliyor olmanız çok önemli. Bu sebeple bu bölme gereken ehemmiyeti göstermenizi rica ediyorum.

## Genel ve Özel IP Adresleri Hakkında

IP adresi tanımlaması aslında “**public-genel**” ve “**local(private)-özel**” olmak üzere iki kapsamda gerçekleştiriliyor. **LAN** yani lokal ağımızdaki hostlara “**local ip**” adresi tanımlanıyorken, **WAN** yani internet gibi geniş ağlarda ise genel ya da “**public ip**” tanımlanıyor. 

Lokal ağınızda çalışırken, modeminiz tarafından size tanımlanmış olan IP adresleri aslında kendi lokal ağınızdaki haberleşme için kullanılan “local ip” adresidir. Bu IP adresleri ile internete çıkmazsınız. Modeminiz, internet servis sağlayıcısının size tahsis etmiş olduğu “public ip” adresi ile, lokal ağdaki tüm cihazların internete çıkmasını sağlar. Yani lokal ağınızdaki IP adresleri internet üzerindeki IP adresiniz değildir. Lokal ağınızdaki IP adresi dünya üzerinde milyarlarca cihazın lokal IP adresi ile aynı olabilir. Bu önemli değildir çünkü, lokal IP adresleri modem gibi araçlar vasıtasıyla internet üzerindeki public bir IP ile internete çıkar. 

![LAN-to-WAN.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/LAN-to-WAN.webp){:class="responsive img-zoomable"}

Dolayısıyla sizin ağınıza bağlı olan tüm cihazlar aslında aynı “**public ip**” adresi ile internete çıkarlar. Bu durumu teyit etmek isterseniz, ağınıza bağlı farklı cihazlar üzerinden internet üzerinde  “***what is my IP address***” yazıp araştırabilirsiniz. 

![what-is-my-ip-address.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/what-is-my-ip-address.webp){:class="responsive img-zoomable"}

Gördüğünüz gibi aynı ağa bağlı olan iki farklı cihaz da internete aynı “public ip” adresi ile çıkıyor. İşte bu yaklaşım sayesinde sınırlı sayıda olan IP adresleri idareli şekilde kullanılabiliyor. İnternete bağlı olan tüm cihazların da public yani genel IP adresi olmak zorundadır. 

İşte bu local ve public IP yaklaşımını mümkün kılmak için de bazı IP adresleri lokal kullanım için ayrılmışlardır. Bu lokal IP olarak ayrılmış olan adresler internet üzerinde public IP olarak kullanılamazlar. 

Bazı yaygın özel IP adres aralıkları:

- **10.0.0.0 - 10.255.255.255 = 10.0.0.0/8** alt ağı, büyük ölçekli özel ağlar için kullanılır. Bu aralık içerisindeki IP adresleri, genellikle büyük kuruluşların iç ağlarında veya özel ağlarda kullanılır. 
- **172.16.0.0 - 172.31.255.255 = 172.16.0.0/12** alt ağı, orta ölçekli özel ağlar için ayrılmıştır. Bu aralık içerisindeki IP adresleri, genellikle işletmelerin veya kurumların iç ağlarında kullanılır. 
- **192.168.0.0 - 192.168.255.255 = 192.168.0.0/16** alt ağı, küçük ölçekli özel ağlar için kullanılır. Bu aralık içerisindeki IP adresleri, ev ağları, küçük işletme ağları ve test ortamları gibi yerlerde yaygın olarak kullanılır. 

Yani aslında lokal ağlarda kullanım ihtiyaçlarına göre ihtiyaç duyulabilecek çeşitli büyüklüklerde bazı IP aralıkları ayrılmıştır. Nitekim biz de bu sebeple kendi lokal ev ağımızda genellikle 192.168 ile başlayan IP adreslerini görüyoruz. 

Eğer Windows üzerinden takip ediyorsanız **cmd** yani komut satırı aracınızı açıp `ipconfig` komutunu girecek olursanız sizin IP adresinizin de 192.168 ile başladığını görebilirsiniz. Çünkü siz de standart bir kullanıcı olarak kendi ev ağınıza bağlısınız. 

![ipconfig.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ipconfig.webp){:class="responsive img-zoomable"}

Benim Windows hostun lokal IP adresi **192.168.1.9** olarak gözüküyor. 

Linux üzerinde de  `ip addr` komutunu girebilirsiniz.

![ip addr.webp]({{ site.url }}/egitim/temel-network/temel-kavramlar/ip addr.webp){:class="responsive img-zoomable"}

Linux makinenin lokal IP adresi ise **192.168.1.11** şeklinde tanımlanmış. Her iki hostun da subnet mask değeri de **255.255.255.0** ya da **24** olarak ifade edilmiş. Bu bilgilere bakarak **192.168.1.0** ağı içerisinde **9** ve **11** numaralı hostlar olduğunu biliyoruz. 

Bu adresler aslında benim evimdeki lokal ağdaki lokal IP adresleri. Yani bu cihazların hiç birisi internete bu adreslerle çıkmıyor. Bu aygıtlar bu IP adresleri ile evimdeki modemime bağlılar. Bu sayede ev ağımdaki cihazları birbirinden ayırabileceğim IP kimliklerine sahipler. Eğer bu cihazlar internete çıkmak isterlerse, modem sayesinde internet servis sağlayıcısının bana tanımladığı IP adresi üzerinden internete aynı public IP adresi ile çıkıyorlar. Evimdeki ağa bağlı olan tüm cihazlar da aynı şekilde lokal ağda sahip oldukları IP ile modeme bağlanıp, modemdeki tek public yani internete açık olan ağ üzerinden internete bağlanıyorlar. Local IP adresimi public IP adresine dönüştüren yapı da **NAT** yani “**N**etwork **A**ddress **T**ransmission” olarak geçiyor. İleride **NAT** konusuna tekrar ayrıca değiniyor olacağız.

Biz şimdi diğer özel iplerden bahsederek devam edecek olursak; lokal ağın tanımlayan bu private IP adresleri dışında, çeşitli amaçlarla kullanılan bazı özel IP adresleri de mevcut.

**Loopback Adresi (127.0.0.1):** Bu adres, bir cihazın kendisine ileti göndermek için kullandığı özel amaçlı adrestir. Örneğin websitenizi yayınlamak üzere bir HTTP sunucusu başlattığınızda, bu sunucunun çalışıp çalışmadığını **127.0.0.1** adresi üzerinden teyit edebilirsiniz. Çünkü bu sunucu sizin bilgisayarınızda çalışmaktadır ve kendi bilgisayarınızın bağlantı durumunu kontrol etmek için de **127.0.0.1** adresi kullanabilirsiniz. Aslında bu amaçla tüm **127** ağının tamamı ayrılmıştır ancak genel olarak **127.0.0.1** adresi kullanılıyor.

**Broadcast Adresi (255.255.255.255)** : Broadcast yayını için kullanılan bir IP adresidir. Şimdilik bu adres size doğrudan bir anlam ifade etmiyor olsa da eğitimin devamında kullanım amacını netleştirmiş olacağız. Şu an yalnızca bu adresin broadcast yayını için kullanıldığına dair kulak kabartmanız yeterli.

## IPv6

Biz anlatımlar sırasında hep IPv4 üzerinde durduk fakat, günümüzde IPv4 yetersiz kaldığı için geliştirilmiş olan ve kullanımı giderek yaygınlaşan IPv6 da mevcut. Biz bu eğitimde detaylarına değinmeyeceğiz fakat kısaca birkaç madde halinde bahsetmemiz gerekirse:

1. IPv6 adresleri 128 bit uzunluğunda olduğu için, çok çok daha büyük bir adres alanına sahiptir. Dolayısıyla IPv4'teki adres tükenme sorununu IPv6 da pek olası değildir.
2. IPv6 adresleri onaltılık sistemde ifade edilir. 8 grup halinde, her biri 4 haneli onaltılık rakamlardan oluşur. Örneğin: 2001:0db8:85a3:0000:0000:8a2e:0370:7334.
3. IPv6, IPv4 ile uyumlu çalışacak şekilde tasarlanmıştır. Bu sayede geçiş dönemi boyunca her iki protokol de birlikte kullanılabilir.

Bunun dışında güvenlik ve ölçeklenebilirlik gibi pek çok farklı konuda daha avantajlı olduğu durumlar mevcuttur. Fakat network temelleri için şimdilik bu kadarlık bilgi yeterli.

Böylelikle ağ hakkında öncelikli olarak bilmemiz gereken temel kavramlardan bahsetmiş olduk. Eğer bu bölümü yeterince anlaşılır bulmadıysanız, sizden ricam tekrar etmeniz veya bu kavramları harici kaynaklar üzerinden de araştırmanız. Zira bu bölümdeki temel kavramları anlamadan eğitime devam edecek olursanız, diğer bölümlerin anlaşılması sizin için güçleşecektir.