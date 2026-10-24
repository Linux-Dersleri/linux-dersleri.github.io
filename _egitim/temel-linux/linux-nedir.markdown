---
sitemap: true
layout: tutorial
title:  "Temel Kavramlar"
modified: 2021-04-15
author: Taylan Özgür Bildik
coursetitle: "Temel Linux Eğitimi"
excerpt: "Temel kavramlardan bahsederek, GNU/Linux sistemini tanıyoruz."
tags: [linux , kernel , linus torvalds , gnu , gpl , açık kaynak , özgür yazılım , unix , dağıtım , debian , redhat , centos]
categories: [temel-linux]
cover: temelkavramlarcover.webp
tutorial: 1
toc: true 
---


Teknik anlatımlara geçmeden önce bazı temel kavramları kısaca açıklamak istiyorum. Bu sayede eğitim boyunca ve eğitim sonrasında sıklıkla karşılaşacağımız pek çok kavram hakkında bilgi sahibi olabileceğiz. Bu bölümde Linux'un ortaya çıkışını ve eğitim sırasında hangi dağıtımı neden tercih edeceğimizi, sebepleriyle birlikte kısaca ele alıyor olacağız. Yani bu bölümde ele aldığımız anlatımlar en az teknik anlatımlar kadar gerekli. Zaten anlatımlar sırasında tarihi detaylardan ziyade konuyu kavramamız için gerekli olan temel bilgilere odaklanacağımız için tarihi detaylara çok fazla değinip kimseyi sıkmak amacında değilim. Asıl amacımız Linux olarak bildiğimiz sistemin gelişim sürecini ve ortamını kavrayabilmek. Eğer anlatımın devamında bahsedeceğim çalışmaların tarihi detaylarını öğrenmek isterseniz wikipedia gibi harici kaynaklar size pek çok tarihi detay sağlayacaktır. 

Biliyorum, bir an önce sistemi kurup teknik anlatımlara ve uygulamalara geçmek istiyorsunuz. Ancak lütfen biraz sabırlı olun ve bu bölümün tüm eğitimin önemli bir parçası olduğunu unutmayın. Eğer geç bir saatte veya uykulu bir halde bu bölümü takip etmeyi planlıyorsanız, öncelikle yüzünüzü yıkayın sonra anlatımlara devam edelim. Zira bu bölümü atlarsanız eğitimin geri kalanında sorun yaşamanız kaçınılmaz olacaktır, benden söylemesi :) 

Tamamdır dinç ve hazırsak hadi gelin işletim sisteminin genel bir tanımını yaparak anlatımlarımıza başlayalım. 

# İşletim Sistemi

En genel tanımla işletim sistemi, donanımlara yaptırmak istediğimiz işleri ifade edebilmemizi sağlayan aracı yazılım katmanıdır. İşletim sistemi denildiğinde yalnızca standart bilgisayarları düşünmeyin, arabalardan fabrikadaki robotlara veya akıllı televizyonlara kadar kullanıcıdan emir alan ve donanıma iş yaptıran pek çok farklı türde işletim sistemi mevcut. Yine de bizim odak noktamız standart bilgisayarlar olduğu için en genel haliyle bilgisayar donanımını ve içindeki işletim sistemini bence bu şekilde soyutlayabiliriz. Neticede biz bilgisayarı kullanırken, aslında mevcut donanımlara iş yaptıran yazılımları kullanıyoruz. Bu yazılımların sorunsuzca kullanılabilmesi için de çalışabilecekleri stabil bir ortam olması gerekiyor. İşte işletim sistemi gerekli olan bu ortamı bize sağlayan yazılımdır. 

![1.webp]({{ site.url }}/egitim/temel-linux/temel/1.webp){:class="responsive img-zoomable"}


İşletim sistemini yekpare bir yazılım gibi düşünmek doğru olmaz. İşletim sistemi, aslında pek çok farklı yazılımsal bileşenin bir araya gelip uyum içerisinde çalışabilmesine verdiğimiz bütüncül bir isim. En genel haliyle bir işletim sisteminde, kullanıcıların sistemi yönetmek için kolayca kullanabilecekleri araçları barındıran kullanıcı katmanı ve bu araçlardan gelen emirleri donanıma ifade edecek çekirdek katmanı bulunuyor. 

![2.webp]({{ site.url }}/egitim/temel-linux/temel/2.webp){:class="responsive img-zoomable"}

Örneğin bakın bu soyutlamada, kullanıcı katmanında sistemin yönetilebilmesini sağlayan pek çok araç olduğunu görebiliyoruz. Burada soyutlanmış olan diğer katman ise çekirdek. Buradaki çekirdek katmanı çok önemli çünkü çekirdek dediğimiz yapı kullanıcı alanındaki araçlardan gelen emirleri donanıma ifade etmekle sorumlu aracı katmandır. Çekirdek olmadan örneğin biz bir metin editörü ile düzenleme yaptığımızda, bu düzenleme işleminin bilgisayarın donanımına ifade edilmesi mümkün değil çünkü metin editörümüz bilgisayar donanımı ile nasıl iletişim kurabileceğini bilmiyor. Bu iş çekirdeğin görevi.

![3.webp]({{ site.url }}/egitim/temel-linux/temel/3.webp){:class="responsive img-zoomable"}

İşte buradaki diyagram en kaba haliyle standart bilgisayardaki işletim sistemini temsil eden soyutlama. Biz işimizi halletmek için kullanıcı katmanındaki bir aracı kullanıyoruz, bu araç da çekirdekle iletişime geçip ilgili işin donanıma yaptırılmasını sağlıyor.

İşte donanıma iş yaptırabileceğimiz bu ortamın geneline de işletim sistemi diyoruz. Çünkü yazılımların birbiri ile uyumlu şekilde çalışması yani işletilmesi için gereken ortamı sağlıyor.

Ben en yalın haliyle soyutlamak için bu görseli oluşturdum ancak siz buradaki araçların ne olduğuna yani kullanıcı alanındaki araçların isimlerine takılmayın. Buradaki araçlar yalnızca temsili birkaç araç. Eğitim içerisinde bu konudan ayrıca tekrar bahsedeceğiz zaten. Ben şimdiden bir işletim sistemini oluşturan en genel yapıdan haberdar olalım istiyorum. Bu sayede anlatımın devamında ele alacağımız tüm kavram açıklamalarını daha net anlayabileceğiz. Özetle, ben işletim sistemi dediğimde, kullanıcı alanındaki araçlara ve bu araçlardan gelen emirleri donanıma ifade eden çekirdeğe atıfta bulunduğumun farkında olmanız yeterli.

En yalın haliyle işletim sisteminin ne olduğundan haberdar olduğumuza göre artık anlatımın devamında ele alacağımız kavramlar sizin için çok daha netleşmiş olacak. Gelin anlatımlarımıza Linux’un ne olduğundan bahsederek devam edelim.

