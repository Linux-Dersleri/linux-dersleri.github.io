---
layout: tutorial
title:  "Switch Nasıl Çalışır ?"
modified: 2023-05-20
author: Taylan Özgür Bildik
coursetitle: "Temel Ağ Eğitimi"
excerpt: "Switch aygıtlarının nasıl çalıştığını temel düzeye ele alıyoruz."
tags: [switch, vlan,]
categories: [temel-network]
tutorial: 5
cover: switchcover.webp
toc: true 
---


# Switchler Nasıl Çalışır ?

Switch aygıtlarının aynı ağdaki cihazların haberleşmesi için kullanıldığından bahsettik. Switch aygıtının genel çalışma prensibini anlamak için hemen basit bir örnekle başlayabiliriz.

Örneğin aşağıdaki ağda, A hostu’nun C hostu ile iletişime geçmek istediğiniz varsayalım.

![network.webp]({{ site.url }}/egitim/temel-network/switch/network.webp){:class="responsive img-zoomable"}
İletişim için hem IP hem de MAC adresinin gerektiğini biliyoruz. Eğer MAC adresi bilinmiyorsa ARP ile öğrenilebilir. A hostu, öğrenmek üzere kendi IP ve MAC bilgisini de ekleyip switch vasıtası ile tüm bağlı hostlara ARP sorgusu gönderir.

![ARP.webp]({{ site.url }}/egitim/temel-network/switch/ARP.webp){:class="responsive img-zoomable"}
![ARP-Broadcast.webp]({{ site.url }}/egitim/temel-network/switch/ARP-Broadcast.webp){:class="responsive img-zoomable"}
Bu soruya yalnızca IP adresinin sahibi olan C hostu yanıt verir. Aynı zamanda göndericinin IP ve MAC adresini de kendi ARP tablosuna ekler. 

![ARP-response.webp]({{ site.url }}/egitim/temel-network/switch/ARP-response.webp){:class="responsive img-zoomable"}
Yanıtı da bu ARP sorgusunu gönderen kaynağa unicast yani doğrudan iletir. Kaynak da aldığı ARP yanıtındaki bilgileri alıp kendi ARP tablosuna ekler. Bu sayede artık kaynak ve hedef arasındaki iletişim mümkündür.

![ARP-response2.webp]({{ site.url }}/egitim/temel-network/switch/ARP-response2.webp){:class="responsive img-zoomable"}
Bu yapıdan zaten daha önce de bahsettik. Şimdi burada asıl odaklanmak istediğim switch aygıtının bu paketleri nasıl doğru hedefe yönlendirdiği. 

Switch aygıtları IP adresleri ile ilgilemez. Hangi MAC adresinin hangi porta bağlı olduğunun tablosunu tutar. 

<p class="mavi"><strong>ℹ️ Not:</strong> Buradaki port’dan kasıt, fiziksel bağlantı noktasıdır. Yani IP adreslerinde bahsettiğimiz uygulamalara özel yönlendirme sağlayan sanal “port” değil, fiziksel bağlantı noktasını kast ediyorum.</p>

![switch-mac-table.webp]({{ site.url }}/egitim/temel-network/switch/switch-mac-table.webp){:class="responsive img-zoomable"}
Tabii switch bağlanır bağlanmaz bu bilgiler alınmıyor. Hostlar arasında iletişim gerçekleştikçe switch bu kaydı doldurmaya başlıyor.

A hostunun C hostu ile iletişime geçmek istediğini varsayalım. Bunun için kendi MAC adresini ve hedef hostun MAC adresini içeren frame’i switch aygıtına iletir. 

![switch-mac-table-empty.webp]({{ site.url }}/egitim/temel-network/switch/switch-mac-table-empty.webp){:class="responsive img-zoomable"}
Switch kedisine ulaşan frame’deki kaynak MAC adresini ve bu frame’in hangi porttan geldiğini kendi MAC tablosuna kaydeder.

![switch-mac-table2.webp]({{ site.url }}/egitim/temel-network/switch/switch-mac-table2.webp){:class="responsive img-zoomable"}
Bu noktada switch aygıtının bu frame’i doğru hedefine ulaştırması gerek. Fakat switch hedefteki MAC adresinin hangi porta bağlı olduğunu henüz bilmiyor. Bu sebeple elindeki bu frame’i çoğaltıp tüm portlardaki cihazlara gönderiyor.

![switch-mac-broadcast.webp]({{ site.url }}/egitim/temel-network/switch/switch-mac-broadcast.webp){:class="responsive img-zoomable"}
Bu frame’i alan hostlardan yalnızca bu MAC adresine sahip olan host yanıt oluşturuyor. Bu yanıtı da aldığı frame’deki göndericinin MAC adresine ulaşacak şekilde oluşturuyor ve switch aygıtına iletiyor. 

