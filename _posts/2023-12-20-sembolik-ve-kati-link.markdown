---
sitemap: true
layout: b-post
title:  "Sembolik ve Katı Linkler | inode"
modified:
author: Taylan Özgür Bildik
tags: [inode]
categories: blog 
cover: inode-soft-hard-link.webp
permalink: /:title
toc: true
---

Anlatımın devamında çok kısaca sembolik ve katı linklerden de bahsetmek istiyorum.

Fakat sembolik ve katı linklerden bahsetmeden önce, link yapısını yani aslında buradaki link ifadesinden kastımızı anlamak için öncelikle "inode" kavramı üzerinde durmamız gerekiyor. Merak etmeyin çok ayrıntıya girmeyeceğiz.

## inode

Dosya sistemindeki veriler depolama birimlerimizde yani diskte bloklar halinde tutuluyorlar. Dosyalarla ilişkili olan verilerin hangi bloklarda olduğunun bilgisini de bizlere “**i**ndex **node**” yani kısaca “**inode**” olarak isimlendirilen yapı haber veriyor.

Örneğin ben ***metin.txt*** isimli bir dosyanın içerisine “merhabalar” yazıp kaydettiğimde, “merhabalar“ ifadesi diskte belirli bir bloğa kaydediliyor. Ve bu verinin disk üzerinde tam olarak bulunduğu bloğun veya blokların bilgisi de **inode** olarak isimlendirilen benzersiz sayısal bir değere atanıyor. ***metin.txt*** dosyası ise bu **inode** değerine link olarak bağlanıyor. Bu sayede biz ***metin.txt*** dosyasının içeriğini okumak istediğimizde aslında arkaplanda ***metin.txt*** dosyasının bağlı olduğu **inode** değerine bakılıyor. **inode** değerinin disk üzerinde işaret ettiği bloklardan da bu veriler getiriliyor. Neticede biz metin.txt ismiyle ilişkili olan "merhabalar" verisine disk üzerinde kaydedildiği yerden tekrar ulaşmış oluyoruz. 

![inode.webp]({{ site.url }}/egitim/temel-linux/metin/inode.webp){:class="responsive img-zoomable"}

Yani aslında buradaki ***metin.txt*** dosyası yalnızca benzersiz bir **inode** değerine bağlı olan **linktir**. **inode** değeri de ilgili verinin diskteki yerini bildiği için ***metin.txt*** linki üzerinden bu veriye ulaşabiliyoruz.

İşte tıpkı bu örneğimizde olduğu gibi dosya sistemindeki benzersiz olan her bir dosya ve klasörün de benzersiz bir inode değeri bulunuyor. Bizim gördüğümüz dosya ve klasör isimleri de yalnızca bu inode değerlerine yönlendirme yapan linkler aslında. Dosya veya klasör isminden inode değerine, inode değerleri üzerinden de disk üzerinde depolanmış olan verilere kolayca erişebiliyoruz. Buradaki linkler yalnızca biz insanların disk üzerindeki verilere kolay erişebilmesi için okunaklı isimlerden oluşan bağlantı noktaları aslında. Yani diskteki “xx yy zz” bloklarındaki verileri okumak istiyorum demek yerine, “metin.txt” dosyasını okumak istiyorum demek bizim için çok daha kolay olduğu için dosya ve klasör isimleri yalnızca birer linktir. 

Tamam temel seviye için "inode" ve "link" kavramı hakkında bu kadarlık bilgi yeterli.

Şimdi esas konumuz olan link kavramına odaklanacak olursak, Linux üzerinde **sembolik** ve **katı** olmak üzere iki link çeşidi bulunuyor. Gelin öncelikle sembolik linkten bahsederek başlayalım.

## Sembolik Link | Soft Link

Ben "**sembolik link**" diyor olacağım ancak farklı kaynaklarda “**soft link**” olarak ifade edildiğini de görebilirsiniz. Sembolik linkleri, Windows sisteminden de alışık olduğumuz sıradan kısayollara benzetebiliriz. Sembolik linklerin görevleri yalnızca orijinal içeriğe yönlendirme yapmaktır.

