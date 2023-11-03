---
sitemap: true
layout: komut
author: Taylan Özgür Bildik
title: "nohup Komutu"
modified: 2021-04-14
excerpt: "İşlemleri, kapatma sinyali olan HUP sinyaline karşı korur."
tags: [bash, nohup]
categories: komutlar 
toc: true 
---


Normal şartlarda kabuk üzerinden çalıştırılmış olan tüm araçlar kabuk kapatılırken sonlandırılır. Kapatma işlemi de çalışmakta olan olan işlemlere HUP sinyalinin gönderilmesi ile gerçekleştirilir. Eğer bizler kabuk kapanırken araçlarımız çalışmaya devam etsin istersek `nohup` komutunu kullanabiliriz. 

`nohup`, kabuk kapatılırken mevcut kabuk üzerindeki tüm işlemlere gönderilen **HUP** kapatma sinyalini görmezden gelerek kendisine argüman olarak verilmiş olan işlemi, bu kapatma sinyaline karşı korur.

En temel kullanımı `nohup korunacak_işlem` şeklindedir. Hemen denemek için "firefox" isimli grafiksel arayüze sahip web tarayıcısını konsol üzerinden çalıştıralım. Aracımız çalıştıktan sonra, aracımızı çalıştırdığımız konsolu(dolayısı ile konsola bağlı bulunan kabuğu) kapattığımızda "firefox" aracının da kapatıldığını görebilirsiniz. 

![nohup-firefox.gif]({{ site.url }}/komutlar/nohup-komutu/nohup-firefox.gif){:class="responsive img-zoomable"}


Eğer konsol kapatılsa da "firefox" aracı çalışmaya devam etsin istersek "firefox" aracını `nohup gedit` komutu ile çalıştırmamız gerekiyor. 

![nohup-firefox-start.gif]({{ site.url }}/komutlar/nohup-komutu/nohup-firefox-start.gif){:class="responsive img-zoomable"}

`nohup` komutu sayesinde, konsol aracını kapattığımızda "firefox" aracının çalışmaya devam ettiğini teyit edebiliyoruz. 

`nohup` komutu, ilgili işlemi kabuktan bağımsız kıldığı için elbette kabuğun sunduğu imkanları da kaybetmiş oluyor. Yani mevcut kabuğun bu işlem üzerindeki doğrudan müdahalesini kaldırmış oluyoruz. Bu durum "firefox" gibi grafiksel arayüz üzerinden çalışan uygulamaları pek etkilemiyor olsa da konsol üzerinden çalıştırılan ve kullanıcı ile etkileşim kurması gereken uygulamaları etkiler. Bu ne anlama geliyor ? Bizler konsol üzerinden bir işlem başlatırken aslında "**stdin**" "**sterr**" "**stout**" olarak ifade edilen üç dosya tanımlayıcısına sahip oluyoruz. 

**stdin:** **st**an**d**art **in**put, ilgili işleme **veri girişi** yapılabilmesini sağlar.

**stderr: st**an**d**art **err**or, çalıştırılmış olan işlemin ürettiği **hata çıktıları**dır.

**stdout:** **st**an**d**art **out**put, çalıştırılan aracın çalışması sonucu üretilmiş olan **hatasız çıktılar**dır.

İşte bizler `nohup` komutu ile bir aracı çalıştırdığımızda bu araç konsol üzerinden input almıyor ve çıktılarını da kullanıcının ev dizini altında ***nohup.out*** adlı bir dosyaya kaydediyor. Çünkü `nohup` komutunun yapısı gereği, çalıştırılan aracı konsoldan ayırdığı için ilgili aracın input alabileceği ya da çıktıları kullanıcılara aktarabileceği bir konsol bulunmuyor. Standart çıktıları(stdout) ve standart hataları(stdout) hepsini ***nohup.out*** dosyasına kaydediyor. Hemen denemek için basit bir betik dosyası oluşturalım. 

Ben kullanıcıdan komut alıp bu komutu bastıracak ve en sonunda aslında hiç olmayan bir komutu çalıştırmayı deneyecek bir betik oluşturuyorum. Betik dosyam aşağıdaki şekilde. 

```bash
#! /usr/bin/bash
read -p "Veri girin:" veri
echo "Girdiğiniz veri:$veri"
olmayan-komut
```

Bu dosyayı standart şekilde konsol üzerinden çalıştırdığımızda bizden veri alıp, bu veriyi ve en sondaki hatalı komutun hata çıktısını konsola basıyor.

```bash
taylan@taylan:~$ bash betik.sh                                            
Veri girin:bu bir veri girişidir                                          
Girdiğiniz veri:bu bir veri girişidir                                     
betik.sh: satır 3: olmayan-komut: komut yok                               
taylan@taylan:~$
```