# Linux Nedir ?

![linux-kernel-meme]({{ site.url }}/egitim/temel-linux/temel/linux-cekirdek-meme.png){:class="responsive img-zoomable"}

Yaygın olarak bilinen haliyle "Linux" açık kaynaklı özgür bir işletim sistemidir. Linux için bir işletim sistemidir dedim ancak aslında bu yaygın kullanıma sahip tanımlama tam olarak doğru değil. Çünkü Linux esasen bir çekirdektir. Bir önceki derste çekirdeğin, sistem üzerindeki araçlardan gelen emirleri donanıma ifade etmekle sorumlu olduğundan bahsettik. Yani çekirdek tek başına işletim sisteminin bütünü temsil etmiyor. Çekirdek yalnızca işletim sisteminin önemli bir parçası. Çekirdeğe ek olarak kullanıcıların işlerini görebilecekleri araçlara da ihtiyaçları var. Bu araçlar ve çekirdek bir araya geldiğinde bir işletim sistemi ortaya çıkıyor.

Dolayısıyla işletim sistemini temsil etmek için yaygın olarak kullanılan Linux ifadesi tek başına doğru değil. Bizim Linux işletim sistemi olarak bildiğimiz yapı aslında GNU/Linux işletim sistemidir. Buradaki GNU ifadesi işletim sisteminde olması gereken çeşitli araçları sağlayan projenin isminden geliyor. Dolayısıyla Linux çekirdeği ve GNU araçları bir araya geldiğinde ortaya bir işletim sistemi çıktığı için GNU/Linux işletim sistemi demek çok daha doğru bir tanımlama.

![4.webp]({{ site.url }}/egitim/temel-linux/temel/4.webp){:class="responsive img-zoomable"}

Biliyorum kısaca açıklamış olmama rağmen bu tanımlama şu an sizin için pek bir anlam ifade etmiyor, ancak merak etmeyin.

Çekirdeğin ne demek olduğunu ve Linux ifadesinin tek başına neden işletim sistemini temsil etmediğini bu bölüm içerisinde daha net açıklamalar ile tek tek ele almış olacağız. 

GNU Linux un tam olarak nasıl bir sistem olduğunu anlamak için GNU Linux ifadesini ortaya çıkaran tüm temel gelişmelerden sebep sonuç ilişkisi içinde kısaca bahsetmek istiyorum. Bu sayede yalnızca ben GNU Linux dediğim için değil, mantıklı nedenlere dayanmış şekilde neden GNU Linux dendiği ve bu ismin, sistemin teknik yapısını anlamak için neden bu kadar önemli olduğunu bizzat öğrenmiş olacaksınız. Ben bu sebeple biraz da temelden başlayarak anlatımlara Unix'ten söz ederek devam edelim.

## UNIX

Unix, Bell laboratuvarlarında geliştirilmiş olan, çoklu kullanıcı, işlem kontrolü, dosya sistemi erişimi ve ağ desteği gibi pek çok işlevsel özelliği bir arada sunan, alanında kararlı yapıdaki öncü işletim sistemiydi. Üstelik Unix geliştirilirken C dili ile yazıldığı için pek çok farklı donanım üzerinden de sorunsuzca kullanılabiliyordu. Yani taşınabilir standarda sahip bir işletim sistemiydi. Unix, dönemine göre sunduğu tüm imkanlar dolayısıyla çeşitli üniversiteler ve diğer ihtiyaç duyulan kurumlar tarafından sıklıkla tercih ediliyordu. Buraya kadar her şey gayet güzel ancak **Unix** lisans ücreti istiyordu. Ayrıca kaynak kodların kullanılarak Unix’in değiştirilip geliştirilmesi ve bu yolla yeni bir sistem ortaya konulması da lisans ile kısıtlanmıştı. Tabii ki bu durum sistemi kullanabilecek kişilerin sayısını da oldukça kısıtlıyordu. Yani insanlar ihtiyaç duysalar dahi özellikle bireysel kullanıcılar için fazla olan lisans ücretinden dolayı Unix’i kullanamıyorlardı. Ayrıca kullanıcıların eksik buldukları özellikleri geliştirip sistemlerini ihtiyaçları doğrultusunda özelleştirme imkanları da bulunmuyordu. Çünkü sistemin kapalı kaynak kodlu olması ve lisansının kısıtlamalar içermesi bu gibi değişiklikleri yapabilecek geliştiricilerin önünü net bir biçimde kesiyordu.

Lisanslar ve kapalı kaynak kodlu yazılımlar pek çok kişiyi olduğu gibi Richard Stallman'ı da rahatsız ettiği için 1983'te Richard Stallman, UNIX benzeri ücretsiz bir işletim sistemi oluşturma hedefiyle GNU projesini başlattı.

## GNU

![gnu.webp]({{ site.url }}/egitim/temel-linux/temel/gnu_logo.webp){:class="responsive img-zoomable"}

**GNU** ismi, **GNU** is **N**ot **U**nix yani “GNU Unix değildir” ifadesinin kısaltmasından geliyor. Zaten biraz önce, GNU projesinin Unix sisteminin getirdiği kısıtlamalardan doğduğundan bahsettik. İşte bu doğrultuda GNU projesi, herkesin ihtiyaç duyduğu uçtan uca açık kaynaklı özgür bir işletim sistemi bütünü ortaya koyabilmek amacıyla ortaya çıkmıştır. Ve ayrıca bu amaçla geliştirilen yazılımların yasal olarak lisanslanabilmesi için de GPL(General Public License) yani GNU Genel Kamu Lisansı geliştirilmiştir. GPL lisansı, açık kaynaklı özgür yazılımların geliştirilmesi ve yasal olarak lisanslanabilmesi için çok akıllıca tasarlanmış bir lisanstır. Zaten ekosistemin büyümesindeki en önemli atılımın bu lisansın varlığı olduğunu söylemek çok da yanlış olmaz. Bu lisansın maddelerinden de ayrıca bahsedeceğiz ancak bahsetmeden önce "açık kaynak" ve "özgür yazılım" kavramlarından da kısaca bahsederek tüm kavramları netleştirelim ki ileride yanlış anlaşılmalar yaşanmasın.

## Açık Kaynak ve Özgür Yazılım

Açık kaynak en basit haliyle, yazılımların kaynak kodlarının herkese açık ve erişilebilir şekilde yayınlandığı bir yazılım geliştirme modelidir. Bu sayede yazılımların tüm çalışma yapısı şeffaf bir biçimde herkes tarafından denetlenebilir. Şeffaf denetim imkanı olduğu için yazılım içerisinde zararlı kodlar bulunma ihtimali de son derece düşürülmüş olur. Ayrıca açık kaynak sayesinde mevcut yazılımın geliştirilmesi ve ihtiyaç halinde daha verimli alternatiflerinin ortaya koyulabilmesi için iyi bir zemin de sağlanır. 

