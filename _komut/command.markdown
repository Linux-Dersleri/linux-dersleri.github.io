---
layout: komut
author: Taylan Özgür Bildik
title: "command Komutu"
modified: 2021-04-14
excerpt: "Aynı isme sahip takma isim ve fonksiyonlar görmezden gelinerek orijinal komutu çalıştırır."
tags: [bash, command]
categories: komutlar 
toc: true 
---


Bash üzerinde kullanılabilir olan komutlar ile aynı ada sahip takma isim(`alias`) ya da fonksiyon tanımlaması yapıldıysa, `command` komutu kullanıldığında aynı isme sahip takma isim ve fonksiyonlar görmezden gelinerek orijinal komut çalıştırılır. Çünkü `command` komutu, kendisine argüman olarak verilmiş olan ifadeyi öncelikli olarak, komutların dizin adreslerini tutan **PATH** yolu üzerinde arar. Hemen denemek için öncelikle `ls` komutu ile aynı ada sahip bir takma ad (`alias`) tanımlaması yapıp `ls` komutunu konsola girmeyi deneyelim.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ alias ls="echo 'ben ls komutunun yerini alan takma isimim'"

┌──(taylan㉿linuxdersleri)-[~]
└─$ ls
ben ls komutunun yerini alan takma isimim

┌──(taylan㉿linuxdersleri)-[~]
└─$
```

Görebildiğiniz gibi takma isim, gerçek `ls` komutunu domine ediyor. Eğer böyle bir durumda `ls` komutunu kullanmak istersek `command ls` komutunu kullanmamız yeterli.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ls
ben ls komutunun yerini alan takma isimim

┌──(taylan㉿linuxdersleri)-[~]
└─$ command ls
 betik.sh           deneme-kati              
 Desktop            Pictures    
 Documents          Downloads 
```

Aynı durumu fonksiyonlar üzerinden de gözlemleyebiliriz. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ function cd {
> echo "ben cd komutunun yerini alan fonksiyonum"
> }
                                                                                                                                                           
┌──(taylan㉿linuxdersleri)-[~]                                                                                                                             
└─$ cd /home
ben cd komutunun yerini alan fonksiyonum                                                                                                                                                        
                                                                                                                                                           
┌──(taylan㉿linuxdersleri)-[~]                                                                                                                             
└─$ command cd /home/
                                                                                                                                                           
┌──(taylan㉿linuxdersleri)-[/home]                                                                                                                         
└─$ pwd                                                                                                                                                    
/home
```

Ayrıca `command` komutunun birkaç seçeneği de bulunuyor. 

# Seçenekler

## `p` seçeneği;

`command` komutunun, kendisine argüman olarak verilen ifadeyi **PATH** yolu üzerinde aradığını söylemiştik. **PATH** yolu kullanıcının istekleri doğrultusunda düzenlenebiliyor yani varsayılan olarak belirlenmiş olan **PATH** yolunu değiştirme imkanımız da var. Eğer biz `command` komutunun yalnızca **varsayılan PATH yolunu** kullanmasını istersek `-p` seçeneğini kullanabiliriz. Denemek için ev dizinimizde betik dosyası oluşturup, ev dizinimizi de **PATH** yoluna ekleyelim. Daha sonra **PATH** yoluna ekli olan betik dosyasına yetki verip, ismi ile konsol üzerinden çalıştıralım.

```bash
taylan@linuxdersleri:~$ cat > betik.sh
echo "ben bir betik dosyasıyım ve çalıştım !"
taylan@linuxdersleri:~$ chmod +x betik.sh
taylan@linuxdersleri:~$ export PATH="/home/taylan/":$PATH
taylan@linuxdersleri:~$ echo $PATH
/home/taylan/:/usr/local/bin:/usr/bin:/bin:/usr/local/games:/usr/games
taylan@linuxdersleri:~$ betik.sh
ben bir betik dosyasıyım ve çalıştım !
taylan@linuxdersleri:~$ 
```

Betik dosyamızın PATH yoluna eklediğimiz dizin konumu sayesinde konsol üzerinden ismi ile çalıştığını teyit ettik. Eğer biz **PATH** yolu üzerinde yapılmış olan değişiklikler harici **varsayılan PATH** yolu üzerindeki komutlar kullanılsın istersek `command` komutunun `p` seçeneğini kullanabiliriz. Fakat bu seçeneğin doğru çalışabilmesi `hash` değerinin `hash -r` komutu ile silinmesi gerekiyor. Çünkü betik dosyası daha önce teyit edilmek için çalıştırıldığından hash değeri kayıt altına alınıyor ve varsayılan PATH yolundan önce hash değeri üzerinden **betik.sh** dosyası, konumunda bulunup çalıştırılıyor. Bu sebeple eğer betik dosyasını daha önce çalıştırdıysak `hash -r` komutu ile silmemiz gerekir. Eğer `hash` konusunda kafanız karıştıysa ayrıca `hash` yapısının açıklamasına göz atabilirsiniz.

```bash
taylan@taylan:~$ cat > betik.sh
echo "ben bir betik dosyasıyım ve çalıştım !"
taylan@taylan:~$ hash -r 
taylan@taylan:~$ command -p betik.sh
bash: betik.sh: komut yok
taylan@taylan:~$ command betik.sh 
Ben betik dosyasıyım ve çalıştım :)
taylan@taylan:~$ betik.sh 
Ben betik dosyasıyım ve çalıştım :)
```

## `v` seçeneği;

Bu seçenek argüman olarak belirtilmiş olan komut hakkında kısaca `type` komutu gibi bilgi sunar.

```bash
┌──(taylan㉿linuxdersleri)-[/home]
└─$ command -v ls
alias ls='echo '\''ben ls komutunun yerini alan takma isimim'\'''

┌──(taylan㉿linuxdersleri)-[/home]
└─$ type ls
ls is aliased to `echo 'ben ls komutunun yerini alan takma isimim''
```

## `V` seçeneği;

Bu seçenek argüman olarak belirtilmiş olan komut hakkında `type` komutu gibi bilgi sunar. Fakat `-v` seçeneğinden daha geniş kapsamlı bilgi sunmaktadır. 

```bash
┌──(taylan㉿linuxdersleri)-[/home]
└─$ command -v ls pwd mkdir
alias ls='echo '\''ben ls komutunun yerini alan takma isimim'\'''
pwd
/usr/bin/mkdir

┌──(taylan㉿linuxdersleri)-[/home]
└─$ command -V ls pwd mkdir                                                                                                                                
ls is aliased to `echo 'ben ls komutunun yerini alan takma isimim''
pwd is a shell builtin
mkdir is /usr/bin/mkdir
```

Gördüğünüz gibi `-v` seçeneği ile sunulmayan detaylar, `-V` seçeneği ile sunulmuş.