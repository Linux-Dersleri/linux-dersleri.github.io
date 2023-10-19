---
layout: komut
author: Taylan Özgür Bildik
title: "return Komutu"
modified: 2021-04-14
excerpt: "Kabuk fonksiyonunu sonlandırıp, çıkış kodu döndürülmesini sağlar."
tags: [bash, return]
categories: komutlar 
toc: true 
---



`return` komutu, bir kabuk fonksiyonundan çıkmak için kullanılır. Eğer `return` komutuyla birlikte çıkış değeri de belirtilirse ilgili değer fonksiyonun çıkış kodu(exit code) olarak basılır. Eğer herhangi bir çıkış kodu özellikle belirtilmezse, o zaman fonksiyon içerisinde yürütülmüş olan son komutun durumunu döndürür. Denemek için betik dosyasının root yetkisi ile çalıştırılıp çalıştırılmadığını kontrol edelim. 

```bash
#!/bin/bash
# Amaç: Mevcut kullanıcının root olup olmadığını belirlemek 
root_hesabi () { 
 # root kullanıcının kullanıcı kimliği(UID) sıfırdır. 
 [  $( id -u ) -eq 0  ]  &&  return 0  ||  return 1 
}

root_hesabi &&  echo  "Bu betiği çalıştırabilirsiniz."  ||  echo  "Bu komut dosyasını root kullanıcı olarak çalıştırmanız gerekiyor."
```

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./betik.sh 
Bu komut dosyasını root kullanıcı olarak çalıştırmanız gerekiyor.

┌──(taylan㉿linuxdersleri)-[~]
└─$ sudo ./betik.sh 
[sudo] password for taylan: 
Bu betiği çalıştırabilirsiniz.
```

Betik dosyası içeriğini incelediğimizde sistem üzerindeki “**0**” **id** numarasına sahip olan tek kullanıcı root olabileceği için bu koşul sağlandığında **çıkış kodu** olarak “**0**” değerini döndürüyoruz. Aksi halde "1" değeri döndürülüyor. İşte bu basit örneğimizde olduğu gibi `return` komutunu, fonksiyonun çıkış durumunu belirtmek için kullanabiliyoruz. 

## `exit` ve `return` Arasındaki Fark Nedir ?

Genellikle karıştırılmaya müsait olan birbirine benzer işlevdeki `exit` ve `return` komutları arasındaki fark;

`exit` komutu mevcut kabuğu sonlandırma işlevindeyken, `return` komutu mevcut fonksiyondan çıkmak için kullanılır yani kabuğu sonlandırmaz. Bu durumu aşağıdaki örneğe bakarak da teyit edebilirsiniz.

```bash
#!/bin/bash

donus()
{
    echo "Ben 'return' içeren fonksiyonum"
    return 1
}

cikis()
{
    echo "Ben 'exit' içeren fonksiyonum"
    exit 1
}

donus
echo "Çalışmaya devam.."
cikis
echo "Kabuk kapandığı için bu ifadeyi göremeyeceksiniz."
donus
echo "Çalışmaya devam.."

```

Betik dosyası çalıştırıldığında üretilen çıktılar;

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ ./betik.sh 
Ben 'return' içeren fonksiyonum
Çalışmaya devam..
Ben 'exit' içeren fonksiyonum

┌──(taylan㉿linuxdersleri)-[~]
└─$
```

`return` ile bitirilen ilk “**donus()**” fonksiyonundan sonra, ikinci fonksiyon olan “**cikis()**” fonksiyonunun çalıştırılıyorken, `exit` ile bitiren fonksiyondan sonra betik dosyasını çalıştıran kabuğun sonlandırıldığını buradaki çıktılardan görebiliyoruz. Bu örnek `return` ile `exit` arasındaki farkı net bir biçimde izah ediyor.