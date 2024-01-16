---
sitemap: true
layout: tutorial
title:  "Girizgah"
modified: 2024-01-16
author: Taylan Özgür Bildik
coursetitle: "Temel Bash Kabuk Programlama Eğitimi"
excerpt: "Eğitiminin yapısı ve ilerleyiş biçimi hakkında bilgi ediniyoruz."
tags: [kabuk-programlama,]
categories: [kabuk-programlama]
tutorial: 0
cover: girizgah.webp
toc: true 
---


Bu eğitimdeki amacımız bash kabuğunun sahip olduğu temel özellikleri kavrayıp işlerimizi pratik hale getirebilecek düzeyde kullanabilmektir. 

Esasen “bash kabuk programlama” konusunda internet üzerinde yerli ve yabancı pek çok kaynak mevcut. Hatta bu durum uzunca bir süre sahip olduğum kabuk programlama notlarını derleyip bu şekilde sunmam önündeki en büyük engeldi. Zira bu eğitim internet üzerinden bulamayacağınız bir alternatif değil. Fakat başlanmış işi bitirme güdüm, harcayacağım zamanın değip değmeyeceği tartışmasında galip geldiği için bu gün bu yazıyı okumaktasınız. 

Eğitim içerisinde pek çok farklı konu başlığı ve bölümlendirme bulunsa da aslında pek çok konu birbiri ile yakından ilişkilidir. Bu sebeple eğitimin bazı bölümlerinde geçmişte bahsedilen kavramlara atıfta bulunabilir ya da aynı konuyu, yeni konuyla birlikte tekrar ele alabiliriz. Bu gibi durumlara eğitimin düştüğü tekrarlardan ziyade, öğrenilen bilgilerin sentezlenmesi olarak bakmak çok daha doğru bir yaklaşım olacaktır.

Sizlerden tek ricam tüm eğitimi sabırla ve uygulama yaparak sıralı şekilde takip etmenizdir. Ayrıca benim örnek olarak sunduğum uygulamalar dışında da mutlaka harici olarak kendiniz de çeşitli alıştırmalar yapmalısınız. Zira her konu için çoklu örnekler vermemiz konuyu gereksiz uzatacağı için bu eğitimde yalnızca konuyu kavramanıza yetecek örnekler yer almaktadır. Daha fazlası sizlerin gayretine bağlıdır.

# Gereksinimler

Birincil gereksinim, pek tabii bash kabuğunu kullanabileceğiniz Linux ortamına sahip olmanız.

Eğitime başlamak için daha önceden GNU/Linux sistemlerini profesyonel olarak kullanmış olmanız şart olmamakla birlikte, temel seviye Linux deneyimine sahip kişilerin eğitimi daha rahat takip edebileceği de bir gerçektir. Zorunluluk olmasa da önceki eğitimim "GNU/Linux Sistem Yönetiminin Temelleri" gibi temel Linux bilgisi edinebileceğiniz herhangi bir kaynağı okumuş olmanız bu eğitimden alacağınız verimi de oldukça arttıracaktır. Zira, üzerinde çalıştığımız ortamı ne kadar iyi tanırsak, potansiyel olarak yazabileceğimiz programların verimliliği de doğru orantılı olarak artacaktır.

Buradaki tüm anlatımlar bash kabuğunun 5.0.18(1) versiyonu üzerinden ele alınmıştır. Sizlerin bu eğitimi takip ettiğiniz kabuk sürümü daha yeni ya da eski bir sürüm olabilir.( `bash —version` komutu ile sizdeki sürümü öğrenebilirsiniz.) Eğer öyleyse yalnızca kullandığınız sürümün geçmiş veya gelecek sürümler arasındaki farklarını sürüm notlarına bakarak öğrenmeniz yeterlidir. Zaten pek çok bilgi uzun süredir değişmediği ve değişmesi de öngörülmediği(geriye dönük uyumluluk dolayısıyla) için sürümler arası ufak tefek farklar dışında programlama bakımından sorun yaşamazsınız.

## Bu Eğitim Serisi Kimler İçin ?

Öncelikli olarak hiç bilmeyen kişiler olmak üzere, halihazırda bash kabuğunu aktif kullanmakta olan kişilerin de bu eğitimde bulabilecekleri yeni ya da tekrara değer bilgiler olabilir. Özellikle başlangıç seviyesindekiler için, kullanmakta oldukları mevcut işlevlerin temelinde ne olduğu ve hatta belki de daha verimli olan alternatif yolların keşfi mümkündür. Kısacası bu kaynağın, Bash kabuğunun yaygın kullanım alanlarından herhangi biri ile keşimi bulunan herkes için derli toplu Türkçe kaynak sunma gayretinde olduğunu söyleyebiliriz. İşlerinizi kabuk üzerinden hallediyorsanız, programlayabilme beceresi esneklik ve verimlilik için elzemdir.

## Neden Bash Kabuk Programlama Öğrenelim ?

Bash kabuğu son derece pragmatiktir. Genellikle pek çok insan sistem yönetimi sırasında bash kabuğunu kullanmasına karşın, bash kabuğunu programlamak için gereken altyapıyı oluşturma konusunda isteksizdir. Bu isteksizliğin ardında bash kabuğunu programlayabilme yetkinliğine sahip olmanın, programlamayı öğrenme sürecine değmeyeceği algısı yatıyor olabilir. Özellikle Python gibi herhangi bir alternatif dili bilen kişiler, ihtiyaçlarını bildiği yani kendini konforlu hissettiği dil üzerinden görme eğilimdedir. Ancak sizleri temin ederim, bash kabuğu pek çok işinizi herhangi bir dilden çok daha kısa sürede programlayabilme imkanı tanır. Çünkü fevkalade basit bir söz dizimi mevcut.