Eğer daha önce bu konularda biraz araştırma yaptıysanız açık kaynağın, sağladığı avantajlar dolayısıyla genellikle "özgür yazılım" adıyla birlikte anıldığına sizler de şahit olmuşsunuzdur. Sıklıkla birlikte anıldıkları için “açık kaynak” ve “özgür yazılım” birbirine karıştırılabiliyor. Bu noktada iki kavram arasındaki farkı anlamak için **Richard Stallman’ın** bu konu hakkında kurmuş olduğu cümleye bakabiliriz.

***“Her iki kavram da hemen hemen aynı kategoride yer alan yazılımları tasvir ediyor olsa da, esasen farklı değerleri temsil ediyorlar. Açık kaynak (open source) bir geliştirme metodolojisi iken, özgür yazılım (free software) ise sosyal bir harekettir.”*** ~ **Richard Stallman**

Cümle aslında son derece açıklayıcı olmasına karşın bizler bu kavramların üzerinde biraz daha durarak daha da netleştirmeye çalışabiliriz. 

Açık kaynağın(open source) ve özgür yazılımın(free software) birlikte anılmasının yansıması olarak; özgür yazılım yani free software ifadesinde yer alan free kelimesi dolayısıyla genellikle insanlar, açık kaynağın ücretsiz yazılım demek olduğu yanılgısına düşebiliyorlar. Ancak bu doğru değil. Çünkü düşünülenin aksine buradaki free ifadesi ücretsiz anlamında değil, özgür anlamında kullanılıyor. Yazılımların özgür olmasını da, tabii ki sahip oldukları lisans türleri belirliyor. 

Özgür yazılım, kullanıcılara çalıştırma, inceleme, değiştirme, geliştirme, kopyalama ve dağıtma gibi özgürlükleri tanıyan yazılım türüdür. Bu yazılımları ücretsiz veya ücretli olarak elde etmiş olabilirsiniz. Elde ettiğiniz özgür yazılımları inceleme, değiştirme, geliştirme, kopyalama hatta ücretli veya ücretsiz şekilde dağıtma hakkına da sahip oluyorsunuz. Yani buradaki **free** ifadesi yazılımın sahipliği konusundaki **özgürlükten** bahsediyor. Bu bağlamda zaten diğer tür lisanslara sahip yazılımlara da “sahipli yazılım” diyoruz. Burada özgür yazılım ile kastedilen özgürlük, yazılımın ekonomik boyutuyla değil kullanım hakları ile ilgilidir. 

Açık kaynak ifadesi ise, Richard Stallman'ın da belirttiği şekilde yalnızca bir geliştirme metodolojisidir. Geliştirilen yazılımların kaynak kodları açıkça diğer insanlarla paylaşılıyorsa bu yazılımlar açık kaynaklıdır. Geliştiriciler açık kaynaklı projesini ücretli veya ücretsiz şekilde dilediği bir lisans ile dağıtabilir. Projenin kaynak kodlarının açıkça okunabiliyor olması, projenin ücretsiz olduğu anlamına gelmiyor. Genellikle ücretli olarak satılan açık kaynaklı yazılımlar destek veya güncelleme gibi hizmetler karşılığında para aldığı için yazılımın kaynak kodlarının herkese açık olması, bu yazılımın ücretli olarak satılamayacağı anlamına gelmiyor. 

Açık kaynaklı yazılımlarda dikkat etmeniz gereken, bu yazılımın sahip olduğu lisans türüdür. Örneğin, açık kaynaklı bir yazılım bireysel kullanım ve geliştirme için izin verirken ticari kullanımda kısıtlamalar barındırabilir. Ayrıca, hem açık kaynaklı hem de özgür bir yazılım olabilir. Özgür yazılımın tüm kaynak kodları özgürce herkes tarafından kullanılıp, değiştirilip ücretli veya ücretsiz satılmaya açıktır, çünkü özgür yazılım lisansı buna izin verir. **Ancak özgür yazılım lisansına sahip yazılımlar kapalı kaynak kodlu olarak ve lisansları değiştirilerek tekrar dağıtılamazlar.**

Özetleyecek olursak, hem ücretli hem de ücretsiz olan açık kaynaklı pek çok yazılım vardır. Ayrıca bir yazılım **açık kaynaklı ve özgür yazılım lisanslı diye "ücretsiz-bedava" olmak zorunda da değildir.** Yani yanlış kanının aksine açık kaynak ve özgür yazılım bedava ücretsiz yazılım anlamına gelmiyor. 

Bence temel düzeyde açık kaynak ve özgür yazılım konularına açıklık getirdik. Yine de özgür yazılımı daha net anlayabilmek adına Richard Stallman tarafından açık kaynak ve özgür yazılım ekosistemini desteklemek için geliştirilmiş olan GPL lisansından da ayrıca bahsetmek istiyorum.

GPL lisansı 4 temel özgürlük üzerine kurulmuştur bunlar:

- **Özgürlük 1:** Programı sınırsız kullanma özgürlüğü.
- **Özgürlük 2:** Programın nasıl çalıştığını inceleme ve amaçlara uygun değiştirme özgürlüğü.
- **Özgürlük 3:** Programın kopyalarını sınırsız dağıtma özgürlüğü.
- **Özgürlük 4:** Programın değiştirilmiş halini dağıtma özgürlüğü.

GPL, lisansını kullanan yazılımların kaynak kodlarını paylaşmasını gerektiriyor. Yani GPL lisansına sahip yazılımlar ücretli olarak da satılabilir ancak kaynak kodları paylaşılmak zorunda. Diğer geliştiriciler de tekrar GPL lisansını kullanmak şartıyla bu kaynak kodları üzerinden yazılımların bir kısmını veya tamamını değiştirip tekrar ücretsiz veya ücretli şekilde dağıtabilirler. GPL lisansında kaynak kodları paylaşmak ve aynı lisansı kullanmaya devam etmek zorunluluk olduğu için ücretli de olsa ücretsiz de olsa yazılımların tüm kaynak kodları her zaman herkese açık olarak paylaşılır. Aynı lisansı kullanma zorunluluğu da tüm bu yaklaşımı sürekli olarak devam ettirmeyi gerektiriyor. Bu sayede yazılım ekosisteminin ivmeli olarak gelişmesi de mümkün oluyor. Yani hiç kimse açık kaynaklı bir yazılımı alıp kapalı kaynaklı hale getirip yasal olarak satamaz. 

GPL lisansına sahip yazılımlarda, insanlar ihtiyaçlarına göre istedikleri yazılımı istedikleri şekilde değiştirip diğer insanlarla paylaştığı için pek çok farklı amaca hizmet eden pek çok yazılım herkesin erişimine açılmış olur. Yani internet üzerinde kısa bir araştırma ile sizin aradığınız çözümü sunan açık kaynaklı ve özgür yazılım lisansına sahip araçlar bulmanız çok daha olasıdır. 