Daha anlaşılır olması için gerçek bir örnek üzerinden devam edebilmek adına öncelikle nasıl sembolik link oluşturabileceğimizi öğrenelim.

Link oluşturmak için “**l**i**n**k” ifadesinin kısaltmasından gelen `ln` komutunu kullanıyoruz. Sembolik link oluşturmak için de “**s**ymbolic” ifadesinin kısalması olan `s` seçeneğini kullanmamız gerekiyor.

Ben test ortamı hazırlamak için öncelikle kendi ev dizinimde `mkdir linkler` komutuyla “***linkler***” isimli bir klasör oluşturup, `echo “deneme” > ~/linkler/metin` komutuyla, bu dizin altında “***metin***” isimli dosyaya “deneme” ifadesini ekliyorum. 

```bash
└─$ mkdir linkler

┌──(taylan@linuxdersleri)-[~]
└─$ echo "deneme" > ~/linkler/metin

┌──(taylan@linuxdersleri)-[~]
└─$ cat ~/linkler/metin                                            
deneme
```

Test ortamımız hazır. Şimdi bu dosyanın sembolik linkini oluşturmayı deneyelim.

Sembolik link oluştururken dosya ve klasörlerin tam dosya dizin adreslerini mutlaka belirtmemiz gerekiyor. Çünkü sembolik dosyaları sistem üzerinde herhangi bir dosya konumunda kullanabiliriz. **Tam dizin adresini belirtmezsek doğru şekilde çalışmaz.** Örneğin ben tam dizin adresi yerine göreceli yolu belirterek yeni bir sembolik link oluşturmak ve bu linki başka bir konuma taşımak istiyorum.

```bash
└─$ ln -s linkler/metin sembolik_metin2

└─$ mv sembolik_metin2 Documents/                                             

└─$ cat Documents/sembolik_metin2                                             
cat: Documents/sembolik_metin2: No such file or directory
```

Gördüğünüz gibi orijinal dosyanın tam dizin adresini belirtmediğim için sembolik link dosyasının konumunu değiştirdiğimde bu dosya göreli yola göre orijinal dosyayı aradığı için bu dosya bulunamadı. **Dolayısıyla link belirtirken tam dizin adresini girmeniz şart!**

Ben bu dizindeki dosyanın sembolik linkini mevcut bulunduğum dizinde oluşturmak için `ln -s ~/linkler/metin sembolik_metin` şeklinde komutumu giriyorum. Teyit etmek için `ls -l sembolik_metin`  komutuyla listeleyelim. 

```bash
└─$ ln -s ~/linkler/metin sembolik_metin

└─$ ls -l sembolik_metin 
lrwxrwxrwx 1 taylan taylan 13 Jun 26 04:07 sembolik_metin -> /home/taylan/linkler/metin
```

Bakın burada ***sembolik_metin*** dosyasının oluşturulduğunu görebiliyorum. Ayrıca çıktılara dikkatlice bakacak olursanız, ok işaretinin orijinal dosyaya referans verdiğini görebilirsiniz. Buradaki çıktının anlamı “***sembolik_metin***" isimli dosyanın “***metin***" dosyasının sembolik bir bağlantısı olduğu. Bunlar dışında çıktıların en solunda yani dosya türünün belirtildiği bölümde “**l**” karakteri bulunuyor. Buradaki “**l**” ifadesi “sembolik link” anlamına geliyor. Dolayısıyla her iki şekilde de başarılı şekilde sembolik linkimizi üretmeyi başardığımızı teyit etmiş olduk.

Hemen sembolik linkin nasıl bir işlevi olduğunu görmek için birkaç basit örnek yapalım. Öncelikle oluşturduğumuz sembolik link üzerinden orijinal dosyanın içeriğini okumayı deneyebiliriz. Ben bunun için `cat sembolik-metin` şeklinde komutumu giriyorum. 