![host-reponse.webp]({{ site.url }}/egitim/temel-network/switch/host-reponse.webp){:class="responsive img-zoomable"}
Switch kendisine iletilen verinin hangi MAC adresinden geldiğine bakıp MAC ve port numarasını kendi MAC tablosuna ekliyor. 

![switch-add-mac.webp]({{ site.url }}/egitim/temel-network/switch/switch-add-mac.webp){:class="responsive img-zoomable"}
Daha sonra, bu verinin hangi hedefe gideceğini kontrol edip, bu hedef kendi MAC tablosunda olduğu için uygun porta yönlendiriyor.

![switch-deliver.webp]({{ site.url }}/egitim/temel-network/switch/switch-deliver.webp){:class="responsive img-zoomable"}
Bu yaklaşım sayesinde zaman içinde hangi portta hangi MAC adresinin bağlı olduğu bilindiği için paketlerin doğrudan yönlendirilmesi mümkün oluyor. Eğer switch cihazının MAC-port tablosunda bulunmayan bir MAC adresi olursa, switch broadcast yayını ile kendisine bağlı olan tüm cihazlara bu MAC adresini sorar. Gelen yanıtı da kendi MAC-port tablosuna ekler. Bu sayede daha sonraki yönlendirmeleri sorunsuzca gerçekleştirebilir.

Örneğin internete erişmek üzere switch üzerinden routera erişmek istediğimizde de aynı yaklaşım uygulanıyor. Router aygıtının bir MAC adresi olduğu için switch bu MAC adresinin bulunduğu portu bildiği için, dış ağa yani internete çıkmak isteyen hostun frame’lerini buraya yönlendiriyor.

![switch-to-network.webp]({{ site.url }}/egitim/temel-network/switch/switch-to-network.webp){:class="responsive img-zoomable"}
Dikkat etmeniz gereken detay, switchlerin IP katmanıyla ilgilenmediği. Switch yalnızca portlarına bağlı olan MAC adres bilgilerini kontrol ediyor.

Yine de konfigürasyon değişikliği gibi switch cihazına özel bir veri iletilecekse yani hedef doğrudan switch cihazının kendisiyse bu kez switch ile tıpkı ağdaki diğer host cihazları gibi kendi MAC ve IP adresi üzerinden iletişim kurabiliyor. Bu noktada zaten switch cihazı da doğrudan kendisine gönderilen paketleri tıpkı bir host cihazıymış gibi ele alıyor. Bu sayede SSH gibi bağlantı yöntemleri ile switch cihazının kendisini konfigüre edebiliyoruz. 

![switch-ip-mac.webp]({{ site.url }}/egitim/temel-network/switch/switch-ip-mac.webp){:class="responsive img-zoomable"}
# VLAN

**V**irtual **L**ocal **A**rea **N**etwork yani “sanal yerel ağ” aslında fiziksel donanımın, yazılımsal olarak sanal şekilde portları gruplayarak birden fazla yerel ağ oluşturmasıdır.

![VLAN.webp]({{ site.url }}/egitim/temel-network/switch/VLAN.webp){:class="responsive img-zoomable"}
Bu sayede sanal olarak birden fazla switch varmışçasına ağları bölmek ve bu ağlara özel konfigürasyonlar tanımlamak mümkün oluyor.

![VLAN2.webp]({{ site.url }}/egitim/temel-network/switch/VLAN2.webp){:class="responsive img-zoomable"}
Her iki sanal switch birbirinden bağımsız hareket ettiği için her birinin kendisine özgü konfigürasyonu bulunuyor. Dolayısıyla örneğin her iki sanal switch de aslında kendi MAC tablolarını tutuyorlar.

![switchs-mac-table.webp]({{ site.url }}/egitim/temel-network/switch/switchs-mac-table.webp){:class="responsive img-zoomable"}
Fiziksel veya sanal olarak ayrı iki switchin bağlı olduğu durumda veri iletiminin nasıl gerçekleştirdiğini, A hostunun C hostuna paket göndermesi örneği üzerinden ele alabiliriz. 

Anlatım tekrarına düşmemek ve anlatımları uzatmamak adına A hostunun C hostunun MAC adresini bildiğini yani ARP ile öğrenmesine gerek olmadığını varsayalım. Zaten bu işlemin nasıl gerçekleştiğini biliyorsunuz. 

A hostu C hostuna iletmesi için bağlı olduğu switche bu veriyi iletiyor. 

![send-packet-to-switch.webp]({{ site.url }}/egitim/temel-network/switch/send-packet-to-switch.webp){:class="responsive img-zoomable"}
Kendisine ulaşan frame’i inceleyen switch cihazı, 1 numaralı porttan a1a1 MAC adresine sahip olan cihazdan geldiğini öğreniyor ve bunu kendi MAC tablosuna yazıyor. 

