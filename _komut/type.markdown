---
layout: komut
author: Taylan Özgür Bildik
title: "type Komutu"
modified: 2021-04-14
excerpt: "Komut türleri hakkında bilgi sunar."
tags: [bash, type]
categories: komutlar 
toc: true 
---


`type` komutu, kendisine argüman olarak verilmiş olan komutların türleri hakkında bize bilgi sunar. 

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ type ls
ls is aliased to `ls --color=auto'

┌──(taylan㉿linuxdersleri)-[~]
└─$ type pwd
pwd is a shell builtin                                                                                                                                  
                                                                                                                                                           
┌──(taylan㉿linuxdersleri)-[~]                                                                                                                             
└─$ type mkdir                                                                                                                                             
mkdir is /usr/bin/mkdir
```

`type` komutuyla birlikte kullanabileceğimiz birkaç seçenek de mevcuttur;

## `t` seçeneği

Eğer komutun geçerli bir türü varsa yalnızca türünü yazdır. Çıktı olarak alınabilecek komut türleri aşağıdaki gibidir.

- alias = kabukta tanımlı "takma adlar"
- function = kabukta tanımlı "fonksiyonlar"
- builtin = kabukta "yerleşik" olan komutlar
- file = sistemde yüklü bulunan harici komutlar
- keyword  = kabuğa özel olarak ayrılmış kelimeler

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ alias yaz="echo 'ben takma ad'"                                                                                                                        

┌──(taylan㉿linuxdersleri)-[~]
└─$ type -t yaz                                                                                                                                            
alias

┌──(taylan㉿linuxdersleri)-[~]
└─$ type -t mkdir                                                                                                                                          
file

┌──(taylan㉿linuxdersleri)-[~]
└─$ type -t pwd                                                                                                                                            
builtin

┌──(taylan㉿linuxdersleri)-[~]
└─$ type -t if                                                                                                                                             
keyword

┌──(taylan㉿linuxdersleri)-[~]
└─$ fonksiyon(){ echo "test fonksiyonuyum"; }                                                                                                              

┌──(taylan㉿linuxdersleri)-[~]
└─$ type -t fonksiyon                                                                                                                                      
function
```

## `a` seçeneği

Argüman olarak verilmiş olan komut ismiyle eşleşen tüm tür bilgileri listelenir. 

```bash
┌──(taylan㉿linuxdersleri)-[~]                                                                                                                             
└─$ type -a ls                                                                                                                                             
ls is aliased to `ls --color=auto'                                                                                                                         
ls is /usr/bin/ls                                                                                                                                          
ls is /bin/ls                                                                                                                                              
                                                                                                                                                           
┌──(taylan㉿linuxdersleri)-[~]
└─$ type -a echo
echo is a shell builtin
echo is /usr/bin/echo
echo is /bin/echo
```

## `p` seçeneği

Yalnızca sistem üzerinde yüklü bulunan **harici komutlar** hakkında bilgi sunar. Eğer argüman olarak verilmiş olan komut "harici" komut değilse herhangi bir çıktı basılmaz.

```bash
┌──(taylan㉿linuxdersleri)-[~]
└─$ type -p ls                                                                                                                                             

┌──(taylan㉿linuxdersleri)-[~]
└─$ type -p mkdir                                                                                                                                          
/usr/bin/mkdir
```

## `P` seçeneği

Argüman olarak verilmiş olan ifadenin hangi türden olduğuna bakmadan(takma isim, yerleşik komut, fonksiyon olması fark etmez) ilgili ifadeyi PATH yolu üzerindeki konumlarda arar. Eğer mevcutsa çıktı olarak dizin adresini basar.