Şimdi aynı betik dosyasını `nohup` komutu ile konsoldan bağımsız şekilde çalıştırmayı deneyelim.

```bash
taylan@taylan:~$ nohup ./betik.sh                                         
nohup: girdi gözardı ediliyor ve çıktı 'nohup.out' e ekleniyor            
```

Gördüğünüz gibi betik dosyası çalıştırıldı fakat bizlerden herhangi bir veri girişi istemedi ya da konsola çıktı bastırmadı. Çıktıların '***nohup.out***' dosyasına eklendiğini belirtti sadece. Bu dosyanın içeriğini de `cat` komutu ile okuyarak bu durumu teyit edebiliyoruz.

```bash
taylan@taylan:~$ cat nohup.out 
Girdiğiniz veri:
./betik.sh: 3: olmayan-komut: not found
taylan@taylan:~$
```

`nohup` komutu ile hangi aracı çalıştırırsak çalıştıralım aracın ürettiği konsol çıktıları bu dosyaya alt alta ekleniyor olacak. Eğer isterseniz bu varsayılan dosya konumunu da dilediğiniz şekilde değiştirebilirsiniz. Örneğin ben tüm çıktıların "Belgeler" dizini altında "***çıktı.txt***" isimli bir dosyaya gönderilmesini istersem çıktıları büyüktür işareti `>` ile yönlendirebilirim.

```bash
taylan@taylan:~$ nohup ./betik.sh > Belgeler/çıktı.txt
nohup: girdi gözardı ediliyor ve stderr stdout'a gönderiliyor
taylan@taylan:~$ cat Belgeler/çıktı.txt 
Girdiğiniz veri:
./betik.sh: 3: olmayan-komut: not found
taylan@taylan:~$
```

Konsoldan bağımsız olan işlemi sonlandırmak istersek de tek yapmamız gereken işlem numarasını `pgrep` komutu yardımıyla öğrenip `kill işlem_numarası` şeklinde sonlandırmaktır.

```bash
taylan@taylan:~$ pgrep "gedit"
3706
taylan@taylan:~$ kill 3706
taylan@taylan:~$ pgrep "gedit"
taylan@taylan:~$
```

Ayrıca işlemi sonlandırmak için doğrudan `killall işlem-adı` şeklinde de komut girebilirsiniz. 

Fakat `nohup` komutu ile başlatılmış bir işleme HUP kapatma sinyali işlemeyecektir. Zaten `nohup` komutunun ana işlevi de başlatılmış olan işlemi **HUP** kapatma sinyaline karşı korumaktır. Zaten komutun adı da buradan geliyor. **HUP** sinyali hariç diğer kapatma yöntemleri işlemi sonlandırabilir. Bu durumu teyit etmek için `nohup` ile başlattığınız işlemi `kill -s HUP işlem_numarası` komutu ile sonlandırmayı deneyebilirsiniz.

`nohup` komutunun bash kabuğunda yerleşik olarak bulunan `disown` isimli alternatifi vardır. 

## `disown` ile `nohup` Arasındaki Fark Nedir ?

`disown` yalnızca kabuk kapatılırken gönderilen HUP sinyaline karşı korurken, `nohup` ne şekilde geldiğine bakılmaksızın HUP sinyalinden ilgili işlemi korur.

`disown` komutu arka plandaki işlemler üzerinde etkilidir yani öncelikle işlem çalıştırılıp arka plana alınmalı daha sonda `disown` komutu çalıştırılmalıdır. 

`nohup` komutu ise ilgili işlem başlatılırken belirtilmelidir.

Kullanım alanlarına bakacak olursak; örneğin konsol üzerinden bir araç çalıştırdınız ama daha sonra konsolu kapatıp aracın açık kalmasını istiyorsunuz. Bu durumda aracı duraklatıp arka plana alabilir ve `disown` komutu ile konsol kapansa dahi çalışmaya devam etmesini sağlayabilirsiniz. `nohup` komutu ise aynı durumun daha planlı şekilde yapılışıdır. Yani zaten konsolu ya da daha doğrusu mevcut kabuğu kullanmayacağınız önceden belli ise, doğrudan `nohup` komutunun ardından çalıştırmak istediğimiz aracı yazabilirsiniz. Genelleyecek olursak `nohup` daha çok planlı durumlar için `disown` ise daha sonradan verilen kararlar için kullanılabilir. 

`disown` ilgili işlemi, **job control** yani “iş kontrolü” tablosundan çıkarır ve **HUP** kapatma sinyaline karşı korur. Yani ilgili işlemi mevcut kabuğun iş kontrolünden kaldırır, ancak yine de terminale bağlı bırakır. 

`nohup` , işlemi terminalden ayırır, çıktısını ***nohup.out***'a yeniden yönlendirir ve onu tüm SIGHUP kapatma sinyalinden korur.