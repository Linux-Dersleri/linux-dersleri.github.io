---
sitemap: true
layout: b-post
title:  "Swappiness Değerini Ayarlamanın Performans Üzerindeki Olası Etkileri"
modified:
author: Taylan Özgür Bildik
tags: [swap, performans, sysctl]
categories: blog 
cover: swappiness-cover.png
permalink: /:title
toc: true
---

# Swappiness Nasıl Düzenlenir ?

Swappiness, sistemin swap alanını ne sıklıkla kullanacağını tanımlayan bir Linux çekirdek özelliğidir. Swappiness değeri 0 ile 100 arasında tanımlanabiliyor. Düşük bir değer, çekirdeğin swap kullanmaktan kaçınmaya çalışmasını sağlarken, yüksek bir değer çekirdeğin swap alanını daha agresif bir şekilde kullanmasını sağlıyor.

Varsayılan swappiness değeri 60'tır. Fakat sistem performansının ön planda olduğu durumlarda bu değeri düşürerek, disk yerine öncelikli olarak ram kullanımı öncelenebiliyor. Fakat swap kullanımının performans üzerindeki etkisi aslında her zaman bu kadar basit olmayabiliyor. Öncelikle bu değeri nasıl öğrenip değiştirebileceğimizden bahsedelim, daha sonra bu değerin hangi aralıkta olması gerektiğini sebepleriyle birlikte biraz daha detaylı inceleme gayretinde olacağız.

İlk olarak mevcut swappiness değerini kontrol edelim.

```jsx
┌──(taylan㉿linuxdersleri)-[~]
└─$ cat /proc/sys/vm/swappiness 
60
```

Gördüğünüz gibi varsayılan değer “60” olarak gözüküyor. 60 swappiness değeri çoğu Linux sistemi için uygun olsa da, performansın ön planda olması gereken sunucularda daha düşük bir değer ayarlamanız gerekebiliyor.

Değişim için sistem çalışırken kernel yani çekirdek özelliklerini düzenlemeye imkan tanıyan `sysctl` aracını kullanabiliyoruz. 

```jsx
┌──(taylan㉿linuxdersleri)-[~]
└─$ sudo sysctl vm.swappiness=10
[sudo] password for taylan: 
vm.swappiness = 10
```

Bu değişiklik halihazırda çalışmakta olan çekirdek üzerinde geçerli oldu lakin sistem başlangıcında kalıcı olması için ***/etc/sysctl.conf*** dosyasına da eklememiz gerek. `nano` veya `vim` gibi bir editor ile dosyayı `sudo` yetkileri ile açıp aşağıdaki satırı ekleyip kaydetmeniz yeterli.

```jsx
vm.swappiness=10
```

Böylelikle her sistem başlangıcında bu değer çekirdek tarafından tanınıyor olacak. Elbette ben örnek olarak 10 değerini tanımladım ancak sizin sisteminiz için optimum olan değeri deneme yanılma ve gözlem ile kendiniz bulmanız gerek. Fakat bundan önce bu değer ile gerçekten oynamaya ihtiyacınız olup olmadığı üzerinde durmak istiyorum. Bu sayede daha bilinçli kararlar alabiliriz.

# Swappiness’i Değiştirelim Ama Ne Zaman ?

Çoğunlukla, swap kullanmanın kötü olduğu ve swappiness değerini düşürmezseniz sistemin gereksiz yere swap yapacağı varsayılır. Ancak, bu tam olarak doğru değil. 

İnsanlar hatalı şekilde, swap kullanımı ile sistemin yavaşladığı zamanları birbiriyle ilişkilendiriyor. Dolayısıyla swap kullanmanın sistemin yavaşlattığını sanabiliyorlar. Oysa genellikle swap kullanılmasının nedeni, sistemin zaten yavaşlamış ve RAM üzerinde yeterince alan kalmamış olmasından gelir, tersi değil. Sistem, swap yapmanın performans maliyetini hesaplar ve bunu yapmamanın genel sistem performansı veya kararlılığı açısından daha büyük bir olumsuzluğa sebep olacağına karar verdiğinde swap alanını kullanır.

Genel olarak, varsayılan ayarlar yani “60” değeri çoğu sistem için iyi bir performans ve kararlılık sağlar. İstisnai durumlar hariç varsayılan ayarda bırakmanız bu sebeple tavsiye edilir. İlk ve en kolay akla gelen yöntem swapiness değişimi olsa da esasen Linux’un bellek yönetimini bazı uç durumlar için iyileştirmek için daha fazla yol olabilir. Swappiness ayarı ile bir sorunu çözebilirsiniz, ancak başka sorunlar(ansızın sonlandırılan süreçler ve dolayısıyla kararsız bir sistem) yaratmanız da fevkalade olası. Mümkünse, performans gerektiren sistem için daha fazla fiziksel RAM eklemesi(ve swappiness’i olduğu gibi bırakmak) diğer tüm çözümleri gölgede bırakır.

