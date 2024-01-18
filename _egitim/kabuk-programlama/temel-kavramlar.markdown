---
sitemap: true
layout: tutorial
title:  "Kabuk Programlamayı Öğrenmek ?"
modified: 2024-01-16
author: Taylan Özgür Bildik
coursetitle: "Temel Bash Kabuk Programlama Eğitimi"
excerpt: "Temel kavramlardan bahsederek, gerekli bilgi zemini oluşturuyoruz."
tags: [kabuk-programlama,]
categories: [kabuk-programlama]
tutorial: 1
cover: girizgah.webp
toc: true 
---


Bash kabuğunun detaylarına değinmeden evvel, sağlam bir temel için önemli olan birkaç kavramı netleştirmemiz gerekiyor. Tüm detayları ile olmasa da kullanacağımız sistemin arkaplanda nasıl çalıştığı ve nasıl bir yapıya sahip olduğu konusunda fikir sahibi olmamız, ileride yapacağımız tüm işlemleri çok daha bilinçli şekilde gerçekleştirebilmemizi sağlayacak. Eğer Linux konusunda temel bilgi düzeyine sahipseniz, buradaki anlatımları takip etmeniz son derece kolay olacaktır. Eğer ilk defa Linux ile tanışıyorsanız lütfen bash kabuk programlamadan önce, [buradan](https://www.linuxdersleri.net/temel-linux) temel Linux eğitim serisini tamamlayın.

Yani bash kabuk programlamayı öğrenmek istiyorsanız, daha öncesinde en azından temel düzeyde Linux bilginizin olduğundan emin olun lütfen. Bu eğitim serisini hazırlarken, tüm detayların net bir biçimde anlaşılması için daha önce [temel linux eğitiminde](https://www.linuxdersleri.net/temel-linux) ele aldığım pek çok konuyu tekrar ayrıca ele aldığımı fark ettim. Fakat bu tekrar, hem benim hem de daha önce temel linux eğitim serisini bitirmiş olan kişilerin vaktini boş yere çalmak anlamına geleceği için temel linux eğitiminde bahsettiğim tüm temel kavramları bildiğinizi varsayarak size bu seriyi sunuyor olacağım. Dolayısıyla lütfen [temel linux eğitim](https://www.linuxdersleri.net/temel-linux) serisini bitirmeden veya o seride bahsedilen tüm temel kavramları bildiğinizden emin olmadan bu bash kabuk programlama eğitimine devam etmeyin. Zira bu eğitim yalnızca pratik açıdan bash kabuğunu programlamamızı sağlayacak anlatımlar içeriyor olacak. 

## Kabuk

Grafiksel arayüze sahip uygulamaları hariç tuttuğumuzda kabuk, sistem yönetimi için olmazsa olmazdır. **Çünkü kabuk bize sistem üzerindeki tüm araçlar için ortak çalışma ortamı sağlıyor.** Biz kullanmak istediğimiz aracın ismini ve nasıl kullanmak istediğimizi kabuğa belirtiyoruz, kabuk da ilgili aracı sistem üzerinde bulup uygun şekilde çalıştırılmasını sağlıyor. Ayrıca kabuk kendi bünyesinde de pek çok kullanışlı aracı barındırıyor. 

Kısacası sisteme yazılı şekilde derdimizi anlatmak istediğimizde muhatabımız “**kabuk**“tur.

[Hatırlıyorsanız](https://www.linuxdersleri.net/egitim/temel-linux/linux-sistem-mimarisine-giris/index.html#konsol--terminal--komut-sat%C4%B1r%C4%B1), önceki anlatımlarımızda hangi “terminal/konsol” aracını kullandığımızın bir önemi olmadığını söylemiştik. Buna karşın kullandığınız kabuk yazılımının hangisi olduğu çok önemli bir detaydır. Çünkü Bash, zsh, csh, sh ve fish gibi pek çok farklı kabuk yazılımı bulunuyor. Kabuğun birden fazla alternatifinin olması belki sizi şaşırtmış olabilir. Ancak en nihayetinde kabuk dediğimiz yapı da aslında kullanıcı alanında çalışan bir yazılımdır. Dolayısıyla her yazılım gibi elbette kabuğun da pek çok alternatifi bulunuyor. Her ne kadar biz bu eğitimde en yaygın kullanıma sahip olan “bash” kabuğuna odaklanacak olsak da alternatif kabuklar ile karşılaşmanız da olasıdır.

Bash olarak bahsi geçen kabuk, atası olan sh kabuğunun, csh gibi farklı kabuklardan alınan iyi özellikler dahilinde geliştirilmesiyle ortaya çıkan bir kabuktur. Uzun süredir kararlı şekilde geliştirildiği için dağıtımların çok büyük bir kısmında varsayılan olarak bash kabuğu kullanılıyor. Ben de mevcut eğitim serisinde bash için kabuk programlamaya odaklanıyor olacağım. 

### Varsayılan Kabuğu Öğrenmek

Kabuğu tanıyarak programlamaya başlayabilmek için öncelikle mevcut sistemimizde hangi kabuk programının varsayılan olarak kullanıldığını kontrol edebiliriz. 

Varsayılan kabuk programını öğrenmek için konsola `echo $SHELL` komutunu girmeniz yeterli. Bu komutta yer alan `echo` ifadesi varsayılan kabuğun değerini tutan `SHELL` değişkenini konsola bastırmanızı sağlıyor.

```jsx
~ → echo $SHELL
/usr/bin/zsh
```

Bakın ben çıktı olarak **/usr/bin/zsh** ifadesini aldım. Aldığım bu çıktı benim mevcut kullanıcı hesabımdaki kabuğun **zsh** kabuğu olduğunu açıkça belirtiyor. Normalde pek çok köklü dağıtım varsayılan olarak bash kabuğunu kullanıyor olsa da benim şu an kullanmakta olduğum Kali Linux dağıtımı varsayılan olarak zsh kabuğunu kullanıyor. Fakat ben zsh kabuğunu üzerinden ilerlemek istemiyorum çünkü bash kabuğu hem bireysel hem de profesyonel anlamda çok daha yaygın kullanıma sahip olduğu için bash kabuğunu öğrenmek çok daha mantıklı bir yaklaşım.

Siz de `echo $SHELL` çıktısında hangi kabuğun ismini aldıysanız, şu anda o kabuğa komutlar veriyorsunuz. Eğer sizin hesabınızdaki varsayılan kabuk benimki gibi “zsh” veya farklı bir kabuksa hiç bir problem yok. Çünkü eğer isterseniz varsayılan kabuğunuzu “bash” olarak değiştirmeniz mümkün. Nitekim ben de zsh kabuğunu bash ile değiştireceğim. Sizin kabuğunuz da bash değilse, mevcut eğitimi sorunsuzca takip etmek için sizin de değiştirmeniz gerekiyor. Çünkü biz bu eğitimde bash kabuğunu kullanıyor olacağız.

Zaten Bash kabuk yazılımı, yaygın kullanımı sebebiyle istisnai durumlar hariç hemen her dağıtımda yüklü şekilde geliyor, ancak varsayılan kabuk olarak tanımlanmamış olabiliyor. Gerekliğinde bash kabuğunu kullanmak için tek yapmanız gereken sizin kullanıcı hesabınız için varsayılan olarak tanımlamaktır.

### Bash Kabuğunu Varsayılan Olarak Ayarlamak

Kabuğu Bash’ten farklı olan kullanıcılar için kabuk değişimini ele alacağız ancak halihazırda kabuğu bash olanlar da dahil herkesin buradaki anlatımları takip etmesini rica ediyorum. Çünkü ileride varsayılan kabuğun farklı olduğu bir sistemle karşılaşabilirsiniz. Yani burada öğreneceğiniz kabuk değiştirme yöntemi mutlaka yeri geldiğinde işinize yarayacak.

Öncelikle mevcut sistemimizde bash kabuk yazılımının **hangi konumda olduğunu** öğrenmek üzere konsola `which bash` komutunu girmemiz gerekiyor.

```jsx
~ → which bash
/usr/bin/bash
```

Bu almış olduğumuz çıktı bash kabuğunun sistem üzerindeki tam konumunu gösteriyor. Bu konumu kopyalayın çünkü birazdan lazım olacak.

Bash kabuğunu kendi kullanıcı hesabımın varsayılan kabuğu olarak tanımlamak için, kabuk bilgisi de dahil sistem üzerindeki tüm kullanıcılara ait çeşitli bilgilerini tutan ***/etc/passwd*** dosyasını açmam gerekiyor. Bu dosyayı açmak ve düzenlemek için nano metin editörünü kullanabiliriz. Bu dosya yalnızca yetkili kişilerce açılıp düzenlenebileceği için komutun başına `sudo` komutunu da eklemeliyiz. Yani `sudo nano /etc/ passwd` komutunu girmemiz gerekiyor. Yetki gerektiren bir işlem yaptığımız için bu komutun ardından, mevcut kullanıcı hesabımızın parolasını girip <kbd>enter</kbd> ile onaylamamız gerek.

```jsx
┌──(taylan@linuxdersleri)-[~]
└─$ sudo nano /etc/passwd
[sudo] password for taylan:BURAYA PAROLANIZI GİRMENİZ GEREK
```

Şimdi açılmış olan ***passwd*** dosyasında kendi kullanıcı adımızın geçtiği satırı bulmamız gerek. Dosya içeriğinde gezinmek için klavyemizdeki aşağı yukarı yön tuşlarını kullanabiliriz. Benim kullanıcı adım “taylan” olduğu için “taylan” olan satırı buluyorum. Siz de hangi kullanıcının kabuğunu değiştirmek istiyorsanız o kullanıcının satırını bulmanız gerekiyor. Yani kendi hesabınızı düzenliyorsanız kendi kullanıcı adınızı içeren satırı buradan bulmanız gerekiyor.

![]({{ site.url }}/egitim/temel-linux/sistem/14.webp){:class="responsive img-zoomable"}

Bakın burada kullanıcı adımın geçtiği satırın sonunda gördüğünüz gibi benim kullanıcı hesabım için tanımlı olan kabuk programının dosya konumu belirtilmiş. Benim kabuğum zsh olduğu için bu kabuğun dosya konumu yazıyor ancak sizde hangi kabuk programı varsa burada o kabuk programının dizin adresi olacaktır. Örneğin sizin hesabınız için burada “sh” ya da “fish” kabuklarının dosya konumları bulunuyor olabilir. Kabuğu değiştirmek için tek yapmamız gereken, hangi kabuğu kullanacaksanız o kabuğun dosya konumunu tam olarak buraya yazmak.

Ben bash kabuğunu varsayılan kabuğum yapmak için daha önce `which bash` komutu sayesinde öğrenmiş olduğum bash kabuk programının tam dosya konumunu zsh yerine ekliyorum.

![]({{ site.url }}/egitim/temel-linux/sistem/15.webp){:class="responsive img-zoomable"}

Dosyadaki değişikliği kaydedip nano aracından çıkmak için <kbd>Ctrl</kbd> + <kbd>X</kbd> kısayolunu kullanıp “*değişiklik kaydedilsin mi*” sorusuna da “*yes*” yani kısaca <kbd>Y</kbd> tuşlaması ile onay vermemiz gerek.

Böylelikle kendi kullanıcı hesabımız için varsayılan kabuğu bash olarak değiştirmiş oluyoruz. Ancak bu değişiklik biz tekrar oturum açtığımızda geçerli olacak. Çünkü bu dosya, biz oturum açarken okunuyor. Örneğin ben “taylan” kullanıcısı olarak giriş yaptığımda, bu dosyadaki “taylan” satırı bulunup varsayılan kabuğun hangi olduğu öğreniliyor. Şimdi yapmış olduğunuz değişikliğin geçerli olabilmesi için oturumumuzu kapatıp tekrar açmanız yeterli. Oturumu nasıl kapatacağınızı bilmiyorsanız, genellikle grafiksel arayüzde sağ üst köşede oturum kapatma seçeneği olur biraz kurcalarsanız bulabilirsiniz. Tekrar oturum açtıktan sonra değişikliğin geçerliliği teyit etmek için tek yapmanız gereken tekrar `echo $SHELL` komutunu girmek.

![]({{ site.url }}/egitim/temel-linux/sistem/16.gif){:class="responsive img-zoomable"}

```jsx
┌──(taylan@linuxdersleri)-[~]
└─$ echo $SHELL
/usr/bin/bash
```

Aldığım bu çıktı, varsayılan kabuk programının benim kullanıcı hesabım için bash olarak değiştiğini kanıtlıyor.

İşte sizler de bu şekilde istediğiniz kullanıcı hesabının varsayılan kabuğunu ***/etc/passwd*** dosyasından değiştirebilirsiniz. ***/etc/passwd*** dosyası, sisteme erişimi olan tüm kullanıcıların kaydını tutmak için var. 

Ayrıca kabukla ilgili anlatımları noktalamadan önce, özellikle neden bash kabuğunu kullandığımızdan da bahsedelim istiyorum. Ancak bash kabuğunu neden tercih ettiğimizi ele almadan önce kabuk denilen yapının daha net anlaşılabilmesi için birkaç kavramdan daha bahsetmemiz gerekiyor.

## Kabuğa Girilebilecek Komut Türleri

Temelde bizler kabuğa iki tür komut girebiliyoruz. Bu türler “**dahili**” ve “**harici**” olarak gruplanmış olan komutlardır.

### Dahili Komutlar(Built-ins)

Dahili komutlar, kabuk programında yerleşik olan araçları çalıştırmak üzere kullanılan komutlardır. Bash üzerinde yer alan tüm dahili komutları görmek için `compgen -b` komutunu kullanabiliriz.

```jsx
┌──(taylan㉿linuxdersleri)-[~]
└─$ compgen -b
.
:
[
alias
bg
bind
break
builtin
caller
cd
command
compgen
complete
compopt
continue
declare
dirs
disown
echo
enable
eval
exec
exit
export
false
fc
fg
getopts
hash
help
history
jobs
kill
let
local
logout
mapfile
popd
printf
pushd
pwd
read
readarray
readonly
return
set
shift
shopt
source
suspend
test
times
trap
true
type
typeset
ulimit
umask
unalias
unset
wait
```

Bakın burada listelenmiş olan tüm komutlar, bash kabuğu içerisinde dahili olarak bulunan araçları temsil eden komutlardır. Yani hangi sistemde çalışırsanız çalışın, bash kabuğunu kullanıyorsanız bu listedeki araçları da kullanabilirsiniz.

### Harici Komutlar(External)

Harici komutlar ise, mevcut sistem üzerinde yüklü bulunan araçları çalıştırmamızı sağlayan komutlardır. Tabii ki bu tür komutlar harici olan araçları temsil eden komutlar olduğu için kullanmakta olduğunuz sisteme göre harici komutlar değişiklik gösterir. Örneğin siz komut satırı üzerinden metinleri düzenleyebilmenizi sağlayacak olan `nano` aracını çalıştırmak üzere kabuğa aracın ismini girdiğinizde **eğer araç sistemde yüklü ise açılır**. Eğer yüklü değilse “komut yok” hatası alırsınız. İşte burada girdiğiniz `nano` komutu harici bir komut olarak kabul ediliyor. Çünkü nano aracı bash kabuğunun içinde yüklü gelen bir araç değil, nano aracı harici olarak sisteme yüklenmiş olan bir metin editörü yazılımıdır.

Dahili ve harici komutlar arasındaki fark oldukça net gördüğünüz gibi. Dahili komutlar genelde temel sistem yönetimi için kullanılan en temel araçları temsil eden komutlardır. Bu sayede bash kabuğunun olduğu her yerden temel sistem yönetimi görevini yerine getirebiliyoruz. Örneğin sistemimiz çöktüğünde, sistemi kurtarma gibi işlemler için kabuğun dahili komutlarından faydalanabiliyoruz. Ayrıca bu dahili komutlar sayesinde kabuğu programlamamız da mümkün oluyor.

Dolayısıyla kabuk programlama yaparken, bash kabuğunun en temel kabuk becerilerine ek olarak ihtiyaçlarımıza göre harici araçları da kullanıyor olacağız. Neticede birtakım işleri otomatize etmek istediğimiz için, bu işleri yerine getirebilecek araçları yani harici yazılımları da kabuk programına dahil etmemiz gerekecek.

Dahili komutların aslında en temel işlevleri yerine getiren birtakım araçlar olduğundan bahsettiğimiz için, bu dahili komutların tüm kabuklarda ortak olarak bulunup bulunmadığı sorusu aklınıza gelmiş olabilir. Yani madem en temel araçlar kabuk içerisinde dahili komut olarak bulunuyor, bunlar tüm kabuklarda ortak olmalı değil mi ?

Tüm kabuklardaki tüm dahili komutlar birebir aynı olmasa da evet, alternatif kabuklarda da aşağı yukarı benzer dahili komutlar yer alıyor. Araçların isimleri veya kullanış biçimleri kabuktan kabuğa göre biraz farklılık gösterse de aslında tüm kabuklarda aşağı yukarı temel olarak benzer olan pek çok dahili komut bulunuyor. Yani aslında bash kabuğunu ve sistemin temel işleyişini öğrendiğinizde, gerektiğinde alternatif kabukların dahili komutlarını da kısa sürede öğrenip kolayca kullanabilirsiniz. Zaten harici komutlar yani sistemde yüklü bulunan araçları çalıştırmak için kullanılan komutlar tüm kabuklarda aynıdır. Örneğin sistemde nano aracı yüklü ise, `nano` komutunu girdiğimizde kabuk zsh da olsa bash de olsa nano aracı bulunup açılır çünkü bu araç sistemde yüklüdür.

Dolayısıyla bu eğitimin bash kabuğu üzerinden işleniyor olması sizleri kısıtlamıyor. Bash kabuğu dünya çapında en yaygın kullanıma sahip kabuktur. Zaten bu sebeple alternatif kabuklara oranla bash kabuğuyla çok daha sık karşılıyor olacaksınız. Ayrıca istisnalar hariç, bir sistemde bash kabuğu varsayılan kabuk değilse bile, sistemde yüklü olacağı için daha önce ele aldığımız şekilde varsayılan kabuk olarak nasıl ayarlayabileceğinizi biliyorsunuz.

Anlatımların tam da bu noktasında, madem bash kabuğu en yaygın kullanıma sahip kabuk neden tüm dağıtımlar varsayılan olarak bash kabuğunu kullanmıyor diye düşünmüş olabilirsiniz.

## Bash Neden Varsayılan Kabuk Değil ?

Çoğu zaman lisans veya etkileşimli kullanımda kolaylık gibi unsurlar, dağıtımların varsayılan olarak kullandığı kabukların farklı olmasına neden olabiliyor. Dağıtım özelinde neden bash değil de farklı bir kabuk tercih edildiğini, kullandığınız dağıtımın resmi dokümantasyonlarından kolayca öğrenebilirsiniz. Zira bu durum tek bir sebebi olmayabilir.

Örneğin MacOS lisans koşulları uymadığı için bash kabuğunun güncel sürümünü kullanamıyordu. Mac, sisteminde yüklü gelen bash kabuk sürümü çok eski kalmaya başlayınca da lisans koşulları elverişli olan zsh kabuğuna geçiş yapıldı. Bunun dışında Kali Linux dağıtımı de etkileşimli kullanımda kolay olduğu ve bash kabuğuna oranla daha fazla özelleştirme imkanı tanıdığı için zsh kabuğunu varsayılan kabuk olarak kullanmaya başladı. İşte tıpkı bu örnekler üzerinde olduğu gibi bash kabuğunun tercih edilmediği dağıtımlar ile karşılaşmanız mümkün. Yine de sizlerin de bildiği üzere aslında kullandığınız dağıtımın varsayılan kabuğunun hangisi olduğu çok da önemli değil. Zaten pek çok dağıtımda bash kabuğu ayrıca yüklü olacağı veya kendiniz kolayca yükleyebileceğiniz için tüm bu sistemlerde de bash kabuğuna rahatlıkla erişebilirsiniz.

Benim tüm eğitim boyunca bash kabuğu üzerinden ilerleyecek olma nedenim, daha yaygın kullanıma sahip olması. Yaygın kullanıma sahip bash kabuğunu öğrendiğinizde daha evrensel bir kabuğu öğrenmiş olacaksınız. Özellikle kabuk programlama konusunda geçmişten günümüze bash kabuğu en sık tercih edilen kabuk olduğu için pek çok sistemde geriye dönük uyumlulukları bozmamak için bash kabuğu kullanılmaya devam ediliyor. Dolayısıyla bash kabuğunu öğrenmek ve kullanmak hem kişisel hem de profesyonel anlamada çok mantıklı bir tercih.

Bu noktada metaforik olarak Bash kabuğunu, kabuk dillerinin İngilizcesi olarak düşünebilirsiniz. Dünyada en yaygın konuşulan dilini öğrenmenin avantajları, bash kabuğu için de kabuk dilleri bağlamında aynen geçerlidir. Özellikle kişiselden ziyade profesyonel alanda bash kabuğu alternatiflerine oranla yaygın kullanıma sahip. Zaten ileride bash kabuğunun neden tercih edildiğini bizzat kendiniz de fark edeceksiniz.

Eğer söz konusu olan "etkileşimli kullanımda kolaylık" ise, zsh yerine fish(friendly interactive shell) kabuğu da tercih konusu olabilir. Ama bizim odaklandığımız şey etkileşimli kullanım değil, evrensel olan bash kabuğunu programlayabilmektir. Özetle; yaygınlığı, kararlı ve kolay programlanabilir yapısı dolayısı ile kabuk dilleri içinde "Bash" bizim "İngilizce" dilimizdir.

Biraz önce bahsettiğimiz "**etkileşimli**" ve "**programlanabilir**" ifadelerini kısaca açıklayacak olursak;

**Kabuğun etkileşimli olması demek**, anlık olarak kullanıcıdan gelen emirleri yorumlayıp yine kullanıcıya emirin sonucu sunmasıdır. Etkileşimli kabuklar sürekli kullanıcıdan emirler bekler yani kullanıcı ile sürekli etkileşim halindedirler. Daha önce de bahsettiğimiz şekilde farklı kabuk türlerinde bu etkileşim deneyimi de farklıdır. Kabuklar, renklendirme ve otomatik öneri ya da otomatik tamamlama gibi kullanımı kolaylaştırıcı çeşitli özelliklere sahiptir. Kimi kabukta etkileşim için sunulan özellikler fazlayken kimisinde bu gibi özellikler azdır veya hiç yoktur. Bu da kabuklar arasındaki "etkileşimde kolaylık" farklılığını oluşturan unsudur.

Örneğin ben sırasıyla konsola `pwd` ve `whoami` komutlarını girdiğimde, çıktı olarak bulunduğum dizin ve oturum açtığım kullanıcı hesabını aldığımda kabuk ile etkileşime geçmiş oluyorum. 

```jsx
┌──(taylan㉿linuxdersleri)-[~]
└─$ pwd                                                                          
/home/taylan

┌──(taylan㉿linuxdersleri)-[~]
└─$ whoami                                                                       
taylan

┌──(taylan㉿linuxdersleri)-[~]
└─$
```

Çünkü kabuk benden komut bekleyip benden aldığı komutları sırasıyla yorumlayıp sonuçlarını tekrar bana iletmiş oldu.

**Programlanabilir olması ise**, kabuğa verilebilecek olan emirlerin bir dosya içerisinde uygun şekilde toparlanması ve bu dosyanın çalıştırılması ile emirlerin yerine getirildiği kullanımdır. Bu kullanımda, aktif kullanıcı etkileşimi şart değildir. Çünkü emirler önceden programlandığı şekilde dosyadan okunarak otomatik olarak yerine getirilir.

Örneğin daha önce verdiğimiz örnekteki `pwd` ve `whoami` komutlarını bir dosyaya kaydedip dosyayı çalıştırırsak; tek seferde iki komutta çalıştırılmış olacak. Yani bu durumda kabuk, dosyayı okuyup çalıştırırken benden bir etkileşim beklemeden doğrudan işini yapıyor. İşte çok daha düzenli yapılar ile komutları bir dosyaya kaydedip tek sefer çalıştığımızda kabuğu programlamış oluyoruz. Kabuğun programlanabilmesi de otomatikleştirilebilir her türlü rutin işimizi inanılmaz kolaylaştırıyor. Otomatikleştirmeden bahsettiğimde, benim dosyayı elle çalıştırmama takılmış olabilirsiniz. Aslında dosyayı elle çalıştırmamıza da gerek yok. Zamanlanmış görevler gibi yapılar sayesinde otomatik olarak çalıştırılmasını da sağlayabiliriz. 

Bizler de bu eğitim serisinde bash kabuk dilini **nasıl programlayabileceğimiz** üzerinde duruyor olacağız. Burada bahsi geçen "kabuk dilinin programlanması" bash özelinde "**bash shell scripting**" olarak geçiyor. Bu tanımı Türkçe olarak "**bash kabuk senaryolaştırması**" olarak da ifade edebiliriz. Buradaki "**senaryolaştırma**" ifadesi biraz garip bir tanım olsa da aslında yapacağımız işi gayet iyi özetliyor. Zira programlama yaparken aslında durumlara özel senaryolar yazacağımız ve kabuk da bu senaryoya uygun hareket edeceği için "**programlama**" yerine "**senaryolaştırma**" ifadesi de doğru bir çağrışım yapabilir. Tüm bu kavram açıklamalarına ek olarak "**shell script**" ifadesi Türkçe kısaca "**betik"** olarak da tabir edilebiliyor. Programlama işlemine "**betik programlama"**, oluşturacağımız "**script dosyalarına**" da kısaca "**betik**" denebiliyor yani. Aslında nasıl isimlendirildiğinin çok da bir önemi yok. Sadece ileride farklı isimler ile duyduğunuz zaman şaşırmamanız için kısaca bahsetmek istedim.

Lafı daha fazla uzatmak istemiyorum ancak lütfen bu eğitimin bash kabuğu üzerinden ele alındığının farkında olarak **eğitimi bash kabuğu üzerinden takip edin**. Eğer kullandığınız sistemde bash kabuğu varsayılan olarak kullanılan kabuk değilse lütfen varsayılan olarak ayarlayın. Aksi halde eğitimi takip etme noktasında sorun yaşamanız kaçınılmaz olur.

## Kullanılan Bash Sürümü ve Yeniliklerin Takibi

Elbette zaman içinde bash kabuğunda yenilikler olacaktır. Yani burada ele alınan sürüm sizin okuduğunuz dönemde eskimiş olabilir. Hatta siz kasıtlı olarak bu seride ele alınandan daha eski bir bash kabuğunu da kullanıyor olabilirsiniz. Peki bu durumda bu serideki bilgiler, ele alındığı(bash v5.2.15(1)) sürüm haricinde hükümsüz mü ? 

Kesinlikle hayır. Sürümler arasındaki farklılıklar genellikle mevcut hataların düzeltilmesi veya yeni alternatif çözümlerin(özellikler ve araçlar) sunulması şeklindedir. Güncellemeler eski sürümdeki yapıları değiştirmekten kaçınır çünkü halihazırda yazılmış olan betiklerin yeni sürümlerde çalışmaz hale gelme ihtimali vardır. Herhangi bir nedenle mevcut bir aracın ya da özelliğin temel çalışmasını etkileyecek şekilde değiştirilmesi gerekirse, mevcut olanı değiştirmek yerine değişikliği içeren yeni bir araç ya da özellik sunulur. Bu sayede eski özellikler ve araçlar yeni sürümlerde de kullanılabilir olurken, yeni ihtiyaçlara cevap verebilen yeni araçlar ve özellikler de sunulmuş olur. En nihayetinde kabuk üzerindeki değişikler, var olanı bozmadan yeni çözümler sunmak için yapılır. Yani kabuk güncellemeleri geriye dönük uyumluluk içerisindedir. 

Bu sebeplerle kullanmakta olduğunuz bash sürümü hangisi olursa olsun, sürümler arasındaki farklılıkları görmek adına geliştiricilerin sunduğu "değişim notlarına" kısaca göz atmanız yeterlidir. Değişim notlarına göz attığınızda, genellikle mevcut özelliklerin iyileştirilmesi ya da alternatif olarak aynı işi kolaylaştırıcı özelliklerin getirildiğini teyit edebilirsiniz.  Sadece kısa bir internet araştırması ile bash kabuğunun sürümleri arasındaki tüm değişimlerin detaylı listesine kolaylıkla ulaşabilirsiniz. 

<p class="mavi"><strong>ℹ️ Not:</strong> Eğer buradaki anlatımlar size sıkıcı veya gereksiz gibi geldiyse lütfen biraz daha sabırlı olun. Çünkü bu bölüm ve bir sonraki bölüm aslında tüm eğitim boyunca bahsedeceğimiz tüm konu ve kavramların temelini oluşturuyor. Temeli sağlam atamazsak üzerine inşa edeceğimiz her şey dayanaksız olur. O yüzden lütfen sabırlı olun ve yalnızca tamamlamış olmak için bu bölümleri geçmeyin. Bunun size hiç bir faydası olmaz. Gerekiyorsa bölümü baştan sonra tekrar edin veya ara verip başka zaman devam edin ancak lütfen buradaki temel bilgileri anlayarak eğitime devam edin.<p>