```bash
└─$ cat sembolik_metin 
deneme
```

Bakın konsola “deneme” ifadesi bastırıldı. Yani sembolik link üzerinden orijinal dosyamızın içeriğine ulaşmış olduk.

Şimdi orijinal dosyaya yeni veri ekleyerek bu durumu tekrar test edelim. 

```bash
└─$ echo "yeni" >> ~/linkler/metin 

└─$ cat sembolik_metin 
deneme
yeni
```

Bakın orijinal dosyadaki değişikliğe bu dosya üzerinden de erişebiliyoruz. Neticede sembolik linkler aslında orijinal dosyaların kısayolları görevinde olduğu için tek yaptığı orijinal dosyaya yönlendirme yapmak. Dolayısıyla orijinal dosya içeriğindeki değişikliklere sembolik link dosyaları üzerinden de aynen ulaşabiliyoruz.

Şimdi tersini deneyelim. Yani sembolik dosyanın üzerine yeni veri ekleyip orijinal dosyaya etki edip etmeyeceğini görelim. Ben yeni veri eklemek üzere `echo “sembolik ekleme” >> sembolik-metin` şeklinde komutumu giriyorum. 

```bash
└─$ echo "sembolik ekleme" >> sembolik_metin 

└─$ cat sembolik_metin                                           
deneme
yeni
sembolik ekleme

└─$ cat linkler/metin                                            
deneme
yeni
sembolik ekleme
```

Bakın sembolik bağlantıdaki değişiklik orijinal dosyada da geçerli olmuş. Peki ama nasıl ?

Biz burada bu dosyaya veri eklemek üzere komutumuzu girdiğimizde, bu sembolik linke yönlendirmiş olduğumuz veriler orijinal dosyaya yönlendirilip, bu dosya üzerinden diskteki verilere ekleme yapılması sağlanıyor. Bu sayede tıpkı orijinal dosya üzerinden ekleme yapmışız gibi değişiklikler geçerli oluyor.

![soft-link.webp]({{ site.url }}/egitim/temel-linux/metin/soft-link.webp){:class="responsive img-zoomable"}

Yani bizzat teyit ettiğimiz gibi sembolik bağlantılar aslında orijinal dosyaya yönlendirme yapan kısayol dosyaları. Bu sebeple örneğin orijinal dosya silinirse, sembolik linkler üzerinden diskteki verilere ulaşmamız mümkün olmuyor. Çünkü dediğimiz gibi sembolik linkler yalnızca orijinal dosyaya yönlendirme yapıyor, bu orijinal dosya da zaten disk üzerindeki verilere ulaşmamızı sağlayan bir bağlantı. Eğer bu bağlantı kesilirse, diskteki veriler silinmemiş olsa bile o verilere ulaşmamız mümkün olmuyor. 

![soft-link-hard-link-deleted.webp]({{ site.url }}/egitim/temel-linux/metin/soft-link-hard-link-deleted.webp){:class="responsive img-zoomable"}

Zaten biz standart şekilde dosya sildiğimizde arkaplanda yalnızca diskteki o verilere giden bu bağlantı adresi silinmiş oluyor. Yani diskte veriler mevcut olsa da o verilere ulaşmamızı sağlayan bağlantıyı kaybettiğimiz için ulaşamıyoruz. Bu sebeple standart şekilde silinen ve üzerine veri yazılamayan verilerin diskten kurtarılması mümkün oluyor.

Teorik olarak açıkladık. Şimdi bu durumu bizzat deneyimlemek için orijinal dosya olan “***linkler***” klasörü içerisindeki “***metin***” dosyasını silmek üzere `rm linkler/metin` şeklinde komutumuzu girip, `cat` komutu ile sembolik link dosyasını okumayı deneyebiliriz. 

```bash
└─$ rm linkler/metin                                             

┌──(taylan@linuxdersleri)-[~]
└─$ cat sembolik_metin                                           
cat: sembolik_metin: No such file or directory
```