Bu noktada GPL lisansına sahip yazılımların nasıl para kazanıldığına dair yani GPL lisansının ekonomik olarak nasıl sürdürülebilir olduğuna dair kafanızda sorular oluşmuş olabilir. Daha önce de kısaca belirttiğim gibi bu lisans türünde çoğunlukla doğrudan ilgili yazılım için değil, ilgili yazılımın eğitimi, teknik desteği veya eklentileri gibi ek hizmetler için ücret isteniyor. Bu sebeple GPL lisansını kullanan yazılımların çok büyük bir kısmı zaten tamamen ücretsiz olarak herkesin kullanımına açıktır. Bu da ilgili yazılımların geniş kitlelere yayılarak, çok daha hızlı ve güvenli şekilde geliştirilebilmesini sağlıyor. 

Özetle GPL, **Richard Stallman** tarafından geliştirilmiş çok akıllıca detaylarla bağlayıcılığı bulunan lisans türüdür. Bu lisans türünde her iki cephe yani geliştiriciler de kullanıcılar da kazançlıdır. GPL'nin oluşturulmasındaki amaç, insanlığa hizmet edebilecek ve gelişmelere öncülük edebilecek bir hukuki lisans sunmaktır. Yani savunulan şey daha fazla rant değil, insanların gönül rahatlığı ile sınır olmadan yazılım ihtiyaçlarını karşılayabilmesidir. Zaten bu sayede tüm yazılım ekosistemi ivmeli olarak herkesin yararına olacak şekilde zaman içinde büyümüştür ve büyümeye de devam ediyor.

Bu konu hakkında ayrıca avantajları ve dezavantajları tek tek sıralayabiliriz ancak konuyu çok genişletmemek ve sizlere **araştırma, kendi kendine bulup öğrenme alışkanlığı** kazandırmak adına bu konuyu burada kesiyorum. Nitekim burada anlatımı genişletmem, sizin araştırıp kendi kendinize öğrenmenizden ve bu araştırma alışkanlığını kazanmanızdan daha da yararınıza olmayacaktır. Ayrıca hazır yeri gelmişken belirteyim, benim konu içinde veya dışında belirtmiş olduğum kaynaklarla sakın ola sınırlı kalmayın. Ben sadece bir başlangıç noktası ve referans olması adına sizlerle bu bilgileri paylaşıyorum. Daha fazlasını araştırmak tamamen sizlerin merakına bağlı. İlk duyduğunuzda bu “kendi kendine” araştırma sorumluluğundan hiç hoşlanmamış olabilirsiniz, ancak araştırma ve kendi kendine öğrenme alışkanlığına sahip olduğunuzda bana bu konuda hak vereceğinizi umuyorum. Bu noktada söylediklerimin daha net anlaşılması için Konfüçyüs'ün en bilindik sözünü alıntılamak isterim.

*"Bir kişiye iyilik yapmak istiyorsan ona balık verme, balık tutmayı öğret."*

Konumuza dönecek olursak GPL lisansının sağladığı imkanlar sayesinde, 90'ların başında GNU projesinde, tam bir işletim sistemi oluşturmak için gereken neredeyse tüm yazılımlar hazırdı. Yani genel anlamda ifade etmemiz gerekirse kullanıcı alanı için gereken hazırlıklar tamamdı. Ancak, GNU projesi için geliştirilen çekirdek, yeterince stabil şekilde çalışmadığı için bütüncül bir işletim sistemi henüz ortaya koyulamamıştı. Tabii ki bu durum uzun süre devam etmeden çekirdek sorunu da Linus Torvalds’ın geliştirmiş olduğu Linux isimli çekirdek kullanılarak çözüldü. Çünkü sizin de bildiğiniz gibi çekirdek olmadan kullanıcı alanındaki yazılımların doğrudan donanımlara iş yaptırması mümkün değil. Yani çekirdek olmadan bu yazılımların da bir anlamı yok. 

Şimdi Linux çekirdeğinin ortaya çıkmasını sağlayan gelişmeleri daha net anlayabilmek adına çok kısaca Minix’ten de biraz bahsedelim.

## Minix(mini-unix)

GNU cephesinde stabil bir çekirdek ihtiyacı sürerken, işletim sistemlerinin nasıl çalıştığını canlı bir sistem üzerinden örneklemek için Andrew S. Tanenbaum tarafından eğitim amaçlı Unix benzeri Minix isimli bir işletim sistemi geliştirilmişti. Minix ismi de zaten **Mi**ni U**nix** ifadesinin kısaltmasından geliyor. Minix projesi eğitim amaçlı olduğu için açık kaynak kodluydu. Bu sayede ders kitabında aktarılan ilkelerin örnekleri bu sistem üzerinden açık kaynaklı olduğu için rahatlıkla görülebiliyordu. Ancak Minix in sahip olduğu lisans gereği değiştirilmesi ve yeniden dağıtımı kısıtlanmıştı. Yani açık kaynaklı bu yazılım özgür değildi, yalnızca eğitim amacıyla kullanılıyordu. Eğitim amacıyla geliştirildiği için de isminde yer alan Unix kadar gelişmiş özellikler de barındırmıyordu. Çünkü geliştirilmesindeki birincil amaç son kullanıcıya yönelik kapsamlı bir işletim sistemi geliştirmek değildi. 

Dönemi itibariyle, MINIX'in 16-bit tasarımı, kişisel bilgisayarlar için giderek daha ucuz ve popüler olan Intel 386 mimarisinin 32-bit özelliklerine iyi bir şekilde uyarlanmamıştı. Doksanların başında Intel 386 işlemcili bilgisayarlar için kullanılabilir olan UNIX işletim sistemi de bireysel kullanıcılar için çok pahalıydı. Kullanıcıların 5000$ bulan maliyetlere katlanması gerekiyordu. Tam da bu sıralar Helsinki üniversitesinde öğrenci olan Linus Torvalds yeni aldığı intel 386 işlemcili bilgisayarını tüm özellikleriyle kullanmak istiyordu. Ancak Unix, lisansı gereği oldukça maliyetliydi ve Minix de işlemciyi tüm fonksiyonlarıyla desteklemiyordu. Yani Minix in geliştirilebilir pek çok yanı vardı. Bu noktada Linus kendi işletim sistemi çekirdeğini geliştirme kararı aldı. 

## Linus Torvalds

