---
layout: komut
author: Taylan Özgür Bildik
title: "pwd Komutu"
modified: 2021-04-14
excerpt: "Çalışmakta olduğumuz mevcut dizini bastırır."
tags: [bash, pwd]
categories: komutlar 
toc: true 
---


`pwd`, “**p**rint **w**orking **d**irectory” yani “mevcut dizini yazdır” ifadesinden gelen bir komuttur. Çalışmakta olduğumuz mevcut dizinin ismini öğrenmemizi sağlar. Eğer `pwd` komutunun ardından hiç bir argüman girilmezse, bulunduğumuz dizinin ismi bastırılır. 

```bash
┌──(taylan㉿linuxdersler)-[~]
└─$ pwd
/home/taylan
```

`pwd` komutunun iki seçeneği bulunuyor; 

## `L` seçeneği;

**`pwd`** komutunun **`-L`** seçeneği, sembolik linklerin(symbolic links) orijinal kaynağını takip etmeden, doğrudan bulunduğunuz fiziksel dizini göstermek için kullanılır.

Bir sembolik link(symbolic link), bir dosyanın veya dizinin başka bir dosya veya dizine referans vermesini sağlar. Bu sebeple, biz sembolik link olan bir klasörde çalışırken aslında orijinal dizinin içeriğine farklı bir dizinden erişmiş oluruz. 

Sembolik dizinde iken `pwd` ya da `pwd -L` komutunu girecek olursak, mevcut sembolik link klasörünün tam dizin adresi bastırılacaktır. Denemek için öncelikle sembolik bir klasör oluşturalım.

```bash
┌──(taylan㉿linuxdersler)-[~]
└─$ ln -s ~/Desktop/ ~/Documents/masaustu

┌──(taylan㉿linuxdersler)-[~]
└─$ ls -dl ~/Desktop/                                                                                   
drwxr-xr-x 7 taylan taylan 4096 Aug 27 08:14 /home/taylan/Desktop/
```

Ben kendi ev dizinim altındaki “***Desktop***” klasörüne sembolik olarak bağlı olan “***Documents***” dizini altında “***masaustu***” isimli bir klasör oluşturdum. Şimdi bu sembolik klasöre geçiş yapıp `pwd` ve `pwd -L` komutunu girelim. 

```bash
┌──(taylan㉿linuxdersler)-[~]
└─$ cd ~/Documents/masaustu

┌──(taylan㉿linuxdersler)-[~/Documents/masaustu]
└─$ pwd                                                                                                 
/home/taylan/Documents/masaustu

┌──(taylan㉿linuxdersler)-[~/Documents/masaustu]
└─$ pwd -L                                                                                              
/home/taylan/Documents/masaustu
```

Gördüğünüz gibi `pwd` komutu varsayılan olarak `-L` seçeneğini kullandığı için `pwd` ve `pwd -L` komutun çıktılarında mevcut bulunduğumuz sembolik dizinin tam adresi bastırıldı. 

## `P` seçeneği;

Eğer sembolik bağlantı ile oluşturulmuş bir dizindeysek ve bu dizinin bağlı olduğu gerçek dizini çıkıtı olarak almak istersek `-P` seçeneğini kullanabiliriz.

Her iki seçeneğin de kullanımını aşağıdaki çıktıya bakarak kavrayabilirsiniz.

```bash
┌──(taylan㉿linuxdersler)-[~/Documents/masaustu]
└─$ pwd                                                                                                 
/home/taylan/Documents/masaustu

┌──(taylan㉿linuxdersler)-[~/Documents/masaustu]
└─$ pwd -L
/home/taylan/Documents/masaustu

┌──(taylan㉿linuxdersler)-[~/Documents/masaustu]
└─$ pwd -P                                                                                              
/home/taylan/Desktop
```

## Bonus

**B**enzer şekilde kabuk mevcut dizinin değerini **PWD** değişkeninde tuttuğu için  `pwd` komutu yerine **$PWD** değişkenine de başvurabiliriz.

```bash
┌──(taylan㉿linuxdersler)-[~/Documents/masaustu]
└─$ echo $PWD
/home/taylan/Documents/masaustu
```

Gördüğünüz gibi sembolik dizin içinde kullandığımızda `pwd` komutunun varsayılan davranışında olduğu gibi sembolik klasörün tam dizinini bastırılıyor. Özellikle kabuk programlamada **PWD** değişkeninin kullanıldığı örneklerle karşılaşabilirsiniz. 

Ayrıca **PWD** değişkeninin bulunduğumuz mevcut dizin adresini vermesinin yanı sıra **OLDPWD** değişkeni de bir önceki dizinin bilgisini bizlere sunar. Zaten pek çok komutta bu değişkenler sayesinde mevcut ve önceki dizin hakkında bilgi sahibi olur.