Bakın böyle bir dosya veya dizin yok hatası alıyoruz. `ls -l` komutu ile listeleyelim. 

![soft-link-deleted.webp]({{ site.url }}/egitim/temel-linux/metin/soft-link-deleted.webp){:class="responsive img-zoomable"}

Bakın sembolik link dosyası gözüküyor ama orijinal dosya silindiği için bu sembolik link kırmızı renkle listelenmiş oldu. Zaten sembolik link bizi bu dosyaya yönlendirdiği, ama bu dizinde böyle bir dosya olmadığı için bu hatayı aldık.

Yani benim `cat sembolik-metin` komutunu girmemle, `cat linkler/metin` komutunu girmem aynı şey. 

```bash
└─$ cat sembolik_metin                                                      
cat: sembolik_metin: No such file or directory

└─$ cat linkler/metin
cat: linkler/metin: No such file or directory
```

Bakın yine böyle bir dosya ve dizin yok şeklinde `cat` komutu bize hata döndürdü. İşte gördüğünüz gibi sembolik linkler yalnızca orijinal dosyalara yani aslında orijinal linklere yönlendirme yapan kısayollardır. Orijinal bağlantılar olmazsa, disk üzerindeki verilere ulaşmamız mümkün olmuyor.

### Klasörler için Sembolik Link

Aynı şekilde klasörler için de sembolik linkeler oluşturabilirsiniz. Ben denemek için `ln -s linkler linkler-sembolik` komutu ile yeni sembolik klasörümü oluşturmak istiyorum.

```bash
└─$ ln -s ~/linkler/ linkler-sembolik                                           

└─$ ls -l linkler-sembolik
lrwxrwxrwx 1 taylan taylan 8 Jun 26 04:38 linkler-sembolik -> /home/taylan/linkler/
```

Bakın tıpkı sembolik dosyada olduğu gibi sembolik klasör de bağlı olduğu klasöre yönlendirme yapıyor. Sembolik klasörler de tıpkı dosyalar gibi yalnızca orijinal klasöre yönlendirme yaptığı için orijinal klasör silinirse sembolik link çalışmaz.

Denemek için `echo “deneme” > linkler-sembolik/metin` şeklinde komutumuzu girebiliriz. 

```bash
└─$ echo "deneme" > linkler-sembolik/metin

└─$ ls linkler-sembolik                                                       
metin

└─$ ls linkler
metin
```

Yukarıdaki çıktılara bakacak olursanız, sembolik klasöre yönlendirmiş olduğum dosyanın orijinal klasöre kaydolduğunu görebilirsiniz. Yani tıpkı dosyalar olduğu gibi sembolik klasörler de orijinal klasöre yönlendirme yapan kısayollar aslında. 

Ben örnekler sırasında birer tane sembolik dosya ve klasör oluşturdum. Ancak istiyorsanız tek bir dosya veya klasör için birden fazla sembolik link de oluşturabilirsiniz. Zaten sembolik linkler kısayol görevinde olduğu için kısayol yapısına ihtiyaç duyulan her yerde kullanılabilir. Örneğin sık kullandığınız bir dizin veya dosya için masaüstünüzde bir sembolik bağlantı oluşturabilirsiniz. 

### Sembolik Linkleri Silmek

Sembolik link dosyalarını silmek için de doğrudan silmek istediğiniz sembolik link dosyasının ismini `rm` komutuna argüman olarak verebilirsiniz. 

```bash
└─$ rm sembolik_metin 

└─$ ls -l sembolik-metin
ls: cannot access 'sembolik-metin': No such file or directory

└─$ rm -d linkler-sembolik

└─$ ls -l linkler-sembolik                                                    
ls: cannot access 'linkler-sembolik': No such file or directory
```

Gördüğünüz gibi sembolik dosya ve klasörleri standart şekilde silmiş olduk.

## Katı Link

Şimdi katı linklerden bahsedecek olursak. Sembolik linklere “soft link” denilmesi gibi, katı linklere de “hard link” denebiliyor. Katı link oluşturmak için doğrudan `ln` komutunu seçenek belirtmeden kullanabiliyoruz.