Linus Torvalds 1991 yılında, daha sonra ismi Linux çekirdeği olarak geçecek olan projesine başlamıştı. Yeni bilgisayarının işlemcisinin tüm fonksiyonlarını tam olarak kullanabilmek istediği için, bu doğrultuda Unix ten esinlenerek sıfırdan, kullanmakta olduğu donanıma özgü bir işletim sistemi çekirdeği geliştirmiş. Geliştirmeyi de Minix üzerinde gerçekleştirmiş ve derlemek için GNU projesinin C derleyicisini tercih etmiş. Daha sonra geliştirdiği projeyi Minix haber grubunda, topluluğa duyurarak insanların haberdar olmasını sağlamış. Başlangıçta Linus için hobi projesi olarak başlayan bu çekirdek, topluluk tarafından da büyük ilgiyle karşılanmış. İlk başlarda, Linux çekirdeği ticari faaliyeti kısıtlayan lisansla yayınlanmış olmasına karşın daha sonra herkesin kullanımına ve gelişimine açılması için GPL lisansına geçiş yapılmış. Elbette bu lisans değişimi de projenin gelişimi için çok doğru bir karar olmuş.

Çünkü zaten halihazırda Linus Torvalds’ın topluluğa sunduğu sistemin içerisinde, GNU projesi tarafından geliştirilmiş olan araçlar da bulunuyordu. Neticede Linus, çekirdeği kendisi yazmış, ancak çekirdeği GNU projesiyle geliştirilen derleyici ile derlemiş ve açık kaynaklı bazı özgür yazılım araçları kullanarak da işletim sistemi haline getirmişti. 

En nihayetinde Linux çekirdeğinin GPL lisansına geçişiyle birlikte, GNU projesinin halihazırda sahip olduğu açık kaynaklı özgür yazılım araçları ve topluluk desteği, ortaya açık kaynaklı ve özgür bir işletim sistemi olan “GNU Linux” işletim sistemini çıkarmıştı. GNU'nun eksik olan çekirdeği, Linux çekirdeğinin de eksik olan işletim sistemi araçları birbirini tamamlayarak açık kaynaklı özgür bir işletim sistemi oluşturdu. 

![5.webp]({{ site.url }}/egitim/temel-linux/temel/5.webp){:class="responsive img-zoomable"}

Böylelikle **GNU/Linux** efsanesi doğmuş oldu. İşte **GNU/Linux** devrimi kısaca bu şekilde. Hem **GNU araçlarının** hem de **Linux çekirdeğinin** topluluğa bağlı dönütlerle geliştirilmesi doğrultusunda **herkese açık, ücretsiz ve sınırsız geliştirilme potansiyeline sahip, gerçek anlamda insana hizmet eden özgür bir işletim sistemine** nasıl sahip olduğumuzun kısa hikayesi işte bu şekilde.

Sanırım artık neden Linux değil de GNU Linux denildiğini ve çekirdek ile kullanıcı alanındaki araçların ayrı ayrı neden çok önemli olduğunu biliyoruz. 

## Sonuç Olarak

Anlatımın başında da söylediğimiz şekilde; **Linux** bir işletim sistemi değil, **çekirdektir(kernel).** **GNU/Linux** bütünü bir **işletim sistemidir**. Ancak genellikle söylenmesi uzun veya zor geldiği için, zamanla sadece **Linux** olarak geçmeye başlamıştır. Ben de anlatımlar sırasında **GNU/Linux** yerine sadece **Linux** ifadesini kullanıyor olacağım. Ancak emin olun **çekirdekten**(**kernel**) yani **Linux**'tan bahsettiğimde ve **GNU/Linux**(**işletim sistemi**)'tan bahsettiğimde hangisini kastettiğimi rahatlıkla anlıyor olacaksınız. 

GNU/Linux sisteminin ortaya çıkış hikayesini teknik ya da tarihi detaylara girmeden, daha fazlasını araştırmak istediğinizde referans noktalarınız olacak şekilde ele almaya çalıştım. Burada ele aldıklarımız dışında “Revolution OS” belgeselini izlemenizi ve Linus Torvalds'ın yazmış olduğu “just for fun” kitabını okumanızı ve elbette harici olarak wikipedia gibi internet üzerindeki kaynaklara da göz atmanızı şiddetle tavsiye ederim. Örneğin ben değinmedim ama, logosunun ve isminin nereden geldiğini merak ediyorsanız çok kısa bir araştırma ile hemen öğrenebilirsiniz. Biz şimdi ileride sıklıkla duyacağımız bir diğer önemli konu olan "**dağıtım**" kavramı ile anlatımlarımıza devam edelim.

Ancak dağıtım kavramından bahsetmeden evvel, hazır açık kaynak kavramından bahsetmişken yanlış bilinen bir efsaneye de değinmek istiyorum. Özellikle çok fazla araştırma yapmamış ancak ucundan köşesinden Linux sistemini duymuş insanlarda, Linux’un virüslerden muaf olduğu ve açık kaynaklı olduğu için güvenlik zafiyeti içermediği gibi yanlış bir kanı var. Ancak bu doğru değil. Her sistemde olabileceği gibi Linux sistemi için de zararlı yazılımlar geliştiriliyor. Dolayısıyla Linux, zararlı yazılımlardan muaf değil. Ayrıca bir yazılımın açık kaynaklı olması demek o yazılımın hiçbir güvenlik riski veya zafiyeti içermediği anlamına da gelmiyor. Çünkü her ne kadar herkesin denetimi altında olsa da açık kaynaklı projelerde de yıllar boyu fark edilmeyen güvenlik zafiyetleri bulunabiliyor. Linux üzerinde de zaman zaman bu tür zafiyetler keşfediliyor. 

Dolayısıyla bir yazılım açık kaynaklı diye %100 güvenli olduğu anlamına gelmiyor. Ancak yine de güvenlik endişelerini gidermek için kaynak kodlarına açıp bakabilme imkanına sahibiz. Kapalı kaynak kodlu yazılımlarda ise, kaynak kodlarının arasına kasıtlı olarak yerleştirilmiş arka kapılar olup olmadığını doğrudan bilmemizin bir yolu yok maalesef. 

Şimdi anlatımlarımıza “distro” kavramını açıklayarak devam edebiliriz.

# Dağıtım(Distro) Nedir ve Hangisini Seçmeliyiz ?

İngilizce "distribution" ifadesinin kısaltmasından gelen “**distro**” kavramı Türkçe olarak “**dağıtım**” anlamına geliyor. Dağıtım kavramını anlayabilmek için, öncelikle GNU/Linux sisteminin yapısını iyi anlamamız gerekiyor. GNU/Linux’un, içerisinde sistemin yönetilebilmesini sağlayan pek çok farklı aracı barındıran sistem bütününe verilen genel isim olduğunu öğrendik. Biz kullanıcı alanındaki araçları kullanıyoruz, bu araçlar da çekirdek ile iletişim kurup donanıma iş yaptırılmasını sağlıyorlar. 

![7.webp]({{ site.url }}/egitim/temel-linux/temel/7.webp){:class="responsive img-zoomable"}