Neden böyle olduğunu daha net anlamak adına birkaç konudan daha kısaca bahsedelim.

## Linux’un RAM Kullanımı

Uygulamalar tarafından kullanılmayan her RAM "önbellek" olarak kullanılabilir. Önbellek, hızlı ve sorunsuz çalışan bir sistem için önemlidir, disk okuma ve yazma işlemlerini hızlandırır. Ancak RAM’in sürekli işgal edilmesi ve sınırda kullanımı, standart kullanıcıları performans konusunda kaygılandırabiliyor. Fakat bu kaygının aksine, bu yaklaşım performans için mevcut.

Zaten sistem tasarımı gereği, uygulamalar bellek kullanımını artırarak neredeyse tüm RAM'inizi kullanma noktasına geldiğinde, önbelleğiniz küçülür ve ortalama olarak disk işlemleri de yavaşlar. Dolayısıyla günümüzde sadece onlarca megabayt veya daha az önbellek çoğu durumda yeterli değildir. Bu sebeple sistem boştayken veya yük altında değilken dahi fazla ram kullanıldığına şahit olabilirsiniz. Önbellek israf değil performanstır :)

Uygulamalar bellek kullanımını daha da artırırsa - ve swap alanınız yoksa - öncelikle önbellek kullanımından vazgeçilir, sonunda yine de bellek alanı yeterli gelmezse sisteminiz son çare olarak çalışan işlemleri(process) öldürmek zorunda kalır. Tahmin edebileceğini gibi işlemleri öldürmek, yavaşlamadan daha kötüdür çünkü bu size kararsız, öngörülemez bir sistem verir.

## Linux’un Swap Kullanımı

Bu iki sorunu önlemek için sisteminiz nadiren kullanılan bazı uygulama belleklerini diskteki swap alanına yeniden tahsis edebilir, böylece RAM'i serbest bırakır. Bu yaklaşım, bellek tükenmesi nedeniyle işlemlerin ölmesini önleyebilir ve disk işlemlerinin daha sorunsuz çalışabilmesi için biraz önbellek geri kazandırabilir.

Yine de hangi noktada swap alanının kullanılabileceği biraz muğlaktır(en azından benim için, zira çekirdek tarafında birçok faktörü hesaba katan benim anlayamadığım "sihirli" bir algoritma mevcut). Yani swap alanın tam olarak ne zaman kullanılacağı dair kesin bir çizgi-sınır bulunmuyor. Eğer RAM üzerindeki baskı fazlaysa ve artma eğilimindeyse swap kullanımı sistem tarafından organize ediliyor.

İşte Linux sistemimiz yani aslında çekirdeğimiz de, bu baskının nasıl hesaplandığını ayarlamanıza yardımcı olan bir "swappiness" değerine sahiptir. Bu ayar genellikle yanlış bir şekilde "RAM yüzdesi" olarak temsil ediliyor, ancak bu sadece “sihirli” önceliklendirme algoritmasındaki formülün bir parçası olarak kullanılan bir değerdir. 40 ile 60 arasındaki değerler tavsiye edilen makul değerlerdir, 60 günümüzde varsayılan değerdir. Çekirdek sihrini gerçekleştirirken önceliklendirme bu değere göre yeniden ağırlıklandırır. 

Bu bilgiler ışığında sisteminizin swap yapmasına izin vermek, çok fazla RAM'iniz olsa bile genel olarak iyi bir tercihtir. Sisteminizin swap yapmasına izin vermek, RAM miktarının yetersiz kaldığı durumlarda bile her şeyin çalışmaya devam etmesi için sisteme ikinci şans verir. Zaten gerekmedikçe swap alanı kullanılmayacaktır. Swap kullanmayı tamamen devre dışı bırakırsanız, bellek tahsis edememe nedeniyle işlemlerin öldürülme riskini alırsınız.

## Sistem Yavaşlayıp Yoğun Bir Şekilde Swap Yaptığında Ne Olur?

Swap, yavaş ve maliyetli bir işlemdir(RAM ile standart diskler arasındaki korkunç okuma-yazma hızı farkı dolayısıyla), bu sebeple çoğu durumda çekirdek swap alanını kullanmaktan kaçınır. Ancak önbellek performansındaki ticaretin genel olarak bunu telafi edeceğine karar verirse veya işlemleri öldürmekten kaçınmak gerekiyorsa swap alanı kullanılır.