Bash kabuğunu öğrenmenin ardındaki bir diğer önemli motivasyon, bash kabuğunun *nix sistem türevlerinde son derece yaygın kullanıma sahip olmasıdır. Bu sayede yazdığımız bir program hiç bir ekstra ortam kurulumuna ihtiyaç duymadan pek çok sistem üzerinde çalışabilir. Dilerseniz Windows sistemlerinde wsl gibi çözümler aracılığıyla dahi bash kabuk programlamanın nimetlerinden faydalanabilirsiniz. 

Tüm bunların yanında, bash kabuğunu programlamayı öğrenirken aslında bash kabuğunun temel çalışma yapısı ve sistemle iletişimi hakkında pek çok temel bilgiyi de ediniyor ya da atıfta bulunuyor olacağız. Bu sayede programlama dışında bash kabuğunu interaktif şekilde kullanırken gerçekleştirebileceğimiz işlemlerin verimi ve anlamı da biziler için artmış olacak. Yani kabuğun tüm nimetlerinden faydalanarak, kabuk ile bilgisayarımıza yaptırabileceğimiz işlemlerin farkına varabiliriz. Kabuk programlama, sistem yöneticisi gibi profesyonel kullanımlar haricinde günlük hayattaki sistem yönetiminizde dahi işlerinizi kolaylaştıracak imkanlar sunar. Yani özellikle sisteminizi kabuk üzerinden aktif olarak yönetmiyor daha çok grafiksel arayüzü kullanıyor olsanız bile, kabuğun size sunduğu imkanları öğrendikten sonra işlerinizin verimini arttırmanın yollarını keşfedebilirsiniz.

Ayrıca kabuk dilleri kolayca pek çok farklı aracı ve programlama dillerinin aynı anda kullanılabilmesine de olanak tanıdığından son derece kolay programlanabilir ve güçlü etkilere sahip yapılar ortaya koyulabilir.

Özetle ön yargılarımızı bir kenara bıraktığımızda, bash kabuk programlama kesinlikle öğrenmeye değerdir.

Bu eğitim serisi boyunca, mümkün oldukça bash kabuğunu programlama için ihtiyaç duyacağımız temel bilgilerine değiniyor olacağız. Buradan edindiğiniz bilgileri uygulama yaparak hayata geçirdiğiniz sürece kalıcı kılabilirsiniz, aksi halde öğrenilen bilgiler unutulacaktır. Ayrıca bu serinin asıl amacı bash kabuğunu tanıtmak olduğu için GNU/Linux sistemi ile ilgili sahip olduğunuz bilgiler dahilinde programlama yetenekleriniz ve kapasiteniz de artacaktır. Dolayısı ile üzerinde çalıştığınız sistemi ne kadar iyi tanırsanız o kadar verimli projeler ortaya koyabilirsiniz. 

Bu eğitim **başlangıç seviye** bilgi sunma hedefindedir. Orta-ileri seviye detaylar yer almasa da sizlere sunduğu temelin üzerine ileri seviye detayları araştırma konusunda bir dayanak olmak gayretindedir.

## Eğitim Formatı | İşleniş Biçimi

Eğitim serisi içerisindeki konular birbiri ile bağlantılı olacak şekilde sıralı olarak düzenlenmiştir. Kimi konular içerisinde ileride ele alacağımız bazı konulara atıfta bulunuyor ve kısaca açıklıyor olacağız. Ayrıca bir konu içerisinde birbirinden farklı pek çok kavramın ve komutun açıklanması gerektiğinde öncelikle gerekli olan temel bilgilerin verilmesi amaçlanmıştır. Bölüm sonlarında ilgili kavram ve komutların eksik kalan kısımları ayrıca açıklanmıştır. Bu sayede mevcut konuyu kavrarken dikkatinizin dağılmasını önlediğimiz gibi konu içerisindeki kavram ve komutların ayrıntılı açıklamalarına da ayrıca ulaşmamız mümkün olacaktır. 

Açıklamalar sırasında İngilizce terimlerin mümkün oldukça Türkçe karşılıklarını kullanıp parantez içerisinde İngilizce karşılıklarını belirtiyor olacağız. Ancak yine de İngilizce terimin daha anlaşılır açıklama imkanı sunduğu istisnai durumlarda İngilizce terimler ile de karşılaşacaksınız. 

Ayrıca anlatımlar sırasında "GNU/Linux" ifadesi yerine kısaca belirtmek adına yalnızca "Linux" ifadesini kullanıyor olacağım. Ancak merak etmeyin çekirdekten(Linux) bahsederken ve işletim sistemi bütününden bahsederken(GNU/Linux) hangisini kast ettiğimi anlıyor olacaksınız.

`Paragraf içi komutlar bu şekilde gözükür.`

```bash
Çoklu komutlar 
ve çıktıları 
bu şekilde gösterilir.
```

***Dosya ve klasörler bu şekilde gösterilir.***

<p class="sari">
⚠️ Uyarılar bu şekilde belirtilir.

</p>

<p class="mavi">
ℹ️ Açıklama ve ek bilgiler bu şekilde belirtilir.

</p>

## Kaynakça

Kaynak olarak [GNU Bash](https://www.gnu.org/savannah-checkouts/gnu/bash/manual/bash.html) resmi dokümantasyonu ve [POSIX Shell](https://pubs.opengroup.org/onlinepubs/9699919799/utilities/contents.html) kılavuzu referans alınmıştır. Bu bağlantılar zaman için değişmiş olabilir. Buradaki bağlantılar çalışmıyorsa, herhangi bir arama motorunu kullanarak saniyeler içinde hem "GNU Bash" hem de "Posix Shell" kılavuzuna rahatlıklar ulaşabilirsiniz.