Dağıtım kavramı da, ihtiyaçlar doğrultusunda sistemdeki araçların özelleştirilmesiyle ortaya çıkmıştır.

Örneğin ben siber güvenlik alanında kullanmak için grafiksel arayüze sahip bir GNU/Linux dağıtımı oluşturmak istiyorsam, Linux çekirdeğiyle birlikte siber güvenlik için gerekli olan araçları eklerim. Ve bu oluşturduğum sistemi dilersem diğer insanlara paylaşabilir yani bu sistemi dağıtabilirim. Veya örneğin ben grafiksel arayüzü istemiyorsam bu sistemden grafiksel arayüzü çıkarıp belki istediğim başka araçları da ekleyip bu sistemi de kullanabilirim. Hatta dilersem bu sistemi diğer insanlara da paylaşabilirim. 

![8.webp]({{ site.url }}/egitim/temel-linux/temel/8.webp){:class="responsive img-zoomable"}

İşte tıpkı benim vermiş olduğum basit örnekler gibi, zaman içinde farklı ihtiyaçları karşılamak için Linux çekirdeğiyle birlikte farklı araçların bir araya getirildiği pek çok farklı GNU Linux dağıtımı oluşturulmuş. Dolayısıyla GNU Linux olarak geçen tüm dağıtımlarda çekirdek olarak Linux çekirdeğinin kullanılması dışında, hepsi kendi amaçları doğrultusunda çeşitli özgür yazılımları sisteme dahil edip kendi dağıtımlarını ortaya çıkarmışlar. 

![6.webp]({{ site.url }}/egitim/temel-linux/temel/6.webp){:class="responsive img-zoomable"}

Bu kadar çok dağıtım olmasının nedeni de zaten özgür yazılımın sağladığı bu özgürlük işte. Bir işi yapacak yazılım mı arıyorsunuz, muhtemelen daha önce birileri geliştirip özgür yazılım lisansı ile paylaşmıştır. Alıp sisteme dahil edip özgürce kullanabilirsiniz. 

