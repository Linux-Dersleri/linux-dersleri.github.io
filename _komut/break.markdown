---
layout: komut
author: Taylan Özgür Bildik
title: "break Komutu"
modified: 2021-04-14
excerpt: "Bash üzerinde kurulmuş olan döngülerin 'kırılması' yani sonlandırılması için kullanılır."
tags: [bash, break]
categories: komutlar 
toc: true 
---


Bash üzerinde kurulmuş olan döngülerin( "`while`" "`for`" "`until`") "**kırılması**" yani sonlandırılması için kullanılır.  Örnek olması açısında 0’dan 10’a kadar devam eden bir döngü tanımlayıp, döngü 5’e geldiğinde `break` komutu ile sonlandırılmasını sağlayalım.

```bash
sayi=0
while [ $sayi -lt 10 ]
   do
           echo $sayi
           if [[ $sayi -eq 5 ]] 
                   then
                           break
                   else
                           sayi=$(( $sayi + 1 ))
           fi
   done
```

```bash
taylan@linuxdersleri:~$ bash betik.sh 
0
1
2
3
4
5
taylan@linuxdersleri:~$
```

Görebildiğiniz gibi normal şartlarda döngü 10’a kadar devam edecekken, 5’e geldiğinde `break` komutu sayesinde sonlandırılmış oldu.

Bu basit örnek diğer döngüler için de kurulabilir ve aynı şekilde `break` komutu diğer döngüler üzerinde de sonlandırma görevini yerine getirebilir. Ayrıca `break` komutu iç içe döngülerin olduğu durumda argüman alarak, çoklu döngülerin sonlandırılmasını da sağlayabilir. Örnek olması için iç içe iki `for` döngüsü tanımlayalım. Döngülerden ilki 1 2 ve 3 değerlerini sırasıyla döndürürken her döngü esnasında içinde bulunan ikinci döngüyü çalıştırsın. İkinci döngü de 0 5 10 15 sayılarını döndürsün. Bu sayede iç içe döngü ile her iki döngünün oluşturduğu kombinasyonu görebiliriz. 

```bash
for sayi1 in 1 2 3 
do
        for sayi2 in 0 5 10 15
        do
                        echo "ilk döngü:$sayi1 ikinci döngü:$sayi2"
        done
done
```

```bash
taylan@linuxdersleri:~$ bash bet.sh 
ilk döngü:1 ikinci döngü:0
ilk döngü:1 ikinci döngü:5
ilk döngü:1 ikinci döngü:10
ilk döngü:1 ikinci döngü:15
ilk döngü:2 ikinci döngü:0
ilk döngü:2 ikinci döngü:5
ilk döngü:2 ikinci döngü:10
ilk döngü:2 ikinci döngü:15
ilk döngü:3 ikinci döngü:0
ilk döngü:3 ikinci döngü:5
ilk döngü:3 ikinci döngü:10
ilk döngü:3 ikinci döngü:15
taylan@linuxdersleri:~$
```

İç içe döngümüzü kurup nasıl çalıştığını öğrendiğimize göre şimdi de bu iki döngüyü tek seferde kırmayı deneyelim. İç içe olan iki adet döngüyü kıracağımız için `break` komutuna parametre olarak `2` değerini vererek, en içteki döngüye komutumuzu yazmamız gerekiyor.

Denemek için birinci döngü 2 sayısına ulaştığında her iki döngüyü de kırmayı deneyelim.

```bash
for sayi1 in 1 2 3 
do
        for sayi2 in 0 5 10 15
        do
                if [ $sayi1 -eq 2 -a $sayi2 -eq 5 ]
                then
                        break 2
                else
                        echo "ilk döngü:$sayi1 ikinci döngü:$sayi2"
                fi
        done
done
```

```bash
taylan@linuxdersleri:~$ bash don.sh 
ilk döngü:1 ikinci döngü:0
ilk döngü:1 ikinci döngü:5
ilk döngü:1 ikinci döngü:10
ilk döngü:1 ikinci döngü:15
ilk döngü:2 ikinci döngü:0
taylan@linuxdersleri:~$
```

Çıktılarından da görülebileceği gibi ilk döngü "2" rakamına ulaştığında her iki döngü de birden sonlandırılmış oldu. Testi devam ettirmek için `break` komutunun yanındaki `2` argümanını kaldırıp kodumuzu tekrar çalıştıralım.

```bash
for sayi1 in 1 2 3 
do
        for sayi2 in 0 5 10 15
        do
                if [ $sayi1 -eq 2 -a $sayi2 -eq 5 ]
                then
                        break
                else
                        echo "ilk döngü:$sayi1 ikinci döngü:$sayi2"
                fi
        done
done
```

```bash
taylan@linuxdersleri:~$ bash don.sh 
ilk döngü:1 ikinci döngü:0
ilk döngü:1 ikinci döngü:5
ilk döngü:1 ikinci döngü:10
ilk döngü:1 ikinci döngü:15
ilk döngü:2 ikinci döngü:0
ilk döngü:3 ikinci döngü:0
ilk döngü:3 ikinci döngü:5
ilk döngü:3 ikinci döngü:10
ilk döngü:3 ikinci döngü:15
taylan@linuxdersleri:~$
```

Çıktıları dikkatlice incelediğimizde, `if` kuralı içerisinde belirtilmiş olan **sayi1** değişkeninin **2** olduğu döngüde yalnızca iç döngünün sonlandırıldığını görebiliyoruz. Çünkü `break` komutu argüman almadığı için yalnızca bulunduğu döngüyü sonlandırabildi. Neticede ilk döngü sonlandırılmadan devam ettiği için 3. adıma geçti ve `if` koşulundaki **sayi1** değişkeninin "2" olduğunda yaşanacak sonlandırma durumuna maruz kalmadı. Böylece çıktıda görmüş olduğumuz şekilde döngü sonucumuz ortaya çıkmış oldu. Eğer buradaki açıklamayı anlayamadıysanız lütfen çıktıları daha dikkatlice ve biraz kendi uygulamanız üzerinden gözlemleyin. Burada `break` komutuna argüman olarak belirtilmiş olan sayılar, `break` komutunun bulunduğu döngüden dışarı doğru kaç döngüyü sonlandırması gerektiğini belirtmek için kullanılıyor.