Ben denemek için yine `echo “orijinal dosyayım” > linkler/metin` şeklinde komutumu giriyorum.

```bash
└─$ echo "orijinal dosyayım" > linkler/metin
```

Şimdi bu dosya için bir katı link oluşturmak üzere `ln linkler/metin kati-metin` şeklinde komutumuzu girebiliriz.

```bash
└─$ ln linkler/metin katı-metin                                               

┌──(taylan@linuxdersleri)-[~]
└─$ ls -l katı-metin                                                          
-rw-r--r-- 2 taylan taylan 19 Jun 26 04:47 katı-metin
```

Bakın dosyam oluşturulmuş fakat bu dosyanın bir link dosyası olduğuna dair burada herhangi bir emare yok. Halbuki sembolik linkte açıkça link dosyası olduğu ve hangi dosyaya bağlı olduğu buradaki çıktılarda belirtiliyordu.

Burada katı linke dair özel bir çıktı almadık çünkü aslında katı link dediğimiz kavram sistemimiz üzerindeki tüm standart dosya ve dizinleri temsil ediyor. Yani benim oluşturduğum orijinal metin dosyası da disk üzerindeki verilere yönlendirme yapan bir katı link.

![hard-link.webp]({{ site.url }}/egitim/temel-linux/metin/hard-link.webp){:class="responsive img-zoomable"}

Ben burada “***kati-metin***” isimli yeni bir katı link oluşturduğumda, tıpkı orijinal dosya gibi doğrudan beni diskteki verilere yönlendiren inode değerine bir bağlantı oluşturmuş oldum.

![hard-link2.webp]({{ site.url }}/egitim/temel-linux/metin/hard-link2.webp){:class="responsive img-zoomable"}

Sembolik linkte nasıl oluyordu. Sembolik linkler, orijinal linklere yani aslında katı linkli dosyalara yönlendirme yapıyordu, oradan da disk üzerindeki verilere ulaşabiliyorduk.

![soft-link2.webp]({{ site.url }}/egitim/temel-linux/metin/soft-link2.webp){:class="responsive img-zoomable"}

Katı linkte ise hem orijinal dosya hem de yeni oluşturduğumuz katı link dosyası inode değerine bağlı olduğu için aynı disk verisinin yerini biliyor ve bizi oraya yönlendirebiliyor.

Dolayısıyla ben orijinal veya bu yeni oluşturduğum katı link dosyasında değişiklik yaptığımda diskteki bu veri değiştiği için bu değişikliğe her iki dosya üzerinden de ulaşabiliyorum. Hatta orijinal dosya silinse bile yeni oluşturduğum katı link dosyası, inode sayesinde verilerin disk üzerinde tam olarak hangi bloklarda olduğunu bildiği için benim o verilere ulaşmam mümkün oluyor.

![hard-link3.webp]({{ site.url }}/egitim/temel-linux/metin/hard-link3.webp){:class="responsive img-zoomable"}

Hemen bu durumu bizzat teyit etmek için öncelikle basit bir test olarak yeni oluşturduğumuz katı link dosyası üzerinden yeni veri eklemeyi deneyebiliriz.

Ben denemek için `echo “yeni veri” >> katı-metin` şeklinde komutumu giriyorum.

```bash
└─$ echo "yeni veri" >> katı-metin 

└─$ cat katı-metin                                                            
orijinal dosyayım
yeni veri

└─$ cat linkler/metin                                                         
orijinal dosyayım
yeni veri
```

Eklediğim değişikliğe her iki dosya üzerinden de aynı şekilde ulaşabildim. Benzer şekilde `echo “orijinal ekleme” >> linkler/metin` şeklinde tekrar orijinal dosya üzerinden veri eklemeyi de deneyebiliriz.