Ne kadar çok dağıtım olduğunu görmek için popülaritesine göre sıralanmış olan dağıtımları [distrowatch.com](https://distrowatch.com/dwres.php?resource=popularity) üzerinden kontrol edebilirsiniz. Popüler dağıtımlara Debian, Mint, Ubuntu, Fedora ve benzer pek çok dağıtımı saymamız mümkündür. Ancak bu çokluk sizin gözünüzü korkutmasın. Bu kadar çok dağıtım olmasına karşın bizim bu eğitim serisi içerisinde ele alacağımız dağıtım türü, ortak olarak herkese hitap edebilecek "Debian tabanlı" olan dağıtımlardır. Peki ama “Debian tabanlı dağıtım” da ne demek ?

## Debian Tabanlı Dağıtımlar Hakkında

**Debian tabanlı dağıtım**, isminden de anlaşılacağı gibi Debian dağıtımını temel alarak oluşturulmuş alt dağıtımlara verilen genel bir isimdir. 

Debian, çıkış tarihi itibariyle oldukça köklü olan bir ana dağıtım türüdür. Zaman içerisinde Linux çekirdeği etrafında stabil şekilde çalışan pek çok araç eklenerek sorunsuzca çalışan bir dağıtım halini almıştır. Stabil şekilde çalıştığı için, farklı amaçlarla dağıtım oluşturmak isteyen kişiler sıfırdan dağıtım oluşturmakla uğraşmak yerine, Debian dağıtımını değiştirerek isteklerine uygun yeni alt dağıtımlar oluşturmuşlar. İşte Debian dağıtımını amaçları doğrultusunda değiştirip yeni bir dağıtım olarak sunan sistemlere "Debian tabanlı dağıtımlar" deniliyor. Örneğin Pardus başlarda bağımsız şekilde sıfırdan geliştiriliyorken bu bağımsız sürüm bırakılıp, Debian dağıtımı üzerinden tekrar geliştirilerek debian tabanlı dağıtım halini almıştır. 

Debian ana dağıtımındaki bu durum diğer ana dağıtımlar için de aynen geçerlidir. Örneğin Redhat ana dağıtımı altında CentOS isimli yaygın kullanıma sahip alt dağıtım mevcuttur. 

Yani özetle kararlı yapıdaki ana dağıtımlar, zaman içinde çeşitli amaçlara uygun olarak özelleştirilmiş olan alt dağıtımların geliştirilmesini sağlamıştır. Tekerleği baştan icat etmek yerine, mevcut olan sağlam yapıyı ihtiyaçlara göre değiştirmek çok daha etkili olduğu için bu kadar çok alt dağıtım görüyoruz zaten.

Köklü dağıtımları taban olarak kullanan dağıtımlarda, temel yönetim araçları ortak olduğu için aslında dağıtımların bu kadar çok olması doğrudan öğrenme güçlüğü oluşturmuyor. Örneğin Debian tabanlı dağıtımlar paket yönetimi için yani sisteme program yükleyip kaldırma gibi işlemler için ortak olarak `apt`(*Advanced Package Tool*- *Gelişmiş Paketleme Aracı*) isimli aracı kullanır. Yani örneğin siz Debian tabanlı olan "Pardus" "Ubuntu"  "Mint" ya da "Kali Linux" da kullansanız `apt` paket yönetim aracı varsayılan olarak yüklü geliyor. Ayrıca komutlar yardımıyla sistemi yönetebilmemizi sağlayan pek çok araç da zaten tüm sistemlerde ortak olarak kullanılan araçlar olduğu için bu araçların kullanımını öğrendikten sonra istediğimiz bir dağıtım üzerinden de bu araçları rahatlıkla kullanabiliyoruz. 

İşte bizler de bu eğitimde Debian tabanlı bir dağıtım üzerinden Linux sistemini tanıyıp temel seviyede nasıl yönetebileceğimizi öğrenmeyi hedefliyoruz. Ben eğitim boyunca Debian tabanlı Kali Linux dağıtımı üzerinden ilerliyor olacağım. Ancak sizler debian tabanlı dilediğiniz bir dağıtım üzerinden bu eğitimi aynı şekilde sorunsuzca takip edebilirsiniz. 

Benim anlatımları Debian tabanlı dağıtım üzerinden gerçekleştiriyor olma nedenim, kullanımının hem profesyonel hem de standart ev kullanıcıları arasında yaygın olmasıdır. Debian dağıtımları, standart ev kullanıcılarından tutun da dünya çapında hizmet sunan Google gibi şirketlerin sunucu altyapılarına kadar, pek çok farklı alanda yaygın kullanıma sahiptir. 

Özetle kişisel merak için mi Linux öğreniyorsunuz doğru eğitimdesiniz. Siber güvenlik, veri bilimi, yazılım geliştiricisi ve Linux ile kesişimi olan profesyonel bir alanla mı ilgileniyorsunuz temel seviye için yine doğru eğitimdesiniz. 

Örneğin [w3techs.com](http://w3techs.com) üzerinde yayınlanmış olan istatistiklere göre Ubuntu, Linux kullanan tüm web sitelerinin %31,7'si tarafından kullanılıyorken, hemen onun ardından Ubuntu’nun da taban olarak kullandığı Debian geliyor. Debian dan sonra da CentOS un yaygın kullanıma sahip olduğunu görebiliyoruz. 

---

| Dağıtım | Yüzdelik |
| --- | --- |
| Ubuntu | 31.7% |
| Debian | 16.8% |
| CentOS | 8.2% |
| Red Hat | 0.7% |
| Gentoo | 0.5% |
| AlmaLinux | 0.2% |
| Fedora | 0.2% |
| SuSE | 0.1% |
| Raspbian | <0.1% |
| Scientific Linux | <0.1% |
| Turbolinux | <0.1% |
| CloudLinux | <0.1% |
| Mandriva | <0.1% |
| Mageia | <0.1% |
| Trisquel | <0.1% |
| Red Star OS | <0.1% |
| PCLinuxOS | <0.1% |
| Asianux | <0.1% |
| PLD Linux | <0.1% |
| Unknown | 41.6% |

**Kaynak:** [w3techs.com](https://w3techs.com/technologies/details/os-linux), 21 May 2023

---

## Red Hat ve CentOS Hakkında
Bu noktada CentOS için ek bir açıklamada bulunmamız gerekirse, CentOS özellikle uzun yıllar boyunca profesyonel amaçlarla en sık kullanılan dağıtımların başında geliyordu. Çünkü kurumsal amaçla kullanılan kararlı yapıdaki Red Hat Enterprise Linux dağıtımını birebir takip eden ücretsiz alternatifiydi. Hem ücretsiz olması hem de Red Hat kadar kararlı olması dolayısıyla oldukça yaygın kullanıma sahipti. Daha sonra CentOS projesi Red Hat'e devredilerek Red Hat şirketi altında geliştirilmeye devam etti. Başlarda Red Hat CentOS'u desteklemek istedi çünkü CentOS, kullanıcılara ücretli Red Hat dağıtımına sahip olmadan Red Hat dağıtımını kullanabilme kabiliyeti kazandırarak piyasada Red Hat kullanabilecek insan sayısını da arttırıyordu. Bu sayede kurumsal olarak Red Hat ürününün pazarlanması olumlu etkileniyordu.

Ücretsiz olan CentOS un topluluk desteği varken, ödeme yapıldığı için Red Hat'in profesyonel desteği mevcuttu. Destek istemeyenler ücretsiz ama aynı şekilde kararlı olan CentOS’u tercih ediyorlardı. Yakın dönemde de Red Hat IBM tarafından satın alındı. Bu satın alma başlangıçta CentOS topluluğu tarafından pek hoş karşılanmadı, nitekim devam eden gelişmeler ile CentOS'un son sürümünün sahip olduğu uzun süreli destek geri çekildi ve projenin CentOS Stream olarak devam edeceği beyan edildi. Bu CentOS Stream sürümü ticari versiyon olan Red Hat Enterprise Linux’un yeni sürümü çıkmadan önce ara sürümlerinin test edileceği dağıtım olarak kullanılacak. Bu da CentOS Stream projesinin eski CentOS kadar stabil olmayabileceği anlamına geldiği için kullanıcıların CentOS’tan uzaklaşmasına neden oldu.

Normalde Red Hat yeni sürümleri yayınlamadan önce değişiklikleri Fedora dağıtımı üzerinde test eder, emin olduğu geliştirmeleri de Red Hat üzerinde kararlı sürüm olarak yayınlardı. CentOS da Red Hat’in sunduğu gelişmeleri uygulayarak kararlı şekilde çalışan ücretsiz bir alternatif sunardı. 

![9.webp]({{ site.url }}/egitim/temel-linux/temel/9.webp){:class="responsive img-zoomable"}

Yeni dönemle birlikte büyük değişikliklerin öncelikle Fedora üzerinde test edilmesine, ara sürüm güncellemelerinin de CentOS Stream üzerinde test edilip en son kararlı olduğu düşünülen değişikliklerin Red Hat üzerinde uygulanmasına karar verildi.

![10.webp]({{ site.url }}/egitim/temel-linux/temel/10.webp){:class="responsive img-zoomable"}

Dolayısıyla kararlılık konusundaki endişelenen topluluk tarafından CentOS kullanımı artıp pek cazip bulunmuyor. Bu durum CentOS kullanımında büyük düşüşleri de beraberinde getirdi ve bu düşüş devam edecek gibi duruyor. Elbette topluluk, Red Hat’in bu hamlesinden sonra boş durmadı ve topluluk desteğiyle önceki CentOS’un yerini alması planlanan Rocky Linux geliştirilmeye başlandı. Ben bu eğitimi hazırladığım dönemde çok yaygın kullanıma sahip değil. Ancak, Rocky Linux her daim topluluk odaklı kalacağını yani CentOS’un kaderini paylaşarak asla satılmayacağını beyan ettiği için ileride kararlı sürümleriyle Rocky Linux'u da yaygın olarak görmeye başlayabiliriz. Ayrıca ben yalnızca Rocky Linux’tan bahsettim ancak benzeri şekilde topluluk tarafından desteklenen ve Red Hat’in ticari sürümünü takip eden alternatif çeşitli dağıtımlar da mevcut. 

İşte benim bildiğim ve özetleyebildiğim kadarıyla CentOS’un zaman içinde geldiği nokta bu. Eğer daha fazla detayı merak ediyorsanız, araştırmanız halinde tüm gelişmeler hakkında detaylıca bilgi edinebilirsiniz. Ben yalnızca CentOS ve RedHat ile de sık karşılaşmaya devam edeceğiniz için kısaca bahsetmek istedim.


## Özetle
Tüm bahsettiklerimizden yola çıkarak, öğrenmesi ve kullanması kolay olduğundan ve öğrenmenin bizlere sunacağı katkıdan dolayı Debian tabanlı dağıtımlar, GNU/Linux dünyasını tanımak ve gelişmek için iyi bir başlangıç noktasıdır. Örneğin eğitim sırasında en yaygın dağıtımlardan biri olan Ubuntu dağıtımını da kullanabiliriz. Fakat ben Ubuntu kullanmak istemiyorum çünkü bu eğitimi Debian tabanlı olduğu sürece istediğiniz bir dağıtım üzerinden takip edebileceğinizi göstermek istiyorum. Örneğin siber güvenlik için özelleştirilmiş olan Debian tabanlı Kali linux dağıtımını kullanabiliriz. Neticede bu dağıtım da Debian tabanlı olduğu için, içerisinde siber güvenlik için gerekli olan araçları barındırmasına ek olarak sistemin yönetilebilmesi için gereken en temel araçları da tıpkı diğer Debian dağıtımlarında olduğu gibi barındırıyor.  Ben anlatımlar sırasında Kali Linux kullanıyor olacağım fakat siz Ubuntu Mint veya Pardus gibi Debian tabanlı herhangi bir dağıtımı kullanarak da bu eğitimi takip edebilirsiniz. 

Ayrıca Debian tabanlı dağıtımların Red Hat tabanlı dağıtımlar ile paket yöneticileri haricinde temel sistem yönetimi için bariz bir farkı da bulunmadığını belirtmiş olayım. Zaten Red Hat tabanlı dağıtımlar üzerinde kullanılan paket yöneticisinden de yeri geldiğinde kısaca bahsedeceğiz. Kısacası ben bu eğitimi Kali Linux üzerinden ele alacağım ancak sizler bu eğitimden öğrendiğiniz temel sistem yönetim bilgilerini daha sonra Debian tabanlı olan dağıtımlarda ve Red Hat tabanlı dağıtımlar üzerinden de kullanabiliyor olacaksınız. Zaten bu eğitimin amacı Linux sisteminin genel yapısı ve işleyişinden bahsedip, bash kabuğu üzerinden temel sistem yönetimi araçlarını nasıl etkili şekilde kullanabileceğimize değinmek olduğu için pek çok dağıtım üzerinden anlatımları takip edebilirsiniz. 

Zaten bu eğitimde grafiksel arayüzün kullanımına değinmeyeceğiz. Çünkü grafiksel arayüzü kendi kendinize de rahatlıkla keşfedebilirsiniz. Bu eğitimde sistemi komutlar yardımıyla yönetebilmemize olanak tanıyan komut satırına odaklanacağız. Bu sayede grafiksel arayüzü farklı olsa da diğer dağıtımları da rahatlıkla kullanabiliyor olacaksınız.

Ancak yine de baştan belirteyim özellikle yeni öğrenmeye başlayan kişilerin farklı dağıtımlar üzerinden bu eğitimi takip etmeye çalışmaları öğrenme sürecini zorlaştırabilir.

Dikkatinizi çekmek istediğim nokta farklı dağıtımların farklı sistem yönetimi araçlarına sahip olabileceğidir. Özellikle grafiksel arayüzün görünümü, paket yöneticisi ve varsayılan olarak sistemde kurulu gelen araçlar bakımından pek çok dağıtım birbirinden ayrılıyor. Ben aynı anda tüm dağıtımlar hakkında bilgi sunamayacağım için Kali Linux üzerinden temelde Linux sistem yönetimi için bilmemiz gerekenlere odaklanıyor olacağım. Sizler paket yöneticisi haricindeki farklılıkları da kısa araştırmalar ve sistemi kurcalamalarınız doğrultusunda kendi kendinize keşfedebiliyor olacaksınız. Çünkü Linux’un temellerini öğrenmiş olacaksınız. **Yani sorun yaşadığınız noktada sorunu çözmek için çaba harcamaya hazır olun.** Zira eğitim boyunca ve eğitim sonrasında yaşadığınız sorunları çözmek için interneti sıklıkla kullanıyor olacaksınız.

Artık böylelikle, anlatımın başında sormuş olduğumuz "hangi dağıtımı seçmeliyiz?" sorusuna da genel olarak tatmin edici bir yanıt verdiğimizi düşünüyorum. Elbette anlatım sırasında tüm dağıtımlardan bahsetmedik, zaten sayılarının çokluğu itibariyle tek tek bahsetmemiz de  mümkün değil.  En nihayetinde benim sizlere önerim en azından bu eğitimi Kali, Ubuntu ya da Debian tabanlı güncel bir dağıtım üzerinden takip etmeniz. Çünkü bu eğitim Debian tabanlı dağıtımları merkezine alıyor. 

Tekrar etmek istiyorum ki farklı dağıtımlar, farklı paket yöneticileri ve farklı çeşit sistem yönetim araçları barındıracağı için bu eğitimin tüm dağıtımları tamamıyla desteklemesi mümkün değil. Ancak merak etmeyin eğitim sonunda temel kavramları öğrenmiş olacağınız için farklı türdeki dağıtımları deneyimleyip keşfetme özgüvenine de zaten sahip olacaksınız. Yani dağıtımlar üzerindeki farklılıklar sizin için bir zorluk olmayacak.

Doğru ifade edebilmek için açıklamaları biraz uzun tuttum ancak kurulum anlatımlarına geçmeden önce özellikle ilk defa Linux öğrenme gayretinde olan kişilerin kafasında hiçbir soru işareti kalmaması adına temel kavramların hepsini ele alalım istiyorum. Yani neden hâlâ işletim sistemi kurulumlarını anlatmadığımı merak ediyorsanız, eğitimden maksimum verimi alabilmeniz adına sıfırdan sırasıyla ilerlemeye gayret ettiğimi bilmenizi isterim.

Özetle bu eğitim sizin kullandığınız dağıtım veya sürüme göre grafiksel olarak farklı görünüyor ve farklı araç setlerini barındırıyor olabilir ancak yönetimine dair anlatılan tüm temel bilgiler geçerliliğini korumaya devam edecektir. Çünkü tüm yenilikler de aslında bu temeller üzerine inşa edilerek geliştiriliyor. Sizden tek ricam tüm eğitimi baştan sonra sırası ile sabırla ve etkileşimde olarak yani uygulama ve araştırmaya açık olarak bitirmenizdir. Eğitimi bitirdiğinizde bahsetmiş olduğumuz tüm konularda bana hak vereceğinize ve Linux sistemini rahatlıkla kullanabiliyor olacağınıza emin olabilirsiniz. Size önerim ilk öğrenme aşamasında daha kolay ilerleyebilmek ve sağlam bir temel atabilmek adına benim gibi Debian tabanlı bir dağıtım hatta mümkünse Kali Linux veya Ubuntu dağıtımı üzerinden eğitimi takip etmeniz. Bu sayede temel işleyişi rahat biçimde kavradıktan sonra, farklı dağıtımlarda karşılaşacağınız olası sorunlar ve farklılıklar sizin için kolayca araştırıp çözüm bulabileceğiniz hale gelecektir. Şimdilik söylemek istediklerim bu kadar. Burada söylediklerim eğitimin devamında sizler için çok daha anlamlı hale gelecek ve ayrıca yeri geldikçe burada bahsettiklerimizi tekrar hatırlatıyor olacağım. 

Anlatımları buraya kadar takip etme sabrını gösterebildiyseniz, tüm eğitimi kolayca bitirebileceğinize olan inancım tam. Siz sabırlı okuyucuma saygılarımı sunarak, **aramıza hoş geldiniz** demekten mutluluk duyuyorum. 🤗