![send1.webp]({{ site.url }}/egitim/temel-network/switch/send1.webp){:class="responsive img-zoomable"}
Fakat frame’i teslim alan switch kendi MAC tablosu boş olduğu için bu hedef yani gönderilecek MAC adresinin hangi portta olduğunu bilmiyor.

![send2.webp]({{ site.url }}/egitim/temel-network/switch/send2.webp){:class="responsive img-zoomable"}
 Öğrenmek için kendisine bağlı bulunan tüm portlara bu MAC adresini soruyor.

![send3.webp]({{ site.url }}/egitim/temel-network/switch/send3.webp){:class="responsive img-zoomable"}
Diğer switch aygıtının portu olan 4. numaralı port bu frame iletisini aldığında bunu gönderen kişinin MAC adresini ve hangi porttan geldiğini kendi MAC tablosuna kaydediyor.

![send4.webp]({{ site.url }}/egitim/temel-network/switch/send4.webp){:class="responsive img-zoomable"}
Frame üzerinde yer alan hedef MAC adresini öğrenmek için kendisine bağlı olan tüm portlardaki cihazlara bu frame iletisini gönderiyor.

![send5.webp]({{ site.url }}/egitim/temel-network/switch/send5.webp){:class="responsive img-zoomable"}
Bu frame iletisine yalnızca hedef host yani “c3c3” MAC adresine sahip cihaz yanıt veriyor.

![send6.webp]({{ site.url }}/egitim/temel-network/switch/send6.webp){:class="responsive img-zoomable"}
Bu yanıt switche iletildiği için switch kaynak MAC adresini ve hangi porttan bu frame iletisinin geldiğini kendi MAC tablosuna ekliyor.

![send7.webp]({{ site.url }}/egitim/temel-network/switch/send7.webp){:class="responsive img-zoomable"}
Daha sonra elindeki frame iletisine bakıp hedef MAC adresinin “a1a1” olduğunu görüyor. Kendi MAC tablosunu kontrol ettiğinde bu MAC adresinin 4 numaralı porta bağlı olduğunu anlıyor. Bu sayede bu frame iletisini 4 portuna iletiyor.

![send8.webp]({{ site.url }}/egitim/temel-network/switch/send8.webp){:class="responsive img-zoomable"}
4 numaralı port ile 3 numaralı port bağlı olduğu için bu frame, ilk switch aygıtının 3 numaralı portuna ulaştırılıyor. Bu sebeple ilk switch bu frame iletisinin kaynağını ve port numarasını kendi MAC tablosuna ekliyor.

![send9.webp]({{ site.url }}/egitim/temel-network/switch/send9.webp){:class="responsive img-zoomable"}
Daha sonra bu frame iletisinin ulaştırılması gereken hedefi kontrol ediyor. Bu MAC adresi kendi tuttuğu MAC tablosunda 1 numaralı porta bağlı olduğu için bu frame 1 numaralı porta yönlendiriliyor.

![send10.webp]({{ site.url }}/egitim/temel-network/switch/send10.webp){:class="responsive img-zoomable"}
Yani bizzat adım adım ele aldığımız gibi iki farklı switch aygıtı kendi MAC tablolarını kendi portlarına bağlı olan MAC adresleri dahilinde kaydediyor. Aynı hostlar tekrar iletişim kurmak istediğinde daha önce MAC tablosuna kaydedilmiş olan port-MAC adresi eşleşmesi sayesinde çok daha kısa sürede haberleşme gerçekleştiriliyor. Portlara bağlı olan aygıtlar çıkarılmadığı sürece de, aynı MAC adresi tablosu iletişim için tekrar tekrar kullanılıyor. 

Ayrıca switch cihazlarına birden fazla host bağlanabildiği için aslında aynı port birden fazla MAC adresine işaret ediyor olabilir. Örneğin B hostu da D hostu ile iletişime geçmek istersek switchlerin MAC tabloları aşağıdaki gibi olacaktır.

![send11.webp]({{ site.url }}/egitim/temel-network/switch/send11.webp){:class="responsive img-zoomable"}
İşlem akışını oklar yardımıyla adım adım takip edip, hangi MAC adresinin hangi porta bağlı olarak görüldüğünü kendiniz de teyit edebilirsiniz. Amaç diğer switchden gelen iletiyi kendi ağına yönlendirmek olduğu olduğu için switch üzerinde aynı portta birden fazla MAC tanımlı olabilir. Önemli olan kendi ağı içerisinde bu iletinin doğru cihaza ulaştırılmasını sağlamak. Bu yapı da buna müsait.

İşte switch aygıtlarının en temel çalışma yapısı bu şekilde.