```bash
└─$ echo "orijinal ekleme" >> linkler/metin 

└─$ cat linkler/metin                                   
orijinal dosyayım
yeni veri
orijinal ekleme

└─$ cat katı-metin                                   
orijinal dosyayım
yeni veri
orijinal ekleme
```

Bakın orijinal dosya üzerindeki değişiklik bu dosyayı da aynen etkiliyor. Çünkü zaten tüm değişiklikler inode değeri üzerinden gerçekleştirildiği için iki dosya aynı veriye erişebilen iki ayrı dosya gibi.

Şimdi ben son olarak orijinal dosyayı sildiğimde bu diskteki bu verilere ulaşıp ulaşamayacağımı test etmek için `rm linkler/metin` komutunu girip orijinal dosyamı siliyorum.

```bash
└─$ rm linkler/metin                                                          

└─$ cat katı-metin                                                            
orijinal dosyayım
yeni veri
orijinal ekleme
```

Gördüğünüz gibi orijinal dosya silinmiş olmasına rağmen hala disk üzerindeki aynı verilere erişmeye devam edebiliyorum. Çünkü işleyiş aslında aşağıdaki şemadaki gibi.

![hard-link3.webp]({{ site.url }}/egitim/temel-linux/metin/hard-link3.webp){:class="responsive img-zoomable"}

En nihayetinde gördüğünüz gibi aslında sistemiz üzerindeki standart dosya ve klasörler disk üzerindeki veri bloklarına inode üzerinden yönlendirme yapan bağlantı adresleri. Biz bu bağlantı adresleri yani linkler sayesinde kolay okunabilir isimlerle diskteki verilerimizi düzenle tutup tekrar tekrar erişebiliyoruz.

Yani katı link oluşturma yaklaşımı sayesinde disk üzerinde tekrar aynı veriler için fazladan depolama alanı harcanmasına gerek kalmadan, dosyaların yedeklerinin alınması mümkün oluyor. Daha önce de silme işleminin aslında verilere ulaşmamızı sağlayan bağlantıların silinmesinden ibaret olduğunu söylemiştik. Eğer verilere ulaşmamızı sağlayan birden fazla katı link olursa, bir katı link silinse bile diskimiz üzerindeki verilere ulaşmaya devam edebiliyoruz. Katı link yaklaşımı tam olarak bu amaçla kullanılıyor. Ve disk üzerinde fazladan depolama alını işgal etmeden yedeklemek için harika bir çözüm.

Tabii ki katı linkler örneklerimiz üzerinden bizzat teyit ettiğimiz gibi mevcut verilerin üzerine yazılmasına engel olmuyor. Yalnızca ilişkili verilere giden yolun silinmesi ihtimali için yedekleme imkanı tanıyor. Yani eğer üzerine veri yazılması konusunda endişe duyduğunuz verileriniz varsa tabii ki bunları başka bir dizine kopyalayıp tekrar aynı verilerin diskte farklı bloklarda yedeklenmesini sağlamanız gerekiyor.

![backup.webp]({{ site.url }}/egitim/temel-linux/metin/backup.webp){:class="responsive img-zoomable"}

Bakın dosyayı kopyaladığımızda, dosya içindeki veriler disk üzerinde başka bir bloğa yazılıp, bu bloğun adresi de yeni inode numarası üzerinden ulaşılabilir oluyor. Bu sayede orijinal dosyanın üzerine veri yazılsa bile bu bloktaki verilere müdahale  edilmemiş oluyor.

Katı link ile standart kopyalanmış dosyaların farkı işte tam olarak bu.

### Klasörler için Katı Link

Standart dosya sistemi yani hiyerarşik dizin yapısı gereği, klasörler için katı link oluşturmayacağımızı da belirtmek istiyorum. İnanmıyorsanız `ln linkler/ linkler-katı` komutuyla yeni bir tane oluşturmayı deneyebiliriz. 

```bash
└─$ ln linkler/ linkler-katı                                                  
ln: linkler/: hard link not allowed for directory
```

Bakın dizinler için hard link yani katı linkler kabul edilmiyormuş.