Çoğu zaman insanlar çok fazla swap alanı kullanan(dolayısıyla diskini yoğun bir şekilde kullanan) sistemlerine bakar ve bunun için swap yöntemini suçlar. Bu yanlış bir yaklaşımdır. Çünkü bu durum sisteminizdeki RAM miktarının yeterli olmadığına bir işarettir. Swap aslında burada sürekli olarak kurtarıcı rolünü üstlenir ve size “*artık daha fazla RAM’e ihtiyacın var*” mesajını açık şekilde iletir. Dolayısıyla çözüm için swap alanını suçlamak yerine sistemin size RAM için yalvardığının farkında olmanız doğru olacaktır. Zira swap olmasaydı, çalışan işlemleriniz rastgele şekilde ölüyor olacaktı.

## Masaüstü Sistemler İçin Farklı Bir Yaklaşım Gerekmiyor Mu?

Masaüstü sistemi kullanıcıları, kullanıcı tarafından başlatılan eylemlere (bir uygulama açmak gibi) tepki olarak sistemin "hızlı" olmasını bekler, bu tür eylemler bazen swap tetikleyebilir.

Bazı insanlar bunu ayarlamak için swappiness değerini azaltır, bu da uygulamaların bellek kullanmasını ve düşük önbellek alanı ile çalışmasını sağlar.

Ancak bu sadece hedeflerin yerini değiştirir. İlk uygulama swap işlemi olmadan yüklenebilir, ancak sonraki uygulamanın yüklenmesi için daha az alan bırakır. Aynı swap işlemi sadece daha sonra, bir sonraki uygulamayı açtığınızda gerçekleşir. Bu arada, sistem performansı azalan önbellek boyutu nedeniyle daha düşüktür. Bu nedenle, swappiness ayarını azaltmanın herhangi bir faydası ölçülemez olabilir. Eğer ne yaptığınızı biliyorsanız kimi sistemler için Swappiness’i biraz azaltmak gerekli olabilir. 

Yine de tekrar hatırlatmak gerekirse, swap kullanmayı tamamen devre dışı bırakmak, bellek tükenme koşullarına karşı ekstra koruma kaybına neden olur. Bu da mevcut işlemlerin çökmesine veya öldürülmesine neden olabilir.

En etkili çözüm, eğer karşılayabiliyorsanız, daha fazla RAM eklemektir.

## Zaten Çok Fazla RAM Olan Bir Sistem Üzerinde Swap Devre Dışı Bırakılabilir Mi?

Eğer uygulamalar için gerekenden çok daha fazla RAM'iniz varsa, nadiren swap’a ihtiyaç duyarsınız. Bu nedenle, swap’ı devre dışı bırakmak normal şartlarda bir fark yaratmayacaktır. Ancak, çok fazla RAM’iniz varsa, swap’ı etkin bırakmak da bir handikap oluşturmaz çünkü sistem ihtiyaç duymadıkça swap alanını kullanmaz.

Swap'ın fark yaratacağı tek durum, sistemin bellek tükenmesi ve dolayısıyla önbellek sisteminin aksaması durumudur. Bu nedenle, swap'ı normal ayarlarda bırakmak, bol miktarda bellek olduğunda bile olumsuz bir etki yaratmadan ek bir güvenlik sağlar.

## Swap Sistemi Hızlandırabilir mi? Swap Yapmak Yavaşlatmaz mı?

Verilerin RAM'den swap’a aktarılması yavaş bir işlemdir, ancak bu yalnızca çekirdek, makul bir önbellek boyutunu korumanın genel faydasının bunu aşacağını düşündüğünde yapılır. Sisteminiz disk sürücüsünde aşırı yavaşlama yaşıyorsa, swap bunu neden olmuyor, sadece hafifletmeye çalışıyor.

## Veriler Swap’tan Ne Zaman Çıkar?

Belleğin herhangi bir parçası, kullanıldığı(okunduğunda veya yazıldığında) anda swap'tan çıkar. Ancak, genellikle swap yapılan bellek, uzun zamandır erişilmeyen ve yakın zamanda ihtiyaç duyulması beklenmeyen bellektir.

Disk okuma yazma kısıtlamaları dolayısıyla Swap'tan veri alıp okumak, oraya yazmak kadar zaman alır. Bu sebeple çekirdek buna ihtiyaç duymadıkça veriyi swap'tan çıkarmaz. 

## Swappiness’i Azaltmanın Uygun Olduğu Durumlar Var mı?

Evet. Sisteminizi belirli bir sunucu uygulamasına adadıysanız ve bu uygulama sistem önbelleğinden faydalanmıyorsa. Oracle server, MySQL/MariaDB gibi bazı veritabanı sunucuları, bazen swappiness'i 1-10 arasında düşürmeyi önerir çünkü bu veritabanı motorları kendi önbelleklerini kullanır.

Sisteminizin amacı kendi önbelleklerini kullanan ve sistem önbelleğinden faydalanmayan bir uygulama etrafında merkezlenmişse, swappiness’i düşürmek iyi bir fikir olabilir.